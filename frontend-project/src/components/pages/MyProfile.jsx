import { useState } from "react";
import "./MyProfile.css";

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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    alert("Tus cambios han sido guardados exitosamente.");
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const years = Array.from({ length: 60 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="profile-container">
      <div className="profile-inner">
        <div className="profile-header">
          <div className="profile-header-content">
            <img
              src="/lovable-uploads/e42add4e-61df-43be-a820-7686ebf9de1c.png"
              alt="Profile"
              className="profile-avatar"
            />
            <div>
              <h1 className="profile-name">KATHLEEN JOHNSON</h1>
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
      </div>
    </div>
  );
};

export default MyProfile;
