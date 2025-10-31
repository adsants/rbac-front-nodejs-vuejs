<template>
  <div class="card">
    <div class="flex items-center gap-3 mb-4">
      <label class="text-sm font-medium">Role</label>
      <select class="input w-64" v-model.number="roleId" @change="loadData">
        <option v-for="r in roles" :key="r.id" :value="r.id">{{ r.name }}</option>
      </select>
      <button class="btn" @click="save" :disabled="saving">
        {{ saving ? 'Saving...' : 'Save' }}
      </button>
    </div>

    <div class="overflow-auto">
      <table class="table min-w-[900px]">
        <thead>
          <tr>
            <th class="th">Menu</th>
            <th class="th">Key</th>
            <th class="th text-center">Read</th>
            <th class="th text-center">Create</th>
            <th class="th text-center">Update</th>
            <th class="th text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
        <tr v-for="m in rows" :key="m.menu_id ?? m.id">
          <td
            class="td"
            :class="{ 'font-bold': m.parent_id == null }"
            :style="{ 'padding-left': m.parent_id != null ? '1em' : '0' }"
          >
            {{ m.title }}
          </td>
          <td class="td">{{ m.key }}</td>

            <!-- READ selalu tampil -->
            <td class="td text-center">
              <input type="checkbox" v-model="m.can_read" />
            </td>

            <!-- CREATE -->
            <td class="td text-center">
              <template v-if="isParent(m)">
                <span class="text-gray-400 cursor-not-allowed" title="Tidak berlaku untuk parent">—</span>
              </template>
              <template v-else>
                <input type="checkbox" v-model="m.can_create" />
              </template>
            </td>

            <!-- UPDATE -->
            <td class="td text-center">
              <template v-if="isParent(m)">
                <span class="text-gray-400 cursor-not-allowed" title="Tidak berlaku untuk parent">—</span>
              </template>
              <template v-else>
                <input type="checkbox" v-model="m.can_update" />
              </template>
            </td>

            <!-- DELETE -->
            <td class="td text-center">
              <template v-if="isParent(m)">
                <span class="text-gray-400 cursor-not-allowed" title="Tidak berlaku untuk parent">—</span>
              </template>
              <template v-else>
                <input type="checkbox" v-model="m.can_delete" />
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../store/auth'
import { useUiStore } from '../store/ui'
const ui = useUiStore()

const roles = ref([])
const roleId = ref(null)
const rows = ref([])
const saving = ref(false)

/** Parent detector:
 *  - kalau API mengirim is_parent/child_count/children_count/has_children → pakai itu
 *  - fallback: cek apakah ada item lain yang parent_id = id/menu_id
 *  - tambahan fallback: jika path null/kosong dianggap container
 */
const hasChildLocal = (m) => {
  const id = m.menu_id ?? m.id
  return rows.value.some(x => x.parent_id === id)
}
const isParent = (m) => {
  return Boolean(
    m.is_parent === 1 ||
    (m.child_count ?? m.children_count ?? 0) > 0 ||
    m.has_children === 1 ||
    hasChildLocal(m) ||
    m.path === null || m.path === ''
  )
}

async function loadRoles() {
  const { data } = await api.get('/roles', { params: { page: 1, limit: 100 } })
  roles.value = data.data
  if (!roleId.value && roles.value.length) roleId.value = roles.value[0].id
}
async function loadData() {
  if (!roleId.value) return
  const { data } = await api.get(`/role-menu/${roleId.value}`)
  // normalize booleans
  rows.value = data.map(d => ({
    ...d,
    can_read: !!d.can_read,
    can_create: !!d.can_create,
    can_update: !!d.can_update,
    can_delete: !!d.can_delete
  }))
}
async function save() {
  saving.value = true
  try {
    // Buang C/U/D untuk parent sebelum kirim
    const payload = rows.value.map(m => {
      const out = {
        menu_id: m.menu_id ?? m.id,
        can_read: Number(!!m.can_read)
      }
      if (!isParent(m)) {
        out.can_create = Number(!!m.can_create)
        out.can_update = Number(!!m.can_update)
        out.can_delete = Number(!!m.can_delete)
      }
      return out
    })
    await api.put(`/role-menu/${roleId.value}`, { items: payload })
    await loadData()
    ui.showToast({ type: 'success', message: 'Permissions berhasil disimpan' })
  } finally {
    saving.value = false
  }
}
onMounted(async () => { await loadRoles(); await loadData() })
</script>
