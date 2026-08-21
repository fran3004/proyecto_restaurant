import { useMemo, useState, useEffect } from 'react';
import { experiencias } from '../inicio/Experiencias.utils';

const WHATSAPP_NUMBER = '573012706114';

export const mesas = [
  { id: 'mesa-1', nombre: 'Bohío Principal', capacidad: 4, desc: 'Ubicación fresca bajo sombra de palma con vista al jardín.', ambiente: 'Natural y tranquilo' },
  { id: 'mesa-2', nombre: 'Jardín de las Aves', capacidad: 6, desc: 'Al aire libre, rodeada de flora y avistamiento de aves.', ambiente: 'Aire libre' },
  { id: 'mesa-3', nombre: 'Mirador Ecológico', capacidad: 2, desc: 'Vista panorámica al bosque campestre.', ambiente: 'Romántico' },
  { id: 'mesa-4', nombre: 'Salón Familiar', capacidad: 10, desc: 'Mesa amplia en madera para grupos o cumpleaños.', ambiente: 'Familiar' },
  { id: 'mesa-5', nombre: 'Bohío Cacao', capacidad: 6, desc: 'Cerca de la huerta ecológica y talleres interactivos.', ambiente: 'Campestre' },
  { id: 'mesa-6', nombre: 'Terraza del Lago', capacidad: 4, desc: 'Brisa constante con vista al estanque natural.', ambiente: 'Vista al lago' },
];

export const horas = [
  { value: '12:00', label: '12:00 p. m.' },
  { value: '13:00', label: '1:00 p. m.' },
  { value: '14:00', label: '2:00 p. m.' },
  { value: '15:00', label: '3:00 p. m.' },
  { value: '16:00', label: '4:00 p. m.' },
  { value: '17:00', label: '5:00 p. m.' },
];

export const duraciones = [
  { value: 1, label: '1 hora' },
  { value: 2, label: '2 horas' },
  { value: 3, label: '3 horas' },
  { value: 4, label: '4 horas' },
];

export const tiposVisita = [
  'Almuerzo',
  'Cena',
  'Cumpleaños',
  'Reunión familiar',
  'Pareja',
  'Grupo de amigos',
  'Evento',
];

export function getFechaHoy() {
  return new Date().toISOString().split('T')[0];
}

export function getHoraSalida(horaLlegada, duracion) {
  const [horasInicio, minutosInicio] = horaLlegada.split(':').map(Number);
  const totalMinutos = horasInicio * 60 + minutosInicio + Number(duracion) * 60;
  const horasSalida = Math.floor(totalMinutos / 60) % 24;
  const minutosSalida = totalMinutos % 60;
  return `${String(horasSalida).padStart(2, '0')}:${String(minutosSalida).padStart(2, '0')}`;
}

export function getHoraLabel(valor) {
  const hora = horas.find(opcion => opcion.value === valor);
  if (hora) return hora.label;
  const [horaMilitar, minutos] = valor.split(':').map(Number);
  const sufijo = horaMilitar >= 12 ? 'p. m.' : 'a. m.';
  const hora12 = horaMilitar % 12 || 12;
  return `${hora12}:${String(minutos).padStart(2, '0')} ${sufijo}`;
}

export function getOccupiedSlots(mesa, fecha) {
  if (!fecha || (new Date(`${fecha}T00:00:00`).getDay() === 0 && mesa.id === 'mesa-6')) return [];
  const dia = Number(fecha.slice(-2));
  const numeroMesa = Number(mesa.id.split('-')[1]);
  const primeraMesaOcupada = dia % mesas.length + 1;
  const cantidadMesasOcupadas = dia % 3 === 0 ? 1 : 2;
  const segundaMesaOcupada = primeraMesaOcupada % mesas.length + 1;
  const mesaEstaOcupada = [primeraMesaOcupada, segundaMesaOcupada]
    .slice(0, cantidadMesasOcupadas)
    .includes(numeroMesa);

  if (!mesaEstaOcupada) return [];

  const franjaOcupada = (dia + numeroMesa) % horas.length;
  return [horas[franjaOcupada].value];
}

export function hayConflictoHorario(mesa, fecha, horaLlegada, duracion) {
  const salida = getHoraSalida(horaLlegada, duracion);
  return getOccupiedSlots(mesa, fecha).some(horaOcupada => {
    const salidaOcupada = getHoraSalida(horaOcupada, 2);
    return horaLlegada < salidaOcupada && salida > horaOcupada;
  });
}

export function getEstadoHorario(mesa, fecha, hora, duracion = 1) {
  return hayConflictoHorario(mesa, fecha, hora, duracion) ? 'occupied' : 'available';
}

export function getEstadoMesa(mesa, fecha, mesaSeleccionada) {
  if (fecha && new Date(`${fecha}T00:00:00`).getDay() === 0 && mesa.id === 'mesa-6') return 'unavailable';
  const estado = getOccupiedSlots(mesa, fecha).length >= horas.length ? 'occupied' : 'available';
  return mesa.id === mesaSeleccionada && estado === 'available' ? 'selected' : estado;
}

