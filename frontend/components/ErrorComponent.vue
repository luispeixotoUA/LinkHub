<template>
  <div class="flex flex-col items-center mt-10 text-center">
    <h1 class="text-2xl font-bold text-gray-800">The page you’re looking for doesn’t exist.</h1>
    <p class="text-gray-600 mt-2">
      Want this to be your username? <span class="text-blue-500 font-bold cursor-pointer">Create your Linktree now</span>.
    </p>
    <NuxtLink
      to="/register"
      class="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
    >
      Get Started
    </NuxtLink>
  </div>
</template>