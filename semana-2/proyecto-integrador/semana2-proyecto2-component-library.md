# 🏗️ PROYECTO 2: Component Library (Mini-Framework)

**Duración:** 4 días máximo  
**Nivel:** Intermedio-Avanzado  
**Objetivo:** Construir librería de componentes reutilizables que integra TODO lo aprendido en Semana 2

---

## 🎯 ¿QUÉ VAS A CONSTRUIR?

Una **librería de componentes UI reutilizables** (como Bootstrap o Material UI, pero hecha por vos desde cero).

**Componentes que vas a crear:**
- 📦 **Card Component** - Cards dinámicas con data
- 🪟 **Modal Component** - Modales con overlay
- 📑 **Tabs Component** - Sistema de pestañas
- 📋 **Accordion Component** - Contenido colapsable
- 🖼️ **LazyImage Component** - Lazy loading de imágenes
- 🔔 **Event System** - Comunicación entre componentes

**API limpia que vas a diseñar:**
```javascript
// Así de fácil será usar tu librería
const card = new Card({
  title: 'Mi Card',
  content: 'Contenido',
  image: 'imagen.jpg'
});

const modal = new Modal({
  title: 'Mi Modal',
  content: 'Contenido del modal'
});

modal.open();
```

---

## 🎨 VISUALIZACIÓN DEL PROYECTO

```
DEMO PAGE:
┌─────────────────────────────────────────────────┐
│  🏗️ Component Library Demo                      │
├─────────────────────────────────────────────────┤
│                                                 │
│  [Cards Section]                                │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │ Card 1  │ │ Card 2  │ │ Card 3  │          │
│  │ [img]   │ │ [img]   │ │ [img]   │          │
│  │ Title   │ │ Title   │ │ Title   │          │
│  │ Content │ │ Content │ │ Content │          │
│  │ [Open]  │ │ [Open]  │ │ [Open]  │          │
│  └─────────┘ └─────────┘ └─────────┘          │
│                                                 │
│  [Tabs Section]                                 │
│  [Tab 1] [Tab 2] [Tab 3]                       │
│  ┌─────────────────────────────────────┐       │
│  │ Contenido del Tab activo            │       │
│  └─────────────────────────────────────┘       │
│                                                 │
│  [Accordion Section]                            │
│  ► Item 1                                       │
│  ▼ Item 2                                       │
│    Content expanded                             │
│  ► Item 3                                       │
│                                                 │
│  [Lazy Images Section]                          │
│  (scrollea para ver lazy loading)               │
│                                                 │
└─────────────────────────────────────────────────┘

MODAL (cuando se abre):
┌─────────────────────────────────────────────────┐
│ [OVERLAY OSCURO]                                │
│                                                 │
│     ┌───────────────────────────┐               │
│     │ ✕  Modal Title            │               │
│     ├───────────────────────────┤               │
│     │                           │               │
│     │  Modal content here       │               │
│     │                           │               │
│     │         [Close]           │               │
│     └───────────────────────────┘               │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## ⏱️ GOVERNOR ACTIVO

**Límites estrictos:**
- ⏰ **Máximo 4 días** (7 si trabajas menos horas/día)
- 📌 **2 iteraciones máximo** por componente
- ✅ **80% funcional = Suficiente para avanzar**
- 🚫 **No re-optimizar** componentes viejos

**Recordatorios:**
```
"Componente funciona? → NEXT componente"
"API funciona y tiene sentido? → NEXT"
"Día 4 llegó? → SUBIR lo que tengas"
"Todos los componentes funcionan al 80%? → PROYECTO COMPLETO"
```

---

## 📅 CRONOGRAMA DÍA POR DÍA

### **DÍA 1: Card Component + Grid System**
**Objetivo:** Crear componente Card reutilizable y sistema de grid

**Tareas:**
- [ ] Crear clase `Card` con API limpia
- [ ] Renderizar cards dinámicamente desde data
- [ ] Crear `CardGrid` para organizar múltiples cards
- [ ] Estilos básicos con CSS
- [ ] Probar con 6 cards diferentes

**Checkpoint del día:**
```javascript
// Esto debe funcionar al final del Día 1:
const cards = [
  { title: 'Card 1', content: 'Contenido 1', image: 'img1.jpg' },
  { title: 'Card 2', content: 'Contenido 2', image: 'img2.jpg' },
  { title: 'Card 3', content: 'Contenido 3', image: 'img3.jpg' }
];

