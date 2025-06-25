// src/composables/auth.ts
import { ref } from 'vue'
import axios from 'axios'

// Trạng thái đăng nhập (giữ trong bộ nhớ)
const token = ref(localStorage.getItem('token') || null)
const isAuthenticated = ref(!!token.value)

// Nếu có token thì gắn vào axios
if (token.value) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
}

// Hàm login
const login = (newToken: string) => {
    token.value = newToken
    isAuthenticated.value = true
    localStorage.setItem('token', newToken)
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
}

// Hàm logout
const logout = () => {
    token.value = null
    isAuthenticated.value = false
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
}

export function useAuth() {
    return {
        token,
        isAuthenticated,
        login,
        logout,
    }
}
