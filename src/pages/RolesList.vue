<template>
  <div class="card">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <input class="input" v-model="q" placeholder="Search..." @keyup.enter="fetchData(1)" />
        <button class="btn-secondary" @click="fetchData(1)">Search</button>
      </div>      
      <RouterLink class="btn inline-flex items-center gap-2" to="/roles/new">
        <IconHero name="plus" /> Tambah
      </RouterLink>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th class="th">ID</th>
          <th class="th">Name</th>
          <th class="th">Description</th>
          <th class="th"  align="right">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in rows" :key="r.id">
          <td class="td">{{ r.id }}</td>
          <td class="td">{{ r.name }}</td>
          <td class="td">{{ r.description }}</td>
          <td class="td" align="right">
            <RouterLink class="link mr-3 inline-flex items-center gap-1" :to="`/roles/${r.id}`">
              <IconHero name="pencil" /> Edit
            </RouterLink>
            <button class="text-red-600 hover:underline inline-flex items-center gap-1" @click="removeRow(r)">
              <IconHero name="trash" /> Delete
            </button>
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
  const { data } = await api.get('/roles', { params: { q: q.value, page, limit: meta.value.limit } })
  rows.value = data.data; meta.value = data.meta
}

async function removeRow(u) {
  const ok = await ui.askConfirm({ title: 'Hapus Role', message: `Yakin hapus Role "${u.name}"?` })
  if (!ok) return
  try {
    await api.delete(`/roles/${u.id}`)
    const prev = rows.value.length === 1 && meta.value.page > 1
    await fetchData(prev ? meta.value.page - 1 : meta.value.page)
    ui.showToast({ type: 'success', message: 'User berhasil dihapus' })
  } catch (e) {
    ui.showToast({ type: 'error', message: e?.response?.data?.message || 'Gagal menghapus' })
  }
}
onMounted(fetchData)

</script>
