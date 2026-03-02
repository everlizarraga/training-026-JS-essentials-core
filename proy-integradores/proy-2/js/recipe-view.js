// ============================================
// RECIPE VIEW (presentación)
// ============================================

import { Recipe } from './recipe.js';

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
    if (recipes.length === 0) {
      this.renderEmpty();
    } else {
      this.grid.innerHTML =
        recipes.map(rec => this.renderRecipeCard(rec, favorites.has(rec.id)))
          .join('');
    }
  }

  /**
   * Renderizar card de receta
   * @param {Recipe} recipe 
   * @param {boolean} isFavorite 
   */
  renderRecipeCard(recipe, isFavorite = false) {
    // TODO: Retornar HTML
    // Estructura:
    return `<div class="recipe-card" data-id="${recipe.id}">
      <img src="${recipe.image}" class="recipe-image" alt="${recipe.name}">
      <div class="recipe-body">
        <h3 class="recipe-title">${recipe.name}</h3>
        <span class="recipe-category">${recipe.category}</span>
        <div class="recipe-footer">
          <span class="recipe-source">${recipe.source}</span>
          <button class="btn-favorite ${isFavorite ? 'active' : ''}">
            ${isFavorite ? '⭐' : '☆'}
          </button>
        </div>
      </div>
    </div>`;
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
   * @param {Recipe} recipe 
   * @param {boolean} isFavorite 
   */
  showModal(recipe, isFavorite) {
    // TODO: Actualizar this.modal.innerHTML
    // TODO: Agregar clase 'active' al modal
    const modalContent = this.modal.querySelector('.modal-content');
    modalContent.innerHTML = `<div class="modal-header">
      <img src="${recipe.image}" class="modal-image">
      <button class="btn-close-modal">✕</button>
    </div>
    <div class="modal-body">
      <h2 class="modal-title">${recipe.name}</h2>
      <div class="modal-meta">
        <span class="recipe-category">${recipe.category}</span>
        <span class="recipe-source">${recipe.source}</span>
      </div>
      <div class="modal-section">
        <h3>Ingredientes</h3>
        <ul class="ingredient-list">
          ${recipe.ingredients.map(e => '<li>' + e + '</li>').join('')}
        </ul>
      </div>
      <div class="modal-section">
        <h3>Instrucciones</h3>
        <p class="instructions">${recipe.instructions}</p>
      </div>
      <button class="btn-favorite" data-id="${recipe.id}">
        ${isFavorite ? '⭐ Quitar de Favoritos' : '☆ Agregar a Favoritos'}
      </button>
    </div>`;
    this.modal.classList.add('active');
  }

  closeModal() {
    // TODO: Quitar clase 'active'
    this.modal.classList.remove('active');
  }

  // ==========================================
  // RENDERING - FILTROS
  // ==========================================

  /**
   * Renderizar botones de filtro
   * @param {'All|Favorites|Custom'} activeFilter 
   */
  renderFilters(activeFilter) {
    // 'All', 'Favorites', 'Custom'
    // Marcar el activo con clase 'active'
    const btns = [...this.filterBar.querySelectorAll('.filter-btn')];
    btns.forEach(btn => btn.classList.remove('active'));
    // console.log("btns:", btns);
    const target = btns.find(btn => btn.dataset.filter === activeFilter);
    target?.classList.add('active');
  }

  // ==========================================
  // FORM DATA
  // ==========================================

  getSearchQuery() {
    // TODO: Retornar valor del search input
    return this.searchInput.value;
  }

  clearSearch() {
    // TODO: Limpiar search input
    this.searchInput.value = '';
  }

  // ==========================================
  // EVENTS
  // ==========================================

  onSearch(callback) {
    // TODO: Click en btn-search
    // TODO: Enter en search-input
    const btnSearch = document.getElementById('btn-search');
    btnSearch.addEventListener('click', callback);

    this.searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') callback();
    })
  }

  onCardClick(callback) {
    // TODO: Event delegation en grid
    // Detectar clicks en .recipe-card
    // Obtener id del dataset
    this.grid.addEventListener('click', (event) => {
      const target = event.target.closest('.recipe-card');
      if (!target) return;
      if (event.target.closest('.btn-favorite')) return;
      const id = target.dataset.id;
      callback(id);
    });
  }

  onFavoriteClick(callback) {
    // TODO: Event delegation
    // Detectar clicks en .btn-favorite
    // Obtener id del dataset
    // IMPORTANTE: stopPropagation() para que no dispare onCardClick

    // Clicks en grid
    this.grid.addEventListener('click', (event) => {
      const target = event.target.closest('.btn-favorite');
      if (!target) return;
      event.stopPropagation();
      const card = event.target.closest('.recipe-card');
      const id = card.dataset.id;
      callback(id);
    });

    // ← AGREGAR: Clicks en modal
    this.modal.addEventListener('click', (event) => {
      const target = event.target.closest('.btn-favorite');
      if (!target) return;
      const id = target.dataset.id;
      callback(id);
    });
  }

  onFilterChange(callback) {
    // TODO: Event delegation en filter-bar
    // Detectar clicks en .filter-btn
    this.filterBar.addEventListener('click', (event) => {
      const target = event.target.closest('.filter-btn');
      if (!target) return;
      const type = target.dataset.filter;
      callback(type);
    });
  }

  onModalClose(callback) {
    // TODO: Click en .btn-close-modal
    // TODO: Click en el overlay (fuera de modal-content)
    this.modal.addEventListener('click', (event) => {
      // 1. ¿Fue en el overlay (fondo)?
      const isOverlay = event.target === this.modal;

      // 2. ¿Fue en el botón de cerrar (o dentro de él)?
      const isCloseBtn = event.target.closest('.btn-close-modal');

      // Si cualquiera de los dos es verdadero, ejecutamos el callback
      if (isOverlay || isCloseBtn) {
        callback();
      }
    });
  }

  onAddCustom(callback) {
    // TODO: Click en #btn-add-custom
    const btn = document.getElementById('btn-add-custom');
    if (!btn) return;
    btn.addEventListener('click', (event) => {
      callback();
    });
  }
}

