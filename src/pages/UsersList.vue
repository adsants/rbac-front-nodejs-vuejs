<template>
  <div class="card">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <input class="input" v-model="q" placeholder="Search..." @keyup.enter="fetchData(1)" />
        <button class="btn-secondary" @click="fetchData(1)">Search</button>
      </div>
        <RouterLink
          to="/users/new"
          class="btn inline-flex items-center gap-2"
          v-perm.disable="{ key:'users', action:'can_create' }"
        >
          <IconHero name="plus" /> Tambah
        </RouterLink>


    </div>
    <table class="table">
      <thead>
        <tr><th class="th">ID</th><th class="th">Name</th><th class="th">Email</th><th class="th">Role</th><th class="th"  align="right">Aksi</th></tr>
      </thead>
      <tbody>
        <tr v-for="u in rows" :key="u.id">
          <td class="td">{{ u.id }}</td>
          <td class="td">{{ u.name }}</td>
          <td class="td">{{ u.email }}</td>
          <td class="td"><span class="badge">{{ u.role_name }}</span></td>
          <td class="td" align="right">
                <!-- Edit: disable jika tak punya can_update -->
            <RouterLink
              class="link mr-3 inline-flex items-center gap-1"
              :to="`/users/${u.id}`"
              v-perm.disable="{ key:'users', action:'can_update' }"
            >Edit</RouterLink>

            <!-- Delete: hide jika tak punya can_delete (atau pakai .disable) -->
            <button
              class="text-red-600 hover:underline inline-flex items-center gap-1"
              @click="removeRow(u)"
              v-perm.disable="{ key:'users', action:'can_delete' }"
            >Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <TablePagination :meta="meta" @change="fetchData" />
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../store/auth'
import TablePagination from '../components/TablePagination.vue'
import { useUiStore } from '../store/ui'
import IconHero from '../components/IconHero.vue'
const ui = useUiStore()
const rows = ref([]); const meta = ref({ page: 1, limit: 10, total: 0 })
const q = ref('')
async function fetchData(page = meta.value.page) {
  const { data } = await api.get('/users', { params: { q: q.value, page, limit: meta.value.limit } })
  rows.value = data.data; meta.value = data.meta
}
async function removeRow(u) {
  const ok = await ui.askConfirm({ title: 'Hapus User', message: `Yakin hapus user "${u.name}"?` })
  if (!ok) return
  try {
    await api.delete(`/users/${u.id}`)
    const prev = rows.value.length === 1 && meta.value.page > 1
    await fetchData(prev ? meta.value.page - 1 : meta.value.page)
    ui.showToast({ type: 'success', message: 'User berhasil dihapus' })
  } catch (e) {
    ui.showToast({ type: 'error', message: e?.response?.data?.message || 'Gagal menghapus' })
  }
}
onMounted(fetchData)
</script>
