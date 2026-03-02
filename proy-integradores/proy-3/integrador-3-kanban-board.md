# 📋 PROYECTO INTEGRADOR 3: Kanban Board

**Duración:** 3 días máximo  
**Nivel:** Medio-Alto (integrador 3 de 5)  
**Objetivo:** Integrar MVC + Drag&Drop + Edit inline + Relaciones entre datos + Filtros múltiples

---

## ⏰ GOVERNOR

- 📅 **Día 1:** Core MVC (columns, tasks, move tasks básico)
- 📅 **Día 2:** Drag & Drop + Edit inline + Labels
- 📅 **Día 3:** Filtros múltiples + Stats + Polish
- ✅ **80% funcional = Suficiente**
- 🚫 **Máximo 2 iteraciones**

---

## 🎯 ¿QUÉ VAS A CONSTRUIR?

Un tablero Kanban estilo Trello:
- Múltiples columnas (To Do, In Progress, Done, etc.)
- Tasks que se mueven entre columnas
- Drag & drop para mover tasks
- Edit inline (doble click para editar)
- Labels de colores
- Filtro por label, búsqueda, prioridad
- Estadísticas por columna

```
┌──────────────────────────────────────────────────────────┐
│  📋 KANBAN BOARD                    [🔍 Search] [Filter] │
├──────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │
│  │ TO DO (3)   │ │ IN PROGRESS │ │ DONE (5)    │        │
│  ├─────────────┤ ├─────────────┤ ├─────────────┤        │
│  │ ┌─────────┐ │ │ ┌─────────┐ │ │ ┌─────────┐ │        │
│  │ │ Task 1  │ │ │ │ Task 4  │ │ │ │ Task 6  │ │        │
│  │ │ 🔴 High │ │ │ │ 🟡 Med  │ │ │ │ ✓       │ │        │
│  │ │ #bug    │ │ │ │ #feat   │ │ │ └─────────┘ │        │
│  │ └─────────┘ │ │ └─────────┘ │ │             │        │
│  │ ┌─────────┐ │ │             │ │ ┌─────────┐ │        │
│  │ │ Task 2  │ │ │             │ │ │ Task 7  │ │        │
│  │ │ 🟢 Low  │ │ │             │ │ │ ✓       │ │        │
│  │ └─────────┘ │ │             │ │ └─────────┘ │        │
│  │             │ │             │ │             │        │
│  │ [+ Add]     │ │ [+ Add]     │ │ [+ Add]     │        │
│  └─────────────┘ └─────────────┘ └─────────────┘        │
│  [➕ Add Column]                                         │
└──────────────────────────────────────────────────────────┘
```

**Features clave:**
- Arrastrar tasks entre columnas
- Doble click en task → editar inline
- Labels con colores
- Filtrar por label, prioridad, búsqueda
- Stats: tasks por columna, % completado

---

## 🆕 COMPLEJIDAD AÑADIDA (vs Integrador 2)

### **1. Relaciones entre datos**
```javascript
Board
  └─ Columns[]
       └─ Tasks[]
```

Una task pertenece a una columna. Cuando la movés, cambia de columna.

### **2. Drag & Drop API nativo**
```javascript
// dragstart → guardar taskId
// dragover → prevenir default
// drop → mover task a nueva columna
```

### **3. Edit inline**
```javascript
// Doble click → convertir texto a input
// Enter/Blur → guardar cambios
```

### **4. Múltiples filtros simultáneos**
```javascript
// Filtrar por: label AND prioridad AND búsqueda
// Aplicar todos los filtros a la vez
```

### **5. Estado más complejo**
```javascript
// activeFilters = { labels: [], priority: '', search: '' }
// Coordinar múltiples vistas
```

---

## 📅 CRONOGRAMA

### DÍA 1: Core MVC
1. Column y Task models
2. BoardModel con CRUD de columns y tasks
3. BoardView renderiza columns y tasks
4. Add/Remove columns
5. Add/Remove tasks
6. Move task básico (botones up/down)
7. localStorage

