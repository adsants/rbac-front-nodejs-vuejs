<template>
  <div class="card max-w-2xl">
    <h2 class="text-xl font-semibold mb-4">{{ isNew ? 'Tambah Menu' : 'Edit Menu' }}</h2>
    <form @submit.prevent="submit">
      <FormField label="Key" v-model="form.key" required />
      <FormField label="Title" v-model="form.title" required />
      <FormField label="Path" v-model="form.path" />
      <FormField label="Icon" v-model="form.icon" />
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Parent</label>
        <select class="input" v-model.number="form.parent_id">
          <option :value="null">None</option>
          <option v-for="m in parents" :key="m.id" :value="m.id">{{ m.title }}</option>
        </select>
      </div>
      <FormField label="Sort" type="number" v-model="form.sort" />
      <div class="flex gap-2">
        <button class="btn" :disabled="loading">{{ loading ? 'Saving...' : 'Save' }}</button>
        <RouterLink class="btn-secondary" to="/menus">Cancel</RouterLink>
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
const parents = ref([])
const loading = ref(false)
const error = ref('')
const form = reactive({ key: '', title: '', path: '', icon: '', parent_id: null, sort: 0 })

async function loadParents() {
  const { data } = await api.get('/menus', { params: { page: 1, limit: 100 } })
  parents.value = data.data.filter(x => !x.parent_id) // only top-level
}
async function loadData() {
  if (!isNew.value) {
    const { data } = await api.get(`/menus/${id}`)
    Object.assign(form, data)
  }
}
async function submit() {
  loading.value = true; error.value = ''
  try {
    if (isNew.value) await api.post('/menus', form)
    else await api.put(`/menus/${id}`, form)
    router.push('/menus')
  } catch (e) {
    error.value = e?.response?.data?.message || 'Gagal menyimpan'
  } finally {
    loading.value = false
  }
}
onMounted(() => { loadParents(); loadData() })
</script>
