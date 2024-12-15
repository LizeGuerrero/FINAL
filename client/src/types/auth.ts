export interface User {
    _id: string;
    username: string;
    email: string;
    // Agrega otras propiedades de usuario según sea necesario
  }
  
  export interface AuthResponse {
    mensaje: string;
    token: string;
    user?: User; // El usuario puede ser opcional en algunos casos (como en el login)
  }
  
  export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface RegisterData {
    username: string;
    email: string;
    password: string;
  }

  export interface ErrorResponse {
    status: number; // Código de estado HTTP, como 400, 404, etc.
    mensaje: string; // Mensaje del error proporcionado por la API
  }