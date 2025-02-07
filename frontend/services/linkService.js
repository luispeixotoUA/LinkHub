export const linkService = {
  async getAll() {
    const { token } = useAuth();
    const { data, error } = await useFetch('/api/links', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token.value}` },
      server: false,
      key: 'links',
      transform: (data) => {
        const links = data?.map(link => ({
          ...link,
        }));
        return links?.sort((a, b) => a.order - b.order) || [];
      }
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
    const sanitizedData = {
      userId: linkData.userId,
      title: linkData.title,
      url: linkData.url,
      order: linkData.order
    };
    const { data, error } = await useFetch(`/api/links/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      body: sanitizedData
    });

    if (error.value) throw new Error(error.value.message);
    return data.value;
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
      body: {
        linkOrders: linkOrders.map(order => ({
          ...order,
          id: order.id
        }))
      }
    });

    if (error.value) throw new Error(error.value.message);
  }
};