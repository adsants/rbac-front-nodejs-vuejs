<template>
  <div class="card">
    <div class="flex items-center gap-3 mb-4">
      <label class="text-sm font-medium">Role</label>
      <select class="input w-64" v-model.number="roleId" @change="loadData">
        <option v-for="r in roles" :key="r.id" :value="r.id">{{ r.name }}</option>
      </select>
      <button class="btn" @click="save" :disabled="saving">{{ saving ? 'Saving...' : 'Save' }}</button>
    </div>
    <div class="overflow-auto">
      <table class="table min-w-[900px]">
        <thead>
          <tr>
            <th class="th">Menu</th>
            <th class="th">Key</th>
            <th class="th">Parent</th>
            <th class="th text-center">Read</th>
            <th class="th text-center">Create</th>
            <th class="th text-center">Update</th>
            <th class="th text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(m, idx) in rows" :key="m.menu_id">
            <td class="td">{{ m.title }}</td>
            <td class="td">{{ m.key }}</td>
            <td class="td">{{ m.parent_id }}</td>
            <td class="td text-center"><input type="checkbox" v-model="m.can_read" /></td>
            <td class="td text-center"><input type="checkbox" v-model="m.can_create" /></td>
            <td class="td text-center"><input type="checkbox" v-model="m.can_update" /></td>
            <td class="td text-center"><input type="checkbox" v-model="m.can_delete" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../store/auth'

const roles = ref([])
const roleId = ref(null)
const rows = ref([])
const saving = ref(false)

async function loadRoles() {
  const { data } = await api.get('/roles', { params: { page: 1, limit: 100 } })
  roles.value = data.data
  if (!roleId.value && roles.value.length) roleId.value = roles.value[0].id
}
async function loadData() {
  if (!roleId.value) return
  const { data } = await api.get(`/role-menu/${roleId.value}`)
  // normalize booleans
  rows.value = data.map(d => ({ ...d, can_read: !!d.can_read, can_create: !!d.can_create, can_update: !!d.can_update, can_delete: !!d.can_delete }))
}
async function save() {
  saving.value = true
  try {
    await api.put(`/role-menu/${roleId.value}`, { items: rows.value })
    ui.showToast({ type:'success', message:'Permissions berhasil disimpan' })
  } finally { 
    saving.value = false 
  }
}
onMounted(async () => { await loadRoles(); await loadData() })
</script>