export function getFechaConDesplazamiento(fecha, desplazamiento) {
  const fechaBase = new Date(`${fecha}T12:00:00`);
  fechaBase.setDate(fechaBase.getDate() + desplazamiento);
  return fechaBase.toISOString().split('T')[0];
}

export function formatearFechaCorta(fecha) {
  return new Intl.DateTimeFormat('es-CO', { weekday: 'short', day: 'numeric', month: 'short' })
    .format(new Date(`${fecha}T12:00:00`))
    .replace('.', '');
}

export function getEstadoLabel(estado) {
  return {
    available: 'Disponible',
    selected: 'Seleccionada',
    occupied: 'Ocupada',
    unavailable: 'No disponible',
  }[estado];
}

export function validarReserva(reserva, mesaSeleccionada, tipoReserva, experienciaSeleccionada) {
  const errores = {};
  const hoy = getFechaHoy();
  const mesa = mesas.find(item => item.id === mesaSeleccionada);
  const personas = Number(reserva.personas);

  if (!reserva.nombre.trim()) errores.nombre = 'Ingresa el nombre completo.';
  if (!reserva.telefono.trim()) errores.telefono = 'Ingresa un número de teléfono.';
  if (!reserva.fecha) errores.fecha = 'Selecciona una fecha.';
  else if (reserva.fecha < hoy) errores.fecha = 'La fecha no puede ser anterior a hoy.';
  if (!reserva.horaLlegada) errores.horaLlegada = 'Selecciona la hora de llegada.';
  if (!reserva.duracion) errores.duracion = 'Selecciona la duración.';
  if (!personas || personas < 1) errores.personas = 'Debe haber al menos una persona.';
  if (tipoReserva === 'mesa' && mesa && personas > mesa.capacidad) errores.personas = `Esta mesa tiene capacidad para ${mesa.capacidad} personas.`;
  if (tipoReserva === 'mesa' && !mesa) errores.mesa = 'Selecciona una mesa disponible.';
  if (tipoReserva === 'mesa' && mesa && hayConflictoHorario(mesa, reserva.fecha, reserva.horaLlegada, reserva.duracion)) {
    errores.horaLlegada = 'Esta mesa ya está ocupada en esa franja. Elige otra hora.';
  }
  if (tipoReserva === 'experiencia' && !experienciaSeleccionada) errores.experiencia = 'Selecciona una experiencia.';
  if (!reserva.tipoVisita) errores.tipoVisita = 'Selecciona el tipo de visita.';

  const horaSalida = getHoraSalida(reserva.horaLlegada, reserva.duracion);
  if (reserva.horaLlegada && horaSalida <= reserva.horaLlegada) errores.duracion = 'La hora de salida debe ser posterior a la llegada.';

  return errores;
}

