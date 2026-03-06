// ============================================
// BOARD VIEW (presentación)
// ============================================

import { Column } from './column.js';
import { Task } from './task.js';

export class BoardView {
  constructor(boardId, searchInputId, filtersId) {
    this.board = document.getElementById(boardId);
    this.searchInput = document.getElementById(searchInputId);
    this.filtersContainer = document.getElementById(filtersId);

    // Para drag & drop
    this.draggedTaskId = null;
    this.draggedFromColumnId = null;
  }

  // ==========================================
  // RENDERING - BOARD
  // ==========================================

  /**
   * Renderizar todas las columnas
   * @param {Column[]} columns 
   */
  renderBoard(columns) {
    // TODO: Si vacío → renderEmpty()
    // TODO: Mapear con renderColumn()
    // TODO: Agregar botón "Add Column" al final
    // TODO: Actualizar this.board.innerHTML
    if (columns.length === 0) {
      this.renderEmpty();
      return;
    }
    const columnsString = columns
      .map(col => this.renderColumn(col))
      .join('');
    const btnAgregarString =
      `<button id="btn-add-column" class="btn-add-column">
        ➕ Add Column
      </button>`;
    this.board.innerHTML = columnsString + btnAgregarString;
  }

  /**
   * Renderizar una columna
   * @param {Column} column 
   * @returns {string}
   */
  renderColumn(column) {
    // TODO: Retornar HTML de columna
    // Incluir:
    // - column-header con título y count
    // - tasks container con data-column-id
    // - renderizar cada task con renderTask()
    // - botón "Add Task"
    return `
    <div class="column" data-id="${column.id}">
      <div class="column-header">
        <div class="column-title">
          ${column.title}
          <span class="column-count">${column.getTasks().length}</span>
        </div>
        <button class="btn-delete-column">🗑️</button>
      </div>

      <div class="tasks" data-column-id="${column.id}">
        ${column.getTasks()
        .map(task => this.renderTask(task))
        .join('')}
      </div>

      <button class="btn-add-task">➕ Add Task</button>
    </div>`;
  }

  /**
   * Renderizar una task
   * @param {Task} task 
   * @returns {string}
   */
  renderTask(task) {
    // TODO: Retornar HTML de task-card
    // IMPORTANTE: draggable="true"
    // data-id="${task.id}"
    // Incluir:
    // - task-title (para edit inline)
    // - task-title-input (hidden)
    // - priority badge
    // - labels
    // - delete button
    return `
    <div class="task-card" draggable="true" data-id="${task.id}">
      <div class="task-header">
        <div class="task-title">${task.title}</div>
        <input 
          type="text" 
          class="task-title-input" 
          value="${task.title}"
        >
        <span class="task-priority ${task.priority}">${task.priority.at(0).toUpperCase() + task.priority.slice(1)}</span>
      </div>
      <div class="task-labels">
        ${task.labels
        .map(l => '<span class="task-label label-' + l + '">' + l + '</span>')
        .join('')}
      </div>
      <div class="task-footer">
        <button class="btn-delete-task">🗑️</button>
      </div>
    </div>`;
  }

  renderEmpty() {
    // TODO: Empty state
    this.board.innerHTML = `
    <div class="empty-state">
      <div class="empty-icon">📋</div>
      <h3 style="font-size: 1.2rem; color: #f1f5f9; margin-bottom: 8px;">
        No hay columnas todavía
      </h3>
      <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 20px;">
        Comenzá creando tu primera columna
      </p>
      <button 
        id="btn-add-column-empty" 
        style="
          padding: 10px 20px;
          background: #5865f2;
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 0.9rem;
          cursor: pointer;
          font-weight: 600;
        "
      >
        ➕ Crear Primera Columna
      </button>
    </div>`;
  }

  // ==========================================
  // RENDERING - FILTERS
  // ==========================================

