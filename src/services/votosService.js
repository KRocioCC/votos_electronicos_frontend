import api from './api';

const votosService = {
    // Obtener todos los votos
    getAllVotos: async () => {
        try {
            const response = await api.get('/votos');
            return response.data;
        } catch (error) {
            console.error("Error al obtener votos:", error.response ? error.response.data : error.message);
            throw error;
        }
    },

    // Obtener un voto por ID
    getVotoById: async (id) => {
        try {
            const response = await api.get(`/votos/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener voto con ID ${id}:`, error.response ? error.response.data : error.message);
            throw error;
        }
    },

    // Crear un nuevo voto
    createVoto: async (votoData) => {
        try {
            const response = await api.post('/votos', votoData);
            return response.data;
        } catch (error) {
            console.error("Error al crear voto:", error.response ? error.response.data : error.message);
            throw error;
        }
    },

    // Eliminar un voto físicamente (no permitido, solo muestra mensaje)
    deleteVotoFisicamente: async (id) => {
        try {
            const response = await api.delete(`/votos/${id}/fisico`);
            return response.data;
        } catch (error) {
            console.error(`Error al intentar eliminar voto con ID ${id}:`, error.response ? error.response.data : error.message);
            throw error;
        }
    },

    // Obtener el conteo de votos por candidato
    getConteoVotosPorCandidato: async () => {
        try {
            const response = await api.get('/votos/votos/por-candidato');
            return response.data;
        } catch (error) {
            console.error("Error al obtener conteo de votos por candidato:", error.response ? error.response.data : error.message);
            throw error;
        }
    },
    // Obtener el conteo de votos por partido y candidato
    getConteoVotosPorPartidoYCandidato: async () => {
        try {
            const response = await api.get('/votos/votos/por-partido-candidato');
            return response.data;
        } catch (error) {
            console.error("Error al obtener conteo por partido y candidato:", error.response ? error.response.data : error.message);
            throw error;
        }
    }
};

export default votosService;