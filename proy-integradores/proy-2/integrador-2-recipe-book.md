# 🍳 PROYECTO INTEGRADOR 2: Recipe Book

**Duración:** 2 días máximo  
**Nivel:** Medio (integrador 2 de 5)  
**Objetivo:** Integrar MVC + Fetch API + localStorage + búsqueda + favoritos en app real

---

## ⏰ GOVERNOR

- 📅 **Día 1:** Fetch API funcionando + lista de recetas + búsqueda básica
- 📅 **Día 2:** Favoritos + filtros + custom recipes + polish
- ✅ **80% funcional = Suficiente**
- 🚫 **Máximo 2 iteraciones**
- 🚫 **Si llegás al límite → subir lo que tenés**

---

## 🎯 ¿QUÉ VAS A CONSTRUIR?

Una app de recetas que:
- Busca recetas desde una API pública (TheMealDB - gratis)
- Muestra recetas con imagen y detalles
- Permite agregar recetas a favoritos (localStorage)
- Permite crear recetas propias (custom recipes)
- Filtra por categoría
- Vista de detalle con ingredientes e instrucciones

```
┌──────────────────────────────────────────┐
│         🍳 RECIPE BOOK                   │
├──────────────────────────────────────────┤
│  [🔍 Search recipes...     ] [Search]    │
│  [Todas ▼] ← Filtro categoría            │
├──────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  │
│  │ [IMG]   │  │ [IMG]   │  │ [IMG]   │  │
│  │ Pasta   │  │ Chicken │  │ Salad   │  │
│  │ 🍝      │  │ 🍗      │  │ 🥗      │  │
│  │ ⭐ FAV  │  │ ☆       │  │ ⭐ FAV  │  │
│  └─────────┘  └─────────┘  └─────────┘  │
├──────────────────────────────────────────┤
│  [➕ Add Custom Recipe]                  │
└──────────────────────────────────────────┘
```

**Click en receta → Modal con:**
- Imagen grande
- Ingredientes
- Instrucciones paso a paso
- Botón para marcar/desmarcar favorito

---

## 🆕 COMPLEJIDAD AÑADIDA (vs Integrador 1)

**1. Fetch API externo**
- Llamar API pública para obtener recetas
- Manejar loading states
- Manejar errores de red

**2. Dos fuentes de datos**
- Recetas de API (externas)
- Custom recipes (propias del usuario)
- Favoritos (IDs guardados en localStorage)

**3. Vista de detalle**
- Modal o sección expandida
- Mostrar/ocultar con JavaScript

**4. Búsqueda real**
- Query a la API (async)
- Debounce (ya lo conocés de Notes)

---

## 📅 CRONOGRAMA

### DÍA 1: API + Lista + Búsqueda
1. Setup API de TheMealDB
2. RecipeModel con fetch
3. RecipeView renderiza lista de recetas
4. RecipeController coordina
5. Búsqueda básica funciona
6. Vista de detalle (modal básico)

**Checkpoint día 1:** Puedo buscar recetas, ver lista, abrir detalle.

### DÍA 2: Favoritos + Custom + Filtros
1. Sistema de favoritos (localStorage)
2. Agregar custom recipes
3. Filtro por categoría
4. Separar favoritos de recetas normales
5. Testing + polish

**Checkpoint día 2:** Favoritos funcionan. Puedo agregar recetas custom. Filtros funcionan.

---

## ✅ FEATURES MVP

**Must Have:**
- [ ] Buscar recetas en API
- [ ] Mostrar lista de recetas con imagen
- [ ] Vista de detalle (ingredientes + instrucciones)
- [ ] Marcar/desmarcar favoritos
- [ ] Ver lista de favoritos
- [ ] Agregar custom recipes
- [ ] Filtro por categoría
- [ ] localStorage para favoritos y custom recipes

**Nice to Have (si sobra tiempo):**
- [ ] Editar custom recipes
- [ ] Eliminar custom recipes
- [ ] Compartir receta (copiar link)

---

## 🎯 PATRONES QUE APLICÁS

