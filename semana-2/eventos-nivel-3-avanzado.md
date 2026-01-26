# 🏗️ EVENTOS CUSTOM - NIVEL 3: AVANZADO

**Objetivo:** Dominar arquitectura completa con EventEmitter + Event Bus Global.

**Enfoque:** Combinar eventos locales (EventEmitter) con eventos globales (Event Bus).

---

## 📚 ¿Qué vas a aprender?

En el **Nivel 2** aprendiste comunicación entre 2 componentes (Card → App → Modal).

En este **Nivel 3** vas a dominar:
- ✅ Sistema completo con 5+ componentes
- ✅ **EventEmitter** (eventos locales)
- ✅ **Event Bus** (eventos globales)
- ✅ Cuándo usar cada uno
- ✅ Arquitectura profesional escalable

---

## 🎯 EL PROBLEMA

**Escenario:** E-commerce donde:
- Usuario ve productos (Cards)
- Usuario click → ve detalles (Modal)
- Usuario agrega al carrito → **múltiples cosas pasan:**
  - Carrito se actualiza
  - Badge muestra contador
  - Toast muestra notificación
  - Analytics registra evento

**Pregunta:** ¿Cómo comunicar esto eficientemente?

**Respuesta:** EventEmitter (local) + Event Bus (global)

---

## 🏛️ ARQUITECTURA

```
┌────────────────────────────────────────────┐
│        EVENT BUS GLOBAL (document)         │
│   Eventos: product-added, cart-updated    │
└────────────────────────────────────────────┘
                    ↕
┌────────────────────────────────────────────┐
│                  APP                       │
│                                            │
│  ┌──────┐  ┌──────┐  ┌──────┐            │
│  │Card 1│  │Card 2│  │Card 3│            │
│  └───┬──┘  └───┬──┘  └───┬──┘            │
│      └─────────┴─────────┘                │
│              │                             │
│    emit('product-clicked') ← LOCAL        │
│              ↓                             │
│         ┌────────┐                         │
│         │ MODAL  │                         │
│         └────────┘                         │
└────────────────────────────────────────────┘
                    ↕
┌────────────────────────────────────────────┐
│       COMPONENTES GLOBALES                 │
│   (escuchan Event Bus - document)          │
│                                            │
│  ┌──────┐  ┌──────┐  ┌──────┐            │
│  │ CART │  │BADGE │  │TOAST │            │
│  └──────┘  └──────┘  └──────┘            │
└────────────────────────────────────────────┘
```

---

## 🔑 DIFERENCIA CLAVE

### **EventEmitter (LOCAL)**

**Uso:** Componentes específicos que se conocen.

```javascript
// Card emite LOCAL
this.emit('product-clicked', data);

// App escucha LOCAL
card.on('product-clicked', (data) => {
  modal.open(data);
});
```

**Cuándo usar:**
- UI components (Card → Modal, Tabs → Content)
- Padre-hijo
- Comunicación 1 a 1

---

### **Event Bus (GLOBAL)**

**Uso:** Eventos que afectan a TODA la aplicación.

```javascript
// Disparar GLOBAL
document.dispatchEvent(new CustomEvent('product-added', {
  detail: productData
}));

// Escuchar GLOBAL
document.addEventListener('product-added', (e) => {
  console.log(e.detail);  // productData
});
```

**Cuándo usar:**
- Estado global (carrito, usuario)
- Notificaciones (toasts)
- Analytics
- Múltiples componentes desconectados

---

## 💻 CÓDIGO: Event Bus Helper

```javascript
// ============================================
// EVENT BUS - Helper para eventos globales
// ============================================

class EventBus {
  static dispatch(eventName, data) {
    const event = new CustomEvent(eventName, {
      detail: data,
      bubbles: true
    });
    document.dispatchEvent(event);
    console.log(`🌐 [GLOBAL] Disparado: ${eventName}`);
  }
  
  static on(eventName, callback) {
    document.addEventListener(eventName, (e) => {
      callback(e.detail);
    });
    console.log(`🌐 [GLOBAL] Listener: ${eventName}`);
  }
}
```

---

## 📦 CÓDIGO: ProductCard (EventEmitter LOCAL)

```javascript
// ============================================
// PRODUCT CARD - EventEmitter local
// ============================================

class ProductCard extends EventEmitter {
  constructor(product) {
    super();
    this.product = product;
  }
  
  render() {
    this.element = document.createElement('div');
    this.element.textContent = this.product.name;
    
    this.element.addEventListener('click', () => {
      console.log('🖱️  Card click:', this.product.name);
      
      // ⭐ EVENTO LOCAL (EventEmitter)
      this.emit('product-clicked', this.product);
    });
    
    return this.element;
  }
}
```

**Por qué LOCAL:**
- Solo afecta a Modal
- Comunicación directa Card → App → Modal

---

## 🪟 CÓDIGO: ProductModal

