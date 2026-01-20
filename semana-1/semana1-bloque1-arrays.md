# 🔥 WARMUP SEMANA 1 - BLOQUE 1: Arrays Methods

**Duración:** 3-4 horas  
**Ejercicios:** 1-8  
**Objetivo:** Dominar map, filter, reduce, chaining, find/some/every hasta que sean AUTOMÁTICOS

---

## 📋 ÍNDICE DE EJERCICIOS

1. map() básico - Transformar array simple
2. map() complejo - Transformar objetos en array
3. filter() básico - Filtrar números pares/impares
4. filter() complejo - Filtrar objetos por múltiples condiciones
5. reduce() suma/producto - Acumular valores numéricos
6. reduce() a objeto - Transformar array a objeto
7. Chaining methods - map → filter → reduce en cadena
8. find/findIndex/some/every - Búsquedas y verificaciones

---

## 🎯 OBJETIVO DEL BLOQUE

Al completar estos ejercicios vas a:
- ✅ Usar map/filter/reduce sin pensar
- ✅ Transformar datos automáticamente
- ✅ Encadenar métodos eficientemente
- ✅ Buscar y verificar elementos

**Este es el 80% de lo que hacés con arrays en desarrollo real.**

---

## ⏱️ GOVERNOR ACTIVO

- Máximo 20-30 min por ejercicio
- Si funciona → NEXT
- No iterar buscando perfección
- Objetivo: MUSCLE MEMORY

---

# EJERCICIO 1: map() básico

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

## 📖 EJEMPLO RESUELTO (estudiá esto primero):

```javascript
// ============================================
// EJEMPLO: Convertir temperaturas de Celsius a Fahrenheit
// ============================================

// 1. Tenemos temperaturas en Celsius
const temperaturasCelsius = [0, 10, 20, 30, 40];

// 2. Transformamos cada temperatura a Fahrenheit
const temperaturasFahrenheit = temperaturasCelsius.map(function(celsius) {
    // Fórmula: (Celsius × 9/5) + 32 = Fahrenheit
    const fahrenheit = (celsius * 9/5) + 32;
    return fahrenheit;
});

console.log(temperaturasCelsius);     // [0, 10, 20, 30, 40]
console.log(temperaturasFahrenheit);  // [32, 50, 68, 86, 104]

// ============================================
// ¿CÓMO FUNCIONA map()?
// ============================================
// 1. map() RECORRE cada elemento del array original
// 2. EJECUTA la función que le pasaste con cada elemento
// 3. GUARDA lo que retorna la función en un NUEVO array
// 4. RETORNA el nuevo array transformado
//
// IMPORTANTE:
// - NO modifica el array original (inmutabilidad)
// - SIEMPRE retorna un nuevo array
// - El nuevo array tiene la MISMA longitud que el original
```

**Diagrama del flujo:**

```
temperaturasCelsius = [0, 10, 20, 30, 40]
                        ↓
                 .map(celsius => ...)
                        ↓
    ┌───────┬───────┬───────┬───────┬───────┐
    │   0   │  10   │  20   │  30   │  40   │
    │   ↓   │   ↓   │   ↓   │   ↓   │   ↓   │
    │  32   │  50   │  68   │  86   │  104  │
    └───────┴───────┴───────┴───────┴───────┘
                        ↓
temperaturasFahrenheit = [32, 50, 68, 86, 104]
```

**Analogía:**
Imaginá una fábrica con cinta transportadora:
- Ponés productos crudos (array original)
- Cada producto pasa por una máquina transformadora (la función)
- Obtenés productos transformados en otra cinta (nuevo array)
- Los originales siguen intactos (inmutabilidad)

---

## 🎯 TU TURNO:

**CONSIGNA:**
Convertir precios de USD a ARS

**Datos:**
- Precios en dólares: `[10, 25, 50, 100, 200]`
- Tipo de cambio: 1 USD = 350 ARS

**PLANTILLA:**

```javascript
// ============================================
// EJERCICIO 1: Convertir precios USD a ARS
// ============================================

const preciosEnDolares = [10, 25, 50, 100, 200];
const tipoDeCambio = 350;

const preciosEnPesos = preciosEnDolares.map(function(precioUSD) {
    // TU CÓDIGO AQUÍ
    // Multiplicar precioUSD por tipoDeCambio
    // Retornar el resultado
});

console.log('Precios en USD:', preciosEnDolares);
console.log('Precios en ARS:', preciosEnPesos);
```

**RESULTADO ESPERADO:**
```
Precios en USD: [10, 25, 50, 100, 200]
Precios en ARS: [3500, 8750, 17500, 35000, 70000]
```

---

## 💡 HINTS (solo si te trabás >15 min):

**Hint 1 (conceptual):**
- map() ejecuta tu función UNA VEZ por cada elemento
- Lo que RETORNES va al nuevo array
- Fórmula: `precioUSD * tipoDeCambio = precioARS`

**Hint 2 (más específico):**
- Dentro de la función tenés acceso a `precioUSD` (parámetro)
- También tenés acceso a `tipoDeCambio` (scope superior)
- Hacé la multiplicación y retorná el resultado

**Hint 3 (estructura):**
```javascript
const preciosEnPesos = preciosEnDolares.map(function(precioUSD) {
    return precioUSD * tipoDeCambio;
});
```

---

## ✅ CHECKLIST:

- [ ] El código se ejecuta sin errores
- [ ] Resultado coincide con lo esperado
- [ ] Array original NO se modificó
- [ ] Entendés POR QUÉ funciona

