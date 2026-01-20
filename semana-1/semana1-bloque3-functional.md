# 🔥 WARMUP SEMANA 1 - BLOQUE 3: Functional Programming

**Duración:** 2-3 horas  
**Ejercicios:** 15-16  
**Objetivo:** Dominar pure functions e immutability - Mindset funcional necesario para código profesional

---

## 📋 ÍNDICE DE EJERCICIOS

15. Pure functions - Funciones sin side effects
16. Immutability - Evitar mutaciones, crear nuevas referencias

---

## 🎯 OBJETIVO DEL BLOQUE

Al completar estos ejercicios vas a:
- ✅ Escribir pure functions automáticamente
- ✅ Pensar en inmutabilidad por defecto
- ✅ Evitar bugs por mutaciones accidentales
- ✅ Código más testeable y predecible

**Este mindset es FUNDAMENTAL para React y desarrollo moderno.**

---

## ⏱️ GOVERNOR ACTIVO

- Máximo 30-40 min por ejercicio (son conceptuales)
- Si entendés el concepto → NEXT
- No iterar buscando perfección
- Objetivo: CAMBIO DE MINDSET

---

# EJERCICIO 15: Pure Functions

⏱️ **TIEMPO LÍMITE:** 30-40 min

---

## 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Pure vs Impure Functions
// ============================================

// ============================================
// DEFINICIÓN: ¿Qué es una Pure Function?
// ============================================
// 1. Mismo input → SIEMPRE mismo output (determinística)
// 2. NO produce side effects (no modifica nada externo)
// 3. NO depende de estado externo (solo de sus parámetros)

// ============================================
// IMPURE FUNCTION (con side effects)
// ============================================

let contador = 0;  // Estado externo

function incrementarImpure() {
    contador++;  // ✗ Modifica estado externo (side effect)
    return contador;
}

console.log(incrementarImpure());  // 1
console.log(incrementarImpure());  // 2
console.log(incrementarImpure());  // 3
// Mismo input (nada) → diferente output cada vez ✗

// ============================================
// PURE FUNCTION (sin side effects)
// ============================================

function incrementarPure(numero) {
    return numero + 1;  // ✓ Solo retorna valor, no modifica nada
}

console.log(incrementarPure(0));  // 1
console.log(incrementarPure(0));  // 1
console.log(incrementarPure(0));  // 1
// Mismo input (0) → siempre mismo output (1) ✓

// ============================================
// EJEMPLO 2: Modificar arrays
// ============================================

const numeros = [1, 2, 3, 4, 5];

// IMPURE: Modifica array original
function doblarImpure(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i] * 2;  // ✗ Modifica el array que recibió
    }
    return arr;
}

const resultado1 = doblarImpure(numeros);
console.log(numeros);    // [2, 4, 6, 8, 10] ✗ (original modificado)
console.log(resultado1); // [2, 4, 6, 8, 10]

// PURE: Crea nuevo array
function doblarPure(arr) {
    return arr.map(n => n * 2);  // ✓ Crea NUEVO array
}

const numeros2 = [1, 2, 3, 4, 5];
const resultado2 = doblarPure(numeros2);
console.log(numeros2);   // [1, 2, 3, 4, 5] ✓ (original intacto)
console.log(resultado2); // [2, 4, 6, 8, 10]

// ============================================
// EJEMPLO 3: Modificar objetos
// ============================================

const usuario = { nombre: 'Ana', edad: 25 };

// IMPURE: Modifica objeto original
function cumpleañosImpure(user) {
    user.edad++;  // ✗ Modifica el objeto que recibió
    return user;
}

// PURE: Crea nuevo objeto
function cumpleañosPure(user) {
    return {
        ...user,      // ✓ Clona el objeto
        edad: user.edad + 1  // ✓ Modifica solo la copia
    };
}

const usuario2 = { nombre: 'Ana', edad: 25 };
const usuarioActualizado = cumpleañosPure(usuario2);
console.log(usuario2);            // { nombre: 'Ana', edad: 25 } ✓
console.log(usuarioActualizado);  // { nombre: 'Ana', edad: 26 }

