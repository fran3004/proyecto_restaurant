/**
 * Hospedaje.utils.js
 * Lógica de negocio para la reserva de mesas.
 * Construye el mensaje y abre WhatsApp — separado del JSX.
 */

const WHATSAPP_NUMBER = '573145741186';

/**
 * Construye el mensaje formateado y abre WhatsApp con los datos de la reserva.
 * @param {{ mesa: string, fecha: string, horaInicio: string, horaFin: string, personas: number|string }} reserva
 */
export function confirmarReservaMesa({ mesa, fecha, horaInicio, horaFin, personas }) {
  const mensaje =
    `Hola Villa Adelaida, me gustaría confirmar una reserva de mesa:%0A%0A` +
    `📌 *Ubicación:* ${mesa}%0A` +
    `📅 *Fecha:* ${fecha}%0A` +
    `⏰ *Horario:* De ${horaInicio} a ${horaFin}%0A` +
    `👥 *Personas:* ${personas}%0A%0A` +
    `¿Tienen disponibilidad?`;

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`,
    '_blank',
    'noopener,noreferrer'
  );
}

/**
 * Retorna la fecha de hoy en formato YYYY-MM-DD (valor mínimo para el input date).
 * @returns {string}
 */
export function getFechaHoy() {
  return new Date().toISOString().split('T')[0];
}
