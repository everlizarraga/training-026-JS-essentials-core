# 📄 PLANTILLAS COMPLETAS - Component Library

Este archivo contiene las **plantillas base completas** de cada componente con la estructura HTML ya definida.

**Instrucciones:**
- Copiar cada componente a su archivo correspondiente en `js/components/`
- Completar los TODOs con la lógica
- Los comentarios explican cada parte

---

## 📦 CARD COMPONENT (js/components/Card.js)

```javascript
// ============================================
// CARD COMPONENT
// ============================================

import { EventEmitter } from './EventEmitter.js';

/**
 * Card Component
 * Componente de card reutilizable con imagen, título y contenido
 * 
 * @example
 * const card = new Card({
 *   title: 'Mi Card',
 *   content: 'Descripción',
 *   image: 'imagen.jpg'
 * });
 * 
 * const element = card.render();
 * document.body.append(element);
 */
export class Card extends EventEmitter {
  constructor(options) {
    super();  // Llamar constructor de EventEmitter
    
    // Opciones por defecto
    this.options = {
      title: 'Sin título',
      content: 'Sin contenido',
      image: 'https://via.placeholder.com/300x200',
      ...options  // Sobrescribir con opciones del usuario
    };
    
    this.element = null;
  }
  
  /**
   * Renderiza el componente y retorna el elemento DOM
   * @returns {HTMLElement}
   */
  render() {
    // Crear elemento principal
    this.element = document.createElement('div');
    this.element.className = 'card';
    
    // Crear estructura HTML
    this.element.innerHTML = `
      <img src="${this.options.image}" alt="${this.options.title}">
      <div class="card-content">
        <h3>${this.options.title}</h3>
        <p>${this.options.content}</p>
      </div>
    `;
    
    // Event listener para click
    this.element.addEventListener('click', () => {
      this.handleClick();
    });
    
    return this.element;
  }
  
  /**
   * Maneja el click en la card
   * Dispara evento 'card-clicked' con los datos de la card
   */
  handleClick() {
    // TODO: Disparar custom event 'card-clicked'
    // Hint: this.emit('card-clicked', this.options);
  }
  
  /**
   * Destruye el componente (limpia del DOM)
   */
  destroy() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}
```

---

## 🗂️ CARD GRID (js/components/CardGrid.js)

```javascript
// ============================================
// CARD GRID COMPONENT
// ============================================

/**
 * CardGrid Component
 * Contenedor para organizar múltiples cards en grid
 * 
 * @example
 * const grid = new CardGrid('#container');
 * grid.add(card1);
 * grid.add(card2);
 */
export class CardGrid {
  constructor(selector) {
    this.container = document.querySelector(selector);
    
    if (!this.container) {
      throw new Error(`Elemento ${selector} no encontrado`);
    }
    
    this.cards = [];
    
    // Agregar clase CSS al container
    this.container.classList.add('card-grid');
  }
  
  /**
   * Agrega una card al grid
   * @param {Card} card - Instancia de Card
   */
  add(card) {
    // TODO: Renderizar la card
    // Hint: const element = card.render();
    
    // TODO: Agregar al container
    // Hint: this.container.append(element);
    
    // TODO: Guardar en array
    // Hint: this.cards.push(card);
  }
  
  /**
   * Limpia todas las cards del grid
   */
  clear() {
    // TODO: Destruir cada card
    // Hint: this.cards.forEach(card => card.destroy());
    
    // TODO: Limpiar array
    // Hint: this.cards = [];
  }
  
  /**
   * Retorna el número de cards en el grid
   * @returns {number}
   */
  getCount() {
    return this.cards.length;
  }
}
```

---

## 🪟 MODAL COMPONENT (js/components/Modal.js)