export function confirmarReservaMesa(reserva, mesa, tipoReserva, experienciaSeleccionada) {
  const horaSalida = getHoraSalida(reserva.horaLlegada, reserva.duracion);
  const observaciones = reserva.observaciones.trim() || 'Ninguna';
  const tipoDetalle = tipoReserva === 'mesa' ? mesa.nombre : experienciaSeleccionada;
  const tipoLabel = tipoReserva === 'mesa' ? 'Mesa' : 'Experiencia';

  const mensaje = [
    '🌿 *VILLA ADELAIDA*',
    '*SOLICITUD DE RESERVA*',
    '━━━━━━━━━━━━━━━━━━━━',
    '',
    '👤 *DATOS DEL CLIENTE*',
    `• Nombre: ${reserva.nombre}`,
    `• Teléfono: ${reserva.telefono}`,
    '',
    '📅 *DETALLES DE LA RESERVA*',
    `• Fecha: ${formatearFechaCorta(reserva.fecha)} (${reserva.fecha})`,
    `• Horario: ${getHoraLabel(reserva.horaLlegada)} - ${getHoraLabel(horaSalida)}`,
    `• Duración: ${reserva.duracion} hora(s)`,
    '',
    `${tipoReserva === 'mesa' ? '🪑' : '🌿'} *${tipoLabel}:* ${tipoDetalle}`,
    `👥 *Personas:* ${reserva.personas}`,
    `🎉 *Motivo de visita:* ${reserva.tipoVisita}`,
    '',
    '📝 *NOTAS ADICIONALES*',
    observaciones,
    '',
    '━━━━━━━━━━━━━━━━━━━━',
    '¿Podrían confirmarnos la disponibilidad para esta fecha y horario?',
    'Muchas gracias. 🙏',
  ].join('\n');

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`, '_blank', 'noopener,noreferrer');
}

const initialReserva = {
  nombre: '',
  telefono: '',
  fecha: getFechaHoy(),
  horaLlegada: '12:00',
  duracion: 3,
  personas: 2,
  tipoVisita: 'Almuerzo',
  observaciones: '',
};

export function useReservaMesa() {
  const [reserva, setReserva] = useState(initialReserva);
  const [tipoReserva, setTipoReserva] = useState('mesa');
  const [experienciaSeleccionada, setExperienciaSeleccionada] = useState('');
  const [mesaSeleccionada, setMesaSeleccionada] = useState('mesa-1');
  const [mesaConsultada, setMesaConsultada] = useState('mesa-1');
  const [calendarioAbierto, setCalendarioAbierto] = useState(false);
  const [paso, setPaso] = useState(1);
  const [errores, setErrores] = useState({});
  const [enviada, setEnviada] = useState(false);

  // REQ 3: limpiar datos de sesión anterior al montar el componente
  // Solo resetea la reserva — no toca localStorage ni ningún otro estado del sitio
  const resetearFormulario = () => {
    setReserva({ ...initialReserva, fecha: getFechaHoy() });
    setTipoReserva('mesa');
    setExperienciaSeleccionada('');
    setMesaSeleccionada('mesa-1');
    setMesaConsultada('mesa-1');
    setCalendarioAbierto(false);
    setPaso(1);
    setErrores({});
    setEnviada(false);
  };

  // Al montar: asegurar fecha de hoy (evita fechas pasadas si el estado persistió en HMR)
  useEffect(() => {
    setReserva(prev => ({ ...prev, fecha: getFechaHoy() }));
    setPaso(1);
    setEnviada(false);
    setErrores({});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const estadosMesas = useMemo(
    () => mesas.reduce((estados, mesa) => ({ ...estados, [mesa.id]: getEstadoMesa(mesa, reserva.fecha, mesaSeleccionada) }), {}),
    [reserva.fecha, mesaSeleccionada]
  );

  const fechasDisponibilidad = useMemo(
    () => Array.from({ length: 14 }, (_, indice) => getFechaConDesplazamiento(getFechaHoy(), indice)),
    []
  );

  const actualizarCampo = (campo, valor) => {
    setReserva(actual => ({ ...actual, [campo]: valor }));
    setErrores(actual => ({ ...actual, [campo]: '' }));
    setEnviada(false);
  };

  const seleccionarMesa = mesa => {
    const estado = getEstadoMesa(mesa, reserva.fecha, '');
    setMesaConsultada(mesa.id);
    setCalendarioAbierto(true);
    setMesaSeleccionada(estado === 'available' ? mesa.id : '');
    setErrores(actual => ({ ...actual, mesa: '' }));
  };

  const seleccionarFechaCalendario = fecha => {
    const mesa = mesas.find(item => item.id === mesaConsultada);
    const estado = mesa ? getEstadoMesa(mesa, fecha, '') : 'unavailable';
    actualizarCampo('fecha', fecha);
    setMesaSeleccionada(estado !== 'unavailable' ? mesaConsultada : '');
    if (estado === 'available') setErrores(actual => ({ ...actual, mesa: '' }));
  };

  const seleccionarHoraCalendario = hora => {
    actualizarCampo('horaLlegada', hora);
    setMesaSeleccionada(mesaConsultada);
    setErrores(actual => ({ ...actual, mesa: '', horaLlegada: '' }));
  };

  const revisarReserva = event => {
    event.preventDefault();
    const nuevosErrores = validarReserva(reserva, mesaSeleccionada, tipoReserva, experienciaSeleccionada);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length === 0) setPaso(3);
  };

  const continuarMesa = () => {
    if (tipoReserva === 'experiencia') {
      if (!experienciaSeleccionada) {
        setErrores(actual => ({ ...actual, experiencia: 'Selecciona una experiencia.' }));
        return;
      }
      setPaso(2);
      return;
    }
    if (!mesaSeleccionada) {
      setErrores(actual => ({ ...actual, mesa: 'Selecciona una mesa disponible.' }));
      return;
    }
    const mesa = mesas.find(item => item.id === mesaSeleccionada);
    if (mesa && hayConflictoHorario(mesa, reserva.fecha, reserva.horaLlegada, reserva.duracion)) {
      setErrores(actual => ({ ...actual, horaLlegada: 'La mesa está ocupada en esa franja. Elige otra hora disponible.' }));
      return;
    }
    setPaso(2);
  };

  const irAConfirmacion = () => {
    setPaso(4);
  };

  const enviarReserva = () => {
    const mesa = mesas.find(item => item.id === mesaSeleccionada);
    confirmarReservaMesa(reserva, mesa, tipoReserva, experienciaSeleccionada);
    setEnviada(true);
  };

  const volverADatos = () => {
    setEnviada(false);
    setPaso(2);
  };

  const modificar = () => {
    setEnviada(false);
    setPaso(1);
  };

  return {
    reserva,
    actualizarCampo,
    tipoReserva,
    setTipoReserva,
    experienciaSeleccionada,
    setExperienciaSeleccionada,
    experiencias,
    mesaSeleccionada,
    mesaConsultada,
    seleccionarMesa,
    seleccionarFechaCalendario,
    seleccionarHoraCalendario,
    calendarioAbierto,
    setCalendarioAbierto,
    estadosMesas,
    fechasDisponibilidad,
    paso,
    errores,
    enviada,
    revisarReserva,
    continuarMesa,
    irAConfirmacion,
    enviarReserva,
    volverADatos,
    modificar,
    resetearFormulario,
  };
}
