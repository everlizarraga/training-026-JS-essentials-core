# 💬 PROYECTO INTEGRADOR 4: Real-Time Chat App

**Duración:** 3 días máximo  
**Nivel:** Alto (integrador 4 de 5)  
**Objetivo:** Integrar MVC + Real-time simulation + Rooms + User management + Message threading + Markdown

---

## ⏰ GOVERNOR

- 📅 **Día 1:** Core chat (rooms, messages, users básico)
- 📅 **Día 2:** Real-time simulation + Message threading + Reactions
- 📅 **Día 3:** Markdown support + Search + User presence + Polish
- ✅ **80% funcional = Suficiente**
- 🚫 **Máximo 2 iteraciones**

---

## 🎯 ¿QUÉ VAS A CONSTRUIR?

Una app de chat estilo Slack/Discord:
- Múltiples rooms (canales)
- Mensajes con threading (respuestas)
- User profiles con avatares
- Real-time simulation (messages automáticos)
- Markdown en mensajes
- Reactions a mensajes
- User presence (online/offline)
- Búsqueda de mensajes

```
┌─────────────────────────────────────────────────────┐
│  💬 ChatApp                [@username ▼]  [Search]  │
├──────────────┬──────────────────────────────────────┤
│              │  # general                           │
│  ROOMS       │  ────────────────────────────────────│
│  # general   │  ┌─────────────────────────────────┐│
│  # random    │  │ @alice · 10:30 AM              ││
│  # dev       │  │ Hey team! 👋                   ││
│              │  │ ❤️ 2  💬 3                      ││
│  DIRECT      │  └─────────────────────────────────┘│
│  👤 Bob      │  ┌─────────────────────────────────┐│
│  👤 Charlie  │  │ @you · 10:32 AM                ││
│              │  │ Looking good! **Ready** to ship││
│  [+ Room]    │  │ 🚀 1  💬 1                      ││
│              │  └─────────────────────────────────┘│
│              │  ────────────────────────────────────│
│              │  [Type a message... /commands]      │
└──────────────┴──────────────────────────────────────┘
```

**Features clave:**
- Rooms con diferentes temas
- Threads (reply to message)
- Reactions con emojis
- Markdown formatting (**bold**, *italic*, `code`)
- Auto-responder simulation (fake real-time)
- User avatars y presence
- Message search
- Commands (/help, /me, /shrug)

---

## 🆕 COMPLEJIDAD AÑADIDA (vs Integrador 3)

### **1. Relaciones complejas (3 niveles)**
```javascript
Room
  └─ Messages[]
       └─ Thread (replies[])
       └─ Reactions[]
```

### **2. Real-time simulation**
```javascript
// Simular otros usuarios enviando mensajes
setTimeout(() => {
  model.addMessage(roomId, 'bot', 'Auto response!');
}, 2000);
```

### **3. Markdown parsing**
```javascript
// **bold** → <strong>bold</strong>
// *italic* → <em>italic</em>
// `code` → <code>code</code>
```

### **4. Threading de mensajes**
```javascript
// Message puede tener replies[]
// View muestra thread expandido/colapsado
```

### **5. Estado de UI más complejo**
```javascript
{
  activeRoom: 'general',
  activeThread: null, // messageId or null
  currentUser: { id, name, avatar },
  viewMode: 'normal' | 'search'
}
```

---

## 📅 CRONOGRAMA

### DÍA 1: Core Chat
1. Message, Room, User models
2. ChatModel con CRUD
3. ChatView renderiza rooms y messages
4. Switch entre rooms
5. Send message básico
6. User profiles
7. localStorage

**Checkpoint día 1:** Puedo crear rooms, enviar mensajes, cambiar de room.

### DÍA 2: Real-time + Threading + Reactions
1. Auto-responder (simular otros usuarios)
2. Message threading (reply)
3. View thread expandido
4. Reactions a mensajes
5. Add/remove reactions

**Checkpoint día 2:** Threads funcionan, reactions funcionan, auto-responder simula actividad.

### DÍA 3: Markdown + Search + Presence
1. Markdown parser básico
2. Búsqueda de mensajes
3. User presence (online/offline)
4. Commands (/help, /me, /shrug)
5. Polish UI
6. Testing completo

**Checkpoint día 3:** Markdown se renderiza, búsqueda funciona, commands funcionan.

---

## ✅ FEATURES MVP

