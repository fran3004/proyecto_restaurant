const tabs = ['Familia', 'Pareja', 'Celebraciones', 'Empresa'];

function Pasadia({ activeTab, onTabChange }) {
  return (
    <section className="section" id="pasadia">
      <div className="section-heading">
        <div>
          <p className="eyebrow">PASADÍA</p>
          <h2>Un día, un solo precio</h2>
        </div>
        <p>De lunes a viernes, pasadía de la finca con tarifa fija. Sábados, domingos y lunes festivos: servicio al consumo.</p>
      </div>

      <div className="tabs">
        {tabs.map((tab) => (
          <button className={`tab${activeTab === tab ? ' active' : ''}`} key={tab} onClick={() => onTabChange(tab)}>
            {tab}
          </button>
        ))}
      </div>

      <div className="cards two">
        <article className="card offer-card">
          <img src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=85" alt="Piscina de hotel" />
          <div className="card-body">
            <span className="tag">ADULTO</span>
            <h3>Pasadía de la Finca</h3>
            <p>Lunes a viernes: $100.000 por persona. Un precio, lo esencial incluido, sin sorpresas.</p>
            <div className="price">$100.000 <small>por persona</small></div>
            <ul>
              <li>2 cervezas intercambiables</li>
              <li>Almuerzo con bebida</li>
              <li>Ingreso a piscina</li>
              <li>Uso de áreas comunes</li>
            </ul>
            <div className="card-actions">
              <a className="btn btn-outline" href="#contacto">Ver plan completo</a>
              <a className="btn btn-primary" href="#contacto">Reservar</a>
            </div>
          </div>
        </article>

        <article className="card offer-card">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85" alt="Experiencia de descanso" />
          <div className="card-body">
            <span className="tag">INFANTIL</span>
            <h3>Pasadía de la Finca</h3>
            <p>Para niños de 2 a 12 años. Los adultos del grupo toman el pasadía adulto por separado.</p>
            <div className="price">$84.000 <small>por niño</small></div>
            <ul>
              <li>Cóctel de bienvenida</li>
              <li>Menú infantil con bebida</li>
              <li>Ingreso a piscina</li>
              <li>Montada a caballo</li>
              <li>Helado</li>
            </ul>
            <div className="card-actions">
              <a className="btn btn-outline" href="#contacto">Ver plan completo</a>
              <a className="btn btn-primary" href="#contacto">Reservar</a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Pasadia;
