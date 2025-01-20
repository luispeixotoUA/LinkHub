export default defineNuxtRouteMiddleware(() => {
  const { token, isAuthenticated } = useAuth();

  if (process.client) {
    // Verifica se o token está carregado do localStorage
    if (!token.value) {
      const savedToken = localStorage.getItem('authToken');
      if (savedToken) {
        token.value = savedToken;
      }
    }

    // Se o usuário já estiver autenticado, redireciona para /admin
    if (isAuthenticated.value) {
      return navigateTo('/admin');
    }
  }
});