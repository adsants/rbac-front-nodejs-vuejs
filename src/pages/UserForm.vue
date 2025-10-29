<template>
  <div class="card max-w-2xl">
    <h2 class="text-xl font-semibold mb-4">{{ isNew ? 'Tambah User' : 'Edit User' }}</h2>
    <form @submit.prevent="submit">
      <FormField label="Name" v-model="form.name" required />
      <FormField label="Email" type="email" v-model="form.email" required />
      <FormField label="Password" type="password" v-model="form.password" :required="isNew" />
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Role</label>
        <select class="input" v-model.number="form.role_id" required>
          <option v-for="r in roles" :key="r.id" :value="r.id">{{ r.name }}</option>
        </select>
      </div>
      <div class="flex gap-2">
        <button class="btn" :disabled="loading">{{ loading ? 'Saving...' : 'Save' }}</button>
        <RouterLink class="btn-secondary" to="/users">Cancel</RouterLink>
      </div>
      <div v-if="error" class="text-red-600 mt-3">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../store/auth'
import FormField from '../components/FormField.vue'

const route = useRoute(); const router = useRouter()
const id = route.params.id
const isNew = computed(() => !id)
const roles = ref([])
const loading = ref(false)
const error = ref('')
const form = reactive({ name: '', email: '', password: '', role_id: null })

async function loadRoles() {
  const { data } = await api.get('/roles', { params: { page: 1, limit: 100 } })
  roles.value = data.data
}
async function loadData() {
  if (!isNew.value) {
    const { data } = await api.get(`/users/${id}`)
    Object.assign(form, data)
  }
}
async function submit() {
  loading.value = true; error.value = ''
  try {
    if (isNew.value) await api.post('/users', form)
    else await api.put(`/users/${id}`, form)
    router.push('/users')
  } catch (e) {
    error.value = e?.response?.data?.message || 'Gagal menyimpan'
  } finally {
    loading.value = false
  }
}
onMounted(() => { loadRoles(); loadData() })
</script>
