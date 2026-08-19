function Experiencias() {
  return (
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
          <span>FAMILIAS Y NIÑOS</span><h3>Visita a la granja</h3><p>Conoce de cerca la vida en el campo: animales, cultivos y actividades guiadas.</p><strong>$10.000</strong><a href="#contacto">Ver más →</a>
        </article>
        <article className="experience">
          <img src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=700&q=85" alt="Noche al aire libre" />
          <span>NOCHES ESPECIALES</span><h3>Fogata campestre</h3><p>Noche bajo las estrellas con fogata, música suave y ambiente acogedor.</p><strong>Consultar tarifa</strong><a href="#contacto">Ver más →</a>
        </article>
        <article className="experience">
          <img src="https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?auto=format&fit=crop&w=700&q=85" alt="Piscina" />
          <span>PISCINA</span><h3>Cursos</h3><p>Clases en la piscina con instructores para niños y adultos.</p><strong>Consultar tarifa</strong><a href="#contacto">Ver más →</a>
        </article>
        <article className="experience">
          <img src="https://images.unsplash.com/photo-1551887373-6e8c7e4c4d9b?auto=format&fit=crop&w=700&q=85" alt="Cabalgata" />
          <span>AVENTURA SUAVE</span><h3>Cabalgata</h3><p>Recorrido a caballo por los caminos y zonas verdes del hotel.</p><strong>$15.000</strong><a href="#contacto">Ver más →</a>
        </article>
      </div>
    </section>
  );
}

export default Experiencias;
