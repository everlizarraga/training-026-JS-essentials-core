// ============================================
// RECIPE CONTROLLER (coordinación)
// ============================================

import { RecipeModel } from './recipe-model.js';
import { RecipeView } from './recipe-view.js';
import { Recipe } from './recipe.js';

const STORAGE_KEY = 'APP:recipes';

export class RecipeController {
  constructor(model, view) {
    /** @type {RecipeModel} */
    this.model = model;
    /** @type {RecipeView} */
    this.view = view;

    this.activeFilter = 'All';

    // TODO: Suscribirse al model
    this.model.subscribe(() => {this.updateView()});

    // TODO: Setup listeners de view
    this.view.onSearch(() => {this.searchRecipes(this.view.getSearchQuery())});
    this.view.onCardClick((id) => {this.showRecipeDetail(id)});
    this.view.onFavoriteClick((id) => {this.toggleFavorite(id)});
    this.view.onAddCustom(() => {this.addCustomRecipe()});
    this.view.onFilterChange((filter) => {this.setFilter(filter)});
    this.view.onModalClose(() => {this.view.closeModal()});

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
    // if(query === '' || !query) query = 'chicken';
    if(query === '') {
      this.view.renderEmpty();
      return;
    }
    this.view.renderLoading();
    try {
      const recipes = await this.model.searchRecipes(query);
      if(recipes.length === 0) this.view.renderEmpty();
      this.updateView();
      // Se supone que renderiza automatico
      console.log('Search Recieps:', recipes);
    } catch (error) {
      console.error(error.message);
    }
  }

  async showRecipeDetail(id) {
    // TODO: await model.getRecipeById(id)
    // TODO: const isFavorite = model.isFavorite(id)
    // TODO: view.showModal(recipe, isFavorite)
    try {
      const currentRecipe = await this.model.getRecipeById(id);
      if(!currentRecipe) return;
      this.view.showModal(currentRecipe, this.model.isFavorite(id));
    } catch (error) {
      console.error(error.message);
    }
  }

  toggleFavorite(id) {
    // TODO: model.toggleFavorite(id)
    // (updateView se llama automáticamente por Observer)
    this.model.toggleFavorite(id);
  }

  addCustomRecipe() {
    // TODO: Pedir datos con prompts (simple para MVP)
    const name = prompt('Nombre de la receta:')
    const category = prompt('Categoría:')
    const image = prompt('URL de imagen (opcional):')
    const ingredientsStr = prompt('Ingredientes (separados por coma):')
    const instructions = prompt('Instrucciones:')
    
    // TODO: Validar
    // TODO: Convertir ingredientsStr a array
    // TODO: model.addCustomRecipe(...)
    // TODO: alert('Receta agregada!')

    const ingredientes = ingredientsStr.split(',');
    this.model.addCustomRecipe(name, category, image, ingredientes, instructions);
    alert("Receta agregada!");
    console.log("Receta agregada!");
  }

  setFilter(filter) {
    // TODO: Guardar en this.activeFilter
    // TODO: updateView()
    this.activeFilter = filter;
    this.updateView();
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

    // const recipes = this.model.getByCategory(this.activeFilter);
    /**@type {Recipe[]} */
    let recipes;
    if (this.activeFilter === 'All') {
      recipes = this.model.getAllRecipes();
    } else if(this.activeFilter === 'Favorites'){
      recipes = this.model.getFavorites();
    } else {
      // const favoritos = this.model.getFavorites();
      // recipes = this.model.getAllRecipes().filter(rec => !favoritos.includes(rec));
      recipes = this.model.getCustomRecipes();
    }
    // this.view.renderGrid(recipes, new Set(this.model.getFavorites().map(r => r.id)));
    this.view.renderGrid(recipes, this.model.getAllFavoriteIds());
    // console.log("ACtive Filter:", this.activeFilter);
    this.view.renderFilters(this.activeFilter);

  }

  // ==========================================
  // PERSISTENCE
  // ==========================================

  save() {
    // TODO: model.toJSON() → localStorage
    const data = this.model.toJSON();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  load() {
    // TODO: localStorage → model.loadFromJSON()
    const dataString = localStorage.getItem(STORAGE_KEY);
    let data;
    if(dataString) {
      data = JSON.parse(dataString);
    } else {
      data = {
        customRecipes: [],
        favorites: []
      }
    }
    this.model.loadFromJSON(data);
  }
}

