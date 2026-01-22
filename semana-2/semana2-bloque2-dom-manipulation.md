# 🔥 WARMUP SEMANA 2 - BLOQUE 2: DOM Manipulation

**Duración:** 3-4 horas  
**Ejercicios:** 7-14  
**Objetivo:** Dominar manipulación moderna del DOM hasta que sea AUTOMÁTICA

---

## 📋 ÍNDICE DE EJERCICIOS

7. querySelector avanzado - Selectores complejos, closest()
8. createElement + append - Crear elementos dinámicamente
9. Event delegation - Un listener en padre, detectar hijos
10. Event propagation - Bubbling, capture, stopPropagation
11. classList API - add/remove/toggle clases dinámicamente
12. dataset + data attributes - Guardar data en elementos
13. IntersectionObserver - Lazy loading de imágenes/contenido
14. Custom events - Comunicación entre componentes

---

## 🎯 OBJETIVO DEL BLOQUE

Al completar estos ejercicios vas a:
- ✅ Manipular DOM eficientemente (performance optimizada)
- ✅ Usar event delegation automáticamente
- ✅ Entender event propagation profundamente
- ✅ Implementar lazy loading fácilmente
- ✅ Crear componentes que se comunican

**Esta es la manipulación de DOM que se usa en TODO proyecto moderno.**

---

## ⏱️ GOVERNOR ACTIVO

- Máximo 20-30 min por ejercicio
- Si funciona → NEXT
- No iterar buscando perfección
- Objetivo: MUSCLE MEMORY + PATTERNS

---

# EJERCICIO 7: querySelector Avanzado

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

## 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: querySelector Avanzado
// ============================================

// HTML de ejemplo:
/*
<div class="container">
  <div class="card active" data-id="1">
    <h3 class="card-title">Card 1</h3>
    <p class="card-text">Texto 1</p>
    <button class="btn btn-primary">Click</button>
  </div>
  
  <div class="card" data-id="2">
    <h3 class="card-title">Card 2</h3>
    <p class="card-text">Texto 2</p>
    <button class="btn btn-danger">Delete</button>
  </div>
  
  <ul class="menu">
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li class="active"><a href="#contact">Contact</a></li>
  </ul>
</div>
*/

// ============================================
// SELECTORES BÁSICOS (repaso)
// ============================================

// Por ID
const container = document.querySelector('#container');

// Por clase
const card = document.querySelector('.card');  // Primera card

// Por tag
const button = document.querySelector('button');  // Primer button

// Múltiples elementos
const cards = document.querySelectorAll('.card');  // NodeList con todas las cards

// ============================================
// SELECTORES COMBINADOS
// ============================================

// Descendiente (espacio = cualquier nivel)
const cardTitle = document.querySelector('.card .card-title');
// Busca .card-title DENTRO de .card (cualquier nivel de profundidad)

// Hijo directo (>)
const containerCards = document.querySelectorAll('.container > .card');
// Solo .card que son HIJOS DIRECTOS de .container

// Hermano adyacente (+)
const nextCard = document.querySelector('.card.active + .card');
// La card que viene JUSTO DESPUÉS de .card.active

// Todos los hermanos siguientes (~)
const allNextCards = document.querySelectorAll('.card.active ~ .card');
// TODAS las cards que vienen después de .card.active

// ============================================
// SELECTORES DE ATRIBUTOS
// ============================================

// Tiene el atributo
const cardsWithId = document.querySelectorAll('[data-id]');
// Todos los elementos con atributo data-id

// Atributo con valor específico
const card1 = document.querySelector('[data-id="1"]');
// Elemento con data-id exactamente "1"

// Atributo que empieza con...
const primaryBtns = document.querySelectorAll('[class^="btn-"]');
// class empieza con "btn-"

// Atributo que termina con...
const jpgImages = document.querySelectorAll('[src$=".jpg"]');
// src termina con ".jpg"

// Atributo que contiene...
const externalLinks = document.querySelectorAll('[href*="http"]');
// href contiene "http"

// ============================================
// PSEUDO-CLASES
// ============================================

// :first-child (primer hijo)
const firstCard = document.querySelector('.card:first-child');

// :last-child (último hijo)
const lastCard = document.querySelector('.card:last-child');

// :nth-child(n) (hijo número n)
const secondCard = document.querySelector('.card:nth-child(2)');

// :nth-child(odd) (impares)
const oddCards = document.querySelectorAll('.card:nth-child(odd)');

// :nth-child(even) (pares)
const evenCards = document.querySelectorAll('.card:nth-child(even)');

// :not() (negación)
const inactiveCards = document.querySelectorAll('.card:not(.active)');
// Cards que NO tienen clase "active"

// ============================================
// MÉTODO closest() - MUY IMPORTANTE
// ============================================

// closest() busca HACIA ARRIBA en el DOM
// Encuentra el ancestro más cercano que coincida

const button = document.querySelector('.btn');

// Buscar la card contenedora
const parentCard = button.closest('.card');
// Sube hasta encontrar .card

// Buscar el container
const parentContainer = button.closest('.container');
// Sube hasta encontrar .container

// Si no encuentra → null
const noExiste = button.closest('.no-existe');  // null

// ============================================
// CASO PRÁCTICO: Event delegation con closest
// ============================================

document.querySelector('.container').addEventListener('click', (e) => {
  // Detectar si se clickeó un botón
  const button = e.target.closest('.btn');
  
  if (button) {
    // Se clickeó un botón
    const card = button.closest('.card');
    const cardId = card.dataset.id;
    
    console.log(`Se clickeó botón en card ${cardId}`);
  }
});

// ============================================
// SELECTORES COMPLEJOS COMBINADOS
// ============================================

// Card activa con botón primary
const activeCardBtn = document.querySelector('.card.active .btn-primary');

// Links activos en el menú
const activeLinks = document.querySelectorAll('.menu li.active a');

// Primer botón de cada card
const firstButtons = document.querySelectorAll('.card .btn:first-child');

// Cards con data-id mayor a 1
const cardsFiltered = document.querySelectorAll('.card[data-id]');
// (Filtrar en JS después)
const cardsGt1 = Array.from(cardsFiltered).filter(card => 
  parseInt(card.dataset.id) > 1
);

// ============================================
// PERFORMANCE TIPS
// ============================================

// ✅ MEJOR: Selector específico
const specificBtn = document.querySelector('.container .card .btn');

// ❌ PEOR: Selector genérico (más lento)
const allButtons = document.querySelectorAll('button');
const filtered = Array.from(allButtons).filter(btn => 
  btn.closest('.container')
);

// ✅ MEJOR: Cachear resultados si usás múltiples veces
const container = document.querySelector('.container');
const card1 = container.querySelector('[data-id="1"]');
const card2 = container.querySelector('[data-id="2"]');

// ❌ PEOR: Re-buscar cada vez
document.querySelector('[data-id="1"]');
document.querySelector('[data-id="1"]');
document.querySelector('[data-id="1"]');
```

**Diagrama:**

```
DOM TREE:

.container
  ├─ .card[data-id="1"].active
  │    ├─ .card-title (h3)
  │    ├─ .card-text (p)
  │    └─ .btn.btn-primary
  │
  ├─ .card[data-id="2"]
  │    ├─ .card-title (h3)
  │    ├─ .card-text (p)
  │    └─ .btn.btn-danger
  │
  └─ .menu (ul)
       ├─ li > a
       ├─ li > a
       └─ li.active > a


CLOSEST() busca HACIA ARRIBA:
.btn → .card → .container

QUERYSELECTOR() busca HACIA ABAJO:
.container → .card → .btn
```

**Analogía:**
- `querySelector()` = buscar EN tus descendientes (hijos, nietos)
- `closest()` = buscar EN tus ancestros (padres, abuelos)

---

## 🎯 TU TURNO:

**CONSIGNA:**
Practicar selectores avanzados y método closest()

**HTML:**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Query Selector Avanzado</title>
  <style>
    .producto { border: 1px solid #ddd; padding: 10px; margin: 10px; }
    .producto.destacado { border-color: gold; background: #fffacd; }
    .btn { padding: 5px 10px; margin: 5px; cursor: pointer; }
    .btn-primary { background: blue; color: white; }
    .btn-danger { background: red; color: white; }
  </style>
</head>
<body>
  <div class="catalogo">
    <div class="producto destacado" data-id="1" data-categoria="electronica">
      <h3 class="producto-nombre">Laptop</h3>
      <p class="producto-precio">$1200</p>
      <button class="btn btn-primary" data-action="comprar">Comprar</button>
      <button class="btn btn-danger" data-action="eliminar">Eliminar</button>
    </div>
    
    <div class="producto" data-id="2" data-categoria="electronica">
      <h3 class="producto-nombre">Mouse</h3>
      <p class="producto-precio">$25</p>
      <button class="btn btn-primary" data-action="comprar">Comprar</button>
      <button class="btn btn-danger" data-action="eliminar">Eliminar</button>
    </div>
    
    <div class="producto" data-id="3" data-categoria="ropa">
      <h3 class="producto-nombre">Remera</h3>
      <p class="producto-precio">$50</p>
      <button class="btn btn-primary" data-action="comprar">Comprar</button>
      <button class="btn btn-danger" data-action="eliminar">Eliminar</button>
    </div>
  </div>
  
  <script src="ejercicio7.js"></script>
</body>
</html>
```

**TAREAS:**

```javascript
// ============================================
// EJERCICIO 7: querySelector Avanzado
// ============================================

// TAREA 1: Seleccionar elementos específicos
// a) El producto destacado
const productoDestacado = /* TU CÓDIGO */;

// b) Todos los productos de categoría "electronica"
const productosElectronica = /* TU CÓDIGO */;

// c) El segundo producto
const segundoProducto = /* TU CÓDIGO */;

// d) Todos los botones "Comprar" (btn-primary)
const botonesComprar = /* TU CÓDIGO */;

// e) El precio del producto con data-id="2"
const precioProducto2 = /* TU CÓDIGO */;

console.log('Producto destacado:', productoDestacado);
console.log('Productos electrónica:', productosElectronica);
console.log('Segundo producto:', segundoProducto);
console.log('Botones comprar:', botonesComprar);
console.log('Precio producto 2:', precioProducto2);

// TAREA 2: Usar closest() en event listener
document.querySelector('.catalogo').addEventListener('click', (e) => {
  // TU CÓDIGO AQUÍ
  // Si se clickeó un botón:
  //   - Encontrar el producto contenedor usando closest()
  //   - Obtener el data-id del producto
  //   - Obtener el data-action del botón
  //   - Mostrar en consola: "Acción: comprar, Producto ID: 1"
});

// TAREA 3: Selectores combinados
// a) Nombre del producto destacado
const nombreDestacado = /* TU CÓDIGO */;

// b) Botones de eliminar (btn-danger) solo en productos de electrónica
const botonesEliminarElectronica = /* TU CÓDIGO */;

// c) Productos que NO son destacados
const productosNoDestacados = /* TU CÓDIGO */;

console.log('Nombre destacado:', nombreDestacado);
console.log('Botones eliminar electrónica:', botonesEliminarElectronica);
console.log('Productos no destacados:', productosNoDestacados);
```