const grid = new CardGrid('#container');
cards.forEach(data => {
  const card = new Card(data);
  grid.add(card);
});
```

---

### **DÍA 2: Modal + Tabs Components**
**Objetivo:** Componentes interactivos con eventos

**Tareas:**
- [ ] Crear clase `Modal` (open, close, overlay)
- [ ] Event listeners (close con X, click en overlay, ESC)
- [ ] Crear clase `Tabs` (cambiar entre tabs)
- [ ] Event delegation para tabs
- [ ] Conectar: Click en Card → Abre Modal con info

**Checkpoint del día:**
```javascript
// Modal:
const modal = new Modal({
  title: 'Mi Modal',
  content: 'Contenido del modal'
});

modal.open();   // Abre
modal.close();  // Cierra

// Tabs:
const tabs = new Tabs('#tabs-container', {
  tabs: [
    { id: 'tab1', label: 'Tab 1', content: 'Contenido 1' },
    { id: 'tab2', label: 'Tab 2', content: 'Contenido 2' },
    { id: 'tab3', label: 'Tab 3', content: 'Contenido 3' }
  ]
});
```

---

### **DÍA 3: Accordion + LazyImage Components**
**Objetivo:** Accordion colapsable + Lazy loading

**Tareas:**
- [ ] Crear clase `Accordion` (expand/collapse items)
- [ ] Toggle individual items
- [ ] Crear clase `LazyImage` con IntersectionObserver
- [ ] Agregar 10 imágenes lazy al final de la página
- [ ] Verificar que solo se cargan cuando son visibles

**Checkpoint del día:**
```javascript
// Accordion:
const accordion = new Accordion('#accordion-container', {
  items: [
    { title: 'Item 1', content: 'Contenido 1' },
    { title: 'Item 2', content: 'Contenido 2' },
    { title: 'Item 3', content: 'Contenido 3' }
  ]
});

// LazyImage:
const lazyImg = new LazyImage({
  src: 'imagen-real.jpg',
  placeholder: 'placeholder.jpg',
  alt: 'Descripción'
});
```

---

### **DÍA 4: Event System + Demo Page + Documentación**
**Objetivo:** Custom events + página demo profesional

**Tareas:**
- [ ] Implementar sistema de custom events (emit/on)
- [ ] Conectar componentes con eventos (ej: Card click → Modal open)
- [ ] Crear página demo mostrando TODOS los componentes
- [ ] Escribir README.md con ejemplos de uso
- [ ] Pulir estilos finales

**Checkpoint del día:**
```javascript
// Custom events entre componentes:
card.on('click', (data) => {
  modal.setContent(data);
  modal.open();
});

