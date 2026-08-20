import './Contacto.css';

function Contacto() {
  return (
    <section className="contact" id="contacto">
      <div className="contact-inner">
        <div className="contact-copy">
          <p className="eyebrow">RESERVAS Y UBICACIÓN</p>
          <h2>Planea tu visita hoy</h2>
          <p>Escríbenos directamente por WhatsApp. Nuestro equipo te ayudará a elegir la mejor experiencia según la ocasión.</p>

          <div className="contact-list">
            <div>
              <span>☎</span>
              <div>
                <small>TELÉFONO / WHATSAPP</small>
                <strong>+57 314 574 1186</strong>
              </div>
            </div>
            <div>
              <span>✉</span>
              <div>
                <small>CORREO ELECTRÓNICO</small>
                <strong>contacto@villaadelaida.com</strong>
              </div>
            </div>
            <div>
              <span>⌖</span>
              <div>
                <small>UBICACIÓN</small>
                <strong>Turbaco · Carretera Troncal vía Arjona, Sector La Rosita</strong>
              </div>
            </div>
          </div>

          <a className="btn btn-primary" href="https://wa.me/573145741186" target="_blank" rel="noopener noreferrer">
            Escribir por WhatsApp
          </a>
        </div>

        <div className="map-card">
          <div className="fake-map">
            <div className="map-road r1"></div>
            <div className="map-road r2"></div>
            <div className="map-road r3"></div>
            <div className="map-water"></div>
            <div className="map-pin">📍</div>
            <span className="map-label">Villa Adelaida</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacto;