// ============================================
// SIDE EFFECTS COMUNES (evitar en pure functions)
// ============================================

// 1. Modificar variables externas
let total = 0;
function sumarImpure(n) {
    total += n;  // ✗ Side effect
}

// 2. Modificar parámetros (arrays, objetos)
function modificarArrayImpure(arr) {
    arr.push(10);  // ✗ Side effect
}

// 3. Console.log, alerts, DOM manipulation
function calcularImpure(a, b) {
    console.log('Calculando...');  // ✗ Side effect
    return a + b;
}

// 4. Llamadas a APIs, acceso a DB
function obtenerDatosImpure() {
    fetch('/api/datos');  // ✗ Side effect (I/O)
}

// 5. Math.random(), Date.now() (no determinístico)
function randomImpure() {
    return Math.random();  // ✗ Mismo input → diferente output
}

// ============================================
// BENEFICIOS DE PURE FUNCTIONS
// ============================================

// 1. TESTEABLES: Fácil escribir tests
function sumar(a, b) {
    return a + b;
}
// Test: sumar(2, 3) === 5 (siempre)

// 2. PREDECIBLES: Sabes qué hace sin leer todo el código
// sumar(2, 3) → siempre 5, no importa cuándo/dónde se llame

// 3. CACHEABLE: Mismo input → podés guardar el resultado
const cache = {};
function sumarConCache(a, b) {
    const key = `${a},${b}`;
    if (!cache[key]) {
        cache[key] = a + b;  // Calcular solo una vez
    }
    return cache[key];
}

// 4. PARALELIZABLE: Podés ejecutar en paralelo sin riesgo
// No hay side effects → no hay race conditions

// 5. DEBUGGEABLE: Fácil encontrar bugs
// Si hay bug → está en la función, no en estado externo
```

**Diagrama:**

```
IMPURE FUNCTION:
    ┌─────────────────┐
    │   Function      │
    │                 │
    │  Modifica  ←────┼──── Variable externa
    │  estado         │
    │  externo        │
    └─────────────────┘
         ↓
    Mismo input → Diferente output ✗

PURE FUNCTION:
    ┌─────────────────┐
    │   Function      │
    │                 │
    │  Solo usa  ─────┼──── Parámetros
    │  parámetros     │
    │                 │
    └─────────────────┘
         ↓
    Mismo input → Siempre mismo output ✓
```

**Analogía:**
- **Pure function:** Como una calculadora. 2+2 siempre es 4, no importa cuándo la uses.
- **Impure function:** Como un contador bancario. El resultado depende del historial de transacciones.

---

## 🎯 TU TURNO:

**CONSIGNA:**
Convertir funciones impuras en puras

**TAREAS:**

1. Convertir función impura de sumar a array
2. Convertir función impura de actualizar usuario
3. Convertir función impura de filtrar productos
4. Identificar cuáles son pure y cuáles impure

**PLANTILLA:**

```javascript
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
console.log('Función 1 es:', /* 'pure' o 'impure' */);
console.log('Función 2 es:', /* 'pure' o 'impure' */);
console.log('Función 3 es:', /* 'pure' o 'impure' */);
console.log('Función 4 es:', /* 'pure' o 'impure' */);
console.log('Función 5 es:', /* 'pure' o 'impure' */);
console.log('Función 6 es:', /* 'pure' o 'impure' */);
```

**RESULTADO ESPERADO:**

```
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
```

---

## 💡 HINTS:

**Hint 1 (Tarea 1):**
```javascript
return [...arr, num];  // Spread del array + nuevo elemento
```

**Hint 2 (Tarea 2):**
```javascript
return {
    ...usuario,
    edad: usuario.edad + 1
};
```

**Hint 3 (Tarea 3):**
```javascript
return arr.filter(p => p.precio > minimo);
// Todo lo que necesita está en los parámetros
```

**Hint 4 (Tarea 4):**
- Pure: 1, 3
- Impure: 2 (modifica externa), 4 (modifica array), 5 (Date.now()), 6 (console.log)

---

## ✅ CHECKLIST:

- [ ] Funciones puras no modifican originales
- [ ] Entendés diferencia entre pure e impure
- [ ] Identificás side effects automáticamente
- [ ] Preferís pure functions por defecto

---

## 🎓 REGLAS PRÁCTICAS:

**Cómo escribir pure functions:**

1. ✅ **Solo usar parámetros** (no variables externas)
2. ✅ **Siempre retornar** (no modificar por referencia)
3. ✅ **Clonar antes de modificar** (arrays/objects)
4. ✅ **No side effects** (no console.log, no DOM, no APIs en la función pura)
5. ✅ **Determinístico** (mismo input → mismo output)

**Cuándo está bien ser impure:**

- Event handlers (inevitablemente tienen side effects)
- Funciones de setup/inicialización
- Llamadas a APIs (pero separar la lógica pura)
- Logging/debugging temporal

**Pattern común:**
```javascript
// Lógica pura (fácil de testear)
function calcularTotal(productos) {
    return productos.reduce((sum, p) => sum + p.precio, 0);
}

