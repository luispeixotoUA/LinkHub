<template>
  <div class="min-h-screen" :style="{ backgroundColor: data?.theme?.backgroundColor }">
    <ClientOnly>
      <!-- Loading -->
      <div v-if="pending" class="flex justify-center">
        <div class="flex items-center space-x-3 bg-opacity-10 rounded-lg backdrop-blur-sm" :style="{ color: data?.theme?.backgroundColor }">
          <svg class="w-6 h-6 animate-spin" :style="{ color: data?.theme?.secondaryColor }" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <span :style="{ color: data?.theme?.textColor }">Carregando perfil...</span>
        </div>
      </div>
 
      <!-- Content -->
      <div v-else-if="data" class="max-w-3xl mx-auto">
        <!-- Profile Header -->
        <div 
          class="rounded-xl shadow-lg mb-8 p-8"
          :style="{ 
            background: `linear-gradient(to bottom right, ${data.theme.secondaryColor}, ${adjustColor(data.theme.secondaryColor, -20)})`,
          }"
        >


        <h1>{{data.theme}}</h1>


          <div class="flex flex-col items-center">
            <img 
              :src="getProfileImage(data.profilePicture)"
              :alt="data.displayName"
              class="w-24 h-24 rounded-full border-4 border-white shadow-md mb-4"
            />
            <h1 class="text-2xl font-bold" :style="{ color: data.theme.textColor }">
              {{ data.displayName }}
            </h1>
            <p class="mt-1 opacity-80" :style="{ color: data.theme.textColor }">
              @{{ data.username }}
            </p>
          </div>
        </div>
 
        <!-- Links Grid -->
        <div class="grid gap-4">
          <a 
            v-for="link in data.links" 
            :key="link.id"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group rounded-lg transition-all duration-200 overflow-hidden"
            :style="{ 
              backgroundColor: adjustColor(data.theme.backgroundColor, 10),
              border: `1px solid ${adjustColor(data.theme.backgroundColor, 20)}`
            }"
          >
            <div class="p-4 flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 flex items-center justify-center rounded-full"
                     :style="{ 
                       backgroundColor: `${data.theme.secondaryColor}20`,
                       color: data.theme.secondaryColor 
                     }">
                  {{ link.title.charAt(0) }}
                </div>
                <span class="font-medium" :style="{ color: data.theme.textColor }">
                  {{ link.title }}
                </span>
              </div>
              <svg 
                class="w-5 h-5 transition-colors" 
                :style="{ color: data.theme.secondaryColor }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </div>
          </a>
        </div>
      </div>
 
      <ErrorComponent v-else />
    </ClientOnly>
  </div>
 </template>
 
 <script setup>
 const route = useRoute();
 const { getProfileImage } = useDefaultImage();
 
 // Função helper para ajustar cores
 function adjustColor(color, amount) {
  const clamp = (num) => Math.min(255, Math.max(0, num));
  
  // Remove o # se existir
  color = color.replace('#', '');
  
  // Converte para RGB
  const num = parseInt(color, 16);
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00FF) + amount;
  let b = (num & 0x0000FF) + amount;
  
  // Clamp e converte de volta para hex
  return '#' + (0x1000000 +
    (clamp(r) << 16) +
    (clamp(g) << 8) +
    clamp(b)
  ).toString(16).slice(1);
 }
 
 const { data, pending, error } = await useAsyncData(
  `user-${route.params.username}`,
  async () => {
    try {
      const response = await $fetch(`/api/users/${route.params.username}`);
      if (!response) throw createError({ statusCode: 404 });
      return response;
    } catch (err) {
      return null;
    }
  },
  {
    server: false,
    immediate: true
  }
 );
 </script>