**1. MVC** → Arquitectura completa  
**2. Observer** → Model notifica cambios  
**3. Async/Await** → Fetch de API  
**4. Debounce** → Búsqueda con delay  
**5. Loading States** → Mostrar spinner mientras carga  
**6. Error Handling** → try/catch en fetch  
**7. Modal Pattern** → Vista de detalle overlay  

---

## 🌐 API: TheMealDB

**Base URL:** `https://www.themealdb.com/api/json/v1/1/`

**Endpoints que vas a usar:**

```javascript
// Buscar por nombre
GET https://www.themealdb.com/api/json/v1/1/search.php?s=chicken
// Retorna: { meals: [{ idMeal, strMeal, strMealThumb, strCategory, ... }] }

// Buscar por primera letra
GET https://www.themealdb.com/api/json/v1/1/search.php?f=a

// Random recipe
GET https://www.themealdb.com/api/json/v1/1/random.php

// Detalle por ID
GET https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772

// Listar categorías
GET https://www.themealdb.com/api/json/v1/1/categories.php
```

**Estructura de un Meal (receta de la API):**

```javascript
{
  idMeal: "52772",
  strMeal: "Teriyaki Chicken Casserole",
  strCategory: "Chicken",
  strArea: "Japanese",
  strInstructions: "Preheat oven to 350°F...",
  strMealThumb: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
  strIngredient1: "soy sauce",
  strMeasure1: "3/4 cup",
  strIngredient2: "water",
  strMeasure2: "1/2 cup",
  // ... hasta strIngredient20, strMeasure20
}
```

**IMPORTANTE:** Los ingredientes vienen en propiedades separadas (strIngredient1...20, strMeasure1...20). Necesitás combinarlos en un array.

---

