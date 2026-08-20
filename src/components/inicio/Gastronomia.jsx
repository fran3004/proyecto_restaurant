import './Gastronomia.css';

const videos = [
  {
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=85',
    alt: 'Preparación de comida típica regional',
    titulo: 'Comida Típica Regional',
    desc: 'Sabores tradicionales de la región para disfrutar después de una jornada de naturaleza y río.',
  },
  {
    img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=85',
    alt: 'Bebida de bienvenida en Villa Adelaida',
    titulo: 'Bebida de Bienvenida',
    desc: 'Recibe tu visita con una bebida de bienvenida y disfruta el ambiente del centro turístico.',
  },
  {
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=85',
    alt: 'Ambiente del restaurante Villa Adelaida',
    titulo: 'Asados al Carbón',
    desc: 'Parrilladas y asados al carbón para compartir en familia, en pareja o con amigos.',
  },
];

function Gastronomia() {
  return (
    <section className="section cream" id="sazon">
      <div className="section-heading">
        <div>
          <p className="eyebrow">NUESTRA SAZÓN</p>
          <h2>Sabores de la Villa</h2>
        </div>
        <p>Comida típica regional y asados al carbón en un entorno rodeado de naturaleza. Conoce el sabor de Villa Adelaida.</p>
      </div>

      <div className="video-grid">
        {videos.map(v => (
          <article className="video-card" key={v.titulo}>
            <div className="video-thumb">
              <img src={v.img} alt={v.alt} />
              <div className="play-btn">▶</div>
            </div>
            <div className="video-body">
              <h3>{v.titulo}</h3>
              <p>{v.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Gastronomia;
