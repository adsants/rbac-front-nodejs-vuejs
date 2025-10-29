<template>
  <div>
    <RouterLink v-if="hasPath" :to="item.path"
      class="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100">
      <IconHero v-if="item.icon" :name="item.icon" />
      <span>{{ item.title }}</span>
    </RouterLink>

    <button v-else type="button"
      class="w-full text-left flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 font-semibold text-gray-700"
      @click="toggle">
      <IconHero v-if="item.icon" :name="item.icon" />
      <span>{{ item.title }}</span>
      <span class="ml-auto text-xs">{{ open ? '▾' : '▸' }}</span>
    </button>

    <div v-if="isParent && open" class="ml-4 border-l pl-2 space-y-1">
      <MenuItem v-for="c in item.children" :key="c.id" :item="c" />
    </div>
  </div>
</template>
<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import IconHero from './IconHero.vue'
defineOptions({ name: 'MenuItem' })
const props = defineProps({ item: Object })
const isParent = computed(() => Array.isArray(props.item.children) && props.item.children.length > 0)
const hasPath = computed(() => props.item.path && props.item.path !== '-' && props.item.path !== '')
const open = ref(false); const route = useRoute()
const containsActive = (n) => (n.path && n.path !== '-' && route.path.startsWith(n.path)) || (n.children || []).some(containsActive)
const toggle = () => { if (isParent.value) open.value = !open.value }
onMounted(() => { if (isParent.value && containsActive(props.item)) open.value = true })
</script>
