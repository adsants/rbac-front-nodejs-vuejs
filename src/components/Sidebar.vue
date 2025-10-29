<template>
  <aside class="w-64 bg-white border-r hidden md:block">
    <div class="p-4 font-semibold">Menu</div>
    <nav class="px-2 space-y-1">
      <MenuItem v-for="m in store.menus" :key="m.id" :item="m" />
    </nav>
  </aside>
</template>

<script setup>
import { useAuthStore } from '../store/auth'
import { computed } from 'vue'
import MenuItem from './SidebarItem.vue'
const store = useAuthStore()
</script>