// Side effect aislado
function mostrarTotal(productos) {
    const total = calcularTotal(productos);  // Lógica pura
    console.log(`Total: $${total}`);         // Side effect
}
```

---

# EJERCICIO 16: Immutability

⏱️ **TIEMPO LÍMITE:** 30-40 min

---

## 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Evitar mutaciones
// ============================================

// ============================================
// DEFINICIÓN: ¿Qué es Immutability?
// ============================================
// - NO modificar datos existentes
// - CREAR nuevas copias con cambios
// - Mantener historial de estados

// ============================================
// PROBLEMA: Mutaciones accidentales
// ============================================

const usuario = { nombre: 'Ana', edad: 25 };

// MUTACIÓN (mal - modifica original)
const usuarioModificado = usuario;
usuarioModificado.edad = 26;

console.log(usuario.edad);  // 26 ✗ (original cambió sin querer)
console.log(usuarioModificado.edad);  // 26

// Problema: usuarioModificado NO es una copia, es la MISMA referencia

// ============================================
// SOLUCIÓN: Copias inmutables (bien)
// ============================================

const usuario2 = { nombre: 'Carlos', edad: 30 };

// CREAR NUEVA COPIA (bien)
const usuario2Actualizado = {
    ...usuario2,
    edad: 31
};

console.log(usuario2.edad);  // 30 ✓ (original intacto)
console.log(usuario2Actualizado.edad);  // 31

// ============================================
// ARRAYS: Mutaciones vs Inmutabilidad
// ============================================

const numeros = [1, 2, 3, 4, 5];

// ============================================
// MÉTODOS QUE MUTAN (evitar)
// ============================================

// push, pop, shift, unshift, splice, sort, reverse

const arr1 = [1, 2, 3];
arr1.push(4);  // ✗ Modifica arr1
console.log(arr1);  // [1, 2, 3, 4]

const arr2 = [3, 1, 2];
arr2.sort();  // ✗ Modifica arr2
console.log(arr2);  // [1, 2, 3]

// ============================================
// ALTERNATIVAS INMUTABLES (usar)
// ============================================

// AGREGAR elemento (push → spread + elemento)
const original = [1, 2, 3];
const conNuevo = [...original, 4];  // ✓ Crea nuevo array
console.log(original);  // [1, 2, 3] ✓
console.log(conNuevo);  // [1, 2, 3, 4]

// REMOVER elemento (sin splice)
const numeros2 = [1, 2, 3, 4, 5];
const index = 2;  // Queremos remover el 3
const sinElemento = [
    ...numeros2.slice(0, index),
    ...numeros2.slice(index + 1)
];
console.log(numeros2);      // [1, 2, 3, 4, 5] ✓
console.log(sinElemento);   // [1, 2, 4, 5]

// O usar filter
const sinTres = numeros2.filter(n => n !== 3);
console.log(sinTres);  // [1, 2, 4, 5]

// ACTUALIZAR elemento
const numeros3 = [10, 20, 30, 40];
const indexToUpdate = 1;  // Actualizar 20 → 25
const actualizado = numeros3.map((n, i) => i === indexToUpdate ? 25 : n);
console.log(numeros3);     // [10, 20, 30, 40] ✓
console.log(actualizado);  // [10, 25, 30, 40]

// ORDENAR (sort → toSorted o spread + sort)
const desordenado = [3, 1, 4, 1, 5];
const ordenado = [...desordenado].sort();  // Copia primero, luego ordena
console.log(desordenado);  // [3, 1, 4, 1, 5] ✓
console.log(ordenado);     // [1, 1, 3, 4, 5]

// ============================================
// OBJETOS: Actualizaciones inmutables
// ============================================

const producto = {
    id: 1,
    nombre: 'Laptop',
    precio: 1000,
    detalles: {
        marca: 'Dell',
        modelo: 'XPS 13'
    }
};

// ACTUALIZAR propiedad de primer nivel
const productoConDescuento = {
    ...producto,
    precio: 900
};

console.log(producto.precio);           // 1000 ✓
console.log(productoConDescuento.precio);  // 900

// ACTUALIZAR propiedad ANIDADA (importante!)
const productoConNuevaMarca = {
    ...producto,
    detalles: {
        ...producto.detalles,  // Clonar detalles también
        marca: 'HP'
    }
};

console.log(producto.detalles.marca);          // 'Dell' ✓
console.log(productoConNuevaMarca.detalles.marca);  // 'HP'

// ============================================
// ARRAYS DE OBJETOS: Actualizar elemento
// ============================================

const productos = [
    { id: 1, nombre: 'Laptop', precio: 1000 },
    { id: 2, nombre: 'Mouse', precio: 25 },
    { id: 3, nombre: 'Teclado', precio: 75 }
];

// Actualizar precio del producto con id: 2
const productosActualizados = productos.map(producto =>
    producto.id === 2
        ? { ...producto, precio: 30 }  // Actualizar este
        : producto                      // Mantener los demás
);

console.log(productos[1].precio);             // 25 ✓
console.log(productosActualizados[1].precio); // 30

// ============================================
// POR QUÉ ES IMPORTANTE (React, Redux, etc.)
// ============================================

// En React, los cambios se detectan comparando referencias:
const state1 = { count: 0 };
const state2 = state1;
state2.count = 1;

console.log(state1 === state2);  // true (misma referencia)
// React NO detecta el cambio porque la referencia no cambió ✗

// Con inmutabilidad:
const state3 = { count: 0 };
const state4 = { ...state3, count: 1 };  // Nueva referencia

console.log(state3 === state4);  // false (diferente referencia)
// React DETECTA el cambio porque la referencia cambió ✓
```

