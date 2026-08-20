import './Gastronomia.css';
import { categorias, formatoPrecio, useGastronomia } from './Gastronomia.utils';

function Gastronomia() {
  const {
    categoriaActiva,
    setCategoriaActiva,
    cartaCompleta,
    setCartaCompleta,
    visibles,
  } = useGastronomia();

  return (
    <section className="section cream" id="sazon">
      <div className="section-heading">
        <div>
          <p className="eyebrow">NUESTRA SAZÓN</p>
          <h2>Carta de la Villa</h2>
        </div>
        <p>Recetas criollas, asados al carbón y bebidas para disfrutar en medio de la naturaleza.</p>
      </div>

      <div className="menu-toolbar">
        <div className="menu-tabs" role="tablist" aria-label="Filtrar carta por categoría">
          {categorias.map(categoria => (
            <button
              className={`menu-tab${categoriaActiva === categoria ? ' active' : ''}`}
              key={categoria}
              onClick={() => setCategoriaActiva(categoria)}
              role="tab"
              aria-selected={categoriaActiva === categoria}
            >
              {categoria}
            </button>
          ))}
        </div>
        <div className="menu-actions">
          <a className="btn btn-outline" href="#reserva-mesas">Reservar mesa</a>
        </div>
      </div>

      <div className="menu-grid">
        {visibles.map(producto => (
          <article className="menu-card" key={producto.nombre}>
            <div className="menu-image-wrap">
              <img src={producto.imagen} alt={producto.nombre} />
              <span className="menu-category">{producto.categoria}</span>
            </div>
            <div className="menu-body">
              <div className="menu-title-row">
                <h3>{producto.nombre}</h3>
                <strong>{formatoPrecio(producto.precio)}</strong>
              </div>
              <p>{producto.descripcion}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="menu-complete">
        <button className="btn btn-primary" onClick={() => setCartaCompleta(completa => !completa)}>
          {cartaCompleta ? 'Ver menos' : 'Ver carta completa'}
        </button>
      </div>
    </section>
  );
}

export default Gastronomia;
