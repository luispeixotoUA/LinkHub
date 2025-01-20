<template>
  <div class="flex justify-center items-center h-screen bg-gray-50">
    <div class="bg-white shadow-md rounded-md p-8 w-96">
      <h2 class="text-2xl font-bold mb-4 text-center">Registar</h2>
      <form @submit.prevent="handleRegister">
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          class="w-full mb-3 p-2 border rounded-md"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full mb-3 p-2 border rounded-md"
        />
        <button
          type="submit"
          class="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Registar
        </button>
      </form>
      <p class="mt-4 text-center">
        Já tens uma conta? <NuxtLink to="/login" class="text-blue-500">Faz login</NuxtLink>
      </p>
      <div v-if="error" class="text-red-500 mt-2">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '~/composables/useAuth';

definePageMeta({
  middleware: 'authenticated'
});

const router = useRouter();
const { register } = useAuth();

const username = ref('');
const password = ref('');
const error = ref(null);

const handleRegister = async () => {
  try {
    error.value = null;
    await register(username.value, password.value);
    alert('Conta criada com sucesso! Faz login para continuar.');
    router.push('/login');
  } catch (err) {
    error.value = err.message || 'Erro ao criar conta. Tenta novamente.';
    console.error('Erro no registro:', err);
  }
};
</script>