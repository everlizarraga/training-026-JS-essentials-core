/**
**CONSIGNA:**
Filtrar números según condiciones

**Datos:**
```javascript
const numeros = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
```

**TAREAS:**
1. Filtrar números mayores a 25
2. Filtrar números impares
3. Filtrar números divisibles por 10

**RESULTADO ESPERADO:**
Mayores a 25: [30, 35, 40, 45, 50]
Impares: [5, 15, 25, 35, 45]
Divisibles por 10: [10, 20, 30, 40, 50]
 */


// ============================================
// EJERCICIO 3: Filtrar números
// ============================================

const numeros = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

// TAREA 1: Mayores a 25
const mayoresA25 = numeros.filter(function (numero) {
  // TU CÓDIGO AQUÍ
  // Retornar: numero > 25
  return numero > 25;
});

console.log('Mayores a 25:', mayoresA25);

// TAREA 2: Impares
const impares = numeros.filter(function (numero) {
  // TU CÓDIGO AQUÍ
  // Retornar: numero % 2 !== 0
  return numero %2 !== 0;
});

console.log('Impares:', impares);

// TAREA 3: Divisibles por 10
const divisiblesPor10 = numeros.filter(function (numero) {
  // TU CÓDIGO AQUÍ
  // Retornar: numero % 10 === 0
  return numero %10 === 0;
});

console.log('Divisibles por 10:', divisiblesPor10);