**Must Have:**
- [ ] Crear/eliminar rooms
- [ ] Send/delete messages
- [ ] Switch entre rooms
- [ ] User profiles (name, avatar)
- [ ] Threading (reply to message)
- [ ] View thread
- [ ] Reactions básicas (❤️ 👍 😂)
- [ ] Auto-responder simulation
- [ ] Markdown básico (**bold**, *italic*, `code`)
- [ ] Search messages
- [ ] Commands (/help, /me)
- [ ] User presence indicator
- [ ] localStorage completo

**Nice to Have (si sobra tiempo):**
- [ ] Direct messages
- [ ] @mentions
- [ ] File upload simulation
- [ ] Message edit
- [ ] Typing indicators

---

## 🎯 PATRONES QUE APLICÁS

**1. MVC con relaciones 3-nivel** → Room → Message → Thread/Reactions  
**2. Observer** → Multiple updates on data change  
**3. Command Pattern** → /help, /me, /shrug commands  
**4. Markdown Parser** → Text transformation  
**5. Simulation Pattern** → Fake real-time with setTimeout  
**6. State Machine** → viewMode transitions  
**7. Composite Pattern** → Message with nested replies  

---

## 💻 HTML/CSS BASE

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ChatApp</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #1a1d21;
      color: #dcddde;
      height: 100vh;
      overflow: hidden;
    }

    .app {
      display: flex;
      height: 100vh;
    }

    /* Sidebar */
    .sidebar {
      width: 240px;
      background: #2f3136;
      display: flex;
      flex-direction: column;
    }

    .sidebar-header {
      padding: 16px;
      border-bottom: 1px solid #202225;
      font-weight: 600;
      font-size: 0.95rem;
    }

    .rooms {
      flex: 1;
      overflow-y: auto;
      padding: 8px 0;
    }

    .room-item {
      padding: 8px 16px;
      cursor: pointer;
      transition: background 0.2s;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.9rem;
    }

    .room-item:hover {
      background: #393c43;
    }

    .room-item.active {
      background: #404249;
      color: #fff;
    }

    .room-icon {
      font-size: 1rem;
    }

    .btn-add-room {
      margin: 12px 16px;
      padding: 8px;
      background: #5865f2;
      border: none;
      border-radius: 4px;
      color: white;
      cursor: pointer;
      font-size: 0.85rem;
    }

    /* Main Chat */
    .main-chat {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: #36393f;
    }

    /* Chat Header */
    .chat-header {
      height: 50px;
      padding: 0 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #202225;
      background: #36393f;
    }

    .room-title {
      font-size: 1rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .header-controls {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .search-box {
      position: relative;
    }

    .search-input {
      padding: 6px 32px 6px 10px;
      background: #202225;
      border: 1px solid #202225;
      border-radius: 4px;
      color: #dcddde;
      font-size: 0.85rem;
      width: 200px;
    }

    .search-input:focus {
      outline: none;
      border-color: #5865f2;
    }

    .user-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 8px;
      background: #202225;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.85rem;
    }

    .user-avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #5865f2;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7rem;
      font-weight: 600;
    }

    /* Messages Area */
    .messages-area {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
    }

    .messages-area::-webkit-scrollbar {
      width: 8px;
    }

    .messages-area::-webkit-scrollbar-track {
      background: #2f3136;
    }

    .messages-area::-webkit-scrollbar-thumb {
      background: #202225;
      border-radius: 4px;
    }

    /* Message */
    .message {
      margin-bottom: 16px;
      padding: 8px 12px;
      border-radius: 4px;
      transition: background 0.2s;
    }

    .message:hover {
      background: #32353b;
    }

    .message-header {
      display: flex;
      align-items: baseline;
      gap: 8px;
      margin-bottom: 4px;
    }

    .message-author {
      font-weight: 600;
      color: #fff;
      font-size: 0.95rem;
    }

    .message-time {
      font-size: 0.7rem;
      color: #72767d;
    }

    .message-content {
      color: #dcddde;
      line-height: 1.5;
      font-size: 0.95rem;
      word-wrap: break-word;
    }

    .message-content strong {
      font-weight: 700;
      color: #fff;
    }

    .message-content em {
      font-style: italic;
    }

    .message-content code {
      background: #2f3136;
      padding: 2px 4px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      font-size: 0.85em;
    }

    .message-footer {
      display: flex;
      gap: 12px;
      margin-top: 6px;
      align-items: center;
    }

    .reactions {
      display: flex;
      gap: 4px;
    }

    .reaction {
      padding: 2px 8px;
      background: #2f3136;
      border: 1px solid #202225;
      border-radius: 12px;
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .reaction:hover {
      border-color: #5865f2;
    }

    .reaction.active {
      background: #5865f2;
      border-color: #5865f2;
    }

    .btn-reply {
      background: none;
      border: none;
      color: #72767d;
      cursor: pointer;
      font-size: 0.8rem;
      padding: 2px 6px;
      border-radius: 4px;
    }

    .btn-reply:hover {
      background: #2f3136;
      color: #dcddde;
    }

    .btn-delete-msg {
      background: none;
      border: none;
      color: #72767d;
      cursor: pointer;
      font-size: 0.8rem;
    }

    .btn-delete-msg:hover {
      color: #f04747;
    }

    /* Thread */
    .thread {
      margin-left: 48px;
      margin-top: 8px;
      padding-left: 12px;
      border-left: 2px solid #4f545c;
    }

    .thread-toggle {
      background: none;
      border: none;
      color: #5865f2;
      cursor: pointer;
      font-size: 0.8rem;
      padding: 4px 0;
      font-weight: 600;
    }

    .thread-toggle:hover {
      text-decoration: underline;
    }

    /* Input Area */
    .input-area {
      padding: 16px;
      background: #40444b;
    }

    .message-input-wrap {
      background: #40444b;
      border-radius: 8px;
      padding: 12px;
      border: 1px solid #202225;
    }

    .message-input {
      width: 100%;
      background: none;
      border: none;
      color: #dcddde;
      font-size: 0.95rem;
      font-family: inherit;
      resize: none;
      outline: none;
    }

    .message-input::placeholder {
      color: #72767d;
    }

    .input-footer {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      font-size: 0.75rem;
      color: #72767d;
    }

    /* Empty State */
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #72767d;
    }

    .empty-icon {
      font-size: 3rem;
      margin-bottom: 16px;
    }

    /* Presence indicator */
    .presence {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      display: inline-block;
      margin-left: 4px;
    }

    .presence.online {
      background: #43b581;
    }

    .presence.offline {
      background: #747f8d;
    }
  </style>
