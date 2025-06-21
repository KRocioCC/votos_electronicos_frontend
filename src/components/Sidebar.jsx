import React from 'react';
import { MdBarChart } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaEnvelope, FaUsers, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <div className="sidebar w-1/5 h-full fixed bg-red-900 text-white">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-6">UMSA</h1>
        <nav className="space-y-2">
          <Link
            to="/"
            className={`flex items-center p-3 rounded-lg hover:bg-blue-900 ${
              location.pathname === "/" ? "bg-blue-900" : ""
            }`}
          >
            <FaHome className="mr-3" />
            Inicio
          </Link>
          <Link
            to="/about"
            className={`flex items-center p-3 rounded-lg hover:bg-blue-900 ${
              location.pathname === "/about" ? "bg-blue-900" : ""
            }`}
          >
            <FaUser className="mr-3" />
            Candidatos
          </Link>
          <Link
            to="/contact"
            className={`flex items-center p-3 rounded-lg hover:bg-blue-900 ${
              location.pathname === "/contact" ? "bg-blue-900" : ""
            }`}
          >
            <FaEnvelope className="mr-3" />
            Contacto
          </Link>

          {/* Solo admin */}
          {usuario?.tipo === 'admin' && (
            <>
              <Link
                to="/estudiantes"
                className={`flex items-center p-3 rounded-lg hover:bg-blue-900 ${
                  location.pathname === "/estudiantes" ? "bg-blue-900" : ""
                }`}
              >
                <FaUsers className="mr-3" />
                Estudiantes
              </Link>
              <Link
                to="/votos_dashboard"
                className={`flex items-center p-3 rounded-lg hover:bg-blue-900 ${
                  location.pathname === "/votos_dashboard" ? "bg-blue-900" : ""
                }`}
              >
                <MdBarChart className="mr-3" />
                Votos por carrera
              </Link>
              <Link
                to="/votos_par"
                className={`flex items-center p-3 rounded-lg hover:bg-blue-900 ${
                  location.pathname === "/votos_par" ? "bg-blue-900" : ""
                }`}
              >
                <MdBarChart className="mr-3" />
                Votos Dashboard
              </Link>

              {/* Auditoría */}
              <Link
                to="/auditoria_estudiantes"
                className={`flex items-center p-3 rounded-lg hover:bg-blue-900 ${
                  location.pathname === "/auditoria_estudiantes" ? "bg-blue-900" : ""
                }`}
              >
                <MdBarChart className="mr-3" />
                Auditoría Estudiantes
              </Link>
            </>
          )}

          {/* Solo estudiante o docente */}
          {(usuario?.tipo === 'estudiante' || usuario?.tipo === 'docente') && (
            <Link
              to="/votar"
              className={`flex items-center p-3 rounded-lg hover:bg-blue-900 ${
                location.pathname === "/votar" ? "bg-blue-900" : ""
              }`}
            >
              <MdBarChart className="mr-3" />
              Votar
            </Link>
          )}

          {/* Logout visible si hay usuario logueado */}
          {usuario && (
            <button
              onClick={handleLogout}
              className="flex items-center p-3 rounded-lg hover:bg-red-800 w-full mt-6 bg-red-700"
            >
              <FaSignOutAlt className="mr-3" />
              Cerrar sesión
            </button>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;