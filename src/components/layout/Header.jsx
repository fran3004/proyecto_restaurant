import { useState, useEffect, useRef } from 'react';
import './Header.css';

function Header({ menuOpen, onMenuToggle }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cierra el dropdown al hacer clic fuera
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const closeAll = () => {
    setDropdownOpen(false);
  };

  return (
    <header className="site-header" id="top">

      {/* LOGO */}
      <a className="brand" href="#inicio">
        <div className="brand-logo-wrap">
          <img
            src="/logo.jpeg"
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
      <button className="menu-toggle" aria-label="Abrir menú" onClick={onMenuToggle}>
        ☰
      </button>

      {/* NAV CENTRAL */}
      <nav className={`nav${menuOpen ? ' open' : ''}`}>
        <a href="#nosotros" onClick={closeAll}>Nosotros</a>
        <a href="#reserva-mesas" onClick={closeAll}>Reservar Mesa</a>
        <a href="#experiencias" onClick={closeAll}>Experiencias</a>
        <a href="#sazon" onClick={closeAll}>Nuestra Sazón</a>
        <a href="#recuerdos" onClick={closeAll}>Recuerdos</a>
        <a href="#contacto" onClick={closeAll}>Contacto</a>
      </nav>

      {/* BOTÓN RESERVAR DESPLEGABLE */}
      <div className="booking-dropdown" ref={dropdownRef}>
        <button
          className="btn-reserve-master"
          onClick={() => setDropdownOpen(o => !o)}
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
        >
          Reservar <span className={`dropdown-arrow${dropdownOpen ? ' open' : ''}`}>▾</span>
        </button>

        <div className={`dropdown-menu${dropdownOpen ? ' open' : ''}`}>
          <a href="#reserva-mesas" className="dropdown-item" onClick={closeAll}>
            <span className="dropdown-icon">🍽️</span>
            <div className="dropdown-text">
              <strong>Mesa en Restaurante</strong>
              <span>Elegir ubicación y horario</span>
            </div>
          </a>
          <a href="#experiencias" className="dropdown-item" onClick={closeAll}>
            <span className="dropdown-icon">🌿</span>
            <div className="dropdown-text">
              <strong>Plan o Experiencia</strong>
              <span>Pasadías, rutas y hospedaje</span>
            </div>
          </a>
        </div>
      </div>

    </header>
  );
}

export default Header;
