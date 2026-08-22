import '../../styles/inicio/MisionVision.css';

function MisionVision() {
  return (
    <section className="section-mv" id="nosotros" data-reveal="section">
      <div className="mv-container">

        <div className="mv-header" data-reveal="heading">
          <span className="section-eyebrow">NUESTRA ESENCIA</span>
          <h2 className="section-title">Misión &amp; Visión</h2>
        </div>

        <div className="mv-grid">

          {/* Misión */}
          <article className="mv-card" data-reveal="item">
            <div>
              <span className="mv-badge">01 / PROPÓSITO</span>
              <h3>Nuestra Misión</h3>
              <p>
                Brindar a nuestros visitantes un refugio natural y gastronómico acogedor,
                ofreciendo experiencias ecológicas sostenibles, servicio con calidez humana
                y platos preparados con ingredientes frescos de la región.
              </p>
            </div>
          </article>

          {/* Visión destacada */}
          <article className="mv-card highlight" data-reveal="item">
            <div>
              <span className="mv-badge">02 / FUTURO</span>
              <h3>Nuestra Visión</h3>
              <div className="mv-quote-box">
                <p className="mv-quote">
                  "Queremos llevar nuestras experiencias y sazón nacional e internacionalmente."
                </p>
              </div>
              <p className="subtext">
                Aspiramos a posicionar a Villa Adelaida como un referente global de turismo
                ecoturístico y gastronomía de origen, expandiendo nuestra marca manteniendo
                vivas las raíces culinarias y el respeto ambiental.
              </p>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}

export default MisionVision;
