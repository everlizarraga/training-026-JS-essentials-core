/**
**CONSIGNA:**
Transformar información de productos

**Datos:**
```javascript
const productos = [
    { id: 1, nombre: 'Laptop', precio: 1000, stock: 5 },
    { id: 2, nombre: 'Mouse', precio: 25, stock: 20 },
    { id: 3, nombre: 'Teclado', precio: 75, stock: 15 },
    { id: 4, nombre: 'Monitor', precio: 300, stock: 8 }
];
```

**TAREAS:**
1. Extraer solo los nombres de productos (array de strings)
2. Crear array de objetos simplificados: `{ nombre, total }` donde `total = precio * stock`

**RESULTADO ESPERADO:**
```
Nombres: ['Laptop', 'Mouse', 'Teclado', 'Monitor']

Con total: [
  { nombre: 'Laptop', total: 5000 },
  { nombre: 'Mouse', total: 500 },
  { nombre: 'Teclado', total: 1125 },
  { nombre: 'Monitor', total: 2400 }
]
 */

// ============================================
// EJERCICIO 2: Transformar productos
// ============================================

const productos = [
  { id: 1, nombre: 'Laptop', precio: 1000, stock: 5 },
  { id: 2, nombre: 'Mouse', precio: 25, stock: 20 },
  { id: 3, nombre: 'Teclado', precio: 75, stock: 15 },
  { id: 4, nombre: 'Monitor', precio: 300, stock: 8 }
];

// TAREA 1: Extraer solo nombres
const nombresProductos = productos.map(function (producto) {
  // TU CÓDIGO AQUÍ
  // Retornar solo la propiedad 'nombre'
  return producto.nombre;
});

console.log('Nombres:', nombresProductos);

// TAREA 2: Crear objetos { nombre, total }
const productosConTotal = productos.map(function (producto) {
  // TU CÓDIGO AQUÍ
  // Retornar nuevo objeto con:
  // - nombre: producto.nombre
  // - total: producto.precio * producto.stock
  return {
    nombre: producto.nombre,
    total: producto.precio * producto.stock
  };
});

console.log('Con total:', productosConTotal);