---

## 🔥 DESAFÍO EXTRA (opcional):

Reescribí usando arrow function (sintaxis moderna):

```javascript
const preciosEnPesos = preciosEnDolares.map(precioUSD => precioUSD * tipoDeCambio);
```

---

# EJERCICIO 2: map() complejo

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

## 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Extraer información de usuarios
// ============================================

// 1. Tenemos array de objetos (usuarios)
const usuarios = [
    { id: 1, nombre: 'Ana', edad: 25, ciudad: 'Buenos Aires' },
    { id: 2, nombre: 'Carlos', edad: 30, ciudad: 'Córdoba' },
    { id: 3, nombre: 'Lucía', edad: 28, ciudad: 'Rosario' }
];

// ============================================
// CASO 1: Extraer solo nombres (array de strings)
// ============================================

const nombres = usuarios.map(function(usuario) {
    // Accedemos a la propiedad 'nombre' de cada objeto
    return usuario.nombre;
});

console.log(nombres);  // ['Ana', 'Carlos', 'Lucía']

// ============================================
// CASO 2: Crear nuevos objetos transformados
// ============================================

// Queremos: { nombre, esMayorDe25 }
const usuariosSimplificados = usuarios.map(function(usuario) {
    // Creamos un NUEVO objeto con propiedades específicas
    return {
        nombre: usuario.nombre,
        esMayorDe25: usuario.edad > 25
    };
});

console.log(usuariosSimplificados);
// [
//   { nombre: 'Ana', esMayorDe25: false },
//   { nombre: 'Carlos', esMayorDe25: true },
//   { nombre: 'Lucía', esMayorDe25: true }
// ]

// ============================================
// ¿CÓMO FUNCIONA con objetos?
// ============================================
// 1. map() recorre cada objeto del array
// 2. Accedés a las propiedades con notación punto: usuario.nombre
// 3. Podés retornar un valor primitivo (string, number, boolean)
// 4. O podés retornar un NUEVO objeto con propiedades transformadas
// 5. NUNCA modificar el objeto original (inmutabilidad)
```

**Diagrama:**

```
Opción 1: Extraer propiedad
[{nombre:'Ana'}, {nombre:'Carlos'}]
          ↓
    .map(u => u.nombre)
          ↓
    ['Ana', 'Carlos']

Opción 2: Crear nuevo objeto
[{nombre:'Ana', edad:25}]
          ↓
    .map(u => ({nombre: u.nombre, esMayor: u.edad > 25}))
          ↓
    [{nombre:'Ana', esMayor:false}]
```

---

## 🎯 TU TURNO:

**CONSIGNA:**
Transformar información de productos

**Datos:**

```javascript
const productos = [
    { id: 1, nombre: 'Laptop', precio: 1000, stock: 5 },
    { id: 2, nombre: 'Mouse', precio: 25, stock: 20 },
    { id: 3, nombre: 'Teclado', precio: 75, stock: 15 },
    { id: 4, nombre: 'Monitor', precio: 300, stock: 8 }
];
```

**TAREAS:**

1. Extraer solo los nombres de productos (array de strings)
2. Crear array de objetos simplificados: `{ nombre, total }` donde `total = precio * stock`

**PLANTILLA:**

```javascript
// ============================================
// EJERCICIO 2: Transformar productos
// ============================================

const productos = [
    { id: 1, nombre: 'Laptop', precio: 1000, stock: 5 },
    { id: 2, nombre: 'Mouse', precio: 25, stock: 20 },
    { id: 3, nombre: 'Teclado', precio: 75, stock: 15 },
    { id: 4, nombre: 'Monitor', precio: 300, stock: 8 }
];

// TAREA 1: Extraer solo nombres
const nombresProductos = productos.map(function(producto) {
    // TU CÓDIGO AQUÍ
    // Retornar solo la propiedad 'nombre'
});

console.log('Nombres:', nombresProductos);

// TAREA 2: Crear objetos { nombre, total }
const productosConTotal = productos.map(function(producto) {
    // TU CÓDIGO AQUÍ
    // Retornar nuevo objeto con:
    // - nombre: producto.nombre
    // - total: producto.precio * producto.stock
});

console.log('Con total:', productosConTotal);
```

**RESULTADO ESPERADO:**

```
Nombres: ['Laptop', 'Mouse', 'Teclado', 'Monitor']

Con total: [
  { nombre: 'Laptop', total: 5000 },
  { nombre: 'Mouse', total: 500 },
  { nombre: 'Teclado', total: 1125 },
  { nombre: 'Monitor', total: 2400 }
]
```

---

## 💡 HINTS:

**Hint 1 (Tarea 1):**
- Accedé a la propiedad con `producto.nombre`
- Retorná ese valor directamente

**Hint 2 (Tarea 2):**
- Retorná un objeto nuevo: `return { ... }`
- Dentro del objeto: `nombre: producto.nombre, total: ...`
- Calculá el total: `producto.precio * producto.stock`

**Hint 3 (estructura Tarea 2):**
```javascript
return {
    nombre: producto.nombre,
    total: producto.precio * producto.stock
};
```

---

## ✅ CHECKLIST:

- [ ] Tarea 1 retorna array de strings
- [ ] Tarea 2 retorna array de objetos
- [ ] Los totales son correctos
- [ ] Array original NO se modificó

---

# EJERCICIO 3: filter() básico

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

## 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Filtrar números pares
// ============================================

// 1. Tenemos números mezclados
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 2. Queremos solo los pares
const numerosPares = numeros.filter(function(numero) {
    // Verificamos si es par (resto de división por 2 es 0)
    return numero % 2 === 0;  // Si esto es TRUE, el número PASA el filtro
});

console.log(numeros);       // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(numerosPares);  // [2, 4, 6, 8, 10]

// ============================================
// ¿CÓMO FUNCIONA filter()?
// ============================================
// 1. filter() RECORRE cada elemento del array
// 2. EJECUTA la función que le pasaste (debe retornar true/false)
// 3. Si retorna TRUE → el elemento PASA al nuevo array
// 4. Si retorna FALSE → el elemento se DESCARTA
// 5. RETORNA un nuevo array solo con elementos que pasaron el filtro
//
// IMPORTANTE:
// - NO modifica el array original
// - Retorna un NUEVO array
// - El nuevo array puede ser MÁS CORTO (o incluso vacío)
// - La función DEBE retornar boolean (true/false)
```