**RESULTADO ESPERADO:**

```
Producto destacado: <div class="producto destacado" data-id="1">...</div>
Productos electrónica: NodeList(2) [div.producto.destacado, div.producto]
Segundo producto: <div class="producto" data-id="2">...</div>
Botones comprar: NodeList(3) [button, button, button]
Precio producto 2: <p class="producto-precio">$25</p>

(Al hacer click en botones):
Acción: comprar, Producto ID: 1
Acción: eliminar, Producto ID: 2

Nombre destacado: <h3 class="producto-nombre">Laptop</h3>
Botones eliminar electrónica: NodeList(2) [button, button]
Productos no destacados: NodeList(2) [div.producto, div.producto]
```

---

## 💡 HINTS:

**Hint Tarea 1:**
```javascript
const productoDestacado = document.querySelector('.producto.destacado');
const productosElectronica = document.querySelectorAll('[data-categoria="electronica"]');
const segundoProducto = document.querySelector('.producto:nth-child(2)');
const botonesComprar = document.querySelectorAll('.btn-primary');
const precioProducto2 = document.querySelector('[data-id="2"] .producto-precio');
```

**Hint Tarea 2:**
```javascript
document.querySelector('.catalogo').addEventListener('click', (e) => {
  const button = e.target.closest('.btn');
  
  if (button) {
    const producto = button.closest('.producto');
    const productoId = producto.dataset.id;
    const accion = button.dataset.action;
    
    console.log(`Acción: ${accion}, Producto ID: ${productoId}`);
  }
});
```

**Hint Tarea 3:**
```javascript
const nombreDestacado = document.querySelector('.producto.destacado .producto-nombre');
const botonesEliminarElectronica = document.querySelectorAll('[data-categoria="electronica"] .btn-danger');
const productosNoDestacados = document.querySelectorAll('.producto:not(.destacado)');
```

---

## ✅ CHECKLIST:

- [ ] Selectores simples funcionan
- [ ] Selectores de atributos funcionan
- [ ] closest() funciona correctamente
- [ ] Event delegation con closest() funciona
- [ ] Selectores combinados funcionan

---

# EJERCICIO 8: createElement + append

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

## 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: createElement + append
// ============================================

// ============================================
// FORMA ANTIGUA (innerHTML)
// ============================================

const container = document.getElementById('container');

// ❌ PROBLEMA: innerHTML reemplaza TODO (pierde event listeners)
container.innerHTML = `
  <div class="card">
    <h3>Título</h3>
    <p>Texto</p>
  </div>
`;

// Si había event listeners → se pierden
// Si hay muchos elementos → performance baja

// ============================================
// FORMA MODERNA (createElement + append)
// ============================================

// 1. Crear elementos
const card = document.createElement('div');
const title = document.createElement('h3');
const text = document.createElement('p');

// 2. Agregar clases
card.classList.add('card');

// 3. Agregar contenido
title.textContent = 'Título';
text.textContent = 'Texto';

// 4. Ensamblar (append)
card.append(title, text);  // Múltiples elementos a la vez

// 5. Agregar al DOM
container.append(card);

// ============================================
// DIFERENCIA: append vs appendChild
// ============================================

// appendChild (antiguo):
// - Solo acepta UN elemento
// - Solo acepta Nodes (no strings)
// - Retorna el elemento agregado

container.appendChild(card);

// append (moderno):
// - Acepta MÚLTIPLES elementos
// - Acepta Nodes Y strings
// - No retorna nada

container.append(card, 'Texto extra', otroElemento);

// ============================================
// MÉTODOS DE INSERCIÓN
// ============================================

const referencia = document.querySelector('.referencia');

// append() - Al final (dentro)
referencia.append(nuevoElemento);
// <referencia>...<nuevoElemento></referencia>

// prepend() - Al principio (dentro)
referencia.prepend(nuevoElemento);
// <referencia><nuevoElemento>...</referencia>

// before() - Antes (afuera)
referencia.before(nuevoElemento);
// <nuevoElemento><referencia>...</referencia>

// after() - Después (afuera)
referencia.after(nuevoElemento);
// <referencia>...</referencia><nuevoElemento>

// replaceWith() - Reemplazar
referencia.replaceWith(nuevoElemento);
// <nuevoElemento>

// ============================================
// CREAR ELEMENTO COMPLEJO
// ============================================

function crearProductCard(producto) {
  // Estructura:
  // <div class="card" data-id="1">
  //   <img src="...">
  //   <h3>Nombre</h3>
  //   <p class="precio">$100</p>
  //   <button>Comprar</button>
  // </div>
  
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.id = producto.id;
  
  const img = document.createElement('img');
  img.src = producto.imagen;
  img.alt = producto.nombre;
  
  const nombre = document.createElement('h3');
  nombre.textContent = producto.nombre;
  
  const precio = document.createElement('p');
  precio.classList.add('precio');
  precio.textContent = `$${producto.precio}`;
  
  const boton = document.createElement('button');
  boton.textContent = 'Comprar';
  boton.addEventListener('click', () => {
    console.log(`Comprar ${producto.nombre}`);
  });
  
  // Ensamblar
  card.append(img, nombre, precio, boton);
  
  return card;
}

// Usar
const producto = {
  id: 1,
  nombre: 'Laptop',
  precio: 1200,
  imagen: 'laptop.jpg'
};

const card = crearProductCard(producto);
document.getElementById('productos').append(card);

// ============================================
// CREAR MÚLTIPLES ELEMENTOS (performance)
// ============================================

const productos = [
  { id: 1, nombre: 'Laptop', precio: 1200 },
  { id: 2, nombre: 'Mouse', precio: 25 },
  { id: 3, nombre: 'Teclado', precio: 75 }
];

// ❌ MALO: Múltiples append (reflow cada vez)
productos.forEach(prod => {
  const card = crearProductCard(prod);
  container.append(card);  // Reflow 3 veces
});

// ✅ MEJOR: DocumentFragment (un solo reflow)
const fragment = document.createDocumentFragment();

productos.forEach(prod => {
  const card = crearProductCard(prod);
  fragment.append(card);  // Append a fragment (en memoria)
});

container.append(fragment);  // Un solo reflow

// ✅ MEJOR AÚN: append con múltiples elementos
const cards = productos.map(prod => crearProductCard(prod));
container.append(...cards);  // Spread operator

// ============================================
// CLONAR ELEMENTOS
// ============================================

const original = document.querySelector('.card-template');

// Clonar (shallow - solo el elemento)
const clon1 = original.cloneNode(false);

// Clonar (deep - con todos los hijos)
const clon2 = original.cloneNode(true);

// Modificar clon
clon2.querySelector('h3').textContent = 'Nuevo título';
clon2.dataset.id = '99';

// Agregar al DOM
container.append(clon2);

// ============================================
// REMOVER ELEMENTOS
// ============================================

const elemento = document.querySelector('.eliminar-esto');

// Remover
elemento.remove();  // Moderno y simple

// Antiguo (no uses esto):
elemento.parentNode.removeChild(elemento);
```

**Diagrama:**

```
MÉTODOS DE INSERCIÓN:

before(A)
  ↓
<elemento>
  prepend(B) ← al principio (dentro)
  ...contenido...
  append(C) ← al final (dentro)
</elemento>
  ↓
after(D)


RESULTADO:
A
<elemento>
  B
  ...contenido...
  C
</elemento>
D
```

---

## 🎯 TU TURNO:

**CONSIGNA:**
Crear elementos dinámicamente sin usar innerHTML

**HTML:**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>createElement Demo</title>
  <style>
    .card {
      border: 1px solid #ddd;
      padding: 15px;
      margin: 10px;
      border-radius: 8px;
    }
    .precio { color: green; font-weight: bold; }
    .stock { color: #666; }
    .btn { padding: 8px 15px; cursor: pointer; }
  </style>
</head>
<body>
  <div id="productos"></div>
  
  <script src="ejercicio8.js"></script>
</body>
</html>
```

**TAREAS:**

```javascript
// ============================================
// EJERCICIO 8: createElement + append
// ============================================

const productosData = [
  { id: 1, nombre: 'Laptop', precio: 1200, stock: 5 },
  { id: 2, nombre: 'Mouse', precio: 25, stock: 15 },
  { id: 3, nombre: 'Teclado', precio: 75, stock: 10 }
];

// TAREA 1: Crear función que genera card de producto
function crearProductCard(producto) {
  // TU CÓDIGO AQUÍ
  // Estructura:
  // <div class="card" data-id="...">
  //   <h3>{nombre}</h3>
  //   <p class="precio">${precio}</p>
  //   <p class="stock">Stock: {stock}</p>
  //   <button class="btn">Comprar</button>
  // </div>
  
  // IMPORTANTE: NO usar innerHTML
  // Usar createElement, classList, textContent, dataset, append
}

// TAREA 2: Renderizar todos los productos (performance)
function renderizarProductos(productos) {
  const container = document.getElementById('productos');
  
  // TU CÓDIGO AQUÍ
  // Crear todas las cards
  // Agregarlas de forma eficiente (un solo append con spread)
}

renderizarProductos(productosData);

// TAREA 3: Agregar producto nuevo al principio
function agregarProductoAlPrincipio(producto) {
  const container = document.getElementById('productos');
  
  // TU CÓDIGO AQUÍ
  // Crear card del producto
  // Agregarlo al PRINCIPIO del container
}

// Probar después de 2 segundos
setTimeout(() => {
  agregarProductoAlPrincipio({ 
    id: 4, 
    nombre: 'Monitor', 
    precio: 300, 
    stock: 3 
  });
}, 2000);

// TAREA 4: Event listener que elimina producto
// Cuando se hace click en "Comprar" → remover la card
document.getElementById('productos').addEventListener('click', (e) => {
  // TU CÓDIGO AQUÍ
  // Si se clickeó el botón "Comprar"
  //   - Encontrar la card con closest()
  //   - Remover la card con remove()
});
```

**RESULTADO ESPERADO:**

```
Al cargar:
- Se muestran 3 cards de productos
- Cada card tiene nombre, precio, stock, botón

Después de 2 segundos:
- Se agrega "Monitor" al PRINCIPIO

Al hacer click en "Comprar":
- La card se elimina del DOM
```

---

## 💡 HINTS:

**Hint Tarea 1:**
```javascript
function crearProductCard(producto) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.id = producto.id;
  
  const nombre = document.createElement('h3');
  nombre.textContent = producto.nombre;
  
  const precio = document.createElement('p');
  precio.classList.add('precio');
  precio.textContent = `$${producto.precio}`;
  
  const stock = document.createElement('p');
  stock.classList.add('stock');
  stock.textContent = `Stock: ${producto.stock}`;
  
  const boton = document.createElement('button');
  boton.classList.add('btn');
  boton.textContent = 'Comprar';
  
  card.append(nombre, precio, stock, boton);
  
  return card;
}
```

