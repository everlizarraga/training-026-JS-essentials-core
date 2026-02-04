# 💰 PROYECTO INTEGRADOR 1: Expense Tracker

**Duración:** 2 días máximo  
**Nivel:** Base (integrador 1 de 5)  
**Objetivo:** Integrar MVC + Arrays/reduce + estadísticas + localStorage en una app real

---

## ⏰ GOVERNOR

- 📅 **Día 1:** Core MVC funcionando (add, delete, list, save/load)
- 📅 **Día 2:** Stats + filtros + polish
- ✅ **80% funcional = Suficiente**
- 🚫 **Máximo 2 iteraciones**
- 🚫 **Si llegás al límite → subir lo que tenés**

---

## 🎯 ¿QUÉ VAS A CONSTRUIR?

Un tracker de gastos que:
- Registra gastos con categoría y fecha
- Muestra estadísticas de gasto (totales, por categoría)
- Visualiza porcentajes con barras de progreso CSS
- Filtra por categoría
- Persiste en localStorage

```
┌──────────────────────────────────────────┐
│         💰 EXPENSE TRACKER               │
├──────────────────────────────────────────┤
│  [Descripción input]                     │
│  [Monto] [Categoría ▼] [Fecha]           │
│  [➕ Agregar Gasto]                      │
├──────────────────────────────────────────┤
│  ESTADÍSTICAS                            │
│  Total gastado: $1,250.00                │
│                                          │
│  Food          ████████░░░░  45% $562    │
│  Transport     ████░░░░░░░░  20% $250    │
│  Entertainment ███░░░░░░░░░  15% $187    │
│  Shopping      ████░░░░░░░░  20% $251    │
├──────────────────────────────────────────┤
│  [Todas ▼]  ← Filtro por categoría      │
├──────────────────────────────────────────┤
│  📝 Supermercado        Food  -$85.00    │
│  🗑️                     28/01/2026       │
│                                          │
│  📝 Uber                Transport -$35   │
│  🗑️                     27/01/2026       │
└──────────────────────────────────────────┘
```

---

## 📅 CRONOGRAMA

### DÍA 1: Core MVC funcionando
1. Implementar `Expense` (modelo de datos)
2. Implementar `ExpenseModel` (CRUD + Observer)
3. Implementar `ExpenseView` (render lista + form)
4. Implementar `ExpenseController` (coordinar)
5. Add/Delete/List funcionando
6. localStorage (save/load)

**Checkpoint día 1:** Puedo agregar, ver y eliminar gastos. Se guardan al recargar.

### DÍA 2: Stats + filtros + polish
1. Implementar cálculo de estadísticas en Model
2. Implementar render de stats + barras de progreso en View
3. Implementar filtro por categoría
4. Testing completo
5. Polish

**Checkpoint día 2:** Stats se actualizan en tiempo real. Filtro por categoría funciona.

---

## ✅ FEATURES MVP

**Must Have:**
- [ ] Agregar gasto (descripción, monto, categoría, fecha)
- [ ] Eliminar gasto
- [ ] Lista de gastos
- [ ] Total gastado
- [ ] Stats por categoría (monto + porcentaje + barra visual)
- [ ] Filtro por categoría
- [ ] localStorage

**Nice to Have (si sobra tiempo):**
- [ ] Ordenar por fecha/monto
- [ ] Editar gasto existente

---

## 🎯 PATRONES QUE APLICÁS

**1. MVC** → Arquitectura del proyecto completo  
**2. Observer** → Model notifica cambios → View se actualiza  
**3. reduce()** → Calcular totales y stats  
**4. Event Delegation** → Lista de gastos con un solo listener  
**5. Inmutabilidad** → getAll() retorna copia  

---

