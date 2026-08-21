import { useState, useEffect, useCallback } from 'react';
import '../../styles/inicio/Hero.css';
import { heroCategories, INTERVAL, slides } from '../../utils/inicio/Hero.utils';

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

  const slideActual = slides[current];

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
          <p>{slideActual.description}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#reserva-experiencias">Reservar experiencia</a>
            <a className="btn btn-ghost" href="#experiencias">Ver planes</a>
          </div>
        </div>

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
            {heroCategories.map(category => (
              <button
                className={`hero-tag${current === category.slide ? ' active-tag' : ''}`}
                key={category.label}
                type="button"
                onClick={() => goTo(category.slide)}
              >
                {category.icon} {category.label}
              </button>
            ))}
          </div>
          <p className="hero-tag-desc">{slideActual.description}</p>
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
