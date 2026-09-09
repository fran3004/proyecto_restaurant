(() => {
  const iniciarNavegacion = () => {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    const enlaces = [...nav.querySelectorAll('a[href^="#"]')];
    const enlacesDeSeccion = enlaces.map((enlace) => ({
      enlace,
      secciones: (enlace.dataset.navSections || enlace.getAttribute('href').slice(1)).split(' ')
    }));
    const objetivos = [...new Set(enlacesDeSeccion.flatMap(({ secciones }) => secciones))]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!objetivos.length) return;

    const visibilidad = new Map();

    const actualizarActivo = () => {
      const activo = objetivos
        .filter((objetivo) => visibilidad.has(objetivo.id))
        .sort((a, b) => (visibilidad.get(b.id) - visibilidad.get(a.id)))[0];

      enlacesDeSeccion.forEach(({ enlace, secciones }) => {
        const estaActivo = activo && secciones.includes(activo.id);
        enlace.classList.toggle('is-active', Boolean(estaActivo));

        if (estaActivo) {
          enlace.setAttribute('aria-current', 'location');
        } else {
          enlace.removeAttribute('aria-current');
        }
      });
    };

    if (!('IntersectionObserver' in window)) {
      actualizarActivo();
      return;
    }

    const observer = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          visibilidad.set(entrada.target.id, entrada.intersectionRatio);
        } else {
          visibilidad.delete(entrada.target.id);
        }
      });

      actualizarActivo();
    }, { rootMargin: '-12% 0px -48% 0px', threshold: [0, .1, .25, .5, .75] });

    objetivos.forEach((objetivo) => observer.observe(objetivo));
  };

  document.addEventListener('secciones-listas', iniciarNavegacion, { once: true });
})();