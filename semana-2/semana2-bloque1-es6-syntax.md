# 🔥 WARMUP SEMANA 2 - BLOQUE 1: ES6+ Syntax

**Duración:** 2-3 horas  
**Ejercicios:** 1-6  
**Objetivo:** Dominar sintaxis moderna de ES6+ hasta que sea AUTOMÁTICA

---

## 📋 ÍNDICE DE EJERCICIOS

1. Template literals - String interpolation, multiline
2. Default parameters - Parámetros opcionales en funciones
3. Arrow functions avanzado - This binding, cuándo NO usar
4. Destructuring en funciones - Parámetros desestructurados
5. Optional chaining + Nullish - Acceso seguro, defaults
6. Modules (import/export) - Separar código en archivos

---

## 🎯 OBJETIVO DEL BLOQUE

Al completar estos ejercicios vas a:
- ✅ Escribir código ES6+ moderno sin pensar
- ✅ Usar template literals automáticamente
- ✅ Entender cuándo usar arrow functions (y cuándo NO)
- ✅ Acceder a propiedades de forma segura
- ✅ Modularizar código en archivos separados

**Esta es la sintaxis que se usa en TODO proyecto moderno.**

---

## ⏱️ GOVERNOR ACTIVO

- Máximo 20-30 min por ejercicio
- Si funciona → NEXT
- No iterar buscando perfección
- Objetivo: MUSCLE MEMORY

---

# EJERCICIO 1: Template Literals

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

## 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Template Literals vs Concatenación
// ============================================

const nombre = 'Ana';
const edad = 25;
const ciudad = 'Buenos Aires';

// ============================================
// FORMA ANTIGUA (concatenación)
// ============================================

const mensaje1 = 'Hola, mi nombre es ' + nombre + 
                 ' y tengo ' + edad + ' años.';
console.log(mensaje1);
// "Hola, mi nombre es Ana y tengo 25 años."

// ============================================
// FORMA MODERNA (template literals)
// ============================================

const mensaje2 = `Hola, mi nombre es ${nombre} y tengo ${edad} años.`;
console.log(mensaje2);
// "Hola, mi nombre es Ana y tengo 25 años."

// ¿Qué cambió?
// - Usamos backticks ` ` en vez de comillas ' '
// - Usamos ${variable} para interpolar
// - NO necesitamos + ni múltiples strings

// ============================================
// VENTAJA 1: Multiline strings
// ============================================

// Forma antigua (horrible)
const html1 = '<div>\n' +
              '  <h1>' + nombre + '</h1>\n' +
              '  <p>' + edad + ' años</p>\n' +
              '</div>';

// Forma moderna (limpia)
const html2 = `
  <div>
    <h1>${nombre}</h1>
    <p>${edad} años</p>
  </div>
`;

console.log(html2);
// Se respetan los saltos de línea y la indentación

// ============================================
// VENTAJA 2: Expresiones dentro de ${}
// ============================================

const precio = 100;
const cantidad = 3;

// Podés hacer operaciones directamente
const total = `Total: $${precio * cantidad}`;
console.log(total);  // "Total: $300"

// Podés llamar funciones
const mensaje3 = `Tu nombre en mayúsculas: ${nombre.toUpperCase()}`;
console.log(mensaje3);  // "Tu nombre en mayúsculas: ANA"

// Podés usar condicionales (ternario)
const mayor = `Sos ${edad >= 18 ? 'mayor' : 'menor'} de edad`;
console.log(mayor);  // "Sos mayor de edad"

// ============================================
// VENTAJA 3: Templates anidados
// ============================================

const usuarios = ['Ana', 'Carlos', 'Lucía'];

const listaHTML = `
  <ul>
    ${usuarios.map(user => `<li>${user}</li>`).join('')}
  </ul>
`;

console.log(listaHTML);
// <ul>
//   <li>Ana</li><li>Carlos</li><li>Lucía</li>
// </ul>

// ============================================
// CASO PRÁCTICO: Crear Cards dinámicamente
// ============================================

const producto = {
  id: 1,
  nombre: 'Laptop',
  precio: 1200,
  rating: 4.5
};

const cardHTML = `
  <div class="card" data-id="${producto.id}">
    <h3>${producto.nombre}</h3>
    <p class="precio">$${producto.precio}</p>
    <p class="rating">${'⭐'.repeat(Math.floor(producto.rating))}</p>
    <button>Comprar</button>
  </div>
`;

// Este patrón lo vas a usar TODO EL TIEMPO en proyectos reales
```

**Diagrama:**

```
CONCATENACIÓN (antigua):
'Texto ' + variable + ' más texto ' + otraVariable

TEMPLATE LITERALS (moderna):
`Texto ${variable} más texto ${otraVariable}`

Más legible, más fácil, más mantenible
```

**Analogía:**
Template literals son como Mad Libs (juego de completar espacios):
"Hola _____, tengo _____ años" → solo llenás los blancos con ${}

---

## 🎯 TU TURNO:

**CONSIGNA:**
Crear mensajes y HTML usando template literals

**Datos:**

```javascript
const usuario = {
  nombre: 'Carlos',
  apellido: 'González',
  edad: 30,
  email: 'carlos@email.com',
  pais: 'Argentina'
};

const productos = [
  { id: 1, nombre: 'Laptop', precio: 1200, stock: 5 },
  { id: 2, nombre: 'Mouse', precio: 25, stock: 15 },
  { id: 3, nombre: 'Teclado', precio: 75, stock: 10 }
];
```

**TAREAS:**

1. Crear mensaje de bienvenida con nombre completo
2. Crear mensaje con condicional (mayor/menor de 18)
3. Crear tabla HTML con productos
4. Crear email automático con datos del usuario

**PLANTILLA:**

```javascript
// ============================================
// EJERCICIO 1: Template Literals
// ============================================

const usuario = {
  nombre: 'Carlos',
  apellido: 'González',
  edad: 30,
  email: 'carlos@email.com',
  pais: 'Argentina'
};

const productos = [
  { id: 1, nombre: 'Laptop', precio: 1200, stock: 5 },
  { id: 2, nombre: 'Mouse', precio: 25, stock: 15 },
  { id: 3, nombre: 'Teclado', precio: 75, stock: 10 }
];

// TAREA 1: Mensaje de bienvenida
const bienvenida = /* TU CÓDIGO AQUÍ */;
// Resultado esperado: "Bienvenido Carlos González"

console.log(bienvenida);

