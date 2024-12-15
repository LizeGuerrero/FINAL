import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import { AuthContextType, User } from '../types/user';  // Importa los tipos desde 'user.ts'

// Crear el contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor del contexto de autenticación
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);  // Usando el tipo User
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Verificar el token al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser: User = jwtDecode(token);  // Usamos el tipo User
        setUser(decodedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        // Token inválido, limpiar el almacenamiento
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
      }
    }
    setIsLoading(false);
  }, []);

  // Iniciar sesión
  const login = (token: string): void => {
    localStorage.setItem('token', token);
    const decodedUser: User = jwtDecode(token);  // Usamos el tipo User
    setUser(decodedUser);
    setIsAuthenticated(true);
  };

  // Cerrar sesión
  const logout = (): void => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Verificar si el usuario tiene un rol específico
  const hasRole = (requiredRole: string): boolean => {
    // Primero verificamos que `user` no sea null
    if (!user) {
      return false; // Si no hay usuario, retornamos `false`
    }
  
    // Ahora podemos acceder a `user.role` de forma segura
    return user.role === requiredRole;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

// Componente de ruta protegida
interface PrivateRouteProps {
  children: ReactNode;
  requiredRole?: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, isLoading, hasRole } = useAuth();

  // Si aún se está cargando, mostrar un spinner o nada
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  // Verificar autenticación y rol (si se requiere)
  if (!isAuthenticated) {
    // Redirigir al inicio ("/")
    return <Navigate to="/" replace />;
  }

  // Verificar rol si se proporciona
  if (requiredRole && !hasRole(requiredRole)) {
    // Redirigir a la página de inicio ("/")
    return <Navigate to="/" replace />;
  }

  // Renderizar los children si todo está bien
  return <>{children}</>;
};
