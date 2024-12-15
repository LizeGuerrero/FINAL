import { useState } from "react";
import { login, register } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import "./styles/AuthGestor.css";

// Tipado de las propiedades del componente
interface AuthGestorProps {
  onClose: () => void; // onClose es una función que no devuelve nada
}

const AuthGestor: React.FC<AuthGestorProps> = ({ onClose }) => {
  const { login: loginContext } = useAuth(); // Accede a la función login del contexto
  const [formType, setFormType] = useState<"login" | "register">("login"); // 'login' o 'register'
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let response;
      if (formType === "login") {
        response = await login({ email, password });
      } else {
        const userData = { username, email, password };
        response = await register(userData);
      }

      alert(response.mensaje);
      if (response.token) {
        // Guarda el token en localStorage
        localStorage.setItem("token", response.token);
        // Actualiza el estado de autenticación global a través del contexto
        loginContext(response.token);
      }

      onClose(); // Cierra el modal tras éxito
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchForm = () => {
    setFormType(formType === "login" ? "register" : "login");
    setEmail("");
    setPassword("");
    setUsername("");
    setError(null);
  };

  return (
    <div className="auth-modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2 className="auth-title">
          {formType === "login" ? "Iniciar Sesión" : "Registrarse"}
        </h2>
        {error && <p className="auth-error">{error}</p>}
        <form className="auth-form" onSubmit={handleSubmit}>
          {formType === "register" && (
            <input
              className="auth-input"
              type="text"
              placeholder="Nombre de Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            className="auth-input"
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="auth-button"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Cargando..."
              : formType === "login"
              ? "Iniciar Sesión"
              : "Registrarse"}
          </button>
        </form>
        <p className="auth-switch" onClick={handleSwitchForm}>
          {formType === "login"
            ? "¿No tienes cuenta? Regístrate"
            : "¿Ya tienes cuenta? Inicia sesión"}
        </p>
      </div>
    </div>
  );
};

export default AuthGestor;
