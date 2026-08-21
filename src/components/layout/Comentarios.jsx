import { useState } from 'react';
import './Comentarios.css';
import { validarComentario, marcarComentarioEnviado, enviarComentarioPorWhatsApp } from './Comentarios.utils';

function Comentarios() {
  const [texto, setTexto] = useState('');
  const [error, setError] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleCambio = (e) => {
    setTexto(e.target.value);
    if (error) setError('');
  };

  const handleEnviar = (e) => {
    e.preventDefault();
    const { valido, error: mensajeError } = validarComentario(texto);
    if (!valido) {
      setError(mensajeError);
      return;
    }
    enviarComentarioPorWhatsApp(texto);
    marcarComentarioEnviado();
    setEnviado(true);
    setTexto('');
    setError('');
  };

  const handleNuevoComentario = () => {
    setEnviado(false);
    setTexto('');
    setError('');
  };

  return (
    <div className="comentarios-box">
      <h4 className="comentarios-titulo">Cuéntanos cómo ha sido tu experiencia</h4>
      <p className="comentarios-subtitulo">Escríbenos lo que necesites.</p>

      {enviado ? (
        <div className="comentarios-confirmacion">
          <span className="comentarios-check" aria-hidden="true">✓</span>
          <p>¡Gracias por tu comentario! Lo recibiremos por WhatsApp.</p>
          <button
            className="comentarios-nuevo"
            type="button"
            onClick={handleNuevoComentario}
          >
            Escribir otro comentario
          </button>
        </div>
      ) : (
        <form className="comentarios-form" onSubmit={handleEnviar} noValidate>
          <textarea
            className={`comentarios-textarea${error ? ' comentarios-textarea--error' : ''}`}
            value={texto}
            onChange={handleCambio}
            placeholder="Escribe aquí tu comentario, sugerencia o pregunta..."
            rows={3}
            aria-label="Campo de comentario"
            maxLength={500}
          />
          {error && <span className="comentarios-error" role="alert">{error}</span>}
          <div className="comentarios-footer">
            <span className="comentarios-contador">{texto.length}/500</span>
            <button className="comentarios-btn" type="submit">
              Enviar comentario
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Comentarios;
