import { useAuthStore } from '../store/auth'

function apply(el, allowed, disable) {
  if (allowed) return
  if (disable) {
    el.setAttribute('disabled', '')
    el.classList.add('opacity-50','pointer-events-none','cursor-not-allowed')
  } else {
    el.style.display = 'none'
  }
}
export default {
  mounted(el, binding) {
    const { value, modifiers } = binding  // value: { key, action }, modifiers: { disable }
    const auth = useAuthStore()
    const ok = auth.hasPermission(value?.key, value?.action || 'can_read')
    apply(el, ok, !!(modifiers.disable || modifiers.disabled))
  },
}