accordion.on('item-toggled', (itemId) => {
  console.log(`Item ${itemId} toggled`);
});
```

---

## 🎯 FEATURES MÍNIMAS (MVP)

### ✅ MUST HAVE (obligatorio):

**1. Card Component:**
- Constructor que acepta `{ title, content, image, onClick }`
- Método `.render()` que retorna elemento DOM
- Método `.destroy()` para limpiar
- Click event opcional

**2. Modal Component:**
- `.open()` y `.close()`
- Overlay oscuro
- Cerrar con: X, click en overlay, tecla ESC
- `.setContent()` para cambiar contenido

**3. Tabs Component:**
- Cambiar entre tabs con click
- Solo un tab activo a la vez
- Event delegation

**4. Accordion Component:**
- Expand/collapse items
- Múltiples items pueden estar abiertos
- Animación suave (transition)

**5. LazyImage Component:**
- IntersectionObserver para lazy load
- Placeholder mientras carga
- Clase CSS cuando se carga

**6. Event System:**
- `.on(evento, callback)` para escuchar
- `.emit(evento, data)` para disparar
- Al menos 2 componentes comunicándose

---

### 🌟 NICE TO HAVE (si sobra tiempo):

- [ ] `.off(evento, callback)` para dejar de escuchar
- [ ] Animaciones con CSS (fade in/out)
- [ ] Opción de Accordion con "solo uno abierto"
- [ ] Modal con múltiples tamaños (small, medium, large)
- [ ] Tabs verticales además de horizontales
- [ ] Theme switcher (light/dark mode)
- [ ] Componente Toast (notificaciones)
- [ ] Progress bar component

**IMPORTANTE:** Solo hacer nice-to-have si completaste TODOS los must-have antes del Día 4.

---

## 🗂️ ESTRUCTURA DEL PROYECTO

```
component-library/
│
├── index.html              # Página demo
├── README.md               # Documentación
│
├── css/
│   ├── main.css           # Estilos globales
│   ├── components.css     # Estilos de componentes
│   └── demo.css           # Estilos de la demo
│
├── js/
│   ├── components/
│   │   ├── Card.js
│   │   ├── Modal.js
│   │   ├── Tabs.js
│   │   ├── Accordion.js
│   │   ├── LazyImage.js
│   │   └── EventEmitter.js  # Sistema de eventos
│   │
│   ├── app.js             # Inicialización de la demo
│   └── utils.js           # Utilidades (opcional)
│
└── assets/
    └── images/            # Imágenes para demo
```

---

## 🎯 PATTERNS QUE VAS A APLICAR

### **PATTERN 1: Component Pattern**

**Qué es:**
Encapsular UI + comportamiento en una clase reutilizable.

**Por qué:**
- Reutilización de código
- Separación de concerns
- Fácil mantenimiento

**Dónde lo ves:**
Cada componente es una clase con su propio estado y métodos.

**Ejemplo:**
```javascript
class Card {
  constructor(options) {
    this.options = options;
    this.element = null;
  }
  
  render() {
    this.element = document.createElement('div');
    this.element.className = 'card';
    this.element.innerHTML = `
      <img src="${this.options.image}" alt="${this.options.title}">
      <h3>${this.options.title}</h3>
      <p>${this.options.content}</p>
    `;
    return this.element;
  }
  
  destroy() {
    this.element?.remove();
    this.element = null;
  }
}
```

---

### **PATTERN 2: Factory Pattern**

**Qué es:**
Función que crea y retorna instancias de componentes.

**Por qué:**
- Simplifica creación de múltiples instancias
- Oculta complejidad de inicialización

**Ejemplo:**
```javascript
class CardGrid {
  constructor(selector) {
    this.container = document.querySelector(selector);
    this.cards = [];
  }
  
  add(card) {
    const element = card.render();
    this.container.append(element);
    this.cards.push(card);
  }
  
  clear() {
    this.cards.forEach(card => card.destroy());
    this.cards = [];
  }
}
```

---

### **PATTERN 3: Event Emitter Pattern**

**Qué es:**
Sistema de pub/sub para comunicación entre componentes.

**Por qué:**
- Desacoplamiento (componentes no se conocen directamente)
- Escalabilidad (fácil agregar listeners)

**Ejemplo:**
```javascript
class EventEmitter {
  constructor() {
    this.events = {};
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
  
  off(event, callback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }
}

// Uso:
class Card extends EventEmitter {
  constructor(options) {
    super();
    this.options = options;
  }
  
