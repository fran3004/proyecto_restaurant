function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand">
          <div className="brand-mark">V</div>
          <h3>VILLA MARTHA</h3>
          <p>Un paraíso natural en Turbaco, Bolívar.</p>
          <div className="socials"><a href="#">f</a><a href="#">◎</a><a href="#">◉</a></div>
        </div>
        <div>
          <h4>Navegación</h4>
          <a href="#pasadia">Pasadía</a>
          <a href="#hospedaje">Hospedaje</a>
          <a href="#experiencias">Experiencias</a>
        </div>
        <div>
          <h4>Recursos</h4>
          <a href="#contacto">Menú del restaurante</a>
          <a href="#galeria">Brochure interactivo</a>
          <a href="#contacto">Ecosistema VM</a>
        </div>
        <div>
          <h4>Contacto</h4>
          <a href="tel:+573145741186">+57 314 574 1186</a>
          <a href="mailto:reservas@villamartha.com.co">reservas@villamartha.com.co</a>
          <span>Turbaco · Bolívar · Colombia</span>
        </div>
      </div>
      <div className="footer-bottom">© 2026 Hotel Campestre Villa Martha. Todos los derechos reservados.</div>
    </footer>
  );
}

export default Footer;
