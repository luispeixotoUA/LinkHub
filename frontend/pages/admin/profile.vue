<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-2xl font-semibold mb-6">Personalização</h2>
    
    <div v-if="loading" class="flex items-center justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
    </div>
    
    <div v-else-if="error" class="bg-red-50 text-red-500 p-4 rounded-lg">{{ error }}</div>
    
    <div v-else class="max-w-2xl space-y-8">
      <!-- Foto e Info Básica -->
      <div class="flex items-start space-x-6">
        <div class="group relative cursor-pointer" @click="showImageModal = true">
          <img 
            :src="getProfileImage(previewImage || userProfile.profilePicture)" 
            :alt="userProfile.displayName" 
            class="w-24 h-24 rounded-full object-cover ring-2 ring-offset-2 ring-blue-500"
          />
          <div
            class="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center"
          >
            <span class="text-white opacity-0 group-hover:opacity-100">Alterar</span>
          </div>
        </div>
        
        <div class="space-y-4 flex-1">
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Nome de Exibição
            </label>
            <input
              v-model="userProfile.displayName"
              type="text"
              class="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div class="mt-1 flex rounded-lg shadow-sm">
              <span
                class="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
              >
                @
              </span>
              <input
                v-model="userProfile.username"
                disabled
                type="text"
                class="flex-1 px-3 py-2 border rounded-none rounded-r-lg bg-gray-50"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- URL Personalizada -->
      <div>
        <label class="block text-sm font-medium text-gray-700">
          URL do Perfil
        </label>
        <div class="mt-1 flex rounded-lg shadow-sm">
          <span
            class="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
          >
            linkhub.com/
          </span>
          <input
            v-model="userProfile.url"
            type="text"
            class="flex-1 px-3 py-2 border rounded-none rounded-r-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <!-- Presets de Tema -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-3">
          Estilo Visual
        </label>
        <div class="grid grid-cols-2 gap-4">
          <button
            @click="applyPreset('modern')"
            class="p-4 border rounded-xl hover:border-blue-500 transition-colors"
            :class="{ 'border-blue-500 bg-blue-50': selectedPreset === 'modern' }"
          >
            <div class="text-center space-y-2">
              <div class="w-full h-20 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500"></div>
              <span class="text-sm font-medium">Moderno</span>
            </div>
          </button>
          
          <button
            @click="applyPreset('minimal')"
            class="p-4 border rounded hover:border-blue-500 transition-colors"
            :class="{ 'border-blue-500 bg-blue-50': selectedPreset === 'minimal' }"
          >
            <div class="text-center space-y-2">
              <div class="w-full h-20 rounded bg-gray-100"></div>
              <span class="text-sm font-medium">Minimalista</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Cores Personalizadas -->
      <div class="grid grid-cols-3 gap-6">
        <div>
          <label class="block text-xs text-gray-500 mb-2">Cor Principal</label>
          <ColorPicker
            v-model="userProfile.theme.backgroundColor"
            @update:modelValue="updatePreview"
          />
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-2">Cor do Texto</label>
          <ColorPicker
            v-model="userProfile.theme.textColor"
            @update:modelValue="updatePreview"
          />
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-2">Cor de Destaque</label>
          <ColorPicker
            v-model="userProfile.theme.secondaryColor"
            @update:modelValue="updatePreview"
          />
        </div>
      </div>

      <!-- Preview -->
      <div class="border rounded-lg p-4">
        <h3 class="text-sm font-medium text-gray-700 mb-3">Preview</h3>
        <div
          class="w-full h-40 rounded-lg"
          :style="{ 
            background: `linear-gradient(to right, ${userProfile.theme.backgroundColor}, ${userProfile.theme.secondaryColor})`,
            borderRadius: selectedPreset === 'modern' ? '1rem' : '0.375rem'
          }"
        >
        </div>
      </div>

      <!-- Salvar -->
      <div class="flex justify-end pt-4">
        <button
          @click="saveProfile"
          class="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
        >
          Salvar Alterações
        </button>
      </div>
    </div>

    <!-- Modal para alterar imagem -->
    <Modal v-if="showImageModal" @close="closeImageModal">
      <div class="p-6 space-y-6">
        <h3 class="text-lg font-semibold">Alterar Foto de Perfil</h3>
        <div class="flex justify-center">
          <img
            :src="getProfileImage(previewImage || userProfile.profilePicture)"
            class="w-40 h-40 rounded-full object-cover ring-4 ring-offset-4 ring-blue-500"
          />
        </div>
        <div class="flex justify-center gap-4">
          <button
            @click="generateRandomImage"
            class="px-4 py-2 border hover:border-gray-300 rounded-lg transition-colors"
          >
            Gerar Aleatória
          </button>
          <button
            @click="saveNewImage"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Confirmar
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { userService } from '~/services/userService'
import { useDefaultImage } from '~/composables/useDefaultImage'
// ou ajusta o import do ColorPicker e Modal conforme o teu setup

const loading = ref(true)
const error = ref(null)

// Perfil do utilizador + tema
const userProfile = ref({
  displayName: '',
  username: '',
  url: '',
  profilePicture: '',
  theme: {
    backgroundColor: '',
    textColor: '',
    secondaryColor: ''
  }
})

// Modal de mudança de imagem
const showImageModal = ref(false)
const previewImage = ref(null)

// Para obter imagem por defeito (se tiver)
const { getProfileImage } = useDefaultImage()

function generateRandomImage() {
  previewImage.value = crypto.randomUUID()
}

function closeImageModal() {
  showImageModal.value = false
  previewImage.value = null
}

async function saveNewImage() {
  if (previewImage.value) {
    userProfile.value.profilePicture = previewImage.value
    await saveProfile()
    showImageModal.value = false
  }
}

// Carrega o perfil ao montar o componente
onMounted(() => {
  nextTick(fetchProfile)
})

async function fetchProfile() {
  try {
    loading.value = true
    // Busca do serviço
    userProfile.value = await userService.getProfile()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

async function saveProfile() {
  try {
    // Só enviamos as 3 cores ao back-end
    await userService.updateProfile({
      displayName: userProfile.value.displayName,
      username: userProfile.value.username,
      url: userProfile.value.url,
      profilePicture: userProfile.value.profilePicture,

      theme: {
        backgroundColor: userProfile.value.theme.backgroundColor,
        textColor: userProfile.value.theme.textColor,
        secondaryColor: userProfile.value.theme.secondaryColor
      }
    })
    alert('Perfil atualizado com sucesso!')
  } catch (err) {
    alert('Erro ao salvar: ' + err.message)
  }
}

// Caso queiras presets "Moderno" e "Minimal"
const selectedPreset = ref(null)

function applyPreset(preset) {
  selectedPreset.value = preset
  if (preset === 'modern') {
    userProfile.value.theme.backgroundColor = '#0ea5e9' // Exemplo
    userProfile.value.theme.textColor = '#ffffff'
    userProfile.value.theme.secondaryColor = '#6366f1'
  } else if (preset === 'minimal') {
    userProfile.value.theme.backgroundColor = '#ffffff'
    userProfile.value.theme.textColor = '#111827'
    userProfile.value.theme.secondaryColor = '#9ca3af'
  }
}

// Apenas para forçar atualização do preview imediato
function updatePreview() {
  // Se quiseres alguma lógica extra durante a alteração, podes pôr aqui
}
</script>
