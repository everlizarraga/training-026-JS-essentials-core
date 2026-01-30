// ============================================
// APP - ENTRY POINT
// Coordina todas las clases
// ============================================

import { TodoManager } from './todo-manager.js';
import { TodoRepository } from './todo-repository.js';

/**
 * Clase App
 * 
 * TODO: Implementar esta clase
 * 
 * RESPONSABILIDAD: Coordinar UI y lógica
 * 
 * FUNCIONES:
 * - Inicializar TodoManager y Repository
 * - Cargar datos de localStorage
 * - Setup event listeners
 * - Renderizar lista
 * - Actualizar stats
 * - Guardar automáticamente
 */
class App {
  constructor() {
    // TODO: Inicializar dependencias
    this.manager = new TodoManager();
    this.repository = new TodoRepository();

    // TODO: Referencias a elementos DOM
    this.todoInput = document.getElementById('todo-input');
    this.btnAdd = document.getElementById('btn-add');
    this.todoList = document.getElementById('todo-list');
    this.filterBtns = document.querySelectorAll('.filter-btn');
    this.statsText = document.getElementById('stats-text');

    // Estado de filtro actual
    /**@type {'all'|'active'|'completed'} */
    this.currentFilter = 'all';
  }

  /**
   * TODO: Inicializar app
   */
  init() {
    // TU CÓDIGO AQUÍ
    // 1. Cargar datos: this.loadData()
    // 2. Setup listeners: this.setupListeners()
    // 3. Renderizar: this.render()
    this.loadData();
    this.setupListeners();
    this.render();
  }

  /**
   * TODO: Cargar datos de localStorage
   */
  loadData() {
    // TU CÓDIGO AQUÍ
    const data = this.repository.load();
    this.manager.loadFromJSON(data);
  }

  /**
   * TODO: Guardar datos en localStorage
   */
  saveData() {
    // TU CÓDIGO AQUÍ
    const data = this.manager.toJSON();
    this.repository.save(data);
  }

  /**
   * TODO: Setup event listeners
   */
  setupListeners() {
    // TU CÓDIGO AQUÍ

    // Agregar tarea
    this.btnAdd.addEventListener('click', () => { this.addTodo() });
    this.todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') { this.addTodo() };
    })

    // Filtros
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => { this.setFilter(btn.dataset.filter) })
    })

    // Event delegation para checkbox y delete
    this.todoList.addEventListener('click', (e) => {
      const cardTodo = e.target.closest('.todo-item');
      console.log("card:", cardTodo);
      const checkbox = e.target.closest('input[type="checkbox"]');
      const btnDelete = e.target.closest('.btn-delete');
      if (checkbox) {
        console.log("Toggle checkbox");
        this.toggleTodo(Number(cardTodo.dataset.id));
        return;
      }
      if (btnDelete) {
        console.log("Btn delete");
        this.deleteTodo(Number(cardTodo.dataset.id));
        return;
      }
    })
  }

  /**
   * TODO: Agregar tarea desde input
   */
  addTodo() {
    // TU CÓDIGO AQUÍ
    // 1. Obtener valor de input
    // 2. Validar no vacío
    // 3. manager.add(title)
    // 4. Limpiar input
    // 5. saveData()
    // 6. render()
    const value = this.todoInput.value;
    if (value === '') return;
    this.manager.add(value);
    this.todoInput.value = '';
    this.saveData();
    this.render();
  }

  /**
   * TODO: Toggle tarea
   */
  toggleTodo(id) {
    // TU CÓDIGO AQUÍ
    // 1. manager.toggle(id)
    // 2. saveData()
    // 3. render()
    this.manager.toggle(id);
    this.saveData();
    this.render();
  }

  /**
   * TODO: Eliminar tarea
   */
  deleteTodo(id) {
    // TU CÓDIGO AQUÍ
    // 1. Confirmar: if (confirm('¿Eliminar?'))
    // 2. manager.remove(id)
    // 3. saveData()
    // 4. render()
    const todo = this.manager.findTodo(id);
    if (!todo) return;
    const seguro = confirm(`Eliminar? TODO:${id} - ${todo.title}`);
    if (!seguro) return;
    if (this.manager.remove(id)) {
      this.saveData();
      this.render();
    } else {
      console.error(`Error al eliminar TODO id:: ${id}`);
    }
  }

  /**
   * TODO: Cambiar filtro
   */
  setFilter(filter) {
    // TU CÓDIGO AQUÍ
    // 1. this.currentFilter = filter
    // 2. Actualizar clase 'active' en botones
    // 3. render()
    this.currentFilter = filter;
    this.filterBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.filter == filter) {
        btn.classList.add('active');
      }
    });
    this.render();
  }

  /**
   * TODO: Renderizar lista según filtro
   */
  render() {
    // TU CÓDIGO AQUÍ
    // 1. Obtener todos según filtro:
    let todos = this.manager.getAll();
    if (this.currentFilter === 'active') todos = this.manager.getActive();
    if (this.currentFilter === 'completed') todos = this.manager.getCompleted();

    // 2. Si vacío, mostrar empty state
    // 3. Si hay todos, renderizar cada uno
    // 4. Actualizar stats
    if (todos.length === 0) {
      // this.todoList.innerHTML = 'Empty State';
      this.todoList.innerHTML = `
        <div class="empty-state">
          <h3>📭 No hay tareas</h3>
          <p>Agrega tu primera tarea arriba</p>
        </div>
      `;
      return;
    }
    this.todoList.innerHTML = todos
      .map(todo => this.renderTodo(todo))
      .join('');
    this.updateStats();
  }

  /**
   * TODO: Renderizar una tarea
   */
  renderTodo(todo) {
    // TU CÓDIGO AQUÍ
    // Retornar HTML string:
    console.log("Render TODO-id:", todo.id);
    return `
      <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
        <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
        <span class="todo-text">${todo.title}</span>
        <button class="btn-delete" data-id="${todo.id}">🗑️</button>
      </div>
    `
  }

  /**
   * TODO: Actualizar estadísticas
   */
  updateStats() {
    // TU CÓDIGO AQUÍ
    const stats = this.manager.getStats()
    this.statsText.textContent = `${stats.total} tareas - ${stats.completed} completadas`
  }
}

// Inicializar app cuando DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});


