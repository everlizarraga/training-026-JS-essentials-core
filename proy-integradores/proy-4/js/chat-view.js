// ============================================
// CHAT VIEW (presentación)
// ============================================

import { Message } from "./message.js";
import { Room } from "./room.js";

export class ChatView {
  constructor(roomsListId, messagesAreaId, messageInputId, searchInputId) {
    this.roomsList = document.getElementById(roomsListId);
    this.messagesArea = document.getElementById(messagesAreaId);
    this.messageInput = document.getElementById(messageInputId);
    this.searchInput = document.getElementById(searchInputId);

    // UI state
    this.expandedThreads = new Set(); // messageIds with visible threads
  }

  // ==========================================
  // RENDERING - ROOMS
  // ==========================================

  /**
   * 
   * @param {Room[]} rooms 
   * @param {string} activeRoomId 
   */
  renderRooms(rooms, activeRoomId) {
    // TODO: Mapear rooms con renderRoom()
    // TODO: Marcar activo

    if (!rooms || rooms.length === 0) {
      this.roomsList.innerHTML = '<div style="padding: 16px; color: #72767d;">No rooms yet</div>';
      return;
    }

    const html = rooms
      .map(room => this.renderRoom(room, room.id === activeRoomId))
      .join('');

    this.roomsList.innerHTML = html;
  }

  /**
   * 
   * @param {Room} room 
   * @param {boolean} isActive 
   * @returns {string} - HTML
   */
  renderRoom(room, isActive) {
    // TODO: Retornar HTML de room-item
    return `
    <div class="room-item ${isActive ? 'active' : ''}" data-id="${room.id}">
      <span class="room-icon">#</span>
      <span>${room.name}</span>
    </div>`;
  }

  // ==========================================
  // RENDERING - MESSAGES
  // ==========================================

  renderMessages(messages, currentUserId) {
    // TODO: Si vacío → renderEmpty()
    // TODO: Mapear con renderMessage()

    if (!messages || messages.length === 0) {
      this.renderEmpty();
      return;
    }

    const html = messages
      .map(msg => this.renderMessage(msg, currentUserId, 0))
      .join('');

    this.messagesArea.innerHTML = html;
  }

  /**
   * Retornar HTML de message
   * @param {Message} message 
   * @param {string} currentUserId 
   * @param {number} level 
   * @returns {string} - HTML
   */
  renderMessage(message, currentUserId, level = 0) {
    // TODO: Retornar HTML de message
    // IMPORTANTE: 
    // - Parsear markdown en content
    // - Mostrar reactions
    // - Botón reply
    // - Si tiene replies y thread expandido → renderizar recursivamente
    // - level determina indentación (thread depth)

    const contentHtml = this.parseMarkdown(message.content);
    const time = this.formatTime(message.timestamp);

    // Renderizar reactions
    const reactionsHtml = message.reactions.length > 0
      ? this.renderReactions(message.reactions, currentUserId)
      : '';

    // Botón de eliminar (solo si es mensaje del usuario actual)
    const deleteBtn = message.userId === currentUserId
      ? '<button class="btn-delete-msg" data-message-id="${message.id}">🗑️</button>'
      : '';

    // Indentación para threads
    const indent = level > 0 ? 'margin-left: 48px;' : '';

    // Thread toggle (si tiene replies)
    let threadHtml = '';
    if (message.replies.length > 0) {
      const isExpanded = this.expandedThreads.has(message.id);
      const toggleText = isExpanded
        ? `▼ Hide ${message.replies.length} ${message.replies.length === 1 ? 'reply' : 'replies'}`
        : `▶ ${message.replies.length} ${message.replies.length === 1 ? 'reply' : 'replies'}`;

      threadHtml = `
      <button class="thread-toggle" data-message-id="${message.id}">
        ${toggleText}
      </button>
    `;

      if (isExpanded) {
        const repliesHtml = message.replies
          .map(reply => this.renderMessage(reply, currentUserId, level + 1))
          .join('');

        threadHtml += `
        <div class="thread">
          ${repliesHtml}
        </div>
      `;
      }
    }

    return `
    <div class="message" data-id="${message.id}" style="${indent}">
      <div class="message-header">
        <span class="message-author">@${this.escapeHtml(message.userName)}</span>
        <span class="message-time">${time}</span>
      </div>
      <div class="message-content">
        ${contentHtml}
      </div>
      <div class="message-footer">
        <div class="reactions">
          ${reactionsHtml}
          <!-- ⭐ AGREGAR BOTÓN ➕ -->
          <button class="btn-add-reaction" data-message-id="${message.id}" title="Add reaction">
            ➕
          </button>
        </div>
        <button class="btn-reply" data-message-id="${message.id}">💬 Reply</button>
        ${deleteBtn}
      </div>
      ${threadHtml}
    </div>
  `;
  }

