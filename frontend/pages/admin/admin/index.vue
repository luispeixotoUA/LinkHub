<!-- pages/admin/users.vue -->
<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-semibold">Lista de Utilizadores</h2>
    
    <!-- Loading -->
    <div v-if="loading" class="py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
    </div>

    <!-- Erro -->
    <div v-else-if="error" class="text-red-500 font-medium">
      Erro ao carregar utilizadores: {{ error }}
    </div>

    <!-- Tabela de utilizadores -->
    <div v-else>
      <table class="w-full border rounded-lg overflow-hidden">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="text-left p-3">ID</th>
            <th class="text-left p-3">Foto</th>
            <th class="text-left p-3">Username</th>
            <th class="text-left p-3">Display Name</th>
            <th class="text-left p-3">Data de Registo</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
            class="border-b last:border-0"
          >
            <td class="p-3">
              {{ user.id }}
            </td>
            <td class="p-3">
              <img
                :src="user.profilePicture ? getProfileImage(user.profilePicture) : defaultAvatar"
                alt="Foto"
                class="w-8 h-8 rounded-full object-cover"
              />
            </td>
            <td class="p-3">
              {{ user.username }}
            </td>
            <td class="p-3">
              {{ user.displayName }}
            </td>
            <td class="p-3">
              {{ formatDate(user.createdAt) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { userService } from '~/services/userService'
import { useDefaultImage } from '~/composables/useDefaultImage'

const loading = ref(true)
const error = ref(null)
const users = ref([])

// Se tiveres um composable para imagem de perfil default
const { getProfileImage } = useDefaultImage()

// Ou usa alguma imagem placeholder
const defaultAvatar = 'https://via.placeholder.com/50?text=Avatar'

/** Formata a data ISO (createdAt) numa string curta PT-PT */
function formatDate(isoString) {
  if (!isoString) return ''
  const date = new Date(isoString)
  return date.toLocaleDateString('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
onMounted(() => {
  nextTick(fetchUsers);
});
// users.value = await userService.getAllUsers()

async function fetchUsers() {
  try {
    const data = await userService.getAllUsers()
    users.value = data
  } catch (error) {
    console.error('Erro ao carregar utilizadores:', error)
    error.value = error.message
  } finally {
    loading.value = false
  }
}


</script>

<style scoped>
/* Estilos adicionais para a tabela, se desejares */
</style>
