// ============================================
// APP - ENTRY POINT
// ============================================

import { ChatModel } from './js/chat-model.js';
import { ChatView } from './js/chat-view.js';
import { ChatController } from './js/chat-controller.js';

// Crear instancias
const model = new ChatModel();
const view = new ChatView('rooms-list', 'messages-area', 'message-input', 'search-input');
const controller = new ChatController(model, view);

// Auto-save en cada cambio
model.subscribe(() => {
  controller.save();
});

// Opcional: Mensaje de bienvenida en consola
console.log('💬 ChatApp inicializada');
console.log('Usuario actual:', model.getCurrentUser());
