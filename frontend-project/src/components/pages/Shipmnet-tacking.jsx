import React from "react";
import "./Shipmnet-tacking.css";

const ShipmentTracking = () => {
  return (
    <div className="shipment-tracking">
      <h1>Seguimiento de Envío</h1>
      <div className="status-wrapper">
        <div className="status">En Tránsito</div>
        <div className="expected-delivery">
          Entrega estimada: 15 de Marzo, 2024
        </div>
      </div>
      <div className="tracking-progress">
        <div className="progress-bar">
          <div className="progress-indicator"></div>
        </div>
        <div className="progress-labels">
          <span>Orden Confirmada</span>
          <span>En Tránsito</span>
          <span>En Reparto</span>
          <span>Entregado</span>
        </div>
      </div>
      <details className="tracking-details">
        <summary>Historial de Seguimiento</summary>
        <ul>
          <li>
            15 Mar 2024, 10:30 AM - En tránsito hacia el centro de distribución
            local
          </li>
          <li>
            14 Mar 2024, 08:15 PM - Paquete recibido en el centro de
            distribución
          </li>
          <li>14 Mar 2024, 02:30 PM - Enviado desde el almacén</li>
          <li>14 Mar 2024, 10:00 AM - Orden confirmada</li>
        </ul>
      </details>
    </div>
  );
};

export default ShipmentTracking;
