// ============================================
// BOARD CONTROLLER (coordinación)
// ============================================

import { BoardModel } from './board-model.js';
import { BoardView } from './board-view.js';

const STORAGE_KEY = 'APP:kanban';

export class BoardController {
  constructor(model, view) {
    /** @type {BoardModel} */
    this.model = model;
    /** @type {BoardView} */
    this.view = view;

    // TODO: Suscribirse al model
    this.model.subscribe(() => { this.updateView() });

    // TODO: Setup listeners del view
    this.view.onAddColumn(() => { this.addColumn() });
    this.view.onDeleteColumn((colId) => { this.deleteColumn(colId) });

    this.view.onAddTask((colId) => { this.addTask(colId) });
    this.view.onDeleteTask((taskId) => { this.deleteTask(taskId) });
    this.view.onTaskDoubleClick((taskId) => { this.startEditTask(taskId) });
    this.view.onTaskEditBlur((taskId, newTitle) => { this.saveEditTask(taskId, newTitle) });
    this.view.onTaskEditEnter((taskId, newTitle) => { this.saveEditTask(taskId, newTitle) });

    // Listeners de FILTERS
    this.view.onSearch((query) => {
      this.searchTasks(query);
    });
    this.view.onLabelFilterClick((label) => {
      this.toggleLabelFilter(label);
    });
    this.view.onPriorityFilterChange((priority) => {
      this.setPriorityFilter(priority);
    });

    // TODO: Setup drag & drop
    this.view.setupDragAndDrop((taskId, fromColumnId, toColumnId) => {
      this.moveTask(taskId, fromColumnId, toColumnId);
    });

    this.load();
    this.updateView();
  }

  // ==========================================
  // ACTIONS - COLUMNS
  // ==========================================

  addColumn() {
    // TODO: Pedir título con prompt
    // TODO: model.addColumn(title)
    const titulo = prompt("Titulo de nueva columna");
    if (!titulo || titulo === '') return;
    this.model.addColumn(titulo.trim());
  }

  deleteColumn(columnId) {
    // TODO: Confirmar
    // TODO: model.removeColumn(columnId)
    if (confirm(`Eliminar Col ${columnId}?`)) {
      this.model.removeColumn(columnId);
    }
  }

  // ==========================================
  // ACTIONS - TASKS
  // ==========================================

  addTask(columnId) {
    // TODO: Pedir datos con prompts
    //   - title
    //   - priority (select entre high/medium/low)
    //   - labels (input separado por comas)
    // TODO: model.addTask(columnId, title, priority, labels)
    const title = prompt('Titulo de la Task');
    const priority = prompt('Priority: high/medium/low');
    const labelsString = prompt('Labels separados por comas');
    const labels = labelsString.split(',').map(e => e.trim());
    this.model.addTask(columnId, title, priority, labels);
  }

  deleteTask(taskId) {
    // TODO: Confirmar
    // TODO: model.removeTask(taskId)
    if (confirm(`Eliminar Task id: ${taskId}`)) {
      this.model.removeTask(taskId);
    }
  }

  moveTask(taskId, fromColumnId, toColumnId) {
    // TODO: model.moveTask(taskId, fromColumnId, toColumnId)
    this.model.moveTask(taskId, fromColumnId, toColumnId);
  }

  startEditTask(taskId) {
    // TODO: view.enableEditMode(taskId)
    this.view.enableEditMode(taskId);
  }

  saveEditTask(taskId, newTitle) {
    // TODO: model.updateTask(taskId, { title: newTitle })
    // TODO: view.disableEditMode(taskId)
    this.model.updateTask(taskId, { title: newTitle });
    this.view.disableEditMode(taskId);
  }

  // ==========================================
  // ACTIONS - FILTERS
  // ==========================================

  searchTasks(query) {
    // TODO: model.setSearchFilter(query)
    this.model.setSearchFilter(query);
  }

  toggleLabelFilter(label) {
    // TODO: model.toggleLabelFilter(label)
    if (!label || label === 'all') {
      this.model.clearLabelFilters();
    } else {
      // Si no → toggle normal
      this.model.toggleLabelFilter(label);
    }
  }

  setPriorityFilter(priority) {
    // TODO: model.setPriorityFilter(priority)
    this.model.setPriorityFilter(priority);
  }

  // ==========================================
  // VIEW UPDATE
  // ==========================================

  updateView() {
    // TODO: Obtener columnas filtradas
    // TODO: view.renderBoard(filteredColumns)
    // TODO: view.renderFilters(activeFilters.labels)
    const columns = this.model.getFilteredColumns();
    this.view.renderBoard(columns);
    const activeFilters = this.model.getActiveFilters();
    this.view.renderFilters(activeFilters);
  }

  // ==========================================
  // PERSISTENCE
  // ==========================================

  save() {
    // TODO: localStorage
    const modelSave = this.model.toJSON();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(modelSave));
  }

  load() {
    // TODO: localStorage
    const dataString = localStorage.getItem(STORAGE_KEY);
    if (!dataString) return;

    // Parsear JSON
    const data = JSON.parse(dataString);

    // Cargar en el model EXISTENTE (no crear uno nuevo)
    this.model.loadFromJSON(data);
  }
}