**Hint Tarea 2:**
```javascript
function renderizarProductos(productos) {
  const container = document.getElementById('productos');
  const cards = productos.map(prod => crearProductCard(prod));
  container.append(...cards);
}
```

**Hint Tarea 3:**
```javascript
function agregarProductoAlPrincipio(producto) {
  const container = document.getElementById('productos');
  const card = crearProductCard(producto);
  container.prepend(card);
}
```

**Hint Tarea 4:**
```javascript
document.getElementById('productos').addEventListener('click', (e) => {
  if (e.target.classList.contains('btn')) {
    const card = e.target.closest('.card');
    card.remove();
  }
});
```

---

## ✅ CHECKLIST:

- [ ] createElement funciona correctamente
- [ ] append con múltiples elementos funciona
- [ ] prepend funciona correctamente
- [ ] remove() funciona correctamente
- [ ] NO usás innerHTML

---

# EJERCICIO 9: Event Delegation

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

## 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Event Delegation
// ============================================

// ============================================
// PROBLEMA: Event listeners individuales
// ============================================

// HTML:
/*
<ul id="lista">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
<button id="agregar">Agregar item</button>
*/

// ❌ FORMA INEFICIENTE:
const items = document.querySelectorAll('li');

items.forEach(item => {
  item.addEventListener('click', () => {
    console.log('Click en:', item.textContent);
  });
});

// PROBLEMAS:
// 1. Muchos listeners (uno por elemento) → memoria
// 2. Nuevos elementos NO tienen listener
// 3. Performance baja con muchos elementos

// Prueba:
document.getElementById('agregar').addEventListener('click', () => {
  const newItem = document.createElement('li');
  newItem.textContent = 'Nuevo item';
  document.getElementById('lista').append(newItem);
  // ↑ Este nuevo item NO tiene listener ✗
});

// ============================================
// SOLUCIÓN: Event Delegation
// ============================================

// ✅ UN SOLO listener en el contenedor padre
const lista = document.getElementById('lista');

lista.addEventListener('click', (e) => {
  // Verificar si se clickeó un <li>
  if (e.target.tagName === 'LI') {
    console.log('Click en:', e.target.textContent);
  }
});

// VENTAJAS:
// 1. UN solo listener (menos memoria)
// 2. Funciona con elementos nuevos automáticamente ✓
// 3. Mejor performance

// ============================================
// EVENT DELEGATION con closest()
// ============================================

// HTML más complejo:
/*
<div id="productos">
  <div class="card" data-id="1">
    <h3>Laptop</h3>
    <button class="btn-comprar">Comprar</button>
    <button class="btn-eliminar">Eliminar</button>
  </div>
  <div class="card" data-id="2">
    <h3>Mouse</h3>
    <button class="btn-comprar">Comprar</button>
    <button class="btn-eliminar">Eliminar</button>
  </div>
</div>
*/

document.getElementById('productos').addEventListener('click', (e) => {
  // Detectar click en botón de comprar
  const btnComprar = e.target.closest('.btn-comprar');
  if (btnComprar) {
    const card = btnComprar.closest('.card');
    const id = card.dataset.id;
    console.log(`Comprar producto ${id}`);
    return;  // Salir para evitar ejecutar otros checks
  }
  
  // Detectar click en botón de eliminar
  const btnEliminar = e.target.closest('.btn-eliminar');
  if (btnEliminar) {
    const card = btnEliminar.closest('.card');
    card.remove();
    return;
  }
  
  // Detectar click en la card (pero no en botones)
  const card = e.target.closest('.card');
  if (card && !btnComprar && !btnEliminar) {
    console.log('Click en card (no en botones)');
  }
});

// ============================================
// PATRÓN CON DATASET para acciones
// ============================================

// HTML:
/*
<div id="app">
  <button data-action="save">Guardar</button>
  <button data-action="delete">Eliminar</button>
  <button data-action="cancel">Cancelar</button>
</div>
*/

document.getElementById('app').addEventListener('click', (e) => {
  const button = e.target.closest('[data-action]');
  
  if (!button) return;  // No se clickeó botón
  
  const action = button.dataset.action;
  
  // Mapear acciones a funciones
  const actions = {
    save: () => console.log('Guardando...'),
    delete: () => console.log('Eliminando...'),
    cancel: () => console.log('Cancelando...')
  };
  
  // Ejecutar acción
  if (actions[action]) {
    actions[action]();
  }
});

// ============================================
// EVENT DELEGATION con formularios
// ============================================

document.getElementById('formulario').addEventListener('input', (e) => {
  // Detectar inputs específicos
  if (e.target.matches('[name="email"]')) {
    console.log('Email cambiado:', e.target.value);
  }
  
  if (e.target.matches('[name="password"]')) {
    console.log('Password cambiado');
  }
});

// ============================================
// CUÁNDO USAR EVENT DELEGATION
// ============================================

// ✅ USAR cuando:
// - Muchos elementos similares (lista de items)
// - Elementos se crean/eliminan dinámicamente
// - Performance es importante
// - Mismo comportamiento para múltiples elementos

// ❌ NO USAR cuando:
// - Un solo elemento específico
// - Comportamientos muy diferentes
// - Puede complicar el código innecesariamente
```

**Diagrama:**

```
SIN EVENT DELEGATION:
<ul>
  <li>👂</li>  ← listener 1
  <li>👂</li>  ← listener 2
  <li>👂</li>  ← listener 3
  <li>👂</li>  ← listener 4
</ul>
Total: 4 listeners


CON EVENT DELEGATION:
<ul 👂>  ← UN solo listener
  <li></li>
  <li></li>
  <li></li>
  <li></li>
</ul>
Total: 1 listener (4x más eficiente)


FLUJO:
1. Click en <li>
2. Event burbujea hasta <ul>
3. Listener en <ul> detecta click
4. e.target = <li> clickeado
5. Ejecutar acción
```

---

## 🎯 TU TURNO:

**CONSIGNA:**
Implementar event delegation para listas dinámicas

**HTML:**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Event Delegation</title>
  <style>
    .todo-item {
      padding: 10px;
      margin: 5px 0;
      border: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .todo-item.completado {
      text-decoration: line-through;
      opacity: 0.6;
    }
    .btn-eliminar {
      background: red;
      color: white;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div id="app">
    <input type="text" id="inputTodo" placeholder="Nueva tarea">
    <button id="btnAgregar">Agregar</button>
    
    <ul id="listaTodos"></ul>
  </div>
  
  <script src="ejercicio9.js"></script>
</body>
</html>
```

**TAREAS:**

```javascript
// ============================================
// EJERCICIO 9: Event Delegation
// ============================================

const listaTodos = document.getElementById('listaTodos');
const inputTodo = document.getElementById('inputTodo');
const btnAgregar = document.getElementById('btnAgregar');

// TAREA 1: Función para agregar TODO
function agregarTodo(texto) {
  // TU CÓDIGO AQUÍ
  // Crear estructura:
  // <li class="todo-item" data-id="...">
  //   <span class="todo-text">{texto}</span>
  //   <button class="btn-eliminar">X</button>
  // </li>
  
  // Agregar a la lista
}

// Agregar algunos TODOs iniciales
agregarTodo('Aprender JavaScript');
agregarTodo('Practicar DOM');
agregarTodo('Hacer proyecto');

// TAREA 2: Event listener para agregar TODO
btnAgregar.addEventListener('click', () => {
  // TU CÓDIGO AQUÍ
  // Obtener valor del input
  // Si no está vacío → agregar TODO
  // Limpiar input
});

// TAREA 3: Event delegation para la lista
// UN SOLO listener que maneje:
// - Click en el texto → marcar como completado (toggle clase)
// - Click en botón eliminar → eliminar TODO

listaTodos.addEventListener('click', (e) => {
  // TU CÓDIGO AQUÍ
  
  // Si se clickeó el botón eliminar:
  //   - Encontrar el <li> con closest()
  //   - Eliminarlo
  
  // Si se clickeó el texto del TODO:
  //   - Encontrar el <li> con closest()
  //   - Toggle clase "completado"
});

// TAREA 4: Agregar funcionalidad con Enter
inputTodo.addEventListener('keypress', (e) => {
  // TU CÓDIGO AQUÍ
  // Si presiona Enter → agregar TODO
});
```

**RESULTADO ESPERADO:**

```
Al cargar:
- 3 TODOs iniciales en la lista

Al escribir y hacer click en "Agregar":
- Se agrega nuevo TODO a la lista
- Input se limpia

Al hacer click en texto del TODO:
- Se marca/desmarca como completado (line-through)

Al hacer click en botón "X":
- Se elimina el TODO

Al presionar Enter en input:
- Se agrega TODO
```

---

## 💡 HINTS:

**Hint Tarea 1:**
```javascript
let todoIdCounter = 1;

function agregarTodo(texto) {
  const li = document.createElement('li');
  li.classList.add('todo-item');
  li.dataset.id = todoIdCounter++;
  
  const span = document.createElement('span');
  span.classList.add('todo-text');
  span.textContent = texto;
  
  const btn = document.createElement('button');
  btn.classList.add('btn-eliminar');
  btn.textContent = 'X';
  
  li.append(span, btn);
  listaTodos.append(li);
}
```

**Hint Tarea 2:**
```javascript
btnAgregar.addEventListener('click', () => {
  const texto = inputTodo.value.trim();
  if (texto) {
    agregarTodo(texto);
    inputTodo.value = '';
  }
});
```

**Hint Tarea 3:**
```javascript
listaTodos.addEventListener('click', (e) => {
  // Click en botón eliminar
  if (e.target.classList.contains('btn-eliminar')) {
    const todoItem = e.target.closest('.todo-item');
    todoItem.remove();
    return;
  }
  
  // Click en texto
  if (e.target.classList.contains('todo-text')) {
    const todoItem = e.target.closest('.todo-item');
    todoItem.classList.toggle('completado');
  }
});
```

**Hint Tarea 4:**
```javascript
inputTodo.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    btnAgregar.click();  // Reusar lógica del botón
  }
});
```

---

## ✅ CHECKLIST:

- [ ] UN solo listener en la lista
- [ ] Funciona con elementos nuevos
- [ ] closest() usado correctamente
- [ ] Marcar completado funciona
- [ ] Eliminar funciona
- [ ] Enter funciona

---

# EJERCICIO 10: Event Propagation

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

## 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Event Propagation
// ============================================

// HTML:
/*
<div id="abuelo">
  ABUELO
  <div id="padre">
    PADRE
    <button id="hijo">HIJO</button>
  </div>
</div>
*/

