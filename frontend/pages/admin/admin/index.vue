<template>
  <div class="space-y-6">
    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="stat in stats" :key="stat.title" 
           class="bg-white rounded-lg shadow p-6">
        <h3 class="text-gray-500 text-sm">{{ stat.title }}</h3>
        <p class="text-2xl font-semibold mt-2">{{ stat.value }}</p>
        <p class="text-sm text-gray-500 mt-1">{{ stat.change }}</p>
      </div>
    </div>
 
    <!-- Users Chart -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-lg font-semibold mb-4">Novos Usuários</h2>
      <div class="h-64">
        <Line
          :data="chartData"
          :options="chartOptions"
        />
      </div>
    </div>
    
    <!-- Recent Users -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-lg font-semibold mb-4">Usuários Recentes</h2>
      <div class="space-y-4">
        <div v-for="user in recentUsers" :key="user.id"
             class="flex items-center justify-between p-4 border rounded-lg">
          <div class="flex items-center">
            <img :src="user.avatar" class="w-10 h-10 rounded-full"/>
            <div class="ml-4">
              <p class="font-medium">{{ user.name }}</p>
              <p class="text-sm text-gray-500">{{ user.date }}</p>
            </div>
          </div>
          <div class="text-sm text-gray-500">
            {{ user.links }} links
          </div>
        </div>
      </div>
    </div>
  </div>
 </template>
 
 <script setup>
 import { Line } from 'vue-chartjs'
 import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
 
 ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
 
 const stats = [
  { title: 'Total Usuários', value: '2,431', change: '+5.4% desde o mês passado' },
  { title: 'Links Criados', value: '12,345', change: '+2.3% desde o mês passado' },
  { title: 'Cliques Totais', value: '54.2k', change: '+12.7% desde o mês passado' }
 ]
 
 const recentUsers = [
  { id: 1, name: 'João Silva', avatar: 'https://i.pravatar.cc/150?img=1', date: 'Há 2 horas', links: 5 },
  { id: 2, name: 'Maria Santos', avatar: 'https://i.pravatar.cc/150?img=2', date: 'Há 5 horas', links: 3 },
  { id: 3, name: 'Pedro Costa', avatar: 'https://i.pravatar.cc/150?img=3', date: 'Há 1 dia', links: 8 }
 ]
 
 const chartData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
  datasets: [{
    label: 'Novos Usuários',
    data: [400, 300, 600, 800, 700, 900, 1100],
    borderColor: '#2563eb',
    tension: 0.4,
    fill: false
  }]
 }
 
 const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  }
 }
 </script>