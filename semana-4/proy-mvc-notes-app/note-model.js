// ============================================
// NOTE MODEL (lógica de negocio)
// ============================================

import { Note } from './note.js';
/**@typedef {import('./note.js').NoteInfo} NoteInfo */

export class NoteModel {
  /**@type {Note[]} */
  #notes = [];
  #nextId = 1;
  #observers = [];

  // ==========================================
  // OBSERVER PATTERN
  // ==========================================

  subscribe(callback) {
    // TODO: Implementar
    if(!callback) {
      throw new Error("Es necesario una callback");
    }
    this.#observers.push(callback);
  }

  notify() {
    // TODO: Implementar
    this.#observers.forEach(cb => cb());
  }

  // ==========================================
  // CRUD
  // ==========================================

  add(title, content, category) {
    // TODO: Validar (título y contenido requeridos)
    // TODO: Crear Note
    // TODO: Agregar a #notes
    // TODO: notify()
    // TODO: Retornar note
    if(!title || title === '') {
      throw new Error("Titulo requerido");
    }
    if(!content || content === '') {
      throw new Error("Contenido requerido");
    }
    const nuevaNota = new Note(this.#nextId, title, content, category? category : 'Personal');
    this.#nextId += 1;
    this.#notes.push(nuevaNota);
    this.notify();
  }

  remove(id) {
    // TODO: Buscar y eliminar
    // TODO: notify()
    const index = this.#notes.findIndex(n => n.id === Number(id));
    if(index !== -1) {
      this.#notes.splice(index, 1);
      console.log(`Nota [id: ${id}] ELIMINADA`);
      this.notify();
      return true;
    } else {
      console.error(`No se pudo eliminar ID: ${id}`);
      return false;
    }
  }

  getAll() {
    // TODO: Retornar copia
    return [...this.#notes];
  }

  // ==========================================
  // QUERIES
  // ==========================================
  /**
   * Fitlrar por titulo y contenido
   * @param {string} query 
   * @returns 
   */
  search(query) {
    // TODO: Filtrar por título o contenido
    // return this.#notes.filter(...)
    return this.getAll().filter(n => 
      n.title.toLowerCase().includes(query.toLowerCase()) ||
      n.content.toLowerCase().includes(query.toLowerCase())
    );
  }

  /**
   * Filtrar pot categoria
   * @param {'Personal'|'Work'|'Ideas'|'Study'} category 
   * @returns {Note[]}
   */
  getByCategory(category) {
    // TODO: Filtrar por categoría
    return this.getAll().filter(n => n.category === category);
  }

  // ==========================================
  // PERSISTENCE
  // ==========================================
  
  toJSON() {
    // TODO: Convertir a JSON
    return this.#notes.map(n => n.toJSON());
  }

  loadFromJSON(data) {
    // TODO: Cargar desde JSON
    // TODO: Actualizar #nextId
    this.#notes = data.map(nj => Note.fromJSON(nj));
    if(this.#notes.length > 0) {
      this.#nextId = Math.max(...this.#notes.map(n => n.id)) +1;
    }
  }
}
