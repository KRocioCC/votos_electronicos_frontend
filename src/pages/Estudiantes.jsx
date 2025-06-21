import React, { useState, useEffect } from 'react';
import estudianteService from '../services/estudianteService';

const Estudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEstudiante, setCurrentEstudiante] = useState({ 
    nombre: '', 
    apellidoPat: '', 
    apellidoMat: '', 
    carrera: '', 
    correoInstitucional: '', 
    anioIngreso: '',

    voto: false 
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEstudiantes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await estudianteService.getAllEstudiantes();
      setEstudiantes(data);
    } catch (err) {
      console.error("Error al cargar estudiantes:", err);
      setError("No se pudieron cargar los estudiantes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const handleAddClick = () => {
    setCurrentEstudiante({ 
      nombre: '', 
      apellidoPat: '', 
      apellidoMat: '', 
      carrera: '', 
      correoInstitucional: '', 
      anioIngreso: '',
      voto: false 
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditClick = (estudiante) => {
    setCurrentEstudiante(estudiante);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
  const estudiante = estudiantes.find(e => e.id === id);

  if (estudiante?.voto) {
    alert('⚠️ No se puede eliminar a un estudiante que ya votó.');
    return;
  }

  if (window.confirm('¿Estás seguro de eliminar este estudiante?')) {
    try {
      await estudianteService.deleteEstudiante(id);
      fetchEstudiantes();
    } catch (err) {
      console.error("Error inesperado al eliminar estudiante:", err);
      alert("Hubo un error al eliminar el estudiante.");
    }
  }
};



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await estudianteService.updateEstudiante(currentEstudiante.id, currentEstudiante);
      } else {
        await estudianteService.createEstudiante(currentEstudiante);
      }
      setIsModalOpen(false);
      fetchEstudiantes();
    } catch (err) {
      console.error("Error al guardar estudiante:", err);
      alert("Hubo un error al guardar el estudiante.");
    }
  };

  if (loading) {
    return <div className="max-w-6xl mx-auto text-center py-8">Cargando estudiantes...</div>;
  }

  if (error) {
    return <div className="max-w-6xl mx-auto text-center py-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Título de la página */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Administrar Estudiantes</h1>
        <button
          onClick={handleAddClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Agregar Estudiante
        </button>
      </div>

      {/* Lista de estudiantes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {estudiantes.length === 0 ? (
          <p className="col-span-full text-center text-slate-600">No hay estudiantes disponibles.</p>
        ) : (
          estudiantes.map((estudiante) => (
            <div
              key={estudiante.id}
              className="bg-blue-900 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow border border-blue-900"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-white">
                  {estudiante.nombre} {estudiante.apellidoPat} {estudiante.apellidoMat}
                </h3>
                <div className="flex space-x-2">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded text-sm"
                    onClick={() => handleEditClick(estudiante)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-700 hover:bg-red-800 text-white py-1 px-3 rounded text-sm"
                    onClick={() => handleDeleteClick(estudiante.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 min-h-24 text-blue-900">
                <p className="mb-1"><span className="font-semibold">Carrera:</span> {estudiante.carrera}</p>
                <p className="mb-1"><span className="font-semibold">Correo:</span> {estudiante.correoInstitucional}</p>
                <p><span className="font-semibold">Voto:</span> {estudiante.voto ? 'Sí' : 'No'}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? 'Editar Estudiante' : 'Agregar Nuevo Estudiante'}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="nombre">
                  Nombre
                </label>
                <input
                  id="nombre"
                  type="text"
                  placeholder="Ingrese el nombre del estudiante"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={currentEstudiante.nombre}
                  onChange={(e) => setCurrentEstudiante({ ...currentEstudiante, nombre: e.target.value })}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="apellidoPat">
                  Apellido Paterno
                </label>
                <input
                  id="apellidoPat"
                  type="text"
                  placeholder="Ingrese el apellido paterno"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={currentEstudiante.apellidoPat}
                  onChange={(e) => setCurrentEstudiante({ ...currentEstudiante, apellidoPat: e.target.value })}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="apellidoMat">
                  Apellido Materno
                </label>
                <input
                  id="apellidoMat"
                  type="text"
                  placeholder="Ingrese el apellido materno"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={currentEstudiante.apellidoMat}
                  onChange={(e) => setCurrentEstudiante({ ...currentEstudiante, apellidoMat: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="carrera">
                  Carrera
                </label>
                <input
                  id="carrera"
                  type="text"
                  placeholder="Ingrese la carrera"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={currentEstudiante.carrera}
                  onChange={(e) => setCurrentEstudiante({ ...currentEstudiante, carrera: e.target.value })}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="correoInstitucional">
                  Correo Institucional
                </label>
                <input
                  id="correoInstitucional"
                  type="email"
                  placeholder="Ingrese el correo institucional"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={currentEstudiante.correoInstitucional}
                  onChange={(e) => setCurrentEstudiante({ ...currentEstudiante, correoInstitucional: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="anioIngreso">
                  Año de Ingreso
                </label>
                <input
                  id="anioIngreso"
                  type="number"
                  placeholder="Ej. 2023"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={currentEstudiante.anioIngreso}
                  onChange={(e) =>
                    setCurrentEstudiante({
                      ...currentEstudiante,
                      anioIngreso: parseInt(e.target.value) || ''
                    })
                  }
                  required
                />
              </div>


              <div className="mb-4">
                <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="voto">
                  Voto
                </label>
                <div className="mb-4">
                <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="voto">
                  Voto
                </label>
                <div className="py-2 px-3 bg-gray-100 rounded text-slate-700">
                  No Votó
                </div>
              </div>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  {isEditing ? 'Actualizar' : 'Agregar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Estudiantes;