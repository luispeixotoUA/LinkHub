<template>
  <button
    @click="handleLogout"
    class="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
  >
    Logout
  </button>
</template>

<script setup>
import { useAuth } from "~/composables/useAuth";

const { logout } = useAuth();

const handleLogout = () => {
  logout();
  alert("Logout com sucesso.");
};
</script>