// TAREA 2: Mensaje con condicional
const mensajeEdad = /* TU CÓDIGO AQUÍ */;
// Resultado esperado: "Carlos tiene 30 años, es mayor de edad"
// O: "Carlos tiene 15 años, es menor de edad"

console.log(mensajeEdad);

// TAREA 3: Tabla HTML con productos
const tablaHTML = /* TU CÓDIGO AQUÍ */;
// Debe generar tabla HTML con todos los productos

console.log(tablaHTML);
document.body.innerHTML = tablaHTML;  // Para verlo en el navegador

// TAREA 4: Email automático
const emailHTML = /* TU CÓDIGO AQUÍ */;
// Debe ser un email formateado con todos los datos del usuario

console.log(emailHTML);
```

**RESULTADO ESPERADO:**

```
Tarea 1: "Bienvenido Carlos González"

Tarea 2: "Carlos tiene 30 años, es mayor de edad"

Tarea 3:
<table>
  <thead>
    <tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Stock</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>Laptop</td><td>$1200</td><td>5</td></tr>
    <tr><td>2</td><td>Mouse</td><td>$25</td><td>15</td></tr>
    <tr><td>3</td><td>Teclado</td><td>$75</td><td>10</td></tr>
  </tbody>
</table>

Tarea 4:
Estimado/a Carlos González,

Tu correo registrado es: carlos@email.com
País: Argentina
Edad: 30 años

Gracias por registrarte.
```

---

## 💡 HINTS:

**Hint 1 (Tarea 1):**
```javascript
const bienvenida = `Bienvenido ${usuario.nombre} ${usuario.apellido}`;
```

**Hint 2 (Tarea 2):**
```javascript
const mensajeEdad = `${usuario.nombre} tiene ${usuario.edad} años, es ${usuario.edad >= 18 ? 'mayor' : 'menor'} de edad`;
```

**Hint 3 (Tarea 3):**
```javascript
const tablaHTML = `
  <table>
    <thead>
      <tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Stock</th></tr>
    </thead>
    <tbody>
      ${productos.map(p => `
        <tr>
          <td>${p.id}</td>
          <td>${p.nombre}</td>
          <td>$${p.precio}</td>
          <td>${p.stock}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
`;
```

**Hint 4 (Tarea 4):**
```javascript
const emailHTML = `
Estimado/a ${usuario.nombre} ${usuario.apellido},

Tu correo registrado es: ${usuario.email}
País: ${usuario.pais}
Edad: ${usuario.edad} años

Gracias por registrarte.
`;
```

---

## ✅ CHECKLIST:

- [ ] Todos los mensajes se generan correctamente
- [ ] Tabla HTML se renderiza bien en el navegador
- [ ] Entendés cuándo usar backticks vs comillas
- [ ] Podés interpolar variables y expresiones

---

# EJERCICIO 2: Default Parameters

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

## 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Default Parameters
// ============================================

// ============================================
// FORMA ANTIGUA (sin defaults)
// ============================================

function saludar1(nombre, saludo) {
  // Verificar manualmente si el parámetro existe
  if (nombre === undefined) {
    nombre = 'Usuario';
  }
  if (saludo === undefined) {
    saludo = 'Hola';
  }
  
  return `${saludo}, ${nombre}!`;
}

console.log(saludar1('Ana', 'Buenos días'));  // "Buenos días, Ana!"
console.log(saludar1('Ana'));                 // "Hola, Ana!"
console.log(saludar1());                      // "Hola, Usuario!"

// Mucho código boilerplate para algo simple

// ============================================
// FORMA MODERNA (con defaults)
// ============================================

function saludar2(nombre = 'Usuario', saludo = 'Hola') {
  return `${saludo}, ${nombre}!`;
}

console.log(saludar2('Ana', 'Buenos días'));  // "Buenos días, Ana!"
console.log(saludar2('Ana'));                 // "Hola, Ana!"
console.log(saludar2());                      // "Hola, Usuario!"

// Mismo resultado, código mucho más limpio

// ============================================
// DEFAULTS pueden ser expresiones
// ============================================

function calcularPrecioFinal(precio, descuento = 0, impuesto = precio * 0.21) {
  // 'impuesto' usa 'precio' en su default
  return precio - descuento + impuesto;
}

console.log(calcularPrecioFinal(100));           // 100 - 0 + 21 = 121
console.log(calcularPrecioFinal(100, 10));       // 100 - 10 + 21 = 111
console.log(calcularPrecioFinal(100, 10, 5));    // 100 - 10 + 5 = 95

// ============================================
// DEFAULTS con objetos
// ============================================

function crearUsuario(
  nombre,
  opciones = { admin: false, activo: true, rol: 'usuario' }
) {
  return {
    nombre,
    ...opciones
  };
}

console.log(crearUsuario('Ana'));
// { nombre: 'Ana', admin: false, activo: true, rol: 'usuario' }

console.log(crearUsuario('Carlos', { admin: true, rol: 'admin' }));
// { nombre: 'Carlos', admin: true, rol: 'admin' }

// ============================================
// PATTERN COMÚN: Destructuring + Defaults
// ============================================

function configurarApp({
  tema = 'claro',
  idioma = 'es',
  notificaciones = true,
  sonido = false
} = {}) {
  // El = {} al final permite llamar sin argumentos
  return { tema, idioma, notificaciones, sonido };
}

console.log(configurarApp());
// { tema: 'claro', idioma: 'es', notificaciones: true, sonido: false }

console.log(configurarApp({ tema: 'oscuro', sonido: true }));
// { tema: 'oscuro', idioma: 'es', notificaciones: true, sonido: true }

// ============================================
// ¿CUÁNDO USAR DEFAULT PARAMETERS?
// ============================================

// ✅ USAR cuando:
// - Parámetros opcionales frecuentes
// - Valores sensatos por defecto
// - API/Funciones públicas

// ❌ NO USAR cuando:
// - El parámetro DEBE ser provisto siempre
// - No hay un valor "sensato" por defecto
// - Puede causar confusión
```

**Diagrama:**

```
SIN DEFAULTS:
function fn(a, b, c) {
  a = a || 'default';  ← Problemas si a = 0 o false
  b = b || 'default';
  c = c || 'default';
}