```javascript
// ============================================
// PRODUCT MODAL
// ============================================

class ProductModal {
  constructor() {
    this.overlay = null;
    this.modal = null;
    this.currentProduct = null;
    this.create();
  }
  
  create() {
    this.overlay = document.createElement('div');
    this.modal = document.createElement('div');
    this.overlay.append(this.modal);
    document.body.append(this.overlay);
  }
  
  open(product) {
    this.currentProduct = product;
    
    this.modal.innerHTML = `
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <p>$${product.price}</p>
      <button id="add-to-cart">🛒 Agregar</button>
    `;
    
    // Botón agregar
    const btn = this.modal.querySelector('#add-to-cart');
    btn.addEventListener('click', () => {
      this.addToCart();
    });
    
    this.overlay.classList.add('active');
  }
  
  addToCart() {
    console.log('➕ Agregando:', this.currentProduct.name);
    
    // ⭐ EVENTO GLOBAL (Event Bus)
    EventBus.dispatch('product-added-to-cart', this.currentProduct);
    
    this.close();
  }
  
  close() {
    this.overlay.classList.remove('active');
  }
}
```

**Por qué GLOBAL:**
- Afecta múltiples componentes (Cart, Badge, Toast)
- No queremos acoplar Modal con todos

---

## 🛒 CÓDIGO: ShoppingCart (Escucha GLOBAL)

```javascript
// ============================================
// SHOPPING CART - Escucha Event Bus
// ============================================

class ShoppingCart {
  constructor() {
    this.items = [];
    this.setupListeners();
  }
  
  setupListeners() {
    // ⭐ Escuchar GLOBAL
    EventBus.on('product-added-to-cart', (product) => {
      console.log('🛒 Cart escuchó:', product.name);
      this.addItem(product);
    });
  }
  
  addItem(product) {
    const existing = this.items.find(item => item.id === product.id);
    
    if (existing) {
      existing.quantity++;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    
    console.log(`🛒 Items: ${this.items.length}`);
    
    // ⭐ Disparar OTRO evento global
    EventBus.dispatch('cart-updated', {
      items: this.items,
      count: this.getItemCount(),
      total: this.getTotal()
    });
  }
  
  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }
  
  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
}
```

---

## 🔔 CÓDIGO: CartBadge (Escucha GLOBAL)

```javascript
// ============================================
// CART BADGE - Escucha Event Bus
// ============================================

class CartBadge {
  constructor() {
    this.countElement = document.getElementById('cart-count');
    this.setupListeners();
  }
  
  setupListeners() {
    // ⭐ Escuchar GLOBAL
    EventBus.on('cart-updated', (data) => {
      console.log('🔔 Badge escuchó:', data.count);
      this.update(data.count);
    });
  }
  
  update(count) {
    this.countElement.textContent = count;
    console.log(`🔔 Badge actualizado: ${count}`);
  }
}
```

---

## 💬 CÓDIGO: Toast (Escucha GLOBAL)

```javascript
// ============================================
// TOAST - Escucha Event Bus
// ============================================

class Toast {
  constructor() {
    this.container = this.createContainer();
    this.setupListeners();
  }
  
  createContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    document.body.append(container);
    return container;
  }
  
  setupListeners() {
    // ⭐ Escuchar GLOBAL
    EventBus.on('product-added-to-cart', (product) => {
      console.log('💬 Toast escuchó:', product.name);
      this.show(`${product.name} agregado`);
    });
  }
  
  show(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    this.container.appendChild(toast);
    
    setTimeout(() => toast.remove(), 3000);
  }
}
```

---

## 🎯 CÓDIGO: App (Coordinador)

```javascript
// ============================================
// APP - Coordinador
// ============================================

class App {
  constructor() {
    this.products = [];
    this.modal = null;
    this.cart = null;
    this.badge = null;
    this.toast = null;
    
    this.init();
  }
  
  init() {
    // Crear componentes GLOBALES
    this.modal = new ProductModal();
    this.cart = new ShoppingCart();
    this.badge = new CartBadge();
    this.toast = new Toast();
    
    this.createProducts();
  }
  
  createProducts() {
    const data = [
      { id: 1, name: 'Laptop', description: 'Alta gama', price: 1299 },
      { id: 2, name: 'Mouse', description: 'Inalámbrico', price: 49 },
      { id: 3, name: 'Teclado', description: 'Mecánico', price: 129 }
    ];
    
    data.forEach(item => {
      const card = new ProductCard(item);
      
      // ⭐ EVENTO LOCAL (EventEmitter)
      card.on('product-clicked', (product) => {
        console.log('🎯 App escuchó click');
        this.modal.open(product);
      });
      
      document.body.append(card.render());
      this.products.push(item);
    });
  }
}

// Iniciar
const app = new App();
```

---

## 🔄 FLUJO COMPLETO

### **FLUJO 1: Ver detalles (LOCAL)**
```
1. Usuario click Card
2. Card.emit('product-clicked', product)  ← LOCAL
3. App escucha
4. App.modal.open(product)
5. Modal se abre
```

