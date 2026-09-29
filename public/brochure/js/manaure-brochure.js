/**
 * manaure-brochure.js — Manaure Vive Brochure Informativo
 * Funciones: filtros temáticos, selector de fotos, lightbox, explorador de circuito, PDF/print y nav activo
 */

document.addEventListener('DOMContentLoaded', () => {
  initFiltros();
  initThumbs();
  initModal();
  initCircuito();
  initPrint();
  initNavActive();
});

/* ══════════════════════════════
   1. FILTROS DE CATEGORÍA
══════════════════════════════ */
function initFiltros() {
  const btns = document.querySelectorAll('.mv-filtro-btn');
  const cards = document.querySelectorAll('.mv-empresa-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.cat;
      btns.forEach(b => b.classList.remove('activo'));
      btn.classList.add('activo');

      cards.forEach(card => {
        const cardCat = card.dataset.cat || '';
        const isMatch = (cat === 'todos') || (cardCat === cat);
        if (isMatch) {
          card.hidden = false;
          card.style.animation = 'none';
          requestAnimationFrame(() => {
            card.style.animation = 'fadeInUp .4s ease both';
          });
        } else {
          card.hidden = true;
        }
      });
    });
  });
}

/* ══════════════════════════════
   2. SELECTOR DE MINIATURAS & ZOOM
══════════════════════════════ */
function initThumbs() {
  // Tarjetas del catálogo
  document.querySelectorAll('.mv-empresa-card').forEach(card => {
    const mainFoto = card.querySelector('.mv-card-foto');
    card.querySelectorAll('.mv-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        if (!mainFoto) return;
        mainFoto.src = thumb.dataset.src;
        card.querySelectorAll('.mv-thumb').forEach(t => t.classList.remove('activa'));
        thumb.classList.add('activa');
      });
    });
    if (mainFoto) {
      mainFoto.addEventListener('click', () => abrirModal(mainFoto.src, mainFoto.alt));
    }
  });

  // Fichas detalladas
  document.querySelectorAll('.mv-ficha').forEach(ficha => {
    const mainFoto = ficha.querySelector('.mv-ficha-foto-principal');
    ficha.querySelectorAll('.mv-ficha-thumbs img').forEach(thumb => {
      thumb.addEventListener('click', () => {
        if (!mainFoto) return;
        mainFoto.src = thumb.dataset.src;
        ficha.querySelectorAll('.mv-ficha-thumbs img').forEach(t => t.classList.remove('activa'));
        thumb.classList.add('activa');
      });
    });
    if (mainFoto) {
      mainFoto.addEventListener('click', () => abrirModal(mainFoto.src, mainFoto.alt));
    }
  });
}

/* ══════════════════════════════
   3. LIGHTBOX MODAL
══════════════════════════════ */
function initModal() {
  const modal = document.getElementById('mv-modal');
  const cerrar = document.getElementById('mv-modal-cerrar');
  if (!modal) return;

  if (cerrar) cerrar.addEventListener('click', cerrarModal);
  modal.addEventListener('click', e => { if (e.target === modal) cerrarModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrarModal(); });
}

function abrirModal(src, alt = '') {
  const modal = document.getElementById('mv-modal');
  const img = document.getElementById('mv-modal-img');
  const caption = document.getElementById('mv-modal-caption');
  if (!modal || !img) return;
  img.src = src;
  img.alt = alt;
  if (caption) caption.textContent = alt;
  modal.classList.add('abierto');
  document.body.style.overflow = 'hidden';
}

function cerrarModal() {
  const modal = document.getElementById('mv-modal');
  if (!modal) return;
  modal.classList.remove('abierto');
  document.body.style.overflow = '';
}

/* ══════════════════════════════
   4. EXPLORADOR DEL CIRCUITO (PROPUESTA)
══════════════════════════════ */
const NIVELES = [
  { min: 0, max: 2, nombre: '🌱 Explorador Inicial', color: '#2E9E4F' },
  { min: 3, max: 5, nombre: '🧗 Aventurero del Perijá', color: '#FF8A00' },
  { min: 6, max: 8, nombre: '🦅 Viajero Integral', color: '#D7263D' },
  { min: 9, max: 10, nombre: '🌟 Embajador Manaure', color: '#0F4C2E' }
];

function initCircuito() {
  const checks = document.querySelectorAll('.mv-sello-check input[type="checkbox"]');
  if (!checks.length) return;
  checks.forEach(cb => cb.addEventListener('change', actualizarCircuito));
  actualizarCircuito();
}

function actualizarCircuito() {
  const checks = document.querySelectorAll('.mv-sello-check input[type="checkbox"]');
  let seleccionados = 0;

  checks.forEach(cb => {
    if (cb.checked) seleccionados++;
  });

  const total = checks.length || 10;
  const pct = Math.round((seleccionados / total) * 100);
  const nivel = NIVELES.find(n => seleccionados >= n.min && seleccionados <= n.max) || NIVELES[0];

  const elNivel  = document.getElementById('mv-sim-nivel');
  const elBarra  = document.getElementById('mv-sim-barra');
  const elSellos = document.getElementById('mv-sim-sellos');
  const elPct    = document.getElementById('mv-sim-pct');

  if (elNivel) { elNivel.textContent = nivel.nombre; elNivel.style.color = nivel.color; }
  if (elBarra) elBarra.style.width = pct + '%';
  if (elSellos) elSellos.textContent = seleccionados;
  if (elPct) elPct.textContent = pct;
}

/* ══════════════════════════════
   5. IMPRIMIR / DESCARGAR PDF
══════════════════════════════ */
function initPrint() {
  document.querySelectorAll('[data-action="print"], .mv-btn-pdf, .mv-fab-pdf, .mv-nav-btn-pdf')
    .forEach(btn => btn.addEventListener('click', () => window.print()));
}

/* ══════════════════════════════
   6. SCROLLSPY / NAV ACTIVO
══════════════════════════════ */
function initNavActive() {
  const sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.mv-nav-links a').forEach(a => {
          a.classList.toggle('activo', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.25 });

  sections.forEach(s => obs.observe(s));
}
