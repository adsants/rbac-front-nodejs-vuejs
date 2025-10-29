<template>
  <div class="flex items-center justify-between mt-4">
    <div class="text-sm text-gray-500">Total: {{ meta.total }} | Page {{ meta.page }} / {{ pages }}</div>
    <div class="space-x-2">
      <button class="btn-secondary" :disabled="meta.page <= 1" @click="$emit('change', meta.page - 1)">Prev</button>
      <button class="btn-secondary" :disabled="meta.page >= pages" @click="$emit('change', meta.page + 1)">Next</button>
    </div>
  </div>
</template>

<script setup>

import { computed } from 'vue'   // <-- tambahkan ini
const props = defineProps({ meta: { type: Object, required: true } })
const pages = computed(() => Math.max(1, Math.ceil((props.meta.total || 0) / (props.meta.limit || 10))))
</script>
