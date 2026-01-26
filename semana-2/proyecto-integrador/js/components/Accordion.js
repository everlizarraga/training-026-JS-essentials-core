// ============================================
// ACCORDION COMPONENT
// ============================================

import { EventEmitter } from './EventEmitter.js';

/**
 * Accordion Component
 * Componente de contenido colapsable
 * 
 * @example
 * const accordion = new Accordion('#accordion-container', {
 *   items: [
 *     { title: 'Item 1', content: 'Contenido 1' },
 *     { title: 'Item 2', content: 'Contenido 2' }
 *   ]
 * });
 */
export class Accordion extends EventEmitter {
  constructor(selector, options) {
    super();

    this.container = document.querySelector(selector);

    if (!this.container) {
      throw new Error(`Elemento ${selector} no encontrado`);
    }

    this.options = {
      items: [],
      allowMultiple: true,  // Permite múltiples items abiertos
      ...options
    };

    this.activeItems = new Set();  // Índices de items activos

    this.render();
    this.setupEvents();
  }

  /**
   * Renderiza el accordion
   */
  render() {
    // Crear contenedor del accordion
    const accordion = document.createElement('div');
    accordion.className = 'accordion';

    this.options.items.forEach((item, index) => {
      // Crear item del accordion
      const accordionItem = document.createElement('div');
      accordionItem.className = 'accordion-item';
      accordionItem.dataset.index = index;

      // Estructura HTML del item
      accordionItem.innerHTML = `
        <button class="accordion-header">
          <span>${item.title}</span>
          <span class="accordion-icon">▼</span>
        </button>
        <div class="accordion-content">
          <div class="accordion-body">
            ${item.content}
          </div>
        </div>
      `;

      accordion.append(accordionItem);
    });

    // Limpiar y agregar al container
    this.container.innerHTML = '';
    this.container.append(accordion);
  }

  /**
   * Configura event listeners
   */
  setupEvents() {
    const accordion = this.container.querySelector('.accordion');

    // Event delegation en el accordion
    accordion.addEventListener('click', (e) => {
      // TODO: Verificar si se clickeó un header
      // Hint: const header = e.target.closest('.accordion-header');
      const header = e.target.closest('.accordion-header');
      if(!header) return;

      // TODO: Si es un header, obtener el item
      // Hint: const item = header.closest('.accordion-item');
      const item = header.closest('.accordion-item');

      // TODO: Obtener índice del item
      // Hint: const index = parseInt(item.dataset.index);
      const index = parseInt(item.dataset.index);

      // TODO: Toggle el item
      // Hint: this.toggle(index);
      this.toggle(index);
    });
  }

  /**
   * Toggle (abrir/cerrar) un item
   * @param {number} index - Índice del item
   */
  toggle(index) {
    const item = this.container.querySelector(`[data-index="${index}"]`);

    if (!item) return;

    const isActive = item.classList.contains('active');

    // Si NO permite múltiples abiertos, cerrar todos
    if (!this.options.allowMultiple && !isActive) {
      this.closeAll();
    }

    // Toggle el item
    if (isActive) {
      // TODO: Cerrar el item
      // Hint: item.classList.remove('active');
      // Hint: this.activeItems.delete(index);
      item.classList.remove('active');
      this.activeItems.delete('index');
    } else {
      // TODO: Abrir el item
      // Hint: item.classList.add('active');
      // Hint: this.activeItems.add(index);
      item.classList.add('active');
      this.activeItems.add(index);
    }

    // Disparar evento
    this.emit('item-toggled', {
      index,
      isOpen: !isActive
    });
  }

  /**
   * Cierra todos los items
   */
  closeAll() {
    const items = this.container.querySelectorAll('.accordion-item');

    items.forEach(item => {
      item.classList.remove('active');
    });

    this.activeItems.clear();
  }

  /**
   * Abre un item específico
   * @param {number} index - Índice del item
   */
  open(index) {
    const item = this.container.querySelector(`[data-index="${index}"]`);

    if (!item || item.classList.contains('active')) return;

    if (!this.options.allowMultiple) {
      this.closeAll();
    }

    item.classList.add('active');
    this.activeItems.add(index);
  }

  /**
   * Cierra un item específico
   * @param {number} index - Índice del item
   */
  close(index) {
    const item = this.container.querySelector(`[data-index="${index}"]`);

    if (!item || !item.classList.contains('active')) return;

    item.classList.remove('active');
    this.activeItems.delete(index);
  }
}

