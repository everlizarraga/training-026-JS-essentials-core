/**
**CONSIGNA:**
Filtrar productos según múltiples criterios

**TAREAS:**
1. Productos con stock disponible (stock > 0)
2. Productos baratos con stock (precio < 100 Y stock > 0)
3. Productos caros O sin stock (precio > 200 O stock === 0)

**RESULTADO ESPERADO:**
Con stock: [
  { nombre: 'Laptop', ... },
  { nombre: 'Teclado', ... },
  { nombre: 'Monitor', ... },
  { nombre: 'Silla', ... }
]

Baratos con stock: [
  { nombre: 'Teclado', precio: 75, stock: 15, ... }
]

Caros o sin stock: [
  { nombre: 'Laptop', ... },
  { nombre: 'Mouse', ... },
  { nombre: 'Monitor', ... },
  { nombre: 'Escritorio', ... }
]
 */

// ============================================
// EJERCICIO 4: Filtrar productos
// ============================================

const productos = [
  { nombre: 'Laptop', precio: 1000, stock: 5, categoria: 'electrónica' },
  { nombre: 'Mouse', precio: 25, stock: 0, categoria: 'electrónica' },
  { nombre: 'Teclado', precio: 75, stock: 15, categoria: 'electrónica' },
  { nombre: 'Monitor', precio: 300, stock: 8, categoria: 'electrónica' },
  { nombre: 'Silla', precio: 150, stock: 3, categoria: 'muebles' },
  { nombre: 'Escritorio', precio: 400, stock: 0, categoria: 'muebles' }
];

// TAREA 1: Con stock
const conStock = productos.filter(function (producto) {
  // TU CÓDIGO AQUÍ
  return producto.stock > 0;
});

console.log('Con stock:', conStock);

// TAREA 2: Baratos con stock (AND)
const baratosConStock = productos.filter(function (producto) {
  // TU CÓDIGO AQUÍ
  // precio < 100 Y stock > 0
  return producto.precio < 100 && producto.stock > 0;
});

console.log('Baratos con stock:', baratosConStock);

// TAREA 3: Caros o sin stock (OR)
const carosOSinStock = productos.filter(function (producto) {
  // TU CÓDIGO AQUÍ
  // precio > 200 O stock === 0
  return producto.precio > 200 || producto.stock === 0;
});

console.log('Caros o sin stock:', carosOSinStock);


