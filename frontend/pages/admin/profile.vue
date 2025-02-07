<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-2xl font-semibold mb-6">Personalização</h2>

    <div v-if="loading" class="flex items-center justify-center py-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"
      ></div>
    </div>

    <div v-else-if="error" class="bg-red-50 text-red-500 p-4 rounded-lg">
      {{ error }}
    </div>

    <div v-else class="max-w-2xl space-y-8">
      <!-- Foto e Info Básica -->
      <div class="flex items-start space-x-6">
        <div
          class="group relative cursor-pointer"
          @click="showImageModal = true"
        >
          <img
            :src="getProfileImage(previewImage || userProfile.profilePicture)"
            :alt="userProfile.displayName"
            class="w-24 h-24 rounded-full object-cover ring-2 ring-offset-2 ring-blue-500"
          />
          <div
            class="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center"
          >
            <span class="text-white opacity-0 group-hover:opacity-100"
              >Alterar</span
            >
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

      <!-- Estilos de Borda -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-3"
          >Estilo das Bordas</label
        >
        <div class="grid grid-cols-3 gap-4">
          <!-- Retangular -->
          <button
            @click="setBorderStyle('none')"
            class="group p-4 border hover:border-blue-500 transition-colors"
            :class="{
              'border-blue-500 bg-blue-50':
                userProfile.theme.borderRadius === 'none',
            }"
          >
            <div class="bg-gray-100 w-full h-24">
              <div class="w-full h-8 bg-blue-500 mb-2"></div>
              <div class="space-y-2 px-2">
                <div class="w-full h-3 bg-gray-300"></div>
                <div class="w-2/3 h-3 bg-gray-300"></div>
              </div>
            </div>
            <span class="mt-2 block text-sm font-medium text-gray-600"
              >Retangular</span
            >
          </button>

          <!-- Suave -->
          <button
            @click="setBorderStyle('medium')"
            class="group p-4 border hover:border-blue-500 transition-colors"
            :class="{
              'border-blue-500 bg-blue-50':
                userProfile.theme.borderRadius === 'medium',
            }"
          >
            <div class="bg-gray-100 w-full h-24 rounded-lg">
              <div class="w-full h-8 bg-blue-500 rounded-t-lg mb-2"></div>
              <div class="space-y-2 px-2">
                <div class="w-full h-3 bg-gray-300 rounded"></div>
                <div class="w-2/3 h-3 bg-gray-300 rounded"></div>
              </div>
            </div>
            <span class="mt-2 block text-sm font-medium text-gray-600"
              >Suave</span
            >
          </button>

          <!-- Arredondado -->
          <button
            @click="setBorderStyle('large')"
            class="group p-4 border hover:border-blue-500 transition-colors"
            :class="{
              'border-blue-500 bg-blue-50':
                userProfile.theme.borderRadius === 'large',
            }"
          >
            <div class="bg-gray-100 w-full h-24 rounded-xl">
              <div class="w-full h-8 bg-blue-500 rounded-t-xl mb-2"></div>
              <div class="space-y-2 px-2">
                <div class="w-full h-3 bg-gray-300 rounded-lg"></div>
                <div class="w-2/3 h-3 bg-gray-300 rounded-lg"></div>
              </div>
            </div>
            <span class="mt-2 block text-sm font-medium text-gray-600"
              >Arredondado</span
            >
          </button>
        </div>
      </div>

      <!-- Presets de Tema -->
      <div class="space-y-4">
        <label class="block text-sm font-medium text-gray-700">Temas Predefinidos</label>
        <div class="grid grid-cols-3 gap-4">
          <!-- Dark Theme -->
          <button 
            @click="setThemePreset('dark')"
            class="group p-4 border hover:border-blue-500 transition-colors relative"
            :class="{ 'border-blue-500 bg-blue-50': selectedPreset === 'dark' }"
          >
            <div class="bg-gray-900 w-full h-24 rounded-lg">
              <div class="w-full h-8 bg-indigo-600 rounded-t-lg mb-2"></div>
              <div class="space-y-2 px-2">
                <div class="w-full h-3 bg-white/20 rounded"></div>
                <div class="w-2/3 h-3 bg-white/20 rounded"></div>
              </div>
            </div>
            <span class="mt-2 block text-sm font-medium text-gray-600">Dark</span>
            <div class="absolute bottom-2 right-2 flex gap-1">
              <div class="w-3 h-3 rounded-full bg-gray-900"></div>
              <div class="w-3 h-3 rounded-full bg-indigo-600"></div>
              <div class="w-3 h-3 rounded-full bg-white"></div>
            </div>
          </button>

          <!-- Nature Theme -->
          <button 
            @click="setThemePreset('nature')"
            class="group p-4 border hover:border-blue-500 transition-colors relative"
            :class="{ 'border-blue-500 bg-blue-50': selectedPreset === 'nature' }"
          >
            <div class="bg-emerald-50 w-full h-24 rounded-lg">
              <div class="w-full h-8 bg-emerald-600 rounded-t-lg mb-2"></div>
              <div class="space-y-2 px-2">
                <div class="w-full h-3 bg-emerald-900 rounded"></div>
                <div class="w-2/3 h-3 bg-emerald-900 rounded"></div>
              </div>
            </div>
            <span class="mt-2 block text-sm font-medium text-gray-600">Nature</span>
            <div class="absolute bottom-2 right-2 flex gap-1">
              <div class="w-3 h-3 rounded-full bg-emerald-50"></div>
              <div class="w-3 h-3 rounded-full bg-emerald-600"></div>
              <div class="w-3 h-3 rounded-full bg-emerald-900"></div>
            </div>
          </button>

          <!-- Ocean Theme -->
          <button 
            @click="setThemePreset('ocean')"
            class="group p-4 border hover:border-blue-500 transition-colors relative"
            :class="{ 'border-blue-500 bg-blue-50': selectedPreset === 'ocean' }"
          >
            <div class="bg-sky-50 w-full h-24 rounded-lg">
              <div class="w-full h-8 bg-sky-500 rounded-t-lg mb-2"></div>
              <div class="space-y-2 px-2">
                <div class="w-full h-3 bg-sky-900 rounded"></div>
                <div class="w-2/3 h-3 bg-sky-900 rounded"></div>
              </div>
            </div>
            <span class="mt-2 block text-sm font-medium text-gray-600">Ocean</span>
            <div class="absolute bottom-2 right-2 flex gap-1">
              <div class="w-3 h-3 rounded-full bg-sky-50"></div>
              <div class="w-3 h-3 rounded-full bg-sky-500"></div>
              <div class="w-3 h-3 rounded-full bg-sky-900"></div>
            </div>
          </button>

          <!-- Sunset Theme -->
          <button 
            @click="setThemePreset('sunset')"
            class="group p-4 border hover:border-blue-500 transition-colors relative"
            :class="{ 'border-blue-500 bg-blue-50': selectedPreset === 'sunset' }"
          >
            <div class="bg-orange-50 w-full h-24 rounded-lg">
              <div class="w-full h-8 bg-rose-500 rounded-t-lg mb-2"></div>
              <div class="space-y-2 px-2">
                <div class="w-full h-3 bg-orange-900 rounded"></div>
                <div class="w-2/3 h-3 bg-orange-900 rounded"></div>
              </div>
            </div>
            <span class="mt-2 block text-sm font-medium text-gray-600">Sunset</span>
            <div class="absolute bottom-2 right-2 flex gap-1">
              <div class="w-3 h-3 rounded-full bg-orange-50"></div>
              <div class="w-3 h-3 rounded-full bg-rose-500"></div>
              <div class="w-3 h-3 rounded-full bg-orange-900"></div>
            </div>
          </button>

          <!-- Purple Rain Theme -->
          <button 
            @click="setThemePreset('purple')"
            class="group p-4 border hover:border-blue-500 transition-colors relative"
            :class="{ 'border-blue-500 bg-blue-50': selectedPreset === 'purple' }"
          >
            <div class="bg-violet-50 w-full h-24 rounded-lg">
              <div class="w-full h-8 bg-purple-600 rounded-t-lg mb-2"></div>
              <div class="space-y-2 px-2">
                <div class="w-full h-3 bg-violet-900 rounded"></div>
                <div class="w-2/3 h-3 bg-violet-900 rounded"></div>
              </div>
            </div>
            <span class="mt-2 block text-sm font-medium text-gray-600">Purple Rain</span>
            <div class="absolute bottom-2 right-2 flex gap-1">
              <div class="w-3 h-3 rounded-full bg-violet-50"></div>
              <div class="w-3 h-3 rounded-full bg-purple-600"></div>
              <div class="w-3 h-3 rounded-full bg-violet-900"></div>
            </div>
          </button>

          <!-- Mint Theme -->
          <button 
            @click="setThemePreset('mint')"
            class="group p-4 border hover:border-blue-500 transition-colors relative"
            :class="{ 'border-blue-500 bg-blue-50': selectedPreset === 'mint' }"
          >
            <div class="bg-teal-50 w-full h-24 rounded-lg">
              <div class="w-full h-8 bg-cyan-500 rounded-t-lg mb-2"></div>
              <div class="space-y-2 px-2">
                <div class="w-full h-3 bg-teal-900 rounded"></div>
                <div class="w-2/3 h-3 bg-teal-900 rounded"></div>
              </div>
            </div>
            <span class="mt-2 block text-sm font-medium text-gray-600">Mint</span>
            <div class="absolute bottom-2 right-2 flex gap-1">
              <div class="w-3 h-3 rounded-full bg-teal-50"></div>
              <div class="w-3 h-3 rounded-full bg-cyan-500"></div>
              <div class="w-3 h-3 rounded-full bg-teal-900"></div>
            </div>
          </button>
        </div>
      </div>

      <!-- Cores Personalizadas -->
      <label class="block text-sm font-medium text-gray-700 mb-3"
        >Cores Personalizadas</label
      >
      <div class="grid grid-cols-3 gap-6">
        <div>
          <label class="block text-xs text-gray-500 mb-2">Cor Primária</label>
          <ColorPicker
            v-model="userProfile.theme.primaryColor"
            @update:modelValue="updatePreview"
          />
        </div>

        <div>
          <label class="block text-xs text-gray-500 mb-2">Cor de Fundo</label>
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

    <!-- Modal -->
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
const loading = ref(true);
const error = ref(null);
const userProfile = ref({});
const showImageModal = ref(false);
const previewImage = ref(null);

