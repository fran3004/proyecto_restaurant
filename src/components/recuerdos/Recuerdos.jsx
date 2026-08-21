import { useState } from 'react';
import './Recuerdos.css';
import { getSiguienteRecurso, recuerdos } from './Recuerdos.utils';

function Recuerdos() {
  const [videoSeleccionado, setVideoSeleccionado] = useState(null);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [elementoSeleccionado, setElementoSeleccionado] = useState(null);
  const [recursoSeleccionado, setRecursoSeleccionado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const abrirVideo = (recuerdo, index) => {
    setElementoSeleccionado(index);
    setRecursoSeleccionado(index);
    setImagenSeleccionada(null);
    setVideoSeleccionado(recuerdo);
    setModalVisible(true);
  };

  const abrirImagen = index => {
    setElementoSeleccionado(index);
    setRecursoSeleccionado(index);
    setVideoSeleccionado(null);
    setImagenSeleccionada(index);
    setModalVisible(true);
  };

  const cerrarVideo = () => {
    setModalVisible(false);
    window.setTimeout(() => {
      setVideoSeleccionado(null);
      setImagenSeleccionada(null);
      setRecursoSeleccionado(null);
    }, 260);
  };

  const cambiarRecurso = direccion => {
    const siguienteIndice = getSiguienteRecurso(recursoSeleccionado, direccion);
    const siguienteRecurso = recuerdos[siguienteIndice];
    setElementoSeleccionado(siguienteIndice);
    setRecursoSeleccionado(siguienteIndice);
    setVideoSeleccionado(siguienteRecurso.tipo === 'video' ? siguienteRecurso : null);
    setImagenSeleccionada(siguienteRecurso.tipo === 'image' ? siguienteIndice : null);
  };

  const recursoActual = recursoSeleccionado !== null ? recuerdos[recursoSeleccionado] : null;

  return (
    <section className="section" id="recuerdos">
      <div className="section-heading">
        <div>
          <p className="eyebrow">RECUERDOS VIVOS</p>
          <h2>Historias de quienes nos visitan</h2>
        </div>
        <p>Detén el tiempo, dale play y vuelve a sentir la naturaleza, la alegría y la energía de Villa Adelaida.</p>
      </div>

      <div className="memories-mosaic">
        {recuerdos.map((r, index) => (
          <article
            className={`memory-item ${r.clase}${elementoSeleccionado === index ? ' is-selected' : ''}`}
            key={r.autor}
            onClick={() => r.tipo === 'video' ? abrirVideo(r, index) : abrirImagen(index)}
            tabIndex="0"
            onKeyDown={event => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                if (r.tipo === 'video') abrirVideo(r, index);
                else abrirImagen(index);
              }
            }}
          >
            {r.tipo === 'video' ? (
              <>
                <video
                  className="memory-video"
                  playsInline
                  preload="metadata"
                  muted
                  aria-label={r.alt}
                >
                  <source src={r.video} type="video/mp4" />
                  Tu navegador no puede reproducir este video.
                </video>
                <button
                  className="memory-play"
                  type="button"
                  onClick={event => { event.stopPropagation(); abrirVideo(r, index); }}
                  aria-label="Abrir video"
                >
                  ▶
                </button>
              </>
            ) : (
              <img className="memory-image" src={r.img} alt={r.alt} />
            )}
          </article>
        ))}
      </div>

      {(videoSeleccionado || imagenSeleccionada !== null) && (
        <div className={`memory-modal memory-image-modal${modalVisible ? ' is-open' : ' is-closing'}`} role="dialog" aria-modal="true" aria-label={imagenSeleccionada !== null ? 'Galería de imágenes' : 'Video de recuerdos'} onClick={cerrarVideo}>
          {(imagenSeleccionada !== null || videoSeleccionado) && (
            <>
              <button className="memory-modal-close" type="button" onClick={event => { event.stopPropagation(); cerrarVideo(); }} aria-label="Cerrar visor">×</button>
              <button className="memory-modal-arrow memory-modal-arrow-prev" type="button" onClick={event => { event.stopPropagation(); cambiarRecurso(-1); }} aria-label="Recurso anterior">‹</button>
              <button className="memory-modal-arrow memory-modal-arrow-next" type="button" onClick={event => { event.stopPropagation(); cambiarRecurso(1); }} aria-label="Recurso siguiente">›</button>
            </>
          )}
          <div className="memory-modal-content" onClick={event => event.stopPropagation()}>
            {videoSeleccionado ? (
              <video className="memory-modal-video" controls autoPlay playsInline>
                <source src={videoSeleccionado.video} type="video/mp4" />
                Tu navegador no puede reproducir este video.
              </video>
            ) : (
              <>
                <div className="memory-gallery-topbar">
                  <span>Recuerdos vivos</span>
                  <strong>{recursoSeleccionado + 1} / {recuerdos.length}</strong>
                </div>
                <img className="memory-modal-image" src={recuerdos[imagenSeleccionada].img} alt={recuerdos[imagenSeleccionada].alt} />
                <div className="memory-gallery-caption">
                  <span>{recursoActual.texto}</span>
                  <small>{recursoActual.autor}</small>
                </div>
                <div className="memory-gallery-dots" aria-label="Navegación de imágenes">
                  {recuerdos.map((recuerdo, indice) => (
                    <button
                      className={indice === recursoSeleccionado ? 'active' : ''}
                      key={indice}
                      type="button"
                      onClick={() => cambiarRecurso(indice - recursoSeleccionado)}
                      aria-label={`Ver ${recuerdo.tipo === 'video' ? 'video' : 'imagen'} ${indice + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Recuerdos;