```javascript
// ============================================
// MODAL COMPONENT
// ============================================

import { EventEmitter } from './EventEmitter.js';

/**
 * Modal Component
 * Modal reutilizable con overlay
 * 
 * @example
 * const modal = new Modal({
 *   title: 'Mi Modal',
 *   content: 'Contenido del modal'
 * });
 * 
 * modal.open();
 * modal.close();
 */
export class Modal extends EventEmitter {
  constructor(options) {
    super();
    
    this.options = {
      title: 'Modal',
      content: '',
      closable: true,        // Puede cerrarse con X
      closeOnOverlay: true,  // Cerrar al hacer click en overlay
      closeOnEsc: true,      // Cerrar con tecla ESC
      ...options
    };
    
    this.overlay = null;
    this.modal = null;
    this.isOpen = false;
    
    this.create();
    this.setupEvents();
  }
  
  /**
   * Crea la estructura del modal
   */
  create() {
    // Crear overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'modal-overlay';
    
    // Crear modal
    this.modal = document.createElement('div');
    this.modal.className = 'modal';
    
    // Estructura HTML del modal
    this.modal.innerHTML = `
      <div class="modal-header">
        <h2>${this.options.title}</h2>
        ${this.options.closable ? '<button class="modal-close" aria-label="Cerrar">×</button>' : ''}
      </div>
      <div class="modal-body">
        ${this.options.content}
      </div>
    `;
    
    // Agregar modal al overlay
    this.overlay.append(this.modal);
    
    // Agregar al body
    document.body.append(this.overlay);
  }
  
  /**
   * Configura event listeners del modal
   */
  setupEvents() {
    // Cerrar con botón X
    if (this.options.closable) {
      const closeBtn = this.modal.querySelector('.modal-close');
      closeBtn.addEventListener('click', () => {
        this.close();
      });
    }
    
    // Cerrar al hacer click en overlay
    if (this.options.closeOnOverlay) {
      this.overlay.addEventListener('click', (e) => {
        // TODO: Cerrar solo si se hace click en el overlay, NO en el modal
        // Hint: if (e.target === this.overlay) { this.close(); }
      });
    }
    
    // Cerrar con tecla ESC
    if (this.options.closeOnEsc) {
      this.handleEscKey = (e) => {
        // TODO: Cerrar si presiona ESC y el modal está abierto
        // Hint: if (e.key === 'Escape' && this.isOpen) { this.close(); }
      };
      
      document.addEventListener('keydown', this.handleEscKey);
    }
  }
  
  /**
   * Abre el modal
   */
  open() {
    // TODO: Agregar clase 'active' al overlay
    // Hint: this.overlay.classList.add('active');
    
    // TODO: Marcar como abierto
    // Hint: this.isOpen = true;
    
    // TODO: Disparar evento 'open'
    // Hint: this.emit('open');
  }
  
  /**
   * Cierra el modal
   */
  close() {
    // TODO: Remover clase 'active' del overlay
    // Hint: this.overlay.classList.remove('active');
    
    // TODO: Marcar como cerrado
    // Hint: this.isOpen = false;
    
    // TODO: Disparar evento 'close'
    // Hint: this.emit('close');
  }
  
  /**
   * Cambia el contenido del modal
   * @param {string} content - Nuevo contenido HTML
   */
  setContent(content) {
    const body = this.modal.querySelector('.modal-body');
    body.innerHTML = content;
  }
  
  /**
   * Cambia el título del modal
   * @param {string} title - Nuevo título
   */
  setTitle(title) {
    const header = this.modal.querySelector('.modal-header h2');
    header.textContent = title;
  }
  
  /**
   * Destruye el modal completamente
   */
  destroy() {
    // Remover event listener de ESC
    if (this.handleEscKey) {
      document.removeEventListener('keydown', this.handleEscKey);
    }
    
    // Remover del DOM
    this.overlay?.remove();
    this.overlay = null;
    this.modal = null;
  }
}
```

---

## 📑 TABS COMPONENT (js/components/Tabs.js)

