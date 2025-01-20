<template>
  <div class="flex justify-center items-center h-screen bg-gray-50">
    <div class="bg-white shadow-md rounded-md p-8 w-96">
      <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>
      <form @submit.prevent="handleLogin">
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
          Entrar
        </button>
      </form>
      <p class="mt-4 text-center">
        Não tens conta? <NuxtLink to="/register" class="text-blue-500">Regista-te</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from '#app';
import { useAuth } from '~/composables/useAuth';

const username = ref('');
const password = ref('');
const router = useRouter();
const { login } = useAuth();

definePageMeta({
  middleware: 'authenticated',
});

const handleLogin = async () => {
  try {
    const token = await login(username.value, password.value); // Faz login
    console.log('Token recebido:', token);
    router.push('/'); // Redireciona após o login bem-sucedido
  } catch (error) {
    alert('Erro ao fazer login. Verifica as tuas credenciais.');
  }
};
</script>