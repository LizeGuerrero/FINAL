import { useState, useEffect } from 'react';
import UserForm from '../components/UserForm'; // Asegúrate de que UserForm esté importado
import { getUsers } from '../services/userService'; // Importa la función para obtener usuarios

const Dashboard = () => {
  const [users, setUsers] = useState([]); // Estado para almacenar los usuarios
  const [selectedUser, setSelectedUser] = useState(null); // Estado para usuario seleccionado (para editar)
  const [formVisible, setFormVisible] = useState(false); // Estado para controlar la visibilidad del formulario

  // Obtener todos los usuarios cuando el componente se monta
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersData = await getUsers(); // Llamada a la API para obtener los usuarios
      setUsers(usersData); // Almacena los usuarios en el estado
    } catch (error) {
      console.error('Error al obtener usuarios', error);
    }
  };

  const handleCreateUser = () => {
    setSelectedUser(null); // Para crear un nuevo usuario, no hay usuario seleccionado
    setFormVisible(true); // Mostrar el formulario
  };

  const handleEditUser = (user) => {
    setSelectedUser(user); // Establece el usuario seleccionado para edición
    setFormVisible(true); // Mostrar el formulario de edición
  };

  const handleFormSubmitSuccess = () => {
    setFormVisible(false); // Oculta el formulario después de una operación exitosa
    fetchUsers(); // Refresca la lista de usuarios
  };

  const handleCancel = () => {
    setFormVisible(false); // Oculta el formulario
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <button onClick={handleCreateUser}>Crear Usuario</button>

      {formVisible && (
        <UserForm userId={selectedUser ? selectedUser.id : null} onSubmitSuccess={handleFormSubmitSuccess} />
      )}

      <h2>Lista de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre de Usuario</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleEditUser(user)}>Editar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay usuarios</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
