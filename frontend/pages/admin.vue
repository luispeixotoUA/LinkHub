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

const route = useRoute();

// Título dinâmico baseado na rota atual
const currentPageTitle = computed(() => {
  const paths = {
    '/admin': 'Dashboard',
    '/admin/links': 'Gerenciar Links',
    '/admin/profile': 'Perfil',
    '/admin/settings': 'Configurações'
  };
  return paths[route.path] || 'Admin';
});
</script>