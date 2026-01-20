/**
**CONSIGNA:**
Clonar, merge y actualizar objetos con spread

**TAREAS:**
1. Clonar `producto` (crear copia independiente)
2. Merge de `producto` + `detalles`
3. Actualizar `producto` con `actualizacion` (override precio, agregar stock)
4. Crear nuevo objeto con todas las propiedades + descuento: 10

**RESULTADO ESPERADO:**
Tarea 1: { id: 1, nombre: 'Laptop', precio: 1000 }
Tarea 2: { id: 1, nombre: 'Laptop', precio: 1000, marca: 'Dell', modelo: 'XPS 13' }
Tarea 3: { id: 1, nombre: 'Laptop', precio: 900, stock: 5 }
Tarea 4: { id: 1, nombre: 'Laptop', precio: 900, marca: 'Dell', modelo: 'XPS 13', stock: 5, descuento: 10 }
 */

// ============================================
// EJERCICIO 11: Spread operator
// ============================================

const producto = {
  id: 1,
  nombre: 'Laptop',
  precio: 1000
};

const detalles = {
  marca: 'Dell',
  modelo: 'XPS 13'
};

const actualizacion = {
  precio: 900,
  stock: 5
};

// TAREA 1: Clonar producto
const productoClonado = {...producto};

console.log('Tarea 1:', productoClonado);

// TAREA 2: Merge producto + detalles
const productoConDetalles = {
  // TU CÓDIGO AQUÍ
  ...producto,
  ...detalles
};

console.log('Tarea 2:', productoConDetalles);

// TAREA 3: Actualizar con override
const productoActualizado = {
  // TU CÓDIGO AQUÍ
  ...producto,
  ...actualizacion
};

console.log('Tarea 3:', productoActualizado);

// TAREA 4: Todo + descuento
const productoCompleto = {
  // TU CÓDIGO AQUÍ
  ...producto,
  ...detalles,
  ...actualizacion,
  descuento: 10
};

console.log('Tarea 4:', productoCompleto);

