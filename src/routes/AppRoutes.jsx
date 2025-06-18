import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Estudiante from '../pages/Estudiantes';
import Votos from '../pages/Votos';
import VotosPar from '../pages/VotosPar';
import Votar from '../pages/Votar';
import AuditoriaEstudiantes from '../pages/AuditoriaEstudiantes';

import RequireAuth from '../components/RequireAuth';
import Login from '../auth/Login';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Login fuera del MainLayout */}
      <Route path="/login" element={<Login />} />

      {/* Todo lo demás dentro del layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />

        {/* Solo admin puede ver estas rutas */}
        <Route
          path="estudiantes"
          element={
            <RequireAuth allowedTypes={['admin']}>
              <Estudiante />
            </RequireAuth>
          }
        />
        <Route
          path="votos_dashboard"
          element={
            <RequireAuth allowedTypes={['admin']}>
              <Votos />
            </RequireAuth>
          }
        />
        <Route
          path="votos_par"
          element={
            <RequireAuth allowedTypes={['admin']}>
              <VotosPar />
            </RequireAuth>
          }
        />
        <Route
          path="auditoria_estudiantes"
          element={
            <RequireAuth allowedTypes={['admin']}>
              <AuditoriaEstudiantes />
            </RequireAuth>
          }
        />

        {/* Solo estudiante o docente puede ver votar */}
        <Route
          path="votar"
          element={
            <RequireAuth allowedTypes={['estudiante', 'docente']}>
              <Votar />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;