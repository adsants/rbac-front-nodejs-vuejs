<template>
  <div class="card">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <input class="input" v-model="q" placeholder="Search..." @keyup.enter="fetchData(1)" />
        <button class="btn-secondary" @click="fetchData(1)">Search</button>
      </div>
      <RouterLink class="btn" to="/roles/new">Tambah</RouterLink>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th class="th">ID</th>
          <th class="th">Name</th>
          <th class="th">Description</th>
          <th class="th">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in rows" :key="r.id">
          <td class="td">{{ r.id }}</td>
          <td class="td">{{ r.name }}</td>
          <td class="td">{{ r.description }}</td>
          <td class="td">
            <RouterLink class="link mr-3" :to="`/roles/${r.id}`">Edit</RouterLink>
            <button class="text-red-600 hover:underline" @click="removeRow(r)">Delete</button>
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
  const { data } = await api.get('/roles', { params: { q: q.value, page, limit: meta.value.limit } })
  rows.value = data.data
  meta.value = data.meta
}
onMounted(() => fetchData())

async function removeRow(r) {
  if (!confirm(`Hapus role "${r.name}"?`)) return
  try {
    await api.delete(`/roles/${r.id}`)
    const prev = rows.value.length === 1 && meta.value.page > 1
    await fetchData(prev ? meta.value.page - 1 : meta.value.page)
  } catch (e) {
    alert(e?.response?.data?.message || 'Gagal menghapus')
  }
}
</script>