</head>
<body>
  <div class="app">

    <!-- Sidebar -->
    <div class="sidebar">
      <div class="sidebar-header">
        💬 ChatApp
      </div>

      <div id="rooms-list" class="rooms">
        <!-- Se renderiza dinámicamente -->
        <div class="room-item active" data-id="general">
          <span class="room-icon">#</span>
          <span>general</span>
        </div>
        <div class="room-item" data-id="random">
          <span class="room-icon">#</span>
          <span>random</span>
        </div>
      </div>

      <button id="btn-add-room" class="btn-add-room">
        ➕ Add Room
      </button>
    </div>

    <!-- Main Chat -->
    <div class="main-chat">

      <!-- Header -->
      <div class="chat-header">
        <div class="room-title">
          <span id="active-room-title"># general</span>
        </div>
        <div class="header-controls">
          <div class="search-box">
            <input 
              type="text" 
              id="search-input" 
              class="search-input"
              placeholder="Search messages..."
            >
          </div>
          <div class="user-badge">
            <div class="user-avatar">U</div>
            <span id="username-display">@user</span>
          </div>
        </div>
      </div>

      <!-- Messages -->
      <div id="messages-area" class="messages-area">
        <!-- Se renderiza dinámicamente -->

        <!-- EJEMPLO de mensaje -->
        <div class="message" data-id="msg-1">
          <div class="message-header">
            <span class="message-author">@alice</span>
            <span class="message-time">10:30 AM</span>
          </div>
          <div class="message-content">
            Hey team! 👋 This is **working** great!
          </div>
          <div class="message-footer">
            <div class="reactions">
              <span class="reaction">❤️ 2</span>
              <span class="reaction">👍 1</span>
            </div>
            <button class="btn-reply">💬 Reply</button>
            <button class="btn-delete-msg">🗑️</button>
          </div>
        </div>
      </div>

      <!-- Input -->
      <div class="input-area">
        <div class="message-input-wrap">
          <textarea 
            id="message-input" 
            class="message-input"
            placeholder="Message #general"
            rows="1"
          ></textarea>
        </div>
        <div class="input-footer">
          <span>💡 Tip: Use **bold**, *italic*, `code`</span>
          <span>/help for commands</span>
        </div>
      </div>

    </div>

  </div>

  <script type="module" src="app.js"></script>
