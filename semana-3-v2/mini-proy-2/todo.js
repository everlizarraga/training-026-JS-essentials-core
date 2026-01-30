// ============================================
// TODO CLASS
// Representa una tarea individual
// ============================================

/**
 * @typedef {Object} TodoInfo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 * @property {string} createdAt
 */

/**
 * Clase Todo
 * 
 * TODO: Implementar esta clase
 * 
 * RESPONSABILIDAD: Representar una tarea con sus datos
 * 
 * DATOS:
 * - id (único)
 * - title (título de la tarea)
 * - completed (true/false)
 * - createdAt (fecha de creación)
 * 
 * COMPORTAMIENTO:
 * - toggle() → Cambiar estado completed
 * - toJSON() → Convertir a objeto plano
 * - static fromJSON() → Crear Todo desde objeto
 */
export class Todo {
  // TODO: Declarar campos privados o públicos
  // Opción 1: Públicos (simple)
  // Opción 2: Privados con getters (más robusto)

  constructor(id, title) {
    // TODO: Inicializar propiedades
    this.id = id;
    this.title = title;
    this.completed = false;
    this.createdAt = new Date().toISOString();
  }

  /**
   * TODO: Cambiar estado de completado
   */
  toggle() {
    // TU CÓDIGO AQUÍ
    this.completed = !this.completed;
  }

  /**
   * TODO: Convertir a objeto plano (para localStorage)
   * @returns {TodoInfo}
   */
  toJSON() {
    // TU CÓDIGO AQUÍ
    return { 
      id: this.id, 
      title: this.title, 
      completed: this.completed,
      createdAt: this.createdAt
    };
  }

  /**
   * TODO: Crear Todo desde objeto plano
   * @static
   * @param {TodoInfo} json 
   * @returns {Todo}
   */
  static fromJSON(json) {
    // TU CÓDIGO AQUÍ
    const todo = new Todo(json.id, json.title);
    todo.completed = json.completed;
    todo.createdAt = json.createdAt;
    return todo;
  }
}

