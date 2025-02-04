// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verificar si el token existe en el localStorage y hacer un request al backend para verificar
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers['Authorization'] = `Bearer ${token}`;
            axios.get('/api/users/me')
                .then(response => {
                    setUser(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    setUser(null);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            axios.defaults.headers['Authorization'] = `Bearer ${token}`;
            setUser({ email });
        } catch (error) {
            console.error('Error en el login:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return {
        user,
        loading,
        login,
        logout
    };
};

export default useAuth;
