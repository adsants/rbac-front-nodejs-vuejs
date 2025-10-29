<template>
  <div class="fixed top-4 right-4 space-y-3 z-50">
    <transition-group name="fade" tag="div">
      <div v-for="t in ui.toasts" :key="t.id"
           class="w-80 rounded-xl shadow-lg p-4 text-sm"
           :class="t.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200'
                  : t.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200'
                  : 'bg-gray-50 text-gray-800 border border-gray-200'">
        <div class="font-medium mb-1 capitalize">{{ t.type }}</div>
        <div>{{ t.message }}</div>
      </div>
    </transition-group>
  </div>
</template>
<script setup>
import { useUiStore } from '../store/ui'
const ui = useUiStore()
</script>
<style>
.fade-enter-active, .fade-leave-active { transition: opacity .2s, transform .2s }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
