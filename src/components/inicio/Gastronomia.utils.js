import { useState } from 'react';

export const productos = [
  { categoria: 'Platos criollos', nombre: 'Sancocho de Gallina con Arroz', precio: 30000, descripcion: 'Sancocho tradicional de gallina acompañado de arroz.', imagen: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Platos criollos', nombre: 'Gallina Guisada', precio: 32000, descripcion: 'Gallina guisada con el sabor casero de la cocina regional.', imagen: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Platos criollos', nombre: 'Malaganda', precio: 35000, descripcion: 'Preparación criolla de sabor tradicional y reconfortante.', imagen: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Platos criollos', nombre: 'Chivo Guisado con Salsa de Coco', precio: 40000, descripcion: 'Chivo guisado acompañado de una suave salsa de coco.', imagen: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Asados al carbón y parrilla', nombre: 'Churrasco de Cerdo (315 gr)', precio: 42000, descripcion: 'Corte de cerdo preparado a la parrilla, 315 gramos.', imagen: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Asados al carbón y parrilla', nombre: 'Churrasco (320 gr al carbón)', precio: 47000, descripcion: 'Churrasco de 320 gramos sellado al carbón.', imagen: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Asados al carbón y parrilla', nombre: 'Pechuga Asada al Carbón (330 gr)', precio: 39000, descripcion: 'Pechuga de 330 gramos asada al carbón.', imagen: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Asados al carbón y parrilla', nombre: 'Lomo de Cerdo (320 gr al carbón)', precio: 39000, descripcion: 'Lomo de cerdo de 320 gramos preparado al carbón.', imagen: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Asados al carbón y parrilla', nombre: 'Carne Asada al Carbón (330 gr)', precio: 39000, descripcion: 'Carne de 330 gramos asada al carbón.', imagen: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Asados al carbón y parrilla', nombre: 'Costilla de Cerdo BBQ (380 gr)', precio: 39000, descripcion: 'Costilla de cerdo de 380 gramos con salsa BBQ.', imagen: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Asados al carbón y parrilla', nombre: 'Chicharrón de Cerdo con Yuca (300 gr)', precio: 29000, descripcion: 'Chicharrón de cerdo de 300 gramos acompañado de yuca.', imagen: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Asados al carbón y parrilla', nombre: 'Punta Gorda (315 gr)', precio: 52000, descripcion: 'Corte de punta gorda de 315 gramos preparado a la parrilla.', imagen: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Asados al carbón y parrilla', nombre: 'Picada Mixta Villa Adelaida (para 8-9 personas)', precio: 329000, descripcion: 'Picada mixta para compartir entre 8 y 9 personas.', imagen: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Pescados', nombre: 'Mojarra Roja Frita', precio: 40000, descripcion: 'Mojarra roja frita con arroz de coco, patacón y yuca.', imagen: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Pescados', nombre: 'Mojarra Roja Guisada', precio: 42000, descripcion: 'Mojarra roja guisada con arroz de coco, patacón y yuca.', imagen: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Desayunos', nombre: 'Patacón con Huevos Revueltos + Café con Leche', precio: 17000, descripcion: 'Patacón con huevos revueltos y café con leche.', imagen: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Desayunos', nombre: '2 Sandwich de Jamón y Queso + Café con Leche', precio: 14000, descripcion: 'Dos sándwiches de jamón y queso con café con leche.', imagen: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Entradas', nombre: 'Queso con Patacón', precio: 15000, descripcion: 'Queso acompañado de patacón crujiente.', imagen: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Entradas', nombre: 'Chorizo con Patacón', precio: 17000, descripcion: 'Chorizo servido con patacón crujiente.', imagen: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Porciones adicionales', nombre: 'Porción de Sopa', precio: 10000, descripcion: 'Porción individual de sopa caliente.', imagen: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Porciones adicionales', nombre: 'Porción de Arroz de Coco', precio: 10000, descripcion: 'Porción adicional de arroz de coco.', imagen: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Porciones adicionales', nombre: 'Porción de Torta Baja en Calorías', precio: 9000, descripcion: 'Porción de torta baja en calorías.', imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Porciones adicionales', nombre: 'Papa Francesa 250 gr', precio: 9000, descripcion: 'Papas francesas, porción de 250 gramos.', imagen: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Porciones adicionales', nombre: 'Patacón', precio: 8000, descripcion: 'Patacón dorado como acompañamiento.', imagen: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Porciones adicionales', nombre: 'Yuca', precio: 8000, descripcion: 'Porción de yuca como acompañamiento.', imagen: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Porciones adicionales', nombre: 'Queso', precio: 7000, descripcion: 'Porción de queso para acompañar tu plato.', imagen: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Porciones adicionales', nombre: 'Ensalada', precio: 7000, descripcion: 'Ensalada fresca como acompañamiento.', imagen: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Porciones adicionales', nombre: 'Suero', precio: 4000, descripcion: 'Porción de suero para acompañar.', imagen: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Bebidas', nombre: 'Jugos Naturales en vaso', precio: 13000, descripcion: 'Jugo natural en vaso. Sabores: corozo, guayaba agria, maracuyá o mora.', imagen: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Bebidas', nombre: 'Jugos Naturales en jarra', precio: 26000, descripcion: 'Jugo natural en jarra. Sabores: corozo, guayaba agria, maracuyá o mora.', imagen: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Bebidas', nombre: 'Limonada Natural Frappé', precio: 13000, descripcion: 'Limonada natural frappé, refrescante y fría.', imagen: 'https://images.unsplash.com/photo-1513558161293-caad8c8e3cc7?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Bebidas', nombre: 'Cerveza Club Colombia', precio: 6000, descripcion: 'Cerveza Club Colombia bien fría.', imagen: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Bebidas', nombre: 'Cerveza Coronita', precio: 5000, descripcion: 'Cerveza Coronita bien fría.', imagen: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Bebidas', nombre: 'Coca-Cola', precio: 5000, descripcion: 'Coca-Cola fría.', imagen: 'https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Bebidas', nombre: 'Postobón', precio: 4000, descripcion: 'Gaseosa Postobón fría.', imagen: 'https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Bebidas', nombre: 'Agua PET 500 ml', precio: 4000, descripcion: 'Agua embotellada de 500 ml.', imagen: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Bebidas', nombre: 'Agua pequeña', precio: 2000, descripcion: 'Agua embotellada en presentación pequeña.', imagen: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=800&q=85' },
  { categoria: 'Bebidas', nombre: 'Adicional de Michelada', precio: 4000, descripcion: 'Adicional de michelada para tu cerveza.', imagen: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=85' },
];

export const categorias = ['Todos', ...new Set(productos.map(producto => producto.categoria))];
export const formatoPrecio = precio => `$${precio.toLocaleString('es-CO')}`;

export function useGastronomia() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const [cartaCompleta, setCartaCompleta] = useState(false);
  const filtrados = categoriaActiva === 'Todos'
    ? productos
    : productos.filter(producto => producto.categoria === categoriaActiva);
  const visibles = cartaCompleta || categoriaActiva !== 'Todos' ? filtrados : filtrados.slice(0, 6);

  return {
    categoriaActiva,
    setCategoriaActiva,
    cartaCompleta,
    setCartaCompleta,
    visibles,
  };
}
