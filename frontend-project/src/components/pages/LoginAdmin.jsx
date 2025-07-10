import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const usuariosHardcodeados = [
  {
    nombre: "admin",
    email: "admin@admin.com",
    password: "admin",
    privilegios: "admin",
    estado: "activo",
  },
  {
    nombre: "moderador",
    email: "mod@mod.com",
    password: "mod",
    privilegios: "moderador",
    estado: "activo",
  },
];

const LoginAdmin = ({ onLogin }) => {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const usuariosRedux = useSelector((state) => state.userAdmin.users);

  const todosLosUsuarios = [
    ...usuariosHardcodeados,
    ...usuariosRedux.filter(
      (u) => !usuariosHardcodeados.some((h) => h.nombre === u.nombre)
    ),
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = todosLosUsuarios.find(
      (u) =>
        u.nombre === nombre &&
        (u.password === password || (!u.password && password === ""))
    );
    if (
      user &&
      (user.privilegios === "admin" || user.privilegios === "moderador")
    ) {
      setError("");
      if (onLogin) onLogin(user);
      localStorage.setItem("usuarioLogueado", JSON.stringify(user));
      navigate("/admin");
    } else {
      setError(
        "Usuario o contraseña incorrectos, o no tienes permisos de acceso."
      );
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4">Login Admin</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary w-100">
          Login Admin
        </button>
      </form>
      <div className="mt-4 alert alert-info p-2">
        <strong>Usuario de prueba:</strong>
        <br />
        Usuario: <b>admin</b>
        <br />
        Contraseña: <b>admin</b>
      </div>
    </div>
  );
};

export default LoginAdmin;
