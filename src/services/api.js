import axios from 'axios';

const API_URL = 'http://localhost:8059/api';

// Crear instancia de axios con configuración base
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/* Interceptor para agregar token de autenticación si existe
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
); */

// Interceptor para manejar errores comunes
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const {
            response
        } = error;

        if (response && response.status === 401) {
            // Si el token expiró, redirigir al login
            localStorage.removeItem('token');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default api;