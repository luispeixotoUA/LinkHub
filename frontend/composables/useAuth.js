export const useAuth = () => {
  const token = useState('token', () => null);

  if (process.client && !token.value) {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      token.value = savedToken;
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
      if (jwtToken) {
        token.value = jwtToken;
        localStorage.setItem('authToken', jwtToken);
      }
      return jwtToken;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  };

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

  const isAuthenticated = computed(() => !!token.value);

  return { login, register, logout, token, isAuthenticated };
};