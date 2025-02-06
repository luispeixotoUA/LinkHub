// userService.js
import { useAuth } from '~/composables/useAuth';

export const userService = {
  async getProfile() {
    const { token } = useAuth();

    const { data, error } = await useFetch('/api/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token.value}`
      },
      server: false
    });

    if (error.value) throw new Error(error.value.message);
    return data.value;
  },

  async updateProfile(userData) {
    const { token } = useAuth();

    // Garante que o tema tem todos os campos antes de enviar
    const theme = {
      backgroundColor: userData.theme?.backgroundColor || '#1e1e1e',
      textColor: userData.theme?.textColor || '#ffffff',
      secondaryColor: userData.theme?.secondaryColor || '#3b82f6'
    };

    const { data, error } = await useFetch('/api/users/profile', {
      method: 'PUT',
      body: {
        ...userData,
        theme
      },
      headers: {
        'Authorization': `Bearer ${token.value}`
      },
      server: false
    });

    if (error.value) throw new Error(error.value.message);
    return data.value;
  }
};