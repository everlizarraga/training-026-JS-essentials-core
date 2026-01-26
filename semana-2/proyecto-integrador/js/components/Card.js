import { EventEmitter } from './EventEmitter.js';

/**
 * Card Component
 * Componente de card reutilizable con imagen, título y contenido
 * 
 * @example
 * const card = new Card({
 *   title: 'Mi Card',
 *   content: 'Descripción',
 *   image: 'imagen.jpg'
 * });
 * 
 * const element = card.render();
 * document.body.append(element);
 */
export class Card extends EventEmitter {
  constructor(options) {
    super();
    this.options = {
      title: '',
      content: '',
      image: '',
      ...options
    };
    this.element = null;
  }

  /**
   * Renderiza el componente y retorna el elemento DOM
   * @returns {HTMLElement}
   */
  render() {
    this.element = document.createElement('div');
    this.element.className = 'card';
    this.element.innerHTML = `
      <img src="${this.options.image}" alt="${this.options.title}">
      <h3>${this.options.title}</h3>
      <p>${this.options.content}</p>
    `;

    // Event listener para click
    this.element.addEventListener('click', () => {
      this.handleClick();
    });

    return this.element;
  }

  /**
   * Maneja el click en la card
   * Dispara evento 'card-clicked' con los datos de la card
   */
  handleClick() {
    // TODO: Disparar custom event 'card-clicked'
    // Hint: this.emit('card-clicked', this.options);
    this.emit('card-clicked', this.options);
  }

  /**
   * Destruye el componente (limpia del DOM)
   */
  destroy() {
    this.element?.remove();
    this.element = null;
  }
}


