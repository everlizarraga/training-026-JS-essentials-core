/**
**CONSIGNA:**

Tenés un array de precios en dólares. Necesitás convertirlos a pesos argentinos.

**Datos:**
- Array de precios: `[10, 25, 50, 100, 200]`
- Tipo de cambio: 1 USD = 1350 ARS (aproximado)

**Tareas:**
1. Usá `map()` para convertir cada precio de USD a ARS
2. Guardá el resultado en una variable llamada `preciosEnPesos`
3. Mostrá ambos arrays en consola para comparar
 */

// ============================================
// EJERCICIO 1: Convertir precios USD a ARS
// ============================================

// 1. Array de precios en dólares
const preciosEnDolares = [10, 25, 50, 100, 200];

// 2. Tipo de cambio
const tipoDeCambio = 1350;  // 1 USD = 350 ARS

// 3. Transformar precios a pesos argentinos
const preciosEnPesos = preciosEnDolares.map(function (precioUSD) {
  // TU CÓDIGO AQUÍ
  // Multiplicar precioUSD por tipoDeCambio
  // Retornar el resultado
  return precioUSD * tipoDeCambio;
});

// 4. Mostrar resultados
console.log('Precios en USD:', preciosEnDolares);
console.log('Precios en ARS:', preciosEnPesos);

