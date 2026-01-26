// ============================================
// EVENT EMITTER BASE CLASS
// ============================================

export class EventEmitter {
  constructor() {
    this.events = {};
  }

  /**
   * Escuchar un evento
   * @param {string} event - Nombre del evento
   * @param {Function} callback - Función a ejecutar
   */
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  /**
   * Disparar un evento
   * @param {string} event - Nombre del evento
   * @param {*} data - Data a pasar al callback
   */
  emit(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => callback(data));
  }

  /**
   * Dejar de escuchar un evento
   * @param {string} event - Nombre del evento
   * @param {Function} callback - Callback a remover
   */
  off(event, callback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }
}
