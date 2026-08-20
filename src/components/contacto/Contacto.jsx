import './Contacto.css';

function Contacto() {
  return (
    <section className="contact" id="contacto">
      <div className="contact-inner">
        <div className="contact-copy">
          <p className="eyebrow">RESERVAS Y UBICACIÓN</p>
          <h2>Planea tu visita hoy</h2>
          <p>Escríbenos directamente por WhatsApp. Nuestro equipo te ayudará a elegir la mejor experiencia de naturaleza, río y gastronomía según la ocasión.</p>

          <div className="contact-list">
            <div>
              <span>☎</span>
              <div>
                <small>TELÉFONO / WHATSAPP</small>
                <a href="tel:+573145238716"><strong>+57 314 523 8716</strong></a>
                <a href="tel:+573226516884"><strong>+57 322 651 6884</strong></a>
                <a href="tel:+573147840545"><strong>+57 314 784 0545</strong></a>
              </div>
            </div>
            <div>
              <span>⌖</span>
              <div>
                <small>UBICACIÓN</small>
                <strong>Manaure, Cesar · A 200 metros del río Manaure</strong>
              </div>
            </div>
          </div>

          <a className="btn btn-primary" href="https://wa.link/ewr2c9" target="_blank" rel="noopener noreferrer">
            Escribir por WhatsApp
          </a>
        </div>

        <div className="map-card">
          <iframe
            className="fake-map"
            title="Mapa de Villa Adelaida en Manaure, Cesar"
            src="https://www.google.com/maps?q=Villa+Adelaida,+Manaure,+Cesar,+Colombia&output=embed"
            width="100%"
            height="100%"
            border="0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

export default Contacto;
