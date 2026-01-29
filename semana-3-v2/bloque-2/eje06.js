/**
**CONSIGNA:**
Las siguientes funcionalidades SON MEJORES con **funciones puras** (NO clases).

**¿Por qué NO usar clase aquí?**
- No hay estado que mantener
- Son transformaciones puras (input → output)
- No necesitás múltiples instancias
- Más simple y directo con funciones
 */

// ============================================
// UTILIDADES DE FORMATO (usar funciones)
// ============================================

/**
 * Formatear precio a moneda
 * TODO: Implementar
 * @param {number} amount
 */
function formatCurrency(amount) {
  // TU CÓDIGO: Retornar $amount con 2 decimales
  // Ejemplo: 1000 → "$1000.00"
  return `$${amount.toFixed(2)}`;
}

/**
 * Formatear fecha a string legible
 * TODO: Implementar
 * @param {Date} date
 */
function formatDate(date) {
  // TU CÓDIGO: Retornar fecha en formato DD/MM/YYYY
  // Hint: usar date.getDate(), date.getMonth() + 1, date.getFullYear()
  return `${date.getDate()}/${date.getMonth() +1}/${date.getFullYear()}`;
}

/**
 * Capitalizar primera letra
 * TODO: Implementar
 */
function capitalize(str) {
  // TU CÓDIGO: "hola" → "Hola"
  // Hint: str[0].toUpperCase() + str.slice(1).toLowerCase()
  return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
}

/**
 * Truncar texto a N caracteres
 * TODO: Implementar
 * @param {string} str 
 * @param {number} maxLength 
 */
function truncate(str, maxLength) {
  // TU CÓDIGO: Si str.length > maxLength → str.slice(0, maxLength) + '...'
  return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
}

// TESTING:
console.log(formatCurrency(1234.5));  // "$1234.50"
console.log(formatDate(new Date()));  // "28/01/2026"
console.log(capitalize('hola mundo'));  // "Hola mundo"
console.log(truncate('Texto largo', 5));  // "Texto..."