**Diagrama:**

```
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
              ↓
   .filter(n => n % 2 === 0)
              ↓
    ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬────┐
    │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │ 10 │
    │ ✗ │ ✓ │ ✗ │ ✓ │ ✗ │ ✓ │ ✗ │ ✓ │ ✗ │ ✓  │
    └───┴───┴───┴───┴───┴───┴───┴───┴───┴────┘
              ↓
        [2, 4, 6, 8, 10]
```

**Analogía:**
Imaginá un control de seguridad en el aeropuerto:
- Pasan todas las personas (array original)
- Cada persona pasa por detector (la función)
- Si cumple condiciones → PASA (entra al nuevo array)
- Si NO cumple → QUEDA AFUERA (no entra al nuevo array)

---

## 🎯 TU TURNO:

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

**PLANTILLA:**

```javascript
// ============================================
// EJERCICIO 3: Filtrar números
// ============================================

const numeros = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

// TAREA 1: Mayores a 25
const mayoresA25 = numeros.filter(function(numero) {
    // TU CÓDIGO AQUÍ
    // Retornar: numero > 25
});

console.log('Mayores a 25:', mayoresA25);

// TAREA 2: Impares
const impares = numeros.filter(function(numero) {
    // TU CÓDIGO AQUÍ
    // Retornar: numero % 2 !== 0
});

console.log('Impares:', impares);

// TAREA 3: Divisibles por 10
const divisiblesPor10 = numeros.filter(function(numero) {
    // TU CÓDIGO AQUÍ
    // Retornar: numero % 10 === 0
});

console.log('Divisibles por 10:', divisiblesPor10);
```

**RESULTADO ESPERADO:**

```
Mayores a 25: [30, 35, 40, 45, 50]
Impares: [5, 15, 25, 35, 45]
Divisibles por 10: [10, 20, 30, 40, 50]
```

---

## 💡 HINTS:

**Hint 1:**
- filter() necesita que RETORNES true o false
- Si retornás true → el elemento pasa
- Si retornás false → el elemento se descarta

**Hint 2:**
- Mayor a 25: `numero > 25`
- Impar: `numero % 2 !== 0` (resto diferente de 0)
- Divisible por 10: `numero % 10 === 0` (resto igual a 0)

**Hint 3:**
```javascript
return numero > 25;  // Tarea 1
return numero % 2 !== 0;  // Tarea 2
return numero % 10 === 0;  // Tarea 3
```

---

## ✅ CHECKLIST:

- [ ] Los 3 filtros funcionan correctamente
- [ ] Resultados coinciden con lo esperado
- [ ] Array original NO se modificó
- [ ] Entendés la diferencia entre map() y filter()

---

# EJERCICIO 4: filter() complejo

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

## 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Filtrar usuarios por múltiples condiciones
// ============================================

const usuarios = [
    { nombre: 'Ana', edad: 17, activo: true },
    { nombre: 'Carlos', edad: 25, activo: false },
    { nombre: 'Lucía', edad: 30, activo: true },
    { nombre: 'Pedro', edad: 22, activo: true },
    { nombre: 'María', edad: 16, activo: false }
];

// ============================================
// CASO 1: Una condición (edad >= 18)
// ============================================

const mayoresDeEdad = usuarios.filter(function(usuario) {
    return usuario.edad >= 18;  // Solo pasan mayores de 18
});

console.log(mayoresDeEdad);
// [
//   { nombre: 'Carlos', edad: 25, activo: false },
//   { nombre: 'Lucía', edad: 30, activo: true },
//   { nombre: 'Pedro', edad: 22, activo: true }
// ]

// ============================================
// CASO 2: Múltiples condiciones (AND)
// ============================================

const usuariosActivosMayores = usuarios.filter(function(usuario) {
    // Ambas condiciones deben cumplirse (AND = &&)
    return usuario.edad >= 18 && usuario.activo === true;
});

console.log(usuariosActivosMayores);
// [
//   { nombre: 'Lucía', edad: 30, activo: true },
//   { nombre: 'Pedro', edad: 22, activo: true }
// ]

// ============================================
// CASO 3: Múltiples condiciones (OR)
// ============================================

const menoresOInactivos = usuarios.filter(function(usuario) {
    // Al menos una condición debe cumplirse (OR = ||)
    return usuario.edad < 18 || usuario.activo === false;
});

console.log(menoresOInactivos);
// [
//   { nombre: 'Ana', edad: 17, activo: true },
//   { nombre: 'Carlos', edad: 25, activo: false },
//   { nombre: 'María', edad: 16, activo: false }
// ]

