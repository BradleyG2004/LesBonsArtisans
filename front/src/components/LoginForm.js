import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token); // Sauvegarde du token
                alert('Connexion réussie!');
                setError('');
                onLogin(); // Met à jour l'état d'authentification dans App
                navigate('/'); // Redirige vers la page d'accueil
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Identifiants incorrects');
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 2 }}>
            <Typography variant="h5" gutterBottom>
                Connexion
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleLogin}>
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    required
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Mot de passe"
                    type="password"
                    fullWidth
                    required
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Se connecter
                </Button>
            </form>
        </Box>
    );
};

export default LoginForm;

