/**
**CONSIGNA:**
Buscar y verificar en array de productos

**TAREAS:**
1. Encontrar el producto con id === 3
2. Encontrar el índice del producto sin stock
3. Verificar si hay algún producto con descuento
4. Verificar si todos los productos tienen stock
 */

// ============================================
// EJERCICIO 8: find/findIndex/some/every
// ============================================

const productos = [
  { id: 1, nombre: 'Laptop', precio: 1000, stock: 5, descuento: true },
  { id: 2, nombre: 'Mouse', precio: 25, stock: 0, descuento: false },
  { id: 3, nombre: 'Teclado', precio: 75, stock: 15, descuento: true },
  { id: 4, nombre: 'Monitor', precio: 300, stock: 8, descuento: false },
  { id: 5, nombre: 'Webcam', precio: 50, stock: 3, descuento: true }
];

// TAREA 1: Encontrar producto con id === 3
const productoId3 = productos.find(function (producto) {
  // TU CÓDIGO AQUÍ
  return producto.id === 3;
});

console.log('Producto id 3:', productoId3);

// TAREA 2: Índice del producto sin stock
const indexSinStock = productos.findIndex(function (producto) {
  // TU CÓDIGO AQUÍ
  return producto.stock === 0;
});

console.log('Índice sin stock:', indexSinStock);

// TAREA 3: ¿Hay algún producto con descuento?
const hayDescuento = productos.some(function (producto) {
  // TU CÓDIGO AQUÍ
  return producto.descuento;
});

console.log('¿Hay descuento?:', hayDescuento);

// TAREA 4: ¿Todos tienen stock?
const todosTienenStock = productos.every(function (producto) {
  // TU CÓDIGO AQUÍ
  return producto > 0;
});

console.log('¿Todos con stock?:', todosTienenStock);

