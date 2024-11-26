import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import correct de useNavigate

const RegisterForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate(); // Correctement défini ici

    const handleRegister = async (e) => {
        e.preventDefault();
        const { email, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/auth/register', { email, password });
            if (response.status === 201) {
                setSuccess(true);
                setError('');
                navigate('/login'); // Redirige vers la page de connexion
            }
        } catch (err) {
            setError('Erreur lors de l\'inscription : ' + (err.response?.data?.message || 'Veuillez réessayer.'));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 2 }}>
            <Typography variant="h5" gutterBottom>
                Inscription
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="primary">Inscription réussie !</Typography>}
            <form onSubmit={handleRegister}>
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    required
                    margin="normal"
                    value={formData.email}
                    onChange={handleChange}
                />
                <TextField
                    label="Mot de passe"
                    name="password"
                    type="password"
                    fullWidth
                    required
                    margin="normal"
                    value={formData.password}
                    onChange={handleChange}
                />
                <TextField
                    label="Confirmer le mot de passe"
                    name="confirmPassword"
                    type="password"
                    fullWidth
                    required
                    margin="normal"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    S'inscrire
                </Button>
            </form>
        </Box>
    );
};

export default RegisterForm;
