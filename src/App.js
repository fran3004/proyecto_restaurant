import { useState } from 'react';
import './App.css';
import Contacto from './components/Contacto';
import Experiencias from './components/Experiencias';
import Footer from './components/Footer';
import Galeria from './components/Galeria';
import Header from './components/Header';
import Hero from './components/Hero';
import Hospedaje from './components/Hospedaje';
import Pasadia from './components/Pasadia';
import Servicios from './components/Servicios';

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
