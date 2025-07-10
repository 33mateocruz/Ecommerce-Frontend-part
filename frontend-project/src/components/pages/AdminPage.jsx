import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleEstadoUsuario,
  eliminarUsuario,
  addProduct,
  agregarUsuarioConPrivilegios,
} from "../../store/userAdminSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./AdminPage.css";
import { useNavigate } from "react-router-dom";

const AdminPage = ({ onLogout }) => {
  const [currentView, setCurrentView] = useState("dashboard");

  const [newProduct, setNewProduct] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "Accesorios",
  });

  const [newUser, setNewUser] = useState({
    nombre: "",
    email: "",
    password: "",
    privilegios: "usuario",
  });

  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [openMenu, setOpenMenu] = useState({
    pedidos: false,
    productos: false,
  });

  const pedidosCompletados = [
    { id: 1, cliente: "Lucía Pérez", fecha: "12/06/2025", total: "$2500" },
    { id: 2, cliente: "Carlos Gómez", fecha: "10/06/2025", total: "$4200" },
    { id: 3, cliente: "Ana Suárez", fecha: "09/06/2025", total: "$1800" },
  ];

  const pedidosProceso = [
    { id: 4, cliente: "María Fernández", fecha: "15/06/2025", total: "$3100" },
    { id: 5, cliente: "Juan Soto", fecha: "16/06/2025", total: "$2950" },
  ];

  const pedidosCancelados = [
    { id: 6, cliente: "Rocío Díaz", fecha: "08/06/2025", total: "$1200" },
  ];

  const productosEjemplo = [
    { id: 1, nombre: "Collar LED", categoria: "Accesorios", precio: "$850" },
    {
      id: 2,
      nombre: "Bolso Transportador",
      categoria: "Accesorios",
      precio: "$3200",
    },
    { id: 3, nombre: "Pelota Chillona", categoria: "Juguetes", precio: "$450" },
  ];

  const usuarios = useSelector((state) => state.userAdmin.users);
  const productosRedux = useSelector((state) => state.userAdmin.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usuariosHardcodeados = [
    {
      id: 1,
      nombre: "admin",
      email: "admin@admin.com",
      password: "admin",
      privilegios: "admin",
      estado: "activo",
    },
    {
      id: 2,
      nombre: "moderador",
      email: "mod@mod.com",
      password: "mod",
      privilegios: "moderador",
      estado: "activo",
    },
  ];

  useEffect(() => {
    console.log("Estado de usuarios actualizado:", usuarios);
  }, [usuarios]);

  const todosLosProductos = [...productosEjemplo, ...productosRedux];

  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    if (newProduct.nombre && newProduct.precio) {
      const maxId = Math.max(...todosLosProductos.map((p) => p.id));
      const productToAdd = {
        id: maxId + 1,
        nombre: newProduct.nombre,
        descripcion: newProduct.descripcion,
        precio: `$${newProduct.precio}`,
        categoria: newProduct.categoria,
      };

      dispatch(addProduct(productToAdd));

      setNewProduct({
        nombre: "",
        descripcion: "",
        precio: "",
        categoria: "Accesorios",
      });

      setCurrentView("productos-lista");
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();

    console.log("Datos del formulario:", newUser);
    console.log("Validación:", {
      nombre: !!newUser.nombre,
      email: !!newUser.email,
      password: !!newUser.password,
    });

    if (newUser.nombre && newUser.email && newUser.password) {
      const userToAdd = {
        nombre: newUser.nombre,
        email: newUser.email,
        password: newUser.password,
        privilegios: newUser.privilegios,
      };

      console.log("Usuario a agregar:", userToAdd);
      dispatch(agregarUsuarioConPrivilegios(userToAdd));

      setNewUser({
        nombre: "",
        email: "",
        password: "",
        privilegios: "usuario",
      });

      setShowAddUserForm(false);
      alert("Usuario agregado exitosamente!");
    } else {
      alert("Por favor, completa todos los campos obligatorios");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogueado");
    if (onLogout) onLogout();
    navigate("/login");
  };

  const renderPedidosContent = (title, pedidos) => (
    <div>
      <h2>{title}</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.cliente}</td>
              <td>{pedido.fecha}</td>
              <td>{pedido.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderProductosContent = () => (
    <div>
      <h2>Listado de productos</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {todosLosProductos.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.nombre}</td>
              <td>{prod.categoria}</td>
              <td>{prod.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderAddProductContent = () => (
    <div>
      <h2>Agregar nuevo producto</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Nombre del producto</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ej: Collar para perro"
            name="nombre"
            value={newProduct.nombre}
            onChange={handleProductInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="Escribe una breve descripción..."
            name="descripcion"
            value={newProduct.descripcion}
            onChange={handleProductInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            placeholder="$"
            name="precio"
            value={newProduct.precio}
            onChange={handleProductInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Categoría</label>
          <select
            className="form-select"
            name="categoria"
            value={newProduct.categoria}
            onChange={handleProductInputChange}
          >
            <option>Accesorios</option>
            <option>Alimentos</option>
            <option>Juguetes</option>
            <option>Salud</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Imagen</label>
          <input type="file" className="form-control" />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddProduct}
        >
          Guardar producto
        </button>
      </form>
    </div>
  );

  const renderUsersContent = () => (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Usuarios</h2>
        <button
          className="btn btn-success"
          onClick={() => setShowAddUserForm(!showAddUserForm)}
        >
          {showAddUserForm ? "Cancelar" : "Agregar Usuario"}
        </button>
      </div>

      {showAddUserForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Agregar nuevo usuario</h5>
            <form onSubmit={handleAddUser}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre completo"
                    name="nombre"
                    value={newUser.nombre}
                    onChange={handleUserInputChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="email@ejemplo.com"
                    name="email"
                    value={newUser.email}
                    onChange={handleUserInputChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    name="password"
                    value={newUser.password}
                    onChange={handleUserInputChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Privilegios</label>
                  <select
                    className="form-select"
                    name="privilegios"
                    value={newUser.privilegios}
                    onChange={handleUserInputChange}
                  >
                    <option value="usuario">Usuario</option>
                    <option value="admin">Administrador</option>
                    <option value="moderador">Moderador</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Guardar usuario
              </button>
            </form>
          </div>
        </div>
      )}

      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Estado</th>
            <th>Privilegios</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr
              key={user.id}
              className={user.estado === "limitado" ? "table-warning" : ""}
            >
              <td>{user.id}</td>
              <td>{user.nombre}</td>
              <td>{user.email}</td>
              <td>
                <span
                  className={`badge ${
                    user.estado === "activo" ? "bg-success" : "bg-warning"
                  }`}
                >
                  {user.estado === "limitado" ? "moderador" : user.estado}
                </span>
              </td>
              <td>
                <span
                  className={`badge ${
                    user.privilegios === "admin"
                      ? "bg-danger"
                      : user.privilegios === "moderador"
                      ? "bg-warning"
                      : "bg-info"
                  }`}
                >
                  {user.privilegios}
                </span>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-outline-danger me-2"
                  onClick={() => dispatch(eliminarUsuario(user.id))}
                >
                  Eliminar
                </button>
                <button
                  className={
                    user.estado === "activo"
                      ? "btn btn-sm btn-outline-warning"
                      : "btn btn-sm btn-outline-success"
                  }
                  onClick={() => dispatch(toggleEstadoUsuario(user.id))}
                >
                  {user.estado === "activo" ? "Moderador" : "Activar"}
                </button>
              </td>
            </tr>
          ))}
          {usuarios.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center">
                No hay usuarios disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderMainContent = () => {
    switch (currentView) {
      case "pedidos-completados":
        return renderPedidosContent("Pedidos Completados", pedidosCompletados);
      case "pedidos-proceso":
        return renderPedidosContent("Pedidos en Proceso", pedidosProceso);
      case "pedidos-cancelados":
        return renderPedidosContent("Pedidos Cancelados", pedidosCancelados);
      case "productos-lista":
        return renderProductosContent();
      case "productos-agregar":
        return renderAddProductContent();
      case "usuarios":
        return renderUsersContent();
      default:
        return (
          <div>
            <h1>Bienvenido al panel de administración</h1>
            <p>Selecciona una opción del menú para comenzar.</p>
          </div>
        );
    }
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-container d-flex">
        <div className="sidebar p-3">
          <h2 className="mb-4">Admin</h2>
          <button
            className="btn btn-outline-danger w-100 mb-3"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>

          <div className="sidebar-menu">
            <button
              className="btn btn-sidebar w-100 mb-1"
              onClick={() =>
                setOpenMenu((prev) => ({ ...prev, pedidos: !prev.pedidos }))
              }
            >
              Pedidos 🔽
            </button>
            {openMenu.pedidos && (
              <div className="sidebar-submenu">
                <button
                  className="sidebar-subitem"
                  onClick={() => setCurrentView("pedidos-completados")}
                >
                  Completados
                </button>
                <button
                  className="sidebar-subitem"
                  onClick={() => setCurrentView("pedidos-proceso")}
                >
                  En proceso
                </button>
                <button
                  className="sidebar-subitem"
                  onClick={() => setCurrentView("pedidos-cancelados")}
                >
                  Cancelados
                </button>
              </div>
            )}

            <button
              className="btn btn-sidebar w-100 mb-1"
              onClick={() =>
                setOpenMenu((prev) => ({ ...prev, productos: !prev.productos }))
              }
            >
              Productos 🔽
            </button>
            {openMenu.productos && (
              <div className="sidebar-submenu">
                <button
                  className="sidebar-subitem"
                  onClick={() => setCurrentView("productos-lista")}
                >
                  Listado
                </button>
                <button
                  className="sidebar-subitem"
                  onClick={() => setCurrentView("productos-agregar")}
                >
                  Agregar producto
                </button>
              </div>
            )}

            <button
              className="btn btn-sidebar w-100 mb-3"
              onClick={() => setCurrentView("usuarios")}
            >
              Usuarios
            </button>
          </div>
        </div>

        <div className="main-content p-4">{renderMainContent()}</div>
      </div>
    </div>
  );
};

export default AdminPage;
