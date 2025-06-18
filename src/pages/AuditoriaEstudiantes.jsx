import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AuditoriaEstudiantes = () => {
  const [auditorias, setAuditorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAuditoria = async () => {
      try {
        const res = await axios.get('http://localhost:8059/api/auditoria-estudiantes');
        setAuditorias(res.data);
      } catch (err) {
        setError('Error al cargar la auditoría');
      } finally {
        setLoading(false);
      }
    };
    fetchAuditoria();
  }, []);

  const showValue = (val) => (val === null || val === undefined ? '-' : val);

  return (
    <div className="max-w-4xl mx-auto py-8 px-2">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">Auditoría de Estudiantes</h2>
      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {auditorias.length === 0 && !loading && (
        <div className="text-center py-6 text-gray-500">
          No hay registros de auditoría.
        </div>
      )}
      <div className="flex flex-col gap-6">
        {auditorias.map((a) => (
          <div
            key={a.id}
            className="bg-white border border-blue-200 rounded-xl shadow-lg px-12 py-6 hover:shadow-2xl transition-shadow w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl text-blue-900 font-bold">
                #{a.id} | {a.accion}
              </span>
              <span className="text-base text-blue-900 font-semibold">
                {a.fecha?.replace('T', ' ').slice(0, 19)}
              </span>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-blue-900">ID Estudiante:</span>{' '}
              <span className="text-black">{a.idEstudiante}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              <div>
                <span className="font-semibold text-blue-900">Nombre antiguo:</span>{' '}
                <span className="text-black">{showValue(a.nombreAnterior)}</span>
              </div>
              <div>
                <span className="font-semibold text-blue-900">Nombre nuevo:</span>{' '}
                <span className="text-black">{showValue(a.nombreNuevo)}</span>
              </div>
              <div>
                <span className="font-semibold text-blue-900">Apellido Pat. antiguo:</span>{' '}
                <span className="text-black">{showValue(a.apellidoPatAnterior)}</span>
              </div>
              <div>
                <span className="font-semibold text-blue-900">Apellido Pat. nuevo:</span>{' '}
                <span className="text-black">{showValue(a.apellidoPatNuevo)}</span>
              </div>
              <div>
                <span className="font-semibold text-blue-900">Apellido Mat. antiguo:</span>{' '}
                <span className="text-black">{showValue(a.apellidoMatAnterior)}</span>
              </div>
              <div>
                <span className="font-semibold text-blue-900">Apellido Mat. nuevo:</span>{' '}
                <span className="text-black">{showValue(a.apellidoMatNuevo)}</span>
              </div>
              <div>
                <span className="font-semibold text-blue-900">Carrera antigua:</span>{' '}
                <span className="text-black">{showValue(a.carreraAnterior)}</span>
              </div>
              <div>
                <span className="font-semibold text-blue-900">Carrera nueva:</span>{' '}
                <span className="text-black">{showValue(a.carreraNueva)}</span>
              </div>
              <div>
                <span className="font-semibold text-blue-900">Correo antiguo:</span>{' '}
                <span className="text-black">{showValue(a.correoAnterior)}</span>
              </div>
              <div>
                <span className="font-semibold text-blue-900">Correo nuevo:</span>{' '}
                <span className="text-black">{showValue(a.correoNuevo)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditoriaEstudiantes;