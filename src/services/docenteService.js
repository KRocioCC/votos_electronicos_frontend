import api from './api';

const docenteService = {
    // Obtener todos los docentes
    getAllDocentes: async () => {
        try {
            const response = await api.get('/docentes');
            return response.data;
        } catch (error) {
            console.error("Error al obtener docentes:", error);
            throw error;
        }
    },

    // Obtener un docente por ID
    getDocenteById: async (id) => {
        try {
            const response = await api.get(`/docentes/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener docente con ID ${id}:`, error);
            throw error;
        }
    },

    // Crear un nuevo docente
    createDocente: async (docenteData) => {
        try {
            const response = await api.post('/docentes', docenteData);
            return response.data;
        } catch (error) {
            console.error("Error al crear docente:", error.response ? error.response.data : error.message);
            throw error;
        }
    },

    // Actualizar un docente existente
    updateDocente: async (id, docenteData) => {
        try {
            const response = await api.put(`/docentes/${id}`, docenteData);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar docente con ID ${id}:`, error.response ? error.response.data : error.message);
            throw error;
        }
    },

    // Eliminar un docente (eliminación lógica)
    eliminarDocente: async (id) => {
        try {
            const response = await api.put(`/docentes/${id}/eliminar`);
            return response.data;
        } catch (error) {
            console.error(`Error al eliminar docente con ID ${id}:`, error);
            throw error;
        }
    },

    // Eliminar un docente físicamente
    eliminarDocenteFisicamente: async (id) => {
        try {
            const response = await api.delete(`/docentes/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al eliminar docente físicamente con ID ${id}:`, error);
            throw error;
        }
    }
};

export default docenteService;