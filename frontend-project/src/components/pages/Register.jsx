import React, { useState, useEffect } from "react";
import "./Register.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { adToken } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    surname: "",
    email: "",
    address: "",
    phone: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((store) => store.auth);
  console.log(token);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegistering) {
      try {
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.username,
            surname: formData.surname,
            email: formData.email,
            address: formData.address,
            phone: formData.phone,
            password: formData.password,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          alert(errorData.message || "Error al registrar");
          return;
        }

        alert("Usuario registrado exitosamente!");
        setFormData({
          username: "",
          surname: "",
          email: "",
          address: "",
          phone: "",
          password: "",
        });
        setIsRegistering(false);
      } catch (error) {
        console.error(error);
        alert("Error de red");
      }
    } else {
      try {
        const response = await fetch("http://localhost:3000/tokens", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            dispatch(adToken(data.token));
          });

        // if (!response.ok) {
        //   const errorData = await response.json();
        //   alert(errorData.message || "Error al registrar");
        //   return;
        // }

        alert("Usuario registrado exitosamente!");
        setFormData({
          username: "",
          surname: "",
          email: "",
          address: "",
          phone: "",
          password: "",
        });
        setIsRegistering(false);
        navigate("/");
      } catch (error) {
        console.error(error);
        alert("Error de red");
      }
    }
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
              <label htmlFor="username">Nombre</label>
              <input
                id="username"
                type="text"
                placeholder="Nombre"
                value={formData.username}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="surname">Apellido</label>
              <input
                id="surname"
                type="text"
                placeholder="Apellido"
                value={formData.surname}
                onChange={handleInputChange}
              />

              <label htmlFor="address">Dirección</label>
              <input
                id="address"
                type="text"
                placeholder="Dirección"
                value={formData.address}
                onChange={handleInputChange}
              />

              <label htmlFor="phone">Teléfono</label>
              <input
                id="phone"
                type="text"
                placeholder="Teléfono"
                value={formData.phone}
                onChange={handleInputChange}
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
              placeholder="Password"
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

          <button type="submit" className="btn-login">
            {isRegistering ? "Registrarse" : "Iniciar sesión"}
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
