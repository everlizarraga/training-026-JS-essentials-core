// ============================================
// TASK MANAGER
// Gestiona colección de tareas (CRUD + lógica de negocio)
// ============================================

import { Task } from './Task.js';

export class TaskManager {
  constructor() {
    // Array de tareas
    /**@type {Task[]} */
    this.tasks = [];

    // Observers (Observer Pattern)
    this.observers = [];
  }

  // ==========================================
  // OBSERVER PATTERN
  // ==========================================

  subscribe(observer) {
    this.observers.push(observer);
  }

  notify() {
    this.observers.forEach(observer => observer.update(this.tasks));
  }

  // ==========================================
  // CRUD OPERATIONS
  // ==========================================

  // Agregar tarea
  add(title, description, category, priority) {
    const task = new Task({
      title,
      description,
      category,
      priority
    });

    if (!task.isValid()) {
      throw new Error('Tarea inválida: el título es requerido');
    }

    this.tasks.push(task);
    this.notify(); // Notificar cambios
    return task;
  }

  // Eliminar tarea
  remove(id) {
    const index = this.tasks.findIndex(task => task.id === id);

    if (index === -1) {
      throw new Error(`Tarea no encontrada: ${id}`);
    }

    this.tasks.splice(index, 1);
    this.notify();
  }

  // Obtener tarea por ID
  getById(id) {
    const task = this.tasks.find(task => task.id === id);

    if (!task) {
      throw new Error(`Tarea no encontrada: ${id}`);
    }

    return task;
  }

  // Actualizar tarea
  update(id, data) {
    const task = this.getById(id);
    task.update(data);
    this.notify();
    return task;
  }

  // Toggle completado
  toggle(id) {
    const task = this.getById(id);
    task.toggle();
    this.notify();
    return task;
  }

  // Obtener todas las tareas
  getAll() {
    return [...this.tasks]; // Retornar copia
  }

  // ==========================================
  // FILTROS Y BÚSQUEDA
  // ==========================================

  /**
   * Filtrar por estado
   * @param {'all'|'active'|'completed'} status 
   * @returns {Task[]}
   */
  getByStatus(status) {
    if (status === 'all') return this.getAll();
    if (status === 'active') return this.tasks.filter(t => !t.completed);
    if (status === 'completed') return this.tasks.filter(t => t.completed);
    return this.getAll();
  }

  /**
   * Filtrar por categoría
   * @param {string} category 
   * @returns {Task[]}
   */
  getByCategory(category) {
    if (!category || category === 'all') return this.getAll();
    return this.tasks.filter(t => t.category === category);
  }

  // Buscar por texto (título o descripción)
  search(query) {
    if (!query || query.trim() === '') return this.getAll();

    const lowercaseQuery = query.toLowerCase();

    return this.tasks.filter(task => {
      return (
        task.title.toLowerCase().includes(lowercaseQuery) ||
        task.description.toLowerCase().includes(lowercaseQuery)
      );
    });
  }

  // Filtro combinado (estado + categoría + búsqueda)
  filter({ status = 'all', category = 'all', search = '' }) {
    let filtered = this.tasks;

    // Filtrar por estado
    if (status !== 'all') {
      filtered = filtered.filter(t =>
        status === 'completed' ? t.completed : !t.completed
      );
    }

    // Filtrar por categoría
    if (category !== 'all') {
      filtered = filtered.filter(t => t.category === category);
    }

    // Filtrar por búsqueda
    if (search.trim()) {
      const lowercaseSearch = search.toLowerCase();
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(lowercaseSearch) ||
        t.description.toLowerCase().includes(lowercaseSearch)
      );
    }

    return filtered;
  }

  // ==========================================
  // ORDENAMIENTO
  // ==========================================

  sort(tasks, criteria) {
    const sorted = [...tasks];

    switch (criteria) {
      case 'date':
        return sorted.sort((a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
        );

      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return sorted.sort((a, b) =>
          priorityOrder[b.priority] - priorityOrder[a.priority]
        );

      case 'alphabetical':
        return sorted.sort((a, b) =>
          a.title.localeCompare(b.title)
        );

      default:
        return sorted;
    }
  }

  // ==========================================
  // ESTADÍSTICAS
  // ==========================================

  getStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const active = total - completed;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Estadísticas por categoría
    const byCategory = this.tasks.reduce((acc, task) => {
      if (!acc[task.category]) {
        acc[task.category] = { total: 0, completed: 0 };
      }
      acc[task.category].total++;
      if (task.completed) {
        acc[task.category].completed++;
      }
      return acc;
    }, {});

    return {
      total,
      completed,
      active,
      percentage,
      byCategory
    };
  }

  // Obtener categorías únicas
  getCategories() {
    const categories = new Set(this.tasks.map(t => t.category));
    return Array.from(categories);
  }

  // ==========================================
  // GESTIÓN DE DATOS
  // ==========================================

  // Cargar tareas desde array
  loadTasks(tasksData) {
    this.tasks = tasksData.map(data => Task.fromJSON(data));
    this.notify();
  }

  // Limpiar todas las tareas
  clear() {
    this.tasks = [];
    this.notify();
  }

  // Exportar a JSON
  toJSON() {
    return this.tasks.map(task => task.toJSON());
  }
}
