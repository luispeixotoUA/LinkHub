<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-4">Os teus Links</h1>

    <!-- Status de carregamento -->
    <div v-if="pending" class="text-blue-500">Carregando links...</div>

    <!-- Erro -->
    <div v-else-if="error" class="text-red-500">
      <p>Erro: {{ error }}</p>
    </div>

    <!-- Lista de Links -->
    <ul v-else class="space-y-3">
      <li
        v-for="link in links"
        :key="link.id"
        class="bg-white p-4 rounded shadow hover:bg-gray-50"
      >
        <a
          :href="link.url"
          target="_blank"
          class="text-blue-500 hover:underline"
        >
          {{ link.title }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
});

const { token } = useAuth();
const links = ref([]);
const pending = ref(true);
const error = ref(null);

const fetchLinks = async () => {
  try {
    pending.value = true;
    
    const response = await useFetch('/api/links', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token.value}`,
      }
    });

    if (response.error.value) {
      throw new Error(response.error.value.message);
    }

    links.value = response.data.value;
  } catch (err) {
    console.error('Erro:', err);
    error.value = err.message;
    if (err.response?.status === 401) {
      navigateTo('/login');
    }
  } finally {
    pending.value = false;
  }
};

onMounted(fetchLinks);
</script>