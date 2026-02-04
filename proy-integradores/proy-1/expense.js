// ============================================
// EXPENSE (modelo de datos)
// ============================================

export class Expense {
  /**
   * @param {number} id
   * @param {string} description
   * @param {number} amount
   * @param {string} category
   * @param {string} date - ISO string
   */
  constructor(id, description, amount, category, date) {
    // TODO: Asignar propiedades
    this.id = id;
    this.description = description;
    this.amount = amount;
    this.category = category;
    this.date = date;
  }

  /**
   * Expense → objeto plano (para localStorage)
   * @returns {Object}
   */
  toJSON() {
    // TODO: Retornar objeto con todas las propiedades
    return {
      id: this.id,
      description: this.description,
      amount: this.amount,
      category: this.category,
      date: this.date
    };
  }

  /**
   * Objeto plano → Expense (desde localStorage)
   * @param {Object} json
   * @returns {Expense}
   */
  static fromJSON(json) {
    // TODO: Crear Expense desde objeto plano
    if(!json) {
      throw new Error("JSON de datos requeridos");
    }
    return new Expense(json.id, json.description, json.amount, json.category, json.date);
  }
}

