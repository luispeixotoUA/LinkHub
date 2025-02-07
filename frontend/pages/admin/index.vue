<template>
  <div class="space-y-6">
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

      <div v-for="stat in stats" :key="stat.title" 
           class="bg-white rounded-lg p-4 shadow hover:shadow-md transition-all">
        <div class="flex items-center gap-3">
          <div class="p-3 rounded-full" :class="stat.bgColor">
            <span class="text-xl">{{ stat.icon }}</span>
          </div>
          <div>
            <p class="text-gray-600 text-sm">{{ stat.title }}</p>
            <p class="text-2xl font-bold">{{ stat.value }}</p>
          </div>
        </div>
      </div>
    </div>
 
    <!-- Timeline with scroll -->
    <div class="bg-white rounded-lg p-6">
      <h2 class="text-lg font-medium mb-6">Atividade Recente</h2>
      <div class="h-96 overflow-y-auto pr-2">
        <div class="space-y-4">
          <div v-for="(group, index) in groupedActivity" :key="index"
               class="flex gap-4 p-4 rounded-lg hover:bg-gray-50"
               :class="{'border-l-4': group.type === 'LINK_CLICK',
                       'border-blue-500': group.type === 'LINK_CLICK',
                       'border-green-500': group.type === 'PROFILE_VIEW'}">
            <span class="text-xl" :class="group.type === 'LINK_CLICK' ? 'text-blue-500' : 'text-green-500'">
              {{ group.type === 'LINK_CLICK' ? '🔗' : '👁️' }}
            </span>
            <div>
              <p class="font-medium">
                {{ group.count }}x {{ group.type === 'LINK_CLICK' ? group.title : 'visualizações' }}
              </p>
              <p class="text-sm text-gray-500">{{ group.timeAgo }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 </template>
 
 <script setup>
 import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
 import { useRoute } from 'vue-router';
 import { metricsService } from '~/services/metricsService';
 
 const route = useRoute();
 const stats = ref([]);
 const recentActivity = ref([]);
 
 const groupedActivity = computed(() => {
 const groups = recentActivity.value.reduce((acc, activity) => {
   const key = `${activity.type}_${activity.timeAgo}_${activity.details?.title || ''}`;
   if (!acc[key]) {
     acc[key] = {
       type: activity.type,
       count: 1,
       timeAgo: activity.timeAgo,
       title: activity.details?.title
     };
   } else {
     acc[key].count++;
   }
   return acc;
 }, {});

 return Object.values(groups).sort((a, b) => {
   return new Date(b.timeAgo) - new Date(a.timeAgo);
 });
});

const fetchData = async () => {
 const [statsData, activityData] = await Promise.all([
   metricsService.getDashboardStats(),
   metricsService.getRecentActivity()
 ]);

 stats.value = [
   { title: 'Total Links', value: statsData.totalLinks, icon: '🔗', bgColor: 'bg-blue-100' },
   { title: 'Visitas Hoje', value: statsData.dailyVisits, icon: '👁️', bgColor: 'bg-green-100' },
   { title: 'Links Ativos', value: statsData.activeLinks, icon: '✅', bgColor: 'bg-yellow-100' },
   { title: 'Cliques Totais', value: statsData.totalClicks, icon: '🎯', bgColor: 'bg-purple-100' }
 ];

 recentActivity.value = activityData;
};
 
 onMounted(() => {
  nextTick(fetchData);
});


if (process.client) {
  window.addEventListener('focus', fetchData);
  onUnmounted(() => window.removeEventListener('focus', fetchData));
}

 </script>