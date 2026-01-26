// ============================================
// TABS COMPONENT
// ============================================

import { EventEmitter } from './EventEmitter.js';

/**
 * Tabs Component
 * Sistema de pestañas con navegación
 * 
 * @example
 * const tabs = new Tabs('#tabs-container', {
 *   tabs: [
 *     { id: 'tab1', label: 'Tab 1', content: 'Contenido 1' },
 *     { id: 'tab2', label: 'Tab 2', content: 'Contenido 2' }
 *   ]
 * });
 */
export class Tabs extends EventEmitter {
  constructor(selector, options) {
    super();

    this.container = document.querySelector(selector);

    if (!this.container) {
      throw new Error(`Elemento ${selector} no encontrado`);
    }

    this.options = {
      tabs: [],
      activeTab: 0,  // Índice del tab activo por defecto
      ...options
    };

    this.activeIndex = this.options.activeTab;

    this.render();
    this.setupEvents();
  }

  /**
   * Renderiza el componente de tabs
   */
  render() {
    // Limpiar container
    this.container.innerHTML = '';

    // Crear navegación
    const nav = document.createElement('div');
    nav.className = 'tabs-nav';

    this.options.tabs.forEach((tab, index) => {
      const button = document.createElement('button');
      button.className = 'tab-button';
      button.dataset.index = index;
      button.textContent = tab.label;

      // Marcar el tab activo
      if (index === this.activeIndex) {
        button.classList.add('active');
      }

      nav.append(button);
    });

    // Crear contenedores de contenido
    const contentContainer = document.createElement('div');
    contentContainer.className = 'tabs-content';

    this.options.tabs.forEach((tab, index) => {
      const content = document.createElement('div');
      content.className = 'tab-content';
      content.dataset.index = index;
      content.innerHTML = tab.content;

      // Mostrar solo el tab activo
      if (index === this.activeIndex) {
        content.classList.add('active');
      }

      contentContainer.append(content);
    });

    // Agregar al container
    this.container.append(nav, contentContainer);
  }

  /**
   * Configura event listeners
   */
  setupEvents() {
    const nav = this.container.querySelector('.tabs-nav');

    // Event delegation en la navegación
    nav.addEventListener('click', (e) => {
      // TODO: Verificar si se clickeó un botón
      // Hint: const button = e.target.closest('.tab-button');
      const btn = e.target.closest('.tab-button');

      // TODO: Si es un botón, obtener el índice
      // Hint: const index = parseInt(button.dataset.index);
      if(!btn) return;
      const index = parseInt(btn.dataset.index);

      // TODO: Cambiar al tab seleccionado
      // Hint: this.setActive(index);
      this.setActive(index);
    });
  }

  /**
   * Cambia el tab activo
   * @param {number} index - Índice del tab
   */
  setActive(index) {
    // Validar índice
    if (index < 0 || index >= this.options.tabs.length) {
      return;
    }

    // TODO: Remover clase 'active' de todos los botones
    // Hint: this.container.querySelectorAll('.tab-button').forEach(...)
    this.container.querySelectorAll('.tab-button').forEach(e => {
      e.classList.remove('active');
    });

    // TODO: Agregar clase 'active' al botón seleccionado
    // Hint: const buttons = this.container.querySelectorAll('.tab-button');
    // Hint: buttons[index].classList.add('active');
    const btn = this.container.querySelectorAll('.tab-button');
    btn[index].classList.add('active');

    // TODO: Remover clase 'active' de todos los contenidos
    // Hint: this.container.querySelectorAll('.tab-content').forEach(...)
    this.container.querySelectorAll('.tab-content').forEach(e => {
      e.classList.remove('active');
    });

    // TODO: Agregar clase 'active' al contenido seleccionado
    // Hint: const contents = this.container.querySelectorAll('.tab-content');
    // Hint: contents[index].classList.add('active');
    const contents = this.container.querySelectorAll('.tab-content');
    contents[index].classList.add('active');

    // Actualizar índice activo
    this.activeIndex = index;

    // Disparar evento
    this.emit('tab-changed', {
      index,
      tab: this.options.tabs[index]
    });
  }
}

