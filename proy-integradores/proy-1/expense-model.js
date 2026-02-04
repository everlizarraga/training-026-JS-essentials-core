// ============================================
// EXPENSE MODEL (lógica de negocio)
// ============================================

import { Expense } from './expense.js';

// Categorías válidas del sistema
/**@typedef {'Food'|'Transport'|'Entertainment'|'Shopping'|'Other'} Categories */
/**@type {Categories[]} */
export const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Other'];

// Emojis por categoría (para la View)
export const CATEGORY_ICONS = {
  Food: '🍔',
  Transport: '🚗',
  Entertainment: '🎬',
  Shopping: '🛍️',
  Other: '📦'
};

export class ExpenseModel {
  /** @type {Expense[]} */
  #expenses = [];
  #nextId = 1;
  #observers = [];

  // ==========================================
  // OBSERVER
  // ==========================================

  subscribe(callback) {
    // TODO: Agregar callback a observers
    if(!callback) {
      throw new Error("Es necesaria una callback");
    }
    this.#observers.push(callback);
  }

  notify() {
    // TODO: Ejecutar todos los observers
    this.#observers.forEach(cb => cb());
  }

  // ==========================================
  // CRUD
  // ==========================================

  /**
   * Agregar gasto
   * @param {string} description - Descripción del gasto
   * @param {number} amount - Monto (debe ser > 0)
   * @param {string} category - Una de las categorías válidas
   * @param {string} date - Fecha en formato YYYY-MM-DD
   * @returns {Expense}
   */
  add(description, amount, category, date) {
    // TODO: Validar description no vacía
    // TODO: Validar amount > 0
    // TODO: Validar category es válida (usar CATEGORIES)
    // TODO: Validar date no vacía
    // TODO: Crear Expense con this.#nextId
    // TODO: Incrementar #nextId
    // TODO: Push a #expenses
    // TODO: notify()
    // TODO: Retornar expense creado
    if(!description || description === '') {
      throw new Error("Es necesaria una descripocion");
    }
    if(amount <= 0) {
      throw new Error("Es necesaria una cantidad > 0");
    }
    if(!category || !CATEGORIES.includes(category)) {
      throw new Error("Es necesario una categoria válida");
    }
    if(!date || date === '') {
      throw new Error("Es necesaria una fecha");
    }
    const nuevoGasto = new Expense(this.#nextId, description, amount, category, date);
    this.#expenses.push(nuevoGasto);
    this.#nextId += 1;
    this.notify();
    return nuevoGasto;
  }
  
  /**
   * Eliminar gasto por ID
   * @param {number} id
   * @returns {boolean}
  */
  remove(id) {
   // TODO: Buscar expense con findIndex
   // TODO: Si no existe → retornar false
   // TODO: Eliminar con splice
   // TODO: notify()
   // TODO: Retornar true
    const index = this.#expenses.findIndex(s => s.id === id);
    if(index !== -1) {
      this.#expenses.splice(index, 1);
      this.notify();
      return true;
    }
    return false;
  }

  /**
   * Retornar todos los gastos (copia)
   * @returns {Expense[]}
   */
  getAll() {
    // TODO: Retornar copia del array
    return [...this.#expenses];
  }

  // ==========================================
  // QUERIES
  // ==========================================

  /**
   * Filtrar por categoría
   * @param {string} category - Categoría o 'All' para todas
   * @returns {Expense[]}
   */
  getByCategory(category) {
    // TODO: Si category === 'All' → retornar getAll()
    // TODO: Sino → filtrar por categoría
    return category === 'All' ? 
      this.getAll() :
      this.getAll().filter(s => s.category === category);
  }

  // ==========================================
  // ESTADÍSTICAS
  // ==========================================

  /**
   * Calcular todas las estadísticas
   * Retorna un objeto con:
   *   - total: número (suma de todos los amounts)
   *   - byCategory: objeto { Food: { amount, percent }, Transport: {...}, ... }
   *
   * @returns {{ total: number, byCategory: Object }}
   */
  getStats() {
    // TODO: Calcular total con reduce
    const total = this.#expenses.reduce((sum, e) => sum + e.amount, 0);
    //
    // TODO: Calcular por categoría con reduce
    //   Usar CATEGORIES para iterar categorías
    //   Para cada categoría → filtrar y sumar amounts
    //   Calcular porcentaje: (categoryTotal / total) * 100
    //   Si total es 0 → percent es 0 (evitar dividir por 0)
    const totalPorCategoria = CATEGORIES.map(c => {
      return {
        category: c,
        total: this.#expenses.filter(a => a.category === c).reduce((sum, e) => sum+e.amount, 0)
      }
    });
    const totalConPorcentaje = totalPorCategoria.map(e => {
      return {
        ...e,
        percent: (total !== 0) ? (e.total /total)*100 : 0
      }
    });

    // TODO: Retornar { total, byCategory }
    //
    // byCategory debe tener esta forma:
    // {
    //   Food:          { amount: 250, percent: 45.2 },
    //   Transport:     { amount: 100, percent: 18.0 },
    //   Entertainment: { amount: 50,  percent: 9.0  },
    //   Shopping:      { amount: 80,  percent: 14.4 },
    //   Other:         { amount: 75,  percent: 13.4 }
    // }
    return {
      total: total,
      byCategory: totalConPorcentaje.reduce((obj, e) => {
        obj[e.category] = {amount: e.total, percent: e.percent};
        return obj;
      }, {})
    };
  }

  // ==========================================
  // PERSISTENCE
  // ==========================================

  /**
   * Convertir todos los gastos a JSON
   * @returns {Object[]}
   */
  toJSON() {
    // TODO: Mapear expenses a JSON con expense.toJSON()
    return this.#expenses.map(e => e.toJSON());
  }

  /**
   * Cargar gastos desde JSON
   * @param {Object[]} data
   */
  loadFromJSON(data) {
    // TODO: Mapear JSON a Expenses con Expense.fromJSON()
    // TODO: Actualizar #nextId (Math.max de IDs + 1)
    //       Cuidado: si está vacío, #nextId stays 1
    // this.#expenses = data.map(e => Expense.fromJSON(e));
    this.#expenses = data.length !== 0 ?
      data.map(e => Expense.fromJSON(e)) :
      [];
    if(data.length === 0) {
      this.#nextId = 1;
    } else {
      this.#nextId = Math.max(...this.#expenses.map(e => e.id)) +1;
    }
  }
}

