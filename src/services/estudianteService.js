// src/services/estudianteService.js
import api from './api';  // Asegúrate de que el archivo api.js esté configurado correctamente

const estudianteService = {
    // Obtener todos los estudiantes
    getAllEstudiantes: async () => {
        try {
            const response = await api.get('/estudiantes');
            return response.data;
        } catch (error) {
            console.error("Error al obtener estudiantes:", error);
            throw error; // Propagar el error para que el componente lo maneje
        }
    },

    // Obtener un estudiante por ID
    getEstudianteById: async (id) => {
        try {
            const response = await api.get(`/estudiantes/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener estudiante con ID ${id}:`, error);
            throw error;
        }
    },

    // Crear un nuevo estudiante
    createEstudiante: async (estudianteData) => {
        try {
            const response = await api.post('/estudiantes', estudianteData);
            return response.data;
        } catch (error) {
            console.error("Error al crear estudiante:", error.response ? error.response.data : error.message);
            throw error;
        }
    },

    // Actualizar un estudiante existente
    updateEstudiante: async (id, estudianteData) => {
        try {
            const response = await api.put(`/estudiantes/${id}`, estudianteData);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar estudiante con ID ${id}:`, error.response ? error.response.data : error.message);
            throw error;
        }
    },

    // Eliminar un estudiante
    deleteEstudiante: async (id) => {
        try {
            const response = await api.delete(`/estudiantes/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al eliminar estudiante con ID ${id}:`, error);
            throw error;
        }
    }
};

export default estudianteService;
