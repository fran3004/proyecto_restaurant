const secciones = [
  ['mount-nav', 'sections/nav.html'],
  ['mount-cover', 'sections/cover.html'],
  ['mount-bienvenida-indice', 'sections/bienvenida-indice.html'],
  ['mount-mosaic', 'sections/mosaic.html'],
  ['mount-experiencia-destacada', 'sections/experiencia-destacada.html'],
  ['mount-sazon', 'sections/sazon.html'],
  ['mount-interstitial', 'sections/interstitial.html'],
  ['mount-ubicacion', 'sections/ubicacion.html'],
  ['mount-descubre-manaure', 'sections/descubre-manaure.html'],
  ['mount-contacto', 'sections/contacto.html'],
  ['mount-footer', 'sections/footer.html']
];

const cargarSeccion = ([mountId, ruta]) =>
  fetch(ruta)
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error(`No se pudo cargar ${ruta}: ${respuesta.status}`);
      }

      return respuesta.text();
    })
    .then((contenido) => {
      document.getElementById(mountId).innerHTML = contenido;
    });

Promise.all(secciones.map(cargarSeccion)).then(() => {
  document.dispatchEvent(new Event('secciones-listas'));
}).catch((error) => {
  console.error('No se pudo completar la carga del brochure.', error);
});

document.addEventListener('click', (evento) => {
  if (evento.target.closest('[data-print]')) {
    window.print();
  }
});