## 💻 HTML/CSS BASE

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recipe Book</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    /* Header */
    .header {
      text-align: center;
      color: white;
      margin-bottom: 30px;
    }

    .header h1 {
      font-size: 2.5rem;
      margin-bottom: 8px;
    }

    .header p {
      opacity: 0.9;
      font-size: 1rem;
    }

    /* Search Bar */
    .search-section {
      background: white;
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .search-bar {
      display: flex;
      gap: 10px;
      margin-bottom: 15px;
    }

    .search-input {
      flex: 1;
      padding: 12px 16px;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      font-size: 1rem;
      font-family: inherit;
    }

    .search-input:focus {
      outline: none;
      border-color: #667eea;
    }

    .btn-search {
      padding: 12px 24px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-search:hover {
      background: #5568d3;
    }

    .filter-bar {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: 6px 14px;
      background: #f1f5f9;
      border: 2px solid #e2e8f0;
      border-radius: 20px;
      color: #475569;
      font-size: 0.875rem;
      cursor: pointer;
      font-family: inherit;
      font-weight: 500;
      transition: all 0.2s;
    }

    .filter-btn:hover {
      border-color: #667eea;
      color: #667eea;
    }

    .filter-btn.active {
      background: #667eea;
      border-color: #667eea;
      color: white;
    }

    /* Add Custom Recipe */
    .add-custom {
      background: white;
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .btn-add-custom {
      width: 100%;
      padding: 14px;
      background: #34d399;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-add-custom:hover {
      background: #10b981;
    }

    /* Recipe Grid */
    .recipe-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .recipe-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      position: relative;
    }

    .recipe-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }

    .recipe-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .recipe-body {
      padding: 16px;
    }

    .recipe-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 8px;
    }

    .recipe-category {
      display: inline-block;
      padding: 4px 10px;
      background: #f1f5f9;
      color: #64748b;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
      margin-bottom: 12px;
    }

    .recipe-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .recipe-source {
      font-size: 0.75rem;
      color: #94a3b8;
    }

    .btn-favorite {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .btn-favorite:hover {
      transform: scale(1.2);
    }

    .btn-favorite.active {
      color: #ef4444;
    }

    /* Loading */
    .loading {
      text-align: center;
      padding: 60px 20px;
      color: white;
      font-size: 1.2rem;
    }

    .loading-spinner {
      display: inline-block;
      width: 40px;
      height: 40px;
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 16px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Empty State */
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      background: white;
      border-radius: 12px;
      color: #64748b;
    }

    .empty-state .empty-icon {
      font-size: 4rem;
      margin-bottom: 16px;
    }

    /* Modal */
    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      z-index: 1000;
      overflow-y: auto;
      padding: 20px;
    }

    .modal.active {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal-content {
      background: white;
      border-radius: 16px;
      max-width: 700px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
    }

    .modal-header {
      position: relative;
    }

    .modal-image {
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-radius: 16px 16px 0 0;
    }

    .btn-close-modal {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 40px;
      height: 40px;
      background: white;
      border: none;
      border-radius: 50%;
      font-size: 1.5rem;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .btn-close-modal:hover {
      background: #f1f5f9;
    }

    .modal-body {
      padding: 24px;
    }

    .modal-title {
      font-size: 1.8rem;
      color: #1e293b;
      margin-bottom: 8px;
    }

    .modal-meta {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;
    }

    .modal-section {
      margin-bottom: 24px;
    }

    .modal-section h3 {
      font-size: 1.2rem;
      color: #334155;
      margin-bottom: 12px;
    }

    .ingredient-list {
      list-style: none;
    }

    .ingredient-list li {
      padding: 8px 0;
      border-bottom: 1px solid #f1f5f9;
    }

    .ingredient-list li:last-child {
      border-bottom: none;
    }

    .instructions {
      line-height: 1.8;
      color: #475569;
    }
  </style>
</head>
<body>
  <div class="container">

    <!-- Header -->
    <div class="header">
      <h1>🍳 Recipe Book</h1>
      <p>Descubrí y guardá tus recetas favoritas</p>
    </div>

    <!-- Search -->
    <div class="search-section">
      <div class="search-bar">
        <input 
          type="text" 
          id="search-input" 
          class="search-input"
          placeholder="Buscar recetas (ej: chicken, pasta, salad)..."
        >
        <button id="btn-search" class="btn-search">🔍 Buscar</button>
      </div>

      <!-- Filters -->
      <div id="filter-bar" class="filter-bar">
        <!-- Se renderiza dinámicamente -->
        <button class="filter-btn active" data-filter="All">Todas</button>
        <button class="filter-btn" data-filter="Favorites">⭐ Favoritos</button>
        <button class="filter-btn" data-filter="Custom">📝 Mis Recetas</button>
      </div>
    </div>

    <!-- Add Custom Recipe -->
    <div class="add-custom">
      <button id="btn-add-custom" class="btn-add-custom">
        ➕ Agregar Mi Receta
      </button>
    </div>

    <!-- Recipe Grid -->
    <div id="recipe-grid" class="recipe-grid">
      <!-- Se renderiza dinámicamente -->

      <!-- EJEMPLO de estructura (no funcional) -->
      <div class="recipe-card" data-id="52772">
        <img 
          src="https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg"
          alt="Recipe"
          class="recipe-image"
        >
        <div class="recipe-body">
          <h3 class="recipe-title">Teriyaki Chicken</h3>
          <span class="recipe-category">Chicken</span>
          <div class="recipe-footer">
            <span class="recipe-source">TheMealDB</span>
            <button class="btn-favorite">☆</button>
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- Modal de Detalle -->
  <div id="recipe-modal" class="modal">
    <div class="modal-content">
      <!-- Se renderiza dinámicamente -->
      
      <!-- EJEMPLO de estructura -->
      <div class="modal-header">
        <img 
          src="https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg"
          alt="Recipe"
          class="modal-image"
        >
        <button class="btn-close-modal">✕</button>
      </div>

      <div class="modal-body">
        <h2 class="modal-title">Teriyaki Chicken Casserole</h2>
        <div class="modal-meta">
          <span class="recipe-category">Chicken</span>
          <span class="recipe-source">Japanese</span>
        </div>

        <div class="modal-section">
          <h3>Ingredientes</h3>
          <ul class="ingredient-list">
            <li>3/4 cup soy sauce</li>
            <li>1/2 cup water</li>
            <li>1/4 cup brown sugar</li>
          </ul>
        </div>

        <div class="modal-section">
          <h3>Instrucciones</h3>
          <p class="instructions">
            Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick spray...
          </p>
        </div>

        <button class="btn-favorite">☆ Agregar a Favoritos</button>
      </div>
    </div>
  </div>

  <script type="module" src="app.js"></script>
</body>
</html>
```

---

## 🔨 PLANTILLAS DE CLASES

### **recipe.js**

```javascript
// ============================================
// RECIPE (modelo de datos)
// ============================================

export class Recipe {
  /**
   * @param {string} id - ID único (para API o custom)
   * @param {string} name - Nombre de la receta
   * @param {string} category - Categoría
   * @param {string} image - URL de la imagen
   * @param {string[]} ingredients - Array de ingredientes con medidas
   * @param {string} instructions - Instrucciones
   * @param {string} source - 'api' o 'custom'
   */
  constructor(id, name, category, image, ingredients, instructions, source = 'api') {
    // TODO: Asignar propiedades
  }

  /**
   * Recipe → objeto plano (para localStorage)
   */
  toJSON() {
    // TODO: Retornar objeto con todas las propiedades
  }

  /**
   * Objeto plano → Recipe (desde localStorage)
   */
  static fromJSON(json) {
    // TODO: Crear Recipe desde objeto
  }

  /**
   * Meal de la API → Recipe
   * IMPORTANTE: Combinar strIngredient1...20 y strMeasure1...20
   * @param {Object} meal - Objeto de la API TheMealDB
   */
  static fromAPI(meal) {
    // TODO: Crear Recipe desde estructura de TheMealDB
    // HINT: Iterar de 1 a 20 para combinar ingredientes
    //
    // const ingredients = [];
    // for (let i = 1; i <= 20; i++) {
    //   const ingredient = meal[`strIngredient${i}`];
    //   const measure = meal[`strMeasure${i}`];
    //   if (ingredient && ingredient.trim()) {
    //     ingredients.push(`${measure} ${ingredient}`.trim());
    //   }
    // }
    //
    // return new Recipe(
    //   meal.idMeal,
    //   meal.strMeal,
    //   meal.strCategory,
    //   meal.strMealThumb,
    //   ingredients,
    //   meal.strInstructions,
    //   'api'
    // );
  }
}
```

---

### **recipe-model.js**

```javascript
// ============================================
// RECIPE MODEL (lógica de negocio)
// ============================================

import { Recipe } from './recipe.js';

const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

export class RecipeModel {
  /** @type {Recipe[]} */
  #recipes = [];        // Recetas de la API o búsqueda actual
  
  /** @type {Recipe[]} */
  #customRecipes = [];  // Recetas custom del usuario
  
  /** @type {Set<string>} */
  #favorites = new Set(); // IDs de recetas favoritas
  
  #nextCustomId = 1;
  #observers = [];

  // ==========================================
  // OBSERVER
  // ==========================================

  subscribe(callback) {
    // TODO: Implementar
  }

  notify() {
    // TODO: Implementar
  }

  // ==========================================
  // API CALLS
  // ==========================================

  /**
   * Buscar recetas por nombre
   * @param {string} query
   * @returns {Promise<Recipe[]>}
   */
  async searchRecipes(query) {
    // TODO: Fetch a la API
    // URL: `${API_BASE}/search.php?s=${query}`
    // Si query está vacío, usar 'chicken' por default
    //
    // const response = await fetch(url);
    // const data = await response.json();
    // 
    // if (!data.meals) return [];
    // 
    // this.#recipes = data.meals.map(meal => Recipe.fromAPI(meal));
    // this.notify();
    // return this.#recipes;
  }

  /**
   * Obtener receta por ID (detalle completo)
   * @param {string} id
   * @returns {Promise<Recipe>}
   */
  async getRecipeById(id) {
    // TODO: Fetch detalle
    // URL: `${API_BASE}/lookup.php?i=${id}`
    //
    // Si el ID empieza con 'custom-' → buscar en #customRecipes
    // Sino → fetch de la API
  }

  // ==========================================
  // CUSTOM RECIPES
  // ==========================================

  /**
   * Agregar receta custom
   */
  addCustomRecipe(name, category, image, ingredients, instructions) {
    // TODO: Validar datos
    // TODO: Crear Recipe con id = `custom-${this.#nextCustomId}`
    // TODO: Agregar a #customRecipes
    // TODO: Incrementar #nextCustomId
    // TODO: notify()
  }

  /**
   * Obtener todas las custom recipes
   */
  getCustomRecipes() {
    // TODO: Retornar copia de #customRecipes
  }

  // ==========================================
  // FAVORITES
  // ==========================================

  /**
   * Toggle favorito (agregar o quitar)
   * @param {string} id
   */
  toggleFavorite(id) {
    // TODO: Si existe en #favorites → delete
    // TODO: Sino → add
    // TODO: notify()
  }

  /**
   * Verificar si es favorito
   * @param {string} id
   * @returns {boolean}
   */
  isFavorite(id) {
    // TODO: Retornar #favorites.has(id)
  }

  /**
   * Obtener solo favoritos
   * @returns {Recipe[]}
   */
  getFavorites() {
    // TODO: Combinar #recipes y #customRecipes
    // TODO: Filtrar solo los que están en #favorites
  }

  // ==========================================
  // QUERIES
  // ==========================================

  /**
   * Obtener todas las recetas (API + custom)
   */
  getAllRecipes() {
    // TODO: Retornar [...this.#recipes, ...this.#customRecipes]
  }

  /**
   * Filtrar por categoría
   */
  getByCategory(category) {
    // TODO: Si category === 'All' → getAllRecipes()
    // TODO: Sino → filtrar
  }

  // ==========================================
  // PERSISTENCE
  // ==========================================

  toJSON() {
    // TODO: Retornar objeto con:
    // {
    //   customRecipes: [...],
    //   favorites: Array.from(this.#favorites)
    // }
  }

  loadFromJSON(data) {
    // TODO: Cargar customRecipes
    // TODO: Cargar favorites (new Set(data.favorites))
    // TODO: Actualizar #nextCustomId
  }
}
```

---

### **recipe-view.js**

```javascript
// ============================================
// RECIPE VIEW (presentación)
// ============================================

export class RecipeView {
  constructor(gridId, modalId, searchInputId, filterBarId) {
    // TODO: Guardar referencias DOM
    this.grid = document.getElementById(gridId);
    this.modal = document.getElementById(modalId);
    this.searchInput = document.getElementById(searchInputId);
    this.filterBar = document.getElementById(filterBarId);
  }

  // ==========================================
  // RENDERING - GRID
  // ==========================================

  /**
   * Renderizar grid de recetas
   * @param {import('./recipe.js').Recipe[]} recipes
   * @param {Set<string>} favorites - Set de IDs favoritos
   */
  renderGrid(recipes, favorites) {
    // TODO: Si vacío → renderEmpty()
    // TODO: Mapear con renderRecipeCard(recipe, isFavorite)
    // TODO: Actualizar this.grid.innerHTML
  }

  /**
   * Renderizar card de receta
   */
  renderRecipeCard(recipe, isFavorite) {
    // TODO: Retornar HTML
    // Estructura:
    // <div class="recipe-card" data-id="...">
    //   <img src="..." class="recipe-image">
    //   <div class="recipe-body">
    //     <h3 class="recipe-title">...</h3>
    //     <span class="recipe-category">...</span>
    //     <div class="recipe-footer">
    //       <span class="recipe-source">...</span>
    //       <button class="btn-favorite [active si isFavorite]">
    //         [⭐ si favorito, ☆ si no]
    //       </button>
    //     </div>
    //   </div>
    // </div>
  }

  renderEmpty() {
    // TODO: Mostrar empty state
    this.grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <p>No se encontraron recetas</p>
      </div>
    `;
  }

  renderLoading() {
    // TODO: Mostrar loading spinner
    this.grid.innerHTML = `
      <div class="loading">
        <div class="loading-spinner"></div>
        <p>Buscando recetas...</p>
      </div>
    `;
  }

  // ==========================================
  // RENDERING - MODAL
  // ==========================================

  /**
   * Abrir modal con detalle de receta
   */
  showModal(recipe, isFavorite) {
    // TODO: Generar HTML del modal
    // Estructura:
    // <div class="modal-header">
    //   <img src="..." class="modal-image">
    //   <button class="btn-close-modal">✕</button>
    // </div>
    // <div class="modal-body">
    //   <h2 class="modal-title">...</h2>
    //   <div class="modal-meta">...</div>
    //   <div class="modal-section">
    //     <h3>Ingredientes</h3>
    //     <ul class="ingredient-list">
    //       [mapear recipe.ingredients]
    //     </ul>
    //   </div>
    //   <div class="modal-section">
    //     <h3>Instrucciones</h3>
    //     <p class="instructions">...</p>
    //   </div>
    //   <button class="btn-favorite" data-id="...">
    //     [⭐ Quitar / ☆ Agregar] de Favoritos
    //   </button>
    // </div>
    //
    // TODO: Actualizar this.modal.innerHTML
    // TODO: Agregar clase 'active' al modal
  }

  closeModal() {
    // TODO: Quitar clase 'active'
  }

  // ==========================================
  // RENDERING - FILTROS
  // ==========================================

  renderFilters(activeFilter) {
    // TODO: Renderizar botones de filtro
    // 'All', 'Favorites', 'Custom'
    // Marcar el activo con clase 'active'
  }

  // ==========================================
  // FORM DATA
  // ==========================================

  getSearchQuery() {
    // TODO: Retornar valor del search input
  }

  clearSearch() {
    // TODO: Limpiar search input
  }

  // ==========================================
  // EVENTS
  // ==========================================

  onSearch(callback) {
    // TODO: Click en btn-search
    // TODO: Enter en search-input
  }

  onCardClick(callback) {
    // TODO: Event delegation en grid
    // Detectar clicks en .recipe-card
    // Obtener id del dataset
  }

  onFavoriteClick(callback) {
    // TODO: Event delegation
    // Detectar clicks en .btn-favorite
    // Obtener id del dataset
    // IMPORTANTE: stopPropagation() para que no dispare onCardClick
  }

  onFilterChange(callback) {
    // TODO: Event delegation en filter-bar
    // Detectar clicks en .filter-btn
  }

  onModalClose(callback) {
    // TODO: Click en .btn-close-modal
    // TODO: Click en el overlay (fuera de modal-content)
  }

  onAddCustom(callback) {
    // TODO: Click en #btn-add-custom
  }
}
```

---

### **recipe-controller.js**

```javascript
// ============================================
// RECIPE CONTROLLER (coordinación)
// ============================================

import { RecipeModel } from './recipe-model.js';
import { RecipeView } from './recipe-view.js';

const STORAGE_KEY = 'APP:recipes';

export class RecipeController {
  constructor(model, view) {
    /** @type {RecipeModel} */
    this.model = model;
    /** @type {RecipeView} */
    this.view = view;

    this.activeFilter = 'All';

    // TODO: Suscribirse al model
    // TODO: Setup listeners de view

    // Cargar datos y hacer búsqueda inicial
    this.load();
    this.searchRecipes('chicken'); // Búsqueda default al inicio
  }

  // ==========================================
  // ACTIONS
  // ==========================================

  async searchRecipes(query) {
    // TODO: Si query vacío → query = 'chicken'
    // TODO: Mostrar loading con view.renderLoading()
    // TODO: await model.searchRecipes(query)
    // TODO: updateView()
    // TODO: Manejar errores con try/catch
  }

  async showRecipeDetail(id) {
    // TODO: await model.getRecipeById(id)
    // TODO: const isFavorite = model.isFavorite(id)
    // TODO: view.showModal(recipe, isFavorite)
  }

  toggleFavorite(id) {
    // TODO: model.toggleFavorite(id)
    // (updateView se llama automáticamente por Observer)
  }

  addCustomRecipe() {
    // TODO: Pedir datos con prompts (simple para MVP)
    // const name = prompt('Nombre de la receta:')
    // const category = prompt('Categoría:')
    // const image = prompt('URL de imagen (opcional):')
    // const ingredientsStr = prompt('Ingredientes (separados por coma):')
    // const instructions = prompt('Instrucciones:')
    //
    // TODO: Validar
    // TODO: Convertir ingredientsStr a array
    // TODO: model.addCustomRecipe(...)
    // TODO: alert('Receta agregada!')
  }

  setFilter(filter) {
    // TODO: Guardar en this.activeFilter
    // TODO: updateView()
  }

  // ==========================================
  // VIEW UPDATE
  // ==========================================

  updateView() {
    // TODO: Obtener recipes según filtro activo
    // 'All' → model.getAllRecipes()
    // 'Favorites' → model.getFavorites()
    // 'Custom' → model.getCustomRecipes()
    //
    // TODO: Obtener favorites (Set) para pasarle al view
    // TODO: view.renderGrid(recipes, favorites)
    // TODO: view.renderFilters(this.activeFilter)
  }

  // ==========================================
  // PERSISTENCE
  // ==========================================

  save() {
    // TODO: model.toJSON() → localStorage
  }

  load() {
    // TODO: localStorage → model.loadFromJSON()
  }
}
```

---

### **app.js**

```javascript
// ============================================
// APP - ENTRY POINT
// ============================================

import { RecipeModel } from './recipe-model.js';
import { RecipeView } from './recipe-view.js';
import { RecipeController } from './recipe-controller.js';

const model = new RecipeModel();
const view = new RecipeView('recipe-grid', 'recipe-modal', 'search-input', 'filter-bar');
const controller = new RecipeController(model, view);

// Auto-save cuando cambia
model.subscribe(() => {
  controller.save();
});
```

---

## 🏗️ ARQUITECTURA

```
┌────────────────────────────────────────┐
│        RECIPE CONTROLLER               │
│  - searchRecipes(query)                │
│  - showRecipeDetail(id)                │
│  - toggleFavorite(id)                  │
│  - addCustomRecipe()                   │
│  - setFilter(filter)                   │
│  - updateView()                        │
└──────┬──────────────────┬──────────────┘
       │                  │
       ↓                  ↓
┌──────────────┐   ┌──────────────────┐
│RECIPE MODEL  │   │  RECIPE VIEW     │
│              │   │                  │
│ - #recipes   │   │ - renderGrid()   │
│ - #custom    │   │ - showModal()    │
│ - #favorites │   │ - renderLoading()│
│ - searchAPI()│   │ - onSearch()     │
│ - toggle     │   │ - onCardClick()  │
│   Favorite() │   │ - onFavorite     │
│              │   │   Click()        │
└──────────────┘   └──────────────────┘
```

---

## ✅ CHECKLIST

**Día 1:**
- [ ] Recipe.fromAPI() convierte meals correctamente
- [ ] RecipeModel.searchRecipes() funciona
- [ ] RecipeView.renderGrid() muestra recetas
- [ ] Búsqueda funciona (input + botón)
- [ ] Click en card abre modal
- [ ] Modal muestra detalle completo
- [ ] Loading state aparece durante búsqueda

**Día 2:**
- [ ] Toggle favoritos funciona
- [ ] Filtro 'Favorites' muestra solo favoritos
- [ ] addCustomRecipe() agrega recetas
- [ ] Custom recipes se muestran en grid
- [ ] localStorage guarda favoritos y custom
- [ ] Todo funciona sin bugs

---

## 💡 HINTS IMPORTANTES

**1. Combinar ingredientes de la API:**
```javascript
// TheMealDB tiene ingredientes en propiedades separadas
// strIngredient1, strMeasure1, strIngredient2, strMeasure2, ...
// Necesitás combinarlos en un array

const ingredients = [];
for (let i = 1; i <= 20; i++) {
  const ingredient = meal[`strIngredient${i}`];
  const measure = meal[`strMeasure${i}`];
  if (ingredient && ingredient.trim()) {
    ingredients.push(`${measure} ${ingredient}`.trim());
  }
}
```

**2. stopPropagation en favoritos:**
```javascript
onFavoriteClick(callback) {
  this.grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-favorite');
    if (!btn) return;
    e.stopPropagation();  // ← Evita que dispare onCardClick
    const id = btn.dataset.id;
    callback(id);
  });
}
```

**3. Modal overlay close:**
```javascript
onModalClose(callback) {
  // Click en botón close
  this.modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-close-modal')) {
      callback();
    }
    // Click fuera del modal-content (en el overlay)
    if (e.target === this.modal) {
      callback();
    }
  });
}
```

---

FIN DEL PROYECTO

**Integrador 2 de 5**  
**Duración:** 2 días  
**Siguiente:** Integrador 3 (cuando termines este)
