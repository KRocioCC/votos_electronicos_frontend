import React, { useEffect, useState } from 'react';
import votosService from '../services/votosService';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Votos = () => {
    const [conteo, setConteo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchConteo = async () => {
            try {
                const data = await votosService.getConteoVotosPorCandidato();
                setConteo(data);
            } catch (err) {
                setError('No se pudo cargar el conteo de votos');
            } finally {
                setLoading(false);
            }
        };
        fetchConteo();
    }, []);

    const chartData = {
        labels: conteo.map(c => c.candidatoNombre),
        datasets: [
            {
                label: 'Votos',
                data: conteo.map(c => c.totalVotos),
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { stepSize: 1 },
            },
        },
    };

    return (
        <div style={{ maxWidth: 1000, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 32 }}>
            <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Conteo de Votos por Candidato</h2>
            {loading && <p>Cargando...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && conteo.length > 0 && (
                <Bar data={chartData} options={chartOptions} />
            )}
            {!loading && !error && conteo.length === 0 && (
                <p>No hay datos para mostrar.</p>
            )}
        </div>
    );
};

export default Votos;