# 📦 COMPONENTES UI - TASK MANAGER

**Archivo:** Todos los componentes que renderizan la UI dinámicamente

---

## 📋 COMPONENTES INCLUIDOS

1. **TaskCard.js** - Renderiza una tarea individual
2. **TaskList.js** - Renderiza lista completa de tareas
3. **TaskForm.js** - Formulario para crear tareas
4. **StatsPanel.js** - Panel de estadísticas
5. **app.js** - Entry point que coordina todo

---

## 1️⃣ TaskCard.js

**Ubicación:** `js/components/TaskCard.js`

```javascript
// ============================================
// TASK CARD COMPONENT
// Renderiza una tarea individual
// ============================================

export class TaskCard {
  /**
   * Renderiza una tarea como HTML
   * @param {Task} task - Objeto Task
   * @returns {string} HTML de la tarea
   */
  render(task) {
    // Clase adicional si está completada
    const completedClass = task.completed ? 'completed' : '';
    
    // Badge de prioridad con color específico
    const priorityClass = `badge-priority ${task.priority}`;
    
    return `
      <div class="task-card ${completedClass}" data-id="${task.id}">
        <!-- Checkbox para marcar completado -->
        <input 
          type="checkbox" 
          class="task-checkbox" 
          ${task.completed ? 'checked' : ''}
          data-action="toggle"
        >
        
        <!-- Contenido de la tarea -->
        <div class="task-content">
          <div class="task-title">${this.escapeHtml(task.title)}</div>
          
          ${task.description ? `
            <div class="task-description">${this.escapeHtml(task.description)}</div>
          ` : ''}
          
          <!-- Metadata: categoría y prioridad -->
          <div class="task-meta">
            <span class="task-badge badge-category">${this.escapeHtml(task.category)}</span>
            <span class="task-badge ${priorityClass}">${this.getPriorityLabel(task.priority)}</span>
          </div>
        </div>
        
        <!-- Botones de acción -->
        <div class="task-actions">
          <button class="btn-edit" data-action="edit">
            ✏️ Editar
          </button>
          <button class="btn-delete" data-action="delete">
            🗑️ Eliminar
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Escapar HTML para prevenir XSS
   * @param {string} text - Texto a escapar
   * @returns {string} Texto escapado
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Obtener label de prioridad en español
   * @param {string} priority - 'high', 'medium', 'low'
   * @returns {string} Label en español
   */
  getPriorityLabel(priority) {
    const labels = {
      high: 'Alta',
      medium: 'Media',
      low: 'Baja'
    };
    return labels[priority] || priority;
  }
}
```

---

## 2️⃣ TaskList.js

**Ubicación:** `js/components/TaskList.js`

```javascript
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
```

---

## 3️⃣ TaskForm.js

**Ubicación:** `js/components/TaskForm.js`

```javascript
// ============================================
// TASK FORM COMPONENT
// Formulario para crear/editar tareas
// ============================================

export class TaskForm {
  constructor(containerId) {
    // Contenedor donde se renderiza el formulario
    this.container = document.getElementById(containerId);
    
    if (!this.container) {
      throw new Error(`Contenedor no encontrado: ${containerId}`);
    }

    // Categorías disponibles
    this.categories = ['General', 'Work', 'Personal', 'Study', 'Shopping'];
    
    // Renderizar formulario
    this.render();
    
    // Setup event listeners
    this.setupEventListeners();
  }

