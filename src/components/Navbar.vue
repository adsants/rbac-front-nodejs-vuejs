<template>
  <header class="border-b bg-white">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <!-- Toggle hanya mobile -->
        <button class="lg:hidden btn-secondary p-2" @click="ui.toggleSidebar()" aria-label="Toggle menu">
          <IconHero name="bars" />
        </button>
        <h1 class="font-semibold hidden sm:flex items-center gap-2">
          <IconHero name="menu" /> RBAC App
        </h1>
      </div>
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
import { useUiStore } from '../store/ui'
import IconHero from './IconHero.vue'
const store = useAuthStore()
const ui = useUiStore()
const router = useRouter()
const logout = async () => { await store.logout(); router.push('/login') }
</script>
