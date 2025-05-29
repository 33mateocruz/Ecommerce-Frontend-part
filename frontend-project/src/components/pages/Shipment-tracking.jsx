function ShipmentTracking() {
  return (
    <div className="shipment-tracking">
      <h1>Seguimiento del Envío</h1>
      <div className="status-wrapper">
        <h2 className="status">En Camino para Entrega</h2>
        <p className="expected-delivery">
          Entrega estimada:{" "}
          <strong>Lunes, 8 de junio de 2015, antes de las 8:00 p.m.</strong>
        </p>
        <p>Tu paquete está en camino y llegará hoy.</p>
      </div>
      <div className="tracking-progress">
        <div className="progress-bar">
          <div className="progress-indicator">En camino para entrega</div>
        </div>
        <div className="progress-labels">
          <span>Preparando Envío</span>
          <span>Enviado</span>
          <span>En Tránsito</span>
          <span>Entregado</span>
        </div>
      </div>
      <details className="tracking-details">
        <summary>Detalles del Seguimiento</summary>
        <ul>
          <li>
            Lunes, 8 de junio de 2015, 4:07 p.m., Seattle WA EE.UU. - En camino
            para entrega
          </li>
          <li>
            Lunes, 8 de junio de 2015, 2:34 p.m., Seattle WA EE.UU. - En camino
            desde una instalación del transportista
          </li>
          <li>
            Lunes, 8 de junio de 2015, 12:34 p.m., Seattle WA EE.UU. - El
            paquete salió de la instalación del vendedor y está en tránsito
            hacia el transportista
          </li>
        </ul>
      </details>
    </div>
  );
}

export default ShipmentTracking;
