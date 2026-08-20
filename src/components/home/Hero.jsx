import './Hero.css';

function Hero() {
  return (
    <>
      <section className="hero" id="inicio">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="eyebrow light">VILLA MARTHA</p>
          <h1>
            Tu refugio
            <br />
            <em>natural</em>
          </h1>
          <p>Piscinas, cabañas y experiencias para desconectar a solo 30 minutos de Cartagena.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#contacto">Reservar ahora</a>
            <a className="btn btn-ghost" href="#experiencias">Explorar experiencias</a>
          </div>
        </div>

        <div className="hero-stay">
          <span>☼</span>
          <strong>5 formas de vivir Villa Martha</strong>
          <small>Pausa Natural · Día Familiar · Celebración · Integración Empresarial · Escapada en Pareja</small>
        </div>
      </section>
      <section className="intro">
        <p className="eyebrow">UNA EXPERIENCIA DIFERENTE</p>
        <h2>Desconéctate del ruido</h2>
        <p>Un espacio para respirar, disfrutar de la naturaleza y compartir momentos que sí merecen quedarse en la memoria.</p>
      </section>
    </>
  );
}

export default Hero;
