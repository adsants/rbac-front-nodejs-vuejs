import { defineStore } from 'pinia'

let _resolve = null

export const useUiStore = defineStore('ui', {
  state: () => ({
    toasts: [],
    confirm: { show: false, title: 'Konfirmasi', message: '' },
    sidebarOpen: false
  }),
  actions: {
    showToast({ type = 'success', message = '', timeout = 2500 } = {}) {
      const id = Math.random().toString(36).slice(2)
      this.toasts.push({ id, type, message })
      setTimeout(() => this.removeToast(id), timeout)
    },
    removeToast(id) { this.toasts = this.toasts.filter(t => t.id !== id) },
    askConfirm({ title = 'Konfirmasi', message = '' } = {}) {
      this.confirm = { show: true, title, message }
      return new Promise((resolve) => { _resolve = resolve })
    },
    confirmYes() { this.confirm.show = false; if (_resolve) _resolve(true); _resolve = null },
    confirmNo() { this.confirm.show = false; if (_resolve) _resolve(false); _resolve = null },
    toggleSidebar() { this.sidebarOpen = !this.sidebarOpen }, 
    openSidebar() { this.sidebarOpen = true },              
    closeSidebar() { this.sidebarOpen = false }
  }
})
