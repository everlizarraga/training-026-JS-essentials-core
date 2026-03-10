// ============================================
// CHAT MODEL (lógica de negocio)
// ============================================

import { Room } from './room.js';
import { Message } from './message.js';

export class ChatModel {
  /** @type {Room[]} */
  #rooms = [];

  /** @type {string} */
  #activeRoomId = null;

  /** @type {{id:string, name:string, avatar:string}} */
  #currentUser = { id: 'user-1', name: 'You', avatar: 'U' };

  #nextRoomId = 1;
  #nextMessageId = 1;
  #observers = [];

  // Auto-responder config
  #autoResponderEnabled = true;
  #botUsers = [
    { id: 'bot-1', name: 'Alice', avatar: 'A' },
    { id: 'bot-2', name: 'Bob', avatar: 'B' },
    { id: 'bot-3', name: 'Charlie', avatar: 'C' }
  ];

  // ==========================================
  // OBSERVER
  // ==========================================

  subscribe(callback) {
    // TODO: Implementar
    if (!callback) throw new Error('Es necesaria una callback');
    this.#observers.push(callback);
  }

  notify() {
    // TODO: Implementar
    this.#observers.forEach(c => c());
  }

  // ==========================================
  // USER
  // ==========================================

  getCurrentUser() {
    // TODO: Retornar currentUser
    return { ...this.#currentUser };
  }

  setCurrentUser(name) {
    // TODO: Actualizar currentUser.name
    // TODO: notify()
    this.#currentUser.name = name;
    this.notify();
  }

  // ==========================================
  // ROOMS
  // ==========================================

  addRoom(name, type = 'channel') {
    // TODO: Crear Room
    // TODO: Push a #rooms
    // TODO: notify()
    const nuevoRoom = new Room(`room-${this.#nextRoomId}`, name, type, []);
    this.#nextRoomId += 1;
    this.#rooms.push(nuevoRoom);
    this.notify();
  }

  removeRoom(roomId) {
    // TODO: Filtrar #rooms
    // TODO: Si era activeRoom → cambiar a primera room
    // TODO: notify()
    const indexRoom = this.#rooms.findIndex(r => r.id === roomId);
    if (indexRoom === -1) return;
    const targetRoom = this.#rooms[indexRoom];
    this.#rooms.splice(indexRoom, 1);
    if (targetRoom.id === this.#activeRoomId) {
      this.#activeRoomId = this.#rooms.length > 0 ? this.#rooms[0].id : null;
    }
    this.notify();
  }

  setActiveRoom(roomId) {
    // TODO: Guardar en #activeRoomId
    // TODO: notify()
    const targetRoom = this.#rooms.find(r => r.id === roomId);
    if (!targetRoom) throw new Error(`Room [${roomId}] no encontrada`);
    this.#activeRoomId = targetRoom.id;
    this.notify();
  }

  getActiveRoom() {
    // TODO: Find room con #activeRoomId
    return this.#rooms.find(r => r.id == this.#activeRoomId);
  }

  getAllRooms() {
    // TODO: Retornar copia
    return [...this.#rooms];
  }

  // ==========================================
  // MESSAGES
  // ==========================================

  /**
   * Enviar mensaje a room activa
   * @param {string} content 
   */
  sendMessage(content) {
    // TODO: Procesar commands (/help, /me, /shrug)
    // TODO: Crear Message
    // TODO: Agregar a room activa
    // TODO: notify()
    // TODO: Si autoResponder → scheduleAutoReply()
    let messageContent = this.processCommand(content);
    if (!messageContent) messageContent = content;
    const timeStamp = (new Date()).toISOString();
    const message = new Message(`m-${this.#nextMessageId}`, this.#currentUser.id, this.#currentUser.name, messageContent, timeStamp, [], []);
    this.#nextMessageId += 1;
    const targetRoom = this.getActiveRoom(this.#activeRoomId);
    if (!targetRoom) throw new Error(`Current Room ${this.#activeRoomId} no encontrada`);
    targetRoom.addMessage(message);
    this.notify();
    this.scheduleAutoReply();
  }

  /**
   * Reply a un mensaje (thread)
   */
  replyToMessage(messageId, content) {
    // TODO: Buscar mensaje original
    // TODO: Crear Message reply
    // TODO: message.addReply(reply)
    // TODO: notify()
    const currentRoom = this.getActiveRoom();
    if (!currentRoom) {
      console.error(`Active Room : null`);
      return;
    }
    const message = currentRoom.getMessage(messageId);
    if (!message) throw new Error(`Mensaje ${messageId} no enncontrado!!!`);
    const timeStamp = (new Date()).toISOString();
    const reply = new Message(`m-${this.#nextMessageId}`, this.#currentUser.id, this.#currentUser.name, content, timeStamp, [], []);
    this.#nextMessageId += 1;
    message.addReply(reply);
    this.notify();
  }

  deleteMessage(messageId) {
    // TODO: Buscar en room activa
    // TODO: Remover mensaje
    // TODO: notify()
    const currentRoom = this.getActiveRoom();
    if (!currentRoom) {
      console.error(`Room null`);
      return;
    }
    currentRoom.removeMessage(messageId);
    this.notify();
  }

  /**
   * Toggle reaction en mensaje
   */
  toggleReaction(messageId, emoji) {
    // TODO: Buscar mensaje
    // TODO: Si usuario ya reaccionó → removeReaction
    // TODO: Si no → addReaction
    // TODO: notify()
    const currentUser = this.getCurrentUser();
    const currentRoom = this.getActiveRoom();
    if (!currentRoom) {
      console.error(`Room null`);
      return;
    }
    const message = currentRoom.getMessage(messageId);
    if (!message) {
      console.error(`Message ${messageId} no encontrado`);
      return;
    }
    const reaction = message.reactions.find(r => r.emoji == emoji);
    if (!reaction) {
      message.addReaction(emoji, currentUser.id);
    } else {
      if (reaction.users.includes(currentUser.id)) {
        message.removeReaction(emoji, currentUser.id);
      } else {
        message.addReaction(emoji, currentUser.id);
      }
    }
    this.notify();
  }

  /**
 * Buscar mensajes en todas las rooms
 * @param {string} query - Texto a buscar
 * @returns {Array<{roomId: string, roomName: string, message: Message}>}
 */
  searchMessages(query) {
    // TODO: Buscar en TODOS los rooms
    // TODO: Incluir threads (replies)
    // TODO: Retornar array de { roomId, message }
    // Si query vacío, retornar array vacío
    if (!query || query.trim() === '') {
      return [];
    }

    const results = [];
    const searchLower = query.toLowerCase();

    // Buscar en cada room
    for (const room of this.#rooms) {
      // Buscar recursivamente en los mensajes de esta room
      const messagesInRoom = this.#searchInMessages(room.getMessages(), searchLower);

      // Agregar resultados con info de la room
      for (const message of messagesInRoom) {
        results.push({
          roomId: room.id,
          roomName: room.name,
          message: message
        });
      }
    }

    return results;
  }

  /**
   * Buscar en array de mensajes (recursivo para replies)
   * @private
   * @param {Message[]} messages - Array de mensajes donde buscar
   * @param {string} searchLower - Query en minúsculas
   * @returns {Message[]} - Mensajes que matchean
   */
  #searchInMessages(messages, searchLower) {
    const found = [];

    for (const msg of messages) {
      // ¿Este mensaje contiene el query?
      if (msg.content.toLowerCase().includes(searchLower)) {
        found.push(msg);
      }

      // Buscar también en sus replies (recursivo)
      if (msg.replies.length > 0) {
        const foundInReplies = this.#searchInMessages(msg.replies, searchLower);
        found.push(...foundInReplies);
      }
    }

    return found;
  }

  // ==========================================
  // AUTO-RESPONDER (SIMULATION)
  // ==========================================

  scheduleAutoReply() {
    // TODO: Si autoResponder deshabilitado → return
    // TODO: Random delay (1-5 segundos)
    // TODO: Random bot user
    // TODO: Random response
    // TODO: setTimeout(() => this.addBotMessage(...), delay)
    if (!this.#autoResponderEnabled) return;
    const random = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    const countBots = this.#botUsers.length;
    const indexBot = Math.floor(Math.random() * (countBots - 0)) + 0;
    const bot = this.#botUsers[indexBot];
    if (!bot) {
      console.error('Both no seleccionado');
      return;
    }
    const responses = [
      'Hola! ¿Cómo estás?',
      'Interesante punto!',
      '¿Me contás más sobre eso?',
      'Totalmente de acuerdo',
      'Hmm, no estoy seguro...',
      '¡Genial! 🎉'
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    setTimeout(() => {
      this.addBotMessage(bot.id, bot.name, randomResponse);
    }, random * 1000);
  }

  addBotMessage(userId, userName, content) {
    // TODO: Crear mensaje de bot
    // TODO: Agregar a room activa
    // TODO: notify()
    const timeStamp = (new Date()).toISOString();
    const message = new Message(`bm.${this.#nextMessageId}`, userId, userName, content, timeStamp, [], []);
    this.#nextMessageId += 1;
    const room = this.getActiveRoom();
    if (!room) {
      console.error(`Current Room no encontraad`);
      return;
    }
    room.addMessage(message);
    this.notify();
  }

  // ==========================================
  // COMMANDS
  // ==========================================

  processCommand(content) {
    // TODO: Detectar si empieza con /
    // TODO: /help → retornar mensaje de ayuda
    // TODO: /me → retornar mensaje en tercera persona
    // TODO: /shrug → retornar ¯\_(ツ)_/¯
    // TODO: Si no es command → retornar null
    if (!content.startsWith('/')) return null;

    const parts = content.split(' ');
    const command = parts[0];
    const args = parts.slice(1).join(' ');

    switch (command) {
      case '/help':
        return 'Comandos disponibles:\n/help - Ayuda\n/me <acción> - Mensaje de acción\n/shrug - ¯\\_(ツ)_/¯';

      case '/me':
        return `* ${this.#currentUser.name} ${args}`;

      case '/shrug':
        return '¯\\_(ツ)_/¯';

      default:
        return null;
    }
  }

  // ==========================================
  // MARKDOWN PARSING
  // ==========================================

  /**
 * Parsear markdown simple a HTML
 * Soporta: *negrita*, _cursiva_, `código`
 * @param {string} text - Texto con markdown
 * @returns {string} - HTML
 */
  parseMarkdown(text) {
    // TODO: **bold** → <strong>bold</strong>
    // TODO: *italic* → <em>italic</em>
    // TODO: `code` → <code>code</code>
    // TODO: Retornar HTML parseado
    if (!text) return '';

    let result = text;

    // 1. Código inline (PRIMERO - para no romper con * o _ dentro)
    //    `código` → <code>código</code>
    result = result.replace(/`([^`]+)`/g, '<code>$1</code>');

    // 2. Negrita
    //    *texto* → <strong>texto</strong>
    result = result.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');

    // 3. Cursiva
    //    _texto_ → <em>texto</em>
    result = result.replace(/_([^_]+)_/g, '<em>$1</em>');

    return result;
  }

  // ==========================================
  // PERSISTENCE
  // ==========================================

  toJSON() {
    // TODO: Guardar rooms, activeRoomId, currentUser
    return {
      rooms: this.#rooms.map(room => room.toJSON()),
      activeRoomId: this.#activeRoomId,
      currentUser: this.#currentUser,
      nextRoomId: this.#nextRoomId,
      nextMessageId: this.#nextMessageId,
      autoResponderEnabled: this.#autoResponderEnabled
    }
  }

  loadFromJSON(data) {
    // TODO: Cargar todo
    this.#rooms = data.rooms.map(roomData => Room.fromJSON(roomData));
    this.#activeRoomId = data.activeRoomId;
    this.#currentUser = data.currentUser;
    this.#nextRoomId = data.nextRoomId;
    this.#nextMessageId = data.nextMessageId;
    this.#autoResponderEnabled = data.autoResponderEnabled;

    if (!this.#activeRoomId || !this.#rooms.find(r => r.id === this.#activeRoomId)) {
      if (this.#rooms.length > 0) {
        this.#activeRoomId = this.#rooms[0].id;
      }
    }
  }
}
