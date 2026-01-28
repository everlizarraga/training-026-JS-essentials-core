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
