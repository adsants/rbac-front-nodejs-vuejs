<template>
  <div class="card max-w-2xl">
    <h2 class="text-xl font-semibold mb-4">{{ isNew ? 'Tambah Role' : 'Edit Role' }}</h2>
    <form @submit.prevent="submit">
      <FormField label="Name" v-model="form.name" required />
      <FormField label="Description" v-model="form.description" />
      <div class="flex gap-2">
        <button class="btn" :disabled="loading">{{ loading ? 'Saving...' : 'Save' }}</button>
        <RouterLink class="btn-secondary" to="/roles">Cancel</RouterLink>
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
const loading = ref(false)
const error = ref('')
const form = reactive({ name: '', description: '' })

async function loadData() {
  if (!isNew.value) {
    const { data } = await api.get(`/roles/${id}`)
    Object.assign(form, data)
  }
}
async function submit() {
  loading.value = true; error.value = ''
  try {
    if (isNew.value) await api.post('/roles', form)
    else await api.put(`/roles/${id}`, form)
    router.push('/roles')
  } catch (e) {
    error.value = e?.response?.data?.message || 'Gagal menyimpan'
  } finally {
    loading.value = false
  }
}
onMounted(loadData)
</script>
