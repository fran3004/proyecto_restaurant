import '../../styles/inicio/Servicios.css';
import { servicios } from '../../utils/inicio/Servicios.utils';

function Servicios() {
  return (
    <section className="services" id="servicios">
      <div className="section-heading light-heading">
        <div>
          <p className="eyebrow light">SERVICIOS DE LA VILLA</p>
          <h2>Todo para tu comodidad</h2>
        </div>
        <p>Servicios que complementan tu visita para que vivas una experiencia segura, tranquila y placentera.</p>
      </div>

      <div className="service-grid">
        {servicios.map(s => (
          <article key={s.titulo}>
            <div className="service-icon">{s.icono}</div>
            <h3>{s.titulo}</h3>
            <p>{s.desc}</p>
            <a href="#contacto">{s.cta}</a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Servicios;
