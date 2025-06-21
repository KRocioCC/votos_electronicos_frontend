import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import partidoService from '../services/partidoService';
import candidatoService from '../services/candidatoService';
import votosService from '../services/votosService';
import estudianteService from '../services/estudianteService';
import docenteService from '../services/docenteService';

import partidoUno from '../images/partido_uno.png';
import partidoDos from '../images/partido_dos.png';
import partidoTres from '../images/partido_tres.png';
import partidoCuatro from '../images/partido_cuatro.png';

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
    const [yaVoto, setYaVoto] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showYaVoto, setShowYaVoto] = useState(false);
    const [partidoSeleccionado, setPartidoSeleccionado] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const partidosData = await partidoService.getAllPartidos();
                const candidatosData = await candidatoService.getAllCandidatos();
                setPartidos(partidosData);
                setCandidatos(candidatosData);

                const usuario = JSON.parse(localStorage.getItem('usuario'));
                if (usuario?.tipo === 'estudiante') {
                    const est = await estudianteService.getEstudianteById(usuario.id);
                    if (est.voto === true) {
                        setShowYaVoto(true);
                        setTimeout(() => {
                            localStorage.removeItem('usuario');
                            navigate('/login');
                        }, 2000);
                        return;
                    }
                } else if (usuario?.tipo === 'docente') {
                    const doc = await docenteService.getDocenteById(usuario.id);
                    if (doc.voto === true) {
                        setShowYaVoto(true);
                        setTimeout(() => {
                            localStorage.removeItem('usuario');
                            navigate('/login');
                        }, 2000);
                        return;
                    }
                }
            } catch (error) {
                setMensaje('Error al cargar partidos o candidatos');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [navigate]);

    const handleOpenConfirm = (partidoId) => {
        setPartidoSeleccionado(partidoId);
        setShowConfirm(true);
    };

    const handleVotar = async () => {
        setShowConfirm(false);
        try {
            const usuario = JSON.parse(localStorage.getItem('usuario'));
            const votoData = {
                idPartido: partidoSeleccionado,
                idVotante: usuario.id
            };

            await votosService.createVoto(votoData);
            setShowSuccess(true);
            setYaVoto(true);
            setTimeout(() => {
                setShowSuccess(false);
                localStorage.removeItem('usuario');
                navigate('/login');
            }, 1000);
        } catch (error) {
            setMensaje('Error al registrar el voto');
            setTimeout(() => setMensaje(''), 3000);
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
                        <h3 className="text-xl font-semibold mb-4 text-center">{partido.nombrePartido}</h3>
                        <div className="flex justify-center">
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                                onClick={() => handleOpenConfirm(partido.idPartido)}
                                disabled={yaVoto}
                            >
                                Votar por este partido
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de confirmación */}
            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-lg p-8 shadow-lg text-center">
                        <h3 className="text-xl font-bold mb-4 text-blue-700">¿Seguro que quieres votar?</h3>
                        <div className="flex justify-center gap-4">
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                onClick={handleVotar}
                            >
                                Sí, votar
                            </button>
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                onClick={() => setShowConfirm(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de éxito */}
            {showSuccess && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-lg p-8 shadow-lg text-center">
                        <h3 className="text-xl font-bold mb-2 text-green-700">¡Voto registrado!</h3>
                        <p className="text-gray-700">Saliendo del sistema...</p>
                    </div>
                </div>
            )}

            {/* Modal ya votó */}
            {showYaVoto && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-lg p-8 shadow-lg text-center">
                        <h3 className="text-xl font-bold mb-2 text-red-700">Usted ya votó</h3>
                        <p className="text-gray-700">Saliendo del sistema...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Votar;