```javascript
// ============================================
// TABS COMPONENT
// ============================================

import { EventEmitter } from './EventEmitter.js';

/**
 * Tabs Component
 * Sistema de pestañas con navegación
 * 
 * @example
 * const tabs = new Tabs('#tabs-container', {
 *   tabs: [
 *     { id: 'tab1', label: 'Tab 1', content: 'Contenido 1' },
 *     { id: 'tab2', label: 'Tab 2', content: 'Contenido 2' }
 *   ]
 * });
 */
export class Tabs extends EventEmitter {
  constructor(selector, options) {
    super();
    
    this.container = document.querySelector(selector);
    
    if (!this.container) {
      throw new Error(`Elemento ${selector} no encontrado`);
    }
    
    this.options = {
      tabs: [],
      activeTab: 0,  // Índice del tab activo por defecto
      ...options
    };
    
    this.activeIndex = this.options.activeTab;
    
    this.render();
    this.setupEvents();
  }
  
  /**
   * Renderiza el componente de tabs
   */
  render() {
    // Limpiar container
    this.container.innerHTML = '';
    
    // Crear navegación
    const nav = document.createElement('div');
    nav.className = 'tabs-nav';
    
    this.options.tabs.forEach((tab, index) => {
      const button = document.createElement('button');
      button.className = 'tab-button';
      button.dataset.index = index;
      button.textContent = tab.label;
      
      // Marcar el tab activo
      if (index === this.activeIndex) {
        button.classList.add('active');
      }
      
      nav.append(button);
    });
    
    // Crear contenedores de contenido
    const contentContainer = document.createElement('div');
    contentContainer.className = 'tabs-content';
    
    this.options.tabs.forEach((tab, index) => {
      const content = document.createElement('div');
      content.className = 'tab-content';
      content.dataset.index = index;
      content.innerHTML = tab.content;
      
      // Mostrar solo el tab activo
      if (index === this.activeIndex) {
        content.classList.add('active');
      }
      
      contentContainer.append(content);
    });
    
    // Agregar al container
    this.container.append(nav, contentContainer);
  }
  
  /**
   * Configura event listeners
   */
  setupEvents() {
    const nav = this.container.querySelector('.tabs-nav');
    
    // Event delegation en la navegación
    nav.addEventListener('click', (e) => {
      // TODO: Verificar si se clickeó un botón
      // Hint: const button = e.target.closest('.tab-button');
      
      // TODO: Si es un botón, obtener el índice
      // Hint: const index = parseInt(button.dataset.index);
      
      // TODO: Cambiar al tab seleccionado
      // Hint: this.setActive(index);
    });
  }
  
  /**
   * Cambia el tab activo
   * @param {number} index - Índice del tab
   */
  setActive(index) {
    // Validar índice
    if (index < 0 || index >= this.options.tabs.length) {
      return;
    }
    
    // TODO: Remover clase 'active' de todos los botones
    // Hint: this.container.querySelectorAll('.tab-button').forEach(...)
    
    // TODO: Agregar clase 'active' al botón seleccionado
    // Hint: const buttons = this.container.querySelectorAll('.tab-button');
    // Hint: buttons[index].classList.add('active');
    
    // TODO: Remover clase 'active' de todos los contenidos
    // Hint: this.container.querySelectorAll('.tab-content').forEach(...)
    
    // TODO: Agregar clase 'active' al contenido seleccionado
    // Hint: const contents = this.container.querySelectorAll('.tab-content');
    // Hint: contents[index].classList.add('active');
    
    // Actualizar índice activo
    this.activeIndex = index;
    
    // Disparar evento
    this.emit('tab-changed', {
      index,
      tab: this.options.tabs[index]
    });
  }
}
```

---

## 📋 ACCORDION COMPONENT (js/components/Accordion.js)

