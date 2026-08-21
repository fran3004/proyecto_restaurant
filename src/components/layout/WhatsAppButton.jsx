import './WhatsAppButton.css';

const WHATSAPP_URL = 'https://wa.me/573012706114';

function WhatsAppButton() {
  return (
    <a
      className="whatsapp-floating-button"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="¿Necesitas ayuda? Escríbenos"
    >
      <span className="whatsapp-tooltip" role="tooltip">¿Necesitas ayuda? Escríbenos</span>
      <svg className="whatsapp-icon" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path d="M16 3.2a12.7 12.7 0 0 0-10.9 19.2L3.4 28.8l6.6-1.7A12.8 12.8 0 1 0 16 3.2Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M11.7 10.2c.3-.4.7-.4 1.1-.2l1.4 1.9c.3.4.3.8 0 1.1l-.8.8c.7 1.4 1.8 2.5 3.2 3.2l.8-.8c.3-.3.7-.3 1.1 0l1.9 1.4c.4.3.4.8.2 1.1l-.6.8c-.4.6-1.1.9-1.8.8-4.1-.7-7.4-4-8.1-8.1-.1-.7.2-1.4.8-1.8l.8-.6Z" fill="currentColor" />
      </svg>
    </a>
  );
}

export default WhatsAppButton;