**Checkpoint día 1:** Puedo crear columnas, agregar tasks, moverlas con botones.

### DÍA 2: Drag & Drop + Edit + Labels
1. Implementar Drag & Drop API
2. Edit inline en tasks (doble click)
3. Sistema de labels
4. Asignar/quitar labels a tasks
5. Prioridades (High, Medium, Low)

**Checkpoint día 2:** Drag & drop funciona, puedo editar tasks inline, labels funcionan.

### DÍA 3: Filtros + Stats + Polish
1. Búsqueda por texto
2. Filtro por label (múltiples)
3. Filtro por prioridad
4. Stats por columna
5. Testing completo
6. Polish visual

**Checkpoint día 3:** Todos los filtros funcionan, stats se muestran, app pulida.

---

## ✅ FEATURES MVP

**Must Have:**
- [ ] Crear/eliminar columnas
- [ ] Crear/eliminar tasks
- [ ] Mover tasks entre columnas (drag & drop)
- [ ] Edit inline de tasks
- [ ] Labels con colores
- [ ] Asignar labels a tasks
- [ ] Prioridades (High, Medium, Low)
- [ ] Búsqueda por texto
- [ ] Filtro por label
- [ ] Filtro por prioridad
- [ ] Stats básicas (count por columna)
- [ ] localStorage completo

**Nice to Have (si sobra tiempo):**
- [ ] Archivar columna
- [ ] Duplicar task
- [ ] Reordenar columnas (drag)
- [ ] Due dates

---

## 🎯 PATRONES QUE APLICÁS

**1. MVC con relaciones** → Column has many Tasks  
**2. Observer** → Multiple views update on change  
**3. Drag & Drop API** → Native browser API  
**4. Edit Inline Pattern** → Convert text to input on demand  
**5. Filter Pipeline** → Apply multiple filters in sequence  
**6. Composite Pattern** → Board → Columns → Tasks (tree structure)  

---

