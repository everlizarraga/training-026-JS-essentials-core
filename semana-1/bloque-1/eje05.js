/**
**CONSIGNA:**
Calcular suma y producto de números

**TAREAS:**
1. Calcular la suma total
2. Calcular el producto total (multiplicar todos)
3. Calcular el promedio (suma / cantidad)

**RESULTADO ESPERADO:**
Suma: 30
Producto: 3840
Promedio: 6
 */

// ============================================
// EJERCICIO 5: reduce() suma/producto
// ============================================

const numeros = [2, 4, 6, 8, 10];

// TAREA 1: Suma total
const suma = numeros.reduce(function (acumulador, numero) {
  // TU CÓDIGO AQUÍ
  // Retornar: acumulador + numero
  return acumulador + numero;
}, 0);  // Valor inicial: 0

console.log('Suma:', suma);

// TAREA 2: Producto total
const producto = numeros.reduce(function (acumulador, numero) {
  // TU CÓDIGO AQUÍ
  // Retornar: acumulador * numero
  return acumulador * numero;
}, 1);  // Valor inicial: 1 (no 0, porque 0 * cualquier cosa = 0)

console.log('Producto:', producto);

// TAREA 3: Promedio
const promedio = numeros.reduce(function (acumulador, numero) {
  return acumulador + numero;
}, 0) / numeros.length;  // Dividir suma por cantidad de elementos

console.log('Promedio:', promedio);


