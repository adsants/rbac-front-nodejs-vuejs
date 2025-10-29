<template>
  <div class="w-full max-w-md">
    <div class="card">
      <h2 class="text-2xl font-semibold mb-6 text-center">Register</h2>
      <form @submit.prevent="submit">
        <FormField label="Name" v-model="form.name" required />
        <FormField label="Email" type="email" v-model="form.email" required />
        <FormField label="Password" type="password" v-model="form.password" required />
        <div v-if="error" class="text-red-600 text-sm mb-3">{{ error }}</div>
        <button class="btn w-full" :disabled="loading">{{ loading ? 'Loading...' : 'Register' }}</button>
      </form>
      <p class="text-sm text-center mt-4">Sudah punya akun? <RouterLink class="link" to="/login">Login</RouterLink></p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
import FormField from '../components/FormField.vue'

const store = useAuthStore()
const router = useRouter()
const form = reactive({ name: '', email: '', password: '' })
const loading = ref(false)
const error = ref('')

const submit = async () => {
  loading.value = true; error.value=''
  try {
    await store.register(form)
    router.push('/')
  } catch (e) {
    error.value = e?.response?.data?.message || 'Register gagal'
  } finally {
    loading.value = false
  }
}
</script>
