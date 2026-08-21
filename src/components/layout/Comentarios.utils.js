/**
 * Comentarios.utils.js
 * Lógica de la caja de comentarios del Footer.
 * Los comentarios se almacenan en sessionStorage para esta sesión.
 * No hay backend — el estado es local al navegador.
 */

const SESSION_KEY = 'villa_adelaida_comentario_enviado';

/**
 * Valida que el comentario no esté vacío ni sea solo espacios.
 * @param {string} texto
 * @returns {{ valido: boolean, error: string }}
 */
export function validarComentario(texto) {
  if (!texto || !texto.trim()) {
    return { valido: false, error: 'Escribe tu comentario antes de enviarlo.' };
  }
  if (texto.trim().length < 5) {
    return { valido: false, error: 'El comentario debe tener al menos 5 caracteres.' };
  }
  return { valido: true, error: '' };
}

/**
 * Marca en sessionStorage que el usuario ya envió un comentario en esta sesión.
 * Se limpia automáticamente al cerrar la pestaña.
 */
export function marcarComentarioEnviado() {
  try {
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch (_) {
    // sessionStorage no disponible — continúa sin error
  }
}

/**
 * Genera el mensaje de WhatsApp con el comentario del visitante.
 * @param {string} texto
 */
export function enviarComentarioPorWhatsApp(texto) {
  const WHATSAPP_NUMBER = '573012706114';
  const mensaje = [
    '💬 *COMENTARIO DE VISITANTE — VILLA ADELAIDA*',
    '─────────────────────────────',
    '',
    texto.trim(),
    '',
    '─────────────────────────────',
    'Enviado desde villaadelaidaecologico.com',
  ].join('\n');

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`,
    '_blank',
    'noopener,noreferrer'
  );
}
