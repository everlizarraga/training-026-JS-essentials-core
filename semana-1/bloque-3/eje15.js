/**
**CONSIGNA:**
Convertir funciones impuras en puras

**TAREAS:**
1. Convertir función impura de sumar a array
2. Convertir función impura de actualizar usuario
3. Convertir función impura de filtrar productos
4. Identificar cuáles son pure y cuáles impure

**RESULTADO ESPERADO:**
Tarea 1 - Original: [1, 2, 3]
Tarea 1 - Nuevo: [1, 2, 3, 4]
Tarea 2 - Original: { nombre: 'Ana', edad: 25 }
Tarea 2 - Actualizado: { nombre: 'Ana', edad: 26 }
Tarea 3: [{ nombre: 'Laptop', precio: 1000, stock: 5 }, { nombre: 'Teclado', precio: 75, stock: 15 }]

Función 1 es: pure (solo usa parámetros, determinística)
Función 2 es: impure (modifica variable externa 'contador')
Función 3 es: pure (map crea nuevo array, no modifica original)
Función 4 es: impure (sort modifica array original)
Función 5 es: impure (Date.now() no es determinístico)
Función 6 es: impure (console.log es side effect)
 */

// ============================================
// EJERCICIO 15: Pure Functions
// ============================================

// TAREA 1: Convertir a pure function

// IMPURE (modifica array original)
const numeros = [1, 2, 3, 4, 5];

function agregarNumeroImpure(arr, num) {
  arr.push(num);  // ✗ Modifica el original
  return arr;
}

// PURE (crea nuevo array)
function agregarNumeroPure(arr, num) {
  // TU CÓDIGO AQUÍ
  // Retornar NUEVO array con num agregado
  // Pista: usar spread operator
  return [...arr, num];
}

const original1 = [1, 2, 3];
const nuevo1 = agregarNumeroPure(original1, 4);
console.log('Tarea 1 - Original:', original1);  // Debe ser [1, 2, 3]
console.log('Tarea 1 - Nuevo:', nuevo1);        // Debe ser [1, 2, 3, 4]

// ============================================

// TAREA 2: Convertir a pure function

// IMPURE (modifica objeto original)
function actualizarEdadImpure(usuario) {
  usuario.edad++;  // ✗ Modifica el original
  return usuario;
}

// PURE (crea nuevo objeto)
function actualizarEdadPure(usuario) {
  // TU CÓDIGO AQUÍ
  // Retornar NUEVO objeto con edad incrementada
  // Pista: usar spread operator
  return {...usuario, edad: usuario.edad +1};
}

const usuario = { nombre: 'Ana', edad: 25 };
const usuarioActualizado = actualizarEdadPure(usuario);
console.log('Tarea 2 - Original:', usuario);           // Debe ser { nombre: 'Ana', edad: 25 }
console.log('Tarea 2 - Actualizado:', usuarioActualizado);  // Debe ser { nombre: 'Ana', edad: 26 }

// ============================================

// TAREA 3: Convertir a pure function

const productos = [
  { nombre: 'Laptop', precio: 1000, stock: 5 },
  { nombre: 'Mouse', precio: 25, stock: 0 },
  { nombre: 'Teclado', precio: 75, stock: 15 }
];

// IMPURE (depende de variable externa)
let precioMinimo = 50;

function filtrarCarosImpure(arr) {
  return arr.filter(p => p.precio > precioMinimo);  // ✗ Depende de variable externa
}

// PURE (recibe todo como parámetros)
function filtrarCarosPure(arr, minimo) {
  // TU CÓDIGO AQUÍ
  // Filtrar productos con precio > minimo
  // Solo usar parámetros, no variables externas
  return arr.filter(e => e.precio > minimo);
}

console.log('Tarea 3:', filtrarCarosPure(productos, 50));

// ============================================

// TAREA 4: Identificar pure vs impure

function funcion1(a, b) {
  return a + b;
}

let contador = 0;
function funcion2(n) {
  contador += n;
  return contador;
}

function funcion3(arr) {
  return arr.map(x => x * 2);
}

function funcion4(arr) {
  arr.sort();
  return arr;
}

function funcion5(user) {
  return { ...user, timestamp: Date.now() };
}

function funcion6(a, b) {
  console.log(`Sumando ${a} + ${b}`);
  return a + b;
}

// TU RESPUESTA:
console.log('Función 1 es:', /* 'pure' o 'impure' */'pure');
console.log('Función 2 es:', /* 'pure' o 'impure' */'impure');
console.log('Función 3 es:', /* 'pure' o 'impure' */'pure');
console.log('Función 4 es:', /* 'pure' o 'impure' */'impure');
console.log('Función 5 es:', /* 'pure' o 'impure' */'impure');
console.log('Función 6 es:', /* 'pure' o 'impure' */'impure');

