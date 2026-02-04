// ============================================
// APP - ENTRY POINT
// ============================================

import { ExpenseModel } from './expense-model.js';
import { ExpenseView } from './expense-view.js';
import { ExpenseController } from './expense-controller.js';

// Inicializar MVC
const model = new ExpenseModel();
const view = new ExpenseView('expense-form', 'stats-container', 'filter-bar', 'expense-list');
const controller = new ExpenseController(model, view);

// Auto-save cuando el model cambia
model.subscribe(() => {
  controller.save();
});