## 💻 HTML/CSS BASE

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kanban Board</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #0f172a;
      color: #e2e8f0;
      min-height: 100vh;
      padding: 20px;
    }

    .container {
      max-width: 1600px;
      margin: 0 auto;
    }

    /* Header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid #1e293b;
    }

    .header h1 {
      font-size: 1.8rem;
      color: #fff;
    }

    .header-controls {
      display: flex;
      gap: 12px;
    }

    .search-box {
      position: relative;
    }

    .search-input {
      padding: 8px 36px 8px 12px;
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 8px;
      color: #e2e8f0;
      font-size: 0.9rem;
      width: 240px;
    }

    .search-input:focus {
      outline: none;
      border-color: #3b82f6;
    }

    .search-icon {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #64748b;
    }

    /* Filters */
    .filters {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .filter-label {
      padding: 6px 12px;
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 20px;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .filter-label:hover {
      border-color: #3b82f6;
    }

    .filter-label.active {
      background: #3b82f6;
      border-color: #3b82f6;
      color: white;
    }

    .filter-select {
      padding: 6px 12px;
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 8px;
      color: #e2e8f0;
      font-size: 0.85rem;
      cursor: pointer;
    }

    /* Board */
    .board {
      display: flex;
      gap: 16px;
      overflow-x: auto;
      padding-bottom: 20px;
    }

    .board::-webkit-scrollbar {
      height: 8px;
    }

    .board::-webkit-scrollbar-track {
      background: #1e293b;
      border-radius: 4px;
    }

    .board::-webkit-scrollbar-thumb {
      background: #475569;
      border-radius: 4px;
    }

    /* Column */
    .column {
      flex-shrink: 0;
      width: 300px;
      background: #1e293b;
      border-radius: 12px;
      padding: 16px;
    }

    .column-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid #334155;
    }

    .column-title {
      font-size: 0.95rem;
      font-weight: 600;
      color: #f1f5f9;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .column-count {
      background: #334155;
      color: #94a3b8;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .btn-delete-column {
      background: none;
      border: none;
      color: #64748b;
      cursor: pointer;
      font-size: 1rem;
      padding: 4px;
      border-radius: 4px;
    }

    .btn-delete-column:hover {
      background: #334155;
      color: #ef4444;
    }

    /* Tasks */
    .tasks {
      min-height: 100px;
      margin-bottom: 12px;
    }

    .task-card {
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 8px;
      cursor: grab;
      transition: all 0.2s;
    }

    .task-card:hover {
      border-color: #3b82f6;
      box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
    }

    .task-card.dragging {
      opacity: 0.5;
      cursor: grabbing;
    }

    .task-card.drag-over {
      border-color: #10b981;
      border-style: dashed;
    }

    .task-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 8px;
    }

    .task-title {
      flex: 1;
      font-size: 0.9rem;
      color: #f1f5f9;
      font-weight: 500;
      line-height: 1.4;
    }

    .task-title.editing {
      display: none;
    }

    .task-title-input {
      display: none;
      width: 100%;
      padding: 4px 8px;
      background: #1e293b;
      border: 1px solid #3b82f6;
      border-radius: 4px;
      color: #f1f5f9;
      font-size: 0.9rem;
      font-family: inherit;
    }

    .task-title-input.editing {
      display: block;
    }

    .task-priority {
      font-size: 0.75rem;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 600;
      white-space: nowrap;
    }

    .task-priority.high {
      background: #7f1d1d;
      color: #fca5a5;
    }

    .task-priority.medium {
      background: #713f12;
      color: #fbbf24;
    }

    .task-priority.low {
      background: #14532d;
      color: #86efac;
    }

    .task-labels {
      display: flex;
      gap: 4px;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }

    .task-label {
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.7rem;
      font-weight: 600;
    }

    .label-bug { background: #7f1d1d; color: #fca5a5; }
    .label-feature { background: #1e3a8a; color: #93c5fd; }
    .label-enhancement { background: #312e81; color: #c4b5fd; }
    .label-documentation { background: #14532d; color: #86efac; }

    .task-footer {
      display: flex;
      justify-content: flex-end;
    }

    .btn-delete-task {
      background: none;
      border: none;
      color: #64748b;
      cursor: pointer;
      font-size: 0.85rem;
      padding: 4px;
    }

    .btn-delete-task:hover {
      color: #ef4444;
    }

    /* Add buttons */
    .btn-add-task {
      width: 100%;
      padding: 10px;
      background: #334155;
      border: none;
      border-radius: 8px;
      color: #94a3b8;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-add-task:hover {
      background: #3b82f6;
      color: white;
    }

    .btn-add-column {
      flex-shrink: 0;
      width: 300px;
      height: 120px;
      background: #1e293b;
      border: 2px dashed #334155;
      border-radius: 12px;
      color: #64748b;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
    }

    .btn-add-column:hover {
      border-color: #3b82f6;
      color: #3b82f6;
    }

    /* Empty state */
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #64748b;
    }

    .empty-icon {
      font-size: 3rem;
      margin-bottom: 16px;
    }
  </style>
</head>
<body>
  <div class="container">

    <!-- Header -->
    <div class="header">
      <h1>📋 Kanban Board</h1>
      <div class="header-controls">
        <div class="search-box">
          <input 
            type="text" 
            id="search-input" 
            class="search-input"
            placeholder="Buscar tasks..."
          >
          <span class="search-icon">🔍</span>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div id="filters" class="filters">
      <!-- Se renderiza dinámicamente -->
      <div class="filter-label active" data-label="all">Todas</div>
      <div class="filter-label" data-label="bug">🐛 Bug</div>
      <div class="filter-label" data-label="feature">✨ Feature</div>
      <select id="priority-filter" class="filter-select">
        <option value="all">Todas las prioridades</option>
        <option value="high">🔴 High</option>
        <option value="medium">🟡 Medium</option>
        <option value="low">🟢 Low</option>
      </select>
    </div>

    <!-- Board -->
    <div id="board" class="board">
      <!-- Se renderiza dinámicamente -->

      <!-- EJEMPLO de estructura (no funcional) -->
      <div class="column" data-id="col-1">
        <div class="column-header">
          <div class="column-title">
            To Do
            <span class="column-count">3</span>
          </div>
          <button class="btn-delete-column">🗑️</button>
        </div>

        <div class="tasks" data-column-id="col-1">
          <!-- Task 1 -->
          <div class="task-card" draggable="true" data-id="task-1">
            <div class="task-header">
              <div class="task-title">Fix login bug</div>
              <span class="task-priority high">High</span>
            </div>
            <div class="task-labels">
              <span class="task-label label-bug">bug</span>
            </div>
            <div class="task-footer">
              <button class="btn-delete-task">🗑️</button>
            </div>
          </div>

          <!-- Task 2 -->
          <div class="task-card" draggable="true" data-id="task-2">
            <div class="task-header">
              <div class="task-title">Add dark mode</div>
              <span class="task-priority medium">Med</span>
            </div>
            <div class="task-labels">
              <span class="task-label label-feature">feature</span>
            </div>
            <div class="task-footer">
              <button class="btn-delete-task">🗑️</button>
            </div>
          </div>
        </div>

        <button class="btn-add-task">➕ Add Task</button>
      </div>

      <!-- Add Column Button -->
      <button id="btn-add-column" class="btn-add-column">
        ➕ Add Column
      </button>
    </div>

  </div>

  <script type="module" src="app.js"></script>
</body>
</html>
```

---

## 🔨 PLANTILLAS DE CLASES

### **task.js**

```javascript
// ============================================
// TASK (modelo de datos)
// ============================================

export class Task {
  /**
   * @param {string} id
   * @param {string} title
   * @param {string} priority - 'high' | 'medium' | 'low'
   * @param {string[]} labels - ['bug', 'feature', etc.]
   */
  constructor(id, title, priority = 'medium', labels = []) {
    // TODO: Asignar propiedades
  }

  toJSON() {
    // TODO: Retornar objeto plano
  }

  static fromJSON(json) {
    // TODO: Crear Task desde objeto
  }
}
```

---

### **column.js**

```javascript
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
  }

  /**
   * Agregar task a esta columna
   */
  addTask(task) {
    // TODO: Push task
  }

  /**
   * Remover task por ID
   */
  removeTask(taskId) {
    // TODO: Filtrar tasks
  }

  /**
   * Obtener task por ID
   */
  getTask(taskId) {
    // TODO: Find task
  }

  /**
   * Obtener todas las tasks
   */
  getTasks() {
    // TODO: Retornar copia
  }

  toJSON() {
    // TODO: Incluir tasks.map(t => t.toJSON())
  }

  static fromJSON(json) {
    // TODO: Crear Column con Task.fromJSON() para cada task
  }
}
```

---

### **board-model.js**

```javascript
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
  }

  notify() {
    // TODO: Implementar
  }

  // ==========================================
  // COLUMNS
  // ==========================================

  addColumn(title) {
    // TODO: Crear Column con id = `col-${this.#nextColumnId}`
    // TODO: Incrementar #nextColumnId
    // TODO: Push a #columns
    // TODO: notify()
  }

  removeColumn(columnId) {
    // TODO: Filtrar #columns
    // TODO: notify()
  }

  getColumn(columnId) {
    // TODO: Find column
  }

  getAllColumns() {
    // TODO: Retornar copia
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
  }

  /**
   * Eliminar task (buscar en todas las columnas)
   */
  removeTask(taskId) {
    // TODO: Iterar columns
    // TODO: Intentar removeTask en cada una
    // TODO: notify()
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
  }

  /**
   * Actualizar task (edit inline)
   */
  updateTask(taskId, updates) {
    // TODO: Buscar task en todas las columnas
    // TODO: Aplicar updates (Object.assign o spread)
    // TODO: notify()
  }

  // ==========================================
  // FILTERS
  // ==========================================

  setSearchFilter(query) {
    // TODO: Guardar en #activeFilters.search
    // TODO: notify()
  }

  toggleLabelFilter(label) {
    // TODO: Si está en array → quitar
    // TODO: Si no está → agregar
    // TODO: notify()
  }

  setPriorityFilter(priority) {
    // TODO: Guardar en #activeFilters.priority
    // TODO: notify()
  }

  getActiveFilters() {
    // TODO: Retornar copia de #activeFilters
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
  }

  loadFromJSON(data) {
    // TODO: Cargar columns (Column.fromJSON)
    // TODO: Cargar nextColumnId, nextTaskId
    // TODO: Cargar activeFilters si existe
  }
}
```

---

### **board-view.js**

```javascript
// ============================================
// BOARD VIEW (presentación)
// ============================================

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
   */
  renderBoard(columns) {
    // TODO: Si vacío → renderEmpty()
    // TODO: Mapear con renderColumn()
    // TODO: Agregar botón "Add Column" al final
    // TODO: Actualizar this.board.innerHTML
  }

  /**
   * Renderizar una columna
   */
  renderColumn(column) {
    // TODO: Retornar HTML de columna
    // Incluir:
    // - column-header con título y count
    // - tasks container con data-column-id
    // - renderizar cada task con renderTask()
    // - botón "Add Task"
  }

  /**
   * Renderizar una task
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
  }

  renderEmpty() {
    // TODO: Empty state
  }

  // ==========================================
  // RENDERING - FILTERS
  // ==========================================

  /**
   * Renderizar filtros de labels
   */
  renderFilters(activeLabels) {
    // TODO: Renderizar botones de labels
    // Marcar activos según activeLabels array
  }

  // ==========================================
  // EDIT INLINE
  // ==========================================

  /**
   * Activar modo edición en una task
   */
  enableEditMode(taskId) {
    // TODO: Encontrar task-card por data-id
    // TODO: Ocultar .task-title (add class 'editing')
    // TODO: Mostrar .task-title-input (add class 'editing')
    // TODO: Focus en input
    // TODO: Seleccionar texto
  }

  /**
   * Desactivar modo edición
   */
  disableEditMode(taskId) {
    // TODO: Quitar clase 'editing' de ambos
  }

  /**
   * Obtener nuevo título del input
   */
  getEditedTitle(taskId) {
    // TODO: Encontrar task-card
    // TODO: Obtener valor del input
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
  }

  // ==========================================
  // EVENTS
  // ==========================================

  onAddColumn(callback) {
    // TODO: Click en #btn-add-column
  }

  onDeleteColumn(callback) {
    // TODO: Event delegation en .btn-delete-column
  }

  onAddTask(callback) {
    // TODO: Event delegation en .btn-add-task
    // Obtener columnId del closest('.column')
  }

  onDeleteTask(callback) {
    // TODO: Event delegation en .btn-delete-task
  }

  onTaskDoubleClick(callback) {
    // TODO: Event delegation: dblclick en .task-title
    // Obtener taskId
    // Llamar callback(taskId)
  }

  onTaskEditBlur(callback) {
    // TODO: Escuchar blur en .task-title-input
    // Obtener taskId y nuevo título
    // Llamar callback(taskId, newTitle)
  }

  onTaskEditEnter(callback) {
    // TODO: Escuchar keydown (Enter) en .task-title-input
  }

  onSearch(callback) {
    // TODO: Input event en search-input
    // Usar debounce (300ms)
  }

  onLabelFilterClick(callback) {
    // TODO: Event delegation en .filter-label
  }

  onPriorityFilterChange(callback) {
    // TODO: Change event en #priority-filter
  }
}
```

---

### **board-controller.js**

```javascript
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
    // TODO: Setup listeners del view
    // TODO: Setup drag & drop
    
    this.load();
    this.updateView();
  }

  // ==========================================
  // ACTIONS - COLUMNS
  // ==========================================

  addColumn() {
    // TODO: Pedir título con prompt
    // TODO: model.addColumn(title)
  }

  deleteColumn(columnId) {
    // TODO: Confirmar
    // TODO: model.removeColumn(columnId)
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
  }

  deleteTask(taskId) {
    // TODO: Confirmar
    // TODO: model.removeTask(taskId)
  }

  moveTask(taskId, fromColumnId, toColumnId) {
    // TODO: model.moveTask(taskId, fromColumnId, toColumnId)
  }

  startEditTask(taskId) {
    // TODO: view.enableEditMode(taskId)
  }

  saveEditTask(taskId, newTitle) {
    // TODO: model.updateTask(taskId, { title: newTitle })
    // TODO: view.disableEditMode(taskId)
  }

  // ==========================================
  // ACTIONS - FILTERS
  // ==========================================

  searchTasks(query) {
    // TODO: model.setSearchFilter(query)
  }

  toggleLabelFilter(label) {
    // TODO: model.toggleLabelFilter(label)
  }

  setPriorityFilter(priority) {
    // TODO: model.setPriorityFilter(priority)
  }

  // ==========================================
  // VIEW UPDATE
  // ==========================================

  updateView() {
    // TODO: Obtener columnas filtradas
    // TODO: view.renderBoard(filteredColumns)
    // TODO: view.renderFilters(activeFilters.labels)
  }

  // ==========================================
  // PERSISTENCE
  // ==========================================

  save() {
    // TODO: localStorage
  }

  load() {
    // TODO: localStorage
  }
}
```

---

### **app.js**

```javascript
// ============================================
// APP - ENTRY POINT
// ============================================

