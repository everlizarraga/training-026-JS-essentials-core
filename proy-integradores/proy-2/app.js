// ============================================
// APP - ENTRY POINT
// ============================================

import { RecipeModel } from './js/recipe-model.js';
import { RecipeView } from './js/recipe-view.js';
import { RecipeController } from './js/recipe-controller.js';

const model = new RecipeModel();
const view = new RecipeView('recipe-grid', 'recipe-modal', 'search-input', 'filter-bar');
const controller = new RecipeController(model, view);

// Auto-save cuando cambia
model.subscribe(() => {
  controller.save();
});

