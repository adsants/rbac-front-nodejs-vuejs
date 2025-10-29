<template>
  <div class="min-h-screen flex">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Navbar />
      <main class="p-6"><slot /></main>
    </div>
    <ToastHost />
    <ConfirmModal />
  </div>
</template>
<script setup>
import Sidebar from './Sidebar.vue'
import Navbar from './Navbar.vue'
import ToastHost from './ToastHost.vue'
import ConfirmModal from './ConfirmModal.vue'
</script>
