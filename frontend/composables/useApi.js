// composables/useApi.js
export const useApi = () => {
  const config = useRuntimeConfig()
  
  const fetchProfile = async (username) => {
    const { data, error } = await useFetch(`/users/${username}`, {
      baseURL: config.public.apiBase,
      headers: {
        'Accept': 'application/json'
      },
      key: `profile-${username}`,
      transform: (response) => {
        if (!response) throw new Error('Dados não encontrados')
        return {
          username: response.username,
          profilePicture: response.profilePicture,
          links: response.links || []
        }
      }
    })

    if (error.value) {
      console.error('Erro ao carregar perfil:', error.value)
      throw new Error(error.value.message)
    }

    return data.value
  }

  return {
    fetchProfile
  }
}