// ============================================
// FASE 1: CAPTURING (de arriba hacia abajo)
// FASE 2: TARGET (el elemento clickeado)
// FASE 3: BUBBLING (de abajo hacia arriba)
// ============================================

const abuelo = document.getElementById('abuelo');
const padre = document.getElementById('padre');
const hijo = document.getElementById('hijo');

// ============================================
// BUBBLING (por defecto)
// ============================================

abuelo.addEventListener('click', () => {
  console.log('3. Click en ABUELO (bubbling)');
});

padre.addEventListener('click', () => {
  console.log('2. Click en PADRE (bubbling)');
});

hijo.addEventListener('click', () => {
  console.log('1. Click en HIJO (bubbling)');
});

// Al hacer click en HIJO:
// 1. Click en HIJO (bubbling)
// 2. Click en PADRE (bubbling)
// 3. Click en ABUELO (bubbling)

// El evento BURBUJEA de hijo → padre → abuelo

// ============================================
// CAPTURING (capture: true)
// ============================================

abuelo.addEventListener('click', () => {
  console.log('1. Click en ABUELO (capturing)');
}, { capture: true });

padre.addEventListener('click', () => {
  console.log('2. Click en PADRE (capturing)');
}, { capture: true });

hijo.addEventListener('click', () => {
  console.log('3. Click en HIJO (capturing)');
}, { capture: true });

// Al hacer click en HIJO:
// 1. Click en ABUELO (capturing)
// 2. Click en PADRE (capturing)
// 3. Click en HIJO (capturing)

// El evento SE CAPTURA de abuelo → padre → hijo

// ============================================
// FLUJO COMPLETO (capturing + bubbling)
// ============================================

abuelo.addEventListener('click', () => {
  console.log('1. ABUELO capturing');
}, { capture: true });

padre.addEventListener('click', () => {
  console.log('2. PADRE capturing');
}, { capture: true });

hijo.addEventListener('click', () => {
  console.log('3. HIJO target');
});

padre.addEventListener('click', () => {
  console.log('4. PADRE bubbling');
});

abuelo.addEventListener('click', () => {
  console.log('5. ABUELO bubbling');
});

// Al hacer click en HIJO:
// 1. ABUELO capturing ↓
// 2. PADRE capturing ↓
// 3. HIJO target ⚫
// 4. PADRE bubbling ↑
// 5. ABUELO bubbling ↑

// ============================================
// stopPropagation() - Detener propagación
// ============================================

padre.addEventListener('click', (e) => {
  console.log('PADRE');
  e.stopPropagation();  // Detiene aquí
});

hijo.addEventListener('click', () => {
  console.log('HIJO');
});

// Al hacer click en HIJO:
// HIJO
// PADRE
// (NO llega a ABUELO - se detuvo en PADRE)

// ============================================
// stopImmediatePropagation()
// ============================================

padre.addEventListener('click', (e) => {
  console.log('PADRE - listener 1');
  e.stopImmediatePropagation();  // Detiene TODO
});

padre.addEventListener('click', () => {
  console.log('PADRE - listener 2');  // NO se ejecuta
});

abuelo.addEventListener('click', () => {
  console.log('ABUELO');  // NO se ejecuta
});

// Al hacer click en PADRE:
// PADRE - listener 1
// (Se detiene INMEDIATAMENTE - no ejecuta otros listeners)

// ============================================
// preventDefault() - Evitar comportamiento default
// ============================================

document.querySelector('a').addEventListener('click', (e) => {
  e.preventDefault();  // No sigue el link
  console.log('Link clickeado pero no navega');
});

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();  // No envía el form
  console.log('Form interceptado');
  
  // Hacer validación personalizada
  // Enviar con fetch
});

// ============================================
// e.target vs e.currentTarget
// ============================================

padre.addEventListener('click', (e) => {
  console.log('target:', e.target);        // Elemento clickeado
  console.log('currentTarget:', e.currentTarget);  // Elemento con listener
});

// Si clickeás HIJO:
// target: <button id="hijo">
// currentTarget: <div id="padre">

// ============================================
// CASO PRÁCTICO: Evitar bubbling indeseado
// ============================================

// HTML:
/*
<div class="card" onclick="abrirCard()">
  <button onclick="eliminarCard()">X</button>
</div>
*/

function eliminarCard(e) {
  e.stopPropagation();  // Evita que se ejecute abrirCard()
  // Eliminar card
}

function abrirCard() {
  // Abrir modal con detalles
}

// ============================================
// CUÁNDO USAR stopPropagation
// ============================================

// ✅ USAR cuando:
// - Evitar conflictos entre listeners padre/hijo
// - Click en botón dentro de elemento clickeable
// - Comportamientos específicos que no deben propagarse

// ❌ NO USAR cuando:
// - Puede romper event delegation
// - Otros listeners pueden necesitar el evento
// - Analytics/tracking pueden necesitar el evento
```

**Diagrama:**

```
EVENT PROPAGATION:

CAPTURING (↓)          BUBBLING (↑)
    [ABUELO] ─────────────► [ABUELO]
       ↓                       ↑
    [PADRE] ─────────────► [PADRE]
       ↓                       ↑
    [HIJO ⚫] ◄────────────► [HIJO]
    (target)


FLUJO COMPLETO:
1. Capturing: ABUELO → PADRE → HIJO
2. Target: HIJO
3. Bubbling: HIJO → PADRE → ABUELO


stopPropagation():
[ABUELO]
   ↓
[PADRE] ←🛑 detiene aquí
   ↓
[HIJO]
```

---

## 🎯 TU TURNO:

**CONSIGNA:**
Experimentar con event propagation y control de flujo

**HTML:**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Event Propagation</title>
  <style>
    #abuelo {
      padding: 50px;
      background: lightblue;
    }
    #padre {
      padding: 30px;
      background: lightgreen;
    }
    #hijo {
      padding: 20px;
      background: lightyellow;
    }
    .log {
      margin-top: 20px;
      padding: 10px;
      background: #f0f0f0;
      font-family: monospace;
    }
  </style>
</head>
<body>
  <div id="abuelo">
    ABUELO
    <div id="padre">
      PADRE
      <button id="hijo">HIJO (click aquí)</button>
    </div>
  </div>
  
  <div class="log" id="log"></div>
  
  <button id="limpiar">Limpiar log</button>
  
  <script src="ejercicio10.js"></script>
</body>
</html>
```

**TAREAS:**

```javascript
// ============================================
// EJERCICIO 10: Event Propagation
// ============================================

const abuelo = document.getElementById('abuelo');
const padre = document.getElementById('padre');
const hijo = document.getElementById('hijo');
const log = document.getElementById('log');

function agregarLog(texto) {
  const p = document.createElement('p');
  p.textContent = texto;
  log.append(p);
}

document.getElementById('limpiar').addEventListener('click', () => {
  log.innerHTML = '';
});

// TAREA 1: Demostrar bubbling
// Agregar listeners a los 3 elementos
// Cada uno debe loguear su nombre cuando se hace click

// TU CÓDIGO AQUÍ
abuelo.addEventListener('click', () => {
  // Loguear "Click en ABUELO (bubbling)"
});

padre.addEventListener('click', () => {
  // Loguear "Click en PADRE (bubbling)"
});

hijo.addEventListener('click', () => {
  // Loguear "Click en HIJO (bubbling)"
});

// Al hacer click en HIJO, debería mostrar:
// Click en HIJO (bubbling)
// Click en PADRE (bubbling)
// Click en ABUELO (bubbling)

// TAREA 2: Detener propagación en PADRE
// Modificar el listener del PADRE para que detenga la propagación

// TU CÓDIGO AQUÍ
// Al hacer click en HIJO ahora debería mostrar solo:
// Click en HIJO (bubbling)
// Click en PADRE (bubbling)
// (NO llega a ABUELO)

// TAREA 3: Mostrar e.target vs e.currentTarget
padre.addEventListener('click', (e) => {
  // TU CÓDIGO AQUÍ
  // Loguear:
  // "target: {e.target.id}"
  // "currentTarget: {e.currentTarget.id}"
});

// Al hacer click en HIJO debería mostrar:
// target: hijo
// currentTarget: padre

// TAREA 4: Prevenir comportamiento default
// Agregar un link y prevenir navegación

const link = document.createElement('a');
link.href = 'https://google.com';
link.textContent = 'Link a Google (no navega)';
document.body.append(link);

// TU CÓDIGO AQUÍ
link.addEventListener('click', (e) => {
  // Prevenir navegación
  // Loguear "Link clickeado pero preventDefault()"
});
```

**RESULTADO ESPERADO:**

```
TAREA 1 (click en HIJO):
Click en HIJO (bubbling)
Click en PADRE (bubbling)
Click en ABUELO (bubbling)

TAREA 2 (con stopPropagation):
Click en HIJO (bubbling)
Click en PADRE (bubbling)

TAREA 3:
target: hijo
currentTarget: padre

TAREA 4:
Link clickeado pero preventDefault()
(No navega a Google)
```

---

## 💡 HINTS:

**Hint Tarea 1:**
```javascript
abuelo.addEventListener('click', () => {
  agregarLog('Click en ABUELO (bubbling)');
});

padre.addEventListener('click', () => {
  agregarLog('Click en PADRE (bubbling)');
});

hijo.addEventListener('click', () => {
  agregarLog('Click en HIJO (bubbling)');
});
```

**Hint Tarea 2:**
```javascript
padre.addEventListener('click', (e) => {
  agregarLog('Click en PADRE (bubbling)');
  e.stopPropagation();
});
```

**Hint Tarea 3:**
```javascript
padre.addEventListener('click', (e) => {
  agregarLog(`target: ${e.target.id}`);
  agregarLog(`currentTarget: ${e.currentTarget.id}`);
});
```

**Hint Tarea 4:**
```javascript
link.addEventListener('click', (e) => {
  e.preventDefault();
  agregarLog('Link clickeado pero preventDefault()');
});
```

---

## ✅ CHECKLIST:

- [ ] Entendés bubbling
- [ ] Entendés capturing
- [ ] stopPropagation funciona
- [ ] preventDefault funciona
- [ ] Diferenciás target vs currentTarget

---

# EJERCICIO 11: classList API

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

## 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: classList API
// ============================================

// HTML:
/*
<div id="card" class="card active">
  <h3>Título</h3>
</div>
*/

const card = document.getElementById('card');

// ============================================
// FORMA ANTIGUA (className)
// ============================================

// ❌ PROBLEMA: className es string completo
console.log(card.className);  // "card active"

// Agregar clase (sobreescribe TODO)
card.className = 'card active highlight';

// Remover clase (complicado)
card.className = card.className.replace('active', '').trim();

// Toggle (muy complicado)
if (card.className.includes('active')) {
  card.className = card.className.replace('active', '').trim();
} else {
  card.className += ' active';
}

// ============================================
// FORMA MODERNA (classList)
// ============================================

// classList es un DOMTokenList (como array de clases)