  /**
   * Renderizar reactions de un mensaje
   * @param {Array<{emoji: string, count: number, users: string[]}>} reactions
   * @param {string} currentUserId
   * @returns {string} HTML
   */
  renderReactions(reactions, currentUserId) {
    // TODO: Mapear reactions
    // TODO: Marcar active si currentUserId está en users
    return reactions
      .map(reaction => {
        const isActive = reaction.users.includes(currentUserId);
        const activeClass = isActive ? 'active' : '';

        return `
          <span class="reaction ${activeClass}" data-emoji="${reaction.emoji}">
            ${reaction.emoji} ${reaction.count}
          </span>
        `;
      })
      .join('');
  }

  toggleThread(messageId) {
    // TODO: Si está en expandedThreads → quitar
    // TODO: Si no → agregar
    // TODO: Re-render messages
    if (this.expandedThreads.has(messageId)) {
      this.expandedThreads.delete(messageId);
    } else {
      this.expandedThreads.add(messageId);
    }
  }

  renderEmpty() {
    // TODO: Empty state
    this.messagesArea.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">💬</div>
        <h3>No messages yet</h3>
        <p>Start the conversation!</p>
      </div>
    `;
  }

  // ==========================================
  // INPUT
  // ==========================================

  getMessageInput() {
    // TODO: Retornar valor y limpiar
    const content = this.messageInput.value.trim();
    this.clearMessageInput();
    return content;
  }

  clearMessageInput() {
    // TODO: Limpiar input
    this.messageInput.value = '';
  }

  focusMessageInput() {
    // TODO: Focus en input
    this.messageInput.focus();
  }

  // ==========================================
  // SEARCH
  // ==========================================

  /**
   * Renderizar resultados de búsqueda
   * @param {Array<{roomId: string, roomName: string, message: Message}>} results
   */
  renderSearchResults(results) {
    // TODO: Mostrar resultados en messages area
    // Formato: [Room name] @user: content

    if (results.length === 0) {
      this.messagesArea.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>No results found</h3>
          <p>Try a different search term</p>
        </div>
      `;
      return;
    }

    const html = results
      .map(result => {
        const contentHtml = this.parseMarkdown(result.message.content);
        const time = this.formatTime(result.message.timestamp);

        return `
          <div class="message" data-id="${result.message.id}">
            <div class="message-header">
              <span style="color: #5865f2;">[${this.escapeHtml(result.roomName)}]</span>
              <span class="message-author">@${this.escapeHtml(result.message.userName)}</span>
              <span class="message-time">${time}</span>
            </div>
            <div class="message-content">
              ${contentHtml}
            </div>
          </div>
        `;
      })
      .join('');

