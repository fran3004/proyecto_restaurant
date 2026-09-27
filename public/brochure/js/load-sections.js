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
  ['mount-convenios-01-agua-aventura', 'sections/convenios-01-agua-aventura.html'],
  ['mount-convenios-02-adrenalina-glamping', 'sections/convenios-02-adrenalina-glamping.html'],
  ['mount-convenios-03-sabores-paisaje', 'sections/convenios-03-sabores-paisaje.html'],
  ['mount-convenios-04-montana-biodiversidad', 'sections/convenios-04-montana-biodiversidad.html'],
  ['mount-convenios-05-fotografia-cafe', 'sections/convenios-05-fotografia-cafe.html'],
  ['mount-contacto', 'sections/contacto.html'],
  ['mount-footer', 'sections/footer.html']
];

const aplicarCorreccionSaboresPaisaje = () => {
  const section = document.querySelector('#convenios-sabores-paisaje');
  if (!section) return;

  const labels = section.querySelectorAll('.convenio-meta > span');
  const values = section.querySelectorAll('.convenio-meta > strong');

  labels.forEach((el) => {
    el.style.setProperty('color', '#111111', 'important');
    el.style.setProperty('font-weight', '700', 'important');
    el.style.setProperty('text-shadow', 'none', 'important');
    el.style.setProperty('opacity', '1', 'important');
  });

  values.forEach((el) => {
    el.style.setProperty('color', '#111111', 'important');
    el.style.setProperty('font-weight', '700', 'important');
    el.style.setProperty('text-shadow', 'none', 'important');
    el.style.setProperty('opacity', '1', 'important');
  });
};

const cargarSeccion = ([mountId, ruta]) =>
  fetch(`${ruta}?v=${Date.now()}`)
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error(`No se pudo cargar ${ruta}: ${respuesta.status}`);
      }

      return respuesta.text();
    })
    .then((contenido) => {
      document.getElementById(mountId).innerHTML = contenido;

      if (mountId === 'mount-convenios-03-sabores-paisaje') {
        aplicarCorreccionSaboresPaisaje();
      }
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