// ✅ add() - Agregar clase
card.classList.add('highlight');
card.classList.add('shadow', 'border');  // Múltiples a la vez

// ✅ remove() - Remover clase
card.classList.remove('active');
card.classList.remove('shadow', 'border');  // Múltiples a la vez

// ✅ toggle() - Alternar clase
card.classList.toggle('active');  // Si tiene → quita, si no → agrega

// toggle con condición
const isLarge = true;
card.classList.toggle('large', isLarge);  // Agrega si isLarge es true

// ✅ contains() - Verificar si tiene clase
if (card.classList.contains('active')) {
  console.log('Card está activa');
}

// ✅ replace() - Reemplazar clase
card.classList.replace('card', 'card-new');  // card → card-new

// ============================================
// ITERAR sobre clases
// ============================================

card.classList.forEach(clase => {
  console.log('Clase:', clase);
});

// Convertir a array
const clasesArray = Array.from(card.classList);
console.log(clasesArray);  // ['card', 'active', 'highlight']

// ============================================
// CASOS PRÁCTICOS
// ============================================

// CASO 1: Tabs (solo una activa)
const tabs = document.querySelectorAll('.tab');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remover active de todas
    tabs.forEach(t => t.classList.remove('active'));
    
    // Agregar active a la clickeada
    tab.classList.add('active');
  });
});

// CASO 2: Dark mode toggle
const btnToggle = document.getElementById('toggle-theme');

btnToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  // Guardar preferencia
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// CASO 3: Animaciones con clases
const modal = document.getElementById('modal');

function abrirModal() {
  modal.classList.add('visible');
  
  // Agregar animación después de un frame
  requestAnimationFrame(() => {
    modal.classList.add('fade-in');
  });
}

function cerrarModal() {
  modal.classList.add('fade-out');
  
  // Remover después de animación (300ms)
  setTimeout(() => {
    modal.classList.remove('visible', 'fade-in', 'fade-out');
  }, 300);
}

// CASO 4: Estados de botón
const btn = document.getElementById('btn-guardar');

function guardar() {
  // Estado: cargando
  btn.classList.add('loading');
  btn.classList.remove('success', 'error');
  btn.disabled = true;
  
  fetch('/api/guardar')
    .then(() => {
      // Estado: éxito
      btn.classList.remove('loading');
      btn.classList.add('success');
      btn.disabled = false;
    })
    .catch(() => {
      // Estado: error
      btn.classList.remove('loading');
      btn.classList.add('error');
      btn.disabled = false;
    });
}

// CASO 5: Validación de formulario
const input = document.getElementById('email');

input.addEventListener('input', () => {
  const isValid = input.value.includes('@');
  
  input.classList.toggle('invalid', !isValid);
  input.classList.toggle('valid', isValid);
});

// ============================================
// PERFORMANCE TIPS
// ============================================

// ✅ MEJOR: Múltiples clases en una llamada
element.classList.add('clase1', 'clase2', 'clase3');

// ❌ PEOR: Múltiples llamadas
element.classList.add('clase1');
element.classList.add('clase2');
element.classList.add('clase3');

// ✅ MEJOR: Toggle con condición
element.classList.toggle('active', condition);

// ❌ PEOR: If manual
if (condition) {
  element.classList.add('active');
} else {
  element.classList.remove('active');
}
```

**Diagrama:**

```
CLASSLIST API:

Elemento con clases: <div class="card active highlight">

.classList = ["card", "active", "highlight"]

MÉTODOS:
.add("shadow")       → ["card", "active", "highlight", "shadow"]
.remove("active")    → ["card", "highlight", "shadow"]
.toggle("active")    → ["card", "highlight", "shadow", "active"]
.contains("card")    → true
.replace("card", "box") → ["box", "highlight", "shadow", "active"]
```

---

## 🎯 TU TURNO:

**CONSIGNA:**
Crear sistema de tabs con classList

**HTML:**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>classList API</title>
  <style>
    .tabs {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    .tab {
      padding: 10px 20px;
      cursor: pointer;
      background: #f0f0f0;
      border: 2px solid #ddd;
    }
    .tab.active {
      background: white;
      border-bottom-color: white;
      font-weight: bold;
    }
    .panel {
      display: none;
      padding: 20px;
      border: 2px solid #ddd;
    }
    .panel.active {
      display: block;
    }
  </style>
</head>
<body>
  <div class="tabs">
    <div class="tab active" data-panel="panel1">Tab 1</div>
    <div class="tab" data-panel="panel2">Tab 2</div>
    <div class="tab" data-panel="panel3">Tab 3</div>
  </div>
  
  <div class="panel active" id="panel1">Contenido del Panel 1</div>
  <div class="panel" id="panel2">Contenido del Panel 2</div>
  <div class="panel" id="panel3">Contenido del Panel 3</div>
  
  <script src="ejercicio11.js"></script>
</body>
</html>
```

**TAREAS:**

```javascript
// ============================================
// EJERCICIO 11: classList API
// ============================================

const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

// TAREA 1: Implementar sistema de tabs
// Al hacer click en un tab:
// - Remover "active" de todos los tabs
// - Agregar "active" al tab clickeado
// - Remover "active" de todos los panels
// - Agregar "active" al panel correspondiente

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // TU CÓDIGO AQUÍ
  });
});

// TAREA 2: Agregar dark mode toggle
const btnDarkMode = document.createElement('button');
btnDarkMode.textContent = 'Toggle Dark Mode';
document.body.prepend(btnDarkMode);

btnDarkMode.addEventListener('click', () => {
  // TU CÓDIGO AQUÍ
  // Toggle clase "dark-mode" en body
  // Cambiar texto del botón según estado
});

// CSS para dark mode (agregar al head)
const style = document.createElement('style');
style.textContent = `
  body.dark-mode {
    background: #222;
    color: white;
  }
  body.dark-mode .tab {
    background: #444;
    border-color: #666;
    color: white;
  }
  body.dark-mode .panel {
    background: #333;
    border-color: #666;
  }
`;
document.head.append(style);

// TAREA 3: Animación de transición
// Agregar clase "transitioning" al cambiar tabs
// Removerla después de 300ms

// Modificar el código de TAREA 1 para incluir esto
```

**RESULTADO ESPERADO:**

```
Al hacer click en Tab 2:
- Tab 2 se marca como active
- Panel 2 se muestra
- Los demás se ocultan

Al hacer click en "Toggle Dark Mode":
- Body agrega/quita clase "dark-mode"
- Colores cambian
- Texto del botón cambia

Al cambiar tabs:
- Se ve transición suave
```

---

## 💡 HINTS:

**Hint Tarea 1:**
```javascript
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remover active de todos los tabs
    tabs.forEach(t => t.classList.remove('active'));
    
    // Agregar active al clickeado
    tab.classList.add('active');
    
    // Remover active de todos los panels
    panels.forEach(p => p.classList.remove('active'));
    
    // Agregar active al panel correspondiente
    const panelId = tab.dataset.panel;
    document.getElementById(panelId).classList.add('active');
  });
});
```

**Hint Tarea 2:**
```javascript
btnDarkMode.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  const isDark = document.body.classList.contains('dark-mode');
  btnDarkMode.textContent = isDark ? 'Light Mode' : 'Dark Mode';
});
```

**Hint Tarea 3:**
```javascript
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Agregar transitioning
    document.body.classList.add('transitioning');
    
    // Cambiar tabs (código anterior)
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    panels.forEach(p => p.classList.remove('active'));
    document.getElementById(tab.dataset.panel).classList.add('active');
    
    // Remover transitioning después de 300ms
    setTimeout(() => {
      document.body.classList.remove('transitioning');
    }, 300);
  });
});
```

---

## ✅ CHECKLIST:

- [ ] Tabs funcionan correctamente
- [ ] Dark mode funciona
- [ ] classList.add/remove/toggle usados
- [ ] contains() usado correctamente
- [ ] Animaciones con clases funcionan

---

# EJERCICIO 12: dataset + data attributes

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

## 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: dataset + data attributes
// ============================================

// HTML:
/*
<div 
  id="producto"
  data-id="123"
  data-nombre="Laptop"
  data-precio="1200"
  data-stock="5"
  data-categoria-principal="electronica"
  data-en-oferta="true"
>
  Laptop
</div>
*/

const producto = document.getElementById('producto');

// ============================================
// LEER data attributes con dataset
// ============================================

console.log(producto.dataset.id);         // "123"
console.log(producto.dataset.nombre);     // "Laptop"
console.log(producto.dataset.precio);     // "1200" (string)
console.log(producto.dataset.stock);      // "5" (string)

// data-categoria-principal → camelCase
console.log(producto.dataset.categoriaPrincipal);  // "electronica"

// data-en-oferta → camelCase
console.log(producto.dataset.enOferta);   // "true" (string)

// ============================================
// ESCRIBIR data attributes con dataset
// ============================================

producto.dataset.id = '456';
producto.dataset.descuento = '10';
producto.dataset.fechaCreacion = '2025-01-01';

// CamelCase → kebab-case automáticamente
producto.dataset.ultimaActualizacion = '2025-01-21';
// → data-ultima-actualizacion="2025-01-21"

// ============================================
// ELIMINAR data attributes
// ============================================

delete producto.dataset.descuento;

// ============================================
// ITERAR sobre data attributes
// ============================================

for (let key in producto.dataset) {
  console.log(`${key}: ${producto.dataset[key]}`);
}

// Object.keys
Object.keys(producto.dataset).forEach(key => {
  console.log(`${key}: ${producto.dataset[key]}`);
});

// Object.entries
Object.entries(producto.dataset).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});

// ============================================
// CONVERSIÓN DE TIPOS
// ============================================

// dataset siempre retorna strings
const precio = producto.dataset.precio;  // "1200" (string)

// Convertir a número
const precioNum = parseFloat(producto.dataset.precio);  // 1200
const stockNum = parseInt(producto.dataset.stock);       // 5

// Convertir boolean
const enOferta = producto.dataset.enOferta === 'true';   // true

// JSON
producto.dataset.config = JSON.stringify({ theme: 'dark', lang: 'es' });
const config = JSON.parse(producto.dataset.config);

// ============================================
// CASOS PRÁCTICOS
// ============================================

// CASO 1: Event delegation con data-action
/*
<button data-action="save">Guardar</button>
<button data-action="delete">Eliminar</button>
<button data-action="cancel">Cancelar</button>
*/

document.addEventListener('click', (e) => {
  const button = e.target.closest('[data-action]');
  if (!button) return;
  
  const action = button.dataset.action;
  
  switch(action) {
    case 'save':
      console.log('Guardando...');
      break;
    case 'delete':
      console.log('Eliminando...');
      break;
    case 'cancel':
      console.log('Cancelando...');
      break;
  }
});

// CASO 2: Filtros de productos
/*
<div class="producto" data-categoria="electronica" data-precio="1200">
<div class="producto" data-categoria="ropa" data-precio="50">
<div class="producto" data-categoria="electronica" data-precio="25">
*/

