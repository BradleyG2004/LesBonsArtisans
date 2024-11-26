import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../services/api';

// Actions asynchrones pour interagir avec l'API
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    try {
        const response = await api.getProducts();
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
        throw error; // Lancez à nouveau l'erreur pour que Redux la gère
    }
});

export const createProduct = createAsyncThunk('products/createProduct', async (product) => {
    const response = await api.createProduct(product);
    return response.data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, product }) => {
    const response = await api.updateProduct(id, product);
    return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
    await api.deleteProduct(id);
    return id;
});

// Slice de Redux Toolkit
const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Create
            .addCase(createProduct.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            // Update
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.items.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
            })
            // Delete
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
            });
    },
});

export default productsSlice.reducer;