  /**
   * Renderizar filtros de labels
   * @param {Object} activeLabels 
   */
  renderFilters(activeLabels) {
    // TODO: Renderizar botones de labels
    // Marcar activos según activeLabels array
    this.filtersContainer.innerHTML = `
      <div class="filter-label ${activeLabels.labels.length == 0 ? 'active' : ''}" data-label="all">Todas</div>
      <div class="filter-label ${activeLabels.labels.includes('bug') ? 'active' : ''}" data-label="bug">🐛 Bug</div>
      <div class="filter-label ${activeLabels.labels.includes('feature') ? 'active' : ''}" data-label="feature">✨ Feature</div>
      <select id="priority-filter" class="filter-select">
        <option value="all">Todas las prioridades</option>
        <option value="high">🔴 High</option>
        <option value="medium">🟡 Medium</option>
        <option value="low">🟢 Low</option>
      </select>`;
    requestAnimationFrame(() => {
      const select = this.filtersContainer.querySelector('#priority-filter');
      select.value = activeLabels.priority;
    });
  }

  // ==========================================
  // EDIT INLINE
  // ==========================================

  /**
   * Activar modo edición en una task
   * @param {string} taskId 
   */
  enableEditMode(taskId) {
    // TODO: Encontrar task-card por data-id
    // TODO: Ocultar .task-title (add class 'editing')
    // TODO: Mostrar .task-title-input (add class 'editing')
    // TODO: Focus en input
    // TODO: Seleccionar texto
    // Encontrar la task card
    const taskCard = this.board.querySelector(`[data-id="${taskId}"]`);
    if (!taskCard) return;

    // Obtener ambos elementos
    const titleDiv = taskCard.querySelector('.task-title');
    const titleInput = taskCard.querySelector('.task-title-input');

    // Toggle: ocultar div, mostrar input
    titleDiv.classList.add('editing');
    titleInput.classList.add('editing');

    // Focus en input y seleccionar texto
    titleInput.focus();
    titleInput.select();
  }

  /**
   * Desactivar modo edición
   * @param {string} taskId 
   */
  disableEditMode(taskId) {
    // TODO: Quitar clase 'editing' de ambos
    const taskCard = this.board.querySelector(`[data-id="${taskId}"]`);
    if (!taskCard) return;
    const titleDiv = taskCard.querySelector('.task-title');
    const titleInput = taskCard.querySelector('.task-title-input');
    titleDiv.classList.remove('editing');
    titleInput.classList.remove('editing');
  }

  /**
   * Obtener nuevo título del input
   * @param {string} taskId 
   * @returns {string}
   */
  getEditedTitle(taskId) {
    // TODO: Encontrar task-card
    // TODO: Obtener valor del input
    const taskCard = this.board.querySelector(`[data-id="${taskId}"]`);
    if (!taskCard) return;
    const titleInput = taskCard.querySelector('.task-title-input');
    return titleInput.value;
  }

  // ==========================================
  // DRAG & DROP
  // ==========================================