  /**
   * Renderizar formulario
   */
  render() {
    this.container.innerHTML = `
      <form id="task-form-element" class="task-form-element">
        <div class="form-row">
          <!-- Título de la tarea -->
          <input 
            type="text" 
            id="task-title" 
            placeholder="Título de la tarea *" 
            required
            autocomplete="off"
          >
          
          <!-- Categoría -->
          <select id="task-category">
            ${this.categories.map(cat => `
              <option value="${cat}">${cat}</option>
            `).join('')}
          </select>
          
          <!-- Prioridad -->
          <select id="task-priority">
            <option value="low">Baja</option>
            <option value="medium" selected>Media</option>
            <option value="high">Alta</option>
          </select>
          
          <!-- Botón agregar -->
          <button type="submit">➕ Agregar</button>
        </div>
        
        <div class="form-row">
          <!-- Descripción (opcional) -->
          <textarea 
            id="task-description" 
            placeholder="Descripción (opcional)"
            rows="2"
          ></textarea>
        </div>
      </form>
    `;
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    const form = this.container.querySelector('#task-form-element');
    
    if (!form) return;

    // Submit del formulario
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Obtener valores
      const formData = this.getFormData();
      
      // Validar
      if (!this.validate(formData)) {
        return;
      }

      // Disparar custom event
      const event = new CustomEvent('taskSubmit', {
        detail: formData,
        bubbles: true
      });

      this.container.dispatchEvent(event);
      
      // Limpiar formulario
      this.reset();
    });
  }

  /**
   * Obtener datos del formulario
   * @returns {Object} Datos del formulario
   */
  getFormData() {
    return {
      title: document.getElementById('task-title').value.trim(),
      description: document.getElementById('task-description').value.trim(),
      category: document.getElementById('task-category').value,
      priority: document.getElementById('task-priority').value
    };
  }

  /**
   * Validar formulario
   * @param {Object} data - Datos a validar
   * @returns {boolean} Válido o no
   */
  validate(data) {
    // Título es requerido
    if (!data.title || data.title.length === 0) {
      alert('❌ El título es requerido');
      return false;
    }

    // Título no muy largo
    if (data.title.length > 100) {
      alert('❌ El título no puede tener más de 100 caracteres');
      return false;
    }

    return true;
  }

  /**
   * Resetear formulario
   */
  reset() {
    const form = this.container.querySelector('#task-form-element');
    if (form) {
      form.reset();
      
      // Focus en título para siguiente tarea
      document.getElementById('task-title')?.focus();
    }
  }

  /**
   * Actualizar categorías disponibles
   * @param {Array<string>} categories - Array de categorías
   */
  updateCategories(categories) {
    this.categories = ['General', ...categories];
    
    const select = document.getElementById('task-category');
    if (select) {
      const currentValue = select.value;
      
      select.innerHTML = this.categories.map(cat => `
        <option value="${cat}">${cat}</option>
      `).join('');
      
      // Restaurar valor si existe
      if (this.categories.includes(currentValue)) {
        select.value = currentValue;
      }
    }
  }
}
```

---

## 4️⃣ StatsPanel.js

**Ubicación:** `js/components/StatsPanel.js`

```javascript
// ============================================
// STATS PANEL COMPONENT
// Panel de estadísticas en tiempo real
// ============================================

export class StatsPanel {
  constructor(containerId) {
    // Contenedor donde se renderiza el panel
    this.container = document.getElementById(containerId);
    
    if (!this.container) {
      throw new Error(`Contenedor no encontrado: ${containerId}`);
    }
  }

  /**
   * Actualizar estadísticas
   * @param {Object} stats - Objeto con estadísticas
   * @param {number} stats.total - Total de tareas
   * @param {number} stats.completed - Tareas completadas
   * @param {number} stats.active - Tareas activas
   * @param {number} stats.percentage - Porcentaje completado
   */
  update(stats) {
    this.container.innerHTML = `
      <!-- Total de tareas -->
      <div class="stat-card">
        <div class="stat-value">${stats.total}</div>
        <div class="stat-label">Total</div>
      </div>
      
      <!-- Tareas completadas -->
      <div class="stat-card">
        <div class="stat-value">${stats.completed}</div>
        <div class="stat-label">Completadas</div>
      </div>
      
      <!-- Tareas activas -->
      <div class="stat-card">
        <div class="stat-value">${stats.active}</div>
        <div class="stat-label">Pendientes</div>
      </div>
      
      <!-- Porcentaje de progreso -->
      <div class="stat-card">
        <div class="stat-value">${stats.percentage}%</div>
        <div class="stat-label">Progreso</div>
      </div>
    `;
  }

  /**
   * Renderizar estado inicial (sin datos)
   */
  renderEmpty() {
    this.update({
      total: 0,
      completed: 0,
      active: 0,
      percentage: 0
    });
  }
}
```

---

## 5️⃣ app.js (Entry Point)

**Ubicación:** `js/app.js`

```javascript
// ============================================
// APP - ENTRY POINT
// Inicializa la aplicación y coordina componentes
// ============================================

// Importar models
import { TaskManager } from './models/TaskManager.js';
import { TaskRepository } from './services/TaskRepository.js';

