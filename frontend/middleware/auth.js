// middleware/auth.global.js (por exemplo)
import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware((to, from) => {
  const { token, isAuthenticated } = useAuth()
  
  if (process.client) {
    // Se não tivermos o token carregado em memória, tentamos ir ao localStorage
    if (!token.value) {
      const savedToken = localStorage.getItem('authToken')
      if (savedToken) {
        token.value = savedToken
      }
    }
    
    // Se o user não estiver autenticado, redirecionamos para '/'
    if (!isAuthenticated.value) {
      return navigateTo('/')
    }
    
    // Decodifica o token para ver se é admin
    const parts = token.value.split('.')
    if (parts.length === 3) {
      try {
        const payload = JSON.parse(atob(parts[1]))
        // Se a rota atual for uma rota "admin" e o user NÃO for admin
        if (to.path.startsWith('/admin/admin') && !payload.isAdmin) {
          // Redireciona para a home (ou outro local)
          return navigateTo('/admin')
        }
      } catch (err) {
        console.error('Erro ao decodificar token:', err)
        // Se der erro ao decodificar, podemos tratar como sem permissões
        return navigateTo('/')
      }
    }
  }
})
