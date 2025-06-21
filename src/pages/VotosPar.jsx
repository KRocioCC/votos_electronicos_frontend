import React, { useEffect, useState } from 'react';
import votosService from '../services/votosService';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

// Paleta de colores para partidos
const partyColors = [
    '#FF6384', // Partido 1
    '#36A2EB', // Partido 2
    '#FFCE56', // Partido 3
    '#4BC0C0', // Partido 4
    '#9966FF', // Partido 5
    '#FF9F40', // Partido 6
    '#C9CBCF', // Partido 7
];

const getColorForParty = (party, parties) => {
    const idx = parties.indexOf(party);
    return partyColors[idx % partyColors.length];
};

const VotosPar = () => {
    const [conteo, setConteo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchConteo = async () => {
            try {
                const data = await votosService.getConteoVotosPorPartido();
                setConteo(data);
            } catch (err) {
                setError('No se pudo cargar el conteo');
            } finally {
                setLoading(false);
            }
        };
        fetchConteo();
    }, []);

    // Obtener partidos únicos
    const partidos = [...new Set(conteo.map(c => c.nombrePartido))];

    const barData = {
        labels: conteo.map(c => ` (${c.nombrePartido})`),
        datasets: [
            {
                label: 'Votos',
                data: conteo.map(c => c.totalVotos),
                backgroundColor: conteo.map(c => getColorForParty(c.nombrePartido, partidos)),
                borderColor: conteo.map(c => getColorForParty(c.nombrePartido, partidos)),
                borderWidth: 1,
            },
        ],
    };

    // Gráfico de torta: suma de votos por partido
    const votosPorPartido = partidos.map(partido =>
        conteo.filter(c => c.nombrePartido === partido)
              .reduce((sum, c) => sum + c.totalVotos, 0)
    );

    const pieData = {
        labels: partidos,
        datasets: [
            {
                data: votosPorPartido,
                backgroundColor: partidos.map(p => getColorForParty(p, partidos)),
                borderColor: '#fff',
                borderWidth: 2,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: true },
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
        <div style={{ maxWidth: 1100, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 32 }}>
            <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Votos por Partido</h2>
            {loading && <p>Cargando...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && conteo.length > 0 && (
                <>
                    {/* Dashboard de Barras */}
                    <div style={{ marginBottom: 40 }}>
                        <h3 style={{ textAlign: 'center', marginBottom: 16 }}>Gráfico de Barras</h3>
                        <Bar data={barData} options={chartOptions} />
                    </div>

                    {/* Tabla de datos */}
                    <div style={{ marginBottom: 40 }}>
                        <h3 style={{ textAlign: 'center', marginBottom: 16 }}>Tabla de Votos</h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '0 auto' }}>
                            <thead>
                                <tr style={{ background: '#f0f0f0' }}>
                                    <th style={{ padding: 8, border: '1px solid #ddd' }}>Partido</th>
                                    <th style={{ padding: 8, border: '1px solid #ddd' }}>Votos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {conteo.map((row, idx) => (
                                    <tr key={idx}>
                                        <td style={{ padding: 8, border: '1px solid #ddd', color: getColorForParty(row.nombrePartido, partidos), fontWeight: 'bold' }}>{row.nombrePartido}</td>
                                        <td style={{ padding: 8, border: '1px solid #ddd' }}>{row.totalVotos}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Dashboard de Torta */}
                    <div>
                        <h3 style={{ textAlign: 'center', marginBottom: 16 }}>Gráfico de Torta</h3>
                        <Pie data={pieData} />
                    </div>
                </>
            )}
            {!loading && !error && conteo.length === 0 && (
                <p>No hay datos para mostrar.</p>
            )}
        </div>
    );
};

export default VotosPar;