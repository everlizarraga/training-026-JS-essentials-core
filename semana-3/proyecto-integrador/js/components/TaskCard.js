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
