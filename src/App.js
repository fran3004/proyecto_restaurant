import { useState } from 'react';
import './styles/global/App.css';
import useScrollReveal from './utils/useScrollReveal';

import Header       from './components/layout/Header';
import Footer       from './components/layout/Footer';
import Hero         from './components/inicio/Hero';
import MisionVision from './components/inicio/MisionVision';
import ReservaMesa  from './components/reservas/ReservaMesa';
import Experiencias from './components/inicio/Experiencias';
import Gastronomia  from './components/inicio/Gastronomia';
import Recuerdos    from './components/recuerdos/Recuerdos';
import Contacto     from './components/contacto/Contacto';
import WhatsAppButton from './components/layout/WhatsAppButton';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollRevealRef = useScrollReveal();

  return (
    <>
      <Header
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen(open => !open)}
      />
      <main ref={scrollRevealRef}>
        <Hero />
        <Experiencias />
        <Gastronomia />
        <Recuerdos />
        <ReservaMesa />
        <MisionVision />
        <Contacto />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default App;