</body>
</html>
```

---

## 🔨 PLANTILLAS DE CLASES

### **message.js**

```javascript
// ============================================
// MESSAGE (modelo de datos)
// ============================================

export class Message {
  /**
   * @param {string} id
   * @param {string} userId - ID del autor
   * @param {string} userName - Nombre del autor
   * @param {string} content - Texto del mensaje
   * @param {string} timestamp - ISO string
   * @param {Object[]} reactions - [{ emoji, count, users[] }]
   * @param {Message[]} replies - Thread replies
   */
  constructor(id, userId, userName, content, timestamp, reactions = [], replies = []) {
    // TODO: Asignar propiedades
  }

  addReaction(emoji, userId) {
    // TODO: Buscar reaction con ese emoji
    // Si existe → incrementar count y agregar userId
    // Si no existe → crear { emoji, count: 1, users: [userId] }
  }

  removeReaction(emoji, userId) {
    // TODO: Buscar reaction
    // Remover userId del array
    // Si users queda vacío → remover reaction completa
  }

  addReply(message) {
    // TODO: Push a replies
  }

  toJSON() {
    // TODO: Incluir replies.map(r => r.toJSON())
  }

  static fromJSON(json) {
    // TODO: Recursivo para replies
  }
}
```

---

### **room.js**

```javascript
// ============================================
// ROOM (modelo de datos)
// ============================================

import { Message } from './message.js';

export class Room {
  /**
   * @param {string} id
   * @param {string} name
   * @param {string} type - 'channel' | 'dm'
   * @param {Message[]} messages
   */
  constructor(id, name, type = 'channel', messages = []) {
    // TODO: Asignar propiedades
  }

  addMessage(message) {
    // TODO: Push message
  }

  removeMessage(messageId) {
    // TODO: Filtrar messages
  }

  getMessage(messageId) {
    // TODO: Find message (puede estar en replies también)
    // Buscar recursivamente
  }

  getMessages() {
    // TODO: Retornar copia
  }

  toJSON() {
    // TODO: Incluir messages
  }