  handleClick() {
    this.emit('card-clicked', this.options);
  }
}

const card = new Card({ title: 'Mi Card' });
card.on('card-clicked', (data) => {
  console.log('Card clickeada:', data);
});
```

---

### **PATTERN 4: Lazy Loading Pattern**

**Qué es:**
Cargar recursos (imágenes) solo cuando se necesitan (visibles).

**Por qué:**
- Performance (carga inicial más rápida)
- Ahorro de ancho de banda

**Ejemplo:**
```javascript
class LazyImage {
  constructor(options) {
    this.options = options;
    this.element = null;
    this.observer = null;
  }
  
  render() {
    this.element = document.createElement('img');
    this.element.src = this.options.placeholder;
    this.element.dataset.src = this.options.src;
    this.element.alt = this.options.alt;
    this.element.classList.add('lazy');
    
    this.setupObserver();
    
    return this.element;
  }
  
  setupObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.load();
        }
      });
    }, { rootMargin: '50px' });
    
    this.observer.observe(this.element);
  }
  
  load() {
    this.element.src = this.options.src;
    this.element.classList.remove('lazy');
    this.element.classList.add('loaded');
    this.observer.disconnect();
  }
}
```

---

### **PATTERN 5: API Design**

**Qué es:**
Diseñar interfaces limpias y fáciles de usar.

**Principios:**
- Nombres descriptivos
- Opciones sensatas por defecto
- Consistencia entre componentes
- Documentación clara

**Ejemplo:**
```javascript
// ✅ BUENA API: Clara, consistente, intuitiva
const modal = new Modal({
  title: 'Mi Modal',
  content: 'Contenido',
  closable: true,        // Default: true
  closeOnOverlay: true,  // Default: true
  closeOnEsc: true       // Default: true
});

modal.open();
modal.close();
modal.setContent('Nuevo contenido');

// ❌ MALA API: Confusa, inconsistente
const modal = new Modal('Mi Modal', 'Contenido', true, true, true);
modal.show();
modal.hide();
modal.updateContent('Nuevo contenido');
```

---

## 📋 CÓDIGO BASE (PUNTO DE PARTIDA)

### **HTML Base (index.html)**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Component Library Demo</title>
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/demo.css">
</head>
<body>
  <header>
    <h1>🏗️ Component Library Demo</h1>
    <p>Librería de componentes UI reutilizables</p>
  </header>
  
  <main>
    <!-- Cards Section -->
    <section class="demo-section">
      <h2>Cards Component</h2>
      <div id="cards-container" class="card-grid"></div>
    </section>
    
    <!-- Tabs Section -->
    <section class="demo-section">
      <h2>Tabs Component</h2>
      <div id="tabs-container"></div>
    </section>
    
    <!-- Accordion Section -->
    <section class="demo-section">
      <h2>Accordion Component</h2>
      <div id="accordion-container"></div>
    </section>
    
    <!-- Lazy Images Section -->
    <section class="demo-section">
      <h2>Lazy Images Component</h2>
      <div id="lazy-images-container"></div>
    </section>
  </main>
  
  <!-- Modal Container -->
  <div id="modal-container"></div>
  
  <!-- Scripts (type="module" para usar imports) -->
  <script type="module" src="js/app.js"></script>
</body>
</html>
```

---

### **CSS Base (css/main.css)**

```css
/* ============================================
   RESET Y VARIABLES
   ============================================ */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  /* Colores */
  --primary: #3b82f6;
  --primary-dark: #2563eb;
  --secondary: #8b5cf6;
  --success: #10b981;
  --danger: #ef4444;
  --warning: #f59e0b;
  
  --bg-color: #ffffff;
  --text-color: #1f2937;
  --border-color: #e5e7eb;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  /* Espaciado */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  
  /* Border radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  
  /* Transiciones */
  --transition: all 0.3s ease;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background: var(--bg-color);
}

/* ============================================
   HEADER
   ============================================ */

header {
  background: var(--primary);
  color: white;
  padding: var(--spacing-lg);
  text-align: center;
  box-shadow: var(--shadow);
}

header h1 {
  font-size: 2rem;
  margin-bottom: var(--spacing-xs);
}

header p {
  opacity: 0.9;
}

/* ============================================
   MAIN LAYOUT
   ============================================ */

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-lg);
}

.demo-section {
  margin-bottom: var(--spacing-xl);
}

.demo-section h2 {
  margin-bottom: var(--spacing-md);
  color: var(--primary);
  border-bottom: 2px solid var(--border-color);
  padding-bottom: var(--spacing-sm);
}

/* ============================================
   UTILIDADES
   ============================================ */

.hidden {
  display: none !important;
}

.fade-in {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

### **CSS Components Base (css/components.css)**

```css
/* ============================================
   CARD COMPONENT
   ============================================ */

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-md);
}

