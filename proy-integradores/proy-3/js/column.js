// ============================================
// COLUMN (modelo de datos)
// ============================================

import { Task } from './task.js';

export class Column {
  /**
   * @param {string} id
   * @param {string} title
   * @param {Task[]} tasks
   */
  constructor(id, title, tasks = []) {
    // TODO: Asignar propiedades
    this.id = id;
    this.title = title;
    this.tasks = tasks;
  }

  /**
   * Agregar task a esta columna
   * @param {Task} task 
   */
  addTask(task) {
    // TODO: Push task
    if(!task) {
      throw new Error("Es requerida una Task");
    }
    this.tasks.push(task);
  }

  /**
   * Remover task por ID
   * @param {string} taskId 
   */
  removeTask(taskId) {
    // TODO: Filtrar tasks
    const index = this.tasks.findIndex(t => t.id === taskId);
    if(index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  /**
   * Obtener task por ID
   * @param {string} taskId 
   */
  getTask(taskId) {
    // TODO: Find task
    return this.tasks.find(t => t.id === taskId);
  }

  /**
   * Obtener todas las tasks
   */
  getTasks() {
    // TODO: Retornar copia
    return [...this.tasks];
  }

  toJSON() {
    // TODO: Incluir tasks.map(t => t.toJSON())
    return {
      id: this.id,
      title: this.title,
      tasks: this.tasks.map(t => t.toJSON())
    }
  }

  static fromJSON(json) {
    // TODO: Crear Column con Task.fromJSON() para cada task
    return new Column(
      json.id,
      json.title,
      json.tasks.map(t => Task.fromJSON(t))
    );
  }
}
