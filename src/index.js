// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';  // Importa los estilos aquí

import App from './App'; // Asegúrate de que App esté siendo importado correctamente
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <App />  {/* Envolvemos App con BrowserRouter */}
  </BrowserRouter>
);
