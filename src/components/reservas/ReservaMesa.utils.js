import { useEffect, useMemo, useState } from 'react';

const WHATSAPP_URL = 'https://wa.link/ewr2c9';

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

export function getEstadoMesa(mesa, fecha, mesaSeleccionada) {
  if (mesa.id === mesaSeleccionada) return 'selected';
  if (fecha && new Date(`${fecha}T00:00:00`).getDay() === 0 && mesa.id === 'mesa-6') return 'unavailable';
  const dia = fecha ? Number(fecha.slice(-2)) : 1;
  const numeroMesa = Number(mesa.id.split('-')[1]);
  return (dia + numeroMesa) % 4 === 0 ? 'occupied' : 'available';
}

export function getEstadoLabel(estado) {
  return {
    available: 'Disponible',
    selected: 'Seleccionada',
    occupied: 'Ocupada',
    unavailable: 'No disponible',
  }[estado];
}

export function validarReserva(reserva, mesaSeleccionada) {
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
  if (mesa && personas > mesa.capacidad) errores.personas = `Esta mesa tiene capacidad para ${mesa.capacidad} personas.`;
  if (!mesa) errores.mesa = 'Selecciona una mesa disponible.';
  if (!reserva.tipoVisita) errores.tipoVisita = 'Selecciona el tipo de visita.';

  const horaSalida = getHoraSalida(reserva.horaLlegada, reserva.duracion);
  if (reserva.horaLlegada && horaSalida <= reserva.horaLlegada) errores.duracion = 'La hora de salida debe ser posterior a la llegada.';

  return errores;
}

export function confirmarReservaMesa(reserva, mesa) {
  const horaSalida = getHoraSalida(reserva.horaLlegada, reserva.duracion);
  const observaciones = reserva.observaciones.trim() || 'Ninguna';
  const mensaje = [
    'Hola Villa Adelaida, quiero solicitar esta reserva:',
    '',
    `Cliente: ${reserva.nombre}`,
    `Teléfono: ${reserva.telefono}`,
    `Fecha: ${reserva.fecha}`,
    `Hora: ${getHoraLabel(reserva.horaLlegada)} a ${getHoraLabel(horaSalida)}`,
    `Duración: ${reserva.duracion} hora(s)`,
    `Personas: ${reserva.personas}`,
    `Mesa: ${mesa.nombre}`,
    `Tipo de visita: ${reserva.tipoVisita}`,
    `Observaciones: ${observaciones}`,
    '',
    '¿Tienen disponibilidad?'
  ].join('\n');

  window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(mensaje)}`, '_blank', 'noopener,noreferrer');
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
  const [mesaSeleccionada, setMesaSeleccionada] = useState('mesa-1');
  const [paso, setPaso] = useState(1);
  const [errores, setErrores] = useState({});
  const [enviada, setEnviada] = useState(false);

  const estadosMesas = useMemo(
    () => mesas.reduce((estados, mesa) => ({ ...estados, [mesa.id]: getEstadoMesa(mesa, reserva.fecha, mesaSeleccionada) }), {}),
    [reserva.fecha, mesaSeleccionada]
  );

  useEffect(() => {
    const mesaActual = mesas.find(mesa => mesa.id === mesaSeleccionada);
    const estadoReal = mesaActual ? getEstadoMesa(mesaActual, reserva.fecha, '') : 'unavailable';
    if (mesaActual && estadoReal !== 'available') {
      const primeraDisponible = mesas.find(mesa => getEstadoMesa(mesa, reserva.fecha, '') === 'available');
      setMesaSeleccionada(primeraDisponible ? primeraDisponible.id : '');
    }
  }, [estadosMesas, mesaSeleccionada, reserva.fecha]);

  const actualizarCampo = (campo, valor) => {
    setReserva(actual => ({ ...actual, [campo]: valor }));
    setErrores(actual => ({ ...actual, [campo]: '' }));
    setEnviada(false);
  };

  const seleccionarMesa = mesa => {
    if (estadosMesas[mesa.id] !== 'available') return;
    setMesaSeleccionada(mesa.id);
    setErrores(actual => ({ ...actual, mesa: '' }));
  };

  const revisarReserva = event => {
    event.preventDefault();
    const nuevosErrores = validarReserva(reserva, mesaSeleccionada);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length === 0) setPaso(3);
  };

  const continuarMesa = () => {
    if (!mesaSeleccionada) {
      setErrores(actual => ({ ...actual, mesa: 'Selecciona una mesa disponible.' }));
      return;
    }
    setPaso(2);
  };

  const irAConfirmacion = () => {
    setPaso(4);
  };

  const enviarReserva = () => {
    const mesa = mesas.find(item => item.id === mesaSeleccionada);
    confirmarReservaMesa(reserva, mesa);
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
  };
}