  setupDragAndDrop(onTaskMoved) {
    // TODO: Implementar drag & drop
    //
    // dragstart → guardar taskId y columnId
    // dragover → preventDefault
    // drop → llamar onTaskMoved(taskId, fromColumnId, toColumnId)
    //
    // HINTS:
    // - Escuchar eventos en this.board (delegation)
    // - e.target.closest('.task-card') para detectar task
    // - e.target.closest('.tasks') para detectar columna destino

    // ========================================
    // EVENTO 1: DRAGSTART
    // Se dispara cuando empezás a arrastrar
    // ========================================
    this.board.addEventListener('dragstart', (e) => {
      // ¿Estoy arrastrando una task card?
      const taskCard = e.target.closest('.task-card');
      if (!taskCard) return;

      // GUARDAR: ¿Qué task estoy arrastrando?
      this.draggedTaskId = taskCard.dataset.id;

      // GUARDAR: ¿De qué columna viene?
      const column = taskCard.closest('.column');
      this.draggedFromColumnId = column.dataset.id;

      // VISUAL: Agregar clase para opacidad
      taskCard.classList.add('dragging');

      console.log(`📦 Arrastrando: ${this.draggedTaskId} desde ${this.draggedFromColumnId}`);
    });

    // ========================================
    // EVENTO 2: DRAGOVER
    // Se dispara CONSTANTEMENTE mientras arrastrás
    // ========================================
    this.board.addEventListener('dragover', (e) => {
      // CRÍTICO: Sin esto, el navegador NO permite soltar
      e.preventDefault();

      // Opcional: Agregar feedback visual
      const tasksContainer = e.target.closest('.tasks');
      if (tasksContainer) {
        tasksContainer.classList.add('drag-over');
      }
    });

    // ========================================
    // EVENTO 3: DRAGLEAVE
    // Se dispara cuando salís de una zona
    // ========================================
    this.board.addEventListener('dragleave', (e) => {
      // Quitar feedback visual
      const tasksContainer = e.target.closest('.tasks');
      if (tasksContainer) {
        tasksContainer.classList.remove('drag-over');
      }
    });

    // ========================================
    // EVENTO 4: DROP
    // Se dispara cuando SOLTÁS el mouse
    // ========================================
    this.board.addEventListener('drop', (e) => {
      e.preventDefault();

      // Quitar feedback visual
      const tasksContainer = e.target.closest('.tasks');
      if (tasksContainer) {
        tasksContainer.classList.remove('drag-over');
      }

      // ¿Soltaste sobre una zona de tasks válida?
      if (!tasksContainer) return;

      // OBTENER: ¿En qué columna soltaste?
      const toColumnId = tasksContainer.dataset.columnId;

      console.log(`📍 Soltado en columna: ${toColumnId}`);

      // Si tenés una task arrastrándose Y es diferente columna → MOVER
      if (this.draggedTaskId && this.draggedFromColumnId !== toColumnId) {
        console.log(`✅ Moviendo de ${this.draggedFromColumnId} a ${toColumnId}`);
        onTaskMoved(this.draggedTaskId, this.draggedFromColumnId, toColumnId);
      }
    });

    // ========================================
    // EVENTO 5: DRAGEND
    // Se dispara cuando el arrastre TERMINA
    // (soltaste O cancelaste con ESC)
    // ========================================
    this.board.addEventListener('dragend', (e) => {
      const taskCard = e.target.closest('.task-card');

      // LIMPIAR clase visual
      if (taskCard) {
        taskCard.classList.remove('dragging');
      }

      // LIMPIAR variables temporales
      this.draggedTaskId = null;
      this.draggedFromColumnId = null;

      console.log('🏁 Arrastre terminado');
    });
  }

  // ==========================================
  // EVENTS
  // ==========================================

  /**
   * callback();
   */
  onAddColumn(callback) {
    // TODO: Click en #btn-add-column
    this.board.addEventListener('click', (e) => {
      // Botón normal (cuando hay columnas)
      if (e.target.id === 'btn-add-column') {
        callback();
        return;
      }

      // Botón del empty state (cuando no hay columnas)
      if (e.target.id === 'btn-add-column-empty') {
        callback();
        return;
      }
    });
  }

  /**
   * callback(columnId);
   */
  onDeleteColumn(callback) {
    // TODO: Event delegation en .btn-delete-column
    this.board.addEventListener('click', (event) => {
      const btnDeletColumn = event.target.closest('.btn-delete-column');
      if (!btnDeletColumn) return;
      const column = btnDeletColumn.closest('.column');
      if (!column) return;
      const columnId = column.dataset.id;
      callback(columnId);
    });
  }

