// ============================================
// BOARD MODEL (lógica de negocio)
// ============================================

import { Column } from './column.js';
import { Task } from './task.js';

export class BoardModel {
  /** @type {Column[]} */
  #columns = [];
  #nextColumnId = 1;
  #nextTaskId = 1;
  #observers = [];

  // Filtros activos
  #activeFilters = {
    search: '',
    labels: [],      // ['bug', 'feature']
    priority: 'all'  // 'all' | 'high' | 'medium' | 'low'
  };

  // ==========================================
  // OBSERVER
  // ==========================================

  subscribe(callback) {
    // TODO: Implementar
    if (!callback) {
      throw new Error("Es necesaria una callback");
    }
    this.#observers.push(callback);
  }

  notify() {
    // TODO: Implementar
    this.#observers.forEach(ob => ob());
  }

  // ==========================================
  // COLUMNS
  // ==========================================

  /**
   * Crear nueva Columna
   * @param {string} title 
   */
  addColumn(title) {
    // TODO: Crear Column con id = `col-${this.#nextColumnId}`
    // TODO: Incrementar #nextColumnId
    // TODO: Push a #columns
    // TODO: notify()
    if (!title) throw new Error('Es necesario un titulo para la columna');
    const id = `col-${this.#nextColumnId}`;
    this.#nextColumnId += 1;
    const nuevaColumna = new Column(id, title);
    this.#columns.push(nuevaColumna);
    this.notify();
  }

  /**
   * Eliminar una Columna
   * @param {string} columnId 
   */
  removeColumn(columnId) {
    // TODO: Filtrar #columns
    // TODO: notify()
    this.#columns = this.#columns.filter(c => c.id != columnId);
    this.notify();
  }

  /**
   * Retorna columan por ID
   * @param {string} columnId 
   * @returns {Column| undefined}
   */
  getColumn(columnId) {
    // TODO: Find column
    return this.#columns.find(c => c.id == columnId);
  }

  /**
   * Retorna todas las columnas
   * @returns {Column[]}
   */
  getAllColumns() {
    // TODO: Retornar copia
    return [...this.#columns];
  }

  // ==========================================
  // TASKS
  // ==========================================

  /**
   * Agregar task a una columna
   */
  addTask(columnId, title, priority = 'medium', labels = []) {
    // TODO: Buscar columna
    // TODO: Crear Task con id = `task-${this.#nextTaskId}`
    // TODO: Incrementar #nextTaskId
    // TODO: column.addTask(task)
    // TODO: notify()
    const column = this.getColumn(columnId);
    if (!column) {
      throw new Error("Columna no encontrada");
    }
    const task = new Task(`task-${this.#nextTaskId}`, title, priority, labels);
    this.#nextTaskId += 1;
    column.addTask(task);
    this.notify();
  }

  /**
   * Eliminar task (buscar en todas las columnas)
   * @param {string} taskId 
   */
  removeTask(taskId) {
    // TODO: Iterar columns
    // TODO: Intentar removeTask en cada una
    // TODO: notify()
    this.#columns.forEach(col => col.removeTask(taskId));
    this.notify();
  }

  /**
   * Mover task de una columna a otra
   */
  moveTask(taskId, fromColumnId, toColumnId) {
    // TODO: Obtener columna origen
    // TODO: Obtener task de la columna origen
    // TODO: Remover de columna origen
    // TODO: Obtener columna destino
    // TODO: Agregar a columna destino
    // TODO: notify()
    const columnOrigin = this.getColumn(fromColumnId);
    const columnTarget = this.getColumn(toColumnId);
    if (!columnOrigin || !columnTarget) throw new Error('ID de columnas no encontradas');
    const task = columnOrigin.getTask(taskId);
    if (!task) throw new Error(`Task[${taskId}] no encontrada en ${fromColumnId}`);
    columnOrigin.removeTask(taskId);
    columnTarget.addTask(task);
    this.notify();
  }

  /**
   * Actualizar task (edit inline)
   * @param {string} taskId 
   * @param {*} updates 
   */
  updateTask(taskId, updates) {
    // TODO: Buscar task en todas las columnas
    // TODO: Aplicar updates (Object.assign o spread)
    // TODO: notify()
    let column = null;
    let taskTarget = null;
    this.#columns.forEach((col) => {
      const task = col.getTask(taskId);
      if (task) {
        column = col;
        taskTarget = task;
      }
    });
    if (!column || !taskTarget) throw new Error('Columna o Task no encontrada para updetear');
    Object.assign(taskTarget, updates);
    this.notify();
  }

  // ==========================================
  // FILTERS
  // ==========================================

  setSearchFilter(query) {
    // TODO: Guardar en #activeFilters.search
    // TODO: notify()
    // if (!query) throw new Error('Es necesaria una query');
    this.#activeFilters.search = query;
    this.notify();
  }

  /**
   * Toggle Label Filter
   * @param {string} label 
   */
  toggleLabelFilter(label) {
    // TODO: Si está en array → quitar
    // TODO: Si no está → agregar
    // TODO: notify()
    if (this.#activeFilters.labels.includes(label)) {
      this.#activeFilters.labels = this.#activeFilters.labels.filter(l => l != label);
    } else {
      this.#activeFilters.labels.push(label);
    }
    this.notify();
  }

  clearLabelFilters() {
    this.#activeFilters.labels = [];
    this.notify();
  }

  setPriorityFilter(priority) {
    // TODO: Guardar en #activeFilters.priority
    // TODO: notify()
    // if (!priority) throw new Error('Es necesario una priority');
    this.#activeFilters.priority = priority || 'all';
    this.notify();
  }

  getActiveFilters() {
    // TODO: Retornar copia de #activeFilters
    return {
      search: this.#activeFilters.search,
      labels: [...this.#activeFilters.labels],
      priority: this.#activeFilters.priority
    }
  }

  /**
   * Aplicar filtros a las columnas
   * Retorna columnas con tasks filtradas
   */
  getFilteredColumns() {
    // TODO: Para cada columna:
    //   1. Filtrar tasks por search (title includes search)
    //   2. Filtrar por labels (task.labels incluye alguno de activeFilters.labels)
    //   3. Filtrar por priority
    //
    // Retornar columnas con tasks filtradas
    // IMPORTANTE: No modificar #columns, crear copias
    /**@type {Column[]} */
    const columns = [];

    this.#columns.forEach((col) => {
      let tasks = col.getTasks();

      // Filtro 1: Search (solo si hay query)
      if (this.#activeFilters.search) {
        tasks = tasks.filter(t =>
          t.title.toLowerCase().includes(this.#activeFilters.search.toLowerCase())
        );
      }

      // Filtro 2: Labels (solo si hay labels activos)
      if (this.#activeFilters.labels.length > 0) {
        tasks = tasks.filter(t =>
          this.#activeFilters.labels.some(l => t.labels.includes(l))
        );
      }

      // Filtro 3: Priority (solo si NO es 'all')
      if (this.#activeFilters.priority !== 'all') {
        tasks = tasks.filter(t => t.priority === this.#activeFilters.priority);
      }

      const nuevaColumn = new Column(col.id, col.title, tasks);
      columns.push(nuevaColumn);
    });

    return columns;
  }

  // ==========================================
  // STATS
  // ==========================================

  getStats() {
    // TODO: Calcular:
    // - Total tasks
    // - Tasks por columna
    // - Tasks por priority
    // - Tasks por label

    /**@type {Task[]} */
    const allTasks = this.#columns.reduce((acum, curr) => [...acum, ...curr.getTasks()], []);
    const totalTasks = allTasks.length;

    const tasksPorColumna = {};
    this.#columns.forEach(col => {
      tasksPorColumna[col.id] = col.getTasks().length;
    });

    const tasksPorPriority = {};
    tasksPorPriority['high'] = allTasks.filter(t => t.priority === 'high').length;
    tasksPorPriority['medium'] = allTasks.filter(t => t.priority === 'medium').length;
    tasksPorPriority['low'] = allTasks.filter(t => t.priority === 'low').length;

    const tasksPorLabel = {};
    this.#activeFilters.labels.forEach(l => {
      tasksPorLabel[l] = allTasks.filter(task => task.labels.includes(l)).length;
    });

    return {
      totalTasks,
      tasksPorColumna,
      tasksPorPriority,
      tasksPorLabel
    }
  }

  // ==========================================
  // PERSISTENCE
  // ==========================================

  toJSON() {
    // TODO: Retornar {
    //   columns: this.#columns.map(c => c.toJSON()),
    //   nextColumnId,
    //   nextTaskId,
    //   activeFilters
    // }
    return {
      columns: this.#columns.map(col => col.toJSON()),
      nextColumnId: this.#nextColumnId,
      nextTaskId: this.#nextTaskId,
      activeFilters: this.getActiveFilters()
    };
  }

  loadFromJSON(data) {
    // TODO: Cargar columns (Column.fromJSON)
    // TODO: Cargar nextColumnId, nextTaskId
    // TODO: Cargar activeFilters si existe
    this.#columns = data.columns.map(col => Column.fromJSON(col));
    this.#nextColumnId = data.nextColumnId;
    this.#nextTaskId = data.nextTaskId;
    this.#activeFilters = data.activeFilters || {
      search: '',
      labels: [],
      priority: 'all'
    };
  }
}