CON DEFAULTS:
function fn(a = 'default', b = 'default', c = 'default') {
  // Funciona correctamente incluso con valores falsy
}
```

---

## 🎯 TU TURNO:

**CONSIGNA:**
Crear funciones con parámetros opcionales usando defaults

**TAREAS:**

1. Función que crea productos con valores por defecto
2. Función que calcula descuento (default 10%)
3. Función de configuración con objeto de opciones
4. Función que genera URLs con parámetros opcionales

**PLANTILLA:**

```javascript
// ============================================
// EJERCICIO 2: Default Parameters
// ============================================

// TAREA 1: Crear producto con defaults
function crearProducto(nombre, precio, stock = 0, disponible = true) {
  // TU CÓDIGO AQUÍ
  // Retornar objeto con todas las propiedades
}

console.log(crearProducto('Laptop', 1200));
// { nombre: 'Laptop', precio: 1200, stock: 0, disponible: true }

console.log(crearProducto('Mouse', 25, 50, false));
// { nombre: 'Mouse', precio: 25, stock: 50, disponible: false }

// TAREA 2: Calcular precio con descuento
function aplicarDescuento(precio, porcentaje = 10) {
  // TU CÓDIGO AQUÍ
  // Retornar precio con descuento aplicado
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
}

console.log(generarURL('https://api.com', '/users'));
// "https://api.com/users"

console.log(generarURL('https://api.com', '/users', { page: 1, limit: 10 }));
// "https://api.com/users?page=1&limit=10"
```

**RESULTADO ESPERADO:**

```
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
```

---

## 💡 HINTS:

**Hint 1:**
```javascript
function crearProducto(nombre, precio, stock = 0, disponible = true) {
  return { nombre, precio, stock, disponible };
}
```

**Hint 2:**
```javascript
function aplicarDescuento(precio, porcentaje = 10) {
  return precio - (precio * porcentaje / 100);
}
```

**Hint 3:**
```javascript
function configurarOpciones({
  animaciones = true,
  sonido = false,
  tema = 'claro',
  idioma = 'es'
} = {}) {
  return { animaciones, sonido, tema, idioma };
}
```

**Hint 4:**
```javascript
function generarURL(base, endpoint, params = {}) {
  const queryString = Object.keys(params).length > 0
    ? '?' + Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&')
    : '';
  
  return base + endpoint + queryString;
}
```

---

## ✅ CHECKLIST:

- [ ] Funciones funcionan sin parámetros opcionales
- [ ] Funciones funcionan con parámetros opcionales
- [ ] Defaults se aplican correctamente
- [ ] Entendés destructuring + defaults

---

# EJERCICIO 3: Arrow Functions Avanzado

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

## 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Arrow Functions - This Binding
// ============================================

// ============================================
// DIFERENCIA CLAVE: Arrow functions NO tienen su propio 'this'
// Heredan 'this' del contexto donde fueron definidas
// ============================================

// CASO 1: Regular function vs Arrow function

const persona1 = {
  nombre: 'Ana',
  
  saludar: function() {
    console.log(`Hola, soy ${this.nombre}`);
  }
};

persona1.saludar();  // "Hola, soy Ana" ✓

const persona2 = {
  nombre: 'Carlos',
  
  saludar: () => {
    console.log(`Hola, soy ${this.nombre}`);
  }
};

persona2.saludar();  // "Hola, soy undefined" ✗
// Arrow function NO tiene su propio 'this'
// Usa 'this' del scope externo (window/global)

// ============================================
// CASO 2: Callbacks y setTimeout
// ============================================

const persona3 = {
  nombre: 'Lucía',
  edad: 25,
  
  // ❌ PROBLEMA con regular function
  cumpleañosMAL: function() {
    setTimeout(function() {
      this.edad++;  // 'this' es window, no persona3
      console.log(`Ahora tengo ${this.edad} años`);
    }, 1000);
  },
  
  // ✅ SOLUCIÓN con arrow function
  cumpleañosBIEN: function() {
    setTimeout(() => {
      this.edad++;  // 'this' es persona3 ✓
      console.log(`Ahora tengo ${this.edad} años`);
    }, 1000);
  }
};

persona3.cumpleañosMAL();   // "Ahora tengo NaN años" ✗
persona3.cumpleañosBIEN();  // "Ahora tengo 26 años" ✓

// ============================================
// CASO 3: Event Listeners
// ============================================

const boton = {
  texto: 'Click aquí',
  
  // ❌ Arrow function NO funciona aquí
  clickMAL() {
    document.getElementById('btn').addEventListener('click', () => {
      console.log(this.texto);  // "Click aquí" ✓
      console.log(this);        // boton object ✓
      // PERO:
      // NO podés acceder al elemento clickeado (event.target)
    });
  },
  
  // ✅ Regular function cuando necesitás 'this' del elemento
  clickBIEN() {
    document.getElementById('btn').addEventListener('click', function() {
      console.log(this);  // <button> element ✓
      this.style.background = 'red';  // Funciona ✓
    });
  }
};

// ============================================
// CUÁNDO USAR ARROW vs REGULAR
// ============================================

// ✅ USAR ARROW cuando:
// - Callbacks (map, filter, reduce, setTimeout)
// - No necesitás 'this' del contexto de ejecución
// - Querés heredar 'this' del scope padre
// - Funciones cortas y simples

const numeros = [1, 2, 3, 4, 5];
const dobles = numeros.map(n => n * 2);  // ✓

// ❌ NO USAR ARROW cuando:
// - Métodos de objetos (necesitás 'this' del objeto)
// - Event listeners (necesitás 'this' del elemento)
// - Constructores (arrow functions NO pueden ser constructores)
// - Necesitás 'arguments' object

class Persona {
  constructor(nombre) {
    this.nombre = nombre;
  }
  
  // ✓ Regular function como método
  saludar() {
    console.log(`Hola, soy ${this.nombre}`);
  }
  
  // ✓ Arrow en callback
  esperarYSaludar() {
    setTimeout(() => {
      this.saludar();  // 'this' es la instancia de Persona
    }, 1000);
  }
}

// ============================================
// SINTAXIS COMPACTA
// ============================================

// Una línea, un parámetro
const doble = n => n * 2;

// Múltiples parámetros
const suma = (a, b) => a + b;

// Múltiples líneas
const calcular = (a, b) => {
  const resultado = a + b;
  return resultado * 2;
};

// Retornar objeto (necesita paréntesis)
const crearUsuario = nombre => ({ nombre, activo: true });
//                              ↑ paréntesis necesarios
```

**Diagrama:**

