<template>
  <!-- Sidebar panel -->
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-40 w-72 bg-white border-r transform transition-transform duration-200',
      ui.sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      'lg:static lg:translate-x-0 lg:flex-shrink-0'
    ]"
  >
    <!-- Header kecil + tombol close (mobile) -->
    <div class="lg:hidden flex items-center justify-between px-4 py-3 border-b">
      <div class="font-semibold">Menu</div>
      <button class="p-2 rounded hover:bg-gray-100" @click="ui.closeSidebar()" aria-label="Tutup">
        <IconHero name="x" />
      </button>
    </div>

    <div class="py-3 overflow-y-auto h-full flex flex-col">
      <div class="px-2 space-y-1">
        <SidebarItem v-for="m in store.menus" :key="m.id" :item="m" />
      </div>

      <!-- Avatar bawah -->
      <RouterLink to="/profile" class="mt-auto p-4 border-t flex items-center gap-3 hover:bg-gray-50">
        <img :src="avatarUrl" class="w-10 h-10 rounded-full object-cover" alt="avatar" />
        <div class="min-w-0">
          <div class="text-sm font-semibold truncate">{{ store.user?.name }}</div>
          <div class="text-xs text-gray-500 truncate">{{ store.user?.email }}</div>
        </div>
      </RouterLink>
    </div>
  </aside>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../store/auth'
import { useUiStore } from '../store/ui'
import SidebarItem from './SidebarItem.vue'
import IconHero from './IconHero.vue'

const store = useAuthStore()
const ui = useUiStore()
const route = useRoute()

// Tutup otomatis saat berpindah halaman (mobile)
watch(() => route.fullPath, () => ui.closeSidebar())

const base = (import.meta.env.VITE_API_BASE || '').replace('/api', '')
const avatarUrl = computed(() => {
  if (store.user?.photo) return base + store.user.photo
  const t = encodeURIComponent(store.user?.name || 'U')
  return `https://ui-avatars.com/api/?name=${t}&background=E5E7EB&color=111827`
})
</script>
