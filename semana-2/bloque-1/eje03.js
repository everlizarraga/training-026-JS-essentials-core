/**
**CONSIGNA:**
Identificar cuándo usar arrow vs regular functions

**TAREAS:**
1. Crear objeto con método que usa setTimeout (arrow en callback)
2. Crear event listener que cambia el elemento clickeado (regular)
3. Transformar array con arrow function compacta
4. Identificar errores de uso de arrow functions

**RESULTADO ESPERADO:**
Tarea 1:
(Después de 1 segundo): "Contador: 1"

Tarea 2:
(Al hacer click, el botón cambia de color)

Tarea 3:
['Laptop', 'Mouse', 'Teclado']
[1200, 25, 75]
1300

Tarea 4:
Problema: Arrow function no tiene su propio 'this'
Muestra: "Hola, soy undefined"
Solución: Usar regular function
 */


// ============================================
// EJERCICIO 3: Arrow Functions
// ============================================

// TAREA 1: Contador con setTimeout
const contador = {
  valor: 0,

  incrementar() {
    // TU CÓDIGO AQUÍ
    // Usar setTimeout con arrow function
    // Incrementar this.valor después de 1 segundo
    setTimeout(() => {
      console.log(`Tarea-1 Before: Contador-${this.valor}`);
      this.valor += 1;
      console.log(`Tarea-1 After: Contador-${this.valor}`);
    }, 1000);
  }
};

contador.incrementar();
// Después de 1 segundo debe mostrar: "Contador: 1"

// TAREA 2: Event listener correcto
// HTML: <button id="miBoton">Click</button>

function configurarBoton() {
  const btn = document.getElementById('miBoton');

  // TU CÓDIGO AQUÍ
  // Agregar event listener que cambie el color del botón al hacer click
  // Debe usar 'this' para acceder al elemento
  if(btn) {
    btn.addEventListener('click', function(event) {
      this.style.backgroundColor = 'red';
    });
  }
}

// TAREA 3: Transformaciones con arrow compacta
const productos = [
  { nombre: 'Laptop', precio: 1200 },
  { nombre: 'Mouse', precio: 25 },
  { nombre: 'Teclado', precio: 75 }
];

// Extraer solo nombres (arrow compacta)
const nombres = /* TU CÓDIGO AQUÍ */
  productos.map(p => p.nombre);

// Extraer solo precios (arrow compacta)
const precios = /* TU CÓDIGO AQUÍ */
  productos.map(p => p.precio);

// Calcular total (arrow compacta)
const total = /* TU CÓDIGO AQUÍ */
  precios.reduce((accum, p) => accum+p, 0);

console.log(nombres);  // ['Laptop', 'Mouse', 'Teclado']
console.log(precios);  // [1200, 25, 75]
console.log(total);    // 1300

// TAREA 4: Identificar el problema
const usuario = {
  nombre: 'Ana',
  edad: 25,

  // ¿Qué está mal aquí?
  saludar: () => {
    console.log(`Hola, soy ${this.nombre}`);
  }
};

usuario.saludar();  // ¿Qué muestra? ¿Por qué?

// Corregir:
const usuarioCorregido = {
  nombre: 'Ana',
  edad: 25,

  // TU CÓDIGO AQUÍ (versión correcta)
  saludar() {
    console.log(`Hola, soy ${this.nombre}`);
  }
};

usuarioCorregido.saludar();
