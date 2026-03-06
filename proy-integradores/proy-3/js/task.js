// ============================================
// TASK (modelo de datos)
// ============================================

export class Task {
  /**
   * @param {string} id
   * @param {string} title
   * @param {'high'|'medium'|'low'} priority - 'high' | 'medium' | 'low'
   * @param {string[]} labels - ['bug', 'feature', etc.]
   */
  constructor(id, title, priority = 'medium', labels = []) {
    // TODO: Asignar propiedades
    this.id = id;
    this.title = title;
    this.priority = priority; //'high' | 'medium' | 'low'
    this.labels = labels;
  }

  toJSON() {
    // TODO: Retornar objeto plano
    return {
      id: this.id,
      title: this.title,
      priority: this.priority,
      labels: this.labels
    }
  }

  static fromJSON(json) {
    // TODO: Crear Task desde objeto
    return new Task(
      json.id,
      json.title,
      json.priority,
      json.labels
    );
  }
}
