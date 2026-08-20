import './Footer.css';

function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-logo-wrap">
            <img src="/assets/brand/logo-header-footer.png" alt="Villa Adelaida" className="footer-logo-img" />
          </div>
          <h3>VILLA ADELAIDA</h3>
          <p>Centro Turístico y Ecológico. Naturaleza, río y gastronomía típica en Manaure, Cesar.</p>
          <div className="socials">
            <span aria-label="Facebook">f</span>
            <span aria-label="Instagram">📷</span>
            <span aria-label="TikTok">🎵</span>
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
          <a href="tel:+573145238716">+57 314 523 8716</a>
          <a href="tel:+573226516884">+57 322 651 6884</a>
          <a href="tel:+573147840545">+57 314 784 0545</a>
          <a href="https://wa.link/ewr2c9" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <span>Manaure, Cesar · Colombia</span>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 Villa Adelaida · Centro Turístico y Ecológico. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;
