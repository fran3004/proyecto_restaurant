import './Contacto.css';

function Contacto() {
  return (
    <section className="contact" id="contacto">
      <div className="contact-inner">
        <div className="contact-copy">
          <p className="eyebrow">RESERVAS Y CONTACTO</p>
          <h2>Escríbenos, te respondemos rápido</h2>
          <p>Reserva directa por WhatsApp o teléfono. Nuestro equipo te ayuda a armar el plan según tu grupo, fecha y presupuesto.</p>

          <div className="contact-list">
            <div><span>☎</span><div><small>TELÉFONO</small><strong>+57 314 574 1186</strong></div></div>
            <div><span>✉</span><div><small>CORREO</small><strong>reservas@villamartha.com.co</strong></div></div>
            <div><span>⌖</span><div><small>DIRECCIÓN</small><strong>Turbaco · Carretera Troncal vía Arjona, Sector La Rosita</strong></div></div>
          </div>

          <a className="btn btn-primary" href="https://wa.me/573145741186" target="_blank" rel="noopener noreferrer">Reservar por WhatsApp</a>
        </div>

        <div className="map-card">
          <div className="fake-map">
            <div className="map-road r1"></div><div className="map-road r2"></div><div className="map-road r3"></div>
            <div className="map-water"></div><div className="map-pin">●</div>
            <span className="map-label">Villa Martha</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacto;
