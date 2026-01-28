// ============================================
// TASK REPOSITORY
// Maneja persistencia con localStorage (Singleton)
// ============================================

export class TaskRepository {
  // Singleton instance
  static #instance = null;

  constructor() {
    // Implementar Singleton
    if (TaskRepository.#instance) {
      return TaskRepository.#instance;
    }

    this.STORAGE_KEY = 'task_manager_tasks';
    TaskRepository.#instance = this;
  }

  // Guardar tareas
  save(tasks) {
    try {
      const json = JSON.stringify(tasks);
      localStorage.setItem(this.STORAGE_KEY, json);
      return true;
    } catch (error) {
      console.error('Error al guardar tareas:', error);
      return false;
    }
  }

  // Cargar tareas
  load() {
    try {
      const json = localStorage.getItem(this.STORAGE_KEY);

      if (!json) {
        return [];
      }

      return JSON.parse(json);
    } catch (error) {
      console.error('Error al cargar tareas:', error);
      return [];
    }
  }

  // Limpiar storage
  clear() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error al limpiar storage:', error);
      return false;
    }
  }

  // Verificar si hay datos guardados
  hasData() {
    return localStorage.getItem(this.STORAGE_KEY) !== null;
  }
}
