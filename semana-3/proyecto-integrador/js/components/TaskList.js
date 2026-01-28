// ============================================
// TASK LIST COMPONENT
// Renderiza lista completa de tareas
// ============================================

import { TaskCard } from './TaskCard.js';

export class TaskList {
  constructor(containerId) {
    // Contenedor donde se renderiza la lista
    this.container = document.getElementById(containerId);

    if (!this.container) {
      throw new Error(`Contenedor no encontrado: ${containerId}`);
    }

    // Instancia de TaskCard para renderizar cada tarea
    this.taskCard = new TaskCard();

    // Estado actual de filtros
    this.currentFilter = {
      status: 'all',
      category: 'all',
      search: '',
      sort: 'date'
    };
  }

  /**
   * Renderizar todas las tareas
   * @param {Array<Task>} tasks - Array de tareas
   */
  renderAll(tasks) {
    // Si no hay tareas, mostrar estado vacío
    if (!tasks || tasks.length === 0) {
      this.renderEmpty();
      return;
    }

    // Generar HTML de todas las tareas
    const html = tasks
      .map(task => this.taskCard.render(task))
      .join('');

    // Actualizar DOM
    this.container.innerHTML = html;

    // Setup event listeners (delegación de eventos)
    this.setupEventListeners();
  }

  /**
   * Renderizar estado vacío
   */
  renderEmpty() {
    this.container.innerHTML = `
      <div class="empty-state">
        <h3>📭 No hay tareas</h3>
        <p>Crea tu primera tarea usando el formulario de arriba</p>
      </div>
    `;
  }

  /**
   * Setup event listeners con delegación
   */
  setupEventListeners() {
    // Event delegation: un solo listener en el contenedor
    this.container.addEventListener('click', (e) => {
      // Buscar elemento con data-action
      const actionElement = e.target.closest('[data-action]');

      if (!actionElement) return;

      // Obtener acción y task card
      const action = actionElement.dataset.action;
      const taskCard = actionElement.closest('.task-card');
      const taskId = taskCard?.dataset.id;

      if (!taskId) return;

      // Disparar custom event según acción
      const event = new CustomEvent('taskAction', {
        detail: { action, taskId },
        bubbles: true
      });

      this.container.dispatchEvent(event);
    });

    // Event listener para checkboxes (change event)
    this.container.addEventListener('change', (e) => {
      if (e.target.classList.contains('task-checkbox')) {
        const taskCard = e.target.closest('.task-card');
        const taskId = taskCard?.dataset.id;

        if (taskId) {
          const event = new CustomEvent('taskAction', {
            detail: { action: 'toggle', taskId },
            bubbles: true
          });

          this.container.dispatchEvent(event);
        }
      }
    });
  }

  /**
   * Limpiar lista
   */
  clear() {
    this.container.innerHTML = '';
  }

  /**
   * Actualizar filtro actual
   * @param {Object} filter - Filtro a aplicar
   */
  updateFilter(filter) {
    this.currentFilter = { ...this.currentFilter, ...filter };
  }
}
