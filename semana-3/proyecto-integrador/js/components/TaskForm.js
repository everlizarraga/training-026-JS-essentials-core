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
