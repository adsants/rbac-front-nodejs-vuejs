import { defineStore } from 'pinia'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:3000/api',
  withCredentials: true
})

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    menus: [],
    initialized: false,
    loading: false,
    error: null
  }),
  actions: {
    async fetchMe() {
      try {
        this.loading = true
        const { data } = await api.get('/auth/me')
        this.user = data.user
        this.menus = data.menus || []
      } catch (e) {
        this.user = null
        this.menus = []
        throw e
      } finally {
        this.loading = false
        this.initialized = true
      }
    },
    async login(payload) {
      const { data } = await api.post('/auth/login', payload)
      this.user = data.user
      this.menus = data.menus || []
      return data
    },
    async register(payload) {
      const { data } = await api.post('/auth/register', payload)
      this.user = data.user
      this.menus = data.menus || []
      return data
    },
    async logout() {
      await api.post('/auth/logout')
      this.user = null
      this.menus = []
    }
  }
})

export { api }
