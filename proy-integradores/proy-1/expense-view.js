// ============================================
// EXPENSE VIEW (presentación)
// ============================================

import { CATEGORIES, CATEGORY_ICONS } from './expense-model.js';

export class ExpenseView {
  constructor(formId, statsId, filterBarId, listId) {
    // TODO: Guardar referencias DOM
    this.form = document.getElementById(formId);
    this.statsContainer = document.getElementById(statsId);
    this.filterBar = document.getElementById(filterBarId);
    this.expenseList = document.getElementById(listId);
  }

  // ==========================================
  // RENDERING - LISTA
  // ==========================================

  /**
   * Renderizar lista de gastos
   * @param {import('./expense.js').Expense[]} expenses
   */
  renderList(expenses) {
    // TODO: Si expenses está vacío → renderEmpty()
    // TODO: Sino → mapear con renderExpenseItem() y join('')
    // TODO: Actualizar this.expenseList.innerHTML
    if (expenses.length === 0) {
      this.renderEmpty();
    } else {
      this.expenseList.innerHTML = expenses
        .map(e => this.renderExpenseItem(e))
        .join('');
    }

  }

  /**
   * Renderizar un item de la lista
   * @param {import('./expense.js').Expense} expense
   * @returns {string} HTML del item
   */
  renderExpenseItem(expense) {
    // TODO: Retornar HTML de un expense-item
    // Usar la estructura del HTML simulado como referencia:
    const fecha = (new Date(expense.date)).toLocaleDateString(undefined, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    const template =
      `<div class="expense-item" data-id="${expense.id}">
      <div class="expense-left">
        <div class="expense-icon ${expense.category.toLowerCase()}">${CATEGORY_ICONS[expense.category]}</div>
        <div>
          <div class="expense-desc">${expense.description}</div>
          <div class="expense-date">${fecha}</div>
        </div>
      </div>
      <div class="expense-right">
        <div class="expense-amount">-$${expense.amount.toFixed(2)}</div>
        <button class="btn-delete" data-id="${expense.id}">🗑️</button>
      </div>
    </div>`
    //
    // HINTS:
    // - Categoría en lowercase para la clase: expense.category.toLowerCase()
    // - Emoji: usar CATEGORY_ICONS[expense.category]
    // - Fecha: new Date(expense.date).toLocaleDateString()
    // - Monto con 2 decimales: expense.amount.toFixed(2)
    return template;
  }

  renderEmpty() {
    // TODO: Mostrar empty state
    // Usar la estructura .empty-state del CSS
    this.expenseList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">💸</div>
        <p>No hay gastos registrados</p>
      </div>
    `;
  }

  // ==========================================
  // RENDERING - STATS
  // ==========================================

  /**
   * Renderizar estadísticas completas
   * @param {{ total: number, byCategory: Object }} stats
   */
  renderStats(stats) {
    // byCategory debe tener esta forma:
    // {
    //   Food:          { amount: 250, percent: 45.2 },
    //   Transport:     { amount: 100, percent: 18.0 },
    //   Entertainment: { amount: 50,  percent: 9.0  },
    //   Shopping:      { amount: 80,  percent: 14.4 },
    //   Other:         { amount: 75,  percent: 13.4 }
    // }

    // TODO: Generar HTML con:
    //   1. Total: <div class="stats-total">$[total.toFixed(2)] <span>gastado</span></div>
    //   2. Una stat-row por cada categoría en CATEGORIES
    //      Solo renderizar categorías que tienen amount > 0
    //
    // Cada stat-row tiene esta estructura:
    //   <div class="stat-row">
    //     <div class="stat-label">[category]</div>
    //     <div class="stat-bar-wrap">
    //       <div class="stat-bar [category lowercase]" style="width: [percent]%"></div>
    //     </div>
    //     <div class="stat-percent">[percent redondeado]%</div>
    //     <div class="stat-amount">$[amount.toFixed(2)]</div>
    //   </div>
    //
    // TODO: Si total === 0, mostrar solo el total en 0
    // TODO: Actualizar this.statsContainer.innerHTML
    if (!stats) {
      throw new Error("Es encesario estadisticas");
    }
    this.statsContainer.innerHTML = `<div class="stats-total">$${stats.total} <span>gastado</span></div>`;
    if (stats.total === 0) return;

    const stringStats = Object.entries(stats.byCategory)
      .filter(([_, value]) => value.amount > 0)
      .map(([key, value]) => {
        // console.log(`KEy: ${key} - Value: ${value.percent}`);
        // console.warn("Percent:", value.percent);
        return `
          <div class="stat-row">
            <div class="stat-label">${key}</div>
            <div class="stat-bar-wrap">
              <div class="stat-bar ${key.toLowerCase()}" style="width: ${value.percent}%"></div>
            </div>
            <div class="stat-percent">${Math.round(Number(value.percent))}%</div>
            <div class="stat-amount">$${value.amount.toFixed(2)}</div>
          </div>`;
      })
      .join('');
    this.statsContainer.innerHTML += stringStats;
  }

  // ==========================================
  // RENDERING - FILTROS
  // ==========================================

  /**
   * Renderizar botones de filtro y marcar el activo
   * @param {string} activeCategory - Categoría activa ('All' o una específica)
   */
  renderFilters(activeCategory) {
    // TODO: Generar botones de filtro
    // Primero "Todas" (data-category="All")
    // Luego una por cada categoría en CATEGORIES
    // El botón que matchea activeCategory tiene clase 'active'
    //
    // <button class="filter-btn [active si matchea]" data-category="[cat]">
    //   [emoji] [category]
    // </button>
    //
    // TODO: Actualizar this.filterBar.innerHTML
    this.filterBar.innerHTML =
      `<button class="filter-btn ${activeCategory === 'All' ? 'active' : ''}" data-category="All">
        Todas
      </button>` +
      CATEGORIES
        .map((value) => {
          return `<button class="filter-btn ${activeCategory === value ? 'active' : ''}" data-category="${value}">
            ${CATEGORY_ICONS[value]} ${value}
          </button>`;
        })
        .join('');
  }

  // ==========================================
  // FORM
  // ==========================================

  /**
   * Obtener datos del formulario
   * @returns {{ description: string, amount: number, category: string, date: string }}
   */
  getFormData() {
    // TODO: Obtener valores de los inputs
    // description: #expense-desc .value
    // amount: Number(#expense-amount .value)
    // category: #expense-category .value
    // date: #expense-date .value
    const inputFecha = this.form.querySelector('#expense-date').value;
    const [anio, mes, dia] = inputFecha.split('-');
    return {
      description: this.form.querySelector('#expense-desc').value,
      amount: Number(this.form.querySelector('#expense-amount').value),
      category: this.form.querySelector('#expense-category').value,
      date: (new Date(anio, mes -1, dia)).toISOString()
    };
  }

  clearForm() {
    // TODO: Resetear el form
    this.form.reset()
    // Y volver a poner la fecha de hoy en el input date
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');

    this.form.querySelector('#expense-date').value = `${año}-${mes}-${dia}`;
  }

  // ==========================================
  // EVENTS
  // ==========================================

  onSubmit(callback) {
    // TODO: Escuchar submit del form
    // preventDefault + llamar callback
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      callback();
    });
  }

  onDelete(callback) {
    // TODO: Event delegation en expense-list
    // Escuchar clicks en .btn-delete
    // Obtener id del dataset
    // Llamar callback(id)
    this.expenseList.addEventListener('click', (e) => {
      const btnDelete = e.target.closest('.btn-delete');
      if(!btnDelete) return;
      const id = btnDelete.dataset.id;
      callback(Number(id));
      // callback(Number(id));
    });
  }

  onFilterChange(callback) {
    // TODO: Event delegation en filter-bar
    // Escuchar clicks en .filter-btn
    // Obtener category del dataset
    // Llamar callback(category)
    this.filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if(!btn) return;
      const category = btn.dataset.category;
      callback(category);
    });
  }
}

