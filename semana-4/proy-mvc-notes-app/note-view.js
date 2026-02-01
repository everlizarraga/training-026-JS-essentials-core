// ============================================
// NOTE VIEW (presentación)
// ============================================

import { Note } from "./note.js";
import { debounce } from "./utils.js"

export class NoteView {
  constructor(listId, formId, searchId) {
    // TODO: Guardar referencias DOM
    this.elements = {
      listElement: document.getElementById(listId),
      formElement: document.getElementById(formId),
      searchElement: document.getElementById(searchId),
      cardNote: document.getElementById(listId).children[0].cloneNode(true)
    };
    this.elements.cardNote.classList.remove('disabled');
    this.elements.listElement.innerHTML = ``;
    this.renderEmpty();
  }

  // ==========================================
  // RENDERING
  // ==========================================

  render(notes) {
    // TODO: Si vacío, renderEmpty()
    // TODO: Generar HTML de cada nota
    // TODO: Actualizar this.listElement.innerHTML
    if(!notes) {
      throw new Error("Es encesario una lsita de Notes");
    }

    if(notes.length === 0) {
      this.renderEmpty();
    } else {
      this.elements.listElement.innerHTML = 
        notes.map(note => this.renderNote(note))
        .join('');
    }
  }

  /**
   * Note -> String
   * @param {Note} note 
   * @returns {string}
   */
  renderNote(note) {
    // TODO: Retornar HTML de una nota
    // Ver estructura en HTML arriba
    /**@type {HTMLElement} */
    const nuevaCard = this.elements.cardNote.cloneNode(true);
    nuevaCard.dataset.id = note.id
    nuevaCard.querySelector('.note-title').textContent = note.title;
    nuevaCard.querySelector('.note-category').textContent = note.category;
    nuevaCard.querySelector('.note-content').textContent = note.content;
    const fecha = new Date(note.createdAt);
    nuevaCard.querySelector('.note-date').textContent = 
      fecha.toLocaleDateString(undefined, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    nuevaCard.querySelector('.btn-delete').dataset.id = note.id;
    return nuevaCard.outerHTML;
  }

  renderEmpty() {
    // TODO: Mostrar empty state
    if (!this.elements.listElement) return;
    // this.elements.listElement.innerHTML = `<div>Sina Notas</div>`;
    this.elements.listElement.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; gap:12px; padding:48px 24px; animation:fadeIn 0.3s ease;">
          <div style="font-size:4.5rem;">📋</div>
          <h3 style="color:#e2e8f0; font-size:1.1rem; font-weight:600; margin:0;">No hay notas</h3>
          <p style="color:#64748b; font-size:0.875rem; margin:0; text-align:center; max-width:260px; line-height:1.5;">Agrega una nueva nota para comenzar a organizar tu trabajo</p>
        </div>
      `;
  }

  // ==========================================
  // FORM
  // ==========================================

  getFormData() {
    // TODO: Obtener valores del form
    // return { title, content, category }
    return {
      title: this.elements.formElement.querySelector('#note-title').value,
      content: this.elements.formElement.querySelector('#note-content').value,
      category: this.elements.formElement.querySelector('#note-category').value
    };
  }

  clearForm() {
    // TODO: Limpiar form
    this.elements.formElement.reset();
  }

  // ==========================================
  // SEARCH
  // ==========================================

  getSearchValue() {
    // TODO: Retornar valor del search input
    return this.elements.searchElement.value;
  }

  // ==========================================
  // EVENT SETUP
  // ==========================================

  onSubmit(callback) {
    // TODO: Escuchar submit del form
    // preventDefault, llamar callback
    this.elements.formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      callback();
    });
  }

  onDelete(callback) {
    // TODO: Event delegation en lista
    // Escuchar clicks en .btn-delete
    this.elements.listElement.addEventListener('click', (e) => {
      const btnDelte = e.target.closest('.btn-delete');
      if(!btnDelte) return;
      const id = btnDelte.dataset.id;
      callback(id);
    });
  }

  onSearch(callback) {
    // TODO: Escuchar input en search
    const fn = debounce(callback, 300);
    this.elements.searchElement.addEventListener('input', (e) => {
      const value = this.getSearchValue();
      fn(value);
    });
  }
}
