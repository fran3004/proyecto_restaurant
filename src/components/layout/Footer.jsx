import './Footer.css';
import Comentarios from './Comentarios';
import { socialLinks } from './Footer.utils';

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
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook de Villa Adelaida">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M14 8h3V4h-3c-3.3 0-5 2-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.7.3-1 1-1Z" /></svg>
            </a>
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Villa Adelaida">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect width="17" height="17" x="3.5" y="3.5" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.4" cy="6.7" r="1" fill="currentColor" /></svg>
            </a>
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
          <a href="tel:+573012706114">+57 301 270 6114</a>
          <a href="https://wa.me/573012706114" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <span>Manaure, Cesar · Colombia</span>
        </div>
      </div>

      <Comentarios />

      <div className="footer-bottom">
        © 2026 Villa Adelaida · Centro Turístico y Ecológico. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;