// ============================================
// ¿CÓMO FUNCIONAN LAS CONDICIONES?
// ============================================
// AND (&&): TODAS las condiciones deben ser true
// - true && true = true
// - true && false = false
// - false && false = false
//
// OR (||): AL MENOS UNA condición debe ser true
// - true || false = true
// - false || true = true
// - false || false = false
```

---

## 🎯 TU TURNO:

**CONSIGNA:**
Filtrar productos según múltiples criterios

**Datos:**

```javascript
const productos = [
    { nombre: 'Laptop', precio: 1000, stock: 5, categoria: 'electrónica' },
    { nombre: 'Mouse', precio: 25, stock: 0, categoria: 'electrónica' },
    { nombre: 'Teclado', precio: 75, stock: 15, categoria: 'electrónica' },
    { nombre: 'Monitor', precio: 300, stock: 8, categoria: 'electrónica' },
    { nombre: 'Silla', precio: 150, stock: 3, categoria: 'muebles' },
    { nombre: 'Escritorio', precio: 400, stock: 0, categoria: 'muebles' }
];
```

**TAREAS:**

1. Productos con stock disponible (stock > 0)
2. Productos baratos con stock (precio < 100 Y stock > 0)
3. Productos caros O sin stock (precio > 200 O stock === 0)

**PLANTILLA:**

```javascript
// ============================================
// EJERCICIO 4: Filtrar productos
// ============================================

const productos = [
    { nombre: 'Laptop', precio: 1000, stock: 5, categoria: 'electrónica' },
    { nombre: 'Mouse', precio: 25, stock: 0, categoria: 'electrónica' },
    { nombre: 'Teclado', precio: 75, stock: 15, categoria: 'electrónica' },
    { nombre: 'Monitor', precio: 300, stock: 8, categoria: 'electrónica' },
    { nombre: 'Silla', precio: 150, stock: 3, categoria: 'muebles' },
    { nombre: 'Escritorio', precio: 400, stock: 0, categoria: 'muebles' }
];

// TAREA 1: Con stock
const conStock = productos.filter(function(producto) {
    // TU CÓDIGO AQUÍ
});

console.log('Con stock:', conStock);

// TAREA 2: Baratos con stock (AND)
const baratosConStock = productos.filter(function(producto) {
    // TU CÓDIGO AQUÍ
    // precio < 100 Y stock > 0
});

console.log('Baratos con stock:', baratosConStock);

// TAREA 3: Caros o sin stock (OR)
const carosOSinStock = productos.filter(function(producto) {
    // TU CÓDIGO AQUÍ
    // precio > 200 O stock === 0
});

console.log('Caros o sin stock:', carosOSinStock);
```

**RESULTADO ESPERADO:**

```
Con stock: [
  { nombre: 'Laptop', ... },
  { nombre: 'Teclado', ... },
  { nombre: 'Monitor', ... },
  { nombre: 'Silla', ... }
]

Baratos con stock: [
  { nombre: 'Teclado', precio: 75, stock: 15, ... }
]

Caros o sin stock: [
  { nombre: 'Laptop', ... },
  { nombre: 'Mouse', ... },
  { nombre: 'Monitor', ... },
  { nombre: 'Escritorio', ... }
]
```

---

## 💡 HINTS:

**Hint 1:**
- Tarea 1: Una sola condición `producto.stock > 0`
- Tarea 2: Dos condiciones con AND `condicion1 && condicion2`
- Tarea 3: Dos condiciones con OR `condicion1 || condicion2`

**Hint 2:**
```javascript
// Tarea 1
return producto.stock > 0;

// Tarea 2
return producto.precio < 100 && producto.stock > 0;

// Tarea 3
return producto.precio > 200 || producto.stock === 0;
```

---

## ✅ CHECKLIST:

- [ ] Los 3 filtros funcionan
- [ ] Resultados tienen la cantidad correcta de elementos
- [ ] Entendés la diferencia entre AND (&&) y OR (||)

---

# EJERCICIO 5: reduce() suma/producto

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

## 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Sumar todos los números de un array
// ============================================

const numeros = [10, 20, 30, 40, 50];

// reduce() necesita:
// 1. Una función con dos parámetros: (acumulador, valorActual)
// 2. Un valor inicial para el acumulador

const suma = numeros.reduce(function(acumulador, numero) {
    // En cada iteración:
    // - acumulador: el resultado acumulado hasta ahora
    // - numero: el elemento actual del array
    
    console.log(`Acumulador: ${acumulador}, Número actual: ${numero}`);
    
    return acumulador + numero;  // El nuevo valor del acumulador
}, 0);  // 0 es el valor inicial del acumulador

console.log('Suma total:', suma);  // 150

// ============================================
// ¿CÓMO FUNCIONA reduce()?
// ============================================
// Iteración 1: acumulador = 0,  numero = 10  → retorna 0 + 10 = 10
// Iteración 2: acumulador = 10, numero = 20  → retorna 10 + 20 = 30
// Iteración 3: acumulador = 30, numero = 30  → retorna 30 + 30 = 60
// Iteración 4: acumulador = 60, numero = 40  → retorna 60 + 40 = 100
// Iteración 5: acumulador = 100, numero = 50 → retorna 100 + 50 = 150
//
// Resultado final: 150
```

**Diagrama:**

```
[10, 20, 30, 40, 50]
        ↓
  .reduce((acc, n) => acc + n, 0)
        ↓
  0 + 10 = 10
 10 + 20 = 30
 30 + 30 = 60
 60 + 40 = 100
100 + 50 = 150
        ↓
      150
```

