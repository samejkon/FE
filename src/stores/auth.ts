import { defineStore } from 'pinia'
import { api as apiUser } from '@/modules/customer/lib/axios'
import { api as apiAdmin } from '@/modules/admin/lib/axios'

const TOKEN_KEY = 'jwt_token'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    type: null,
    user: null,
    userLoaded: false,
    token: localStorage.getItem(TOKEN_KEY) || null,
  }),

  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },
    clearToken() {
      this.token = null
      localStorage.removeItem(TOKEN_KEY)
    },
    async loginUser(credentials: any) {
      try {
        const res = await apiUser.post('/login', credentials)
        this.setToken((res.data as any).token)
        await this.fetchUser()
        return true
      } catch (e) {
        this.clearUser()
        return false
      }
    },
    async loginAdmin(credentials: any) {
      try {
        const res = await apiAdmin.post('/login', credentials)
        this.setToken((res.data as any).token)
        await this.fetchAdmin()
        return true
      } catch (e) {
        this.clearUser()
        return false
      }
    },
    async fetchUser() {
      if (!this.token) return this.clearUser()
      try {
        const res = await apiUser.get('/profile', {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        this.type = 'user'
        this.user = (res.data as any).data
        this.userLoaded = true
      } catch {
        this.clearUser()
      }
    },
    async fetchAdmin() {
      if (!this.token) return this.clearUser()
      try {
        const res = await apiAdmin.get('/profile', {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        this.type = 'admin'
        this.user = (res.data as any).data
        this.userLoaded = true
      } catch {
        this.clearUser()
      }
    },
    logout() {
      this.clearUser()
      this.clearToken()
    },
    clearUser() {
      this.type = null
      this.user = null
      this.userLoaded = true
      this.clearToken()
    },
  },
})
