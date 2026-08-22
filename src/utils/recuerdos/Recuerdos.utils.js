export const recuerdos = [
  {
    tipo: 'video',
    video: `${process.env.PUBLIC_URL}/assets/videos/recuerdos/WhatsApp%20Video%202026-08-20%20at%2010.40.56%20PM.mp4`,
    alt: 'Visitantes compartiendo un momento especial en Villa Adelaida',
    texto: 'Un momento para recordar',
    autor: 'Experiencias que permanecen',
    clase: 'memory-featured',
  },
  {
    tipo: 'video',
    video: `${process.env.PUBLIC_URL}/assets/videos/recuerdos/WhatsApp%20Video%202026-08-20%20at%2010.40.59%20PM.mp4`,
    alt: 'Naturaleza y visitantes disfrutando Villa Adelaida',
    texto: 'Naturaleza que se siente',
    autor: 'Villa Adelaida · Centro ecológico',
    clase: 'memory-side',
  },
  { tipo: 'image', img: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85', alt: 'Paisaje natural amplio rodeado de árboles', texto: 'Respirar también es viajar', autor: 'Naturaleza viva', clase: 'memory-image-small' },
  { tipo: 'image', img: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=85', alt: 'Piscina en un entorno natural', texto: 'Tiempo para desconectarse', autor: 'Descanso en la Villa', clase: 'memory-image-small' },
  {
    tipo: 'video',
    video: `${process.env.PUBLIC_URL}/assets/videos/recuerdos/WhatsApp%20Video%202026-08-20%20at%2010.41.02%20PM.mp4`,
    alt: 'Visitantes viviendo una experiencia al aire libre en Villa Adelaida',
    texto: 'Así se vive la Villa',
    autor: 'Naturaleza, alegría y descanso',
    clase: 'memory-side',
  },
  { tipo: 'image', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85', alt: 'Restaurante rodeado de naturaleza', texto: 'Sabores para compartir', autor: 'Nuestra sazón', clase: 'memory-image-small' },
  { tipo: 'image', img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=85', alt: 'Paisaje natural para disfrutar al aire libre', texto: 'Un lugar para volver', autor: 'Villa Adelaida', clase: 'memory-image-small' },
  { tipo: 'image', img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=85', alt: 'Familia compartiendo una experiencia al aire libre', texto: 'Momentos para compartir', autor: 'Recuerdos vivos', clase: 'memory-image-small' },
  { tipo: 'image', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85', alt: 'Paisaje abierto para descansar y desconectarse', texto: 'Desconexión total', autor: 'Un respiro natural', clase: 'memory-image-small' },
  { tipo: 'image', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=85', alt: 'Bebida refrescante para disfrutar en la Villa', texto: 'Sabores de la Villa', autor: 'Nuestra sazón', clase: 'memory-image-small' },
  { tipo: 'image', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=85', alt: 'Espacio gastronómico para compartir', texto: 'Una mesa, muchas historias', autor: 'Gastronomía local', clase: 'memory-image-small' },
  { tipo: 'image', img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=85', alt: 'Camino natural entre árboles y vegetación', texto: 'Un camino para descubrir', autor: 'Rutas de la Villa', clase: 'memory-image-small' },
  { tipo: 'image', img: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85', alt: 'Paisaje verde y tranquilo para descansar', texto: 'La calma de la naturaleza', autor: 'Villa Adelaida', clase: 'memory-image-small' },
];

export function getSiguienteRecurso(indiceActual, direccion, total = recuerdos.length) {
  return (indiceActual + direccion + total) % total;
}
