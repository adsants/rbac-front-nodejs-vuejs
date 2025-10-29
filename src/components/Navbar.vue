<template>
  <header class="border-b bg-white">
    <div class="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
      <h1 class="font-semibold flex items-center gap-2">
        <IconHero name="menu" /> RBAC App
      </h1>
      <div class="flex items-center gap-3">
        <span class="text-sm text-gray-500" v-if="store.user">Hi, {{ store.user.name }}</span>
        <button class="btn-secondary inline-flex items-center gap-2" @click="logout">
          <IconHero name="logout" /> Logout
        </button>
      </div>
    </div>
  </header>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
import IconHero from './IconHero.vue'
const store = useAuthStore()
const router = useRouter()
const logout = async () => { await store.logout(); router.push('/login') }
</script>
