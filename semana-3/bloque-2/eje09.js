/**
**CONSIGNA:**
Implementar sistema de notificaciones de stock:

**StockManager (Subject):**
- Mantener stock de productos
- Notificar cuando stock cambia
- Métodos: subscribe, unsubscribe, setStock, getStock, notify

**Observer (Subscriber):**
- Recibir notificaciones de cambio de stock
- Diferentes tipos:
  - EmailNotifier → Envía email (simular con console.log)
  - SMSNotifier → Envía SMS (simular con console.log)
  - LogNotifier → Registra en log
 */

class StockManager {
  constructor() {
    this.stock = {};       // { productId: quantity }
    this.subscribers = []; // Observers
  }

  subscribe(observer) {
    // TU CÓDIGO
    if(!observer) throw new Error("Se requiere un observer");
    this.subscribers.push(observer);
  }

  unsubscribe(observer) {
    // TU CÓDIGO
    this.subscribers = this.subscribers.filter(sub => sub !== observer);
  }

  setStock(productId, quantity) {
    this.stock[productId] = quantity;
    // TU CÓDIGO: Notificar cambio
    this.notify({ productId, quantity });
  }

  getStock(productId) {
    return this.stock[productId] || 0;
  }

  notify(data) {
    // TU CÓDIGO: Llamar update() en cada subscriber
    this.subscribers.forEach(sub => {
      sub.update(data);
    });
  }
}

class EmailNotifier {
  constructor(email) {
    this.email = email;
  }

  update(data) {
    console.log(`📧 Email a ${this.email}: Stock de ${data.productId} = ${data.quantity}`);
  }
}

class SMSNotifier {
  constructor(phone) {
    this.phone = phone;
  }

  update(data) {
    console.log(`📱 SMS a ${this.phone}: Stock de ${data.productId} = ${data.quantity}`);
  }
}

class LogNotifier {
  update(data) {
    console.log(`📝 LOG: [${new Date().toISOString()}] Stock de ${data.productId} = ${data.quantity}`);
  }
}

// TESTING:
const stockManager = new StockManager();

const emailNotifier = new EmailNotifier('admin@store.com');
const smsNotifier = new SMSNotifier('+123456789');
const logNotifier = new LogNotifier();

stockManager.subscribe(emailNotifier);
stockManager.subscribe(smsNotifier);
stockManager.subscribe(logNotifier);

stockManager.setStock('laptop', 10);
// Todos reciben notificación

stockManager.unsubscribe(smsNotifier);

stockManager.setStock('laptop', 5);
// Solo email y log reciben




