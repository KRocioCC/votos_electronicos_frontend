import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:8059/api/auth/login';
const Login = () => {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [tipo, setTipo] = useState(''); // admin, estudiante, docente
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Detecta tipo al escribir correo
    const handleCorreoChange = (e) => {
        const value = e.target.value;
        setCorreo(value);
        setError('');
        setPassword('');
        // Puedes cambiar esta lógica según tu sistema de admins
        if (value.endsWith('admin@umsa.bo')) {
            setTipo('admin');
        } else {
            setTipo('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const body = { correo };
            if (tipo === 'admin') body.password = password;
            const res = await axios.post(BASE_URL, body);
            // Guarda usuario en localStorage
            localStorage.setItem('usuario', JSON.stringify({
                id: res.data.id,
                tipo: res.data.tipo
            }));
            // Redirige según tipo
            if (res.data.tipo === 'admin') {
                navigate('/'); // Cambia por tu ruta de admin
            } else {
                navigate('/votar');
            }
        } catch (err) {
            setError('Credenciales incorrectas o usuario no registrado');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-white to-red-600">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md border-4 border-blue-700"
            >
                <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">Iniciar Sesión</h2>
                <div className="mb-4">
                    <label className="block text-blue-700 font-semibold mb-2" htmlFor="correo">
                        Correo institucional UMSA
                    </label>
                    <input
                        id="correo"
                        type="email"
                        value={correo}
                        onChange={handleCorreoChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
                        placeholder="ejemplo@umsa.bo"
                        required
                    />
                </div>
                {tipo === 'admin' && (
                    <div className="mb-4">
                        <label className="block text-red-700 font-semibold mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                            placeholder="Contraseña de administrador"
                            required
                        />
                    </div>
                )}
                {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 px-4 bg-gradient-to-r from-blue-700 to-red-600 text-white font-bold rounded hover:from-blue-800 hover:to-red-700 transition"
                >
                    {loading ? 'Ingresando...' : 'Ingresar'}
                </button>
            </form>
        </div>
    );
};

export default Login;