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
        const data = await votosService.getConteoVotosPorCarrera();
        setConteo(data);
      } catch (err) {
        setError('No se pudo cargar el conteo de votos por carrera');
      } finally {
        setLoading(false);
      }
    };
    fetchConteo();
  }, []);

  const chartData = {
    labels: conteo.map(c => c.carrera),
    datasets: [
      {
        label: 'Total de votos',
        data: conteo.map(c => c.totalVotos),
        backgroundColor: ['#2e7d32', '#7e57c2', '#00acc1'], // Verde oscuro, lila morado, celeste ocean
        borderColor: ['#1b5e20', '#512da8', '#00838f'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#333',
          font: { size: 14, weight: 'bold' }
        }
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: '#444',
          font: { size: 12 }
        },
        grid: {
          color: '#e0e0e0'
        }
      },
      x: {
        ticks: {
          color: '#444',
          font: { size: 12 }
        },
        grid: {
          display: false
        }
      }
    },
  };

  return (
    <div style={{
      maxWidth: 1000,
      margin: '40px auto',
      background: '#fefefe',
      borderRadius: 12,
      boxShadow: '0 2px 12px #0001',
      padding: 32
    }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: 24,
        color: '#2e7d32',
        fontWeight: 'bold',
        fontSize: 24
      }}>
        Top 3 Carreras con Más Votos Emitidos
      </h2>

      {loading && <p style={{ textAlign: 'center' }}>Cargando resultados...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {!loading && !error && conteo.length > 0 && (
        <>
          <Bar data={chartData} options={chartOptions} />

          <div style={{ marginTop: 32 }}>
            <h3 style={{ textAlign: 'center', marginBottom: 12, color: '#444' }}>Detalle por carrera</h3>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              border: '1px solid #ddd',
              fontSize: '15px'
            }}>
              <thead style={{ backgroundColor: '#f5f5f5' }}>
                <tr>
                  <th style={{ padding: '8px', borderBottom: '1px solid #ccc', textAlign: 'left' }}>Carrera</th>
                  <th style={{ padding: '8px', borderBottom: '1px solid #ccc', textAlign: 'center' }}>Total de votos</th>
                </tr>
              </thead>
              <tbody>
                {conteo.map((item, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#fafafa' : '#ffffff' }}>
                    <td style={{ padding: '8px' }}>{item.carrera}</td>
                    <td style={{ padding: '8px', textAlign: 'center', fontWeight: 'bold' }}>{item.totalVotos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {!loading && !error && conteo.length === 0 && (
        <p style={{ textAlign: 'center' }}>No hay datos disponibles.</p>
      )}
    </div>
  );
};

export default Votos;