// Importar components
import { TaskList } from './components/TaskList.js';
import { TaskForm } from './components/TaskForm.js';
import { StatsPanel } from './components/StatsPanel.js';

// ============================================
// APP CLASS
// ============================================

class App {
  constructor() {
    // Inicializar models
    this.taskManager = new TaskManager();
    this.repository = new TaskRepository();

    // Inicializar components
    this.taskList = new TaskList('task-list');
    this.taskForm = new TaskForm('task-form');
    this.statsPanel = new StatsPanel('stats-panel');

    // Estado de filtros
    this.filters = {
      status: 'all',
      category: 'all',
      search: '',
      sort: 'date'
    };

    // Inicializar
    this.init();
  }

  /**
   * Inicializar aplicación
   */
  init() {
    // 1. Cargar tareas desde localStorage
    this.loadTasks();

    // 2. Suscribir observer (cuando TaskManager cambia → actualizar UI)
    this.taskManager.subscribe({
      update: (tasks) => this.handleTasksChanged(tasks)
    });

    // 3. Setup event listeners globales
    this.setupEventListeners();

    // 4. Renderizar estado inicial
    this.render();

    console.log('✅ App inicializada');
  }

  /**
   * Cargar tareas desde localStorage
   */
  loadTasks() {
    const tasksData = this.repository.load();
    
    if (tasksData.length > 0) {
      this.taskManager.loadTasks(tasksData);
      console.log(`📦 Cargadas ${tasksData.length} tareas desde localStorage`);
    }
  }

  /**
   * Handler cuando TaskManager notifica cambios
   * @param {Array<Task>} tasks - Tareas actualizadas
   */
  handleTasksChanged(tasks) {
    // 1. Guardar en localStorage
    this.repository.save(this.taskManager.toJSON());

    // 2. Re-renderizar (con filtros aplicados)
    this.render();
  }

  /**
   * Setup event listeners globales
   */
  setupEventListeners() {
    // ==========================================
    // TASK FORM - Crear tarea
    // ==========================================
    document.getElementById('task-form').addEventListener('taskSubmit', (e) => {
      const { title, description, category, priority } = e.detail;
      
      try {
        this.taskManager.add(title, description, category, priority);
        console.log('✅ Tarea creada:', title);
      } catch (error) {
        alert(`❌ Error: ${error.message}`);
      }
    });

    // ==========================================
    // TASK LIST - Acciones en tareas
    // ==========================================
    document.getElementById('task-list').addEventListener('taskAction', (e) => {
      const { action, taskId } = e.detail;

      try {
        switch (action) {
          case 'toggle':
            this.taskManager.toggle(taskId);
            console.log('✅ Tarea toggled:', taskId);
            break;

          case 'delete':
            if (confirm('¿Eliminar esta tarea?')) {
              this.taskManager.remove(taskId);
              console.log('✅ Tarea eliminada:', taskId);
            }
            break;

          case 'edit':
            this.handleEditTask(taskId);
            break;

          default:
            console.warn('Acción desconocida:', action);
        }
      } catch (error) {
        alert(`❌ Error: ${error.message}`);
      }
    });

    // ==========================================
    // FILTROS - Botones de filtro
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Remover active de todos
        filterButtons.forEach(b => b.classList.remove('active'));
        
        // Agregar active al clickeado
        e.target.classList.add('active');
        
        // Actualizar filtro de status
        this.filters.status = e.target.dataset.filter;
        
        // Re-renderizar
        this.render();
      });
    });

    // ==========================================
    // SEARCH - Búsqueda por texto
    // ==========================================
    const searchInput = document.getElementById('search-input');
    
    searchInput.addEventListener('input', (e) => {
      this.filters.search = e.target.value;
      this.render();
    });

    // ==========================================
    // SORT - Ordenamiento
    // ==========================================
    const sortSelect = document.getElementById('sort-select');
    
    sortSelect.addEventListener('change', (e) => {
      this.filters.sort = e.target.value;
      this.render();
    });
  }

  /**
   * Handler para editar tarea (básico)
   * @param {string} taskId - ID de la tarea
   */
  handleEditTask(taskId) {
    const task = this.taskManager.getById(taskId);
    
    // Prompt simple para editar título
    const newTitle = prompt('Editar título:', task.title);
    
    if (newTitle && newTitle.trim()) {
      this.taskManager.update(taskId, { title: newTitle.trim() });
      console.log('✅ Tarea editada:', taskId);
    }
  }

  /**
   * Renderizar toda la UI
   */
  render() {
    // 1. Aplicar filtros
    const filteredTasks = this.taskManager.filter(this.filters);

    // 2. Aplicar ordenamiento
    const sortedTasks = this.taskManager.sort(filteredTasks, this.filters.sort);

    // 3. Renderizar lista de tareas
    this.taskList.renderAll(sortedTasks);

    // 4. Actualizar estadísticas
    const stats = this.taskManager.getStats();
    this.statsPanel.update(stats);

    // 5. Actualizar categorías en formulario
    const categories = this.taskManager.getCategories();
    this.taskForm.updateCategories(categories);
  }
}

