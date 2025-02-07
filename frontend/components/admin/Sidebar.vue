<template>
  <div class="h-screen flex flex-col bg-gradient-to-b from-gray-800 to-gray-900 text-white w-64 flex-shrink-0 transition-all duration-300 border-r border-gray-700"
       :class="{ 'w-16': isCollapsed, 'fixed md:relative z-50': isMobile }">
    
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-gray-700/50">
      <h1 class="font-bold text-xl bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent" 
          v-show="!isCollapsed">
        LinkHub
      </h1>
      <button @click="toggleSidebar" 
              class="p-2 rounded-lg hover:bg-gray-700/50 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" 
             class="h-5 w-5" 
             fill="none" 
             viewBox="0 0 24 24" 
             stroke="currentColor">
          <path stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 py-4 overflow-y-auto">
      <NuxtLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center px-4 py-3 hover:bg-gray-700/50 transition-colors"
        :class="{ 'bg-blue-500/10 border-l-4 border-blue-500': currentPath === item.path }"
      >
        <span class="text-xl min-w-[24px]" :title="item.name">{{ item.icon }}</span>
        <span class="ml-3 text-sm font-medium whitespace-nowrap" 
              v-show="!isCollapsed">
          {{ item.name }}
        </span>
      </NuxtLink>
    </nav>

    <!-- Profile - Agora fixo no fundo -->
    <div class="mt-auto p-4 border-t border-gray-700/50">
      <div class="flex items-center space-x-3" :class="{ 'justify-center': isCollapsed }">
        <img
          :src="getProfileImage(decodedToken?.profilePicture)"
          alt="Profile"
          class="w-10 h-10 rounded-full ring-2 ring-gray-700"
        />
        <div v-show="!isCollapsed">
          <p class="text-sm font-medium truncate">
            {{ decodedToken?.displayName || 'Admin User' }}
          </p>
          <LogoutButton class="text-xs text-gray-400 hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  </div>
</template>
 
 <script setup>
 const isCollapsed = ref(false);
 const isMobile = ref(false);
 const route = useRoute();
 
 const currentPath = computed(() => route.path);
 const { getProfileImage } = useDefaultImage();
 
 import { useAuth } from '~/composables/useAuth';
 
 const { token } = useAuth();
 const decodedToken = computed(() => {
  if (!token.value) return null;
  return JSON.parse(atob(token.value.split('.')[1]));
 });
 
 const isAdmin = computed(() => decodedToken.value?.isAdmin)
 
 const menuItems = computed(() => {
  if (isAdmin.value) {
    return [
      { name: 'Utilizadores', path: '/admin/admin', icon: '👥' },
    ]
  }
  return [
    { name: 'Dashboard', path: '/admin', icon: '📊' },
    { name: 'Links', path: '/admin/links', icon: '🔗' },
    { name: 'Perfil', path: '/admin/profile', icon: '👤' },
  ]
 })
 
 const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
 };
 
 onMounted(() => {
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 768;
    isCollapsed.value = isMobile.value;
  };
  
  window.addEventListener('resize', checkMobile);
  checkMobile();
  
  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
  });
 });
 </script>