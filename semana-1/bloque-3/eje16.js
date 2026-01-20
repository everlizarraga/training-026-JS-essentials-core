/**
**CONSIGNA:**
Implementar operaciones inmutables

**TAREAS:**
1. Agregar elemento a array sin mutarlo
2. Remover elemento de array sin mutarlo
3. Actualizar elemento en array de objetos
4. Actualizar propiedad anidada en objeto

**RESULTADO ESPERADO:**
Tarea 1 - Original: ['manzana', 'banana', 'naranja']
Tarea 1 - Nuevo: ['manzana', 'banana', 'naranja', 'uva']
Tarea 2 - Original: [10, 20, 30, 40, 50]
Tarea 2 - Sin 30: [10, 20, 40, 50]
Tarea 3 - Original: { id: 2, nombre: 'Mouse', precio: 25 }
Tarea 3 - Actualizado: { id: 2, nombre: 'Mouse', precio: 30 }
Tarea 4 - Original: Buenos Aires
Tarea 4 - Actualizado: Córdoba

Frutas original intacto? true
Números original intacto? true
Productos original intacto? true
Usuario original intacto? true
 */


// ============================================
// EJERCICIO 16: Immutability
// ============================================

// TAREA 1: Agregar elemento sin mutar

const frutas = ['manzana', 'banana', 'naranja'];

// MAL (muta el original)
// frutas.push('uva');

// BIEN (crea nuevo array)
const frutasConUva = /* TU CÓDIGO AQUÍ */ [...frutas, 'uva'];

console.log('Tarea 1 - Original:', frutas);      // ['manzana', 'banana', 'naranja']
console.log('Tarea 1 - Nuevo:', frutasConUva);   // ['manzana', 'banana', 'naranja', 'uva']

// ============================================

// TAREA 2: Remover elemento sin mutar

const numeros = [10, 20, 30, 40, 50];
const indexToRemove = 2;  // Remover 30

// MAL (muta el original)
// numeros.splice(indexToRemove, 1);

// BIEN (crea nuevo array)
const numerosSin30 = /* TU CÓDIGO AQUÍ */
  numeros.filter((_, i) => i !== 2);
// Pista: usar filter con índice

console.log('Tarea 2 - Original:', numeros);       // [10, 20, 30, 40, 50]
console.log('Tarea 2 - Sin 30:', numerosSin30);    // [10, 20, 40, 50]

// ============================================

// TAREA 3: Actualizar elemento en array de objetos

const productos = [
  { id: 1, nombre: 'Laptop', precio: 1000 },
  { id: 2, nombre: 'Mouse', precio: 25 },
  { id: 3, nombre: 'Teclado', precio: 75 }
];

// Actualizar precio del producto id: 2 a 30

const productosActualizados = /* TU CÓDIGO AQUÍ */
  productos.map(e => (e.id === 2) ? {...e, precio: 30} : e);
// Pista: usar map, verificar id, spread operator

console.log('Tarea 3 - Original:', productos[1]);           // { id: 2, nombre: 'Mouse', precio: 25 }
console.log('Tarea 3 - Actualizado:', productosActualizados[1]);  // { id: 2, nombre: 'Mouse', precio: 30 }

// ============================================

// TAREA 4: Actualizar propiedad anidada

const usuario = {
  nombre: 'Ana',
  edad: 25,
  direccion: {
    calle: 'Av. Corrientes',
    ciudad: 'Buenos Aires',
    pais: 'Argentina'
  },
  contacto: {
    email: 'ana@email.com',
    telefono: '123456789'
  }
};

// Actualizar ciudad a 'Córdoba'

const usuarioConNuevaCiudad = /* TU CÓDIGO AQUÍ */
  {
    ...usuario,
    direccion: {...usuario.direccion, ciudad: 'Cordoba'}
  };
// Pista: spread del objeto padre, spread del objeto anidado

console.log('Tarea 4 - Original:', usuario.direccion.ciudad);              // 'Buenos Aires'
console.log('Tarea 4 - Actualizado:', usuarioConNuevaCiudad.direccion.ciudad);  // 'Córdoba'

// ============================================

// TAREA 5: Verificar inmutabilidad

// Si hiciste todo bien, estas comparaciones deben ser true:
console.log('Frutas original intacto?', frutas.length === 3);
console.log('Números original intacto?', numeros.includes(30));
console.log('Productos original intacto?', productos[1].precio === 25);
console.log('Usuario original intacto?', usuario.direccion.ciudad === 'Buenos Aires');

