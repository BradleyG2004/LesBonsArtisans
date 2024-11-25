import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const ProductForm = ({ onSubmit, product = {} }) => {
    const [formData, setFormData] = useState({
        name: product.name || '',
        description: product.description || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="Nom"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
            />
            <Button type="submit" variant="contained" color="primary">
                Enregistrer
            </Button>
        </Box>
    );
};

export default ProductForm;
