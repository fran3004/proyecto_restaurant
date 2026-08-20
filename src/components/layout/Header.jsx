import './Header.css';

function Header({ menuOpen, onMenuToggle }) {
  return (
    <header className="site-header" id="top">
      <a className="brand" href="#inicio">
        <span className="brand-mark">V</span>
        <span>
          <strong>VILLA MARTHA</strong>
          <small>Hotel Campestre</small>
        </span>
      </a>

      <button className="menu-toggle" aria-label="Abrir menú" onClick={onMenuToggle}>
        ☰
      </button>

      <nav className={`nav${menuOpen ? ' open' : ''}`}>
        <a href="#pasadia">Pasadía</a>
        <a href="#hospedaje">Hospedaje</a>
        <a href="#experiencias">Experiencias</a>
        <a href="#galeria">Galería</a>
        <a href="#contacto">Contacto</a>
        <a className="nav-cta" href="#contacto">Reservar</a>
      </nav>
    </header>
  );
}

export default Header;
