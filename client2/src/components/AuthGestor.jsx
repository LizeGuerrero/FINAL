import { useState } from "react";
import PropTypes from "prop-types";
import { login, register } from "../services/authService";
import "./AuthGestor.css";

const AuthGestor = ({ onClose }) => {
    const [formType, setFormType] = useState("login"); // 'login' o 'register'
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            let response;
            if (formType === "login") {
                response = await login({ email, password });
            } else {
                // Siempre asignar el rol como 'user'
                const userData = { username, email, password };
                response = await register(userData);
            }
            alert(response.mensaje);
            if (response.token) {
                localStorage.setItem("token", response.token);
            }
            onClose(); // Cerrar el modal tras éxito
        } catch (err) {
            setError(err);
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

AuthGestor.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default AuthGestor;
