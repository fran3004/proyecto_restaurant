import { useState } from 'react';
import './Hospedaje.css';
import { confirmarReservaMesa, getFechaHoy } from './Hospedaje.utils';

const mesas = [
  { id: 'mesa-1', nombre: 'Mesa 1 · Bohío Principal',    capacidad: '2 a 4 Personas',        desc: 'Ubicación fresca bajo sombra de palma con vista al jardín.' },
  { id: 'mesa-2', nombre: 'Mesa 2 · Jardín de las Aves', capacidad: '2 a 6 Personas',        desc: 'Al aire libre, rodeada de flora y avistamiento de aves.' },
  { id: 'mesa-3', nombre: 'Mesa 3 · Mirador Ecológico',  capacidad: '2 Personas (Romántica)', desc: 'Vista panorámica al bosque campestre. Ideal para parejas.' },
  { id: 'mesa-4', nombre: 'Mesa 4 · Salón Familiar',     capacidad: '6 a 10 Personas',       desc: 'Mesa amplia en madera para grupos o cumpleaños.' },
  { id: 'mesa-5', nombre: 'Mesa 5 · Bohío Cacao',        capacidad: '4 a 6 Personas',        desc: 'Cerca de la huerta ecológica y talleres interactivos.' },
  { id: 'mesa-6', nombre: 'Mesa 6 · Terraza del Lago',   capacidad: '4 Personas',            desc: 'Brisa constante con vista al estanque natural.' },
];

const horas    = ['12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];
const horasFin = ['02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'];

function Hospedaje() {
  const [mesa,       setMesa]       = useState(mesas[0].nombre);
  const [fecha,      setFecha]      = useState(getFechaHoy());
  const [horaInicio, setHoraInicio] = useState('12:00 PM');
  const [horaFin,    setHoraFin]    = useState('03:00 PM');
  const [personas,   setPersonas]   = useState(2);

  const handleConfirmar = () =>
    confirmarReservaMesa({ mesa, fecha, horaInicio, horaFin, personas });

  return (
    <section className="reserva-section section" id="reserva-mesas">
      <span className="section-eyebrow">RESTAURANTE NUESTRA SAZÓN</span>
      <h2 className="section-title">Reserva tu Mesa</h2>

      <div className="booking-box">

        {/* ── Controles ── */}
        <div className="booking-controls">
          <div className="form-group">
            <label htmlFor="resFecha">Fecha</label>
            <input
              type="date"
              id="resFecha"
              value={fecha}
              min={getFechaHoy()}
              onChange={e => setFecha(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="resHoraInicio">Hora de entrada</label>
            <select id="resHoraInicio" value={horaInicio} onChange={e => setHoraInicio(e.target.value)}>
              {horas.map(h => <option key={h}>{h}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="resHoraFin">Hora estimada de salida</label>
            <select id="resHoraFin" value={horaFin} onChange={e => setHoraFin(e.target.value)}>
              {horasFin.map(h => <option key={h}>{h}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="resPersonas">Personas</label>
            <input
              type="number"
              id="resPersonas"
              min={1}
              max={20}
              value={personas}
              onChange={e => setPersonas(e.target.value)}
            />
          </div>
        </div>

        {/* ── Selector de mesas ── */}
        <span className="section-eyebrow" style={{ marginBottom: '14px', display: 'block' }}>
          SELECCIONA TU UBICACIÓN PREFERIDA
        </span>

        <div className="mesas-grid">
          {mesas.map(m => (
            <div
              key={m.id}
              className={`mesa-card${mesa === m.nombre ? ' selected' : ''}`}
              onClick={() => setMesa(m.nombre)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && setMesa(m.nombre)}
            >
              <span className="mesa-badge">Disponible</span>
              <h4>{m.nombre}</h4>
              <p>👥 Capacidad: {m.capacidad}</p>
              <small>{m.desc}</small>
            </div>
          ))}
        </div>

        {/* ── Resumen + CTA ── */}
        <div className="booking-summary">
          <div>
            <p>Ubicación: <strong>{mesa}</strong></p>
            <p>Horario: <strong>De {horaInicio} a {horaFin}</strong>&nbsp;|&nbsp;Personas: <strong>{personas}</strong></p>
          </div>
          <button className="btn-whatsapp-confirm" onClick={handleConfirmar}>
            Confirmar por WhatsApp
          </button>
        </div>

      </div>
    </section>
  );
}

export default Hospedaje;
