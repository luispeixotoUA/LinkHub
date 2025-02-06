<!-- pages/admin/metrics.vue -->
<template>
  <div class="space-y-6">
    <!-- Time Range Selector -->
    <div class="bg-white rounded-lg shadow p-4">
      <select class="px-4 py-2 border rounded-lg">
        <option>Últimos 7 dias</option>
        <option>Último mês</option>
        <option>Último ano</option>
      </select>
    </div>

    <!-- Charts Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- User Growth -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4">Crescimento de Usuários</h3>
        <div class="h-64">
          <Line :data="userGrowthData" :options="chartOptions"/>
        </div>
      </div>

      <!-- Link Creation -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4">Links Criados</h3>
        <div class="h-64">
          <Bar :data="linkCreationData" :options="chartOptions"/>
        </div>
      </div>

      <!-- Traffic Sources -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4">Origem do Tráfego</h3>
        <div class="h-64">
          <Pie :data="trafficData" :options="pieOptions"/>
        </div>
      </div>

      <!-- Daily Active Users -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4">Usuários Ativos Diários</h3>
        <div class="h-64">
          <Line :data="activeUsersData" :options="chartOptions"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Line, Bar, Pie } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right'
    }
  }
}

const userGrowthData = {
  labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
  datasets: [{
    label: 'Novos Usuários',
    data: [65, 78, 90, 85, 92, 88, 100],
    borderColor: '#2563eb',
    tension: 0.4
  }]
}

const linkCreationData = {
  labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
  datasets: [{
    label: 'Links Criados',
    data: [28, 35, 42, 38, 45, 40, 48],
    backgroundColor: '#3b82f6'
  }]
}

const trafficData = {
  labels: ['Direto', 'Social', 'Referência', 'Pesquisa'],
  datasets: [{
    data: [40, 30, 20, 10],
    backgroundColor: ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd']
  }]
}

const activeUsersData = {
  labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
  datasets: [{
    label: 'Usuários Ativos',
    data: [420, 380, 450, 420, 480, 440, 460],
    borderColor: '#2563eb',
    tension: 0.4
  }]
}
</script>