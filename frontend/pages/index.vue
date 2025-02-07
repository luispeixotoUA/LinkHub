<template>
  <div>Redirecionando para /admin...</div>
</template>

<script setup>
import { onMounted } from 'vue'
import { navigateTo } from '#app'

onMounted(() => {
  navigateTo('/admin')
})
</script>