**Diagrama:**

```
MUTACIÓN (mal):
original ──┐
           ├──→ { edad: 25 }
modificado ┘
           ↓
        { edad: 26 }  ← Ambos apuntan al mismo objeto


INMUTABILIDAD (bien):
original ────→ { edad: 25 }  ← Original intacto

nuevo ───────→ { edad: 26 }  ← Nuevo objeto
```

**Tabla de referencia:**

| Operación | Mutable (evitar) | Inmutable (usar) |
|-----------|------------------|------------------|
| Agregar elemento | `arr.push(x)` | `[...arr, x]` |
| Remover elemento | `arr.splice(i, 1)` | `arr.filter((_, idx) => idx !== i)` |
| Actualizar elemento | `arr[i] = x` | `arr.map((el, idx) => idx === i ? x : el)` |
| Ordenar | `arr.sort()` | `[...arr].sort()` |
| Actualizar objeto | `obj.prop = x` | `{ ...obj, prop: x }` |

---

## 🎯 TU TURNO:

**CONSIGNA:**
Implementar operaciones inmutables

**TAREAS:**

1. Agregar elemento a array sin mutarlo
2. Remover elemento de array sin mutarlo
3. Actualizar elemento en array de objetos
4. Actualizar propiedad anidada en objeto

**PLANTILLA:**