```javascript
// ============================================
// ACCORDION COMPONENT
// ============================================

import { EventEmitter } from './EventEmitter.js';

/**
 * Accordion Component
 * Componente de contenido colapsable
 * 
 * @example
 * const accordion = new Accordion('#accordion-container', {
 *   items: [
 *     { title: 'Item 1', content: 'Contenido 1' },
 *     { title: 'Item 2', content: 'Contenido 2' }
 *   ]
 * });
 */
export class Accordion extends EventEmitter {
  constructor(selector, options) {
    super();
    
    this.container = document.querySelector(selector);
    
    if (!this.container) {
      throw new Error(`Elemento ${selector} no encontrado`);
    }
    
    this.options = {
      items: [],
      allowMultiple: true,  // Permite múltiples items abiertos
      ...options
    };
    
    this.activeItems = new Set();  // Índices de items activos
    
    this.render();
    this.setupEvents();
  }
  
  /**
   * Renderiza el accordion
   */
  render() {
    // Crear contenedor del accordion
    const accordion = document.createElement('div');
    accordion.className = 'accordion';
    
    this.options.items.forEach((item, index) => {
      // Crear item del accordion
      const accordionItem = document.createElement('div');
      accordionItem.className = 'accordion-item';
      accordionItem.dataset.index = index;
      
      // Estructura HTML del item
      accordionItem.innerHTML = `
        <button class="accordion-header">
          <span>${item.title}</span>
          <span class="accordion-icon">▼</span>
        </button>
        <div class="accordion-content">
          <div class="accordion-body">
            ${item.content}
          </div>
        </div>
      `;
      
      accordion.append(accordionItem);
    });
    
    // Limpiar y agregar al container
    this.container.innerHTML = '';
    this.container.append(accordion);
  }
  
  /**
   * Configura event listeners
   */
  setupEvents() {
    const accordion = this.container.querySelector('.accordion');
    
    // Event delegation en el accordion
    accordion.addEventListener('click', (e) => {
      // TODO: Verificar si se clickeó un header
      // Hint: const header = e.target.closest('.accordion-header');
      
      // TODO: Si es un header, obtener el item
      // Hint: const item = header.closest('.accordion-item');
      
      // TODO: Obtener índice del item
      // Hint: const index = parseInt(item.dataset.index);
      
      // TODO: Toggle el item
      // Hint: this.toggle(index);
    });
  }
  
  /**
   * Toggle (abrir/cerrar) un item
   * @param {number} index - Índice del item
   */
  toggle(index) {
    const item = this.container.querySelector(`[data-index="${index}"]`);
    
    if (!item) return;
    
    const isActive = item.classList.contains('active');
    
    // Si NO permite múltiples abiertos, cerrar todos
    if (!this.options.allowMultiple && !isActive) {
      this.closeAll();
    }
    
    // Toggle el item
    if (isActive) {
      // TODO: Cerrar el item
      // Hint: item.classList.remove('active');
      // Hint: this.activeItems.delete(index);
    } else {
      // TODO: Abrir el item
      // Hint: item.classList.add('active');
      // Hint: this.activeItems.add(index);
    }
    
    // Disparar evento
    this.emit('item-toggled', {
      index,
      isOpen: !isActive
    });
  }
  
  /**
   * Cierra todos los items
   */
  closeAll() {
    const items = this.container.querySelectorAll('.accordion-item');
    
    items.forEach(item => {
      item.classList.remove('active');
    });
    
    this.activeItems.clear();
  }
  
  /**
   * Abre un item específico
   * @param {number} index - Índice del item
   */
  open(index) {
    const item = this.container.querySelector(`[data-index="${index}"]`);
    
    if (!item || item.classList.contains('active')) return;
    
    if (!this.options.allowMultiple) {
      this.closeAll();
    }
    
    item.classList.add('active');
    this.activeItems.add(index);
  }
  
  /**
   * Cierra un item específico
   * @param {number} index - Índice del item
   */
  close(index) {
    const item = this.container.querySelector(`[data-index="${index}"]`);
    
    if (!item || !item.classList.contains('active')) return;
    
    item.classList.remove('active');
    this.activeItems.delete(index);
  }
}
```

---

## 🖼️ LAZY IMAGE COMPONENT (js/components/LazyImage.js)