// ============================================
// INICIALIZAR APP cuando DOM esté listo
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Crear instancia de App
  window.app = new App();
});
```

---

## 📋 RESUMEN DE COMPONENTES

### **TaskCard.js**
- ✅ Renderiza HTML de una tarea individual
- ✅ Escapa HTML para prevenir XSS
- ✅ Labels de prioridad en español

### **TaskList.js**
- ✅ Renderiza lista completa de tareas
- ✅ Event delegation (un listener para todas las tareas)
- ✅ Estado vacío cuando no hay tareas
- ✅ Dispara custom events (`taskAction`)

### **TaskForm.js**
- ✅ Formulario para crear tareas
- ✅ Validación de datos
- ✅ Reset automático después de submit
- ✅ Actualiza categorías dinámicamente
- ✅ Dispara custom event (`taskSubmit`)

### **StatsPanel.js**
- ✅ Muestra estadísticas en tiempo real
- ✅ Total, Completadas, Pendientes, %

### **app.js**
- ✅ Entry point de la aplicación
- ✅ Coordina todos los componentes
- ✅ Suscribe observer a TaskManager
- ✅ Setup de todos los event listeners
- ✅ Maneja filtros, búsqueda, ordenamiento
- ✅ Persiste en localStorage automáticamente

---

## 🔗 FLUJO DE DATOS

```
Usuario llena formulario
       ↓
TaskForm dispara 'taskSubmit' event
       ↓
App escucha evento
       ↓
TaskManager.add() → Agrega tarea
       ↓
TaskManager.notify() → Notifica observers
       ↓
App.handleTasksChanged() → Actualiza
       ↓
Repository.save() → Guarda en localStorage
       ↓
App.render() → Re-renderiza UI
       ↓
TaskList.renderAll() → Muestra tareas
StatsPanel.update() → Actualiza stats
```

---

## ✅ ARCHIVOS COMPLETOS

**Creá estos archivos con el código de arriba:**

1. `js/components/TaskCard.js` ✅
2. `js/components/TaskList.js` ✅
3. `js/components/TaskForm.js` ✅
4. `js/components/StatsPanel.js` ✅
5. `js/app.js` ✅

**Ya tenés de antes:**
- `js/models/Task.js` ✅
- `js/models/TaskManager.js` ✅
- `js/services/TaskRepository.js` ✅
- `index.html` ✅
- `css/styles.css` ✅

---

## 🚀 TESTING

**Después de crear los archivos:**

1. Abrir `index.html` en navegador
2. Deberías ver:
   - ✅ Formulario para agregar tareas
   - ✅ Panel de estadísticas (todo en 0)
   - ✅ Filtros (All, Active, Completed)
   - ✅ Search bar
   - ✅ Sort selector
   - ✅ Mensaje "No hay tareas"

3. Crear una tarea:
   - Llenar formulario
   - Click en "Agregar"
   - ✅ Tarea aparece en lista
   - ✅ Stats se actualizan

4. Recargar página:
   - ✅ Tarea sigue ahí (localStorage)

---

## 🐛 SI HAY ERRORES

**En consola:**
```javascript
// Verificar que App se inicializó
console.log(window.app);

// Verificar tareas
console.log(window.app.taskManager.getAll());

// Verificar localStorage
console.log(localStorage.getItem('task_manager_tasks'));
```

---

¡AHORA SÍ TENÉS TODO! 🎉
