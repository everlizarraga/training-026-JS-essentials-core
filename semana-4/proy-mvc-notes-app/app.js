// ============================================
// APP - ENTRY POINT
// ============================================

import { NoteModel } from './note-model.js';
import { NoteView } from './note-view.js';
import { NoteController } from './note-controller.js';

// Inicializar MVC
const model = new NoteModel();
const view = new NoteView('notes-list', 'note-form', 'search-input');
const controller = new NoteController(model, view);

// Cargar datos
// controller.load();
// controller.updateView();

// Guardar automáticamente en cada cambio
model.subscribe(() => {
  controller.save();
});
