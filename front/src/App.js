import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import PrivateRoute from './components/PrivateRoute';
import { Container } from '@mui/material';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Vérifie si un token est présent dans localStorage au démarrage
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <Router>
            <Header />
            <Container
                sx={{
                    marginTop: '20px',
                    padding: '20px',
                }}
            >
                <Routes>
                    {/* Route protégée */}
                    <Route
                        path="/"
                        element={
                            <PrivateRoute isAuthenticated={isAuthenticated}>
                                <Home />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/login" element={<LoginForm onLogin={() => setIsAuthenticated(true)} />} />
                    <Route path="/register" element={<RegisterForm />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;