const { getProfileImage } = useDefaultImage();
import { userService } from "~/services/userService";

const selectedPreset = ref(null);

const themePresets = {
 dark: {
   backgroundColor: '#111827',
   primaryColor: '#4f46e5',
   textColor: '#ffffff',
   borderRadius: 'medium'
 },
 nature: {
   backgroundColor: '#f0fdf4',
   primaryColor: '#059669',
   textColor: '#064e3b',
   borderRadius: 'large'
 },
 ocean: {
   backgroundColor: '#f0f9ff',
   primaryColor: '#0ea5e9',
   textColor: '#0c4a6e',
   borderRadius: 'medium'
 },
 sunset: {
   backgroundColor: '#fff7ed',
   primaryColor: '#f43f5e',
   textColor: '#7c2d12',
   borderRadius: 'large'
 },
 purple: {
   backgroundColor: '#f5f3ff',
   primaryColor: '#9333ea',
   textColor: '#4c1d95',
   borderRadius: 'medium'
 },
 mint: {
   backgroundColor: '#f0fdfa',
   primaryColor: '#06b6d4',
   textColor: '#134e4a',
   borderRadius: 'none'
 }
}

function setThemePreset(preset) {
  selectedPreset.value = preset;
  userProfile.value.theme = { ...themePresets[preset] };
}

function generateRandomImage() {
  previewImage.value = crypto.randomUUID();
}

function closeImageModal() {
  showImageModal.value = false;
  previewImage.value = null;
}

function setBorderStyle(style) {
  userProfile.value.theme.borderRadius = style;
}

async function saveNewImage() {
  if (previewImage.value) {
    userProfile.value.profilePicture = previewImage.value;
    await saveProfile();
    showImageModal.value = false;
  }
}

async function fetchProfile() {
  try {
    loading.value = true;
    userProfile.value = await userService.getProfile();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

async function saveProfile() {
  try {
    await userService.updateProfile({
      displayName: userProfile.value.displayName,
      url: userProfile.value.url,

      theme: {
        backgroundColor: userProfile.value.theme.backgroundColor,
        textColor: userProfile.value.theme.textColor,
        primaryColor: userProfile.value.theme.primaryColor,
        borderRadius: userProfile.value.theme.borderRadius,
      },
      profilePicture: userProfile.value.profilePicture,
    });
    alert("Perfil atualizado com sucesso!");
  } catch (err) {
    alert("Erro ao salvar: " + err.message);
  }
}

onMounted(() => {
  nextTick(fetchProfile);
});
</script>