## 💻 HTML/CSS BASE

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Expense Tracker</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #0f1923;
      color: #e2e8f0;
      min-height: 100vh;
      padding: 24px;
    }

    .container {
      max-width: 720px;
      margin: 0 auto;
    }

    /* Header */
    .header {
      text-align: center;
      margin-bottom: 28px;
    }

    .header h1 {
      font-size: 1.8rem;
      color: #fff;
      margin-bottom: 4px;
    }

    .header p {
      color: #64748b;
      font-size: 0.9rem;
    }

    /* Cards */
    .card {
      background: #1a2736;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 16px;
      border: 1px solid #243447;
    }

    .card-title {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #64748b;
      margin-bottom: 12px;
      font-weight: 600;
    }

    /* Form */
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .form-grid .full-width {
      grid-column: 1 / -1;
    }

    .form-group label {
      display: block;
      font-size: 0.8rem;
      color: #64748b;
      margin-bottom: 6px;
    }

    .form-group input,
    .form-group select {
      width: 100%;
      padding: 10px 12px;
      background: #0f1923;
      border: 1px solid #243447;
      border-radius: 8px;
      color: #e2e8f0;
      font-size: 0.9rem;
      font-family: inherit;
    }

    .form-group input:focus,
    .form-group select:focus {
      outline: none;
      border-color: #38bdf8;
    }

    .form-group input[type="date"]::-webkit-calendar-picker-indicator {
      filter: invert(1);
      cursor: pointer;
    }

    .btn-add {
      width: 100%;
      padding: 12px;
      background: linear-gradient(135deg, #38bdf8, #0ea5e9);
      border: none;
      border-radius: 8px;
      color: #fff;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      margin-top: 4px;
      transition: opacity 0.2s;
    }

    .btn-add:hover {
      opacity: 0.85;
    }

    /* Stats */
    .stats-total {
      font-size: 2rem;
      font-weight: 700;
      color: #f8fafc;
      margin-bottom: 16px;
    }

    .stats-total span {
      font-size: 1rem;
      color: #64748b;
      font-weight: 400;
    }

    .stat-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 14px;
    }

    .stat-label {
      width: 100px;
      font-size: 0.85rem;
      color: #94a3b8;
      flex-shrink: 0;
    }

    .stat-bar-wrap {
      flex: 1;
      background: #0f1923;
      border-radius: 6px;
      height: 8px;
      overflow: hidden;
    }

    .stat-bar {
      height: 100%;
      border-radius: 6px;
      transition: width 0.4s ease;
    }

    .stat-bar.food       { background: #38bdf8; }
    .stat-bar.transport { background: #a78bfa; }
    .stat-bar.entertainment { background: #fb923c; }
    .stat-bar.shopping  { background: #34d399; }
    .stat-bar.other     { background: #64748b; }

    .stat-amount {
      width: 80px;
      text-align: right;
      font-size: 0.85rem;
      color: #f8fafc;
      font-weight: 600;
      flex-shrink: 0;
    }

    .stat-percent {
      width: 38px;
      text-align: right;
      font-size: 0.75rem;
      color: #64748b;
      flex-shrink: 0;
    }

    /* Filter */
    .filter-bar {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: 6px 14px;
      background: #0f1923;
      border: 1px solid #243447;
      border-radius: 20px;
      color: #94a3b8;
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }

    .filter-btn:hover {
      border-color: #38bdf8;
      color: #38bdf8;
    }

    .filter-btn.active {
      background: #38bdf8;
      border-color: #38bdf8;
      color: #fff;
    }

    /* Expense List */
    .expense-list {
      min-height: 120px;
    }

    .expense-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 0;
      border-bottom: 1px solid #243447;
    }

    .expense-item:last-child {
      border-bottom: none;
    }

    .expense-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .expense-icon {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      flex-shrink: 0;
    }

    .expense-icon.food          { background: #1e3a5f; }
    .expense-icon.transport     { background: #2d1f4e; }
    .expense-icon.entertainment { background: #3d2214; }
    .expense-icon.shopping      { background: #1a3d2e; }
    .expense-icon.other         { background: #1f2937; }

    .expense-desc {
      font-size: 0.9rem;
      color: #f1f5f9;
      font-weight: 500;
    }

    .expense-date {
      font-size: 0.75rem;
      color: #64748b;
      margin-top: 2px;
    }

    .expense-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .expense-amount {
      font-size: 0.95rem;
      font-weight: 600;
      color: #f43f5e;
    }

    .btn-delete {
      background: none;
      border: none;
      color: #475569;
      cursor: pointer;
      font-size: 1rem;
      padding: 4px;
      border-radius: 4px;
      transition: color 0.2s;
    }

    .btn-delete:hover {
      color: #f43f5e;
    }

    /* Empty State */
    .empty-state {
      text-align: center;
      padding: 40px 20px;
      color: #475569;
    }

    .empty-state .empty-icon {
      font-size: 2.5rem;
      margin-bottom: 12px;
    }

    .empty-state p {
      font-size: 0.85rem;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="container">

    <!-- Header -->
    <div class="header">
      <h1>💰 Expense Tracker</h1>
      <p>Controlá tus gastos diarios</p>
    </div>

    <!-- Form -->
    <div class="card">
      <div class="card-title">Nuevo Gasto</div>
      <form id="expense-form">
        <div class="form-grid">
          <div class="form-group full-width">
            <label>Descripción</label>
            <input type="text" id="expense-desc" placeholder="Ej: Supermercado" required>
          </div>
          <div class="form-group">
            <label>Monto ($)</label>
            <input type="number" id="expense-amount" placeholder="0.00" min="0" step="0.01" required>
          </div>
          <div class="form-group">
            <label>Categoría</label>
            <select id="expense-category">
              <option value="Food">🍔 Food</option>
              <option value="Transport">🚗 Transport</option>
              <option value="Entertainment">🎬 Entertainment</option>
              <option value="Shopping">🛍️ Shopping</option>
              <option value="Other">📦 Other</option>
            </select>
          </div>
          <div class="form-group">
            <label>Fecha</label>
            <input type="date" id="expense-date" required>
          </div>
        </div>
        <button type="submit" class="btn-add">➕ Agregar Gasto</button>
      </form>
    </div>

    <!-- Stats -->
    <div class="card">
      <div class="card-title">Estadísticas</div>
      <div id="stats-container">
        <!-- Se renderiza dinámicamente -->

        <!-- EJEMPLO SIMULADO (estructura de referencia) -->
        <div class="stats-total">$1,250.00 <span>gastado</span></div>

        <div class="stat-row">
          <div class="stat-label">Food</div>
          <div class="stat-bar-wrap">
            <div class="stat-bar food" style="width: 45%"></div>
          </div>
          <div class="stat-percent">45%</div>
          <div class="stat-amount">$562.50</div>
        </div>

        <div class="stat-row">
          <div class="stat-label">Transport</div>
          <div class="stat-bar-wrap">
            <div class="stat-bar transport" style="width: 20%"></div>
          </div>
          <div class="stat-percent">20%</div>
          <div class="stat-amount">$250.00</div>
        </div>

        <div class="stat-row">
          <div class="stat-label">Entertainment</div>
          <div class="stat-bar-wrap">
            <div class="stat-bar entertainment" style="width: 15%"></div>
          </div>
          <div class="stat-percent">15%</div>
          <div class="stat-amount">$187.50</div>
        </div>

        <div class="stat-row">
          <div class="stat-label">Shopping</div>
          <div class="stat-bar-wrap">
            <div class="stat-bar shopping" style="width: 20%"></div>
          </div>
          <div class="stat-percent">20%</div>
          <div class="stat-amount">$250.00</div>
        </div>
      </div>
    </div>

    <!-- Filter -->
    <div class="card">
      <div class="card-title">Filtrar</div>
      <div id="filter-bar" class="filter-bar">
        <!-- Se renderiza dinámicamente -->
        <button class="filter-btn active" data-category="All">Todas</button>
        <button class="filter-btn" data-category="Food">🍔 Food</button>
        <button class="filter-btn" data-category="Transport">🚗 Transport</button>
        <button class="filter-btn" data-category="Entertainment">🎬 Entertainment</button>
        <button class="filter-btn" data-category="Shopping">🛍️ Shopping</button>
        <button class="filter-btn" data-category="Other">📦 Other</button>
      </div>
    </div>

    <!-- Expense List -->
    <div class="card">
      <div class="card-title">Gastos</div>
      <div id="expense-list" class="expense-list">
        <!-- Se renderiza dinámicamente -->

        <!-- EJEMPLO SIMULADO (estructura de referencia) -->
        <div class="expense-item" data-id="1">
          <div class="expense-left">
            <div class="expense-icon food">🍔</div>
            <div>
              <div class="expense-desc">Supermercado</div>
              <div class="expense-date">28/01/2026</div>
            </div>
          </div>
          <div class="expense-right">
            <div class="expense-amount">-$85.00</div>
            <button class="btn-delete" data-id="1">🗑️</button>
          </div>
        </div>

        <div class="expense-item" data-id="2">
          <div class="expense-left">
            <div class="expense-icon transport">🚗</div>
            <div>
              <div class="expense-desc">Uber</div>
              <div class="expense-date">27/01/2026</div>
            </div>
          </div>
          <div class="expense-right">
            <div class="expense-amount">-$35.00</div>
            <button class="btn-delete" data-id="2">🗑️</button>
          </div>
        </div>
      </div>
    </div>

  </div>

  <script type="module" src="app.js"></script>
</body>
</html>
```

---

## 🔨 PLANTILLAS DE CLASES

### **expense.js**

```javascript
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
  }

  /**
   * Expense → objeto plano (para localStorage)
   * @returns {Object}
   */
  toJSON() {
    // TODO: Retornar objeto con todas las propiedades
  }

  /**
   * Objeto plano → Expense (desde localStorage)
   * @param {Object} json
   * @returns {Expense}
   */
  static fromJSON(json) {
    // TODO: Crear Expense desde objeto plano
  }
}
```

---

### **expense-model.js**

```javascript
// ============================================
// EXPENSE MODEL (lógica de negocio)
// ============================================

import { Expense } from './expense.js';

// Categorías válidas del sistema
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
  }

  notify() {
    // TODO: Ejecutar todos los observers
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
  }

  /**
   * Retornar todos los gastos (copia)
   * @returns {Expense[]}
   */
  getAll() {
    // TODO: Retornar copia del array
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
    //   const total = this.#expenses.reduce((sum, e) => sum + e.amount, 0)
    //
    // TODO: Calcular por categoría con reduce
    //   Usar CATEGORIES para iterar categorías
    //   Para cada categoría → filtrar y sumar amounts
    //   Calcular porcentaje: (categoryTotal / total) * 100
    //   Si total es 0 → percent es 0 (evitar dividir por 0)
    //
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
  }

  /**
   * Cargar gastos desde JSON
   * @param {Object[]} data
   */
  loadFromJSON(data) {
    // TODO: Mapear JSON a Expenses con Expense.fromJSON()
    // TODO: Actualizar #nextId (Math.max de IDs + 1)
    //       Cuidado: si está vacío, #nextId stays 1
  }
}
```

---

### **expense-view.js**

```javascript
// ============================================
// EXPENSE VIEW (presentación)
// ============================================

import { CATEGORIES, CATEGORY_ICONS } from './expense-model.js';

export class ExpenseView {
  constructor(formId, statsId, filterBarId, listId) {
    // TODO: Guardar referencias DOM
    // this.form = document.getElementById(formId)
    // this.statsContainer = document.getElementById(statsId)
    // this.filterBar = document.getElementById(filterBarId)
    // this.expenseList = document.getElementById(listId)
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
  }

  /**
   * Renderizar un item de la lista
   * @param {import('./expense.js').Expense} expense
   * @returns {string} HTML del item
   */
  renderExpenseItem(expense) {
    // TODO: Retornar HTML de un expense-item
    // Usar la estructura del HTML simulado como referencia:
    //
    // <div class="expense-item" data-id="...">
    //   <div class="expense-left">
    //     <div class="expense-icon [category lowercase]">[emoji]</div>
    //     <div>
    //       <div class="expense-desc">[description]</div>
    //       <div class="expense-date">[fecha formateada DD/MM/YYYY]</div>
    //     </div>
    //   </div>
    //   <div class="expense-right">
    //     <div class="expense-amount">-$[amount formateado]</div>
    //     <button class="btn-delete" data-id="[id]">🗑️</button>
    //   </div>
    // </div>
    //
    // HINTS:
    // - Categoría en lowercase para la clase: expense.category.toLowerCase()
    // - Emoji: usar CATEGORY_ICONS[expense.category]
    // - Fecha: new Date(expense.date).toLocaleDateString()
    // - Monto con 2 decimales: expense.amount.toFixed(2)
  }

  renderEmpty() {
    // TODO: Mostrar empty state
    // Usar la estructura .empty-state del CSS
  }

  // ==========================================
  // RENDERING - STATS
  // ==========================================

  /**
   * Renderizar estadísticas completas
   * @param {{ total: number, byCategory: Object }} stats
   */
  renderStats(stats) {
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
  }

  clearForm() {
    // TODO: Resetear el form
    // this.form.reset()
    // Y volver a poner la fecha de hoy en el input date
  }

  // ==========================================
  // EVENTS
  // ==========================================

  onSubmit(callback) {
    // TODO: Escuchar submit del form
    // preventDefault + llamar callback
  }

  onDelete(callback) {
    // TODO: Event delegation en expense-list
    // Escuchar clicks en .btn-delete
    // Obtener id del dataset
    // Llamar callback(id)
  }

  onFilterChange(callback) {
    // TODO: Event delegation en filter-bar
    // Escuchar clicks en .filter-btn
    // Obtener category del dataset
    // Llamar callback(category)
  }
}
```

---

### **expense-controller.js**

```javascript
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

    // TODO: Setup listeners del view
    // onSubmit → this.addExpense()
    // onDelete → this.deleteExpense(id)
    // onFilterChange → this.setFilter(category)

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
  }

  deleteExpense(id) {
    // TODO: Confirmar con confirm()
    // TODO: Llamar model.remove(Number(id))
    // NOTA: updateView() se llama automáticamente por Observer
  }

  setFilter(category) {
    // TODO: Guardar category en this.activeCategory
    // TODO: Llamar this.updateView()
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
  }

  // ==========================================
  // PERSISTENCE
  // ==========================================

  save() {
    // TODO: model.toJSON() → localStorage.setItem(STORAGE_KEY, ...)
  }

  load() {
    // TODO: localStorage.getItem(STORAGE_KEY)
    // TODO: Si existe → model.loadFromJSON(JSON.parse(...))
  }
}
```

---

### **app.js**

```javascript
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
```

---

## 🏗️ ARQUITECTURA

```
┌──────────────────────────────────────────┐
│           EXPENSE CONTROLLER             │
│  - addExpense()                          │
│  - deleteExpense(id)                     │
│  - setFilter(category)                   │
│  - updateView()                          │
│  - save() / load()                       │
└──────┬────────────────────┬─────────────┘
       │                    │
       ↓                    ↓
┌──────────────┐   ┌─────────────────────┐
│EXPENSE MODEL │   │   EXPENSE VIEW      │
│              │   │                     │
│ - #expenses  │   │ - renderList()      │
│ - add()      │   │ - renderStats()     │
│ - remove()   │   │ - renderFilters()   │
│ - getAll()   │   │ - renderExpenseItem │
│ - getStats() │   │ - getFormData()     │
│ - subscribe/ │   │ - onSubmit()        │
│   notify()   │   │ - onDelete()        │
└──────────────┘   │ - onFilterChange()  │
                   └─────────────────────┘
```

---

## ✅ CHECKLIST

**Día 1:**
- [ ] Expense (modelo de datos) implementado
- [ ] ExpenseModel CRUD funcionando
- [ ] ExpenseView renderiza lista
- [ ] ExpenseController coordina
- [ ] Puedo agregar gastos
- [ ] Puedo eliminar gastos
- [ ] localStorage guarda y carga

**Día 2:**
- [ ] getStats() calcula totales correctamente
- [ ] renderStats() muestra barras de progreso
- [ ] Filtro por categoría funciona
- [ ] Stats se actualizan al agregar/eliminar
- [ ] Filtro se mantiene activo correctamente
- [ ] Testing completo sin bugs

---

FIN DEL PROYECTO

**Integrador 1 de 5**  
**Duración:** 2 días  
**Siguiente:** Integrador 2 (cuando termines este)
