// ============================================
// APP - ENTRY POINT
// ============================================

import { BoardModel } from './js/board-model.js';
import { BoardView } from './js/board-view.js';
import { BoardController } from './js/board-controller.js';

const model = new BoardModel();
const view = new BoardView('board', 'search-input', 'filters');
const controller = new BoardController(model, view);

// Auto-save
model.subscribe(() => {
  controller.save();
});