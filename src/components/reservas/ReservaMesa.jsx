import './ReservaMesa.css';
import {
  duraciones,
  getEstadoLabel,
  getHoraLabel,
  getHoraSalida,
  getFechaHoy,
  horas,
  mesas,
  tiposVisita,
  useReservaMesa,
} from './ReservaMesa.utils';

function ReservaMesa() {
  const {
    reserva,
    actualizarCampo,
    mesaSeleccionada,
    seleccionarMesa,
    estadosMesas,
    paso,
    errores,
    enviada,
    revisarReserva,
    continuarMesa,
    irAConfirmacion,
    enviarReserva,
    volverADatos,
    modificar,
  } = useReservaMesa();
  const mesa = mesas.find(item => item.id === mesaSeleccionada);
  const horaSalida = getHoraSalida(reserva.horaLlegada, reserva.duracion);

  return (
    <section className="reserva-section section" id="reserva-mesas">
      <span className="section-eyebrow">RESTAURANTE NUESTRA SAZÓN</span>
      <h2 className="section-title">Reserva tu Mesa</h2>
      <p className="reserva-intro">Organiza tu visita y déjanos todos los detalles para atenderte mejor.</p>

      <div className="reserva-steps" aria-label="Pasos de la reserva">
        <div className={`reserva-step${paso >= 1 ? ' active' : ''}`}><span>1</span><strong>Elige tu mesa</strong></div>
        <div className={`reserva-step${paso >= 2 ? ' active' : ''}`}><span>2</span><strong>Tus datos</strong></div>
        <div className={`reserva-step${paso >= 3 ? ' active' : ''}`}><span>3</span><strong>Revisa</strong></div>
        <div className={`reserva-step${paso >= 4 ? ' active' : ''}`}><span>4</span><strong>Confirmación</strong></div>
      </div>

      <div className="booking-box">
        {paso === 1 && (
          <div className="reservation-stage">
            <div className="booking-form-heading">
              <div><span className="section-eyebrow">PASO 1</span><h3>Elige tu mesa</h3></div>
              <p>La disponibilidad cambia según la fecha seleccionada.</p>
            </div>
            <div className="table-picker-heading">
              <div><span className="section-eyebrow">AMBIENTES DISPONIBLES</span><h3>¿Dónde te gustaría estar?</h3></div>
              <p>Selecciona una mesa para continuar.</p>
            </div>
            {errores.mesa && <p className="form-banner error">{errores.mesa}</p>}
            <div className="mesas-grid">
              {mesas.map(mesaItem => {
                const estado = estadosMesas[mesaItem.id];
                return (
                  <button
                    className={`mesa-card ${estado}`}
                    key={mesaItem.id}
                    type="button"
                    onClick={() => seleccionarMesa(mesaItem)}
                    disabled={estado === 'occupied' || estado === 'unavailable'}
                    aria-pressed={estado === 'selected'}
                  >
                    <span className={`mesa-badge ${estado}`}>{getEstadoLabel(estado)}</span>
                    <h3>{mesaItem.nombre}</h3>
                    <p className="mesa-capacity">Capacidad: hasta {mesaItem.capacidad} personas</p>
                    <p className="mesa-environment">{mesaItem.ambiente}</p>
                    <small>{mesaItem.desc}</small>
                  </button>
                );
              })}
            </div>
            <div className="booking-form-footer">
              <span>Primero selecciona el ambiente que prefieras.</span>
              <button className="btn-whatsapp-confirm" type="button" onClick={continuarMesa}>Continuar con mis datos</button>
            </div>
          </div>
        )}

        {paso === 2 && (
          <form className="reservation-stage" onSubmit={revisarReserva} noValidate>
            <div className="booking-form-heading">
              <div><span className="section-eyebrow">PASO 2</span><h3>Cuéntanos sobre tu visita</h3></div>
              <p>Mesa elegida: <strong>{mesa?.nombre}</strong></p>
            </div>
            <div className="booking-controls booking-controls-client">
              <div className={`form-group${errores.nombre ? ' has-error' : ''}`}>
                <label htmlFor="resNombre">Nombre completo *</label>
                <input id="resNombre" value={reserva.nombre} placeholder="Ej. Laura Mendoza" onChange={e => actualizarCampo('nombre', e.target.value)} />
                {errores.nombre && <small className="field-error">{errores.nombre}</small>}
              </div>
              <div className={`form-group${errores.telefono ? ' has-error' : ''}`}>
                <label htmlFor="resTelefono">Número de teléfono *</label>
                <input id="resTelefono" type="tel" value={reserva.telefono} placeholder="Ej. 314 523 8716" onChange={e => actualizarCampo('telefono', e.target.value)} />
                {errores.telefono && <small className="field-error">{errores.telefono}</small>}
              </div>
              <div className={`form-group${errores.fecha ? ' has-error' : ''}`}>
                <label htmlFor="resFecha">Fecha de reserva *</label>
                <input id="resFecha" type="date" value={reserva.fecha} min={getFechaHoy()} onChange={e => actualizarCampo('fecha', e.target.value)} />
                {errores.fecha && <small className="field-error">{errores.fecha}</small>}
              </div>
              <div className={`form-group${errores.horaLlegada ? ' has-error' : ''}`}>
                <label htmlFor="resHoraLlegada">Hora de llegada *</label>
                <select id="resHoraLlegada" value={reserva.horaLlegada} onChange={e => actualizarCampo('horaLlegada', e.target.value)}>
                  {horas.map(hora => <option key={hora.value} value={hora.value}>{hora.label}</option>)}
                </select>
                {errores.horaLlegada && <small className="field-error">{errores.horaLlegada}</small>}
              </div>
              <div className={`form-group${errores.duracion ? ' has-error' : ''}`}>
                <label htmlFor="resDuracion">Duración aproximada *</label>
                <select id="resDuracion" value={reserva.duracion} onChange={e => actualizarCampo('duracion', e.target.value)}>
                  {duraciones.map(duracion => <option key={duracion.value} value={duracion.value}>{duracion.label}</option>)}
                </select>
                <small className="field-hint">Salida estimada: {getHoraLabel(horaSalida)}</small>
                {errores.duracion && <small className="field-error">{errores.duracion}</small>}
              </div>
              <div className={`form-group${errores.personas ? ' has-error' : ''}`}>
                <label htmlFor="resPersonas">Número de personas *</label>
                <input id="resPersonas" type="number" min="1" max="20" value={reserva.personas} onChange={e => actualizarCampo('personas', e.target.value)} />
                {errores.personas && <small className="field-error">{errores.personas}</small>}
              </div>
              <div className={`form-group${errores.tipoVisita ? ' has-error' : ''}`}>
                <label htmlFor="resTipoVisita">Tipo de visita *</label>
                <select id="resTipoVisita" value={reserva.tipoVisita} onChange={e => actualizarCampo('tipoVisita', e.target.value)}>
                  {tiposVisita.map(tipo => <option key={tipo}>{tipo}</option>)}
                </select>
                {errores.tipoVisita && <small className="field-error">{errores.tipoVisita}</small>}
              </div>
              <div className="form-group form-group-wide">
                <label htmlFor="resObservaciones">Observaciones</label>
                <textarea id="resObservaciones" rows="2" value={reserva.observaciones} placeholder="Cuéntanos algún detalle especial de tu visita" onChange={e => actualizarCampo('observaciones', e.target.value)} />
              </div>
            </div>
            <div className="booking-form-footer">
              <button className="btn btn-outline" type="button" onClick={modificar}>Cambiar mesa</button>
              <button className="btn-whatsapp-confirm" type="submit">Revisar reserva</button>
            </div>
          </form>
        )}

        {paso === 3 && mesa && (
          <div className="reservation-stage reservation-review">
            <div className="booking-form-heading">
              <div><span className="section-eyebrow">PASO 3</span><h3>Revisa tu reserva</h3></div>
              <p>Verifica los datos antes de confirmar el envío.</p>
            </div>
            <div className="summary-card">
              <div className="summary-card-title"><span>RESUMEN DE RESERVA</span><span className="summary-status">Lista para enviar</span></div>
              <div className="summary-grid">
                <p><span>Cliente</span><strong>{reserva.nombre}</strong></p>
                <p><span>Teléfono</span><strong>{reserva.telefono}</strong></p>
                <p><span>Fecha</span><strong>{reserva.fecha}</strong></p>
                <p><span>Hora</span><strong>{getHoraLabel(reserva.horaLlegada)} a {getHoraLabel(horaSalida)}</strong></p>
                <p><span>Personas</span><strong>{reserva.personas}</strong></p>
                <p><span>Mesa</span><strong>{mesa.nombre}</strong></p>
                <p><span>Tipo de visita</span><strong>{reserva.tipoVisita}</strong></p>
                <p className="summary-observations"><span>Observaciones</span><strong>{reserva.observaciones || 'Ninguna'}</strong></p>
              </div>
            </div>
            <div className="review-actions">
              <button className="btn btn-outline" type="button" onClick={volverADatos}>Modificar datos</button>
              <button className="btn-whatsapp-confirm" type="button" onClick={irAConfirmacion}>Continuar a confirmación</button>
            </div>
          </div>
        )}

        {paso === 4 && (
          <div className="reservation-stage reservation-success">
            <div className="success-icon" aria-hidden="true">✓</div>
            <span className="section-eyebrow">PASO 4 · CONFIRMACIÓN</span>
            <h3>{enviada ? 'Solicitud enviada correctamente' : '¿Listo para enviar tu solicitud?'}</h3>
            <p>{enviada ? 'WhatsApp se abrió con toda la información organizada. El restaurante confirmará la disponibilidad contigo.' : 'La información está preparada para abrir WhatsApp y enviarla al restaurante.'}</p>
            <div className="review-actions">
              {!enviada && <button className="btn btn-outline" type="button" onClick={volverADatos}>Modificar reserva</button>}
              {enviada && <button className="btn btn-outline" type="button" onClick={modificar}>Modificar reserva</button>}
              {!enviada && <button className="btn-whatsapp-confirm" type="button" onClick={enviarReserva}>Enviar por WhatsApp</button>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ReservaMesa;
