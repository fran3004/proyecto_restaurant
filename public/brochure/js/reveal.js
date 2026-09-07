document.addEventListener('secciones-listas', () => {
  const elementos = document.querySelectorAll('.reveal-on-scroll');

  if (!('IntersectionObserver' in window)) {
    elementos.forEach((elemento) => elemento.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entradas, observador) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('is-visible');
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });

  elementos.forEach((elemento) => observer.observe(elemento));
});