<template>
  <button @click="handleLogout" class="text-sm text-gray-400 hover:text-white">
    Sair
  </button>
</template>

<script setup>
const { logout } = useAuth();
const router = useRouter();

const handleLogout = async () => {
  await logout();
  router.push("/login");
};
</script>
