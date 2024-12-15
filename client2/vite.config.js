import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Configuración para las peticiones API de la aplicación
      '/api': {
        target: 'http://localhost:5000', // Dirección de servidor backend
        changeOrigin: true,  // Cambia el origen de la solicitud
        secure: false,  // Si usas HTTPS en el backend, ponlo en `true` (investigar que es esto)
        rewrite: (path) => path.replace(/^\/api/, '')  // Reescribe la URL si es necesario (no uso api¿?)
      },
    },
  },
})