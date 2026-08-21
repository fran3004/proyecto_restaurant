import './MasInformacion.css';
import { items } from './MasInformacion.utils';

function MasInformacion() {
  return (
    <section className="mas-info-section" id="mas-informacion">
      <div className="mas-info-inner">

        <div className="mas-info-header">
          <span className="section-eyebrow">CONÓCENOS</span>
          <h2 className="section-title">Más información</h2>
          <p className="mas-info-subtitulo">
            Todo lo que necesitas saber para planear tu visita a Villa Adelaida,
            Centro Turístico y Ecológico en Manaure, Cesar.
          </p>
        </div>

        <div className="mas-info-grid">
          {items.map(item => (
            <div className="mas-info-card" key={item.titulo}>
              <span className="mas-info-icono" aria-hidden="true">{item.icono}</span>
              <div className="mas-info-texto">
                <strong>{item.titulo}</strong>
                <p>{item.detalle}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mas-info-cta">
          <a className="btn btn-primary" href="#reserva-mesas">Reservar mesa</a>
          <a className="btn btn-outline" href="#experiencias">Ver experiencias</a>
        </div>

      </div>
    </section>
  );
}

export default MasInformacion;
