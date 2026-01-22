/**
**CONSIGNA:**
Crear funciones con parámetros opcionales usando defaults

**TAREAS:**
1. Función que crea productos con valores por defecto
2. Función que calcula descuento (default 10%)
3. Función de configuración con objeto de opciones
4. Función que genera URLs con parámetros opcionales

**RESULTADO ESPERADO:**
Tarea 1:
{ nombre: 'Laptop', precio: 1200, stock: 0, disponible: true }
{ nombre: 'Mouse', precio: 25, stock: 50, disponible: false }

Tarea 2:
90
80

Tarea 3:
{ animaciones: true, sonido: false, tema: 'claro', idioma: 'es' }
{ animaciones: true, sonido: true, tema: 'oscuro', idioma: 'es' }

Tarea 4:
"https://api.com/users"
"https://api.com/users?page=1&limit=10"
 */

// ============================================
// EJERCICIO 2: Default Parameters
// ============================================

// TAREA 1: Crear producto con defaults
function crearProducto(nombre, precio, stock = 0, disponible = true) {
  // TU CÓDIGO AQUÍ
  // Retornar objeto con todas las propiedades
  return {nombre, precio, stock, disponible}
}

console.log(crearProducto('Laptop', 1200));
// { nombre: 'Laptop', precio: 1200, stock: 0, disponible: true }

console.log(crearProducto('Mouse', 25, 50, false));
// { nombre: 'Mouse', precio: 25, stock: 50, disponible: false }

// TAREA 2: Calcular precio con descuento
function aplicarDescuento(precio, porcentaje = 10) {
  // TU CÓDIGO AQUÍ
  // Retornar precio con descuento aplicado
  return precio * (100-porcentaje)/100;
}

console.log(aplicarDescuento(100));      // 90 (10% de descuento)
console.log(aplicarDescuento(100, 20));  // 80 (20% de descuento)

// TAREA 3: Configurar opciones de app
function configurarOpciones({
  animaciones = true,
  sonido = false,
  tema = 'claro',
  idioma = 'es'
} = {}) {
  // TU CÓDIGO AQUÍ
  // Retornar objeto de configuración
  return {animaciones, sonido, tema, idioma}
}

console.log(configurarOpciones());
// { animaciones: true, sonido: false, tema: 'claro', idioma: 'es' }

console.log(configurarOpciones({ tema: 'oscuro', sonido: true }));
// { animaciones: true, sonido: true, tema: 'oscuro', idioma: 'es' }

// TAREA 4: Generar URL con query params
function generarURL(base, endpoint, params = {}) {
  // TU CÓDIGO AQUÍ
  // Generar URL con query string
  // Ejemplo: 'https://api.com' + '/users' + '?page=1&limit=10'
  return `${base}${endpoint}${
    (Object.keys(params).length === 0) ?
      '' :
      '?' + Object.entries(params).map(([key, value]) => {
        return ''+key+'='+value
      }).join('&')
  }`;
}

console.log(generarURL('https://api.com', '/users'));
// "https://api.com/users"

console.log(generarURL('https://api.com', '/users', { page: 1, limit: 10 }));
// "https://api.com/users?page=1&limit=10"


