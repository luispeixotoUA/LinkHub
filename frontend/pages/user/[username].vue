<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-100 py-10">
    <ClientOnly>
      <!-- Status de carregamento -->
      <div v-if="pending" class="flex items-center space-x-2 text-blue-500">
        <svg
          class="w-6 h-6 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
        <span class="text-lg font-medium">Carregando informações...</span>
      </div>

      <!-- Conteúdo -->
      <div v-else-if="data" class="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <!-- Perfil do Usuário -->
        <div class="flex flex-col items-center mb-6">
          <div class="container py-6 px-3 mx-auto">
            <div class="flex flex-col justify-center">
              <div class="flex flex-col text-center animate-fade-in-down">
                <img
                  :src="data.profilePicture"
                  alt="Foto de perfil"
                  width="96"
                  height="96"
                  class="rounded-full mx-auto animate-fade-in-down"
                  @error="handleImageError"
                />
                <h1 class="mt-3 text-base">@{{ data.username }}</h1>
                <span class="text-sm text-slate-500">{{ data.displayName }}</span>
              </div>
            </div>
          </div>

          <div class="container px-3 mx-auto mt-3 lg:mt-5 space-y-3 animate-fade-in-down">
            <div
              v-for="link in data.links"
              :key="link.id"
              class="bg-slate-700 w-80 lg:w-1/3 justify-center mx-auto text-center py-4 px-5 rounded-lg hover:scale-110 transition duration-150 text-white"
            >
              <span class="font-semibold">
                <a :href="link.url" target="_blank" rel="noopener noreferrer">
                  {{ link.title }}
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- Componente de erro customizado -->
      <ErrorComponent v-else />
    </ClientOnly>
  </div>
</template>

<script setup>
const route = useRoute();

// Lida com erros na imagem
const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/96';
};

// Busca os dados do usuário
const { data, pending, error } = await useAsyncData(
  `user-${route.params.username}`,
  async () => {
    try {
      console.log('Buscando usuário:', route.params.username);
      const response = await $fetch(`/api/users/${route.params.username}`);
      
      console.log('Resposta da API:', response);

      if (!response) {
        throw createError({
          statusCode: 404,
          message: 'Utilizador não encontrado'
        });
      }

      return {
        username: response.username,
        displayName: response.displayName,
        profilePicture: response.profilePicture,
        theme: response.theme,
        links: response.links || []
      };
    } catch (err) {
      console.error('Erro ao buscar usuário:', err);
      throw createError({
        statusCode: err.response?.status || 404,
        message: 'Utilizador não encontrado'
      });
    }
  },
  {
    server: false, // Forçar execução no cliente
    immediate: true
  }
);

// Se não houver dados e não estiver carregando, mostra erro 404
watchEffect(() => {
  if (!pending.value && !data.value) {
    throw createError({
      statusCode: 404,
      message: 'Utilizador não encontrado'
    });
  }
});
</script>

<style>
.animate-fade-in-down {
  animation: fadeInDown 0.5s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>