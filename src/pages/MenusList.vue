<template>
  <div class="card">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <input class="input" v-model="q" placeholder="Search..." @keyup.enter="fetchData(1)" />
        <button class="btn-secondary" @click="fetchData(1)">Search</button>
      </div>
      <RouterLink class="btn" to="/menus/new">Tambah</RouterLink>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th class="th">ID</th>
          <th class="th">Key</th>
          <th class="th">Title</th>
          <th class="th">Path</th>
          <th class="th">Parent</th>
          <th class="th">Sort</th>
          <th class="th">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="m in rows" :key="m.id">
          <td class="td">{{ m.id }}</td>
          <td class="td">{{ m.key }}</td>
          <td class="td">{{ m.title }}</td>
          <td class="td">{{ m.path }}</td>
          <td class="td">{{ m.parent_id }}</td>
          <td class="td">{{ m.sort }}</td>
          <td class="td">
            <RouterLink class="link mr-3" :to="`/menus/${m.id}`">Edit</RouterLink>
            <button class="text-red-600 hover:underline" @click="removeRow(m)">Delete</button>
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

const rows = ref([])
const meta = ref({ page: 1, limit: 10, total: 0 })
const q = ref('')

async function fetchData(page = meta.value.page) {
  const { data } = await api.get('/menus', { params: { q: q.value, page, limit: meta.value.limit } })
  rows.value = data.data
  meta.value = data.meta
}
onMounted(() => fetchData())
async function removeRow(m) {
  if (!confirm(`Hapus menu "${m.title}"?`)) return
  try {
    await api.delete(`/menus/${m.id}`)
    const prev = rows.value.length === 1 && meta.value.page > 1
    await fetchData(prev ? meta.value.page - 1 : meta.value.page)
    // Refresh sidebar agar langsung mengikuti perubahan menu
    await auth.fetchMe()
  } catch (e) {
    alert(e?.response?.data?.message || 'Gagal menghapus')
  }
}
</script>