```javascript
// ============================================
// EJERCICIO 16: Immutability
// ============================================

// TAREA 1: Agregar elemento sin mutar

const frutas = ['manzana', 'banana', 'naranja'];

// MAL (muta el original)
// frutas.push('uva');

// BIEN (crea nuevo array)
const frutasConUva = /* TU CÓDIGO AQUÍ */;

console.log('Tarea 1 - Original:', frutas);      // ['manzana', 'banana', 'naranja']
console.log('Tarea 1 - Nuevo:', frutasConUva);   // ['manzana', 'banana', 'naranja', 'uva']

// ============================================

// TAREA 2: Remover elemento sin mutar

const numeros = [10, 20, 30, 40, 50];
const indexToRemove = 2;  // Remover 30

// MAL (muta el original)
// numeros.splice(indexToRemove, 1);

// BIEN (crea nuevo array)
const numerosSin30 = /* TU CÓDIGO AQUÍ */;
// Pista: usar filter con índice

console.log('Tarea 2 - Original:', numeros);       // [10, 20, 30, 40, 50]
console.log('Tarea 2 - Sin 30:', numerosSin30);    // [10, 20, 40, 50]

// ============================================

// TAREA 3: Actualizar elemento en array de objetos

const productos = [
    { id: 1, nombre: 'Laptop', precio: 1000 },
    { id: 2, nombre: 'Mouse', precio: 25 },
    { id: 3, nombre: 'Teclado', precio: 75 }
];

// Actualizar precio del producto id: 2 a 30

const productosActualizados = /* TU CÓDIGO AQUÍ */;
// Pista: usar map, verificar id, spread operator

console.log('Tarea 3 - Original:', productos[1]);           // { id: 2, nombre: 'Mouse', precio: 25 }
console.log('Tarea 3 - Actualizado:', productosActualizados[1]);  // { id: 2, nombre: 'Mouse', precio: 30 }

// ============================================

// TAREA 4: Actualizar propiedad anidada

const usuario = {
    nombre: 'Ana',
    edad: 25,
    direccion: {
        calle: 'Av. Corrientes',
        ciudad: 'Buenos Aires',
        pais: 'Argentina'
    },
    contacto: {
        email: 'ana@email.com',
        telefono: '123456789'
    }
};

// Actualizar ciudad a 'Córdoba'

const usuarioConNuevaCiudad = /* TU CÓDIGO AQUÍ */;
// Pista: spread del objeto padre, spread del objeto anidado

console.log('Tarea 4 - Original:', usuario.direccion.ciudad);              // 'Buenos Aires'
console.log('Tarea 4 - Actualizado:', usuarioConNuevaCiudad.direccion.ciudad);  // 'Córdoba'

// ============================================

// TAREA 5: Verificar inmutabilidad

// Si hiciste todo bien, estas comparaciones deben ser true:
console.log('Frutas original intacto?', frutas.length === 3);
console.log('Números original intacto?', numeros.includes(30));
console.log('Productos original intacto?', productos[1].precio === 25);
console.log('Usuario original intacto?', usuario.direccion.ciudad === 'Buenos Aires');
```

**RESULTADO ESPERADO:**

```
Tarea 1 - Original: ['manzana', 'banana', 'naranja']
Tarea 1 - Nuevo: ['manzana', 'banana', 'naranja', 'uva']
Tarea 2 - Original: [10, 20, 30, 40, 50]
Tarea 2 - Sin 30: [10, 20, 40, 50]
Tarea 3 - Original: { id: 2, nombre: 'Mouse', precio: 25 }
Tarea 3 - Actualizado: { id: 2, nombre: 'Mouse', precio: 30 }
Tarea 4 - Original: Buenos Aires
Tarea 4 - Actualizado: Córdoba

Frutas original intacto? true
Números original intacto? true
Productos original intacto? true
Usuario original intacto? true
```