```javascript
// ============================================
// LAZY IMAGE COMPONENT
// ============================================

/**
 * LazyImage Component
 * Imagen con lazy loading usando IntersectionObserver
 * 
 * @example
 * const lazyImg = new LazyImage({
 *   src: 'imagen-real.jpg',
 *   placeholder: 'placeholder.jpg',
 *   alt: 'Descripción'
 * });
 * 
 * container.append(lazyImg.render());
 */
export class LazyImage {
  constructor(options) {
    this.options = {
      src: '',
      placeholder: 'https://via.placeholder.com/400x300',
      alt: '',
      className: '',
      ...options
    };
    
    this.element = null;
    this.observer = null;
    this.isLoaded = false;
  }
  
  /**
   * Renderiza el componente y retorna el elemento
   * @returns {HTMLImageElement}
   */
  render() {
    // Crear elemento img
    this.element = document.createElement('img');
    
    // Configurar atributos
    this.element.src = this.options.placeholder;  // Placeholder inicial
    this.element.dataset.src = this.options.src;  // Imagen real guardada
    this.element.alt = this.options.alt;
    this.element.className = `lazy-image lazy ${this.options.className}`.trim();
    
    // Configurar IntersectionObserver
    this.setupObserver();
    
    return this.element;
  }
  
  /**
   * Configura el IntersectionObserver
   */
  setupObserver() {
    // Opciones del observer
    const options = {
      root: null,           // viewport
      rootMargin: '50px',   // Cargar 50px antes de ser visible
      threshold: 0.1        // 10% visible = trigger
    };
    
    // Crear observer
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // TODO: Si la imagen es visible, cargar
        // Hint: if (entry.isIntersecting && !this.isLoaded) { this.load(); }
      });
    }, options);
    
    // Observar el elemento
    this.observer.observe(this.element);
  }
  
  /**
   * Carga la imagen real
   */
  load() {
    // TODO: Cambiar src al src real
    // Hint: this.element.src = this.element.dataset.src;
    
    // TODO: Remover clase 'lazy'
    // Hint: this.element.classList.remove('lazy');
    
    // TODO: Agregar clase 'loaded'
    // Hint: this.element.classList.add('loaded');
    
    // TODO: Marcar como cargada
    // Hint: this.isLoaded = true;
    
    // TODO: Dejar de observar (ya se cargó)
    // Hint: this.observer.disconnect();
    
    // Limpiar dataset
    delete this.element.dataset.src;
  }
  
  /**
   * Destruye el componente
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}
```

---

## 🚀 APP.JS - Inicialización (js/app.js)