.card {
  background: white;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
  cursor: pointer;
}

.card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: var(--spacing-md);
}

.card h3 {
  margin-bottom: var(--spacing-xs);
  color: var(--text-color);
}

.card p {
  color: #6b7280;
  font-size: 0.9rem;
}

/* ============================================
   MODAL COMPONENT
   ============================================ */

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.modal-overlay.active {
  opacity: 1;
}

.modal {
  background: white;
  border-radius: var(--radius-lg);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  transform: scale(0.9);
  transition: transform 0.3s ease;
}

.modal-overlay.active .modal {
  transform: scale(1);
}

.modal-header {
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  color: var(--text-color);
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  transition: var(--transition);
}

.modal-close:hover {
  background: var(--border-color);
  color: var(--text-color);
}

.modal-body {
  padding: var(--spacing-md);
}

/* ============================================
   TABS COMPONENT
   ============================================ */

.tabs-nav {
  display: flex;
  gap: var(--spacing-xs);
  border-bottom: 2px solid var(--border-color);
  margin-bottom: var(--spacing-md);
}

.tab-button {
  background: none;
  border: none;
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  font-size: 1rem;
  color: #6b7280;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: var(--transition);
}

.tab-button:hover {
  color: var(--primary);
}

.tab-button.active {
  color: var(--primary);
  border-bottom-color: var(--primary);
  font-weight: 600;
}

.tab-content {
  display: none;
  animation: fadeIn 0.3s ease;
}

.tab-content.active {
  display: block;
}

/* ============================================
   ACCORDION COMPONENT
   ============================================ */

.accordion {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.accordion-item {
  border-bottom: 1px solid var(--border-color);
}

.accordion-item:last-child {
  border-bottom: none;
}

.accordion-header {
  background: white;
  border: none;
  width: 100%;
  padding: var(--spacing-md);
  text-align: left;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: var(--transition);
}

.accordion-header:hover {
  background: #f9fafb;
}

.accordion-icon {
  transition: transform 0.3s ease;
}

.accordion-item.active .accordion-icon {
  transform: rotate(180deg);
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.accordion-item.active .accordion-content {
  max-height: 500px; /* Ajustar según necesidad */
}

.accordion-body {
  padding: var(--spacing-md);
  background: #f9fafb;
}

/* ============================================
   LAZY IMAGE COMPONENT
   ============================================ */

.lazy-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  background: var(--border-color);
  transition: opacity 0.3s ease;
}

.lazy-image.lazy {
  opacity: 0.5;
}

.lazy-image.loaded {
  opacity: 1;
}
```

---

### **JavaScript Base - EventEmitter (js/components/EventEmitter.js)**

```javascript
// ============================================
// EVENT EMITTER BASE CLASS
// ============================================

export class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  /**
   * Escuchar un evento
   * @param {string} event - Nombre del evento
   * @param {Function} callback - Función a ejecutar
   */
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  /**
   * Disparar un evento
   * @param {string} event - Nombre del evento
   * @param {*} data - Data a pasar al callback
   */
  emit(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => callback(data));
  }
  
  /**
   * Dejar de escuchar un evento
   * @param {string} event - Nombre del evento
   * @param {Function} callback - Callback a remover
   */
  off(event, callback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }
}
```

---

## 💡 HINTS POR DÍA

### **Hints Día 1 (Card + Grid):**

**Hint 1 - Estructura básica de Card:**
```javascript
import { EventEmitter } from './EventEmitter.js';

