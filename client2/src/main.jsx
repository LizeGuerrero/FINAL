import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Estilo global***

// Crear la raíz de la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza la aplicación dentro del contenedor root
root.render(
  <React.StrictMode>
    <App />  {/* Aquí es donde se cargará todo el contenido de la aplicación */}
  </React.StrictMode>
);
