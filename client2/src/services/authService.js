// URL base de la API de autenticación
const API_URL = "http://localhost:5000/users";  // Asegúrate de que esta URL sea correcta

import axios from 'axios';

// Función para registrar un nuevo usuario
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;  // Retornamos la respuesta que contiene el mensaje y el token
  } catch (error) {
    console.error("Error en el registro:", error);
    // Aquí manejamos el error de manera adecuada
    throw error.response?.data?.mensaje || "Ocurrió un error durante el registro";
  }
};

// Función para iniciar sesión
export const login = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData);
    return response.data;  // Retornamos la respuesta que contiene el mensaje, el token y el usuario
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    // Aquí manejamos el error de manera adecuada
    throw error.response?.data?.mensaje || "Ocurrió un error durante el inicio de sesión";
  }
};