function filtrarPorCategoria(categoria) {
  const productos = document.querySelectorAll('.producto');
  
  productos.forEach(prod => {
    if (prod.dataset.categoria === categoria) {
      prod.style.display = 'block';
    } else {
      prod.style.display = 'none';
    }
  });
}

function filtrarPorPrecio(max) {
  const productos = document.querySelectorAll('.producto');
  
  productos.forEach(prod => {
    const precio = parseFloat(prod.dataset.precio);
    prod.style.display = precio <= max ? 'block' : 'none';
  });
}

// CASO 3: Estado de componente
const modal = document.getElementById('modal');

modal.dataset.estado = 'cerrado';  // 'abierto' | 'cerrado'
modal.dataset.tipo = 'confirmacion';  // 'info' | 'confirmacion' | 'error'

function abrirModal(tipo, mensaje) {
  modal.dataset.estado = 'abierto';
  modal.dataset.tipo = tipo;
  modal.querySelector('.mensaje').textContent = mensaje;
  modal.classList.add('visible');
}

// CASO 4: Lazy loading de imágenes
/*
<img 
  data-src="imagen-real.jpg" 
  src="placeholder.jpg"
  class="lazy"
>
*/

const imagenes = document.querySelectorAll('.lazy');

imagenes.forEach(img => {
  // Cargar cuando sea visible
  if (img.getBoundingClientRect().top < window.innerHeight) {
    img.src = img.dataset.src;
    delete img.dataset.src;
    img.classList.remove('lazy');
  }
});

/*
const rect = elemento.getBoundingClientRect();

// POSICIÓN (relativa al viewport)
rect.top      // Distancia desde top del viewport al top del elemento
rect.bottom   // Distancia desde top del viewport al bottom del elemento
rect.left     // Distancia desde left del viewport al left del elemento
rect.right    // Distancia desde left del viewport al right del elemento

// DIMENSIONES
rect.width    // Ancho del elemento (incluyendo padding + border)
rect.height   // Alto del elemento (incluyendo padding + border)

// ALIASES
rect.x        // Igual a rect.left
rect.y        // Igual a rect.top

// IMPORTANTE: Todos los valores son en PÍXELES
// IMPORTANTE: Los valores cambian con SCROLL
*/


// CASO 5: Formulario con validación
/*
<input 
  type="email" 
  data-required="true"
  data-min-length="5"
  data-pattern="email"
>
*/

const input = document.querySelector('input');

function validar(input) {
  const valor = input.value;
  
  // Requerido
  if (input.dataset.required === 'true' && !valor) {
    return 'Campo requerido';
  }
  
  // Longitud mínima
  if (input.dataset.minLength) {
    const min = parseInt(input.dataset.minLength);
    if (valor.length < min) {
      return `Mínimo ${min} caracteres`;
    }
  }
  
  // Pattern
  if (input.dataset.pattern === 'email') {
    if (!valor.includes('@')) {
      return 'Email inválido';
    }
  }
  
  return null;  // Válido
}

// ============================================
// VENTAJAS de data attributes
// ============================================

// ✅ HTML válido (data-* es estándar)
// ✅ Fácil de leer y entender
// ✅ Accesible desde CSS (attr())
// ✅ No contamina scope global
// ✅ Ideal para configuración de componentes
// ✅ Perfecto para event delegation
```

**Diagrama:**

```
HTML:
<div data-user-id="123" data-user-name="Ana">

DATASET:
{
  userId: "123",      ← camelCase
  userName: "Ana"     ← camelCase
}

CONVERSIÓN:
data-user-id  ←→  dataset.userId
data-precio   ←→  dataset.precio
data-en-stock ←→  dataset.enStock


CSS (bonus):
.producto::before {
  content: attr(data-precio);  /* Muestra el precio */
}
```

---

## 🎯 TU TURNO:

**CONSIGNA:**
Crear sistema de filtros con data attributes

**HTML:**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>dataset Demo</title>
  <style>
    .producto {
      border: 1px solid #ddd;
      padding: 10px;
      margin: 10px;
      display: inline-block;
    }
    .producto.oculto {
      display: none;
    }
    .filtros {
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="filtros">
    <button data-filtro="categoria" data-valor="electronica">Electrónica</button>
    <button data-filtro="categoria" data-valor="ropa">Ropa</button>
    <button data-filtro="precio" data-valor="50">Hasta $50</button>
    <button data-filtro="precio" data-valor="100">Hasta $100</button>
    <button data-filtro="reset">Mostrar todos</button>
  </div>
  
  <div class="productos">
    <div class="producto" data-id="1" data-categoria="electronica" data-precio="1200" data-stock="5">
      <h3>Laptop</h3>
      <p class="precio">$1200</p>
    </div>
    
    <div class="producto" data-id="2" data-categoria="electronica" data-precio="25" data-stock="15">
      <h3>Mouse</h3>
      <p class="precio">$25</p>
    </div>
    
    <div class="producto" data-id="3" data-categoria="ropa" data-precio="50" data-stock="10">
      <h3>Remera</h3>
      <p class="precio">$50</p>
    </div>
    
    <div class="producto" data-id="4" data-categoria="ropa" data-precio="80" data-stock="8">
      <h3>Pantalón</h3>
      <p class="precio">$80</p>
    </div>
  </div>
  
  <script src="ejercicio12.js"></script>
</body>
</html>
```

**TAREAS:**

```javascript
// ============================================
// EJERCICIO 12: dataset + data attributes
// ============================================

const productos = document.querySelectorAll('.producto');
const filtros = document.querySelector('.filtros');

// TAREA 1: Implementar sistema de filtros
filtros.addEventListener('click', (e) => {
  const boton = e.target.closest('[data-filtro]');
  if (!boton) return;
  
  const filtro = boton.dataset.filtro;
  const valor = boton.dataset.valor;
  
  // TU CÓDIGO AQUÍ
  // Si filtro === 'reset' → mostrar todos
  // Si filtro === 'categoria' → filtrar por categoría
  // Si filtro === 'precio' → filtrar por precio máximo
});

// TAREA 2: Agregar contador de productos visibles
const contador = document.createElement('div');
contador.id = 'contador';
document.body.prepend(contador);

function actualizarContador() {
  // TU CÓDIGO AQUÍ
  // Contar productos que NO tienen clase "oculto"
  // Mostrar: "Mostrando X productos"
}

// Llamar después de cada filtro
actualizarContador();

// TAREA 3: Guardar filtro activo en data attribute
// Cuando se aplica un filtro, guardar en body.dataset.filtroActivo

// TAREA 4: Agregar precio total de productos visibles
const total = document.createElement('div');
total.id = 'total';
document.body.prepend(total);

function actualizarTotal() {
  // TU CÓDIGO AQUÍ
  // Sumar precios de productos visibles
  // Mostrar: "Total: $X"
}

actualizarTotal();
```

**RESULTADO ESPERADO:**

```
Al hacer click en "Electrónica":
- Se muestran solo productos de electrónica
- Contador: "Mostrando 2 productos"
- Total: "Total: $1225"

Al hacer click en "Hasta $50":
- Se muestran productos con precio <= 50
- Contador: "Mostrando 2 productos"
- Total: "Total: $75"

Al hacer click en "Mostrar todos":
- Se muestran todos los productos
- Contador: "Mostrando 4 productos"
- Total: "Total: $1355"
```

---

## 💡 HINTS:

**Hint Tarea 1:**
```javascript
filtros.addEventListener('click', (e) => {
  const boton = e.target.closest('[data-filtro]');
  if (!boton) return;
  
  const filtro = boton.dataset.filtro;
  const valor = boton.dataset.valor;
  
  productos.forEach(prod => {
    if (filtro === 'reset') {
      prod.classList.remove('oculto');
    } else if (filtro === 'categoria') {
      prod.classList.toggle('oculto', prod.dataset.categoria !== valor);
    } else if (filtro === 'precio') {
      const precio = parseFloat(prod.dataset.precio);
      const max = parseFloat(valor);
      prod.classList.toggle('oculto', precio > max);
    }
  });
  
  actualizarContador();
  actualizarTotal();
});
```

**Hint Tarea 2:**
```javascript
function actualizarContador() {
  const visibles = document.querySelectorAll('.producto:not(.oculto)');
  contador.textContent = `Mostrando ${visibles.length} productos`;
}
```

**Hint Tarea 3:**
```javascript
// En el event listener:
if (filtro !== 'reset') {
  document.body.dataset.filtroActivo = `${filtro}:${valor}`;
} else {
  delete document.body.dataset.filtroActivo;
}
```

**Hint Tarea 4:**
```javascript
function actualizarTotal() {
  const visibles = document.querySelectorAll('.producto:not(.oculto)');
  const totalPrecio = Array.from(visibles).reduce((sum, prod) => {
    return sum + parseFloat(prod.dataset.precio);
  }, 0);
  
  total.textContent = `Total: $${totalPrecio}`;
}
```

---

## ✅ CHECKLIST:

- [ ] Filtros funcionan correctamente
- [ ] dataset.property usado correctamente
- [ ] Conversión de tipos (parseFloat) funciona
- [ ] Contador funciona
- [ ] Total se calcula correctamente

---

# EJERCICIO 13: IntersectionObserver (Lazy Loading)

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

## 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: IntersectionObserver
// ============================================

// IntersectionObserver detecta cuando un elemento
// entra/sale del viewport (área visible)

// ============================================
// LAZY LOADING DE IMÁGENES
// ============================================

// HTML:
/*
<img 
  class="lazy" 
  data-src="imagen-real.jpg" 
  src="placeholder.jpg"
  alt="Descripción"
>
*/

// Crear observer
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    // entry.isIntersecting = true cuando es visible
    if (entry.isIntersecting) {
      const img = entry.target;
      
      // Cargar imagen real
      img.src = img.dataset.src;
      delete img.dataset.src;
      img.classList.remove('lazy');
      
      // Dejar de observar (ya se cargó)
      observer.unobserve(img);
    }
  });
}, {
  // Opciones
  root: null,          // viewport (null = toda la ventana)
  rootMargin: '50px',  // Cargar 50px antes de ser visible
  threshold: 0.1       // 10% visible = trigger
});

// Observar todas las imágenes lazy
const lazyImages = document.querySelectorAll('.lazy');
lazyImages.forEach(img => imageObserver.observe(img));

// ============================================
// OPCIONES DEL OBSERVER
// ============================================

const options = {
  // root: Elemento contenedor (null = viewport)
  root: null,
  
  // rootMargin: Margen alrededor del root
  // '0px' = exacto
  // '100px' = 100px antes/después
  // '-50px' = 50px adentro
  rootMargin: '0px',
  
  // threshold: Porcentaje visible para trigger
  // 0 = apenas visible
  // 0.5 = 50% visible
  // 1 = 100% visible
  // [0, 0.5, 1] = múltiples thresholds
  threshold: 0
};

