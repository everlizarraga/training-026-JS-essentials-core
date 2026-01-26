import { Card } from "./Card.js";

/**
 * CardGrid Component
 * Contenedor para organizar múltiples cards en grid
 * 
 * @example
 * const grid = new CardGrid('#container');
 * grid.add(card1);
 * grid.add(card2);
 */
export class CardGrid {
  constructor(selector) {
    this.container = document.querySelector(selector);
    if (!this.container) {
      throw new Error(`Elemento ${selector} no encontrado`);
    }
    this.cards = [];
    this.container.classList.add('card-grid');
  }

  /**
   * Agrega una card al grid
   * @param {Card} card - Instancia de Card
   */
  add(card) {
    const element = card.render();
    this.container.append(element);
    this.cards.push(card);
  }

  /**
   * Limpia todas las cards del grid
   */
  clear() {
    this.cards.forEach(card => card.destroy());
    this.cards = [];
  }

  /**
   * Retorna el número de cards en el grid
   * @returns {number}
   */
  getCount() {
    return this.cards.length;
  }
}
