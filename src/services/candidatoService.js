import api from './api';

const candidatoService = {
    // Obtener todos los candidatos
    getAllCandidatos: async () => {
        try {
            const response = await api.get('/candidatos');
            return response.data;
        } catch (error) {
            console.error("Error al obtener candidatos:", error);
            throw error;
        }
    },

    // Obtener un candidato por ID
    getCandidatoById: async (id) => {
        try {
            const response = await api.get(`/candidatos/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener candidato con ID ${id}:`, error);
            throw error;
        }
    },

    // Crear un nuevo candidato
    createCandidato: async (candidatoData) => {
        try {
            const response = await api.post('/candidatos', candidatoData);
            return response.data;
        } catch (error) {
            console.error("Error al crear candidato:", error.response ? error.response.data : error.message);
            throw error;
        }
    },

    // Actualizar un candidato existente
    updateCandidato: async (id, candidatoData) => {
        try {
            const response = await api.put(`/candidatos/${id}`, candidatoData);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar candidato con ID ${id}:`, error.response ? error.response.data : error.message);
            throw error;
        }
    },

    // Eliminar un candidato físicamente
    deleteCandidatoFisicamente: async (id) => {
        try {
            const response = await api.delete(`/candidatos/${id}/fisico`);
            return response.data;
        } catch (error) {
            console.error(`Error al eliminar candidato con ID ${id}:`, error);
            throw error;
        }
    }
};

export default candidatoService;