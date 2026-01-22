/**
**CONSIGNA:**
Usar destructuring en parámetros de funciones

**TAREAS:**
1. Función que calcula precio final (destructuring + defaults)
2. Función que renderiza card de usuario (destructuring anidado)
3. Función que procesa config de app (rest operator)
4. Refactorizar función que no usa destructuring
 */

// ============================================
// EJERCICIO 4: Destructuring en Funciones
// ============================================

// TAREA 1: Calcular precio final
function calcularPrecioFinal({ precio, descuento = 0, impuesto = 0.21 }) {
  // TU CÓDIGO AQUÍ
  return precio - descuento + (precio * impuesto);
}

console.log(calcularPrecioFinal({ precio: 100 }));
// 121

console.log(calcularPrecioFinal({ precio: 100, descuento: 10 }));
// 111

console.log(calcularPrecioFinal({ precio: 100, descuento: 10, impuesto: 0.15 }));
// 105

// TAREA 2: Renderizar card de usuario
function renderizarUsuario({ nombre, edad, direccion: { ciudad, pais } }) {
  // TU CÓDIGO AQUÍ
  // Retornar string HTML con la info
  return `<div>${nombre}, ${edad} años<br>${ciudad}, ${pais}</div>`;
}

const usuarioDatos = {
  nombre: 'Ana',
  edad: 25,
  direccion: {
    calle: 'Av. Corrientes 1234',
    ciudad: 'Buenos Aires',
    pais: 'Argentina'
  }
};

console.log(renderizarUsuario(usuarioDatos));
// "<div>Ana, 25 años<br>Buenos Aires, Argentina</div>"

// TAREA 3: Procesar configuración
function aplicarConfiguracion({ tema, idioma, ...otrasOpciones }) {
  // TU CÓDIGO AQUÍ
  // Mostrar tema e idioma separados del resto
  console.log('Tema:', tema);
  console.log('Idioma:', idioma);
  console.log('Otras opciones:', otrasOpciones);
}

aplicarConfiguracion({
  tema: 'oscuro',
  idioma: 'es',
  notificaciones: true,
  sonido: false,
  animaciones: true
});

// Tema: oscuro
// Idioma: es
// Otras opciones: { notificaciones: true, sonido: false, animaciones: true }

// TAREA 4: Refactorizar a destructuring
// Esta función NO usa destructuring:
// function crearProductoViejo(datos) {
//   const nombre = datos.nombre;
//   const precio = datos.precio;
//   const stock = datos.stock;
//   const categoria = datos.categoria;
function crearProductoViejo({
  nombre,
  precio,
  stock,
  categoria,
} = {}) {

  return {
    nombre,
    precio,
    stock,
    categoria,
    disponible: stock > 0
  };
}

// Reescribir con destructuring:
function crearProductoNuevo(/* TU CÓDIGO AQUÍ */) {
  // TU CÓDIGO AQUÍ
}

const producto = { nombre: 'Laptop', precio: 1200, stock: 5, categoria: 'Electrónica' };

console.log(crearProductoNuevo(producto));
// { nombre: 'Laptop', precio: 1200, stock: 5, categoria: 'Electrónica', disponible: true }


