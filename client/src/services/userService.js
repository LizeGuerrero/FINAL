import axios from 'axios';

// Obtener la URL base desde el archivo .env
const API_URL = "http://localhost:5000/superadmin/users";
console.log(API_URL);

// Obtener todos los usuarios
export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios', error);
    throw error;
  }
};

// Crear un nuevo usuario
export const createUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario', error);
    throw error;
  }
};

// Actualizar un usuario
export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar usuario', error);
    throw error;
  }
};

// Eliminar un usuario
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar usuario', error);
    throw error;
  }
};