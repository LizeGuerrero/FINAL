import PropTypes from 'prop-types'; 
const UserTable = ({ users, onEditUser, onDeleteUser }) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isActive ? 'Activo' : 'Inactivo'}</td>
              <td>
                <button onClick={() => onEditUser(user)}>Editar</button>
                <button onClick={() => onDeleteUser(user._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  // Añadir la validación de las props
  UserTable.propTypes = {
    users: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        isActive: PropTypes.bool.isRequired,
      })
    ).isRequired,
    onEditUser: PropTypes.func.isRequired,
    onDeleteUser: PropTypes.func.isRequired,
  };
  
  export default UserTable;
  