export class Card extends EventEmitter {
  constructor(options) {
    super();
    this.options = {
      title: '',
      content: '',
      image: '',
      ...options
    };
    this.element = null;
  }
  
  render() {
    // TODO: Crear elemento
    // TODO: Agregar event listener para click
    // TODO: Retornar elemento
  }
  
  destroy() {
    this.element?.remove();
    this.element = null;
  }
}
```

**Hint 2 - CardGrid:**
```javascript
export class CardGrid {
  constructor(selector) {
    this.container = document.querySelector(selector);
    this.cards = [];
  }
  
  add(card) {
    // TODO: Renderizar card
    // TODO: Append al container
    // TODO: Guardar en array
  }
  
  clear() {
    // TODO: Destruir todas las cards
    // TODO: Limpiar array
  }
}
```

---

### **Hints Día 2 (Modal + Tabs):**

**Hint 1 - Modal estructura:**
```javascript
export class Modal extends EventEmitter {
  constructor(options) {
    super();
    this.options = options;
    this.overlay = null;
    this.modal = null;
    this.isOpen = false;
    
    this.create();
    this.setupEvents();
  }
  
  create() {
    // TODO: Crear overlay
    // TODO: Crear modal dentro del overlay
    // TODO: Append a body
  }
  
  setupEvents() {
    // TODO: Event listener para cerrar con X
    // TODO: Event listener para cerrar con overlay
    // TODO: Event listener para cerrar con ESC
  }
  
  open() {
    // TODO: Agregar clase 'active'
    // TODO: Emit evento 'open'
  }
  
  close() {
    // TODO: Remover clase 'active'
    // TODO: Emit evento 'close'
  }
}
```

**Hint 2 - Tabs estructura:**
```javascript
export class Tabs {
  constructor(selector, options) {
    this.container = document.querySelector(selector);
    this.options = options;
    this.activeTab = 0;
    
    this.render();
    this.setupEvents();
  }
  
  render() {
    // TODO: Crear nav con botones
    // TODO: Crear contenedores de contenido
    // TODO: Mostrar primer tab como activo
  }
  
  setupEvents() {
    // TODO: Event delegation en nav
    // TODO: Al click, cambiar tab activo
  }
  
  setActive(index) {
    // TODO: Remover 'active' de todos
    // TODO: Agregar 'active' al seleccionado
  }
}
```

---

### **Hints Día 3 (Accordion + LazyImage):**

**Hint 1 - Accordion:**
```javascript
export class Accordion {
  constructor(selector, options) {
    this.container = document.querySelector(selector);
    this.options = options;
    
    this.render();
    this.setupEvents();
  }
  
  render() {
    // TODO: Crear items del accordion
    // TODO: Cada item: header + content colapsado
  }
  
  setupEvents() {
    // TODO: Event delegation en headers
    // TODO: Al click, toggle item
  }
  
  toggle(index) {
    // TODO: Toggle clase 'active'
    // TODO: Animar con max-height
  }
}
```

**Hint 2 - LazyImage:**
```javascript
export class LazyImage {
  constructor(options) {
    this.options = options;
    this.element = null;
    this.observer = null;
  }
  
  render() {
    // TODO: Crear img con placeholder
    // TODO: Guardar src real en dataset
    // TODO: Setup IntersectionObserver
    // TODO: Retornar elemento
  }
  
  setupObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.load();
        }
      });
    }, { rootMargin: '50px' });
    
    this.observer.observe(this.element);
  }
  
  load() {
    // TODO: Cargar imagen real
    // TODO: Agregar clase 'loaded'
    // TODO: Disconnect observer
  }
}
```

---

### **Hints Día 4 (Integración):**

**Hint 1 - Conectar Card → Modal:**
```javascript
// En app.js
cards.forEach(data => {
  const card = new Card(data);
  
  card.on('card-clicked', (cardData) => {
    modal.setContent(`
      <h3>${cardData.title}</h3>
      <p>${cardData.content}</p>
    `);
    modal.open();
  });
  
  grid.add(card);
});
```

**Hint 2 - README estructura:**
```markdown
# Component Library

