const defaultConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const http = {
  async get(endpoint) {
    return this.request('GET', endpoint);
  },

  async post(endpoint, data) {
    return this.request('POST', endpoint, data);
  },

  async put(endpoint, data) {
    return this.request('PUT', endpoint, data);
  },

  async delete(endpoint) {
    return this.request('DELETE', endpoint);
  },

  async request(method, endpoint, data = null) {
    const token = localStorage.getItem('token');
    const config = {
      ...defaultConfig,
      method,
      headers: {
        ...defaultConfig.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(endpoint, config);

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Erro na requisição');
      }

      return response.json();
    } catch (error) {
      console.error('HTTP Error:', error);
      throw error;
    }
  }
};

export default http;