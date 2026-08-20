import { useState } from 'react';
import './App.css';

import Header       from './components/layout/Header';
import Footer       from './components/layout/Footer';
import Hero         from './components/inicio/Hero';
import MisionVision from './components/inicio/MisionVision';
import ReservaMesa  from './components/reservas/ReservaMesa';
import Experiencias from './components/inicio/Experiencias';
import Gastronomia  from './components/inicio/Gastronomia';
import Recuerdos    from './components/recuerdos/Recuerdos';
import Servicios    from './components/inicio/Servicios';
import Contacto     from './components/contacto/Contacto';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Header
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen(open => !open)}
      />
      <main>
        <Hero />
        <MisionVision />
        <ReservaMesa />
        <Experiencias />
        <Gastronomia />
        <Recuerdos />
        <Servicios />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}

export default App;
