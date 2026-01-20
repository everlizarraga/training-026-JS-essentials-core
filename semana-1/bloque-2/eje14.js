/**
**CONSIGNA:**
Usar shorthand y computed properties

**TAREAS:**
1. Crear usuario con shorthand (variables nombre, edad, email)
2. Función que crea objeto con key dinámica
3. Transformar array de productos a objeto indexado por ID
4. Crear objeto con keys computadas (template literals)

**RESULTADO ESPERADO:**
Tarea 1: { nombre: 'Carlos', edad: 30, email: 'carlos@email.com' }
Tarea 2: { tema: 'oscuro' }
Tarea 2: { idioma: 'es' }
Tarea 3: {
  101: { id: 101, nombre: 'Laptop', precio: 1000 },
  102: { id: 102, nombre: 'Mouse', precio: 25 },
  103: { id: 103, nombre: 'Teclado', precio: 75 }
}
Tarea 4: { categoria_electrónica: ..., periodo_2024_enero: ... }
 */

// ============================================
// EJERCICIO 14: Computed properties
// ============================================

// TAREA 1: Shorthand
const nombre = 'Carlos';
const edad = 30;
const email = 'carlos@email.com';

const usuario = {
  // TU CÓDIGO AQUÍ (usar shorthand)
  nombre,
  edad,
  email
};

console.log('Tarea 1:', usuario);

// TAREA 2: Función con computed property
function crearConfiguracion(clave, valor) {
  return {
    // TU CÓDIGO AQUÍ
    // Retornar objeto con [clave]: valor
    [clave]: valor
  };
}

console.log('Tarea 2:', crearConfiguracion('tema', 'oscuro'));
console.log('Tarea 2:', crearConfiguracion('idioma', 'es'));

// TAREA 3: Array a objeto indexado por ID
const productos = [
  { id: 101, nombre: 'Laptop', precio: 1000 },
  { id: 102, nombre: 'Mouse', precio: 25 },
  { id: 103, nombre: 'Teclado', precio: 75 }
];

const productosPorId = productos.reduce((acc, producto) => {
  return {
    ...acc,
    // TU CÓDIGO AQUÍ
    // [producto.id]: producto
    [producto.id]: producto
  };
}, {});

console.log('Tarea 3:', productosPorId);

// TAREA 4: Computed con template literals
const categoria = 'electrónica';
const año = 2024;
const mes = 'enero';

const reporte = {
  // TU CÓDIGO AQUÍ
  // Crear keys: 'categoria_electrónica', 'periodo_2024_enero'
  // Valores pueden ser cualquier cosa
  [`categoria_${categoria}`]: categoria,
  [`periodo_${año}_${mes}`]: `${mes}-${año}`
};

console.log('Tarea 4:', reporte);

