import React, { useEffect, useState } from 'react';
import partidoService from '../services/partidoService';
import candidatoService from '../services/candidatoService';
import votosService from '../services/votosService';

// Importa tus imágenes locales
import partidoUno from '../images/partido_uno.png';
import partidoDos from '../images/partido_dos.png';
import partidoTres from '../images/partido_tres.png';
import partidoCuatro from '../images/partido_cuatro.png';

// Mapea el idPartido a la imagen correspondiente
const imagenesPartidos = {
    1: partidoUno,
    2: partidoDos,
    3: partidoTres,
    4: partidoCuatro
};

const Votar = () => {
    const [partidos, setPartidos] = useState([]);
    const [candidatos, setCandidatos] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const partidosData = await partidoService.getAllPartidos();
                const candidatosData = await candidatoService.getAllCandidatos();
                setPartidos(partidosData);
                setCandidatos(candidatosData);
                // Para depuración, revisa la estructura de los datos:
                // console.log('Partidos:', partidosData);
                // console.log('Candidatos:', candidatosData);
            } catch (error) {
                setMensaje('Error al cargar partidos o candidatos');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Relaciona candidatos con su partido
    const getCandidatosPorPartido = (partidoId) =>
        candidatos.filter(c => c.idPartido === partidoId);

    // Simula el id del votante (estudiante o docente)
    const votanteId = 1; // Cambia esto cuando tengas login

    const handleVotar = async (partidoId, candidatoId) => {
        try {
            await votosService.createVoto({
                estudianteId: votanteId, // o docenteId según corresponda
                partidoId,
                candidatoId
            });
            setMensaje('¡Voto registrado con éxito!');
        } catch (error) {
            setMensaje('Error al registrar el voto');
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Votar</h2>
            {loading && <p>Cargando...</p>}
            {mensaje && <p className="text-green-600 text-center mb-4">{mensaje}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {partidos.map(partido => (
                    <div key={partido.idPartido} className="bg-white rounded-lg shadow p-6">
                        <img
                            src={imagenesPartidos[partido.idPartido]}
                            alt={partido.nombrePartido}
                            className="w-full h-32 object-cover rounded mb-4"
                        />
                        <h3 className="text-xl font-semibold mb-4">{partido.nombrePartido}</h3>
                        <ul>
                            {getCandidatosPorPartido(partido.idPartido).map(candidato => (
                                <li key={candidato.idCandidato} className="mb-2 flex justify-between items-center">
                                    <span>{candidato.cargo}</span>
                                    <button
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                        onClick={() => handleVotar(partido.idPartido, candidato.idCandidato)}
                                    >
                                        Votar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Votar;