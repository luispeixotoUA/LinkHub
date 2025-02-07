<template>
  <div class="flex w-full h-[100vh] bg-gray-100">
    <!-- Sidebar -->
    <AdminSidebar />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Top Navigation -->
      <header class="bg-white shadow-sm">
        <div class="flex items-center justify-between p-4">
          <h1 class="text-2xl font-semibold text-gray-800">
            {{ currentPageTitle }}
          </h1>


          <div class="flex items-center space-x-2">
            <!-- Botão grande para "Ver minha página" -->
            <button
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              @click="goToMyPage"
            >
              Ver a minha página
            </button>

            </div>



          <LogoutButton class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors" />
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  layout: false
});

import { useAuth } from '~/composables/useAuth';
 
 const { token } = useAuth();
 const decodedToken = computed(() => {
  if (!token.value) return null;
  return JSON.parse(atob(token.value.split('.')[1]));
 });


 function goToMyPage() {
  console.log(decodedToken)
  window.open(`/user/${decodedToken.value.url}`, '_blank');
}

const route = useRoute();

// Título dinâmico baseado na rota atual
const currentPageTitle = computed(() => {
  const paths = {
    '/': 'Dashboard',
    '/admin/links': 'Gerenciar Links',
    '/admin/profile': 'Perfil',
    '/admin/settings': 'Configurações'
  };
  return paths[route.path] || 'Admin';
});
</script>