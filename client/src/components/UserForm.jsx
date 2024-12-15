import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes
import { createUser, updateUser } from '../services/userService'; // Asegúrate de importar los métodos de userService

const UserForm = ({ userId, onSubmitSuccess }) => {
  // Estado del formulario
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [isActive, setIsActive] = useState(true);

  // Efecto para cargar datos del usuario si se está actualizando
  useEffect(() => {
    if (userId) {
      // Simulando los datos para el ejemplo
      setUsername('testuser');
      setEmail('testuser@example.com');
      setRole('user');
      setIsActive(true);
    }
  }, [userId]);

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { username, email, password, role, isActive };

    try {
      if (userId) {
        await updateUser(userId, userData);
        alert('Usuario actualizado exitosamente');
      } else {
        await createUser(userData);
        alert('Usuario creado exitosamente');
      }

      if (onSubmitSuccess) {
        onSubmitSuccess(); // Llamamos a la función de éxito
      }
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
      alert('Hubo un problema al guardar el usuario');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{userId ? 'Actualizar Usuario' : 'Crear Usuario'}</h2>

      <div>
        <label>Nombre de usuario</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={!userId} // Solo obligatorio si estamos creando un usuario
        />
      </div>

      <div>
        <label>Rol</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
      </div>

      <div>
        <label>Activo</label>
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
      </div>

      <button type="submit">{userId ? 'Actualizar' : 'Crear'} Usuario</button>
    </form>
  );
};

// Definición de los PropTypes para validación
UserForm.propTypes = {
  userId: PropTypes.string, // Puede ser un string o undefined si no se pasa
  onSubmitSuccess: PropTypes.func.isRequired, // La función para manejar el éxito del formulario
};

export default UserForm;
