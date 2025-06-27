import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser, clearError } from "../../store/authSlice";
import "./Register.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { users, error, isAuthenticated, currentUser } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const setVH = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVH();
    window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, []);

  useEffect(() => {
    dispatch(clearError());
  }, [isRegistering, dispatch]);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegistering) {
      const emailExists = users.some((user) => user.email === formData.email);

      if (emailExists) {
        alert("Este email ya está registrado. Por favor, usa otro email.");
        return;
      }

      dispatch(
        registerUser({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        })
      );

      alert("Usuario registrado exitosamente!");

      setFormData({
        username: "",
        email: "",
        password: "",
      });
    } else {
      dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
        })
      );
    }
  };

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      alert(`¡Bienvenido, ${currentUser.username}!`);
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    }
  }, [isAuthenticated, currentUser]);

  return (
    <div className={`login-wrapper ${isRegistering ? "register-mode" : ""}`}>
      <div className="left-panel">
        <h1 className="welcome-title">
          {isRegistering ? "Create Account" : "Welcome"}
        </h1>
        <form onSubmit={handleSubmit} className="login-form">
          {isRegistering && (
            <>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </>
          )}
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="e-mail"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={toggleShowPassword}
              aria-label="Toggle password visibility"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {!isRegistering && (
            <a href="#" className="forgot-password">
              ¿Olvidaste tu contraseña?
            </a>
          )}
          <button type="submit" className="btn-login">
            {isRegistering ? "Register" : "Log In"}
          </button>

          <div className="bottom-option">
            {isRegistering ? (
              <p>
                ¿Ya tenés cuenta?{" "}
                <span
                  className="form-switch"
                  onClick={() => setIsRegistering(false)}
                >
                  Iniciar sesión
                </span>
              </p>
            ) : (
              <p>
                ¿No tenés cuenta?{" "}
                <span
                  className="form-switch"
                  onClick={() => setIsRegistering(true)}
                >
                  Registrate
                </span>
              </p>
            )}
          </div>

          <hr />
        </form>
      </div>

      <div className="right-panel">
        <img
          src={
            isRegistering
              ? "https://img.freepik.com/fotos-premium/lindo-cachorro-beagle-sonriendo-sobre-fondo-azul-solido_280590-43.jpg?semt=ais_hybrid&w=740"
              : "https://thumbs.dreamstime.com/b/gato-azul-brit%C3%A1nico-de-fondo-retrato-en-estudio-fotos-264532619.jpg"
          }
          alt="Imagen"
          className="dog-image"
        />
      </div>
    </div>
  );
};

export default Login;
