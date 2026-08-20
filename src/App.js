import { useState } from 'react';
import './App.css';
import Contacto from './components/contacto/Contacto';
import Experiencias from './components/home/Experiencias';
import Footer from './components/layout/Footer';
import Galeria from './components/home/Galeria';
import Header from './components/layout/Header';
import Hero from './components/home/Hero';
import Hospedaje from './components/alojamiento/Hospedaje';
import Pasadia from './components/alojamiento/Pasadia';
import Servicios from './components/home/Servicios';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Familia');

  return (
    <>
      <Header menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((isOpen) => !isOpen)} />
      <main>
        <Hero />
        <Pasadia activeTab={activeTab} onTabChange={setActiveTab} />
        <Hospedaje />
        <Experiencias />
        <Servicios />
        <Galeria />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}

export default App;
