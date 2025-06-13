import React, { useState, useEffect } from "react";
import "./Register.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

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

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(isRegistering ? "Registro enviado" : "Login enviado");
  };

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
                required
              />
            </>
          )}
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" placeholder="e-mail" required />
          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="password"
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
