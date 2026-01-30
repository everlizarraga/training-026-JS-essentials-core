// ============================================
// TODO REPOSITORY CLASS
// Maneja persistencia con localStorage
// ============================================

/**
 * Clase TodoRepository (Singleton)
 * 
 * TODO: Implementar esta clase
 * 
 * RESPONSABILIDAD: Persistencia de datos
 * 
 * PATRÓN: Singleton (una sola instancia)
 * 
 * COMPORTAMIENTO:
 * - save(data) → Guardar en localStorage
 * - load() → Cargar de localStorage
 * - clear() → Limpiar localStorage
 */
export class TodoRepository {
  // Singleton instance
  static #instance = null;
  #storageKey = 'todos_app_traiming_core_JS';

  constructor() {
    // TODO: Implementar Singleton
    if (TodoRepository.#instance) {
      return TodoRepository.#instance;
    }
    TodoRepository.#instance = this;
  }

  /**
   * TODO: Guardar datos
   * @param {Object[]} data
   * @returns {boolean}
   */
  save(data) {
    // TU CÓDIGO AQUÍ
    try {
      localStorage.setItem(this.#storageKey, JSON.stringify(data))
      return true
    } catch (error) {
      console.error('Error al guardar:', error)
      return false
    }
  }

  /**
   * TODO: Cargar datos
   * @returns {Object[]}
   */
  load() {
    // TU CÓDIGO AQUÍ
    try {
      const data = localStorage.getItem(this.#storageKey)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Error al cargar:', error)
      return []
    }
  }

  /**
   * TODO: Limpiar storage
   * @returns {boolean}
   */
  clear() {
    // TU CÓDIGO AQUÍ
    try {
      localStorage.removeItem(this.#storageKey)
      return true;
    } catch (error) {
      console.error("Error al limpiar local storage:", error);
      return false;
    }
  }
}

