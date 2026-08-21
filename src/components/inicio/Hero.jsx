import { useState, useEffect, useCallback } from 'react';
import './Hero.css';

const slides = [
  {
    img: 'https://images.unsplash.com/photo-1511497584788-8767610419ea?auto=format&fit=crop&w=2200&q=90',
    label: 'Naturaleza viva',
  },
  {
    img: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2200&q=90',
    label: 'Piscina y descanso',
  },
  {
    img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2200&q=90',
    label: 'Paisajes ecológicos',
  },
  {
    img: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=2200&q=90',
    label: 'Cabañas en el bosque',
  },
];

const INTERVAL = 5000; // ms entre cambios

function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((idx) => {
    if (animating) return;
    setPrev(current);
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => {
      setPrev(null);
      setAnimating(false);
    }, 900);
  }, [current, animating]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prevSlide = useCallback(() => {
    goTo(current === 0 ? slides.length - 1 : current - 1);
  }, [current, goTo]);

  // Autoplay
  useEffect(() => {
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [next]);

  return (
    <>
      <section className="hero" id="inicio">

        {/* ── Fondo: slides ── */}
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`hero-bg
              ${i === current ? 'hero-bg--active' : ''}
              ${i === prev ? 'hero-bg--exit' : ''}
            `}
            style={{ backgroundImage: `url(${slide.img})` }}
          />
        ))}

        {/* Overlay oscuro */}
        <div className="hero-overlay" />

        {/* ── Contenido ── */}
        <div className="hero-content">
          <p className="eyebrow light">VILLA ADELAIDA · MANAURE, CESAR</p>
          <h1>Villa Adelaida:<br /><em>conecta con lo auténtico</em></h1>
          <p>Naturaleza, río y gastronomía típica para compartir en familia, en pareja o con amigos.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#reserva-experiencias">Reservar experiencia</a>
            <a className="btn btn-ghost" href="#experiencias">Ver planes</a>
          </div>
        </div>

        {/* ── Controles ── */}
        <button className="hero-arrow hero-arrow--prev" onClick={prevSlide} aria-label="Anterior">‹</button>
        <button className="hero-arrow hero-arrow--next" onClick={next} aria-label="Siguiente">›</button>

        {/* ── Dots ── */}
        <div className="hero-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`hero-dot${i === current ? ' active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Ir a slide ${i + 1}`}
            />
          ))}
        </div>

        {/* ── Barra de progreso ── */}
        <div className="hero-progress">
          <div
            key={current}
            className="hero-progress-bar"
            style={{ animationDuration: `${INTERVAL}ms` }}
          />
        </div>

        {/* ── Categorías inferiores (igual a Villa Martha) ── */}
        <div className="hero-stay">
          <span>🌿</span>
          <strong>Vive la Experiencia Adelaida</strong>
          <div className="hero-tags">
            <span className="hero-tag">🌳 Pasadía Ecológico</span>
            <span className="hero-tag">👨‍👩‍👧 Día Familiar</span>
            <span className="hero-tag">🎉 Celebración</span>
            <span className="hero-tag active-tag">💚 Escapada en Pareja</span>
          </div>
          <p className="hero-tag-desc">Cena al atardecer y noche en cabaña. Solo ustedes y la naturaleza.</p>
        </div>

      </section>

      {/* ── Intro ── */}
      <section className="intro">
        <p className="eyebrow">UN REFUGIO NATURAL</p>
        <h2>Respira aire puro y crea memorias</h2>
        <p>Un espacio rodeado de fauna, senderos verdes y la mejor gastronomía típica. Villa Adelaida es el destino perfecto para quienes buscan desconectar de la rutina.</p>
      </section>
    </>
  );
}

export default Hero;
