<!-- error.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p class="text-xl text-gray-600 mb-8">{{ error.statusMessage || 'Página não encontrada' }}</p>
      <button 
        @click="handleError"
        class="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
      >
        Voltar para home
      </button>
    </div>
  </div>
</template>

<script setup>
const error = useError();

const handleError = () => {
  clearError({ redirect: '/' });
};
</script>