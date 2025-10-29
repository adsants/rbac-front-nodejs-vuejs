<template>
  <div class="grid gap-6 md:grid-cols-3">
    <div class="card"><div class="text-gray-500">Welcome</div><div class="mt-2 text-xl font-semibold">{{ store.user?.name }}</div></div>
    <div class="card"><div class="text-gray-500">Role</div><div class="mt-2 text-xl font-semibold">{{ store.user?.role_id }}</div></div>
    <div class="card"><div class="text-gray-500">Today</div><div class="mt-2 text-xl font-semibold">{{ new Date().toLocaleString() }}</div></div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../store/auth'
const store = useAuthStore()
</script>