**Analogía:**
Imaginá una bola de nieve rodando por una colina:
- Empieza con tamaño inicial (valor inicial del acumulador)
- Por cada vuelta agarra más nieve (suma el valor actual)
- Al final tenés una bola gigante (el resultado acumulado)

---

## 🎯 TU TURNO:

**CONSIGNA:**
Calcular suma y producto de números

**Datos:**
```javascript
const numeros = [2, 4, 6, 8, 10];
```

**TAREAS:**

1. Calcular la suma total
2. Calcular el producto total (multiplicar todos)
3. Calcular el promedio (suma / cantidad)

**PLANTILLA:**

```javascript
// ============================================
// EJERCICIO 5: reduce() suma/producto
// ============================================

const numeros = [2, 4, 6, 8, 10];

// TAREA 1: Suma total
const suma = numeros.reduce(function(acumulador, numero) {
    // TU CÓDIGO AQUÍ
    // Retornar: acumulador + numero
}, 0);  // Valor inicial: 0

console.log('Suma:', suma);

// TAREA 2: Producto total
const producto = numeros.reduce(function(acumulador, numero) {
    // TU CÓDIGO AQUÍ
    // Retornar: acumulador * numero
}, 1);  // Valor inicial: 1 (no 0, porque 0 * cualquier cosa = 0)

console.log('Producto:', producto);

// TAREA 3: Promedio
const promedio = numeros.reduce(function(acumulador, numero) {
    return acumulador + numero;
}, 0) / numeros.length;  // Dividir suma por cantidad de elementos

console.log('Promedio:', promedio);
```

**RESULTADO ESPERADO:**

```
Suma: 30
Producto: 3840
Promedio: 6
```

---

## 💡 HINTS:

**Hint 1:**
- reduce() siempre necesita un valor inicial (segundo parámetro)
- Para suma: valor inicial = 0
- Para multiplicación: valor inicial = 1

**Hint 2:**
- Suma: `return acumulador + numero`
- Producto: `return acumulador * numero`
- Promedio: primero suma, después divide por `numeros.length`

---

## ✅ CHECKLIST:

- [ ] Los 3 cálculos son correctos
- [ ] Entendés cómo funciona el acumulador
- [ ] Entendés por qué producto usa 1 como inicial (no 0)

---

# EJERCICIO 6: reduce() a objeto

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

## 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO 1: Contar ocurrencias (array → objeto)
// ============================================

const frutas = ['manzana', 'banana', 'manzana', 'naranja', 'banana', 'manzana'];

// Queremos: { manzana: 3, banana: 2, naranja: 1 }

const conteo = frutas.reduce(function(acumulador, fruta) {
    // Si la fruta ya existe en el objeto, incrementar
    // Si no existe, inicializar en 1
    
    if (acumulador[fruta]) {
        acumulador[fruta]++;  // Incrementar
    } else {
        acumulador[fruta] = 1;  // Inicializar
    }
    
    return acumulador;  // Retornar el objeto acumulador
}, {});  // Valor inicial: objeto vacío {}

console.log(conteo);  // { manzana: 3, banana: 2, naranja: 1 }

// ============================================
// VERSIÓN MÁS CORTA (con operador OR)
// ============================================

const conteo2 = frutas.reduce(function(acc, fruta) {
    acc[fruta] = (acc[fruta] || 0) + 1;
    // Si acc[fruta] existe → usar ese valor
    // Si no existe (undefined) → usar 0
    // Después sumar 1
    return acc;
}, {});

// ============================================
// EJEMPLO 2: Agrupar por categoría (groupBy)
// ============================================

const productos = [
    { nombre: 'Laptop', categoria: 'electrónica' },
    { nombre: 'Mouse', categoria: 'electrónica' },
    { nombre: 'Silla', categoria: 'muebles' },
    { nombre: 'Escritorio', categoria: 'muebles' }
];

// Queremos:
// {
//   electrónica: [{ nombre: 'Laptop', ... }, { nombre: 'Mouse', ... }],
//   muebles: [{ nombre: 'Silla', ... }, { nombre: 'Escritorio', ... }]
// }

const agrupados = productos.reduce(function(acc, producto) {
    const categoria = producto.categoria;
    
    // Si la categoría no existe, crear array vacío
    if (!acc[categoria]) {
        acc[categoria] = [];
    }
    
    // Agregar el producto al array de esa categoría
    acc[categoria].push(producto);
    
    return acc;
}, {});

console.log(agrupados);
```

**Diagrama (conteo):**

```
['manzana', 'banana', 'manzana', 'naranja', 'banana', 'manzana']
                            ↓
              .reduce((acc, fruta) => {...}, {})
                            ↓
Iteración 1: {} → { manzana: 1 }
Iteración 2: { manzana: 1 } → { manzana: 1, banana: 1 }
Iteración 3: { manzana: 1, banana: 1 } → { manzana: 2, banana: 1 }
Iteración 4: { manzana: 2, banana: 1 } → { manzana: 2, banana: 1, naranja: 1 }
Iteración 5: { manzana: 2, banana: 1, naranja: 1 } → { manzana: 2, banana: 2, naranja: 1 }
Iteración 6: { manzana: 2, banana: 2, naranja: 1 } → { manzana: 3, banana: 2, naranja: 1 }
                            ↓
            { manzana: 3, banana: 2, naranja: 1 }
