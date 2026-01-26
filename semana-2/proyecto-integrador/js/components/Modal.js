import { EventEmitter } from './EventEmitter.js';

/**
 * Modal Component
 * Modal reutilizable con overlay
 * 
 * @example
 * const modal = new Modal({
 *   title: 'Mi Modal',
 *   content: 'Contenido del modal'
 * });
 * 
 * modal.open();
 * modal.close();
 */
export class Modal extends EventEmitter {
  constructor(options) {
    super();
    this.options = {
      title: 'Modal',
      content: '',
      closable: true,        // Puede cerrarse con X
      closeOnOverlay: true,  // Cerrar al hacer click en overlay
      closeOnEsc: true,      // Cerrar con tecla ESC
      ...options
    };

    this.overlay = null;
    this.modal = null;
    this.isOpen = false;

    this.create();
    this.setupEvents();
  }

  create() {
    // TODO: Crear overlay
    // TODO: Crear modal dentro del overlay
    // TODO: Append a body
    // Crear overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'modal-overlay';

    // Crear modal
    this.modal = document.createElement('div');
    this.modal.className = 'modal';

    // Estructura HTML del modal
    this.modal.innerHTML = `
      <div class="modal-header">
        <h2>${this.options.title}</h2>
        ${this.options.closable ? '<button class="modal-close" aria-label="Cerrar">×</button>' : ''}
      </div>
      <div class="modal-body">
        ${this.options.content}
      </div>
    `;

    // Agregar modal al overlay
    this.overlay.append(this.modal);

    // Seteo inicial no visible
    // this.overlay.style.display = 'none';
    // this.close();
    this.overlay.style.display = 'none';
    this.isOpen = false;

    // Agregar al body
    document.body.append(this.overlay);
  }

  setupEvents() {
    // TODO: Event listener para cerrar con X
    // TODO: Event listener para cerrar con overlay
    // TODO: Event listener para cerrar con ESC
    // Cerrar con botón X
    if (this.options.closable) {
      const closeBtn = this.modal.querySelector('.modal-close');
      closeBtn.addEventListener('click', () => {
        this.close();
      });
    }

    // Cerrar al hacer click en overlay
    if (this.options.closeOnOverlay) {
      this.overlay.addEventListener('click', (e) => {
        // TODO: Cerrar solo si se hace click en el overlay, NO en el modal
        // Hint: if (e.target === this.overlay) { this.close(); }
        if (e.target === this.overlay) {
          this.close();
        }
      });
    }

    // Cerrar con tecla ESC
    if (this.options.closeOnEsc) {
      this.handleEscKey = (e) => {
        // TODO: Cerrar si presiona ESC y el modal está abierto
        // Hint: if (e.key === 'Escape' && this.isOpen) { this.close(); }
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      };

      document.addEventListener('keydown', this.handleEscKey);
    }
  }

  /**
   * Abre el modal
   */
  open() {
    // TODO: Agregar clase 'active' al overlay
    // Hint: this.overlay.classList.add('active');
    this.overlay.style.display = 'block';
    requestAnimationFrame(() => {
      this.overlay?.classList.add('active');
    });

    // TODO: Marcar como abierto
    // Hint: this.isOpen = true;
    this.isOpen = true;

    // TODO: Disparar evento 'open'
    // Hint: this.emit('open');
    this.emit('open');
  }

  /**
   * Cierra el modal
   */
  close() {
    // TODO: Remover clase 'active' del overlay
    // Hint: this.overlay.classList.remove('active');
    this.overlay?.classList.remove('active');
    // requestAnimationFrame(() => {
    //   this.overlay.style.display = 'none';
    // });
    const handleTransitionEnd = () => {
      if (!this.isOpen) {
        this.overlay.style.display = 'none';
      }
      // this.overlay.removeEventListener('transitionend', handleTransitionEnd);
    };
    this.overlay.addEventListener('transitionend', handleTransitionEnd, { once: true });

    // TODO: Marcar como cerrado
    // Hint: this.isOpen = false;
    this.isOpen = false;

    // TODO: Disparar evento 'close'
    // Hint: this.emit('close');
    this.emit('close');
  }

  /**
   * Cambia el contenido del modal
   * @param {string} content - Nuevo contenido HTML
   */
  setContent(content) {
    const body = this.modal.querySelector('.modal-body');
    body.innerHTML = content;
  }

  /**
   * Cambia el título del modal
   * @param {string} title - Nuevo título
   */
  setTitle(title) {
    const header = this.modal.querySelector('.modal-header h2');
    header.textContent = title;
  }

  /**
   * Destruye el modal completamente
   */
  destroy() {
    // Remover event listener de ESC
    if (this.handleEscKey) {
      document.removeEventListener('keydown', this.handleEscKey);
    }

    // Remover del DOM
    this.overlay?.remove();
    this.overlay = null;
    this.modal = null;
  }
}