import { BoardModel } from './board-model.js';
import { BoardView } from './board-view.js';
import { BoardController } from './board-controller.js';

const model = new BoardModel();
const view = new BoardView('board', 'search-input', 'filters');
const controller = new BoardController(model, view);

// Auto-save
model.subscribe(() => {
  controller.save();
});
```

---

## 🏗️ ARQUITECTURA

```
┌────────────────────────────────────────┐
│        BOARD CONTROLLER                │
│  - addColumn() / deleteColumn()        │
│  - addTask() / deleteTask()            │
│  - moveTask() (drag & drop)            │
│  - startEditTask() / saveEditTask()    │
│  - searchTasks()                       │
│  - toggleLabelFilter()                 │
└──────┬──────────────────┬──────────────┘
       │                  │
       ↓                  ↓
┌──────────────┐   ┌──────────────────┐
│ BOARD MODEL  │   │   BOARD VIEW     │
│              │   │                  │
│ - #columns[] │   │ - renderBoard()  │
│ - #filters   │   │ - renderColumn() │
│ - addColumn()│   │ - renderTask()   │
│ - addTask()  │   │ - enableEdit()   │
│ - moveTask() │   │ - setupDrag()    │
│ - getFiltered│   │ - onAddTask()    │
│   Columns()  │   │ - onSearch()     │
└──────────────┘   └──────────────────┘
       │
       ↓