```
REGULAR FUNCTION:
- Tiene su propio 'this'
- 'this' depende de CÓMO se llama
- Tiene 'arguments'
- Puede ser constructor

ARROW FUNCTION:
- NO tiene su propio 'this'
- Hereda 'this' del scope padre
- NO tiene 'arguments'
- NO puede ser constructor
```

---

## 🎯 TU TURNO:

**CONSIGNA:**
Identificar cuándo usar arrow vs regular functions

**TAREAS:**

1. Crear objeto con método que usa setTimeout (arrow en callback)
2. Crear event listener que cambia el elemento clickeado (regular)
3. Transformar array con arrow function compacta
4. Identificar errores de uso de arrow functions

**PLANTILLA:**

```javascript
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
}

// TAREA 3: Transformaciones con arrow compacta
const productos = [
  { nombre: 'Laptop', precio: 1200 },
  { nombre: 'Mouse', precio: 25 },
  { nombre: 'Teclado', precio: 75 }
];

// Extraer solo nombres (arrow compacta)
const nombres = /* TU CÓDIGO AQUÍ */;

// Extraer solo precios (arrow compacta)
const precios = /* TU CÓDIGO AQUÍ */;

// Calcular total (arrow compacta)
const total = /* TU CÓDIGO AQUÍ */;

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
};
```

**RESULTADO ESPERADO:**

```
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
```

---

## 💡 HINTS:

**Hint 1:**
```javascript
const contador = {
  valor: 0,
  
  incrementar() {
    setTimeout(() => {
      this.valor++;
      console.log(`Contador: ${this.valor}`);
    }, 1000);
  }
};
```

**Hint 2:**
```javascript
function configurarBoton() {
  const btn = document.getElementById('miBoton');
  
  btn.addEventListener('click', function() {
    this.style.background = 'red';
  });
}
```

**Hint 3:**
```javascript
const nombres = productos.map(p => p.nombre);
const precios = productos.map(p => p.precio);
const total = precios.reduce((acc, p) => acc + p, 0);
```

**Hint 4:**
```javascript
const usuarioCorregido = {
  nombre: 'Ana',
  edad: 25,
  
  saludar() {  // Regular function, NO arrow
    console.log(`Hola, soy ${this.nombre}`);
  }
};
```

---

## ✅ CHECKLIST:

- [ ] Entendés diferencia entre arrow y regular
- [ ] Sabés cuándo usar cada una
- [ ] Arrow compacta funciona correctamente
- [ ] Identificás problemas con 'this'

---

# EJERCICIO 4: Destructuring en Funciones

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

## 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Destructuring en Parámetros
// ============================================

// ============================================
// CASO 1: Objetos como parámetros
// ============================================

// FORMA ANTIGUA
function crearUsuario1(datos) {
  const nombre = datos.nombre;
  const email = datos.email;
  const edad = datos.edad;
  
  return `${nombre} (${email}) - ${edad} años`;
}

// FORMA MODERNA (destructuring)
function crearUsuario2({ nombre, email, edad }) {
  return `${nombre} (${email}) - ${edad} años`;
}

const usuario = { nombre: 'Ana', email: 'ana@email.com', edad: 25 };

console.log(crearUsuario2(usuario));
// "Ana (ana@email.com) - 25 años"

// ============================================
// CASO 2: Destructuring + Default values
// ============================================

function configurar({
  tema = 'claro',
  idioma = 'es',
  notificaciones = true
} = {}) {
  // El = {} permite llamar sin argumentos
  return { tema, idioma, notificaciones };
}

console.log(configurar());
// { tema: 'claro', idioma: 'es', notificaciones: true }

console.log(configurar({ tema: 'oscuro' }));
// { tema: 'oscuro', idioma: 'es', notificaciones: true }

// ============================================
// CASO 3: Destructuring anidado
// ============================================

function mostrarDireccion({ usuario: { nombre, direccion: { ciudad } } }) {
  return `${nombre} vive en ${ciudad}`;
}

const datos = {
  usuario: {
    nombre: 'Carlos',
    direccion: {
      calle: 'Av. Corrientes 1234',
      ciudad: 'Buenos Aires'
    }
  }
};

console.log(mostrarDireccion(datos));
// "Carlos vive en Buenos Aires"

// ============================================
// CASO 4: Rest en destructuring de parámetros
// ============================================

function procesarProducto({ nombre, precio, ...resto }) {
  console.log('Nombre:', nombre);
  console.log('Precio:', precio);
  console.log('Resto:', resto);
}

procesarProducto({
  nombre: 'Laptop',
  precio: 1200,
  marca: 'Dell',
  stock: 5,
  categoria: 'Electrónica'
});

// Nombre: Laptop
// Precio: 1200
// Resto: { marca: 'Dell', stock: 5, categoria: 'Electrónica' }

// ============================================
// CASO 5: Renombrar en destructuring
// ============================================

function mostrarPrecio({ precio: precioFinal, precio: p }) {
  // Si el nombre de la propiedad no es claro
  return `El precio es $${precioFinal}`;
}

// Mejor ejemplo:
function crearReporte({ username: nombreUsuario, email: correo }) {
  return `Usuario: ${nombreUsuario}, Email: ${correo}`;
}

console.log(crearReporte({ 
  username: 'ana123', 
  email: 'ana@email.com' 
}));
// "Usuario: ana123, Email: ana@email.com"

// ============================================
// VENTAJAS:
// ============================================
// ✅ Código más limpio
// ✅ Obvio qué propiedades necesita la función
// ✅ No importa el orden de propiedades
// ✅ Fácil agregar defaults
```

---

## 🎯 TU TURNO:

**CONSIGNA:**
Usar destructuring en parámetros de funciones

**TAREAS:**

1. Función que calcula precio final (destructuring + defaults)
2. Función que renderiza card de usuario (destructuring anidado)
3. Función que procesa config de app (rest operator)
4. Refactorizar función que no usa destructuring

**PLANTILLA:**

```javascript
// ============================================
// EJERCICIO 4: Destructuring en Funciones
// ============================================

