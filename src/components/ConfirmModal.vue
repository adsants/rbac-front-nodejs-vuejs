<template>
  <div v-if="ui.confirm.show" class="fixed inset-0 z-40 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/40"></div>
    <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-50">
      <h3 class="text-lg font-semibold mb-2">{{ ui.confirm.title }}</h3>
      <p class="text-gray-600 mb-6">{{ ui.confirm.message }}</p>
      <div class="flex justify-end gap-2">
        <button class="btn-secondary" @click="ui.confirmNo()">Batal</button>
        <button class="btn" @click="ui.confirmYes()">Ya, Hapus</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useUiStore } from '../store/ui'
const ui = useUiStore()
</script>
