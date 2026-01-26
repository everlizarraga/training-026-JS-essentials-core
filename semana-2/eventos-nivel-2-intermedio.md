# 🎓 EVENTOS CUSTOM - NIVEL 2: INTERMEDIO

**Objetivo:** Entender cómo dos componentes se comunican usando EventEmitter.

**Enfoque:** Card emite evento → App escucha → App le dice a Modal que se abra.

---

## 📚 ¿Qué vas a aprender?

En el **Nivel 1** aprendiste EventEmitter básico (un componente emitiendo).

En este **Nivel 2** vas a ver **comunicación entre dos componentes**:
- **Card** emite eventos cuando la clickean
- **Modal** se abre para mostrar detalles
- **App** es quien los conecta (coordinador)

---

## ❓ LA PREGUNTA CLAVE

**"¿Quién agrega el .on() y quién hace .emit()?"**

**RESPUESTA:**
- **Card** hace `.emit()` → Notifica que la clickearon
- **App** hace `.on()` → Escucha el evento de Card
- **App** llama a `modal.open()` → Le dice al Modal que se abra

**Card NO conoce a Modal. Modal NO conoce a Card. App los conecta.**

---

## 🏛️ ARQUITECTURA

```
┌─────────────────────────────────────────────────┐
│                    APP                          │
│            (Coordinador/Padre)                  │
│                                                 │
│   ┌──────────────┐         ┌──────────────┐   │
│   │    CARD      │         │    MODAL     │   │
│   │   (Hijo 1)   │         │   (Hijo 2)   │   │
│   └──────────────┘         └──────────────┘   │
│          │                         ▲           │
│          │                         │           │
│          │ 1. emit('clicked')      │           │
│          └────────►┌────┐──────────┘           │
│                    │ on │ 2. modal.open()      │
│                    └────┘                      │
└─────────────────────────────────────────────────┘
```

**Flujo:**
1. Usuario hace click en CARD
2. CARD: `this.emit('clicked', data)`
3. APP escucha: `card.on('clicked', ...)`
4. APP ejecuta: `modal.open(data)`
5. MODAL se abre

---

## 💻 CÓDIGO: EventEmitter Base

```javascript
// ============================================
// EVENT EMITTER
// ============================================

class EventEmitter {
  constructor() {
    this.events = {};  // { 'evento': [callback1, callback2] }
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  emit(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => callback(data));
  }
}
```

---

## 📦 CÓDIGO: Card (Emite)

```javascript
// ============================================
// CARD - Emite eventos
// ============================================

class Card extends EventEmitter {
  constructor(data) {
    super();
    this.data = data;
    this.element = null;
  }
  
  render() {
    this.element = document.createElement('div');
    this.element.textContent = this.data.name;
    
    this.element.addEventListener('click', () => {
      this.handleClick();
    });
    
    return this.element;
  }
  
  handleClick() {
    console.log('🖱️  Card clickeada:', this.data.name);
    
    // ⭐ EMITIR EVENTO
    this.emit('clicked', this.data);
    //          ↑           ↑
    //          |           └─ Datos
    //          └─ Nombre del evento
  }
}
```

---

## 🪟 CÓDIGO: Modal (Reacciona)

```javascript
// ============================================
// MODAL - Solo métodos públicos
// ============================================

class Modal {
  constructor() {
    this.overlay = null;
    this.modal = null;
    this.isOpen = false;
    
    this.create();
  }
  
  create() {
    this.overlay = document.createElement('div');
    this.modal = document.createElement('div');
    this.overlay.append(this.modal);
    document.body.append(this.overlay);
  }
  
  // ⭐ MÉTODO PÚBLICO - App llama esto
  open(data) {
    console.log('🪟 Modal abriendo:', data.name);
    
    this.modal.innerHTML = `
      <h2>${data.name}</h2>
      <p>${data.description}</p>
      <p>$${data.price}</p>
    `;
    
    this.overlay.classList.add('active');
    this.isOpen = true;
  }
  
  close() {
    this.overlay.classList.remove('active');
    this.isOpen = false;
  }
}
```

---

## 🎯 CÓDIGO: App (Coordinador)

```javascript
// ============================================
// APP - Conecta Card con Modal
// ============================================

class App {
  constructor() {
    this.cards = [];
    this.modal = null;
    this.init();
  }
  
  init() {
    // 1. Crear Modal
    this.modal = new Modal();
    
    // 2. Crear Cards
    this.createCards();
  }
  
  createCards() {
    const data = [
      { name: 'Laptop', description: 'Alta gama', price: 1200 },
      { name: 'Mouse', description: 'Inalámbrico', price: 25 },
      { name: 'Teclado', description: 'Mecánico', price: 75 }
    ];
    
    data.forEach(item => {
      const card = new Card(item);
      
      // ⭐⭐⭐ CONEXIÓN ⭐⭐⭐
      card.on('clicked', (cardData) => {
        console.log('🎯 App escuchó click');
        this.modal.open(cardData);
      });
      
      document.body.append(card.render());
      this.cards.push(card);
    });
  }
}

// Iniciar
const app = new App();
```

---

## 🔄 FLUJO COMPLETO

```
1. Usuario click → card.element
2. Card.handleClick() ejecuta
3. Card.emit('clicked', data)
4. EventEmitter busca listeners
5. Ejecuta callback de App
6. App.modal.open(data)
7. Modal se abre
```

---

## ❓ PREGUNTAS CLAVE

### **¿Por qué Card hereda de EventEmitter?**
Porque necesita emitir eventos: `this.emit()`

### **¿Por qué Modal NO hereda de EventEmitter?**
Porque solo tiene métodos públicos: `.open()`, `.close()`

### **¿Card conoce a Modal?**
NO. Card solo emite, no sabe quién escucha.

### **¿App conoce a Card y Modal?**
SÍ. App tiene referencias a ambos y los conecta.

---

## ⚖️ Bien vs Mal

### ❌ MAL: Acoplamiento directo
```javascript
class Card {
  constructor(modal) {
    this.modal = modal;  // ❌ Card conoce Modal
  }
  handleClick() {
    this.modal.open(this.data);  // ❌ Llama directamente
  }
}
```

### ✅ BIEN: Desacoplamiento
```javascript
class Card extends EventEmitter {
  handleClick() {
    this.emit('clicked', this.data);  // ✅ Solo notifica
  }
}

// App conecta:
card.on('clicked', (data) => modal.open(data));
```

---

## 📝 RESUMEN

**Lo que aprendiste:**
1. Card emite → App escucha → App coordina → Modal reacciona
2. Card NO conoce a Modal (desacoplados)
3. App es el coordinador que los conecta
4. `emit()` para notificar, `on()` para escuchar

**Patrón:**
```
HIJO emite → PADRE escucha → PADRE coordina → OTRO HIJO ejecuta
```

---

**FIN NIVEL 2**
