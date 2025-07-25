import axios from 'axios';
const apiClient = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

/**
 * 
 * @param {Function} request
 * @returns {Promise<{data: any, error: string|null}>}
 */
const handleRequest = async (request) => {
    try {
        const response = await request();
        return { data: response.data, error: null };
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
        return { data: null, error: errorMessage };
    }
};


export const authUser = (endpoint, credentials) => {
    return handleRequest(() => apiClient.post(`/api/users${endpoint}`, credentials));
};

export const getProducts = (page = 1, limit = 10) => {
    return handleRequest(() => apiClient.get(`/api/products?page=${page}&limit=${limit}`));
};

export const addProduct = (productData) => {
    return handleRequest(() => apiClient.post('/api/products', productData));
};

export const updateProductQuantity = (id, quantity) => {
    return handleRequest(() => apiClient.put(`/api/products/${id}/quantity`, { quantity }));
};

export const deleteProduct = (id) => {
    return handleRequest(() => apiClient.delete(`/api/products/${id}`));
};