┌──────────────┐
│   COLUMN     │
│ - #tasks[]   │
│ - addTask()  │
│ - removeTask │
└──────────────┘
       │
       ↓
┌──────────────┐
│    TASK      │
│ - id, title  │
│ - priority   │
│ - labels[]   │
└──────────────┘
```

---

## ✅ CHECKLIST

**Día 1:**
- [ ] Column y Task models implementados
- [ ] BoardModel CRUD de columns
- [ ] BoardModel CRUD de tasks
- [ ] BoardView renderiza board
- [ ] Puedo agregar/eliminar columnas
- [ ] Puedo agregar/eliminar tasks
- [ ] localStorage básico funciona

**Día 2:**
- [ ] Drag & drop funciona completamente
- [ ] Edit inline (doble click → editar)
- [ ] Labels se muestran en tasks
- [ ] Puedo asignar labels a tasks
- [ ] Prioridades funcionan

**Día 3:**
- [ ] Búsqueda por texto funciona
- [ ] Filtro por label funciona
- [ ] Filtro por prioridad funciona
- [ ] Múltiples filtros se aplican juntos
- [ ] Stats básicas se muestran
- [ ] Testing completo sin bugs

---

## 💡 HINTS IMPORTANTES

### **1. Drag & Drop básico**

```javascript
setupDragAndDrop(onTaskMoved) {
  // dragstart
  this.board.addEventListener('dragstart', (e) => {
    const taskCard = e.target.closest('.task-card');
    if (!taskCard) return;
    
    this.draggedTaskId = taskCard.dataset.id;
    this.draggedFromColumnId = taskCard.closest('.column').dataset.id;
    taskCard.classList.add('dragging');
  });
  
  // dragend
  this.board.addEventListener('dragend', (e) => {
    const taskCard = e.target.closest('.task-card');
    if (taskCard) taskCard.classList.remove('dragging');
  });
  
  // dragover (permitir drop)
  this.board.addEventListener('dragover', (e) => {
    e.preventDefault();
  });
  
  // drop
  this.board.addEventListener('drop', (e) => {
    e.preventDefault();
    const tasksContainer = e.target.closest('.tasks');
    if (!tasksContainer) return;
    
    const toColumnId = tasksContainer.dataset.columnId;
    
    if (this.draggedTaskId && this.draggedFromColumnId !== toColumnId) {
      onTaskMoved(this.draggedTaskId, this.draggedFromColumnId, toColumnId);
    }
  });
}
```

### **2. Edit inline**

```javascript
// Doble click → editar
onTaskDoubleClick(callback) {
  this.board.addEventListener('dblclick', (e) => {
    const titleElement = e.target.closest('.task-title');
    if (!titleElement) return;
    
    const taskCard = titleElement.closest('.task-card');
    const taskId = taskCard.dataset.id;
    callback(taskId);
  });
}

