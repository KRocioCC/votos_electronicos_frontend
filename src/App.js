// src/App.js
import React from 'react';
import './index.css'; // Asegúrate de que esto esté presente para cargar los estilos

import AppRoutes from './routes/AppRoutes'; // Importa AppRoutes

function App() {
  return (
    <div>
      <AppRoutes /> {/* Usa el componente AppRoutes */}
    </div>
  );
}

export default App;
