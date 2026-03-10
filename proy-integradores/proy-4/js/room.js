// ============================================
// ROOM (modelo de datos)
// ============================================

import { Message } from './message.js';

export class Room {
  /**@type {Message[]} */
  #messages = [];
  /**
   * @param {string} id
   * @param {string} name
   * @param {'channel' | 'dm'} type - 'channel' | 'dm'
   * @param {Message[]} messages
   */
  constructor(id, name, type = 'channel', messages = []) {
    // TODO: Asignar propiedades
    this.id = id;
    this.name = name;
    /**@type {'channel' | 'dm'} */
    this.type = type;
    this.#messages = messages;
  }

  /**@param {Message} message  */
  addMessage(message) {
    // TODO: Push message
    this.#messages.push(message);
  }

  /**@param {string} messageId  */
  removeMessage(messageId) {
    // TODO: Filtrar messages
    this.#messages = this.#messages.filter(m => m.id !== messageId);
  }

  /**
 * Obtener mensaje por ID (busca recursivamente en replies)
 * @param {string} messageId
 * @returns {Message|null}
 */
  getMessage(messageId) {
    // Buscar en mensajes principales (nivel raíz)
    for (const msg of this.#messages) {
      // ¿Es este mensaje?
      if (msg.id === messageId) {
        return msg;
      }

      // Si no, buscar en sus replies (recursivo)
      const found = this.#searchInReplies(msg, messageId);
      if (found) {
        return found;
      }
    }

    // No encontrado
    return null;
  }

  /**
   * Buscar mensaje en los replies de otro mensaje (recursivo)
   * @private
   * @param {Message} message - Mensaje donde buscar
   * @param {string} messageId - ID a buscar
   * @returns {Message|null}
   */
  #searchInReplies(message, messageId) {
    // Recorrer todos los replies de este mensaje
    for (const reply of message.replies) {
      // ¿Es este reply el que buscamos?
      if (reply.id === messageId) {
        return reply;
      }

      // Si no, buscar en los replies de este reply (recursión)
      const found = this.#searchInReplies(reply, messageId);
      if (found) {
        return found;
      }
    }

    // No encontrado en este branch
    return null;
  }

  getMessages() {
    // TODO: Retornar copia
    return [...this.#messages];
  }

  toJSON() {
    // TODO: Incluir messages
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      messages: this.getMessages().map(m => m.toJSON())
    };
  }

  static fromJSON(json) {
    // TODO: Message.fromJSON para cada mensaje
    return new Room(
      json.id,
      json.name,
      json.type,
      json.messages.map(m => Message.fromJSON(m))
    );
  }
}
