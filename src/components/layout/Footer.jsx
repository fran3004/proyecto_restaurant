import './Footer.css';

function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-logo-wrap">
            <img src="/logo.jpeg" alt="Villa Adelaida" className="footer-logo-img" />
          </div>
          <h3>VILLA ADELAIDA</h3>
          <p>Centro Turístico y Ecológico. Tu refugio de naturaleza y descanso.</p>
          <div className="socials">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="TikTok">🎵</a>
          </div>
        </div>

        <div>
          <h4>Navegación</h4>
          <a href="#experiencias">Experiencias</a>
          <a href="#sazon">Nuestra Sazón</a>
          <a href="#recuerdos">Recuerdos</a>
          <a href="#contacto">Contacto</a>
        </div>

        <div>
          <h4>Experiencias</h4>
          <a href="#experiencias">Pasadías Ecológicos</a>
          <a href="#experiencias">Ruta del Cacao</a>
          <a href="#sazon">Menú del Restaurante</a>
        </div>

        <div>
          <h4>Contacto Directo</h4>
          <a href="tel:+573145741186">+57 314 574 1186</a>
          <a href="mailto:contacto@villaadelaida.com">contacto@villaadelaida.com</a>
          <span>Colombia</span>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 Villa Adelaida · Centro Turístico y Ecológico. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;
