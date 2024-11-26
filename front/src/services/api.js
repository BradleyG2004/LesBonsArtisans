import axios from 'axios';

//config de la base URL
const API_BASE_URL = 'http://localhost:3000/api';

export const api = {
    getProducts: () =>
        axios.get(`${API_BASE_URL}/products`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Remplacez avec votre méthode de stockage de token
            },
        }),
    createProduct: (product) =>
        axios.post(`${API_BASE_URL}/products`, product, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }),
    updateProduct: (id, product) =>
        axios.put(`${API_BASE_URL}/products/${id}`, product, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }),
    deleteProduct: (id) =>
        axios.delete(`${API_BASE_URL}/products/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }),
};
