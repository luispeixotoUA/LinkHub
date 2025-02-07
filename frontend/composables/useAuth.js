export const useAuth = () => {
  const token = useState('token', () => null);

  // Função para verificar se o token JWT é válido
  const isTokenValid = (token) => {
    if (!token) return false;

    try {
      // Decodifica o token (parte payload)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));

      // Verifica se o token expirou
      const expirationTime = payload.exp * 1000; // Converter para milissegundos
      return Date.now() < expirationTime;
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      return false;
    }
  };

  // Verifica o token ao inicializar
  if (process.client) {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      if (isTokenValid(savedToken)) {
        token.value = savedToken;
      } else {
        // Se o token não é válido, remove-o
        console.log('Token expirado, removendo...');
        localStorage.removeItem('authToken');
        token.value = null;
      }
    }
  }

  const login = async (username, password) => {
    try {
      const { data, error } = await useFetch('/api/auth/login', {
        method: 'POST',
        body: { username, password },
      });

      if (error.value) {
        throw new Error(error.value.data?.error || 'Credenciais inválidas');
      }

      const jwtToken = data.value?.token;
      if (jwtToken && isTokenValid(jwtToken)) {
        token.value = jwtToken;
        localStorage.setItem('authToken', jwtToken);
      } else {
        throw new Error('Token inválido recebido do servidor');
      }
      return jwtToken;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  };

  // Função para verificar token periodicamente
  const startTokenCheck = () => {
    if (process.client) {
      setInterval(() => {
        const currentToken = token.value;
        if (currentToken && !isTokenValid(currentToken)) {
          console.log('Token expirou durante a sessão');
          logout();
          window.location.href = '/login'; // Força recarregamento para login
        }
      }, 60000); // Verifica a cada minuto
    }
  };

  // Inicia verificação periódica
  startTokenCheck();

  const register = async (username, password) => {
    try {
      const { data, error } = await useFetch('/api/auth/register', {
        method: 'POST',
        body: { username, password },
        onResponseError({ response }) {
          console.error('Erro na resposta:', response._data);
          throw new Error(response._data?.error || 'Erro ao registar');
        }
      });

      if (error.value) {
        const errorMessage = error.value.data?.error || 'Erro ao registar';
        console.error('Erro no registro:', errorMessage);
        throw new Error(errorMessage);
      }

      return data.value;
    } catch (error) {
      console.error('Erro ao registar:', error);
      throw error;
    }
  };

  const logout = () => {
    token.value = null;
    localStorage.removeItem('authToken');
  };

  const isAuthenticated = computed(() => {
    return token.value && isTokenValid(token.value);
  });

  return {
    login,
    register,
    logout,
    token,
    isAuthenticated,
    isTokenValid
  };
};