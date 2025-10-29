<template>
  <div class="card max-w-2xl">
    <h2 class="text-xl font-semibold mb-4">Ubah Profile</h2>

    <form @submit.prevent="submit">
      <div class="flex items-center gap-4 mb-4">
        <img :src="avatarPreview" class="w-20 h-20 rounded-full object-cover ring-2 ring-gray-200" alt="avatar" />
        <div>
          <input type="file" accept="image/*" @change="onFile" />
          <p class="text-xs text-gray-500">PNG/JPG/WEBP, maks 2MB</p>
        </div>
      </div>

      <FormField label="Name" v-model="form.name" required />
      <FormField label="Email" type="email" v-model="form.email" required />
      <FormField label="Password baru (opsional)" type="password" v-model="form.password" />

      <div class="flex gap-2 mt-2">
        <button class="btn" :disabled="loading">{{ loading ? 'Saving...' : 'Save' }}</button>
        <RouterLink to="/" class="btn-secondary">Cancel</RouterLink>
      </div>

      <div v-if="error" class="text-red-600 mt-3">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { api, useAuthStore } from '../store/auth'
import { useUiStore } from '../store/ui'
import FormField from '../components/FormField.vue'

const store = useAuthStore()
const ui = useUiStore()

const form = reactive({ name: '', email: '', password: '' })
const file = ref(null)
const loading = ref(false)
const error = ref('')

const base = (import.meta.env.VITE_API_BASE || '').replace('/api', '')
const avatarPreview = computed(() => {
  if (file.value) return URL.createObjectURL(file.value)
  if (store.user?.photo) return base + store.user.photo
  // fallback inisial
  const t = encodeURIComponent(store.user?.name || 'U')
  return `https://ui-avatars.com/api/?name=${t}&background=E5E7EB&color=111827`
})

function onFile(e) { const f = e.target.files?.[0]; if (f) file.value = f }

async function load() {
  const { data } = await api.get('/profile')
  form.name = data.name; form.email = data.email
}

async function submit() {
  loading.value = true; error.value = ''
  try {
    const fd = new FormData()
    fd.append('name', form.name)
    fd.append('email', form.email)
    if (form.password) fd.append('password', form.password)
    if (file.value) fd.append('photo', file.value)
    const { data } = await api.put('/profile', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
    // update store user
    store.user = { ...store.user, ...data }
    ui.showToast({ type: 'success', message: 'Profile berhasil diperbarui' })
  } catch (e) {
    error.value = e?.response?.data?.message || 'Gagal menyimpan'
    ui.showToast({ type: 'error', message: error.value })
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>
