export const linkService = {
  async getAll() {
    const { token } = useAuth();
    const { data, error } = await useFetch('/api/links', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token.value}` },
      server: false,
      key: 'links',
      transform: (data) => data?.sort((a, b) => a.order - b.order) || []
    });

    if (error.value) throw new Error(error.value.message);
    return data.value;
  },

  async create(linkData) {
    const { token } = useAuth();
    const { error } = await useFetch('/api/links', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token.value}` },
      body: linkData
    });

    if (error.value) throw new Error(error.value.message);
  },

  async update(id, linkData) {
    const { token } = useAuth();
    const { error } = await useFetch(`/api/links/${id}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token.value}` },
      body: linkData
    });

    if (error.value) throw new Error(error.value.message);
  },

  async delete(id) {
    const { token } = useAuth();
    const { error } = await useFetch(`/api/links/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token.value}` }
    });

    if (error.value) throw new Error(error.value.message);
  },

  async updateOrder(linkOrders) {
    const { token } = useAuth();
    const { error } = await useFetch('/api/links/reorder', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token.value}` },
      body: { linkOrders }
    });

    if (error.value) throw new Error(error.value.message);
  }
};