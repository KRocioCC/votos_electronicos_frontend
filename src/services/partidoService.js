import api from './api';

const partidoService = {
    // Obtener todos los partidos
    getAllPartidos: async () => {
        try {
            const response = await api.get('/partidos');
            return response.data;
        } catch (error) {
            console.error("Error al obtener partidos:", error);
            throw error;
        }
    },

    // Obtener un partido por ID
    getPartidoById: async (id) => {
        try {
            const response = await api.get(`/partidos/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener partido con ID ${id}:`, error);
            throw error;
        }
    },

    // Crear un nuevo partido
    createPartido: async (partidoData) => {
        try {
            const response = await api.post('/partidos', partidoData);
            return response.data;
        } catch (error) {
            console.error("Error al crear partido:", error.response ? error.response.data : error.message);
            throw error;
        }
    },

    // Actualizar un partido existente
    updatePartido: async (id, partidoData) => {
        try {
            const response = await api.put(`/partidos/${id}`, partidoData);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar partido con ID ${id}:`, error.response ? error.response.data : error.message);
            throw error;
        }
    },

    // Eliminar un partido
    deletePartido: async (id) => {
        try {
            const response = await api.delete(`/partidos/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al eliminar partido con ID ${id}:`, error);
            throw error;
        }
    }
};

export default partidoService;