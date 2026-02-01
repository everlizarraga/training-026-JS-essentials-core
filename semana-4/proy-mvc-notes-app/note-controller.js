// ============================================
// NOTE CONTROLLER (coordinación)
// ============================================

import { NoteModel } from './note-model.js';
import { NoteView } from './note-view.js';

export class NoteController {
  constructor(model, view) {
    // TODO: Guardar model y view
    /**@type {NoteModel} */
    this.model = model;
    /**@type {NoteView} */
    this.view = view;
    this.currentQuery = ''; 

    // TODO: Suscribirse a cambios del model
    this.model.subscribe(() => this.updateView())

    // TODO: Setup listeners del view
    this.view.onSubmit(() => this.addNote())
    this.view.onDelete(id => this.deleteNote(id))
    this.view.onSearch(query => this.search(query))

    // LOad inicial
    this.load();
    this.updateView();
  }

  // ==========================================
  // ACTIONS
  // ==========================================

  addNote() {
    // TODO: Obtener datos del view
    // TODO: Llamar model.add()
    // TODO: Limpiar form
    // (view se actualiza automáticamente por observer)
    try {
      const data = this.view.getFormData();
      console.log("data-addNote:", data);
      this.model.add(data.title, data.content, data.category);
      this.view.clearForm();
    } catch (error) {
      console.error('No se pudo agregar la noata');
      console.error('ERROR:', error.message)
    }
  }

  deleteNote(id) {
    // TODO: Confirmar
    // TODO: Llamar model.remove(id)
    if(confirm(`ELIMINAR [ID:${id}]`)) {
      this.model.remove(id);
    }
  }

  search(query) {
    // TODO: Obtener notas filtradas del model
    // TODO: Renderizar con view
    // if(!query || query === '') return;
    this.currentQuery = query;
    const resultados = this.model.search(query);
    this.view.render(resultados);
  }

  // ==========================================
  // VIEW UPDATE
  // ==========================================

  updateView() {
    // TODO: Obtener todas las notas
    // TODO: Renderizar con view
    if (this.currentQuery) {
      this.search(this.currentQuery);
    } else {
      const notas = this.model.getAll();
      this.view.render(notas);
    }
  }

  // ==========================================
  // PERSISTENCE
  // ==========================================

  save() {
    // TODO: model.toJSON() → localStorage
    const data = this.model.toJSON();
    localStorage.setItem('APP:notes-MVC', JSON.stringify(data));
  }

  load() {
    // TODO: localStorage → model.loadFromJSON()
    const data = localStorage.getItem('APP:notes-MVC');
    if(data) {
      this.model.loadFromJSON(JSON.parse(data));
    } else {
      this.view.renderEmpty();
    }
  }
}
