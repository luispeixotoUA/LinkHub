
export const metricsService = {
  async getDashboardStats() {
    const { token } = useAuth();
    const { data } = await useFetch('/api/metrics/dashboard', {
      headers: { 'Authorization': `Bearer ${token.value}` },
      transform: (data) => ({
        totalLinks: data.totalLinks || 0,
        dailyVisits: data.dailyVisits || 0,
        activeLinks: data.activeLinks || 0,
        totalClicks: data.totalClicks || 0
      })
    });
    return data.value;
  },
 
  async getRecentActivity() {
    const { token } = useAuth();
    const { data } = await useFetch('/api/metrics/activity', {
      headers: { 'Authorization': `Bearer ${token.value}` }
    });
    return data.value;
  },

  getActivityDescription(activity) {
    const descriptions = {
      LINK_ADDED: `Novo link adicionado: ${activity.metadata.title}`,
      LINK_CLICKED: `${activity.metadata.clicks} cliques no link ${activity.metadata.title}`,
      LINK_UPDATED: `Link "${activity.metadata.title}" atualizado`
    };
    return descriptions[activity.type] || activity.description;
  },


  async trackProfileView(username) {
    console.log('TA A DAR TRACKING');
    const { data, error } = await useFetch('/api/metrics/profile/' + username + '/view', {
      method: 'POST',
      server: false,
    });

    if (error.value) throw new Error(error.value.message);
    return data.value;
  },
  
  async trackLinkClick(linkId) {
    const { data, error } = await useFetch('/api/metrics/link/' + linkId + '/click', {
      method: 'POST',
      server: false,
    });

    if (error.value) throw new Error(error.value.message);
    return data.value;
  },

  formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return 'Agora mesmo';
    if (diff < 3600) return `Há ${Math.floor(diff/60)} minutos`;
    if (diff < 86400) return `Há ${Math.floor(diff/3600)} horas`;
    return `Há ${Math.floor(diff/86400)} dias`;
  }
};