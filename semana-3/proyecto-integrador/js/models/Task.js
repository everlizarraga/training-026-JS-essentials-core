// ============================================
// TASK MODEL
// Representa una tarea individual
// ============================================
/**@typedef {'high'|'medium'|'low'} Priority */

export class Task {
  /**
   * Constructor
   * @param {{
   * id: string
   * title: string
   * description: string
   * completed: boolean
   * priority: Priority
   * category: string
   * createdAt: string
   * completedAt: string
   * }} data 
   */
  constructor(data) {
    // ID único (timestamp + random para evitar colisiones)
    this.id = data.id || Date.now() + Math.random().toString(36).substr(2, 9);

    // Propiedades de la tarea
    this.title = data.title;
    this.description = data.description ?? '';
    this.completed = data.completed ?? false;
    /**@type {Priority} */
    this.priority = data.priority ?? 'medium'; // 'high', 'medium', 'low'
    this.category = data.category ?? 'General';
    this.createdAt = data.createdAt ?? new Date().toISOString();
    this.completedAt = data.completedAt ?? null;
  }

  // Marcar como completada
  toggle() {
    this.completed = !this.completed;
    this.completedAt = this.completed ? new Date().toISOString() : null;
  }

  // Actualizar propiedades
  update(data) {
    if (data.title !== undefined) this.title = data.title;
    if (data.description !== undefined) this.description = data.description;
    if (data.priority !== undefined) this.priority = data.priority;
    if (data.category !== undefined) this.category = data.category;
  }

  // Validar tarea
  isValid() {
    return this.title && this.title.trim().length > 0;
  }

  // Convertir a objeto plano (para localStorage)
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      completed: this.completed,
      priority: this.priority,
      category: this.category,
      createdAt: this.createdAt,
      completedAt: this.completedAt
    };
  }

  // Crear Task desde objeto plano
  static fromJSON(json) {
    return new Task(json);
  }
}