  /**
   * callback(colId);
   */
  onAddTask(callback) {
    // TODO: Event delegation en .btn-add-task
    // Obtener columnId del closest('.column')
    this.board.addEventListener('click', (event) => {
      const btnAddTask = event.target.closest('.btn-add-task');
      if (!btnAddTask) return;
      const colId = event.target.closest('.column').dataset.id;
      console.warn(`Agregar Task a Col ${colId}`);
      callback(colId);
    });
  }

  /**
   * callback(taskId)
   */
  onDeleteTask(callback) {
    // TODO: Event delegation en .btn-delete-task
    this.board.addEventListener('click', (event) => {
      const btnDeleteTask = event.target.closest('.btn-delete-task');
      if (!btnDeleteTask) return;
      const id = btnDeleteTask.closest('.task-card').dataset.id
      callback(id);
    });
  }

  /**
   * callback(taskId);
   */
  onTaskDoubleClick(callback) {
    // TODO: Event delegation: dblclick en .task-title
    // Obtener taskId
    // Llamar callback(taskId)
    this.board.addEventListener('dblclick', (event) => {
      const title = event.target.closest('.task-title');
      if (!title) return;
      const taskId = event.target.closest('.task-card').dataset.id;
      callback(taskId);
    });
  }

  /**
   * callback(taskId, newTitle);
   */
  onTaskEditBlur(callback) {
    // TODO: Escuchar blur en .task-title-input
    // Obtener taskId y nuevo título
    // Llamar callback(taskId, newTitle)

    this.board.addEventListener('blur', (e) => {
      // ¿El elemento que perdió foco es un input de edición?
      const input = e.target.closest('.task-title-input');
      if (!input) return;

      // OBTENER: ¿Qué task se está editando?
      const taskCard = input.closest('.task-card');
      if (!taskCard) return;

      const taskId = taskCard.dataset.id;

      // OBTENER: ¿Cuál es el nuevo título?
      const newTitle = input.value.trim();

      // Si está vacío, no guardar
      if (!newTitle) {
        console.log('⚠️ Título vacío, no guardando');
        return;
      }

      console.log(`💾 Guardando cambios: ${taskId} → "${newTitle}"`);

      // LLAMAR al callback con los datos
      callback(taskId, newTitle);

    }, true);  // ← IMPORTANTE: true = capture phase
  }

  /**
   * callback(taskId, newTitle);
   */
  onTaskEditEnter(callback) {
    // TODO: Escuchar keydown (Enter) en .task-title-input
    this.board.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') return;
      const input = event.target.closest('.task-title-input');
      if (!input) return;
      event.preventDefault();
      const taskCard = input.closest('.task-card');
      if (!taskCard) return;
      const taskId = taskCard.dataset.id;
      const newTitle = input.value.trim();

      if (!newTitle) {
        console.warn('Título vacío, no guardando');
        return;
      }

      callback(taskId, newTitle);
    });
  }

  /**
   * callback(query)
   */
  onSearch(callback) {
    // TODO: Input event en search-input
    // Usar debounce (300ms)
    let timeoutId = null;
    this.searchInput.addEventListener('input', () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const query = this.searchInput.value.trim();
        callback(query);
      }, 300);
    });
  }

  /**
   * callback(dataLabel)
   */
  onLabelFilterClick(callback) {
    // TODO: Event delegation en .filter-label
    this.filtersContainer.addEventListener('click', (event) => {
      const btnLabel = event.target.closest('.filter-label');
      if (!btnLabel) return;
      const dataLabel = btnLabel.dataset.label;
      if (dataLabel === 'all') {
        callback('');
        return;
      }
      callback(dataLabel);
    });
  }

  /**
   * callback(priority)
   */
  onPriorityFilterChange(callback) {
    // TODO: Change event en #priority-filter
    this.filtersContainer.addEventListener('change', (e) => {
      // ¿El elemento que cambió es el priority filter?
      if (e.target.id === 'priority-filter') {
        const priority = e.target.value;
        callback(priority);
      }
    });
  }
}