// Enter o blur → guardar
onTaskEditEnter(callback) {
  this.board.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    
    const input = e.target.closest('.task-title-input');
    if (!input) return;
    
    const taskCard = input.closest('.task-card');
    const taskId = taskCard.dataset.id;
    const newTitle = input.value.trim();
    
    callback(taskId, newTitle);
  });
}
```

### **3. Filtros múltiples**

```javascript
getFilteredColumns() {
  return this.#columns.map(column => {
    let filteredTasks = column.getTasks();
    
    // Filtro 1: Search
    if (this.#activeFilters.search) {
      filteredTasks = filteredTasks.filter(t => 
        t.title.toLowerCase().includes(this.#activeFilters.search.toLowerCase())
      );
    }
    
    // Filtro 2: Labels
    if (this.#activeFilters.labels.length > 0) {
      filteredTasks = filteredTasks.filter(t =>
        t.labels.some(label => this.#activeFilters.labels.includes(label))
      );
    }
    
    // Filtro 3: Priority
    if (this.#activeFilters.priority !== 'all') {
      filteredTasks = filteredTasks.filter(t =>
        t.priority === this.#activeFilters.priority
      );
    }
    
    // Retornar columna con tasks filtradas
    return new Column(column.id, column.title, filteredTasks);
  });
}
```

---

FIN DEL PROYECTO

**Integrador 3 de 5**  
**Duración:** 3 días  
**Siguiente:** Integrador 4 (cuando termines este)
