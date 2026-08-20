import './Servicios.css';

const servicios = [
  {
    icono: '🍃',
    titulo: 'Senderismo & Aves',
    desc: 'Rutas guiadas para aprender de la flora nativa y avistar especies endémicas.',
    cta: 'Solicitar guía →',
  },
  {
    icono: '🍲',
    titulo: 'Eventos & Celebraciones',
    desc: 'Espacios amplios y servicio de banquetes para cumpleaños, bodas o eventos corporativos.',
    cta: 'Cotizar evento →',
  },
  {
    icono: '🚌',
    titulo: 'Transporte Coordinado',
    desc: 'Facilitamos el traslado para grupos desde los puntos principales de la ciudad.',
    cta: 'Consultar rutas →',
  },
];

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
