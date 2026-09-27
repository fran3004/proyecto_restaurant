(() => {
  const iniciarReveal = () => {
    const elementos = [...document.querySelectorAll('.reveal-on-scroll:not(.is-visible)')];

    if (!('IntersectionObserver' in window)) {
      elementos.forEach((elemento) => elemento.classList.add('is-visible'));
      return;
    }

    if (!elementos.length) return;

    let pendientes = elementos.length;
    const observer = new IntersectionObserver((entradas, observador) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('is-visible');
          observador.unobserve(entrada.target);
          pendientes -= 1;
        }
      });

      if (pendientes === 0) observador.disconnect();
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    elementos.forEach((elemento) => observer.observe(elemento));
  };

  document.addEventListener('secciones-listas', iniciarReveal, { once: true });
})();