### **FLUJO 2: Agregar al carrito (GLOBAL)**
```
1. Usuario click "Agregar"
2. Modal dispara: EventBus.dispatch('product-added', product)  ← GLOBAL
3. TODOS escuchan:
   - Cart.addItem(product)
   - Cart dispara: EventBus.dispatch('cart-updated', {...})  ← GLOBAL
   - Toast.show('Agregado')
4. Badge escucha 'cart-updated'
5. Badge.update(count)
```

---

## 📊 TABLA COMPARATIVA

| Aspecto | EventEmitter | Event Bus |
|---------|-------------|-----------|
| **Scope** | Local | Global |
| **Sintaxis** | `this.emit()` | `EventBus.dispatch()` |
| **Escuchar** | `obj.on()` | `EventBus.on()` |
| **Uso** | UI components | Estado global |
| **Ejemplo** | Card → Modal | Carrito → Todos |

---

## 🎯 CUÁNDO USAR CADA UNO

### **EventEmitter:**
```javascript
// Componentes relacionados
card.on('clicked', () => modal.open());
tabs.on('tab-changed', () => updateContent());
```
✅ Componentes se conocen
✅ Comunicación 1 a 1
✅ Control fino

### **Event Bus:**
```javascript
// Estado global
EventBus.dispatch('product-added', product);
EventBus.dispatch('user-logged-in', user);
EventBus.dispatch('theme-changed', theme);
```
✅ Múltiples componentes reaccionan
✅ No sabés quiénes escuchan
✅ Estado compartido

---

## ⚠️ ANTIPATRONES

### ❌ MAL: Event Bus para TODO
```javascript
// ❌ NO: Event Bus para UI local
EventBus.dispatch('card-clicked', product);
EventBus.dispatch('modal-opened', data);
```

### ❌ MAL: EventEmitter para estado global
```javascript
// ❌ NO: Acoplar componentes globales
cart.on('item-added', () => badge.update());
```

### ✅ BIEN: Combinar ambos
```javascript
// ✅ EventEmitter para UI local
card.on('clicked', () => modal.open());

// ✅ Event Bus para estado global
EventBus.dispatch('product-added', product);
```

---

## 📝 CÓDIGO COMPLETO INTEGRADO

```javascript
// EventEmitter base
class EventEmitter { /* ... */ }

// Event Bus helper
class EventBus {
  static dispatch(eventName, data) {
    document.dispatchEvent(new CustomEvent(eventName, { detail: data }));
  }
  static on(eventName, callback) {
    document.addEventListener(eventName, (e) => callback(e.detail));
  }
}

// ProductCard (EventEmitter local)
class ProductCard extends EventEmitter {
  handleClick() {
    this.emit('product-clicked', this.product);  // LOCAL
  }
}

// ProductModal
class ProductModal {
  addToCart() {
    EventBus.dispatch('product-added-to-cart', product);  // GLOBAL
  }
}

// ShoppingCart (escucha GLOBAL)
class ShoppingCart {
  constructor() {
    EventBus.on('product-added-to-cart', (product) => {
      this.addItem(product);
      EventBus.dispatch('cart-updated', {...});  // Otro GLOBAL
    });
  }
}

// CartBadge (escucha GLOBAL)
class CartBadge {
  constructor() {
    EventBus.on('cart-updated', (data) => {
      this.update(data.count);
    });
  }
}

// Toast (escucha GLOBAL)
class Toast {
  constructor() {
    EventBus.on('product-added-to-cart', (product) => {
      this.show(`${product.name} agregado`);
    });
  }
}

// App (coordinador)
class App {
  init() {
    this.modal = new ProductModal();
    this.cart = new ShoppingCart();
    this.badge = new CartBadge();
    this.toast = new Toast();
    
    // EventEmitter LOCAL
    card.on('product-clicked', (product) => {
      this.modal.open(product);
    });
  }
}
```

---

## ✅ RESUMEN

**Lo que dominaste:**

1. **Arquitectura completa:** 5+ componentes
2. **EventEmitter (local):** Card → App → Modal
3. **Event Bus (global):** Estado compartido → Múltiples reacciones
4. **Cuándo usar cada uno:**
   - EventEmitter: Componentes específicos
   - Event Bus: Estado global
5. **Patrón híbrido:** Combinar para sistema escalable

**Patrón profesional:**
```
EventEmitter (local)  →  UI components relacionados
Event Bus (global)    →  Estado compartido + notificaciones
```

---

## 🎓 FELICITACIONES

**Completaste los 3 niveles:**
- ✅ Nivel 1: EventEmitter básico
- ✅ Nivel 2: Comunicación entre componentes
- ✅ Nivel 3: Arquitectura completa profesional

**Ahora podés:**
- Arquitecturar aplicaciones complejas
- Decidir qué patrón usar
- Construir sistemas escalables
- Aplicar en React, Vue, Vanilla JS

**¡Estás listo para el Proyecto 2!** 🚀

---

**FIN NIVEL 3**