  static fromJSON(json) {
    // TODO: Message.fromJSON para cada mensaje
  }
}
```

---

### **chat-model.js**

```javascript
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
  
  /** @type {Object} */
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
  }

  notify() {
    // TODO: Implementar
  }

  // ==========================================
  // USER
  // ==========================================

  getCurrentUser() {
    // TODO: Retornar currentUser
  }

  setCurrentUser(name) {
    // TODO: Actualizar currentUser.name
    // TODO: notify()
  }

  // ==========================================
  // ROOMS
  // ==========================================

  addRoom(name, type = 'channel') {
    // TODO: Crear Room
    // TODO: Push a #rooms
    // TODO: notify()
  }

  removeRoom(roomId) {
    // TODO: Filtrar #rooms
    // TODO: Si era activeRoom → cambiar a primera room
    // TODO: notify()
  }

  setActiveRoom(roomId) {
    // TODO: Guardar en #activeRoomId
    // TODO: notify()
  }

  getActiveRoom() {
    // TODO: Find room con #activeRoomId
  }

  getAllRooms() {
    // TODO: Retornar copia
  }

  // ==========================================
  // MESSAGES
  // ==========================================

  /**
   * Enviar mensaje a room activa
   */
  sendMessage(content) {
    // TODO: Procesar commands (/help, /me, /shrug)
    // TODO: Crear Message
    // TODO: Agregar a room activa
    // TODO: notify()
    // TODO: Si autoResponder → scheduleAutoReply()
  }

  /**
   * Reply a un mensaje (thread)
   */
  replyToMessage(messageId, content) {
    // TODO: Buscar mensaje original
    // TODO: Crear Message reply
    // TODO: message.addReply(reply)
    // TODO: notify()
  }

  deleteMessage(messageId) {
    // TODO: Buscar en room activa
    // TODO: Remover mensaje
    // TODO: notify()
  }

  /**
   * Toggle reaction en mensaje
   */
  toggleReaction(messageId, emoji) {
    // TODO: Buscar mensaje
    // TODO: Si usuario ya reaccionó → removeReaction
    // TODO: Si no → addReaction
    // TODO: notify()
  }

  /**
   * Buscar mensajes por texto
   */
  searchMessages(query) {
    // TODO: Buscar en TODOS los rooms
    // TODO: Incluir threads (replies)
    // TODO: Retornar array de { roomId, message }
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
  }

  addBotMessage(userId, userName, content) {
    // TODO: Crear mensaje de bot
    // TODO: Agregar a room activa
    // TODO: notify()
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
  }

  // ==========================================
  // MARKDOWN PARSING
  // ==========================================

  parseMarkdown(text) {
    // TODO: **bold** → <strong>bold</strong>
    // TODO: *italic* → <em>italic</em>
    // TODO: `code` → <code>code</code>
    // TODO: Retornar HTML parseado
  }

  // ==========================================
  // PERSISTENCE
  // ==========================================

  toJSON() {
    // TODO: Guardar rooms, activeRoomId, currentUser
  }

  loadFromJSON(data) {
    // TODO: Cargar todo
  }
}
```

---

### **chat-view.js**

```javascript
// ============================================
// CHAT VIEW (presentación)
// ============================================

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

  renderRooms(rooms, activeRoomId) {
    // TODO: Mapear rooms con renderRoom()
    // TODO: Marcar activo
  }

  renderRoom(room, isActive) {
    // TODO: Retornar HTML de room-item
  }

  // ==========================================
  // RENDERING - MESSAGES
  // ==========================================

  renderMessages(messages, currentUserId) {
    // TODO: Si vacío → renderEmpty()
    // TODO: Mapear con renderMessage()
  }

  renderMessage(message, currentUserId, level = 0) {
    // TODO: Retornar HTML de message
    // IMPORTANTE: 
    // - Parsear markdown en content
    // - Mostrar reactions
    // - Botón reply
    // - Si tiene replies y thread expandido → renderizar recursivamente
    // - level determina indentación (thread depth)
  }

  renderReactions(reactions, currentUserId) {
    // TODO: Mapear reactions
    // TODO: Marcar active si currentUserId está en users
  }

  toggleThread(messageId) {
    // TODO: Si está en expandedThreads → quitar
    // TODO: Si no → agregar
    // TODO: Re-render messages
  }

  renderEmpty() {
    // TODO: Empty state
  }

  // ==========================================
  // INPUT
  // ==========================================

  getMessageInput() {
    // TODO: Retornar valor y limpiar
  }

  clearMessageInput() {
    // TODO: Limpiar input
  }

  focusMessageInput() {
    // TODO: Focus en input
  }

  // ==========================================
  // SEARCH
  // ==========================================

  renderSearchResults(results) {
    // TODO: Mostrar resultados en messages area
    // Formato: [Room name] @user: content
  }

  clearSearch() {
    // TODO: Limpiar search input
  }

  // ==========================================
  // EVENTS
  // ==========================================

  onRoomClick(callback) {
    // TODO: Event delegation en rooms-list
  }

  onAddRoom(callback) {
    // TODO: Click en btn-add-room
  }

  onSendMessage(callback) {
    // TODO: Enter en message-input (no Shift+Enter)
  }

  onReply(callback) {
    // TODO: Event delegation en .btn-reply
  }

  onDeleteMessage(callback) {
    // TODO: Event delegation en .btn-delete-msg
  }

  onReactionClick(callback) {
    // TODO: Event delegation en .reaction
  }

  onThreadToggle(callback) {
    // TODO: Event delegation en .thread-toggle
  }

  onSearch(callback) {
    // TODO: Input en search-input con debounce
  }
}
```

---

### **chat-controller.js**

```javascript
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
    // TODO: Setup listeners del view
    
    this.load();
    this.updateView();
  }

  // ==========================================
  // ACTIONS - ROOMS
  // ==========================================

  addRoom() {
    // TODO: Pedir nombre
    // TODO: model.addRoom()
  }

  switchRoom(roomId) {
    // TODO: model.setActiveRoom(roomId)
  }

  // ==========================================
  // ACTIONS - MESSAGES
  // ==========================================

  sendMessage() {
    // TODO: Obtener input
    // TODO: model.sendMessage(content)
    // TODO: Limpiar input
    // TODO: Scroll to bottom
  }

  replyToMessage(messageId) {
    // TODO: Pedir contenido de reply
    // TODO: model.replyToMessage(messageId, content)
  }

  deleteMessage(messageId) {
    // TODO: Confirmar
    // TODO: model.deleteMessage(messageId)
  }

  toggleReaction(messageId, emoji) {
    // TODO: model.toggleReaction(messageId, emoji)
  }

  toggleThread(messageId) {
    // TODO: view.toggleThread(messageId)
  }

  // ==========================================
  // ACTIONS - SEARCH
  // ==========================================

  searchMessages(query) {
    // TODO: Si query vacío → updateView() normal
    // TODO: Si no → results = model.searchMessages(query)
    // TODO: view.renderSearchResults(results)
  }

  // ==========================================
  // VIEW UPDATE
  // ==========================================

  updateView() {
    // TODO: Obtener rooms
    // TODO: Obtener activeRoom
    // TODO: view.renderRooms(rooms, activeRoomId)
    // TODO: view.renderMessages(activeRoom.messages, currentUser.id)
  }

  // ==========================================
  // PERSISTENCE
  // ==========================================

  save() {
    // TODO: localStorage
  }

  load() {
    // TODO: localStorage
    // TODO: Si vacío, crear rooms default (general, random)
  }
}
```

---

## ✅ CHECKLIST

**Día 1:**
- [ ] Message y Room models implementados
- [ ] ChatModel CRUD completo
- [ ] ChatView renderiza rooms y messages
- [ ] Switch entre rooms funciona
- [ ] Send message funciona
- [ ] User profile básico
- [ ] localStorage básico

**Día 2:**
- [ ] Auto-responder simula mensajes
- [ ] Reply to message funciona
- [ ] Thread view expandido/colapsado
- [ ] Reactions funcionan
- [ ] Add/remove reactions

**Día 3:**
- [ ] Markdown parser funciona
- [ ] Search messages funciona
- [ ] Commands (/help, /me, /shrug)
- [ ] User presence visual
- [ ] Testing completo
- [ ] Polish UI

---

## 💡 HINTS IMPORTANTES

### **1. Markdown parser básico**

```javascript
parseMarkdown(text) {
  let html = text;
  
  // **bold**
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  
  // *italic*
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  
  // `code`
  html = html.replace(/`(.+?)`/g, '<code>$1</code>');
  
  return html;
}
```

### **2. Auto-responder**

```javascript
scheduleAutoReply() {
  if (!this.#autoResponderEnabled) return;
  
  const delay = Math.random() * 4000 + 1000; // 1-5 seconds
  const bot = this.#botUsers[Math.floor(Math.random() * this.#botUsers.length)];
  
  const responses = [
    'Great idea! 👍',
    'I agree with that',
    'Let me check on that...',
    '🚀 Awesome!',
    'Interesting point'
  ];
  
  const response = responses[Math.floor(Math.random() * responses.length)];
  
  setTimeout(() => {
    this.addBotMessage(bot.id, bot.name, response);
  }, delay);
}
```

### **3. Thread rendering recursivo**

```javascript
renderMessage(message, currentUserId, level = 0) {
  const indent = level * 48; // 48px por nivel
  
  let html = `
    <div class="message" style="margin-left: ${indent}px" data-id="${message.id}">
      <!-- Header, content, reactions, etc. -->
  `;
  
  // Si tiene replies y thread expandido
  if (message.replies.length > 0 && this.expandedThreads.has(message.id)) {
    html += '<div class="thread">';
    message.replies.forEach(reply => {
      html += this.renderMessage(reply, currentUserId, level + 1);
    });
    html += '</div>';
  }
  
  html += '</div>';
  return html;
}
```

### **4. Commands processor**

```javascript
processCommand(content) {
  if (!content.startsWith('/')) return null;
  
  const [command, ...args] = content.split(' ');
  
  switch(command) {
    case '/help':
      return {
        type: 'system',
        content: 'Available commands: /help, /me [action], /shrug'
      };
    
    case '/me':
      return {
        type: 'action',
        content: `*${this.#currentUser.name} ${args.join(' ')}*`
      };
    
    case '/shrug':
      return {
        type: 'normal',
        content: '¯\\_(ツ)_/¯'
      };
    
    default:
      return null;
  }
}
```

---

FIN DEL PROYECTO

**Integrador 4 de 5**  
**Duración:** 3 días  
**Siguiente:** Integrador 5 (proyecto final profesional cuando termines este)
