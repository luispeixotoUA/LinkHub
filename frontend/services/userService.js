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

  async getAllUsers() {
    const { token } = useAuth();

    const { data, error } = await useFetch('/api/users/getAll', {
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

    // Mantenha todos os dados existentes do perfil
    const { data, error } = await useFetch('/api/users/profile', {
      method: 'PUT',
      body: {
        displayName: userData.displayName,
        url: userData.url,
        profilePicture: userData.profilePicture,
        theme: {
          primaryColor: userData.theme.primaryColor,
          backgroundColor: userData.theme.backgroundColor,
          textColor: userData.theme.textColor,
          borderRadius: userData.theme.borderRadius
        }
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