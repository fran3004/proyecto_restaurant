import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Familia');

  return (
    <>
      <header className="site-header" id="top">
        <a className="brand" href="#inicio">
          <span className="brand-mark">V</span>
          <span>
            <strong>VILLA MARTHA</strong>
            <small>Hotel Campestre</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          aria-label="Abrir menú"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
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
      <main>
        <section className="hero" id="inicio">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <p className="eyebrow light">VILLA MARTHA</p>
            <h1>
              Tu refugio
              <br />
              <em>natural</em>
            </h1>
            <p>
              Piscinas, cabañas y experiencias para desconectar a solo 30 minutos de Cartagena.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#contacto">
                Reservar ahora
              </a>
              <a className="btn btn-ghost" href="#experiencias">
                Explorar experiencias
              </a>
            </div>
          </div>

          <div className="hero-stay">
            <span>☼</span>
            <strong>5 formas de vivir Villa Martha</strong>
            <small>
              Pausa Natural · Día Familiar · Celebración · Integración Empresarial · Escapada en Pareja
            </small>
          </div>
        </section>
        <section className="intro">
          <p className="eyebrow">UNA EXPERIENCIA DIFERENTE</p>
          <h2>Desconéctate del ruido</h2>
          <p>
            Un espacio para respirar, disfrutar de la naturaleza y compartir momentos que sí merecen quedarse en la memoria.
          </p>
        </section>
        <section className="section" id="pasadia">
          <div className="section-heading">
            <div>
              <p className="eyebrow">PASADÍA</p>
              <h2>Un día, un solo precio</h2>
            </div>
            <p>
              De lunes a viernes, pasadía de la finca con tarifa fija. Sábados, domingos y lunes festivos: servicio al consumo.
            </p>
          </div>

          <div className="tabs">
            {['Familia', 'Pareja', 'Celebraciones', 'Empresa'].map((tab) => (
              <button
                className={`tab${activeTab === tab ? ' active' : ''}`}
                key={tab}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="cards two">
            <article className="card offer-card">
              <img
                src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=85"
                alt="Piscina de hotel"
              />
              <div className="card-body">
                <span className="tag">ADULTO</span>
                <h3>Pasadía de la Finca</h3>
                <p>Lunes a viernes: $100.000 por persona. Un precio, lo esencial incluido, sin sorpresas.</p>
                <div className="price">
                  $100.000 <small>por persona</small>
                </div>
                <ul>
                  <li>2 cervezas intercambiables</li>
                  <li>Almuerzo con bebida</li>
                  <li>Ingreso a piscina</li>
                  <li>Uso de áreas comunes</li>
                </ul>
                <div className="card-actions">
                  <a className="btn btn-outline" href="#contacto">
                    Ver plan completo
                  </a>
                  <a className="btn btn-primary" href="#contacto">
                    Reservar
                  </a>
                </div>
              </div>
            </article>

            <article className="card offer-card">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85"
                alt="Experiencia de descanso"
              />
              <div className="card-body">
                <span className="tag">INFANTIL</span>
                <h3>Pasadía de la Finca</h3>
                <p>Para niños de 2 a 12 años. Los adultos del grupo toman el pasadía adulto por separado.</p>
                <div className="price">
                  $84.000 <small>por niño</small>
                </div>
                <ul>
                  <li>Cóctel de bienvenida</li>
                  <li>Menú infantil con bebida</li>
                  <li>Ingreso a piscina</li>
                  <li>Montada a caballo</li>
                  <li>Helado</li>
                </ul>
                <div className="card-actions">
                  <a className="btn btn-outline" href="#contacto">
                    Ver plan completo
                  </a>
                  <a className="btn btn-primary" href="#contacto">
                    Reservar
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>
        <section className="section cream" id="hospedaje">
          <div className="section-heading">
            <div>
              <p className="eyebrow">HOSPEDAJE</p>
              <h2>Cabañas, glamping y suites</h2>
            </div>
            <p>
              Empieza por nuestras cabañas eco y glamping en el bosque. También tenemos suites para quien prefiera habitación tradicional.
            </p>
          </div>

          <div className="cards lodging">
            <article className="card lodging-card">
              <img src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=900&q=85" alt="Cabaña de madera" />
              <div className="card-body">
                <span className="tag">PAREJA · NATURALEZA</span>
                <h3>Cabaña Eco</h3>
                <p>Cabaña de madera y guadua para dos personas. Techo de palma, hamaca interior y acceso a jacuzzi.</p>
                <div className="price">Desde $660.000 <small>COP</small></div>
                <small>2 planes disponibles</small>
                <div className="card-actions"><a className="btn btn-outline" href="#contacto">Ver más</a><a className="btn btn-primary" href="#contacto">Reservar</a></div>
              </div>
            </article>

            <article className="card lodging-card">
              <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=85" alt="Cabaña en naturaleza" />
              <div className="card-body">
                <span className="tag">FAMILIAR</span>
                <h3>Cabaña Alpina</h3>
                <p>Cabaña amplia en guadua para grupos y familias. Dos niveles con hamacas, zona BBQ y jacuzzi.</p>
                <div className="price">Desde $1.400.000 <small>COP</small></div>
                <small>1 plan disponible</small>
                <div className="card-actions"><a className="btn btn-outline" href="#contacto">Ver más</a><a className="btn btn-primary" href="#contacto">Reservar</a></div>
              </div>
            </article>

            <article className="card lodging-card">
              <img src="https://images.unsplash.com/photo-1470214304380-aadaedcfff1b?auto=format&fit=crop&w=900&q=85" alt="Glamping rodeado de naturaleza" />
              <div className="card-body">
                <span className="tag">PAREJA · DOMO</span>
                <h3>Glamping</h3>
                <p>Domo geodésico en el bosque con jacuzzi privado. Comodidad campestre y experiencias al aire libre.</p>
                <div className="price">Desde $760.000 <small>COP</small></div>
                <small>1 plan disponible</small>
                <div className="card-actions"><a className="btn btn-outline" href="#contacto">Ver más</a><a className="btn btn-primary" href="#contacto">Reservar</a></div>
              </div>
            </article>

            <article className="card lodging-card">
              <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=85" alt="Suite de hotel" />
              <div className="card-body">
                <span className="tag">HOTEL</span>
                <h3>Mini Suite</h3>
                <p>Tres tipos de mini suite para elegir según tu plan y preferencia. Ideal para parejas o estadías corporativas.</p>
                <div className="price">Desde $336.000 <small>COP</small></div>
                <small>2 planes disponibles</small>
                <div className="card-actions"><a className="btn btn-outline" href="#contacto">Ver más</a><a className="btn btn-primary" href="#contacto">Reservar</a></div>
              </div>
            </article>

            <article className="card lodging-card">
              <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85" alt="Suite principal" />
              <div className="card-body">
                <span className="tag">PREMIUM</span>
                <h3>Suite Principal</h3>
                <p>Suite amplia con sala de estar, hamaca interior y vista al jardín tropical.</p>
                <div className="price">Desde $480.000 <small>COP</small></div>
                <small>1 plan disponible</small>
                <div className="card-actions"><a className="btn btn-outline" href="#contacto">Ver más</a><a className="btn btn-primary" href="#contacto">Reservar</a></div>
              </div>
            </article>
          </div>
        </section>
        <section className="section" id="experiencias">
          <div className="section-heading">
            <div>
              <p className="eyebrow">ACTIVIDADES Y TALLERES</p>
              <h2>Experiencias en el campo</h2>
            </div>
            <p>Naturaleza, caballos, piscina y noches especiales para complementar tu pasadía o estadía.</p>
          </div>

          <div className="experience-grid">
            <article className="experience">
              <img src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=700&q=85" alt="Experiencia con animales" />
              <span>FAMILIAS Y NIÑOS</span>
              <h3>Visita a la granja</h3>
              <p>Conoce de cerca la vida en el campo: animales, cultivos y actividades guiadas.</p>
              <strong>$10.000</strong>
              <a href="#contacto">Ver más →</a>
            </article>
            <article className="experience">
              <img src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=700&q=85" alt="Noche al aire libre" />
              <span>NOCHES ESPECIALES</span>
              <h3>Fogata campestre</h3>
              <p>Noche bajo las estrellas con fogata, música suave y ambiente acogedor.</p>
              <strong>Consultar tarifa</strong>
              <a href="#contacto">Ver más →</a>
            </article>
            <article className="experience">
              <img src="https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?auto=format&fit=crop&w=700&q=85" alt="Piscina" />
              <span>PISCINA</span>
              <h3>Cursos</h3>
              <p>Clases en la piscina con instructores para niños y adultos.</p>
              <strong>Consultar tarifa</strong>
              <a href="#contacto">Ver más →</a>
            </article>
            <article className="experience">
              <img src="https://images.unsplash.com/photo-1551887373-6e8c7e4c4d9b?auto=format&fit=crop&w=700&q=85" alt="Cabalgata" />
              <span>AVENTURA SUAVE</span>
              <h3>Cabalgata</h3>
              <p>Recorrido a caballo por los caminos y zonas verdes del hotel.</p>
              <strong>$15.000</strong>
              <a href="#contacto">Ver más →</a>
            </article>
          </div>
        </section>
        <section className="services" id="servicios">
          <div className="section-heading light-heading">
            <div>
              <p className="eyebrow light">SERVICIOS DEL HOTEL</p>
              <h2>Todo lo que necesitas</h2>
            </div>
            <p>Servicios complementarios para que tu estadía sea completa, sin preocupaciones.</p>
          </div>

          <div className="service-grid">
            <article>
              <div className="service-icon">✦</div>
              <h3>Spa</h3>
              <p>Masajes, rituales y tratamientos relajantes en medio de la naturaleza.</p>
              <a href="#contacto">Conocer el spa →</a>
            </article>
            <article>
              <div className="service-icon">♨</div>
              <h3>Restaurante</h3>
              <p>Asados, comida típica y menú infantil servido en bohíos amplios.</p>
              <a href="#contacto">Ver menú →</a>
            </article>
            <article>
              <div className="service-icon">⌁</div>
              <h3>Transporte</h3>
              <p>Servicio de transporte cotizable desde Cartagena y zona norte.</p>
              <a href="#contacto">Cotizar transporte →</a>
            </article>
          </div>
        </section>
        <section className="section gallery-section" id="galeria">
          <div className="section-heading">
            <div>
              <p className="eyebrow">GALERÍA</p>
              <h2>Un pedacito del paraíso</h2>
            </div>
            <p>Fotos de nuestros espacios: piscinas, restaurante, bohíos, cabañas y la fauna que nos rodea.</p>
          </div>

          <div className="gallery">
            <img className="g1" src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85" alt="Piscina del hotel" />
            <img src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=85" alt="Piscina" />
            <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=85" alt="Habitación" />
            <img src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=900&q=85" alt="Descanso en naturaleza" />
            <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=85" alt="Naturaleza" />
            <img src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85" alt="Bosque" />
            <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=85" alt="Suite" />
            <img src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=900&q=85" alt="Cabaña" />
          </div>
        </section>

        <section className="contact" id="contacto">
          <div className="contact-inner">
            <div className="contact-copy">
              <p className="eyebrow">RESERVAS Y CONTACTO</p>
              <h2>Escríbenos, te respondemos rápido</h2>
              <p>Reserva directa por WhatsApp o teléfono. Nuestro equipo te ayuda a armar el plan según tu grupo, fecha y presupuesto.</p>

              <div className="contact-list">
                <div><span>☎</span><div><small>TELÉFONO</small><strong>+57 314 574 1186</strong></div></div>
                <div><span>✉</span><div><small>CORREO</small><strong>reservas@villamartha.com.co</strong></div></div>
                <div><span>⌖</span><div><small>DIRECCIÓN</small><strong>Turbaco · Carretera Troncal vía Arjona, Sector La Rosita</strong></div></div>
              </div>

              <a className="btn btn-primary" href="https://wa.me/573145741186" target="_blank" rel="noopener noreferrer">Reservar por WhatsApp</a>
            </div>

            <div className="map-card">
              <div className="fake-map">
                <div className="map-road r1"></div><div className="map-road r2"></div><div className="map-road r3"></div>
                <div className="map-water"></div><div className="map-pin">●</div>
                <span className="map-label">Villa Martha</span>
              </div>
            </div>
          </div>
        </section>
      </main>
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
    </>
  );
}

export default App;
