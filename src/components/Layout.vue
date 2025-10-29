<template>
  <div class="min-h-screen flex relative">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Navbar />
      <main class="p-4 sm:p-6"><slot /></main>
    </div>

    <!-- Overlay saat sidebar terbuka (mobile) -->
    <div
      v-if="ui.sidebarOpen"
      class="fixed inset-0 bg-black/40 z-30 lg:hidden"
      @click="ui.closeSidebar()"
    />
    <ToastHost />
    <ConfirmModal />
  </div>
</template>

<script setup>
import { watch, onUnmounted } from 'vue'
import Sidebar from './Sidebar.vue'
import Navbar from './Navbar.vue'
import ToastHost from './ToastHost.vue'
import ConfirmModal from './ConfirmModal.vue'
import { useUiStore } from '../store/ui'
const ui = useUiStore()

// Lock body scroll saat sidebar terbuka (mobile)
watch(() => ui.sidebarOpen, (v) => { document.body.style.overflow = v ? 'hidden' : '' }, { immediate: true })
onUnmounted(() => { document.body.style.overflow = '' })
</script>
