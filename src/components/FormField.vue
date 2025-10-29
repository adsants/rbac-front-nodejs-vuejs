<template>
  <div class="mb-4">
    <label class="block text-sm font-medium mb-1">{{ label }}</label>
    <input v-if="type !== 'textarea'" :type="type" class="input" v-model="model" :placeholder="placeholder" :required="required" />
    <textarea v-else class="input" rows="4" v-model="model" :placeholder="placeholder" :required="required"></textarea>
    <p v-if="error" class="text-red-600 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'   // <-- tambahkan ini
const props = defineProps({
  modelValue: [String, Number],
  label: String,
  placeholder: String,
  type: { type: String, default: 'text' },
  required: { type: Boolean, default: false },
  error: String
})
const emit = defineEmits(['update:modelValue'])
const model = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})
</script>
