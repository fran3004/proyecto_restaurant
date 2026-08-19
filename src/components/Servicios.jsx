function Servicios() {
  return (
    <section className="services" id="servicios">
      <div className="section-heading light-heading">
        <div><p className="eyebrow light">SERVICIOS DEL HOTEL</p><h2>Todo lo que necesitas</h2></div>
        <p>Servicios complementarios para que tu estadía sea completa, sin preocupaciones.</p>
      </div>

      <div className="service-grid">
        <article><div className="service-icon">✦</div><h3>Spa</h3><p>Masajes, rituales y tratamientos relajantes en medio de la naturaleza.</p><a href="#contacto">Conocer el spa →</a></article>
        <article><div className="service-icon">♨</div><h3>Restaurante</h3><p>Asados, comida típica y menú infantil servido en bohíos amplios.</p><a href="#contacto">Ver menú →</a></article>
        <article><div className="service-icon">⌁</div><h3>Transporte</h3><p>Servicio de transporte cotizable desde Cartagena y zona norte.</p><a href="#contacto">Cotizar transporte →</a></article>
      </div>
    </section>
  );
}

export default Servicios;