// ============================================
// ANIMACIONES AL HACER SCROLL
// ============================================

// HTML:
/*
<div class="fade-in-section">
  Contenido que aparece al scrollear
</div>
*/

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.2  // 20% visible
});

document.querySelectorAll('.fade-in-section').forEach(section => {
  fadeObserver.observe(section);
});

// CSS:
/*
.fade-in-section {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s, transform 0.6s;
}

.fade-in-section.visible {
  opacity: 1;
  transform: translateY(0);
}
*/

// ============================================
// INFINITE SCROLL
// ============================================

// HTML:
/*
<div id="contenedor"></div>
<div id="sentinel"></div>  ← trigger para cargar más
*/

let pagina = 1;

const sentinelObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      cargarMasProductos();
    }
  });
}, {
  rootMargin: '200px'  // Cargar 200px antes del final
});

const sentinel = document.getElementById('sentinel');
sentinelObserver.observe(sentinel);

async function cargarMasProductos() {
  const response = await fetch(`/api/productos?page=${pagina}`);
  const productos = await response.json();
  
  productos.forEach(prod => {
    const card = crearProductCard(prod);
    document.getElementById('contenedor').append(card);
  });
  
  pagina++;
}

// ============================================
// TRACKING DE VISUALIZACIONES
// ============================================

const trackingObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const elemento = entry.target;
      const id = elemento.dataset.id;
      
      // Enviar analytics
      console.log(`Usuario vio elemento ${id}`);
      
      // Opcional: dejar de observar después de primer view
      trackingObserver.unobserve(elemento);
    }
  });
}, {
  threshold: 0.5  // 50% visible = contabiliza como "visto"
});

// ============================================
// DETECTAR CUANDO SALE DEL VIEWPORT
// ============================================

const visibilityObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Elemento ENTRÓ al viewport');
      entry.target.classList.add('visible');
    } else {
      console.log('Elemento SALIÓ del viewport');
      entry.target.classList.remove('visible');
    }
  });
});

// ============================================
// MÚLTIPLES THRESHOLDS
// ============================================

const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // entry.intersectionRatio = porcentaje visible (0 a 1)
    const porcentaje = Math.floor(entry.intersectionRatio * 100);
    console.log(`Elemento ${porcentaje}% visible`);
    
    entry.target.style.opacity = entry.intersectionRatio;
  });
}, {
  threshold: [0, 0.25, 0.5, 0.75, 1]  // Triggers cada 25%
});

// ============================================
// DESTRUIR OBSERVER
// ============================================

// Dejar de observar UN elemento
observer.unobserve(elemento);

// Dejar de observar TODOS
observer.disconnect();

// ============================================
// CASOS DE USO
// ============================================

// ✅ Lazy loading de imágenes (performance)
// ✅ Infinite scroll (cargar más contenido)
// ✅ Animaciones al scrollear (UX)
// ✅ Analytics (tracking de visualizaciones)
// ✅ Pausar/reanudar videos según visibilidad
// ✅ Cargar ads cuando sean visibles
// ✅ Precargar contenido siguiente
```

**Diagrama:**

```
INTERSECTION OBSERVER:

VIEWPORT (área visible):
┌─────────────────────┐
│                     │
│   [ELEMENTO A] ✓    │ ← isIntersecting = true
│                     │
├─────────────────────┤ ← borde del viewport
│                     │
    [ELEMENTO B] ✗      ← isIntersecting = false


THRESHOLD:
threshold: 0    → trigger cuando 0% visible (apenas entra)
threshold: 0.5  → trigger cuando 50% visible
threshold: 1    → trigger cuando 100% visible


ROOTMARGIN:
rootMargin: '100px'  → trigger 100px ANTES de entrar
rootMargin: '-50px'  → trigger 50px DESPUÉS de entrar
```

---

## 🎯 TU TURNO:

**CONSIGNA:**
Implementar lazy loading de imágenes y animaciones al scrollear

**HTML:**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>IntersectionObserver Demo</title>
  <style>
    body {
      padding: 20px;
    }
    .spacer {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }
    .imagen-container {
      margin: 50px 0;
      text-align: center;
    }
    .lazy {
      width: 400px;
      height: 300px;
      background: #f0f0f0;
      border: 2px dashed #ccc;
    }
    .lazy.loaded {
      border-color: green;
    }
    .fade-in {
      opacity: 0;
      transform: translateY(50px);
      transition: opacity 0.6s, transform 0.6s;
    }
    .fade-in.visible {
      opacity: 1;
      transform: translateY(0);
    }
  </style>
</head>
<body>
  <h1>IntersectionObserver Demo</h1>
  
  <div class="spacer">Scrolleá hacia abajo ⬇</div>
  
  <div class="imagen-container fade-in">
    <h2>Imagen 1</h2>
    <img 
      class="lazy" 
      data-src="https://picsum.photos/400/300?random=1"
      alt="Imagen 1"
    >
  </div>
  
  <div class="imagen-container fade-in">
    <h2>Imagen 2</h2>
    <img 
      class="lazy" 
      data-src="https://picsum.photos/400/300?random=2"
      alt="Imagen 2"
    >
  </div>
  
  <div class="imagen-container fade-in">
    <h2>Imagen 3</h2>
    <img 
      class="lazy" 
      data-src="https://picsum.photos/400/300?random=3"
      alt="Imagen 3"
    >
  </div>
  
  <div class="spacer">Fin del contenido ✓</div>
  
  <script src="ejercicio13.js"></script>
</body>
</html>
```

**TAREAS:**

```javascript
// ============================================
// EJERCICIO 13: IntersectionObserver
// ============================================

// TAREA 1: Lazy loading de imágenes
const lazyImages = document.querySelectorAll('.lazy');

const imageObserver = new IntersectionObserver((entries, observer) => {
  // TU CÓDIGO AQUÍ
  // Por cada entry:
  //   Si isIntersecting:
  //     - Cargar imagen real (dataset.src → src)
  //     - Agregar clase "loaded"
  //     - Dejar de observar (unobserve)
}, {
  rootMargin: '50px',  // Cargar 50px antes
  threshold: 0.1       // 10% visible
});

// Observar todas las imágenes
lazyImages.forEach(img => imageObserver.observe(img));

// TAREA 2: Animaciones fade-in al scrollear
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
  // TU CÓDIGO AQUÍ
  // Por cada entry:
  //   Si isIntersecting:
  //     - Agregar clase "visible"
}, {
  threshold: 0.2  // 20% visible
});

// Observar todos los elementos fade-in
fadeElements.forEach(el => fadeObserver.observe(el));

// TAREA 3: Contador de imágenes cargadas
let imagenesCargadas = 0;

const contador = document.createElement('div');
contador.style.position = 'fixed';
contador.style.top = '20px';
contador.style.right = '20px';
contador.style.padding = '10px';
contador.style.background = 'black';
contador.style.color = 'white';
document.body.append(contador);

function actualizarContador() {
  // TU CÓDIGO AQUÍ
  // Mostrar: "Imágenes cargadas: X/Y"
}

actualizarContador();

// Modificar TAREA 1 para incrementar contador al cargar
```

**RESULTADO ESPERADO:**

```
Al cargar la página:
- Contador muestra: "Imágenes cargadas: 0/3"
- Imágenes tienen placeholder gris

Al scrollear hacia una imagen:
- Imagen se carga automáticamente
- Se agrega borde verde
- Contador se actualiza
- Fade-in se anima (aparece suavemente)

Al final:
- Contador muestra: "Imágenes cargadas: 3/3"
- Todas las animaciones se ejecutaron
```

---

## 💡 HINTS:

**Hint Tarea 1:**
```javascript
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      
      // Cargar imagen
      img.src = img.dataset.src;
      delete img.dataset.src;
      img.classList.add('loaded');
      
      // Incrementar contador
      imagenesCargadas++;
      actualizarContador();
      
      // Dejar de observar
      observer.unobserve(img);
    }
  });
}, {
  rootMargin: '50px',
  threshold: 0.1
});
```

**Hint Tarea 2:**
```javascript
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.2
});
```

**Hint Tarea 3:**
```javascript
function actualizarContador() {
  const total = lazyImages.length;
  contador.textContent = `Imágenes cargadas: ${imagenesCargadas}/${total}`;
}
```

---

## ✅ CHECKLIST:

- [ ] Lazy loading funciona
- [ ] Imágenes se cargan cuando son visibles
- [ ] Fade-in se anima al scrollear
- [ ] Contador funciona
- [ ] unobserve() usado correctamente

---

# EJERCICIO 14: Custom Events

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

## 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Custom Events
// ============================================

// Custom events permiten comunicación entre componentes
// sin acoplarlos directamente

// ============================================
// CREAR Y DISPARAR CUSTOM EVENT
// ============================================

// Crear evento personalizado
const miEvento = new CustomEvent('miEvento', {
  detail: {
    mensaje: 'Hola desde el evento',
    timestamp: Date.now()
  },
  bubbles: true,      // Burbujea hacia arriba
  cancelable: true    // Puede cancelarse con preventDefault()
});

// Disparar el evento en un elemento
document.dispatchEvent(miEvento);

// ============================================
// ESCUCHAR CUSTOM EVENT
// ============================================

document.addEventListener('miEvento', (e) => {
  console.log('Evento recibido:', e.detail.mensaje);
  console.log('Timestamp:', e.detail.timestamp);
});

// ============================================
// CASO PRÁCTICO: Carrito de compras
// ============================================

// Componente 1: ProductCard
class ProductCard {
  constructor(producto) {
    this.producto = producto;
    this.elemento = this.crear();
  }
  
  crear() {
    const card = document.createElement('div');
    card.innerHTML = `
      <h3>${this.producto.nombre}</h3>
      <p>$${this.producto.precio}</p>
      <button class="agregar">Agregar al carrito</button>
    `;
    
    card.querySelector('.agregar').addEventListener('click', () => {
      this.agregarAlCarrito();
    });
    
    return card;
  }
  
  agregarAlCarrito() {
    // Disparar custom event
    const evento = new CustomEvent('producto-agregado', {
      detail: {
        producto: this.producto,
        cantidad: 1
      },
      bubbles: true
    });
    
    this.elemento.dispatchEvent(evento);
  }
}

// Componente 2: Carrito
class Carrito {
  constructor() {
    this.items = [];
    this.elemento = document.getElementById('carrito');
    this.escucharEventos();
  }
  
  escucharEventos() {
    // Escuchar evento personalizado
    document.addEventListener('producto-agregado', (e) => {
      this.agregar(e.detail.producto, e.detail.cantidad);
    });
  }
  
  agregar(producto, cantidad) {
    this.items.push({ producto, cantidad });
    this.renderizar();
    
    // Disparar evento de actualización
    const evento = new CustomEvent('carrito-actualizado', {
      detail: {
        totalItems: this.items.length,
        total: this.calcularTotal()
      }
    });
    
    document.dispatchEvent(evento);
  }
  
