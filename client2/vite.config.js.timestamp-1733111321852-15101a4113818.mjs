// vite.config.js
import { defineConfig } from "file:///C:/Users/Bu%C3%B1uelo/Documents/VS%20CODE/JS/ProyectoFinalDeJavaScript/3/client/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Bu%C3%B1uelo/Documents/VS%20CODE/JS/ProyectoFinalDeJavaScript/3/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Configuración para las peticiones API de la aplicación
      "/api": {
        target: "http://localhost:5000",
        // Dirección de servidor backend
        changeOrigin: true,
        // Cambia el origen de la solicitud
        secure: false,
        // Si usas HTTPS en el backend, ponlo en `true` (investigar que es esto)
        rewrite: (path) => path.replace(/^\/api/, "")
        // Reescribe la URL si es necesario (no uso api¿?)
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxCdVx1MDBGMXVlbG9cXFxcRG9jdW1lbnRzXFxcXFZTIENPREVcXFxcSlNcXFxcUHJveWVjdG9GaW5hbERlSmF2YVNjcmlwdFxcXFwzXFxcXGNsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcQnVcdTAwRjF1ZWxvXFxcXERvY3VtZW50c1xcXFxWUyBDT0RFXFxcXEpTXFxcXFByb3llY3RvRmluYWxEZUphdmFTY3JpcHRcXFxcM1xcXFxjbGllbnRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0J1JUMzJUIxdWVsby9Eb2N1bWVudHMvVlMlMjBDT0RFL0pTL1Byb3llY3RvRmluYWxEZUphdmFTY3JpcHQvMy9jbGllbnQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5cbi8vIGh0dHBzOi8vdml0ZS5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCldLFxuICBzZXJ2ZXI6IHtcbiAgICBwcm94eToge1xuICAgICAgLy8gQ29uZmlndXJhY2lcdTAwRjNuIHBhcmEgbGFzIHBldGljaW9uZXMgQVBJIGRlIGxhIGFwbGljYWNpXHUwMEYzblxuICAgICAgJy9hcGknOiB7XG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMCcsIC8vIERpcmVjY2lcdTAwRjNuIGRlIHNlcnZpZG9yIGJhY2tlbmRcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLCAgLy8gQ2FtYmlhIGVsIG9yaWdlbiBkZSBsYSBzb2xpY2l0dWRcbiAgICAgICAgc2VjdXJlOiBmYWxzZSwgIC8vIFNpIHVzYXMgSFRUUFMgZW4gZWwgYmFja2VuZCwgcG9ubG8gZW4gYHRydWVgIChpbnZlc3RpZ2FyIHF1ZSBlcyBlc3RvKVxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpICAvLyBSZWVzY3JpYmUgbGEgVVJMIHNpIGVzIG5lY2VzYXJpbyAobm8gdXNvIGFwaVx1MDBCRj8pXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KSJdLAogICJtYXBwaW5ncyI6ICI7QUFBbWEsU0FBUyxvQkFBb0I7QUFDaGMsT0FBTyxXQUFXO0FBR2xCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUE7QUFBQSxNQUVMLFFBQVE7QUFBQSxRQUNOLFFBQVE7QUFBQTtBQUFBLFFBQ1IsY0FBYztBQUFBO0FBQUEsUUFDZCxRQUFRO0FBQUE7QUFBQSxRQUNSLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSxVQUFVLEVBQUU7QUFBQTtBQUFBLE1BQzlDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
