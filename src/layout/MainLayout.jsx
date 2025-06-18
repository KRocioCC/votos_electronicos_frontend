// src/layout/MainLayout.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar ocupa el 27% de la pantalla */}
      <div className="w-[20%] bg-gray-800 text-white">
        <Sidebar /> {/* Sidebar */}
      </div>

      {/* Contenido principal ocupa el 73% de la pantalla */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar /> {/* Navbar */}
        <main className="flex-1 overflow-y-auto p-4 bg-blue-50">
          <Outlet /> {/* El contenido de las rutas se renderiza aquí */}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
