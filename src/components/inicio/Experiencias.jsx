import './Experiencias.css';
import { categorias, useExperiencias } from './Experiencias.utils';

function Experiencias() {
  const { categoriaActiva, setCategoriaActiva, visibles } = useExperiencias();

  return (
    <section className="section experiencias-section" id="experiencias">
      <div className="section-heading experiencias-heading">
        <div>
          <p className="eyebrow">NUESTRAS EXPERIENCIAS</p>
          <h2>Elige cómo quieres vivir Villa Adelaida</h2>
        </div>
        <p>Planes para compartir, descansar y conectar con la naturaleza, el río y la gastronomía típica regional.</p>
      </div>

      <div className="experiencias-toolbar">
        <div className="experiencias-categories" role="tablist" aria-label="Categorías de experiencias">
          {categorias.map(categoria => (
            <button
              className={`experiencia-category${categoriaActiva === categoria ? ' active' : ''}`}
              key={categoria}
              onClick={() => setCategoriaActiva(categoria)}
              role="tab"
              aria-selected={categoriaActiva === categoria}
            >
              {categoria}
            </button>
          ))}
        </div>
        <span className="experiencias-count">{visibles.length} {visibles.length === 1 ? 'experiencia' : 'experiencias'}</span>
      </div>

      <div className="experiencias-grid">
        {visibles.map(experiencia => (
          <article className="experiencia-card" key={experiencia.nombre}>
            <div className="experiencia-image-wrap">
              <img src={experiencia.imagen} alt={experiencia.alt} />
              <span className="experiencia-tag">{experiencia.etiqueta}</span>
            </div>
            <div className="experiencia-body">
              <div className="experiencia-title-row">
                <div>
                  <span className="experiencia-category-label">{experiencia.categoria}</span>
                  <h3>{experiencia.nombre}</h3>
                </div>
                <span className="experiencia-price">{experiencia.precio}</span>
              </div>
              <p className="experiencia-description">{experiencia.descripcion}</p>
              <p className="experiencia-duration">{experiencia.duracion}</p>
              <ul className="experiencia-features">
                {experiencia.caracteristicas.map(caracteristica => <li key={caracteristica}>{caracteristica}</li>)}
              </ul>
              <div className="experiencia-actions">
                <a className="btn btn-outline" href="#contacto">Más información</a>
                <a className="btn btn-primary" href="#reserva-experiencias">Reservar</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Experiencias;
