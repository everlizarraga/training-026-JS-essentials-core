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
  card.on('card-clicked', (cardData) => {
    modal.setTitle(cardData.title);
    modal.setContent(`<p>${cardData.content}</p>`);
    modal.open();
  });

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
    // placeholder: 'https://via.placeholder.com/400x300/cccccc/666666?text=Loading...',
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

