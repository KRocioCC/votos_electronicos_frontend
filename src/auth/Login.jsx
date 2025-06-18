import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:8059/api/auth/login';

const Login = () => {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [tipo, setTipo] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleCorreoChange = (e) => {
        const value = e.target.value;
        setCorreo(value);
        setError('');
        setPassword('');
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
            localStorage.setItem('usuario', JSON.stringify({
                id: res.data.id,
                tipo: res.data.tipo
            }));
            if (res.data.tipo === 'admin') {
                navigate('/');
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-white to-red-800">
            <div className="bg-white/90 rounded-2xl shadow-2xl p-10 w-full max-w-md border-4 border-blue-900 relative">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mb-2 shadow-lg">
                        <span className="text-white text-3xl font-bold">U</span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-blue-900 mb-1 tracking-tight">UMSA</h2>
                    <p className="text-blue-900 text-lg font-semibold mb-2">Sistema de Votación</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="block text-blue-900 font-semibold mb-2" htmlFor="correo">
                            Correo institucional UMSA
                        </label>
                        <input
                            id="correo"
                            type="email"
                            value={correo}
                            onChange={handleCorreoChange}
                            className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 transition"
                            placeholder="ejemplo@umsa.bo"
                            required
                        />
                    </div>
                    {tipo === 'admin' && (
                        <div className="mb-5">
                            <label className="block text-red-800 font-semibold mb-2" htmlFor="password">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 transition"
                                placeholder="Contraseña de administrador"
                                required
                            />
                        </div>
                    )}
                    {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 bg-gradient-to-r from-blue-900 to-red-800 text-white font-bold rounded-lg shadow hover:from-blue-800 hover:to-red-700 transition"
                    >
                        {loading ? 'Ingresando...' : 'Ingresar'}
                    </button>
                </form>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <span className="text-xs text-blue-900 opacity-60">© {new Date().getFullYear()} UMSA</span>
                </div>
            </div>
        </div>
    );
};

export default Login;