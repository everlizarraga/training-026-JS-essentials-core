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
