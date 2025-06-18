// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Estudiante from '../pages/Estudiantes';  // Asegúrate de que el archivo esté en /pages
import Votos from '../pages/Votos'; // <-- Importa tu dashboard
import VotosPar from '../pages/VotosPar'; // Agrega este import arriba
import Votar from '../pages/Votar';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="estudiantes" element={<Estudiante />} />  {/* Ruta para Estudiante */}
        <Route path="votos_dashboard" element={<Votos />} /> {/* Ruta para el dashboard */}
        <Route path="votos_par" element={<VotosPar />} /> {/* Ruta para el dashboard de partido y candidato */}
        <Route path="votar" element={<Votar />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
