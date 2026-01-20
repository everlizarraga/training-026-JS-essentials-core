/**
**CONSIGNA:**
Extraer información de objetos usando destructuring

**TAREAS:**
1. Extraer `nombre`, `precio`, `stock` de producto
2. Extraer `tema` y `idioma` de config
3. Extraer `nombre` (renombrado a `nombreProducto`) y `categoria` de producto
4. Extraer `tema` con valor por defecto 'claro' si no existe (probar con objeto vacío)

**RESULTADO ESPERADO:**
Tarea 1: Laptop 1000 5
Tarea 2: oscuro es
Tarea 3: Laptop electrónica
Tarea 4: claro
```
 */

// ============================================
// EJERCICIO 9: Destructuring simple
// ============================================

const producto = {
  id: 1,
  nombre: 'Laptop',
  precio: 1000,
  stock: 5,
  categoria: 'electrónica',
  marca: 'Dell',
  peso: 2.5
};

const config = {
  tema: 'oscuro',
  idioma: 'es',
  notificaciones: true
};

// TAREA 1: Extraer nombre, precio, stock
const { nombre, precio, stock } = producto;

console.log('Tarea 1:', nombre, precio, stock);

// TAREA 2: Extraer tema e idioma
const { tema, idioma } = config;

console.log('Tarea 2:', tema, idioma);

// TAREA 3: Renombrar nombre a nombreProducto
const { nombre: nombreProducto, categoria } = producto;

console.log('Tarea 3:', nombreProducto, categoria);

// TAREA 4: Default value
const configVacio = {};
const { tema: temaDefault = 'claro' } = configVacio;

console.log('Tarea 4:', temaDefault);

