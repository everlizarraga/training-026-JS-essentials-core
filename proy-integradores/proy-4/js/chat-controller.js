// ============================================
// CHAT CONTROLLER (coordinación)
// ============================================

import { ChatModel } from './chat-model.js';
import { ChatView } from './chat-view.js';

const STORAGE_KEY = 'APP:chat';

export class ChatController {
  constructor(model, view) {
    /** @type {ChatModel} */
    this.model = model;
    /** @type {ChatView} */
    this.view = view;

    // TODO: Suscribirse al model
    this.model.subscribe(() => { this.updateView() });

    // TODO: Setup listeners del view
    this.view.onRoomClick((roomId) => {
      this.switchRoom(roomId);
    });

    this.view.onAddRoom(() => {
      this.addRoom();
    });

    // Messages
    this.view.onSendMessage(() => {
      this.sendMessage();
    });

    this.view.onReply((messageId) => {
      this.replyToMessage(messageId);
    });

    this.view.onDeleteMessage((messageId) => {
      this.deleteMessage(messageId);
    });

    // Reactions
    this.view.onReactionClick((messageId, emoji) => {
      this.toggleReaction(messageId, emoji);
    });

    // Thread
    this.view.onThreadToggle((messageId) => {
      this.toggleThread(messageId);
    });

    // Search
    this.view.onSearch((query) => {
      this.searchMessages(query);
    });

    this.load();
    this.updateView();
  }

  // ==========================================
  // ACTIONS - ROOMS
  // ==========================================

  addRoom() {
    // TODO: Pedir nombre
    // TODO: model.addRoom()
    const name = prompt('Enter room name:');
    if (!name || name.trim() === '') {
      return; // Usuario canceló o nombre vacío
    }
    this.model.addRoom(name.trim());
  }

  switchRoom(roomId) {
    // TODO: model.setActiveRoom(roomId)
    this.model.setActiveRoom(roomId);
    this.view.clearSearch();
  }

  // ==========================================
  // ACTIONS - MESSAGES
  // ==========================================

  sendMessage() {
    // TODO: Obtener input
    // TODO: model.sendMessage(content)
    // TODO: Limpiar input
    // TODO: Scroll to bottom
    const content = this.view.getMessageInput();
    if (!content) return;
    // Enviar mensaje (el model maneja comandos internamente)
    this.model.sendMessage(content);
    this.view.clearMessageInput();
    this.view.focusMessageInput();
    // Scroll to bottom (después de renderizar)
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
  }

  replyToMessage(messageId) {
    // TODO: Pedir contenido de reply
    // TODO: model.replyToMessage(messageId, content)
    const content = prompt('Reply message:');
    if (!content || content.trim() === '') {
      return; // Usuario canceló
    }
    this.model.replyToMessage(messageId, content.trim());
    this.view.focusMessageInput();
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
  }

  deleteMessage(messageId) {
    // TODO: Confirmar
    // TODO: model.deleteMessage(messageId)
    const confirmed = confirm('Delete this message?');
    if (!confirmed) {
      return;
    }
    this.model.deleteMessage(messageId);
  }

  toggleReaction(messageId, emoji) {
    // TODO: model.toggleReaction(messageId, emoji)
    this.model.toggleReaction(messageId, emoji);
  }

  toggleThread(messageId) {
    // TODO: view.toggleThread(messageId)
    this.view.toggleThread(messageId);
    // Re-renderizar para mostrar/ocultar replies
    this.updateView();
  }

  // ==========================================
  // ACTIONS - SEARCH
  // ==========================================

  searchMessages(query) {
    // TODO: Si query vacío → updateView() normal
    // TODO: Si no → results = model.searchMessages(query)
    // TODO: view.renderSearchResults(results)
    if (!query || query.trim() === '') {
      this.updateView();
      return;
    }
    const results = this.model.searchMessages(query.trim());
    this.view.renderSearchResults(results);
  }

  // ==========================================
  // VIEW UPDATE
  // ==========================================

  updateView() {
    // TODO: Obtener rooms
    // TODO: Obtener activeRoom
    // TODO: view.renderRooms(rooms, activeRoomId)
    // TODO: view.renderMessages(activeRoom.messages, currentUser.id)
    const rooms = this.model.getAllRooms();
    const currentRoom = this.model.getActiveRoom();
    const currentUser = this.model.getCurrentUser();
    if (!currentRoom) {
      console.warn('No active room found');
      this.view.renderRooms(rooms, null);
      this.view.renderEmpty();
      return;
    }
    this.view.renderRooms(rooms, currentRoom.id);
    this.view.renderMessages(currentRoom.getMessages(), currentUser.id);
  }

  // ==========================================
  // PERSISTENCE
  // ==========================================

  save() {
    // TODO: localStorage
    try {
      const json = this.model.toJSON();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(json));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  load() {
    // TODO: localStorage
    // TODO: Si vacío, crear rooms default (general, random)
    try {
      const dataString = localStorage.getItem(STORAGE_KEY);
      console.warn("DataString:", dataString);
      if (dataString) {
        // Cargar datos existentes
        this.model.loadFromJSON(JSON.parse(dataString));
      } else {
        // Primera vez - crear rooms default
        this.createDefaultRooms();
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      // Si hay error, crear rooms default
      this.createDefaultRooms();
    }
  }

  /**
   * Crear rooms por defecto (primera vez)
   * @private
   */
  createDefaultRooms() {
    this.model.addRoom('general');
    this.model.addRoom('random');

    // Agregar mensaje de bienvenida
    this.model.sendMessage('Welcome to ChatApp! 👋');
  }

  // ✅ DESPUÉS:
  createDefaultRooms() {
    this.model.addRoom('general');
    this.model.addRoom('random');

    // ⚠️ IMPORTANTE: Setear la primera room como activa
    const rooms = this.model.getAllRooms();
    if (rooms.length > 0) {
      this.model.setActiveRoom(rooms[0].id);
    }

    // Agregar mensaje de bienvenida
    this.model.sendMessage('Welcome to ChatApp! 👋');
  }

  // ==========================================
  // HELPERS
  // ==========================================

  /**
   * Scroll al final del área de mensajes
   * @private
   */
  scrollToBottom() {
    this.view.messagesArea.scrollTop = this.view.messagesArea.scrollHeight;
  }
}