---

## 💡 HINTS:

**Hint 1 (Tarea 1):**
```javascript
const frutasConUva = [...frutas, 'uva'];
```

**Hint 2 (Tarea 2):**
```javascript
const numerosSin30 = numeros.filter((_, index) => index !== indexToRemove);
```

**Hint 3 (Tarea 3):**
```javascript
const productosActualizados = productos.map(producto =>
    producto.id === 2
        ? { ...producto, precio: 30 }
        : producto
);
```

**Hint 4 (Tarea 4):**
```javascript
const usuarioConNuevaCiudad = {
    ...usuario,
    direccion: {
        ...usuario.direccion,
        ciudad: 'Córdoba'
    }
};
```

---

## ✅ CHECKLIST:

- [ ] Todas las operaciones NO mutan originales
- [ ] Verificaciones de inmutabilidad son true
- [ ] Entendés cómo clonar objetos anidados
- [ ] Prefieres inmutabilidad por defecto

---

## 🎓 REGLAS PRÁCTICAS DE INMUTABILIDAD:

**DO (hacer):**
- ✅ `[...arr, elemento]` para agregar
- ✅ `arr.filter()` para remover
- ✅ `arr.map()` para actualizar
- ✅ `{ ...obj, prop: valor }` para objetos
- ✅ Clonar CADA nivel de objetos anidados

**DON'T (evitar):**
- ❌ `arr.push()`, `arr.pop()`, `arr.splice()`
- ❌ `arr.sort()`, `arr.reverse()` (sin clonar primero)
- ❌ `obj.prop = valor`
- ❌ Modificar parámetros de funciones

**Casos especiales:**
- Ordenar: `[...arr].sort()` (clonar primero)
- Performance: Si array es GIGANTE (>10k elementos) y performance crítico, considerar mutación controlada
- Debugging: Mutación temporal está OK, pero eliminar después

**Por qué importa:**
- React detecta cambios por referencia
- Bugs de sincronización (dos partes usan misma referencia)
- Time-travel debugging (guardar historial)
- Código más predecible y testeable

---

## 🎓 RESUMEN DEL BLOQUE 3

**Conceptos dominados:**
- ✅ Pure functions (sin side effects)
- ✅ Immutability (no mutaciones)
- ✅ Mindset funcional
- ✅ Código testeable y predecible

**Nivel alcanzado:** Functional programming MINDSET activado

**Tiempo invertido:** ~2-3 horas

**Siguiente paso:** Proyecto 1 - Data Transformer & Analyzer

---

## 📊 PROGRESO TOTAL WARMUP

**Bloque 1:** ✅ Completado (8 ejercicios - Arrays)  
**Bloque 2:** ✅ Completado (6 ejercicios - Objects)  
**Bloque 3:** ✅ Completado (2 ejercicios - Functional)

**Total Warmup Semana 1:** 16/16 ejercicios (100%) ✅

---

## 🎉 ¡WARMUP COMPLETADO!

**Habilidades desbloqueadas:**
- ✅ map, filter, reduce → AUTOMÁTICOS
- ✅ Destructuring, spread, rest → AUTOMÁTICOS
- ✅ Object methods → AUTOMÁTICOS
- ✅ Pure functions → MINDSET
- ✅ Immutability → MINDSET

**Estás listo para:** Proyecto 1 - Data Transformer & Analyzer

**Tiempo total invertido:** ~9-12 horas

---

## 🚀 PRÓXIMO PASO

Una vez que completes el Bloque 3, avisame y pasamos al **Proyecto 1** donde vas a aplicar TODOS estos conceptos en una aplicación real.

El proyecto va a ser:
- Procesar datasets complejos (como APIs reales)
- Filtros, transformaciones, estadísticas
- Visualización de resultados
- Arquitectura profesional

**¡Excelente trabajo completando el warmup!** 🎉