Librería de componentes UI reutilizables.

## Instalación
(copiar archivos a tu proyecto)

## Uso

### Card Component
```javascript
const card = new Card({
  title: 'Mi Card',
  content: 'Contenido',
  image: 'imagen.jpg'
});
```

### Modal Component
...

## API Reference

### Card
- `constructor(options)` - ...
- `render()` - ...
- `destroy()` - ...

...
```

---

## ✅ CHECKLIST FINAL

Antes de dar por completado el proyecto, verificar:

### **Funcionalidad:**
- [ ] Card: Renderiza correctamente con data
- [ ] Card: Click dispara evento
- [ ] CardGrid: Organiza múltiples cards
- [ ] Modal: Abre y cierra correctamente
- [ ] Modal: Cierra con X, overlay, ESC
- [ ] Tabs: Cambia entre tabs
- [ ] Tabs: Solo un tab activo
- [ ] Accordion: Expand/collapse funciona
- [ ] LazyImage: Carga solo cuando es visible
- [ ] Events: Al menos 2 componentes se comunican

### **Código:**
- [ ] Código comentado (al menos lo importante)
- [ ] Sin console.logs olvidados
- [ ] Sin código comentado viejo
- [ ] Nombres de variables descriptivos
- [ ] Funciones pequeñas y enfocadas

### **Estilos:**
- [ ] Responsive (se ve bien en mobile)
- [ ] Colores consistentes
- [ ] Espaciado uniforme
- [ ] Transiciones suaves

### **Documentación:**
- [ ] README.md con ejemplos
- [ ] Comentarios en código complejo
- [ ] Página demo funcional

---

## 🎓 LO QUE VAS A APRENDER

Al completar este proyecto dominarás:

✅ **Component Pattern** - Encapsular UI + behavior  
✅ **Event System** - Custom events para comunicación  
✅ **API Design** - Crear interfaces limpias  
✅ **Lazy Loading** - IntersectionObserver en práctica  
✅ **Event Delegation** - Performance en listas  
✅ **DOM Manipulation** - createElement sin innerHTML  
✅ **ES6 Modules** - Organizar código en archivos  
✅ **Class Inheritance** - Extender EventEmitter  
✅ **CSS Architecture** - Componentes modulares  
✅ **Project Structure** - Organizar proyecto profesional  

**Nivel esperado al final:** Mid-Senior en arquitectura de componentes ⭐⭐⭐⭐⭐

---

## 🚀 DESPUÉS DE ESTE PROYECTO

**React va a ser TRIVIAL:**
- Card class → React component
- EventEmitter → useEffect + custom hooks
- render() → JSX
- Lazy loading → React.lazy
- Modal → Portal

**Vas a ver React y decir: "Ah, es lo mismo que hice pero con sintaxis diferente".**

---

## 📊 CONTEXTO DE USO REAL

Este tipo de librería es lo que hacen internamente:
- Bootstrap
- Material UI
- Ant Design
- Chakra UI

**Estás aprendiendo cómo funcionan por dentro las librerías de UI profesionales.**

---

## 🎯 COMENZAR

**Pasos:**
1. Crear carpeta `component-library/`
2. Crear estructura de archivos
3. Copiar HTML/CSS base
4. Día 1: Card + Grid
5. Seguir cronograma

---

## ⚠️ RECORDATORIO FINAL DEL GOVERNOR

```
Día 4 llegó? → SUBIR lo que tengas
Funciona al 80%? → ES SUFICIENTE
Querés agregar más features? → NO, avanzar a Semana 3
Querés refactorizar? → NO, ya está bien
```

**El objetivo es COMPLETAR el proyecto, no perfeccionarlo.**

---

**¡Empezá con el Día 1 y suerte! 🚀**
