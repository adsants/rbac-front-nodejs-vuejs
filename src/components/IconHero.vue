<template><component :is="Comp" class="w-5 h-5" /></template>
<script setup>
import * as HI from '@heroicons/vue/24/outline'
const props = defineProps({ name: { type: String, required: true } })
const map = {
  home: HI.HomeIcon,
  users: HI.UsersIcon,
  user: HI.UserIcon,
  shield: HI.ShieldCheckIcon,
  menu: HI.Squares2X2Icon,
  settings: HI.AdjustmentsHorizontalIcon,
  master: HI.FolderIcon,
  plus: HI.PlusIcon,
  pencil: HI.PencilSquareIcon,
  trash: HI.TrashIcon,
  cog: HI.CogIcon,
  logout: HI.ArrowRightOnRectangleIcon
}
const Comp = map[props.name] || HI.Square3Stack3DIcon
</script>
