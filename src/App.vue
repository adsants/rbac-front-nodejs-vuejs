<template>
  <div>
    <RouterView v-slot="{ Component, route }">
      <component :is="layoutFor(route)">
        <component :is="Component" />
      </component>
    </RouterView>
  </div>
</template>

<script setup>
import { h } from 'vue'
import Layout from './components/Layout.vue'

const AuthLayout = {
  render() {
    return h('div', { class: 'min-h-screen grid place-items-center bg-gradient-to-br from-gray-50 to-gray-100' }, this.$slots.default())
  }
}

const layoutFor = (route) => (route.meta?.authLayout ? AuthLayout : Layout)
</script>
