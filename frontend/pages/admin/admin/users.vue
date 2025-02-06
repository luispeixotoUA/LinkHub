<!-- pages/admin/users.vue -->
<template>
  <div class="space-y-6">
    <!-- Search and Filter -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex gap-4">
        <input type="text" placeholder="Buscar usuários..." class="flex-1 px-4 py-2 border rounded-lg"/>
        <select class="px-4 py-2 border rounded-lg">
          <option>Todos</option>
          <option>Ativos</option>
          <option>Inativos</option>
        </select>
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-white rounded-lg shadow">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Usuário</th>
            <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
            <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Links</th>
            <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Registrado</th>
            <th class="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.id">
            <td class="px-6 py-4">
              <div class="flex items-center">
                <img :src="user.avatar" class="w-8 h-8 rounded-full"/>
                <div class="ml-3">
                  <p class="font-medium">{{ user.name }}</p>
                  <p class="text-sm text-gray-500">{{ user.email }}</p>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <span :class="`px-2 py-1 rounded-full text-xs ${user.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`">
                {{ user.active ? 'Ativo' : 'Inativo' }}
              </span>
            </td>
            <td class="px-6 py-4">{{ user.links }}</td>
            <td class="px-6 py-4 text-gray-500">{{ user.registered }}</td>
            <td class="px-6 py-4 text-right">
              <button class="text-gray-400 hover:text-gray-600">⋮</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const users = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    active: true,
    links: 12,
    registered: '23/01/2024'
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@example.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
    active: true,
    links: 8,
    registered: '22/01/2024'
  },
  {
    id: 3,
    name: 'Pedro Costa',
    email: 'pedro@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    active: false,
    links: 5,
    registered: '20/01/2024'
  }
]
</script>