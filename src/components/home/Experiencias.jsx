import { useState } from 'react';
import './Experiencias.css';

const tabs = ['Pasadías', 'Rutas y Aventura', 'Escapadas'];

const planes = [
  {
    tab: 'Pasadías',
    img: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=85',
    alt: 'Pasadía Ecológico',
    tag: 'DÍA COMPLETO',
    titulo: 'Pasadía Ecológico',
    desc: 'Un día perfecto de desconexión en contacto con la flora y fauna local.',
    precio: '$95.000',
    unidad: 'por persona',
    items: ['Bebida natural de bienvenida', 'Almuerzo típico de la casa', 'Acceso a senderos y piscina', 'Recorrido ecológico guiado'],
  },
  {
    tab: 'Rutas y Aventura',
    img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=85',
    alt: 'Ruta Aventura',
    tag: 'AVENTURA Y CACAO',
    titulo: 'Ruta Sabores & Cacao',
    desc: 'Recorrido por nuestros cultivos y talleres interactivos para toda la familia.',
    precio: '$120.000',
    unidad: 'por persona',
    items: ['Taller interactivo de cacao/huerta', 'Almuerzo campesino', 'Guía ambiental especializado', 'Degustación de bebidas artesanales'],
  },
  {
    tab: 'Escapadas',
    img: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1000&q=85',
    alt: 'Escapada Pareja',
    tag: 'NOCHE EN LA VILLA',
    titulo: 'Escapada Silvestre',
    desc: 'Estadía relajante con vista a la vegetación y cena privada bajo las estrellas.',
    precio: '$380.000',
    unidad: 'por pareja / noche',
    items: ['Alojamiento en cabaña campestre', 'Cena romántica de 3 tiempos', 'Desayuno típico la mañana siguiente', 'Uso libre de instalaciones'],
  },
];

function Experiencias() {
  const [activeTab, setActiveTab] = useState('Pasadías');

  const visibles = activeTab === 'Pasadías'
    ? planes
    : planes.filter(p => p.tab === activeTab);

  return (
    <section className="section" id="experiencias">
      <div className="section-heading">
        <div>
          <p className="eyebrow">NUESTRAS EXPERIENCIAS</p>
          <h2>Elige cómo quieres vivir Villa Adelaida</h2>
        </div>
        <p>Planes diseñados para disfrutar un día de descanso, senderismo ecológico o escapadas de fin de semana.</p>
      </div>

      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab${activeTab === tab ? ' active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={`cards ${visibles.length === 1 ? 'one' : visibles.length === 2 ? 'two-exp' : 'three'}`}>
        {visibles.map(plan => (
          <article className="card" key={plan.titulo}>
            <img src={plan.img} alt={plan.alt} />
            <div className="card-body">
              <span className="tag">{plan.tag}</span>
              <h3>{plan.titulo}</h3>
              <p>{plan.desc}</p>
              <div className="price">{plan.precio} <small>{plan.unidad}</small></div>
              <ul>
                {plan.items.map(item => <li key={item}>{item}</li>)}
              </ul>
              <div className="card-actions">
                <a className="btn btn-outline" href="#contacto">Ver detalles</a>
                <a className="btn btn-primary" href="#contacto">Reservar</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Experiencias;