  calcularTotal() {
    return this.items.reduce((sum, item) => 
      sum + (item.producto.precio * item.cantidad), 0
    );
  }
  
  renderizar() {
    this.elemento.innerHTML = `
      <h2>Carrito (${this.items.length})</h2>
      <ul>
        ${this.items.map(item => `
          <li>${item.producto.nombre} x${item.cantidad}</li>
        `).join('')}
      </ul>
      <p>Total: $${this.calcularTotal()}</p>
    `;
  }
}

// Componente 3: Badge del carrito
const badge = document.getElementById('carrito-badge');

document.addEventListener('carrito-actualizado', (e) => {
  badge.textContent = e.detail.totalItems;
  badge.style.display = e.detail.totalItems > 0 ? 'block' : 'none';
});

// ============================================
// PATRÓN: Event Bus (central de eventos)
// ============================================

class EventBus {
  constructor() {
    this.listeners = {};
  }
  
  on(evento, callback) {
    if (!this.listeners[evento]) {
      this.listeners[evento] = [];
    }
    this.listeners[evento].push(callback);
  }
  
  emit(evento, data) {
    if (!this.listeners[evento]) return;
    
    this.listeners[evento].forEach(callback => {
      callback(data);
    });
  }
  
  off(evento, callback) {
    if (!this.listeners[evento]) return;
    
    this.listeners[evento] = this.listeners[evento].filter(
      cb => cb !== callback
    );
  }
}

// Uso:
const eventBus = new EventBus();

// Componente A emite
eventBus.emit('usuario-logueado', { nombre: 'Ana', id: 123 });

// Componente B escucha
eventBus.on('usuario-logueado', (data) => {
  console.log(`Bienvenido ${data.nombre}`);
});

// ============================================
// CASO PRÁCTICO: Modal con eventos
// ============================================

class Modal {
  constructor(id) {
    this.elemento = document.getElementById(id);
    this.configurarEventos();
  }
  
  abrir(contenido) {
    this.elemento.innerHTML = contenido;
    this.elemento.classList.add('visible');
    
    // Disparar evento de apertura
    const evento = new CustomEvent('modal-abierto', {
      detail: { modalId: this.elemento.id }
    });
    document.dispatchEvent(evento);
  }
  
  cerrar() {
    this.elemento.classList.remove('visible');
    
    // Disparar evento de cierre
    const evento = new CustomEvent('modal-cerrado', {
      detail: { modalId: this.elemento.id }
    });
    document.dispatchEvent(evento);
  }
  
  configurarEventos() {
    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.elemento.classList.contains('visible')) {
        this.cerrar();
      }
    });
  }
}

// Escuchar eventos del modal
document.addEventListener('modal-abierto', (e) => {
  console.log(`Modal ${e.detail.modalId} abierto`);
  // Pausar video de fondo, etc.
});

document.addEventListener('modal-cerrado', (e) => {
  console.log(`Modal ${e.detail.modalId} cerrado`);
  // Reanudar video de fondo, etc.
});

// ============================================
// VENTAJAS DE CUSTOM EVENTS
// ============================================

// ✅ Desacoplamiento (componentes no se conocen directamente)
// ✅ Reutilización (componentes independientes)
// ✅ Escalabilidad (fácil agregar listeners)
// ✅ Testing (fácil mockear eventos)
// ✅ Debugging (eventos en DevTools)
```

**Diagrama:**

```
CUSTOM EVENTS - Flujo:

[COMPONENTE A]
     ↓
  emit('evento', data)
     ↓
[EVENT BUS / document]
     ↓
addEventListener('evento')
     ↓
[COMPONENTE B]
[COMPONENTE C]
[COMPONENTE D]


EJEMPLO CARRITO:

[ProductCard] → 'producto-agregado' → [Carrito]
                                    → [Badge]
                                    → [Analytics]

[Carrito] → 'carrito-actualizado' → [Badge]
                                  → [CheckoutButton]
                                  → [Storage]
```

---

## 🎯 TU TURNO:

**CONSIGNA:**
Crear sistema de notificaciones con custom events

**HTML:**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Custom Events</title>
  <style>
    .notificaciones {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 300px;
    }
    .notificacion {
      padding: 15px;
      margin-bottom: 10px;
      border-radius: 5px;
      color: white;
    }
    .notificacion.info { background: blue; }
    .notificacion.success { background: green; }
    .notificacion.error { background: red; }
    .botones {
      margin: 20px;
    }
    .botones button {
      margin: 5px;
      padding: 10px 20px;
    }
  </style>
</head>
<body>
  <div class="botones">
    <button id="btnInfo">Mostrar Info</button>
    <button id="btnSuccess">Mostrar Success</button>
    <button id="btnError">Mostrar Error</button>
  </div>
  
  <div class="notificaciones" id="notificaciones"></div>
  
  <script src="ejercicio14.js"></script>
</body>
</html>
```

**TAREAS:**

```javascript
// ============================================
// EJERCICIO 14: Custom Events
// ============================================

// TAREA 1: Crear sistema de notificaciones
class SistemaNotificaciones {
  constructor(contenedor) {
    this.contenedor = contenedor;
    this.escucharEventos();
  }
  
  escucharEventos() {
    // TU CÓDIGO AQUÍ
    // Escuchar evento 'mostrar-notificacion'
    document.addEventListener('mostrar-notificacion', (e) => {
      this.mostrar(e.detail);
    });
  }
  
  mostrar({ tipo, mensaje, duracion = 3000 }) {
    // TU CÓDIGO AQUÍ
    // Crear div con clase "notificacion" y tipo
    // Agregar mensaje
    // Agregar al contenedor
    // Remover después de "duracion" ms
    // Disparar evento 'notificacion-cerrada' al remover
  }
}

const sistema = new SistemaNotificaciones(
  document.getElementById('notificaciones')
);

// TAREA 2: Funciones helper para disparar notificaciones
function mostrarInfo(mensaje) {
  // TU CÓDIGO AQUÍ
  // Disparar CustomEvent 'mostrar-notificacion'
  // con detail: { tipo: 'info', mensaje }
}

function mostrarSuccess(mensaje) {
  // TU CÓDIGO AQUÍ
  // Similar pero tipo: 'success'
}

function mostrarError(mensaje) {
  // TU CÓDIGO AQUÍ
  // Similar pero tipo: 'error'
}

// TAREA 3: Conectar botones
document.getElementById('btnInfo').addEventListener('click', () => {
  mostrarInfo('Esta es una notificación de información');
});

document.getElementById('btnSuccess').addEventListener('click', () => {
  mostrarSuccess('Operación exitosa!');
});

document.getElementById('btnError').addEventListener('click', () => {
  mostrarError('Ocurrió un error!');
});

// TAREA 4: Contador de notificaciones
let contadorNotificaciones = 0;

document.addEventListener('mostrar-notificacion', () => {
  // TU CÓDIGO AQUÍ
  // Incrementar contador
  // Mostrar en consola: "Notificaciones mostradas: X"
});

document.addEventListener('notificacion-cerrada', () => {
  // TU CÓDIGO AQUÍ
  // Mostrar en consola: "Notificación cerrada"
});
```

**RESULTADO ESPERADO:**

```
Al hacer click en "Mostrar Info":
- Aparece notificación azul en esquina superior derecha
- Texto: "Esta es una notificación de información"
- Desaparece automáticamente después de 3 segundos
- Consola: "Notificaciones mostradas: 1"
- Después de 3s: "Notificación cerrada"

Al hacer click múltiples veces:
- Se apilan las notificaciones
- Cada una desaparece a los 3 segundos
- Contador incrementa
```

---

## 💡 HINTS:

**Hint Tarea 1:**
```javascript
class SistemaNotificaciones {
  constructor(contenedor) {
    this.contenedor = contenedor;
    this.escucharEventos();
  }
  
  escucharEventos() {
    document.addEventListener('mostrar-notificacion', (e) => {
      this.mostrar(e.detail);
    });
  }
  
  mostrar({ tipo, mensaje, duracion = 3000 }) {
    const notif = document.createElement('div');
    notif.classList.add('notificacion', tipo);
    notif.textContent = mensaje;
    
    this.contenedor.append(notif);
    
    setTimeout(() => {
      notif.remove();
      
      // Disparar evento de cierre
      const evento = new CustomEvent('notificacion-cerrada');
      document.dispatchEvent(evento);
    }, duracion);
  }
}
```

**Hint Tarea 2:**
```javascript
function mostrarInfo(mensaje) {
  const evento = new CustomEvent('mostrar-notificacion', {
    detail: { tipo: 'info', mensaje }
  });
  document.dispatchEvent(evento);
}

function mostrarSuccess(mensaje) {
  const evento = new CustomEvent('mostrar-notificacion', {
    detail: { tipo: 'success', mensaje }
  });
  document.dispatchEvent(evento);
}

function mostrarError(mensaje) {
  const evento = new CustomEvent('mostrar-notificacion', {
    detail: { tipo: 'error', mensaje }
  });
  document.dispatchEvent(evento);
}
```

**Hint Tarea 4:**
```javascript
document.addEventListener('mostrar-notificacion', () => {
  contadorNotificaciones++;
  console.log(`Notificaciones mostradas: ${contadorNotificaciones}`);
});

document.addEventListener('notificacion-cerrada', () => {
  console.log('Notificación cerrada');
});
```

---

## ✅ CHECKLIST:

- [ ] CustomEvent creado correctamente
- [ ] dispatchEvent funciona
- [ ] addEventListener escucha el custom event
- [ ] detail con data funciona
- [ ] Sistema de notificaciones funciona

---

## 🎓 RESUMEN DEL BLOQUE 2

**Conceptos dominados:**
- ✅ querySelector avanzado (selectores complejos, closest)
- ✅ createElement + append (crear elementos dinámicamente)
- ✅ Event delegation (un listener, múltiples elementos)
- ✅ Event propagation (bubbling, capturing, stopPropagation)
- ✅ classList API (add, remove, toggle, contains)
- ✅ dataset + data attributes (almacenar data en elementos)
- ✅ IntersectionObserver (lazy loading, animaciones)
- ✅ Custom events (comunicación entre componentes)

**Nivel alcanzado:** DOM Manipulation AUTOMÁTICA ⭐⭐⭐⭐⭐

**Tiempo invertido:** ~3-4 horas

**Siguiente paso:** Proyecto 2 - Component Library

---

## 📊 PROGRESO SEMANA 2

**Bloque 1 - ES6+ Syntax:** ✅ COMPLETO (6/6 ejercicios)  
**Bloque 2 - DOM Manipulation:** ✅ COMPLETO (8/8 ejercicios)

**Total Semana 2 Warmup:** ✅ 14/14 ejercicios completados

---

**Cuando completes los 14 ejercicios, avisame y pasamos al Proyecto 2 (Component Library - Mini-Framework).** 🚀
