<template>
  <div class="min-h-screen" :style="{ backgroundColor: data?.theme?.backgroundColor }">
    <ClientOnly>
      <!-- Loading -->
      <div v-if="pending" class="flex justify-center">
        <div class="flex items-center space-x-3 bg-opacity-10 rounded-lg backdrop-blur-sm">
          <svg class="w-6 h-6 animate-spin" :style="{ color: data?.theme?.primaryColor }" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <span :style="{ color: data?.theme?.textColor }">Carregando perfil...</span>
        </div>
      </div>

      <!-- Content -->
      <div v-else-if="data" class="max-w-3xl mx-auto p-4">
        <!-- Profile Header -->
        <div 
          class="shadow-lg mb-8 p-8"
          :style="{ 
            backgroundColor: data.theme.primaryColor,
            color: data.theme.textColor,
            borderRadius: getBorderRadius(data.theme.borderRadius)
          }"
        >
          <div class="flex flex-col items-center">
            <img 
              :src="getProfileImage(data.profilePicture)"
              :alt="data.displayName"
              class="w-24 h-24 rounded-full  shadow-md mb-4"
            />
            <h1 class="text-2xl font-bold">{{ data.displayName }}</h1>
            <p class="mt-1 opacity-80">@{{ data.username }}</p>
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
            class="group transition-all duration-200 overflow-hidden"
            :style="{ 
              backgroundColor: data.theme.primaryColor,
              borderRadius: getBorderRadius(data.theme.borderRadius),
              border: `1px solid ${data.theme.primaryColor}`,
              borderOpacity: '0.2'
            }"
            @click="trackLinkClick(link.id)"
          >
            <div class="p-4 flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 flex items-center justify-center"
                     :style="{ 
                       backgroundColor: `${data.theme.primaryColor}20`,
                       color: data.theme.textColor,
                       borderRadius: getBorderRadius(data.theme.borderRadius)
                     }">
                  {{ link.title.charAt(0) }}
                </div>
                <span class="font-medium" :style="{ color: data.theme.textColor }">
                  {{ link.title }}
                </span>
              </div>
              <svg 
                class="w-5 h-5 transition-colors" 
                :style="{ color: data.theme.textColor }"
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
import { metricsService } from "~/services/metricsService";

// Track view on mount
onMounted(() => {
 if (route.params.username) {
  console.log('Tracking profile view');
  metricsService.trackProfileView(route.params.username);
 }
});

// Track link clicks
function trackLinkClick(linkId) {
  metricsService.trackLinkClick(linkId);
}

function getBorderRadius(size) {
  const sizes = {
    none: '0px',
    medium: '0.5rem',
    large: '1rem'
  }
  return sizes[size] || '0.5rem'
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