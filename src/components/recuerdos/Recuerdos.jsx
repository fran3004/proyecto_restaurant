import './Recuerdos.css';

const recuerdos = [
  {
    img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=700&q=85',
    alt: 'Familia en Villa Adelaida',
    texto: '"El mejor domingo familiar"',
    autor: 'Familia Gómez · Pasadía',
  },
  {
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=85',
    alt: 'Sonrisas y naturaleza',
    texto: '"Conexión total con las aves"',
    autor: 'Camila & David · Senderismo',
  },
  {
    img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=700&q=85',
    alt: 'Paseo por senderos',
    texto: '"Volveremos sin duda"',
    autor: 'Grupo de amigos · Ruta Aventura',
  },
  {
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=85',
    alt: 'Atardecer campestre',
    texto: '"Atardeceres mágicos"',
    autor: 'Camilo P. · Escapada',
  },
];

function Recuerdos() {
  return (
    <section className="section" id="recuerdos">
      <div className="section-heading">
        <div>
          <p className="eyebrow">RECUERDOS VIVOS</p>
          <h2>Historias de quienes nos visitan</h2>
        </div>
        <p>La experiencia Villa Adelaida contada por nuestros propios visitantes. Momentos inolvidables capturados en cada visita.</p>
      </div>

      <div className="memories-grid">
        {recuerdos.map(r => (
          <article className="memory-item" key={r.autor}>
            <img src={r.img} alt={r.alt} />
            <div className="memory-overlay">
              <strong>{r.texto}</strong>
              <span>{r.autor}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Recuerdos;
