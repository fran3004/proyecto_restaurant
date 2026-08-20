import { useState } from 'react';
import './App.css';

import Header       from './components/layout/Header';
import Footer       from './components/layout/Footer';
import Hero         from './components/home/Hero';
import Nosotros     from './components/home/Nosotros';
import Hospedaje    from './components/alojamiento/Hospedaje';
import Experiencias from './components/home/Experiencias';
import Galeria      from './components/home/Galeria';
import Pasadia      from './components/alojamiento/Pasadia';
import Servicios    from './components/home/Servicios';
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
        <Nosotros />
        <Hospedaje />
        <Experiencias />
        <Galeria />
        <Pasadia />
        <Servicios />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}

export default App;
