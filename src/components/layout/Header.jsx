import '../../styles/layout/Header.css';

function Header({ menuOpen, onMenuToggle }) {
  const closeAll = () => {
    if (menuOpen) onMenuToggle();
  };

  return (
    <header className="site-header" id="top">

      {/* LOGO */}
      <a className="brand" href="#inicio" onClick={closeAll}>
        <div className="brand-logo-wrap">
          <img
            src="/assets/brand/logo-header-footer.png"
            alt="Villa Adelaida – Centro Turístico y Ecológico"
            className="brand-logo-img"
          />
        </div>
        <span className="brand-text">
          <strong>VILLA ADELAIDA</strong>
          <small>Centro Turístico y Ecológico</small>
        </span>
      </a>

      {/* HAMBURGUESA */}
      <button
        className="menu-toggle"
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuOpen}
        aria-controls="site-navigation"
        onClick={onMenuToggle}
      >
        ☰
      </button>

      {/* NAV CENTRAL */}
      <nav id="site-navigation" className={`nav${menuOpen ? ' open' : ''}`}>
        <a href="#nosotros" onClick={closeAll}>Nosotros</a>
        <a href="#experiencias" onClick={closeAll}>Experiencias</a>
        <a href="#sazon" onClick={closeAll}>Nuestra Sazón</a>
        <a href="#recuerdos" onClick={closeAll}>Recuerdos</a>
        <a href="#contacto" onClick={closeAll}>Contacto</a>
        <a className="btn-reserve-master" href="#reserva-mesas" onClick={closeAll}>Reservar</a>
      </nav>

    </header>
  );
}

export default Header;