// TAREA 1: Calcular precio final
function calcularPrecioFinal({ precio, descuento = 0, impuesto = 0.21 }) {
  // TU CÓDIGO AQUÍ
  // precio - descuento + (precio * impuesto)
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
function crearProductoViejo(datos) {
  const nombre = datos.nombre;
  const precio = datos.precio;
  const stock = datos.stock;
  const categoria = datos.categoria;
  
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
```

---

## 💡 HINTS:

**Hint 1:**
```javascript
function calcularPrecioFinal({ precio, descuento = 0, impuesto = 0.21 }) {
  return precio - descuento + (precio * impuesto);
}
```

**Hint 2:**
```javascript
function renderizarUsuario({ nombre, edad, direccion: { ciudad, pais } }) {
  return `<div>${nombre}, ${edad} años<br>${ciudad}, ${pais}</div>`;
}
```

**Hint 3:**
```javascript
function aplicarConfiguracion({ tema, idioma, ...otrasOpciones }) {
  console.log('Tema:', tema);
  console.log('Idioma:', idioma);
  console.log('Otras opciones:', otrasOpciones);
}
```

**Hint 4:**
```javascript
function crearProductoNuevo({ nombre, precio, stock, categoria }) {
  return {
    nombre,
    precio,
    stock,
    categoria,
    disponible: stock > 0
  };
}
```

---

## ✅ CHECKLIST:

- [ ] Destructuring en parámetros funciona
- [ ] Defaults en destructuring funcionan
- [ ] Destructuring anidado funciona
- [ ] Rest operator en destructuring funciona

---

# EJERCICIO 5: Optional Chaining + Nullish Coalescing

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

## 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Optional Chaining (?.) y Nullish Coalescing (??)
// ============================================

// ============================================
// PROBLEMA: Acceder a propiedades anidadas
// ============================================

const usuario1 = {
  nombre: 'Ana',
  direccion: {
    ciudad: 'Buenos Aires',
    pais: 'Argentina'
  }
};

const usuario2 = {
  nombre: 'Carlos'
  // NO tiene 'direccion'
};

// FORMA ANTIGUA (verbose y propensa a errores)
const ciudad1 = usuario1.direccion && usuario1.direccion.ciudad;
console.log(ciudad1);  // "Buenos Aires" ✓

const ciudad2 = usuario2.direccion && usuario2.direccion.ciudad;
console.log(ciudad2);  // undefined ✓

// PROBLEMA: Si olvidás alguna verificación → ERROR
// const ciudad3 = usuario2.direccion.ciudad;
// ↑ TypeError: Cannot read property 'ciudad' of undefined

// ============================================
// SOLUCIÓN: Optional Chaining (?.)
// ============================================

const ciudad3 = usuario1.direccion?.ciudad;
console.log(ciudad3);  // "Buenos Aires" ✓

const ciudad4 = usuario2.direccion?.ciudad;
console.log(ciudad4);  // undefined (NO error) ✓

// Si 'direccion' es null/undefined → retorna undefined
// Si 'direccion' existe → continúa accediendo a 'ciudad'

// ============================================
// OPTIONAL CHAINING con múltiples niveles
// ============================================

const usuario3 = {
  nombre: 'Lucía',
  trabajo: {
    empresa: {
      nombre: 'Tech Corp',
      ubicacion: {
        ciudad: 'Córdoba'
      }
    }
  }
};

const usuario4 = {
  nombre: 'Pedro'
  // NO tiene 'trabajo'
};

// Forma antigua (horrible)
const ciudadTrabajo1 = usuario3.trabajo && 
                       usuario3.trabajo.empresa && 
                       usuario3.trabajo.empresa.ubicacion &&
                       usuario3.trabajo.empresa.ubicacion.ciudad;

// Forma moderna (limpia)
const ciudadTrabajo2 = usuario3.trabajo?.empresa?.ubicacion?.ciudad;
console.log(ciudadTrabajo2);  // "Córdoba" ✓

const ciudadTrabajo3 = usuario4.trabajo?.empresa?.ubicacion?.ciudad;
console.log(ciudadTrabajo3);  // undefined (sin errores) ✓

// ============================================
// OPTIONAL CHAINING con métodos
// ============================================

const usuario5 = {
  nombre: 'Ana',
  saludar() {
    return `Hola, soy ${this.nombre}`;
  }
};

const usuario6 = {
  nombre: 'Carlos'
  // NO tiene 'saludar'
};

console.log(usuario5.saludar?.());  // "Hola, soy Ana" ✓
console.log(usuario6.saludar?.());  // undefined (NO error) ✓

// ============================================
// OPTIONAL CHAINING con arrays
// ============================================

const datos1 = {
  usuarios: ['Ana', 'Carlos', 'Lucía']
};

const datos2 = {
  // NO tiene 'usuarios'
};

console.log(datos1.usuarios?.[0]);  // "Ana" ✓
console.log(datos2.usuarios?.[0]);  // undefined (NO error) ✓

// ============================================
// NULLISH COALESCING (??)
// ============================================

// PROBLEMA con OR (||):
const config1 = {
  tema: 'oscuro',
  notificaciones: false,  // Usuario QUIERE false
  limite: 0               // Usuario QUIERE 0
};

// ❌ FORMA ANTIGUA (|| trata 0, false, '' como falsy)
const notif1 = config1.notificaciones || true;
console.log(notif1);  // true ✗ (debería ser false)

const limite1 = config1.limite || 10;
console.log(limite1);  // 10 ✗ (debería ser 0)

// ✅ NULLISH COALESCING (??) solo null/undefined
const notif2 = config1.notificaciones ?? true;
console.log(notif2);  // false ✓

const limite2 = config1.limite ?? 10;
console.log(limite2);  // 0 ✓

// ============================================
// DIFERENCIA CLAVE: || vs ??
// ============================================

const valores = {
  a: 0,
  b: '',
  c: false,
  d: null,
  e: undefined
};

console.log('CON ||:');
console.log(valores.a || 'default');  // 'default' (0 es falsy)
console.log(valores.b || 'default');  // 'default' ('' es falsy)
console.log(valores.c || 'default');  // 'default' (false es falsy)
console.log(valores.d || 'default');  // 'default' (null es falsy)
console.log(valores.e || 'default');  // 'default' (undefined es falsy)

console.log('CON ??:');
console.log(valores.a ?? 'default');  // 0 (NO es null/undefined) ✓
console.log(valores.b ?? 'default');  // '' (NO es null/undefined) ✓
console.log(valores.c ?? 'default');  // false (NO es null/undefined) ✓
console.log(valores.d ?? 'default');  // 'default' (null)
console.log(valores.e ?? 'default');  // 'default' (undefined)

// ============================================
// COMBINACIÓN PERFECTA: ?. + ??
// ============================================

function obtenerCiudad(usuario) {
  // Si no existe direccion/ciudad → usar 'Desconocida'
  return usuario.direccion?.ciudad ?? 'Desconocida';
}

console.log(obtenerCiudad(usuario1));  // "Buenos Aires"
console.log(obtenerCiudad(usuario2));  // "Desconocida"

// ============================================
// CASO PRÁCTICO: API response
// ============================================

const apiResponse1 = {
  data: {
    usuario: {
      nombre: 'Ana',
      perfil: {
        avatar: 'ana.jpg',
        bio: 'Developer'
      }
    }
  }
};

const apiResponse2 = {
  data: null  // Error en API
};

// Forma antigua (nightmare)
const avatar1 = apiResponse1.data && 
                apiResponse1.data.usuario && 
                apiResponse1.data.usuario.perfil &&
                apiResponse1.data.usuario.perfil.avatar || 'default.jpg';

// Forma moderna (clean)
const avatar2 = apiResponse1.data?.usuario?.perfil?.avatar ?? 'default.jpg';
console.log(avatar2);  // "ana.jpg" ✓

const avatar3 = apiResponse2.data?.usuario?.perfil?.avatar ?? 'default.jpg';
console.log(avatar3);  // "default.jpg" ✓

// ============================================
// ¿CUÁNDO USAR?
// ============================================

// ✅ USAR ?. cuando:
// - Datos externos (APIs, localStorage)
// - Propiedades opcionales
// - Niveles profundos de anidación
// - Métodos que pueden no existir

// ✅ USAR ?? cuando:
// - Valores por defecto
// - 0, false, '' son valores VÁLIDOS
// - Distinguir entre "sin valor" vs "valor falsy"

// ❌ NO USAR cuando:
// - Propiedades que SIEMPRE deben existir
// - Puede ocultar errores reales
// - El código debería fallar si falta algo
```

**Diagrama:**

```
OPTIONAL CHAINING (?.)
obj.prop?.nested?.deep
     ↑ Si null/undefined → para aquí, retorna undefined
     ↑ Si existe → continúa

NULLISH COALESCING (??)
value ?? 'default'
  ↑ Si null/undefined → usa 'default'
  ↑ Si 0, false, '' → usa el valor original

|| (OR)
value || 'default'
  ↑ Si 0, false, '', null, undefined → usa 'default'
```

---

## 🎯 TU TURNO:

**CONSIGNA:**
Usar optional chaining y nullish coalescing para acceso seguro a datos

**TAREAS:**

1. Acceder a datos anidados de forma segura
2. Llamar métodos opcionales
3. Usar ?? para valores por defecto (diferenciar de ||)
4. Procesar respuesta de API con datos opcionales

**PLANTILLA:**

```javascript
// ============================================
// EJERCICIO 5: Optional Chaining + Nullish
// ============================================

// DATOS DE PRUEBA
const usuarios = [
  {
    id: 1,
    nombre: 'Ana',
    contacto: {
      email: 'ana@email.com',
      telefono: {
        codigo: '+54',
        numero: '11-1234-5678'
      }
    },
    config: {
      notificaciones: true,
      tema: 'oscuro'
    }
  },
  {
    id: 2,
    nombre: 'Carlos',
    contacto: {
      email: 'carlos@email.com'
      // NO tiene 'telefono'
    }
    // NO tiene 'config'
  },
  {
    id: 3,
    nombre: 'Lucía'
    // NO tiene 'contacto'
  }
];

// TAREA 1: Obtener número de teléfono completo
function obtenerTelefono(usuario) {
  // TU CÓDIGO AQUÍ
  // Retornar codigo + numero (ej: "+54 11-1234-5678")
  // Si no existe → 'Sin teléfono'
}

console.log(obtenerTelefono(usuarios[0]));  // "+54 11-1234-5678"
console.log(obtenerTelefono(usuarios[1]));  // "Sin teléfono"
console.log(obtenerTelefono(usuarios[2]));  // "Sin teléfono"

// TAREA 2: Obtener configuración con defaults
function obtenerConfig(usuario) {
  // TU CÓDIGO AQUÍ
  // Retornar { notificaciones, tema }
  // Defaults: notificaciones = true, tema = 'claro'
  // IMPORTANTE: Usar ?? (no ||) porque false es válido
}

console.log(obtenerConfig(usuarios[0]));
// { notificaciones: true, tema: 'oscuro' }

console.log(obtenerConfig(usuarios[1]));
// { notificaciones: true, tema: 'claro' }

// TAREA 3: Llamar método opcional
const productos = [
  {
    id: 1,
    nombre: 'Laptop',
    calcularDescuento() {
      return this.precio * 0.1;
    },
    precio: 1000
  },
  {
    id: 2,
    nombre: 'Mouse',
    precio: 25
    // NO tiene 'calcularDescuento'
  }
];

function obtenerDescuento(producto) {
  // TU CÓDIGO AQUÍ
  // Llamar calcularDescuento si existe
  // Si no existe → retornar 0
}

console.log(obtenerDescuento(productos[0]));  // 100
console.log(obtenerDescuento(productos[1]));  // 0

// TAREA 4: Procesar respuesta de API
const apiResponses = [
  {
    status: 'success',
    data: {
      usuario: {
        nombre: 'Ana',
        posts: [
          { id: 1, titulo: 'Post 1', likes: 10 },
          { id: 2, titulo: 'Post 2', likes: 5 }
        ]
      }
    }
  },
  {
    status: 'success',
    data: {
      usuario: {
        nombre: 'Carlos'
        // NO tiene 'posts'
      }
    }
  },
  {
    status: 'error',
    data: null
  }
];

function procesarRespuesta(response) {
  // TU CÓDIGO AQUÍ
  // Retornar objeto con:
  // - nombre (default: 'Anónimo')
  // - cantidadPosts (default: 0)
  // - totalLikes (default: 0)
}

console.log(procesarRespuesta(apiResponses[0]));
// { nombre: 'Ana', cantidadPosts: 2, totalLikes: 15 }

console.log(procesarRespuesta(apiResponses[1]));
// { nombre: 'Carlos', cantidadPosts: 0, totalLikes: 0 }

console.log(procesarRespuesta(apiResponses[2]));
// { nombre: 'Anónimo', cantidadPosts: 0, totalLikes: 0 }
```

**RESULTADO ESPERADO:**

```
Tarea 1:
"+54 11-1234-5678"
"Sin teléfono"
"Sin teléfono"

Tarea 2:
{ notificaciones: true, tema: 'oscuro' }
{ notificaciones: true, tema: 'claro' }

Tarea 3:
100
0

Tarea 4:
{ nombre: 'Ana', cantidadPosts: 2, totalLikes: 15 }
{ nombre: 'Carlos', cantidadPosts: 0, totalLikes: 0 }
{ nombre: 'Anónimo', cantidadPosts: 0, totalLikes: 0 }
```

---

## 💡 HINTS:

**Hint 1:**
```javascript
function obtenerTelefono(usuario) {
  const codigo = usuario.contacto?.telefono?.codigo;
  const numero = usuario.contacto?.telefono?.numero;
  
  if (codigo && numero) {
    return `${codigo} ${numero}`;
  }
  return 'Sin teléfono';
  
  // O más compacto:
  // return usuario.contacto?.telefono?.codigo && usuario.contacto?.telefono?.numero
  //   ? `${usuario.contacto.telefono.codigo} ${usuario.contacto.telefono.numero}`
  //   : 'Sin teléfono';
}
```

**Hint 2:**
```javascript
function obtenerConfig(usuario) {
  return {
    notificaciones: usuario.config?.notificaciones ?? true,
    tema: usuario.config?.tema ?? 'claro'
  };
}
```

**Hint 3:**
```javascript
function obtenerDescuento(producto) {
  return producto.calcularDescuento?.() ?? 0;
}
```

**Hint 4:**
```javascript
function procesarRespuesta(response) {
  const nombre = response.data?.usuario?.nombre ?? 'Anónimo';
  const posts = response.data?.usuario?.posts ?? [];
  const cantidadPosts = posts.length;
  const totalLikes = posts.reduce((acc, post) => acc + post.likes, 0);
  
  return { nombre, cantidadPosts, totalLikes };
}
```

---

## ✅ CHECKLIST:

- [ ] Optional chaining funciona correctamente
- [ ] Nullish coalescing funciona correctamente
- [ ] Entendés diferencia entre ?? y ||
- [ ] Combinás ?. y ?? efectivamente

---

# EJERCICIO 6: Modules (import/export)

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

## 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: ES6 Modules (import/export)
// ============================================

// ============================================
// ARCHIVO: utils.js
// ============================================

// EXPORT NOMBRADO (named export)
export function sumar(a, b) {
  return a + b;
}

export function restar(a, b) {
  return a - b;
}

export const PI = 3.14159;

// También podés exportar al final:
function multiplicar(a, b) {
  return a * b;
}

function dividir(a, b) {
  return a / b;
}

export { multiplicar, dividir };

// ============================================
// ARCHIVO: calculadora.js
// ============================================

// EXPORT DEFAULT (solo uno por archivo)
export default class Calculadora {
  constructor() {
    this.resultado = 0;
  }
  
  sumar(n) {
    this.resultado += n;
    return this;
  }
  
  restar(n) {
    this.resultado -= n;
    return this;
  }
  
  obtenerResultado() {
    return this.resultado;
  }
}

// ============================================
// ARCHIVO: app.js
// ============================================

// IMPORT NOMBRADO (debe usar mismo nombre)
import { sumar, restar, PI } from './utils.js';

console.log(sumar(5, 3));   // 8
console.log(restar(10, 4)); // 6
console.log(PI);            // 3.14159

// IMPORT con ALIAS (renombrar)
import { sumar as suma, restar as resta } from './utils.js';

console.log(suma(5, 3));  // 8
console.log(resta(10, 4)); // 6

// IMPORT TODO como namespace
import * as Utils from './utils.js';

console.log(Utils.sumar(5, 3));   // 8
console.log(Utils.restar(10, 4)); // 6
console.log(Utils.PI);            // 3.14159

// IMPORT DEFAULT (podés usar cualquier nombre)
import Calculadora from './calculadora.js';

const calc = new Calculadora();
calc.sumar(5).restar(3);
console.log(calc.obtenerResultado());  // 2

// IMPORT DEFAULT + NOMBRADOS
import Calculadora, { sumar, restar } from './modulo.js';

// ============================================
// EJEMPLO PRÁCTICO: Estructura de proyecto
// ============================================

// ============================================
// ARCHIVO: services/api.js
// ============================================
export async function obtenerProductos() {
  const response = await fetch('/api/productos');
  return response.json();
}

export async function crearProducto(producto) {
  const response = await fetch('/api/productos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  });
  return response.json();
}

// ============================================
// ARCHIVO: utils/validaciones.js
// ============================================
export function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validarPrecio(precio) {
  return precio > 0;
}

// ============================================
// ARCHIVO: components/ProductCard.js
// ============================================
export default function crearCard(producto) {
  return `
    <div class="card">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
    </div>
  `;
}

// ============================================
// ARCHIVO: app.js (archivo principal)
// ============================================
import { obtenerProductos, crearProducto } from './services/api.js';
import { validarEmail, validarPrecio } from './utils/validaciones.js';
import crearCard from './components/ProductCard.js';

// Usar las funciones importadas
async function inicializarApp() {
  const productos = await obtenerProductos();
  
  productos.forEach(producto => {
    if (validarPrecio(producto.precio)) {
      const card = crearCard(producto);
      document.body.innerHTML += card;
    }
  });
}

inicializarApp();

// ============================================
// HTML: Importante usar type="module"
// ============================================
/*
<!DOCTYPE html>
<html>
<head>
  <title>Mi App</title>
</head>
<body>
  <div id="app"></div>
  
  <!-- IMPORTANTE: type="module" -->
  <script type="module" src="app.js"></script>
</body>
</html>
*/

// ============================================
// VENTAJAS DE MODULES:
// ============================================
// ✅ Código organizado en archivos separados
// ✅ Reutilización de código
// ✅ Evita conflictos de nombres (scope propio)
// ✅ Import solo lo que necesitás
// ✅ Lazy loading (cargar cuando se necesita)
// ✅ Facilita testing (importar funciones específicas)

// ============================================
// DIFERENCIAS: named vs default export
// ============================================

// NAMED EXPORT:
// - Múltiples exports por archivo
// - Debe usar mismo nombre al importar (o alias)
// - Usa { } en import

export function fn1() {}
export function fn2() {}

import { fn1, fn2 } from './file.js';

// DEFAULT EXPORT:
// - Solo uno por archivo
// - Podés usar cualquier nombre al importar
// - NO usa { } en import

export default function() {}

import MiNombre from './file.js';  // Cualquier nombre

// ============================================
// PATRÓN COMÚN: index.js para re-exportar
// ============================================

// ARCHIVO: utils/index.js
export { validarEmail, validarPrecio } from './validaciones.js';
export { formatearFecha, formatearPrecio } from './formatos.js';
export { sumar, restar } from './matematicas.js';

// Ahora podés importar todo desde un solo lugar:
import { validarEmail, formatearFecha, sumar } from './utils/index.js';
// O más corto:
import { validarEmail, formatearFecha, sumar } from './utils';
```

**Diagrama:**

```
PROYECTO CON MODULES:

app.js (main)
  ↓ import
  ├─ services/
  │    ├─ api.js          (export { fn1, fn2 })
  │    └─ auth.js         (export { login, logout })
  │
  ├─ utils/
  │    ├─ validaciones.js (export { validarEmail })
  │    └─ formatos.js     (export { formatear })
  │
  └─ components/
       ├─ Card.js         (export default Card)
       └─ Modal.js        (export default Modal)
```

---

## 🎯 TU TURNO:

**CONSIGNA:**
Crear estructura modular de una mini-aplicación

**TAREAS:**

1. Crear módulo de utilidades (named exports)
2. Crear módulo de validaciones (named exports)
3. Crear módulo de componente (default export)
4. Importar y usar en archivo principal

**PLANTILLA:**

Vas a crear 4 archivos:

**ARCHIVO 1: utils/math.js**

```javascript
// ============================================
// utils/math.js
// ============================================

// TU CÓDIGO AQUÍ
// Exportar funciones: suma, resta, multiplica, divide
// Exportar constante: PI

export function suma(a, b) {
  // TU CÓDIGO
}

export function resta(a, b) {
  // TU CÓDIGO
}

// Exportar las otras funciones y PI
```

**ARCHIVO 2: utils/validaciones.js**

```javascript
// ============================================
// utils/validaciones.js
// ============================================

// TU CÓDIGO AQUÍ
// Exportar funciones de validación

export function esEmail(texto) {
  // Validar formato email simple
  // Debe contener @ y .
}

export function esPrecioValido(precio) {
  // Precio debe ser > 0
}

export function esStockSuficiente(stock) {
  // Stock debe ser >= 0
}
```

**ARCHIVO 3: components/ProductCard.js**

```javascript
// ============================================
// components/ProductCard.js
// ============================================

// TU CÓDIGO AQUÍ
// Export default de función que crea card HTML

export default function crearProductCard(producto) {
  // Retornar HTML string de una card de producto
  // Debe mostrar: nombre, precio, stock
}
```

**ARCHIVO 4: app.js (archivo principal)**

```javascript
// ============================================
// app.js
// ============================================

// TU CÓDIGO AQUÍ
// Importar todo lo necesario

import { suma, PI } from './utils/math.js';
import { esEmail, esPrecioValido } from './utils/validaciones.js';
import crearProductCard from './components/ProductCard.js';

// Probar imports
console.log('Suma:', suma(5, 3));
console.log('PI:', PI);

console.log('Es email:', esEmail('test@email.com'));
console.log('Es precio válido:', esPrecioValido(100));

const producto = {
  nombre: 'Laptop',
  precio: 1200,
  stock: 5
};

const card = crearProductCard(producto);
console.log(card);
```

**HTML necesario:**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Modules Demo</title>
</head>
<body>
  <div id="app"></div>
  
  <!-- IMPORTANTE: type="module" -->
  <script type="module" src="app.js"></script>
</body>
</html>
```

**RESULTADO ESPERADO:**

```
Suma: 8
PI: 3.14159
Es email: true
Es precio válido: true

(En la card se muestra el HTML del producto)
```

**NOTA IMPORTANTE:**
- Modules solo funcionan con servidor (Live Server, http-server)
- NO funcionan abriendo el HTML directamente (file://)
- Usá Live Server en VS Code

---

## 💡 HINTS:

**Hint 1 (math.js):**
```javascript
export function suma(a, b) {
  return a + b;
}

export function resta(a, b) {
  return a - b;
}

export function multiplica(a, b) {
  return a * b;
}

export function divide(a, b) {
  return a / b;
}

export const PI = 3.14159;
```

**Hint 2 (validaciones.js):**
```javascript
export function esEmail(texto) {
  return texto.includes('@') && texto.includes('.');
}

export function esPrecioValido(precio) {
  return precio > 0;
}

export function esStockSuficiente(stock) {
  return stock >= 0;
}
```

**Hint 3 (ProductCard.js):**
```javascript
export default function crearProductCard(producto) {
  return `
    <div class="card">
      <h3>${producto.nombre}</h3>
      <p class="precio">$${producto.precio}</p>
      <p class="stock">Stock: ${producto.stock}</p>
    </div>
  `;
}
```

**Hint 4 (app.js):**
```javascript
import { suma, PI } from './utils/math.js';
import { esEmail, esPrecioValido } from './utils/validaciones.js';
import crearProductCard from './components/ProductCard.js';

console.log('Suma:', suma(5, 3));
console.log('PI:', PI);

console.log('Es email:', esEmail('test@email.com'));
console.log('Es precio válido:', esPrecioValido(100));

const producto = {
  nombre: 'Laptop',
  precio: 1200,
  stock: 5
};

const card = crearProductCard(producto);
document.getElementById('app').innerHTML = card;
```

---

## ✅ CHECKLIST:

- [ ] Named exports funcionan correctamente
- [ ] Default export funciona correctamente
- [ ] Imports funcionan sin errores
- [ ] Código está organizado en módulos
- [ ] Entendés cuándo usar named vs default
- [ ] Sabés que necesitás servidor local para modules

---

## 🎓 RESUMEN DEL BLOQUE 1

**Conceptos dominados:**
- ✅ Template literals (interpolación, multiline)
- ✅ Default parameters (parámetros opcionales)
- ✅ Arrow functions (cuándo sí, cuándo no)
- ✅ Destructuring en parámetros
- ✅ Optional chaining (?.) + Nullish coalescing (??)
- ✅ Modules (import/export)

**Nivel alcanzado:** Sintaxis ES6+ AUTOMÁTICA ⭐⭐⭐⭐

**Tiempo invertido:** ~2-3 horas

**Siguiente paso:** Bloque 2 - DOM Manipulation (8 ejercicios)

---

## 📊 PROGRESO SEMANA 2

**Bloque 1:** ✅ COMPLETO (6/6 ejercicios)  
**Bloque 2:** ⏳ Pendiente (8 ejercicios)

---

**Cuando completes los 6 ejercicios del Bloque 1, avisame y te genero el Bloque 2 (DOM Manipulation).** 🚀