```

---

## 🎯 TU TURNO:

**CONSIGNA:**
Transformar arrays en objetos

**TAREAS:**

1. Contar cuántas veces aparece cada color
2. Agrupar usuarios por ciudad

**Datos:**

```javascript
// Tarea 1
const colores = ['rojo', 'azul', 'rojo', 'verde', 'azul', 'rojo', 'amarillo', 'azul'];

// Tarea 2
const usuarios = [
    { nombre: 'Ana', ciudad: 'Buenos Aires' },
    { nombre: 'Carlos', ciudad: 'Córdoba' },
    { nombre: 'Lucía', ciudad: 'Buenos Aires' },
    { nombre: 'Pedro', ciudad: 'Rosario' },
    { nombre: 'María', ciudad: 'Córdoba' }
];
```

**PLANTILLA:**

```javascript
// ============================================
// EJERCICIO 6: reduce() a objeto
// ============================================

// TAREA 1: Contar colores
const colores = ['rojo', 'azul', 'rojo', 'verde', 'azul', 'rojo', 'amarillo', 'azul'];

const conteoColores = colores.reduce(function(acc, color) {
    // TU CÓDIGO AQUÍ
    // Si acc[color] existe → incrementar
    // Si no existe → inicializar en 1
    // Retornar acc
}, {});

console.log('Conteo colores:', conteoColores);

// TAREA 2: Agrupar usuarios por ciudad
const usuarios = [
    { nombre: 'Ana', ciudad: 'Buenos Aires' },
    { nombre: 'Carlos', ciudad: 'Córdoba' },
    { nombre: 'Lucía', ciudad: 'Buenos Aires' },
    { nombre: 'Pedro', ciudad: 'Rosario' },
    { nombre: 'María', ciudad: 'Córdoba' }
];

const usuariosPorCiudad = usuarios.reduce(function(acc, usuario) {
    // TU CÓDIGO AQUÍ
    // 1. Obtener la ciudad del usuario
    // 2. Si acc[ciudad] no existe, crear array vacío
    // 3. Agregar usuario al array de esa ciudad
    // 4. Retornar acc
}, {});

console.log('Usuarios por ciudad:', usuariosPorCiudad);
```

**RESULTADO ESPERADO:**

```
Conteo colores: { rojo: 3, azul: 3, verde: 1, amarillo: 1 }

Usuarios por ciudad: {
  'Buenos Aires': [
    { nombre: 'Ana', ciudad: 'Buenos Aires' },
    { nombre: 'Lucía', ciudad: 'Buenos Aires' }
  ],
  'Córdoba': [
    { nombre: 'Carlos', ciudad: 'Córdoba' },
    { nombre: 'María', ciudad: 'Córdoba' }
  ],
  'Rosario': [
    { nombre: 'Pedro', ciudad: 'Rosario' }
  ]
}
```

---

## 💡 HINTS:

**Hint 1 (Tarea 1 - versión simple):**
```javascript
if (acc[color]) {
    acc[color]++;
} else {
    acc[color] = 1;
}
return acc;
```

**Hint 2 (Tarea 1 - versión corta):**
```javascript
acc[color] = (acc[color] || 0) + 1;
return acc;
```

**Hint 3 (Tarea 2):**
```javascript
const ciudad = usuario.ciudad;
if (!acc[ciudad]) {
    acc[ciudad] = [];
}
acc[ciudad].push(usuario);
return acc;
```

---

## ✅ CHECKLIST:

- [ ] Conteo de colores es correcto
- [ ] Agrupación por ciudad funciona
- [ ] Entendés cómo convertir array a objeto con reduce()

---

# EJERCICIO 7: Chaining methods

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

## 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Encadenar map → filter → reduce
// ============================================

const productos = [
    { nombre: 'Laptop', precio: 1000, stock: 5 },
    { nombre: 'Mouse', precio: 25, stock: 0 },
    { nombre: 'Teclado', precio: 75, stock: 15 },
    { nombre: 'Monitor', precio: 300, stock: 8 }
];

// OBJETIVO: Calcular el valor total de inventario (solo productos con stock)

// ============================================
// OPCIÓN 1: Paso por paso (sin chaining)
// ============================================

// 1. Filtrar productos con stock
const conStock = productos.filter(function(producto) {
    return producto.stock > 0;
});

// 2. Calcular valor (precio * stock) de cada uno
const valoresIndividuales = conStock.map(function(producto) {
    return producto.precio * producto.stock;
});

// 3. Sumar todos los valores
const valorTotal = valoresIndividuales.reduce(function(acc, valor) {
    return acc + valor;
}, 0);

console.log(valorTotal);  // 7075

// ============================================
// OPCIÓN 2: Chaining (encadenado)
// ============================================

const valorTotalEncadenado = productos
    .filter(producto => producto.stock > 0)  // Filtrar con stock
    .map(producto => producto.precio * producto.stock)  // Calcular valores
    .reduce((acc, valor) => acc + valor, 0);  // Sumar todo

console.log(valorTotalEncadenado);  // 7075

// ============================================
// ¿CÓMO FUNCIONA EL CHAINING?
// ============================================
// 1. filter() retorna un NUEVO array
// 2. Ese nuevo array tiene el método .map()
// 3. map() retorna OTRO nuevo array
// 4. Ese array tiene el método .reduce()
// 5. reduce() retorna el valor final
//
// Es como una línea de producción:
// Array original → filter → map → reduce → Valor final
```

**Diagrama:**

