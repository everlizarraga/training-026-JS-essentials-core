// ============================================
// TODO MANAGER CLASS
// Gestiona colección de tareas (lógica de negocio)
// ============================================

import { Todo } from './todo.js';

/**
 * Clase TodoManager
 * 
 * TODO: Implementar esta clase
 * 
 * RESPONSABILIDAD: Gestionar colección de tareas
 * 
 * DATOS:
 * - #todos (array privado de tareas)
 * - #nextId (próximo ID disponible)
 * 
 * COMPORTAMIENTO:
 * - add(title) → Agregar tarea
 * - remove(id) → Eliminar tarea
 * - toggle(id) → Cambiar completado
 * - getAll() → Todas las tareas
 * - getActive() → Solo pendientes
 * - getCompleted() → Solo completadas
 * - toJSON() → Para persistencia
 * - loadFromJSON(data) → Cargar desde persistencia
 */
export class TodoManager {
  // TODO: Campos privados
  /**@type {Todo[]} */
  #todos = [];
  #nextId = 1;

  constructor() {
    // TODO: Inicializar (ya está en declaración)
  }

  // ==========================================
  // CRUD OPERATIONS
  // ==========================================

  /**
   * TODO: Agregar tarea
   * @param {string} title
   * @returns {Todo}
   */
  add(title) {
    // TU CÓDIGO AQUÍ
    // 1. Validar title no vacío
    // 2. Crear nuevo Todo con this.#nextId++
    // 3. Agregar a this.#todos
    // 4. Retornar todo creado
    if(!title || title === '') {
      throw new Error("Se requiere titulo");
    }
    const todo = new Todo(this.#nextId, title);
    this.#todos.push(todo);
    this.#nextId += 1;
    return todo;
  }

  /**
   * TODO: Eliminar tarea
   * @param {number} id
   * @returns {boolean}
   */
  remove(id) {
    // TU CÓDIGO AQUÍ
    // 1. Buscar índice con findIndex
    // 2. Si existe, splice
    // 3. Retornar true/false
    const index = this.#todos.findIndex(todo => todo.id === Number(id));
    if(index !== -1) {
      this.#todos.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  /**
   * TODO: Toggle completado
   * @param {number} id
   * @returns {boolean}
   */
  toggle(id) {
    // TU CÓDIGO AQUÍ
    // 1. Buscar todo con find
    // 2. Si existe, llamar todo.toggle()
    // 3. Retornar true/false
    const todo = this.findTodo(id);
    if(todo) {
      todo.toggle();
      return true;
    } else {
      return false;
    }
  }

  findTodo(id) {
    return this.#todos.find(todo => todo.id === Number(id));
  }

  // ==========================================
  // QUERIES
  // ==========================================

  /**
   * TODO: Obtener todas las tareas
   * @returns {Todo[]}
   */
  getAll() {
    // TU CÓDIGO AQUÍ
    // return [...this.#todos]  (copia)
    return [...this.#todos];
  }

  /**
   * TODO: Obtener solo activas
   * @returns {Todo[]}
   */
  getActive() {
    // TU CÓDIGO AQUÍ
    return this.#todos.filter(t => !t.completed)
  }

  /**
   * TODO: Obtener solo completadas
   * @returns {Todo[]}
   */
  getCompleted() {
    // TU CÓDIGO AQUÍ
    return this.#todos.filter(t => t.completed)
  }

  // ==========================================
  // PERSISTENCIA
  // ==========================================

  /**
   * TODO: Convertir a JSON para guardar
   * @returns {import('./todo.js').TodoInfo[]}
   */
  toJSON() {
    // TU CÓDIGO AQUÍ
    return this.#todos.map(t => t.toJSON())
  }

  /**
   * TODO: Cargar desde JSON
   * @param {Object[]} data
   */
  loadFromJSON(data) {
    // TU CÓDIGO AQUÍ
    this.#todos = data.map(json => Todo.fromJSON(json))
    // Actualizar #nextId basado en IDs existentes
    if(this.#todos.length === 0) {
      this.#nextId = 1;
    } else {
      this.#nextId = Math.max(...this.#todos.map(todo => todo.id)) + 1;
    }
  }

  /**
   * TODO: Obtener estadísticas
   * @returns {Object}
   */
  getStats() {
    // TU CÓDIGO AQUÍ
    return {
      total: this.#todos.length,
      completed: this.getCompleted().length,
      active: this.getActive().length
    }
  }
}

