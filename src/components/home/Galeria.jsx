import './Galeria.css';

const videos = [
  {
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=85',
    alt: 'Preparación al fogón',
    titulo: 'Platos Típicos al Fogón',
    desc: 'Mira cómo preparamos nuestros asados y recetas tradicionales con ingredientes de la región.',
  },
  {
    img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=85',
    alt: 'Bebidas artesanales',
    titulo: 'Cócteles & Frutas de la Villa',
    desc: 'Bebidas refrescantes preparadas al instante con frutas de nuestra huerta ecológica.',
  },
  {
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=85',
    alt: 'Ambiente del Restaurante',
    titulo: 'El Ambiente de Comedor',
    desc: 'Un espacio rodeado de naturaleza para compartir un buen plato en familia o con amigos.',
  },
];

function Galeria() {
  return (
    <section className="section cream" id="sazon">
      <div className="section-heading">
        <div>
          <p className="eyebrow">NUESTRA SAZÓN</p>
          <h2>Sabores de la Villa</h2>
        </div>
        <p>Gastronomía autóctona, ingredientes frescos de origen local y la mejor preparación al fogón. Mira nuestros videos cortos y antójate.</p>
      </div>

      <div className="video-grid">
        {videos.map(v => (
          <article className="video-card" key={v.titulo}>
            <div className="video-thumb">
              <img src={v.img} alt={v.alt} />
              <div className="play-btn">▶</div>
            </div>
            <div className="video-body">
              <h4>{v.titulo}</h4>
              <p>{v.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Galeria;
