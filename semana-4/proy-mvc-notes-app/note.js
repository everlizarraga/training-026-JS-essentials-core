// ============================================
// NOTE MODEL (datos)
// ============================================

/**
 * @typedef {Object} NoteInfo
 * @property {number} id
 * @property {string} title
 * @property {string} content
 * @property {string} category
 * @property {string} createdAt
 */

export class Note {
  constructor(id, title, content, category, createdAt) {
    // TODO: Asignar propiedades
    this.id = id;
    this.title = title;
    this.content = content;
    this.category = category;
    this.createdAt = createdAt ? createdAt : new Date().toISOString();
  }

  /**
   * Note -> Json
   * @returns {NoteInfo}
   */
  toJSON() {
    // TODO: Retornar objeto plano
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      category: this.category,
      createdAt: this.createdAt
    };
  }

  /**
   * Json -> Note
   * @param {NoteInfo} json 
   * @returns {Note}
   */
  static fromJSON(json) {
    // TODO: Crear Note desde JSON
    return new Note(json.id, json.title, json.content, json.category, json.createdAt);
  }
}