```javascript
// ============================================
// APP.JS - Inicialización de la demo
// ============================================

import { Card } from './components/Card.js';
import { CardGrid } from './components/CardGrid.js';
import { Modal } from './components/Modal.js';
import { Tabs } from './components/Tabs.js';
import { Accordion } from './components/Accordion.js';
import { LazyImage } from './components/LazyImage.js';

// ============================================
// DATOS DE PRUEBA
// ============================================

const cardsData = [
  {
    title: 'Card 1',
    content: 'Descripción de la card 1',
    image: 'https://picsum.photos/300/200?random=1'
  },
  {
    title: 'Card 2',
    content: 'Descripción de la card 2',
    image: 'https://picsum.photos/300/200?random=2'
  },
  {
    title: 'Card 3',
    content: 'Descripción de la card 3',
    image: 'https://picsum.photos/300/200?random=3'
  },
  {
    title: 'Card 4',
    content: 'Descripción de la card 4',
    image: 'https://picsum.photos/300/200?random=4'
  },
  {
    title: 'Card 5',
    content: 'Descripción de la card 5',
    image: 'https://picsum.photos/300/200?random=5'
  },
  {
    title: 'Card 6',
    content: 'Descripción de la card 6',
    image: 'https://picsum.photos/300/200?random=6'
  }
];

const tabsData = {
  tabs: [
    {
      id: 'tab1',
      label: 'Tab 1',
      content: '<p>Contenido del Tab 1</p><p>Este es el primer tab.</p>'
    },
    {
      id: 'tab2',
      label: 'Tab 2',
      content: '<p>Contenido del Tab 2</p><p>Este es el segundo tab.</p>'
    },
    {
      id: 'tab3',
      label: 'Tab 3',
      content: '<p>Contenido del Tab 3</p><p>Este es el tercer tab.</p>'
    }
  ]
};

const accordionData = {
  items: [
    {
      title: 'Accordion Item 1',
      content: '<p>Contenido del primer item del accordion.</p>'
    },
    {
      title: 'Accordion Item 2',
      content: '<p>Contenido del segundo item del accordion.</p>'
    },
    {
      title: 'Accordion Item 3',
      content: '<p>Contenido del tercer item del accordion.</p>'
    }
  ]
};

// ============================================
// INICIALIZACIÓN
// ============================================

// Crear modal (se usa para mostrar detalles de cards)
const modal = new Modal({
  title: 'Detalles',
  content: '',
  closable: true,
  closeOnOverlay: true,
  closeOnEsc: true
});

// Escuchar eventos del modal
modal.on('open', () => {
  console.log('Modal abierto');
});

modal.on('close', () => {
  console.log('Modal cerrado');
});

// ============================================
// CARDS + GRID
// ============================================

const cardGrid = new CardGrid('#cards-container');

cardsData.forEach(data => {
  const card = new Card(data);
  
  // TODO: Escuchar evento de click en la card
  // Hint: card.on('card-clicked', (cardData) => { ... });
  // TODO: Al hacer click, abrir modal con los datos de la card
  // Hint: modal.setTitle(cardData.title);
  // Hint: modal.setContent(`<p>${cardData.content}</p>`);
  // Hint: modal.open();
  
  cardGrid.add(card);
});

// ============================================
// TABS
// ============================================

const tabs = new Tabs('#tabs-container', tabsData);

tabs.on('tab-changed', (data) => {
  console.log('Tab cambiado:', data);
});

// ============================================
// ACCORDION
// ============================================

const accordion = new Accordion('#accordion-container', accordionData);

accordion.on('item-toggled', (data) => {
  console.log('Item toggled:', data);
});

// ============================================
// LAZY IMAGES
// ============================================

const lazyContainer = document.getElementById('lazy-images-container');

// Crear 10 imágenes lazy
for (let i = 1; i <= 10; i++) {
  const lazyImg = new LazyImage({
    src: `https://picsum.photos/400/300?random=${i + 10}`,
    placeholder: 'https://via.placeholder.com/400x300/cccccc/666666?text=Loading...',
    alt: `Imagen lazy ${i}`
  });
  
  lazyContainer.append(lazyImg.render());
}

// ============================================
// LOG DE INICIALIZACIÓN
// ============================================

console.log('✅ Component Library inicializada');
console.log('Cards:', cardGrid.getCount());
console.log('Tabs:', tabsData.tabs.length);
console.log('Accordion items:', accordionData.items.length);
console.log('Lazy images:', 10);
```

---

## ✅ RESUMEN

**Archivos que tenés que crear:**

```
js/
├── components/
│   ├── EventEmitter.js   ✅ (ya lo tenías completo)
│   ├── Card.js           ✅ (plantilla completa arriba)
│   ├── CardGrid.js       ✅ (plantilla completa arriba)
│   ├── Modal.js          ✅ (plantilla completa arriba)
│   ├── Tabs.js           ✅ (plantilla completa arriba)
│   ├── Accordion.js      ✅ (plantilla completa arriba)
│   └── LazyImage.js      ✅ (plantilla completa arriba)
│
└── app.js                ✅ (plantilla completa arriba)
```

**Cada plantilla incluye:**
- ✅ Estructura HTML completa (cómo crear el DOM)
- ✅ Constructor con opciones por defecto
- ✅ Métodos principales implementados
- ✅ TODOs claros donde completar lógica
- ✅ Comentarios explicativos
- ✅ JSDoc para cada método

**Ahora sí tenés TODO lo necesario para el proyecto.** 🚀

---

**Workflow:**
1. Copiar cada componente a su archivo
2. Completar los TODOs (son pocas líneas por TODO)
3. Probar en el navegador
4. Iterar si es necesario

¿Ahora sí está claro? 😊
