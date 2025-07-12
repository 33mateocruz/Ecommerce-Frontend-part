import { useState } from "react";
import "./MyProfile.css";

const departamentosUY = [
  "Artigas", "Canelones", "Cerro Largo", "Colonia", "Durazno",
  "Flores", "Florida", "Lavalleja", "Maldonado", "Montevideo",
  "Paysandú", "Río Negro", "Rivera", "Rocha", "Salto",
  "San José", "Soriano", "Tacuarembó", "Treinta y Tres"
];

const MyProfile = () => {
  const [formData, setFormData] = useState({
    name: "Kathleen Johnson",
    email: "kathleen.johnson@email.com",
    cellPhone: "+1 (555) 123-4567",
    localidad: "Miami, FL",
    birthDay: "15",
    birthMonth: "March",
    birthYear: "1990",
  });

  const purchaseHistory = [
    {
      id: 1,
      date: "2025-06-01",
      product: "Dog Food - Premium",
      quantity: 2,
      price: 30,
      details: "Compra de 2 paquetes de comida para perros premium.",
    },
    {
      id: 2,
      date: "2025-05-25",
      product: "Cat Toy - Laser Pointer",
      quantity: 1,
      price: 12,
      details: "Compra de un juguete láser para gatos.",
    },
    {
      id: 3,
      date: "2025-05-15",
      product: "Pet Collar - Medium",
      quantity: 1,
      price: 20,
      details: "Compra de un collar para mascotas tamaño mediano.",
    },
  ];

  const [view, setView] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Estado para datos privados
  const [privateData, setPrivateData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    department: "",
    address: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePrivateChange = (field, value) => {
    setPrivateData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    alert("Tus cambios han sido guardados exitosamente.");
  };

  const handleSavePrivate = () => {
    if (privateData.newPassword !== privateData.confirmNewPassword) {
      alert("Las nuevas contraseñas no coinciden.");
      return;
    }
    if (privateData.newPassword.length > 0 && privateData.currentPassword.length === 0) {
      alert("Por favor ingresa tu contraseña actual para cambiarla.");
      return;
    }
    // Aquí podrías agregar lógica real para validar y guardar
    alert("Datos privados guardados correctamente.");
    setPrivateData({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      department: privateData.department,
      address: privateData.address,
    });
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const years = Array.from({ length: 60 }, (_, i) => new Date().getFullYear() - i);

  return (
    <>
      <button
        className="toggle-sidebar-btn"
        onClick={() => setSidebarOpen((open) => !open)}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

      <div className="profile-layout">
        {/* Sidebar */}
        <nav className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <ul>
            <li
              className={view === "history" ? "active" : ""}
              onClick={() => {
                setView("history");
                setSidebarOpen(false);
              }}
            >
              Historial de Compras
            </li>
            <li
              className={view === "profile" ? "active" : ""}
              onClick={() => {
                setView("profile");
                setSidebarOpen(false);
              }}
            >
              Perfil
            </li>
            <li
              className={view === "private" ? "active" : ""}
              onClick={() => {
                setView("private");
                setSidebarOpen(false);
              }}
            >
              Datos Privados
            </li>
          </ul>
        </nav>


        <main className={`main-content ${sidebarOpen ? "overlay" : ""}`}>
          {view === "profile" && (
            <>
              <div className="profile-header">
                <div className="profile-header-content">
                  <div>
                    <h1 className="profile-name">{formData.name.toUpperCase()}</h1>
                  </div>
                </div>
              </div>

              <div className="profile-card">
                <h2>Edit Profile</h2>
                <p>Update your personal information</p>

                <div className="form-group">
                  <label className="form-label" htmlFor="name">Name</label>
                  <input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">E-mail</label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="cellPhone">Cell Phone</label>
                    <input
                      id="cellPhone"
                      type="tel"
                      value={formData.cellPhone}
                      onChange={(e) => handleInputChange("cellPhone", e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="localidad">Localidad</label>
                    <input
                      id="localidad"
                      value={formData.localidad}
                      onChange={(e) => handleInputChange("localidad", e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Birth date</label>
                  <div className="form-date">
                    <select
                      value={formData.birthDay}
                      onChange={(e) => handleInputChange("birthDay", e.target.value)}
                      className="form-select"
                    >
                      {days.map((day) => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>

                    <select
                      value={formData.birthMonth}
                      onChange={(e) => handleInputChange("birthMonth", e.target.value)}
                      className="form-select"
                    >
                      {months.map((month) => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>

                    <select
                      value={formData.birthYear}
                      onChange={(e) => handleInputChange("birthYear", e.target.value)}
                      className="form-select"
                    >
                      {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button onClick={handleSave} className="save-button">
                  Save Changes
                </button>
              </div>
            </>
          )}

          {view === "history" && (
            <div className="profile-card">
              <h2>Historial de Compras</h2>
              <ul className="purchase-list">
                {purchaseHistory.map((item) => (
                  <li key={item.id} className="purchase-item">
                    <span className="purchase-date">{item.date}</span>
                    <span className="purchase-product">{item.product}</span>
                    <span className="purchase-qty">x{item.quantity}</span>
                    <span className="purchase-price">${item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {view === "private" && (
            <div className="profile-card">
              <h2>Datos Privados</h2>

              {/* Cambio de contraseña */}
              <section className="private-section">
                <h3>Cambio de Contraseña</h3>
                <div className="form-group">
                  <label className="form-label" htmlFor="currentPassword">Contraseña Actual</label>
                  <input
                    id="currentPassword"
                    type="password"
                    value={privateData.currentPassword}
                    onChange={(e) => handlePrivateChange("currentPassword", e.target.value)}
                    className="form-input nicer-input"
                    placeholder="Ingresa tu contraseña actual"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="newPassword">Nueva Contraseña</label>
                  <input
                    id="newPassword"
                    type="password"
                    value={privateData.newPassword}
                    onChange={(e) => handlePrivateChange("newPassword", e.target.value)}
                    className="form-input nicer-input"
                    placeholder="Nueva contraseña"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="confirmNewPassword">Repetir Nueva Contraseña</label>
                  <input
                    id="confirmNewPassword"
                    type="password"
                    value={privateData.confirmNewPassword}
                    onChange={(e) => handlePrivateChange("confirmNewPassword", e.target.value)}
                    className="form-input nicer-input"
                    placeholder="Repite la nueva contraseña"
                  />
                </div>
              </section>

              <hr className="divider" />

              {/* Dirección */}
              <section className="private-section">
                <h3>Dirección</h3>
                <div className="form-group">
                  <label className="form-label" htmlFor="department">Departamento (Uruguay)</label>
                  <select
                    id="department"
                    value={privateData.department}
                    onChange={(e) => handlePrivateChange("department", e.target.value)}
                    className="form-select nicer-select"
                  >
                    <option value="">Selecciona un departamento</option>
                    {departamentosUY.map((dep) => (
                      <option key={dep} value={dep}>{dep}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="address">Dirección Puntual</label>
                  <input
                    id="address"
                    type="text"
                    value={privateData.address}
                    onChange={(e) => handlePrivateChange("address", e.target.value)}
                    className="form-input nicer-input"
                    placeholder="Ej: Calle 123, Apartamento 4"
                  />
                </div>
              </section>

              <button onClick={handleSavePrivate} className="save-button">
                Guardar
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default MyProfile;
