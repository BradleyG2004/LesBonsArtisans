import axios from 'axios';

//config de la base URL
const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
    getProducts: () => axios.get(`${API_BASE_URL}/products`),
    createProduct: (product) => axios.post(`${API_BASE_URL}/products`, product),
    updateProduct: (id, product) => axios.put(`${API_BASE_URL}/products/${id}`, product),
    deleteProduct: (id) => axios.delete(`${API_BASE_URL}/products/${id}`),
};