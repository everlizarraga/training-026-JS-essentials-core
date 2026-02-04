// ============================================
// EXPENSE CONTROLLER (coordinación)
// ============================================

import { ExpenseModel } from './expense-model.js';
import { ExpenseView } from './expense-view.js';

const STORAGE_KEY = 'APP:expenses';

export class ExpenseController {
  constructor(model, view) {
    /** @type {ExpenseModel} */
    this.model = model;
    /** @type {ExpenseView} */
    this.view = view;

    // Estado del filtro activo
    this.activeCategory = 'All';

    // TODO: Suscribirse al model (Observer)
    // Cuando el model cambia → this.updateView()
    this.model.subscribe(() => {this.updateView()});

    // TODO: Setup listeners del view
    // onSubmit → this.addExpense()
    // onDelete → this.deleteExpense(id)
    // onFilterChange → this.setFilter(category)
    this.view.onSubmit(() => {this.addExpense()});
    this.view.onDelete((id) => {this.deleteExpense(id)});
    this.view.onFilterChange((categry) => {this.setFilter(categry)});

    // Cargar datos iniciales
    this.load();
    this.updateView();
  }

  // ==========================================
  // ACTIONS
  // ==========================================

  addExpense() {
    // TODO: Obtener datos del form con view.getFormData()
    // TODO: Llamar model.add(description, amount, category, date)
    // TODO: Limpiar form con view.clearForm()
    // TODO: Manejar errores con try/catch → alert del error
    // NOTA: updateView() se llama automáticamente por Observer
    try {
      const data = this.view.getFormData();
      this.model.add(data.description, data.amount, data.category, data.date);
      this.view.clearForm();
    } catch (error) {
      console.error(`ERROR: ${error.message}`);
      alert(`ERROR: ${error.message}`);
    }
  }

  deleteExpense(id) {
    // TODO: Confirmar con confirm()
    // TODO: Llamar model.remove(Number(id))
    // NOTA: updateView() se llama automáticamente por Observer
    if(confirm(`Eliminar gasto [ID: ${id}]`)) {
      this.model.remove(Number(id));
      console.log(`Gasto [ID: ${id}] eliminado`);
    }
  }

  setFilter(category) {
    // TODO: Guardar category en this.activeCategory
    // TODO: Llamar this.updateView()
    this.activeCategory = category;
    this.updateView();
  }

  // ==========================================
  // VIEW UPDATE
  // ==========================================

  updateView() {
    // TODO: Obtener gastos según filtro activo
    //   Si activeCategory === 'All' → model.getAll()
    //   Sino → model.getByCategory(activeCategory)
    //
    // TODO: Llamar view.renderList(expenses)
    // TODO: Llamar view.renderStats(model.getStats())
    // TODO: Llamar view.renderFilters(this.activeCategory)
    const gastos = this.activeCategory === 'All' ?
      this.model.getAll() :
      this.model.getByCategory(this.activeCategory);
    this.view.renderList(gastos);
    this.view.renderStats(this.model.getStats());
    this.view.renderFilters(this.activeCategory);
    // console.log('STATS:', this.model.getStats());
  }

  // ==========================================
  // PERSISTENCE
  // ==========================================

  save() {
    // TODO: model.toJSON() → localStorage.setItem(STORAGE_KEY, ...)
    const data = this.model.toJSON();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  load() {
    // TODO: localStorage.getItem(STORAGE_KEY)
    // TODO: Si existe → model.loadFromJSON(JSON.parse(...))
    const dataString = localStorage.getItem(STORAGE_KEY);
    let data;
    if(dataString) {
      data = JSON.parse(dataString);
    } else {
      data = [];
    }
    this.model.loadFromJSON(data);
  }
}

