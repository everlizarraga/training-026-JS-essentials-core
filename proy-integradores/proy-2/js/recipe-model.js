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

  #recipesCache = new Map(); // id -> Recipe

  // ==========================================
  // OBSERVER
  // ==========================================

  subscribe(callback) {
    // TODO: Implementar
    if (!callback) {
      throw new Error("Es necesaria una callback");
    }
    this.#observers.push(callback);
  }

  notify() {
    // TODO: Implementar
    this.#observers.forEach(cb => cb());
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
    const url = `${API_BASE}/search.php?s=${query}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.meals) return [];
    // 
    this.#recipes = data.meals.map(meal => Recipe.fromAPI(meal));

    this.#recipes.forEach(r => this.#recipesCache.set(r.id, r));
    this.notify();
    return [...this.#recipes];
  }

  /**
   * Obtener receta por ID (detalle completo)
   * @param {string} id
   * @returns {Promise<Recipe>}
   */
  async getRecipeById(id) {
    // TODO: Fetch detalle
    // URL: `${API_BASE}/lookup.php?i=${id}`
    const url = `${API_BASE}/lookup.php?i=${id}`;

    // Si el ID empieza con 'custom-' → buscar en #customRecipes
    // Sino → fetch de la API
    if (id.includes('custom-')) {
      return this.#customRecipes.find(rec => rec.id === id);
    } else {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP: ${response.status}`);
      }
      const data = await response.json();
      return data.meals ?
        Recipe.fromAPI(data.meals[0]) :
        null;
    }
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
    if (!name || name === '') {
      throw new Error(`Es necesario un nombre`);
    }
    if (!category || category === '') {
      throw new Error("Es necesario una categoria");
    }
    if (!image || image === '') {
      throw new Error("Es necesario una iamgen");
    }
    if (!ingredients || ingredients.length === 0) {
      throw new Error("Es necesaria la lista de ingredientes");
    }
    if (!instructions || instructions === '') {
      throw new Error("Se necesita las instrucciones");
    }

    const customId = `custom-${this.#nextCustomId}`;
    const nuevaReceta =
      new Recipe(customId, name, category, image, ingredients, instructions, 'custom');
    this.#customRecipes.push(nuevaReceta);
    this.#nextCustomId += 1;
    this.notify();
  }

  /**
   * Obtener todas las custom recipes
   */
  getCustomRecipes() {
    // TODO: Retornar copia de #customRecipes
    return [...this.#customRecipes];
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
    if (this.#favorites.has(id)) {
      this.#favorites.delete(id);
    } else {
      this.#favorites.add(id)
    }
    this.notify();
  }

  /**
   * Verificar si es favorito
   * @param {string} id
   * @returns {boolean}
   */
  isFavorite(id) {
    // TODO: Retornar #favorites.has(id)
    return this.#favorites.has(id);
  }

  /**
   * Obtener solo favoritos
   * @returns {Recipe[]}
   */
  getFavorites() {
    // TODO: Combinar #recipes y #customRecipes
    // TODO: Filtrar solo los que están en #favorites
    // return [
    //   ...this.#recipes.filter(r => this.isFavorite(r.id)),
    //   ...this.#customRecipes.filter(r => this.isFavorite(r.id))
    // ];
    const favorites = [];

    // Iterar sobre el Set de IDs favoritos
    for (const id of this.#favorites) {
      if (id.includes('custom-')) {
        // Custom recipe
        const custom = this.#customRecipes.find(r => r.id === id);
        if (custom) favorites.push(custom);
      } else {
        // API recipe - buscar en caché
        const recipe = this.#recipesCache.get(id);
        if (recipe) favorites.push(recipe);
      }
    }

    return favorites;
  }

  // ==========================================
  // QUERIES
  // ==========================================

  /**
   * Obtener todas las recetas (API + custom)
   */
  getAllRecipes() {
    // TODO: Retornar [...this.#recipes, ...this.#customRecipes]
    return [...this.#recipes, ...this.#customRecipes];
  }

  /**
   * Filtrar por categoría
   */
  getByCategory(category) {
    // TODO: Si category === 'All' → getAllRecipes()
    // TODO: Sino → filtrar
    return category === 'All' ?
      this.getAllRecipes() :
      this.getAllRecipes().filter(r => r.category === category);
  }

  getAllFavoriteIds() {
    return new Set(this.#favorites); // Retornar copia del Set
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
    return {
      // customRecipes: [...this.#customRecipes],
      customRecipes: this.#customRecipes.map(r => r.toJSON()),
      favorites: Array.from(this.#favorites),
      recipesCache: Array.from(this.#recipesCache.values()).map(r => r.toJSON())
    }
  }

  loadFromJSON(data) {
    // TODO: Cargar customRecipes
    // TODO: Cargar favorites (new Set(data.favorites))
    // TODO: Actualizar #nextCustomId
    // this.#customRecipes = [...data.customRecipes];
    this.#customRecipes = data.customRecipes.map(r => Recipe.fromJSON(r));
    this.#favorites = new Set(data.favorites);

    if (data.recipesCache) {
      this.#recipesCache = new Map(
        data.recipesCache.map(r => {
          const recipe = Recipe.fromJSON(r);
          return [recipe.id, recipe];
        })
      );
    }

    if (this.#customRecipes.length === 0) {
      this.#nextCustomId = 1;
    } else {
      this.#nextCustomId = Math.max(
        ...this.#customRecipes.map(e => Number(e.id.split('-')[1]))
      ) + 1;
    }
  }
}

