import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./AdminPage.css";

const AdminPage = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showProductListModal, setShowProductListModal] = useState(false);
  const [showUsersModal, setShowUsersModal] = useState(false);

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

  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nombre: "Lucía Pérez",
      email: "lucia@example.com",
      estado: "activo",
    },
    {
      id: 2,
      nombre: "Carlos Gómez",
      email: "carlos@example.com",
      estado: "activo",
    },
    {
      id: 3,
      nombre: "Ana Suárez",
      email: "ana@example.com",
      estado: "limitado",
    },
    {
      id: 4,
      nombre: "María Fernández",
      email: "maria@example.com",
      estado: "activo",
    },
    { id: 5, nombre: "Juan Soto", email: "juan@example.com", estado: "activo" },
  ]);

  const toggleLimitarUsuario = (id) => {
    setUsuarios((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, estado: u.estado === "activo" ? "limitado" : "activo" }
          : u
      )
    );
  };

  const eliminarUsuario = (id) => {
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
  };

  const renderPedidosModal = (title, pedidos) => (
    <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
          </div>
          <div className="modal-body">
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
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setActiveModal(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-wrapper">
      <div className="admin-container d-flex">
        <div className="sidebar p-3">
          <h2 className="mb-4">Admin</h2>

          <div className="dropdown mb-3">
            <button
              className="btn btn-sidebar dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Pedidos
            </button>
            <ul className="dropdown-menu w-100">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setActiveModal("completados")}
                >
                  Completados
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setActiveModal("proceso")}
                >
                  En proceso
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setActiveModal("cancelados")}
                >
                  Cancelados
                </button>
              </li>
            </ul>
          </div>

          <div className="dropdown mb-3">
            <button
              className="btn btn-sidebar dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Productos
            </button>
            <ul className="dropdown-menu w-100">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setShowProductListModal(true)}
                >
                  Listado
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setShowAddProductModal(true)}
                >
                  Agregar producto
                </button>
              </li>
            </ul>
          </div>

          <button
            className="btn btn-sidebar w-100 mb-3"
            onClick={() => setShowUsersModal(true)}
          >
            Usuarios
          </button>
        </div>

        <div className="main-content p-4">
          <h1>Bienvenido al panel de administración</h1>
          <p>Selecciona una opción del menú para comenzar.</p>
        </div>

        {activeModal === "completados" &&
          renderPedidosModal("Pedidos Completados", pedidosCompletados)}
        {activeModal === "proceso" &&
          renderPedidosModal("Pedidos en Proceso", pedidosProceso)}
        {activeModal === "cancelados" &&
          renderPedidosModal("Pedidos Cancelados", pedidosCancelados)}

        {showProductListModal && (
          <div
            className="modal show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Listado de productos</h5>
                </div>
                <div className="modal-body">
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
                      {productosEjemplo.map((prod) => (
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
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowProductListModal(false)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showAddProductModal && (
          <div
            className="modal show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Agregar nuevo producto</h5>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Nombre del producto</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ej: Collar para perro"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Descripción</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Escribe una breve descripción..."
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Precio</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="$"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Categoría</label>
                      <select className="form-select">
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
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowAddProductModal(false)}
                  >
                    Cerrar
                  </button>
                  <button type="button" className="btn btn-primary">
                    Guardar producto
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showUsersModal && (
          <div
            className="modal show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Usuarios</h5>
                </div>
                <div className="modal-body">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usuarios.map((user) => (
                        <tr
                          key={user.id}
                          className={
                            user.estado === "limitado" ? "table-warning" : ""
                          }
                        >
                          <td>{user.id}</td>
                          <td>{user.nombre}</td>
                          <td>{user.email}</td>
                          <td>{user.estado}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-danger me-2"
                              onClick={() => eliminarUsuario(user.id)}
                            >
                              Eliminar
                            </button>
                            <button
                              className={
                                user.estado === "activo"
                                  ? "btn btn-sm btn-outline-warning"
                                  : "btn btn-sm btn-outline-success"
                              }
                              onClick={() => toggleLimitarUsuario(user.id)}
                            >
                              {user.estado === "activo" ? "Limitar" : "Activar"}
                            </button>
                          </td>
                        </tr>
                      ))}
                      {usuarios.length === 0 && (
                        <tr>
                          <td colSpan={5} className="text-center">
                            No hay usuarios disponibles
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowUsersModal(false)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