```
[
  { nombre: 'Laptop', precio: 1000, stock: 5 },
  { nombre: 'Mouse', precio: 25, stock: 0 },
  { nombre: 'Teclado', precio: 75, stock: 15 },
  { nombre: 'Monitor', precio: 300, stock: 8 }
]
        ↓
  .filter(stock > 0)
        ↓
[
  { nombre: 'Laptop', precio: 1000, stock: 5 },
  { nombre: 'Teclado', precio: 75, stock: 15 },
  { nombre: 'Monitor', precio: 300, stock: 8 }
]
        ↓
  .map(precio * stock)
        ↓
[5000, 1125, 2400]
        ↓
  .reduce((acc, val) => acc + val, 0)
        ↓
     7075
```

---

## 🎯 TU TURNO:

**CONSIGNA:**
Procesar datos de ventas con chaining

**Datos:**

```javascript
const ventas = [
    { producto: 'Laptop', cantidad: 2, precio: 1000, pagado: true },
    { producto: 'Mouse', cantidad: 5, precio: 25, pagado: false },
    { producto: 'Teclado', cantidad: 3, precio: 75, pagado: true },
    { producto: 'Monitor', cantidad: 1, precio: 300, pagado: true },
    { producto: 'Webcam', cantidad: 2, precio: 50, pagado: false }
];
```

**TAREAS:**

1. Calcular total de ventas pagadas (filtrar pagado === true, calcular cantidad * precio, sumar todo)
2. Obtener nombres de productos NO pagados
3. Calcular promedio de precio de productos pagados

**PLANTILLA:**

```javascript
// ============================================
// EJERCICIO 7: Chaining methods
// ============================================

const ventas = [
    { producto: 'Laptop', cantidad: 2, precio: 1000, pagado: true },
    { producto: 'Mouse', cantidad: 5, precio: 25, pagado: false },
    { producto: 'Teclado', cantidad: 3, precio: 75, pagado: true },
    { producto: 'Monitor', cantidad: 1, precio: 300, pagado: true },
    { producto: 'Webcam', cantidad: 2, precio: 50, pagado: false }
];

// TAREA 1: Total de ventas pagadas
const totalVentasPagadas = ventas
    // TU CÓDIGO AQUÍ
    // .filter(venta => venta.pagado === true)
    // .map(venta => venta.cantidad * venta.precio)
    // .reduce((acc, total) => acc + total, 0);

console.log('Total ventas pagadas:', totalVentasPagadas);

// TAREA 2: Nombres de productos NO pagados
const productosNoPagados = ventas
    // TU CÓDIGO AQUÍ
    // .filter(venta => venta.pagado === false)
    // .map(venta => venta.producto);

console.log('Productos no pagados:', productosNoPagados);

// TAREA 3: Promedio de precio de productos pagados
const preciosPagados = ventas
    .filter(venta => venta.pagado === true)
    .map(venta => venta.precio);

const promedioPrecio = preciosPagados.reduce((acc, precio) => acc + precio, 0) / preciosPagados.length;

console.log('Promedio precio pagados:', promedioPrecio);
```

**RESULTADO ESPERADO:**

```
Total ventas pagadas: 2525
Productos no pagados: ['Mouse', 'Webcam']
Promedio precio pagados: 458.33
```

---

## 💡 HINTS:

**Hint 1 (Tarea 1):**
- Filtrar: `venta.pagado === true`
- Mapear: `venta.cantidad * venta.precio`
- Reducir: sumar con valor inicial 0

**Hint 2 (Tarea 2):**
- Filtrar: `venta.pagado === false`
- Mapear: `venta.producto`

**Hint 3 (estructura completa Tarea 1):**
```javascript
const totalVentasPagadas = ventas
    .filter(venta => venta.pagado === true)
    .map(venta => venta.cantidad * venta.precio)
    .reduce((acc, total) => acc + total, 0);
```

---

## ✅ CHECKLIST:

- [ ] Los 3 chaining funcionan correctamente
- [ ] Entendés el flujo: array → método → array → método → resultado
- [ ] Preferís esta sintaxis vs paso por paso

---

# EJERCICIO 8: find/findIndex/some/every

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

## 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Métodos de búsqueda y verificación
// ============================================

const usuarios = [
    { id: 1, nombre: 'Ana', edad: 25, activo: true },
    { id: 2, nombre: 'Carlos', edad: 17, activo: false },
    { id: 3, nombre: 'Lucía', edad: 30, activo: true },
    { id: 4, nombre: 'Pedro', edad: 22, activo: true }
];

// ============================================
// find(): Encuentra el PRIMER elemento que cumple la condición
// Retorna: el elemento completo o undefined
// ============================================

const usuarioConId2 = usuarios.find(function(usuario) {
    return usuario.id === 2;
});

console.log(usuarioConId2);
// { id: 2, nombre: 'Carlos', edad: 17, activo: false }

const usuarioMayorDe28 = usuarios.find(usuario => usuario.edad > 28);
console.log(usuarioMayorDe28);
// { id: 3, nombre: 'Lucía', edad: 30, activo: true }
// (solo retorna el PRIMERO que encuentra)

// ============================================
// findIndex(): Encuentra el ÍNDICE del primer elemento
// Retorna: el índice (número) o -1 si no encuentra
// ============================================

const indexDeCarlos = usuarios.findIndex(usuario => usuario.nombre === 'Carlos');
console.log(indexDeCarlos);  // 1

const indexInexistente = usuarios.findIndex(usuario => usuario.edad > 100);
console.log(indexInexistente);  // -1