    this.messagesArea.innerHTML = html;
  }

  clearSearch() {
    // TODO: Limpiar search input
    this.searchInput.value = '';
  }

  // ==========================================
  // HELPERS
  // ==========================================

  /**
   * Formatear timestamp a hora legible
   * @param {string} timestamp - ISO string
   * @returns {string}
   */
  formatTime(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  /**
   * Parsear markdown simple a HTML
   * @param {string} text
   * @returns {string}
   */
  parseMarkdown(text) {
    if (!text) return '';

    let result = this.escapeHtml(text);

    // Código inline (primero)
    result = result.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Negrita
    result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    result = result.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');

    // Cursiva
    result = result.replace(/__([^_]+)__/g, '<em>$1</em>');
    result = result.replace(/_([^_]+)_/g, '<em>$1</em>');

    return result;
  }

  /**
   * Escapar HTML para prevenir XSS
   * @param {string} text
   * @returns {string}
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ==========================================
  // EVENTS
  // ==========================================

  /**
   * Listener: Click en room
   * @param {function(string): void} callback - Recibe roomId
   */
  onRoomClick(callback) {
    // TODO: Event delegation en rooms-list
    this.roomsList.addEventListener('click', (e) => {
      const roomItem = e.target.closest('.room-item');
      if (!roomItem) return;
      const roomId = roomItem.dataset.id;
      callback(roomId);
    });
  }

  /**
   * Listener: Click en "Add Room"
   * @param {function(): void} callback - No recibe parámetros
   */
  onAddRoom(callback) {
    // TODO: Click en btn-add-room
    const btnAddRoom = document.getElementById('btn-add-room');
    if (!btnAddRoom) return;
    btnAddRoom.addEventListener('click', () => {
      callback();
    });
  }

  /**
   * Listener: Enter en input (enviar mensaje)
   * @param {function(): void} callback - No recibe parámetros
   */
  onSendMessage(callback) {
    // TODO: Enter en message-input (no Shift+Enter)
    this.messageInput.addEventListener('keydown', (e) => {
      // Solo si es Enter (sin Shift)
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        callback();
      }
    });
  }

  /**
   * Listener: Click en botón Reply
   * @param {function(string): void} callback - Recibe messageId
   */
  onReply(callback) {
    // TODO: Event delegation en .btn-reply
    this.messagesArea.addEventListener('click', (e) => {
      const btnReply = e.target.closest('.btn-reply');
      if (!btnReply) return;

      const messageId = btnReply.dataset.messageId;
      callback(messageId);
    });
  }

  /**
   * Listener: Click en botón Delete
   * @param {function(string): void} callback - Recibe messageId
   */
  onDeleteMessage(callback) {
    // TODO: Event delegation en .btn-delete-msg
    this.messagesArea.addEventListener('click', (e) => {
      const btnDelete = e.target.closest('.btn-delete-msg');
      if (!btnDelete) return;

      const message = btnDelete.closest('.message');
      if (!message) return;

      const messageId = message.dataset.id;
      callback(messageId);
    });
  }

  /**
   * Listener: Click en reaction
   * @param {function(string, string): void} callback - Recibe (messageId, emoji)
   */
  onReactionClick(callback) {
    // TODO: Event delegation en .reaction
    this.messagesArea.addEventListener('click', (e) => {
      const reaction = e.target.closest('.reaction');
      if (!reaction) return;

      const message = reaction.closest('.message');
      if (!message) return;

      const messageId = message.dataset.id;
      const emoji = reaction.dataset.emoji;

      callback(messageId, emoji);
    });
  }

  /**
   * Listener: Click en thread toggle
   * @param {function(string): void} callback - Recibe messageId
   */
  onThreadToggle(callback) {
    // TODO: Event delegation en .thread-toggle
    this.messagesArea.addEventListener('click', (e) => {
      const btnToggle = e.target.closest('.thread-toggle');
      if (!btnToggle) return;

      const messageId = btnToggle.dataset.messageId;
      callback(messageId);
    });
  }

  /**
   * Listener: Input en search (con debounce)
   * @param {function(string): void} callback - Recibe query
   */
  onSearch(callback) {
    // TODO: Input en search-input con debounce
    let timeoutId = null;

    this.searchInput.addEventListener('input', () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        const query = this.searchInput.value.trim();
        callback(query);
      }, 300); // 300ms debounce
    });
  }

  /**
 * Listener: Click en botón "Add Reaction"
 * @param {function(string): void} callback - Recibe messageId
 */
  onAddReaction(callback) {
    this.messagesArea.addEventListener('click', (e) => {
      const btnAdd = e.target.closest('.btn-add-reaction');
      if (!btnAdd) return;

      const messageId = btnAdd.dataset.messageId;
      callback(messageId);
    });
  }
}