// ============================================
// some(): Verifica si AL MENOS UNO cumple la condición
// Retorna: true o false
// ============================================

const hayMenorDeEdad = usuarios.some(usuario => usuario.edad < 18);
console.log(hayMenorDeEdad);  // true (Carlos tiene 17)

const hayMayorDe50 = usuarios.some(usuario => usuario.edad > 50);
console.log(hayMayorDe50);  // false

// ============================================
// every(): Verifica si TODOS cumplen la condición
// Retorna: true o false
// ============================================

const todosSonActivos = usuarios.every(usuario => usuario.activo === true);
console.log(todosSonActivos);  // false (Carlos no está activo)

const todosTienenId = usuarios.every(usuario => usuario.id > 0);
console.log(todosTienenId);  // true

// ============================================
// RESUMEN RÁPIDO:
// ============================================
// find()      → Primer ELEMENTO que cumple (o undefined)
// findIndex() → ÍNDICE del primero que cumple (o -1)
// some()      → ¿AL MENOS UNO cumple? (true/false)
// every()     → ¿TODOS cumplen? (true/false)
```

**Analogías:**

```
find():      Buscar el primer libro rojo en la biblioteca
findIndex(): Buscar en qué estante está el primer libro rojo
some():      ¿Hay al menos un libro rojo?
every():     ¿TODOS los libros son rojos?
```

---

## 🎯 TU TURNO:

**CONSIGNA:**
Buscar y verificar en array de productos

**Datos:**

```javascript
const productos = [
    { id: 1, nombre: 'Laptop', precio: 1000, stock: 5, descuento: true },
    { id: 2, nombre: 'Mouse', precio: 25, stock: 0, descuento: false },
    { id: 3, nombre: 'Teclado', precio: 75, stock: 15, descuento: true },
    { id: 4, nombre: 'Monitor', precio: 300, stock: 8, descuento: false },
    { id: 5, nombre: 'Webcam', precio: 50, stock: 3, descuento: true }
];
```

**TAREAS:**

1. Encontrar el producto con id === 3
2. Encontrar el índice del producto sin stock
3. Verificar si hay algún producto con descuento
4. Verificar si todos los productos tienen stock

**PLANTILLA:**

```javascript
// ============================================
// EJERCICIO 8: find/findIndex/some/every
// ============================================

const productos = [
    { id: 1, nombre: 'Laptop', precio: 1000, stock: 5, descuento: true },
    { id: 2, nombre: 'Mouse', precio: 25, stock: 0, descuento: false },
    { id: 3, nombre: 'Teclado', precio: 75, stock: 15, descuento: true },
    { id: 4, nombre: 'Monitor', precio: 300, stock: 8, descuento: false },
    { id: 5, nombre: 'Webcam', precio: 50, stock: 3, descuento: true }
];

// TAREA 1: Encontrar producto con id === 3
const productoId3 = productos.find(function(producto) {
    // TU CÓDIGO AQUÍ
});

console.log('Producto id 3:', productoId3);

// TAREA 2: Índice del producto sin stock
const indexSinStock = productos.findIndex(function(producto) {
    // TU CÓDIGO AQUÍ
});

console.log('Índice sin stock:', indexSinStock);

// TAREA 3: ¿Hay algún producto con descuento?
const hayDescuento = productos.some(function(producto) {
    // TU CÓDIGO AQUÍ
});

console.log('¿Hay descuento?:', hayDescuento);

// TAREA 4: ¿Todos tienen stock?
const todosTienenStock = productos.every(function(producto) {
    // TU CÓDIGO AQUÍ
});

console.log('¿Todos con stock?:', todosTienenStock);
```

**RESULTADO ESPERADO:**

```
Producto id 3: { id: 3, nombre: 'Teclado', precio: 75, stock: 15, descuento: true }
Índice sin stock: 1
¿Hay descuento?: true
¿Todos con stock?: false
```

---

## 💡 HINTS:

**Hint 1:**
- find(): `return producto.id === 3`
- findIndex(): `return producto.stock === 0`
- some(): `return producto.descuento === true`
- every(): `return producto.stock > 0`

**Hint 2 (estructuras):**
```javascript
// Tarea 1
return producto.id === 3;

// Tarea 2
return producto.stock === 0;

// Tarea 3
return producto.descuento === true;

// Tarea 4
return producto.stock > 0;
```

---

## ✅ CHECKLIST:

- [ ] find() retorna el objeto completo
- [ ] findIndex() retorna un número (1)
- [ ] some() retorna true
- [ ] every() retorna false
- [ ] Entendés la diferencia entre los 4 métodos

---

## 🎓 RESUMEN DEL BLOQUE 1

**Conceptos dominados:**
- ✅ map() - Transformar cada elemento
- ✅ filter() - Filtrar elementos según condición
- ✅ reduce() - Acumular/reducir a un valor
- ✅ Chaining - Encadenar métodos eficientemente
- ✅ find/findIndex/some/every - Buscar y verificar

**Nivel alcanzado:** Arrays methods AUTOMÁTICOS

**Tiempo invertido:** ~3-4 horas

**Siguiente paso:** Bloque 2 - Objects Manipulation

---

## 📊 PROGRESO TOTAL

**Bloque 1:** ✅ Completado (8/16 ejercicios)  
**Bloque 2:** ⏳ Pendiente (6 ejercicios)  
**Bloque 3:** ⏳ Pendiente (2 ejercicios)

---

**¡Excelente trabajo! Cuando termines este bloque, avisame para continuar con el Bloque 2 (Objects).** 🚀
