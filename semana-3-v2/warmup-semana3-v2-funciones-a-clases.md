# 🎓 WARMUP SEMANA 3 V2.0: Funciones → Clases

**Objetivo:** Rearmar tu cerebro para pensar en clases naturalmente (no como "algo raro")

**Duración:** 6-9 horas (2-3 días con 3 hrs/día)

**Estructura:** 20 ejercicios divididos en 4 bloques

---

## ⏰ GOVERNOR ACTIVO

**Límites por ejercicio:**
- ⏱️ Máximo 30 min por ejercicio
- ✅ Si funciona y entendiste → NEXT
- ✅ No iterar perfeccionando
- ❌ Si te trabás >30 min → ver hints

**Límite total:**
- 📅 2-3 días máximo
- 🎯 Completar los 20 ejercicios
- 🚀 Después → Mini-proyectos

---

## 📚 ÍNDICE DE BLOQUES

**BLOQUE 1: Refactoring Lado a Lado** (5 ejercicios)
- Ver mismo problema resuelto con funciones VS clase
- Comparar pros/contras de cada enfoque
- Entender diferencias fundamentales

**BLOQUE 2: Cuándo Usar Función vs Clase** (5 ejercicios)
- Criterios claros de decisión
- Casos donde función es mejor
- Casos donde clase es mejor
- Decisiones arquitectónicas

**BLOQUE 3: Pensar en Objetos** (5 ejercicios)
- Identificar responsabilidades
- Agrupar datos + comportamiento
- Encapsulación natural
- State management

**BLOQUE 4: Patterns de Organización** (5 ejercicios)
- Estructurar clases (qué métodos van dónde)
- Separación de concerns
- Métodos públicos vs privados
- Composición de clases

---

# BLOQUE 1: REFACTORING LADO A LADO

**Objetivo:** Ver el MISMO problema resuelto de DOS formas (funciones vs clase) y entender diferencias.

---

## 📝 EJERCICIO 1: Contador Simple

⏱️ **TIEMPO LÍMITE:** 25 min

### 🔍 EJEMPLO RESUELTO (estudiar ambas versiones):

#### **VERSIÓN A: Con funciones**

```javascript
// ============================================
// CONTADOR CON FUNCIONES
// ============================================

// Estado global
let count = 0;

// Funciones que manipulan el estado
function increment() {
  count++;
  console.log(`Contador: ${count}`);
}

function decrement() {
  count--;
  console.log(`Contador: ${count}`);
}

function reset() {
  count = 0;
  console.log(`Contador reseteado: ${count}`);
}

function getValue() {
  return count;
}

// Uso:
increment();  // Contador: 1
increment();  // Contador: 2
decrement();  // Contador: 1
console.log(getValue());  // 1
reset();  // Contador reseteado: 0
```

**Pros:**
- ✅ Simple y directo
- ✅ Fácil de entender
- ✅ Menos código

**Contras:**
- ❌ Estado global (puede ser modificado desde cualquier lugar)
- ❌ Solo un contador posible (no puedo tener múltiples contadores independientes)
- ❌ No hay encapsulación

---

#### **VERSIÓN B: Con clase**

```javascript
// ============================================
// CONTADOR CON CLASE
// ============================================

class Counter {
  // Estado privado
  #count = 0;
  
  // Métodos públicos que manipulan el estado
  increment() {
    this.#count++;
    console.log(`Contador: ${this.#count}`);
  }
  
  decrement() {
    this.#count--;
    console.log(`Contador: ${this.#count}`);
  }
  
  reset() {
    this.#count = 0;
    console.log(`Contador reseteado: ${this.#count}`);
  }
  
  getValue() {
    return this.#count;
  }
}

// Uso:
const counter1 = new Counter();
counter1.increment();  // Contador: 1
counter1.increment();  // Contador: 2
counter1.decrement();  // Contador: 1
console.log(counter1.getValue());  // 1

// Puedo crear múltiples contadores independientes
const counter2 = new Counter();
counter2.increment();  // Contador: 1 (independiente de counter1)
console.log(counter1.getValue());  // 1 (no afectado)
console.log(counter2.getValue());  // 1 (independiente)
```

**Pros:**
- ✅ Estado encapsulado (privado con #)
- ✅ Múltiples instancias independientes
- ✅ No contamina scope global
- ✅ Más organizado

**Contras:**
- ❌ Más código
- ❌ Sintaxis más compleja (this, new, #)

---

### 🎯 TU TURNO:

**CONSIGNA:**

Implementar un **Temporizador** (timer) de DOS formas:

**Funcionalidad:**
- Iniciar con un valor (ej: 10 segundos)
- `tick()` → Reducir 1 segundo
- `getTime()` → Obtener tiempo restante
- `isFinished()` → Retornar true si llegó a 0
- `reset(seconds)` → Reiniciar con nuevo valor

**IMPLEMENTAR:**
1. Versión con funciones (estado global)
2. Versión con clase (estado encapsulado)

**PLANTILLA VERSIÓN FUNCIONES:**

```javascript
// ============================================
// TEMPORIZADOR CON FUNCIONES
// ============================================

// TU CÓDIGO: Declarar variable global para tiempo
let time = 0;

function start(seconds) {
  // TU CÓDIGO: Inicializar tiempo
}

function tick() {
  // TU CÓDIGO: Reducir 1 segundo (mínimo 0)
}

function getTime() {
  // TU CÓDIGO: Retornar tiempo actual
}

function isFinished() {
  // TU CÓDIGO: Retornar true si tiempo === 0
}

function reset(seconds) {
  // TU CÓDIGO: Reiniciar con nuevo valor
}

// TESTING:
start(5);
console.log(getTime());  // 5
tick();
console.log(getTime());  // 4
tick(); tick(); tick(); tick();
console.log(getTime());  // 0
console.log(isFinished());  // true
reset(3);
console.log(getTime());  // 3
```

**PLANTILLA VERSIÓN CLASE:**

```javascript
// ============================================
// TEMPORIZADOR CON CLASE
// ============================================

class Timer {
  // TU CÓDIGO: Declarar campo privado #time
  
  constructor(seconds) {
    // TU CÓDIGO: Inicializar tiempo
  }
  
  tick() {
    // TU CÓDIGO: Reducir 1 segundo (mínimo 0)
  }
  
  getTime() {
    // TU CÓDIGO: Retornar tiempo
  }
  
  isFinished() {
    // TU CÓDIGO: Retornar true si tiempo === 0
  }
  
  reset(seconds) {
    // TU CÓDIGO: Reiniciar con nuevo valor
  }
}

// TESTING:
const timer1 = new Timer(5);
console.log(timer1.getTime());  // 5
timer1.tick();
console.log(timer1.getTime());  // 4

// Crear segundo timer independiente
const timer2 = new Timer(10);
console.log(timer2.getTime());  // 10
timer1.tick();
console.log(timer1.getTime());  // 3 (timer1 sigue su cuenta)
console.log(timer2.getTime());  // 10 (timer2 no afectado)
```

**RESULTADO ESPERADO:**
- Ambas versiones funcionan igual
- Versión clase permite múltiples timers independientes
- Versión funciones solo permite un timer global

---

### 💡 HINTS

**Hint 1:** En versión funciones, `time` es global. En clase, `#time` es privado.

**Hint 2:** `tick()` debe hacer `time--` pero nunca pasar de 0: `if (time > 0) time--`

**Hint 3:** En clase, usar `this.#time` para acceder al campo privado.

---

## 📝 EJERCICIO 2: Carrito de Compras

⏱️ **TIEMPO LÍMITE:** 30 min

### 🔍 EJEMPLO RESUELTO:

#### **VERSIÓN A: Con funciones**

```javascript
// ============================================
// CARRITO CON FUNCIONES
// ============================================

// Estado global
const items = [];

function addItem(name, price) {
  items.push({ name, price });
  console.log(`Agregado: ${name} - $${price}`);
}

function removeItem(name) {
  const index = items.findIndex(item => item.name === name);
  if (index !== -1) {
    items.splice(index, 1);
    console.log(`Eliminado: ${name}`);
  }
}

function getTotal() {
  return items.reduce((sum, item) => sum + item.price, 0);
}

function getItems() {
  return [...items];  // Retornar copia
}

function clear() {
  items.length = 0;
  console.log('Carrito vaciado');
}

// Uso:
addItem('Laptop', 1000);
addItem('Mouse', 25);
console.log(getTotal());  // 1025
removeItem('Mouse');
console.log(getTotal());  // 1000
```

**Problema:** Solo puedo tener UN carrito en toda la app.

---

#### **VERSIÓN B: Con clase**

```javascript
// ============================================
// CARRITO CON CLASE
// ============================================

class ShoppingCart {
  #items = [];
  
  addItem(name, price) {
    this.#items.push({ name, price });
    console.log(`Agregado: ${name} - $${price}`);
  }
  
  removeItem(name) {
    const index = this.#items.findIndex(item => item.name === name);
    if (index !== -1) {
      this.#items.splice(index, 1);
      console.log(`Eliminado: ${name}`);
    }
  }
  
  getTotal() {
    return this.#items.reduce((sum, item) => sum + item.price, 0);
  }
  
  getItems() {
    return [...this.#items];  // Retornar copia
  }
  
  clear() {
    this.#items = [];
    console.log('Carrito vaciado');
  }
}

// Uso:
const cart1 = new ShoppingCart();
cart1.addItem('Laptop', 1000);
cart1.addItem('Mouse', 25);
console.log(cart1.getTotal());  // 1025

// Múltiples carritos (ej: usuario guest vs usuario registrado)
const cart2 = new ShoppingCart();
cart2.addItem('Teclado', 50);
console.log(cart1.getTotal());  // 1025 (no afectado)
console.log(cart2.getTotal());  // 50
```

**Ventaja:** Puedo tener múltiples carritos independientes.

---

### 🎯 TU TURNO:

**CONSIGNA:**

Implementar una **Lista de Deseos** (wishlist) de DOS formas:

**Funcionalidad:**
- `add(productName)` → Agregar producto
- `remove(productName)` → Eliminar producto
- `has(productName)` → Verificar si está en la lista
- `getAll()` → Obtener todos los productos
- `getCount()` → Cantidad de productos
- `clear()` → Vaciar lista

**PLANTILLA FUNCIONES:**

```javascript
// WISHLIST CON FUNCIONES
const wishlist = [];

function add(productName) {
  // TU CÓDIGO: Agregar a wishlist (evitar duplicados)
}

function remove(productName) {
  // TU CÓDIGO: Eliminar de wishlist
}

function has(productName) {
  // TU CÓDIGO: Verificar si existe
}

function getAll() {
  // TU CÓDIGO: Retornar copia del array
}

function getCount() {
  // TU CÓDIGO: Retornar wishlist.length
}

function clear() {
  // TU CÓDIGO: Vaciar array
}

// TESTING:
add('iPhone');
add('iPad');
add('iPhone');  // No duplicar
console.log(getCount());  // 2
console.log(has('iPhone'));  // true
remove('iPad');
console.log(getCount());  // 1
```

**PLANTILLA CLASE:**

```javascript
// WISHLIST CON CLASE
class Wishlist {
  #products = [];
  
  add(productName) {
    // TU CÓDIGO
  }
  
  remove(productName) {
    // TU CÓDIGO
  }
  
  has(productName) {
    // TU CÓDIGO
  }
  
  getAll() {
    // TU CÓDIGO
  }
  
  getCount() {
    // TU CÓDIGO
  }
  
  clear() {
    // TU CÓDIGO
  }
}

// TESTING:
const wishlist1 = new Wishlist();
wishlist1.add('iPhone');
wishlist1.add('iPad');

const wishlist2 = new Wishlist();
wishlist2.add('Laptop');

console.log(wishlist1.getCount());  // 2
console.log(wishlist2.getCount());  // 1
```

---

### 💡 HINTS

**Hint 1:** Para evitar duplicados: `if (!this.#products.includes(productName))`

**Hint 2:** `remove()` puede usar `filter()`: `this.#products = this.#products.filter(p => p !== productName)`

**Hint 3:** `has()` simplemente retorna `this.#products.includes(productName)`

---

## 📝 EJERCICIO 3: Validador de Formulario

⏱️ **TIEMPO LÍMITE:** 30 min

### 🔍 EJEMPLO RESUELTO:

#### **VERSIÓN A: Con funciones**

```javascript
// ============================================
// VALIDADOR CON FUNCIONES
// ============================================

// Estado global
const errors = {};

function validateEmail(email) {
  if (!email.includes('@')) {
    errors.email = 'Email inválido';
    return false;
  }
  delete errors.email;
  return true;
}

function validatePassword(password) {
  if (password.length < 6) {
    errors.password = 'Password debe tener al menos 6 caracteres';
    return false;
  }
  delete errors.password;
  return true;
}

function validateAge(age) {
  if (age < 18) {
    errors.age = 'Debes ser mayor de 18';
    return false;
  }
  delete errors.age;
  return true;
}

function getErrors() {
  return { ...errors };
}

function isValid() {
  return Object.keys(errors).length === 0;
}

function clearErrors() {
  for (let key in errors) {
    delete errors[key];
  }
}

// Uso:
validateEmail('test');  // false
validatePassword('123');  // false
console.log(getErrors());  // { email: '...', password: '...' }
console.log(isValid());  // false

validateEmail('test@example.com');  // true
validatePassword('123456');  // true
console.log(isValid());  // true
```

**Problema:** Solo puedo validar UN formulario a la vez (errors global).

---

#### **VERSIÓN B: Con clase**

```javascript
// ============================================
// VALIDADOR CON CLASE
// ============================================

class FormValidator {
  #errors = {};
  
  validateEmail(email) {
    if (!email.includes('@')) {
      this.#errors.email = 'Email inválido';
      return false;
    }
    delete this.#errors.email;
    return true;
  }
  
  validatePassword(password) {
    if (password.length < 6) {
      this.#errors.password = 'Password debe tener al menos 6 caracteres';
      return false;
    }
    delete this.#errors.password;
    return true;
  }
  
  validateAge(age) {
    if (age < 18) {
      this.#errors.age = 'Debes ser mayor de 18';
      return false;
    }
    delete this.#errors.age;
    return true;
  }
  
  getErrors() {
    return { ...this.#errors };
  }
  
  isValid() {
    return Object.keys(this.#errors).length === 0;
  }
  
  clearErrors() {
    this.#errors = {};
  }
}

// Uso:
const loginForm = new FormValidator();
loginForm.validateEmail('test@example.com');
loginForm.validatePassword('123456');
console.log(loginForm.isValid());  // true

const signupForm = new FormValidator();
signupForm.validateEmail('invalid');
signupForm.validateAge(15);
console.log(signupForm.getErrors());  // { email: '...', age: '...' }
console.log(loginForm.isValid());  // true (no afectado)
```

**Ventaja:** Múltiples formularios con validaciones independientes.

---

### 🎯 TU TURNO:

**CONSIGNA:**

Implementar **Validador de Producto** de DOS formas:

**Validaciones:**
- `validateName(name)` → Mínimo 3 caracteres
- `validatePrice(price)` → Mayor a 0
- `validateStock(stock)` → Mayor o igual a 0
- `getErrors()` → Retornar objeto de errores
- `isValid()` → true si no hay errores
- `clearErrors()` → Limpiar errores

**PLANTILLA FUNCIONES:**

```javascript
// VALIDADOR CON FUNCIONES
const errors = {};

function validateName(name) {
  // TU CÓDIGO: Validar mínimo 3 caracteres
  // Si inválido: errors.name = 'Mensaje'
  // Si válido: delete errors.name
  // Retornar true/false
}

function validatePrice(price) {
  // TU CÓDIGO: Validar > 0
}

function validateStock(stock) {
  // TU CÓDIGO: Validar >= 0
}

function getErrors() {
  // TU CÓDIGO: Retornar copia de errors
}

function isValid() {
  // TU CÓDIGO: Retornar true si Object.keys(errors).length === 0
}

function clearErrors() {
  // TU CÓDIGO: Limpiar objeto errors
}

// TESTING:
validateName('AB');  // false
validatePrice(-10);  // false
console.log(getErrors());  // { name: '...', price: '...' }
validateName('Laptop');  // true
validatePrice(1000);  // true
console.log(isValid());  // true
```

**PLANTILLA CLASE:**

```javascript
// VALIDADOR CON CLASE
class ProductValidator {
  #errors = {};
  
  validateName(name) {
    // TU CÓDIGO
  }
  
  validatePrice(price) {
    // TU CÓDIGO
  }
  
  validateStock(stock) {
    // TU CÓDIGO
  }
  
  getErrors() {
    // TU CÓDIGO
  }
  
  isValid() {
    // TU CÓDIGO
  }
  
  clearErrors() {
    // TU CÓDIGO
  }
}

// TESTING:
const validator1 = new ProductValidator();
validator1.validateName('Laptop');
validator1.validatePrice(1000);

const validator2 = new ProductValidator();
validator2.validateName('AB');  // Inválido

console.log(validator1.isValid());  // true
console.log(validator2.isValid());  // false
```

---

### 💡 HINTS

**Hint 1:** Validar nombre: `if (name.length < 3) { this.#errors.name = '...'; return false; }`

**Hint 2:** Si válido, eliminar error: `delete this.#errors.name; return true;`

**Hint 3:** `clearErrors()` simplemente hace `this.#errors = {}`

---

## 📝 EJERCICIO 4: Gestor de Tareas (Simple)

⏱️ **TIEMPO LÍMITE:** 30 min

### 🎯 TU TURNO (sin ejemplo resuelto):

**CONSIGNA:**

Implementar **Gestor de Tareas** de DOS formas:

**Funcionalidad:**
- `add(title)` → Agregar tarea con {id, title, completed: false}
- `toggle(id)` → Cambiar completed de true/false
- `remove(id)` → Eliminar tarea
- `getAll()` → Retornar todas las tareas
- `getCompleted()` → Solo completadas
- `getActive()` → Solo pendientes

**PLANTILLA FUNCIONES:**

```javascript
// TODO MANAGER CON FUNCIONES
const tasks = [];
let nextId = 1;

function add(title) {
  // TU CÓDIGO: Crear tarea y agregar a tasks
  // Tarea: { id: nextId++, title, completed: false }
}

function toggle(id) {
  // TU CÓDIGO: Encontrar tarea y cambiar completed
}

function remove(id) {
  // TU CÓDIGO: Eliminar tarea del array
}

function getAll() {
  // TU CÓDIGO: Retornar copia de tasks
}

function getCompleted() {
  // TU CÓDIGO: Filtrar completed === true
}

function getActive() {
  // TU CÓDIGO: Filtrar completed === false
}

// TESTING:
add('Comprar leche');
add('Estudiar JS');
toggle(1);  // Marcar primera como completada
console.log(getCompleted().length);  // 1
console.log(getActive().length);  // 1
```

**PLANTILLA CLASE:**

```javascript
// TODO MANAGER CON CLASE
class TodoManager {
  #tasks = [];
  #nextId = 1;
  
  add(title) {
    // TU CÓDIGO
  }
  
  toggle(id) {
    // TU CÓDIGO
  }
  
  remove(id) {
    // TU CÓDIGO
  }
  
  getAll() {
    // TU CÓDIGO
  }
  
  getCompleted() {
    // TU CÓDIGO
  }
  
  getActive() {
    // TU CÓDIGO
  }
}

// TESTING:
const manager1 = new TodoManager();
manager1.add('Comprar leche');

const manager2 = new TodoManager();
manager2.add('Estudiar JS');

console.log(manager1.getAll().length);  // 1
console.log(manager2.getAll().length);  // 1
```

---

### 💡 HINTS

**Hint 1:** `add()` crea objeto: `{ id: this.#nextId++, title, completed: false }`

**Hint 2:** `toggle()` busca con `find()` y hace `task.completed = !task.completed`

**Hint 3:** `remove()` puede usar `filter()` o `splice()` con `findIndex()`

---

## 📝 EJERCICIO 5: Cache Simple

⏱️ **TIEMPO LÍMITE:** 25 min

### 🎯 TU TURNO:

**CONSIGNA:**

Implementar **Cache** de DOS formas:

**Funcionalidad:**
- `set(key, value)` → Guardar en cache
- `get(key)` → Obtener valor (o undefined si no existe)
- `has(key)` → Verificar si existe
- `delete(key)` → Eliminar entrada
- `clear()` → Vaciar cache
- `size()` → Cantidad de entradas

**PLANTILLA FUNCIONES:**

```javascript
// CACHE CON FUNCIONES
const cache = {};

function set(key, value) {
  // TU CÓDIGO
}

function get(key) {
  // TU CÓDIGO
}

function has(key) {
  // TU CÓDIGO
}

function deleteKey(key) {
  // TU CÓDIGO
}

function clear() {
  // TU CÓDIGO
}

function size() {
  // TU CÓDIGO: Object.keys(cache).length
}

// TESTING:
set('user', { name: 'Juan' });
set('config', { theme: 'dark' });
console.log(get('user'));  // { name: 'Juan' }
console.log(has('user'));  // true
console.log(size());  // 2
deleteKey('user');
console.log(size());  // 1
```

**PLANTILLA CLASE:**

```javascript
// CACHE CON CLASE
class Cache {
  #data = {};
  
  set(key, value) {
    // TU CÓDIGO
  }
  
  get(key) {
    // TU CÓDIGO
  }
  
  has(key) {
    // TU CÓDIGO
  }
  
  delete(key) {
    // TU CÓDIGO
  }
  
  clear() {
    // TU CÓDIGO
  }
  
  size() {
    // TU CÓDIGO
  }
}

// TESTING:
const cache1 = new Cache();
cache1.set('user', { name: 'Juan' });

const cache2 = new Cache();
cache2.set('config', { theme: 'dark' });

console.log(cache1.size());  // 1
console.log(cache2.size());  // 1
```

---

### 💡 HINTS

**Hint 1:** `set()` hace `this.#data[key] = value`

**Hint 2:** `get()` retorna `this.#data[key]` (undefined si no existe)

**Hint 3:** `delete()` usa `delete this.#data[key]`

---

## ✅ CHECKLIST BLOQUE 1

**Completaste el Bloque 1 cuando:**
- [ ] Ejercicio 1: Contador ✓
- [ ] Ejercicio 2: Carrito ✓
- [ ] Ejercicio 3: Validador ✓
- [ ] Ejercicio 4: Gestor de Tareas ✓
- [ ] Ejercicio 5: Cache ✓

**Tiempo invertido:** ____ horas

**¿Qué aprendiste?**
- [ ] Veo la diferencia entre funciones y clases claramente
- [ ] Entiendo cuándo estado global es problema (múltiples instancias)
- [ ] Encapsulación con # hace sentido

**Si respondiste SÍ a todo → Continuar Bloque 2** 🚀

---

# BLOQUE 2: CUÁNDO USAR FUNCIÓN VS CLASE

**Objetivo:** Desarrollar criterio para DECIDIR cuándo usar cada enfoque.

---

## 📝 EJERCICIO 6: Utilidades (Usar Funciones)

⏱️ **TIEMPO LÍMITE:** 20 min

### 🔍 CONCEPTO:

**Cuándo usar FUNCIONES:**
- ✅ Operaciones sin estado (stateless)
- ✅ Transformaciones puras (input → output)
- ✅ Utilidades/helpers
- ✅ No necesitás múltiples instancias

**Ejemplo:** Funciones de formateo, validación simple, cálculos matemáticos.

---

### 🎯 TU TURNO:

**CONSIGNA:**

Las siguientes funcionalidades SON MEJORES con **funciones puras** (NO clases):

**IMPLEMENTAR:**

```javascript
// ============================================
// UTILIDADES DE FORMATO (usar funciones)
// ============================================

/**
 * Formatear precio a moneda
 * TODO: Implementar
 */
function formatCurrency(amount) {
  // TU CÓDIGO: Retornar $amount con 2 decimales
  // Ejemplo: 1000 → "$1000.00"
}

/**
 * Formatear fecha a string legible
 * TODO: Implementar
 */
function formatDate(date) {
  // TU CÓDIGO: Retornar fecha en formato DD/MM/YYYY
  // Hint: usar date.getDate(), date.getMonth() + 1, date.getFullYear()
}

/**
 * Capitalizar primera letra
 * TODO: Implementar
 */
function capitalize(str) {
  // TU CÓDIGO: "hola" → "Hola"
  // Hint: str[0].toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Truncar texto a N caracteres
 * TODO: Implementar
 */
function truncate(str, maxLength) {
  // TU CÓDIGO: Si str.length > maxLength → str.slice(0, maxLength) + '...'
}

// TESTING:
console.log(formatCurrency(1234.5));  // "$1234.50"
console.log(formatDate(new Date()));  // "28/01/2026"
console.log(capitalize('hola mundo'));  // "Hola mundo"
console.log(truncate('Texto largo', 5));  // "Texto..."
```

**¿Por qué NO usar clase aquí?**
- No hay estado que mantener
- Son transformaciones puras (input → output)
- No necesitás múltiples instancias
- Más simple y directo con funciones

---

### 💡 HINTS

**Hint 1:** `formatCurrency()` usa `amount.toFixed(2)` para 2 decimales

**Hint 2:** `formatDate()` puede usar template literal: `` `${day}/${month}/${year}` ``

**Hint 3:** `truncate()` verifica longitud primero: `if (str.length <= maxLength) return str`

---

## 📝 EJERCICIO 7: Estado Compartido (Usar Clase)

⏱️ **TIEMPO LÍMITE:** 25 min

### 🔍 CONCEPTO:

**Cuándo usar CLASE:**
- ✅ Necesitás mantener estado
- ✅ Múltiples instancias independientes
- ✅ Agrupar datos + comportamiento
- ✅ Encapsulación (estado privado)

**Ejemplo:** Usuarios, productos, carritos, formularios, timers.

---

### 🎯 TU TURNO:

**CONSIGNA:**

Las siguientes funcionalidades SON MEJORES con **clase** (NO funciones):

**IMPLEMENTAR:**

```javascript
// ============================================
// USER SESSION (usar clase)
// ============================================

class UserSession {
  // TODO: Campos privados para user, isLoggedIn, loginTime
  
  login(username) {
    // TODO: Marcar como logueado, guardar username y timestamp
  }
  
  logout() {
    // TODO: Marcar como no logueado, limpiar datos
  }
  
  isAuthenticated() {
    // TODO: Retornar si está logueado
  }
  
  getUsername() {
    // TODO: Retornar username o null
  }
  
  getSessionDuration() {
    // TODO: Retornar minutos desde login
    // Hint: (Date.now() - loginTime) / 60000
  }
}

// TESTING:
const session = new UserSession();
session.login('Juan');
console.log(session.isAuthenticated());  // true
console.log(session.getUsername());  // "Juan"

// Simular pasar tiempo
setTimeout(() => {
  console.log(session.getSessionDuration());  // > 0 minutos
}, 1000);
```

**¿Por qué usar clase aquí?**
- Mantiene estado (user, isLoggedIn, loginTime)
- Necesitás múltiples sesiones independientes
- Encapsulación (datos privados)
- Agrupa datos + comportamiento

---

### 💡 HINTS

**Hint 1:** Campos privados: `#user = null; #isLoggedIn = false; #loginTime = null;`

**Hint 2:** `login()` hace `this.#isLoggedIn = true; this.#loginTime = Date.now();`

**Hint 3:** `getSessionDuration()` calcula `(Date.now() - this.#loginTime) / 60000`

---

## 📝 EJERCICIO 8: Decisión Arquitectónica

⏱️ **TIEMPO LÍMITE:** 30 min

### 🎯 TU TURNO:

**CONSIGNA:**

Para CADA funcionalidad, decidir: **¿Función o Clase?**

**1. Calcular promedio de array de números**
- [ ] Función
- [ ] Clase
- ¿Por qué? ______________________________

**2. Gestor de notificaciones (agregar, marcar como leída, obtener no leídas)**
- [ ] Función
- [ ] Clase
- ¿Por qué? ______________________________

**3. Validar si string es email válido**
- [ ] Función
- [ ] Clase
- ¿Por qué? ______________________________

**4. Carrito de compras (agregar, eliminar, calcular total)**
- [ ] Función
- [ ] Clase
- ¿Por qué? ______________________________

**5. Convertir temperatura Celsius a Fahrenheit**
- [ ] Función
- [ ] Clase
- ¿Por qué? ______________________________

**6. Reproductor de música (play, pause, skip, getStatus)**
- [ ] Función
- [ ] Clase
- ¿Por qué? ______________________________

**IMPLEMENTAR 2 de tu elección:**

Elegí 2 de las 6 anteriores e implementalas según tu decisión.

---

### 💡 CRITERIOS DE DECISIÓN

**Usá FUNCIÓN si:**
- ✅ No mantiene estado
- ✅ Transformación pura (input → output)
- ✅ Utilidad/helper
- ✅ No necesitás múltiples instancias

**Usá CLASE si:**
- ✅ Mantiene estado
- ✅ Necesitás múltiples instancias independientes
- ✅ Agrupa datos + comportamiento
- ✅ Requiere encapsulación

---

## 📝 EJERCICIO 9: Refactoring (Identificar Mejora)

⏱️ **TIEMPO LÍMITE:** 25 min

### 🎯 TU TURNO:

**CONSIGNA:**

El siguiente código usa funciones pero DEBERÍA usar clase. **Refactorizá a clase:**

```javascript
// ============================================
// CÓDIGO ORIGINAL (funciones - no óptimo)
// ============================================

let playerName = '';
let playerScore = 0;
let playerLevel = 1;

function setName(name) {
  playerName = name;
}

function addScore(points) {
  playerScore += points;
  if (playerScore >= 100) {
    levelUp();
  }
}

function levelUp() {
  playerLevel++;
  playerScore = 0;
  console.log(`¡Nivel ${playerLevel}!`);
}

function getStats() {
  return {
    name: playerName,
    score: playerScore,
    level: playerLevel
  };
}

// Problema: Solo un jugador posible (estado global)
```

**TU CÓDIGO (refactorizar a clase):**

```javascript
// ============================================
// REFACTORIZADO (clase)
// ============================================

class Player {
  // TU CÓDIGO: Implementar con campos privados
}

// TESTING:
const player1 = new Player('Juan');
player1.addScore(50);
player1.addScore(60);  // Debería subir a nivel 2
console.log(player1.getStats());  // { name: 'Juan', score: 10, level: 2 }

const player2 = new Player('María');
player2.addScore(30);
console.log(player2.getStats());  // { name: 'María', score: 30, level: 1 }
```

---

### 💡 HINTS

**Hint 1:** Constructor recibe `name` e inicializa campos privados

**Hint 2:** `addScore()` suma puntos y verifica `if (this.#score >= 100) this.levelUp()`

**Hint 3:** `levelUp()` incrementa nivel y resetea score a 0

---

## 📝 EJERCICIO 10: Comparación Final

⏱️ **TIEMPO LÍMITE:** 30 min

### 🎯 TU TURNO:

**CONSIGNA:**

Implementar **Sistema de Puntos** de DOS formas y comparar:

**Funcionalidad:**
- Iniciar con 0 puntos
- `earn(points)` → Ganar puntos
- `spend(points)` → Gastar puntos (si hay suficientes)
- `getBalance()` → Obtener balance actual
- `canSpend(points)` → Verificar si puede gastar

**VERSIÓN 1: Funciones**

```javascript
// TU CÓDIGO: Implementar con funciones
```

**VERSIÓN 2: Clase**

```javascript
// TU CÓDIGO: Implementar con clase
```

**COMPARAR:**

Crear tabla comparativa:

| Aspecto | Funciones | Clase |
|---------|-----------|-------|
| Múltiples instancias | ❌ Solo 1 | ✅ Ilimitadas |
| Encapsulación | ❌ Estado global | ✅ Privado (#) |
| Complejidad código | ✅ Simple | ⚠️ Más código |
| ¿Cuál es mejor? | [Tu decisión] | [Tu decisión] |

---

## ✅ CHECKLIST BLOQUE 2

**Completaste el Bloque 2 cuando:**
- [ ] Ejercicio 6: Utilidades ✓
- [ ] Ejercicio 7: Estado Compartido ✓
- [ ] Ejercicio 8: Decisión Arquitectónica ✓
- [ ] Ejercicio 9: Refactoring ✓
- [ ] Ejercicio 10: Comparación ✓

**¿Qué aprendiste?**
- [ ] Tengo criterio para decidir función vs clase
- [ ] Sé cuándo función es suficiente (transformaciones puras)
- [ ] Sé cuándo clase es mejor (estado, múltiples instancias)

**Si respondiste SÍ → Continuar Bloque 3** 🚀

---

# BLOQUE 3: PENSAR EN OBJETOS

**Objetivo:** Aprender a IDENTIFICAR responsabilidades y AGRUPAR datos + comportamiento.

---

## 📝 EJERCICIO 11: Identificar Responsabilidades

⏱️ **TIEMPO LÍMITE:** 25 min

### 🔍 CONCEPTO:

**Pensar en objetos = Agrupar responsabilidades**

En vez de pensar:
- ❌ "Tengo funciones sueltas que hacen cosas"

Pensar:
- ✅ "¿Qué ENTIDADES tengo? ¿Qué RESPONSABILIDADES tiene cada una?"

**Ejemplo:**
```
Sistema de Biblioteca:
- Entidad: Libro → Responsabilidad: Saber título, autor, si está prestado
- Entidad: Usuario → Responsabilidad: Saber nombre, libros prestados
- Entidad: Biblioteca → Responsabilidad: Prestar/devolver, buscar libros
```

---

### 🎯 TU TURNO:

**CONSIGNA:**

Dado este sistema, identificar **entidades y responsabilidades:**

**Sistema: Plataforma de Cursos Online**

Funcionalidades:
- Usuarios se registran con nombre y email
- Cursos tienen título, instructor, duración
- Usuarios se inscriben en cursos
- Usuarios completan lecciones
- Sistema calcula progreso del usuario en cada curso

**IDENTIFICAR:**

**1. ¿Qué entidades (clases) necesitás?**
- Entidad 1: ______________________
- Entidad 2: ______________________
- Entidad 3: ______________________

**2. ¿Qué responsabilidad tiene cada una?**

Entidad 1: ______________________
- Responsabilidad: ________________
- Datos que mantiene: ________________
- Comportamientos: ________________

Entidad 2: ______________________
- Responsabilidad: ________________
- Datos que mantiene: ________________
- Comportamientos: ________________

Entidad 3: ______________________
- Responsabilidad: ________________
- Datos que mantiene: ________________
- Comportamientos: ________________

**3. Implementar UNA de las entidades:**

```javascript
// TODO: Implementar la entidad que elegiste
```

---

### 💡 HINTS

**Hint 1:** Entidades comunes: User, Course, Enrollment (inscripción)

**Hint 2:** User mantiene: name, email, enrollments (cursos inscritos)

**Hint 3:** Course mantiene: title, instructor, duration, lessons

---

## 📝 EJERCICIO 12: Agrupar Datos + Comportamiento

⏱️ **TIEMPO LÍMITE:** 30 min

### 🎯 TU TURNO:

**CONSIGNA:**

El siguiente código tiene datos y funciones SEPARADOS. **Agrupalos en clase:**

```javascript
// ============================================
// CÓDIGO ORIGINAL (separado)
// ============================================

const productName = 'Laptop';
const productPrice = 1000;
const productStock = 5;

function applyDiscount(percentage) {
  return productPrice * (1 - percentage / 100);
}

function isAvailable() {
  return productStock > 0;
}

function sell(quantity) {
  if (productStock >= quantity) {
    productStock -= quantity;
    return true;
  }
  return false;
}

// Problema: Datos y comportamiento desconectados
```

**TU CÓDIGO (agrupar en clase Product):**

```javascript
// ============================================
// REFACTORIZADO (clase Product)
// ============================================

class Product {
  // TODO: Implementar
  // Datos: name, price, stock
  // Comportamiento: applyDiscount, isAvailable, sell
}

// TESTING:
const laptop = new Product('Laptop', 1000, 5);
console.log(laptop.applyDiscount(10));  // 900
console.log(laptop.isAvailable());  // true
laptop.sell(3);
console.log(laptop.sell(5));  // false (no hay suficiente)
```

**¿Qué mejora?**
- ✅ Datos y comportamiento juntos
- ✅ Múltiples productos independientes
- ✅ Encapsulación

---

## 📝 EJERCICIO 13: State Management

⏱️ **TIEMPO LÍMITE:** 30 min

### 🔍 CONCEPTO:

**State Management = Manejar estado interno de forma controlada**

Con clases, el estado está:
- ✅ Encapsulado (privado con #)
- ✅ Controlado (solo se modifica con métodos)
- ✅ Validado (métodos pueden validar antes de modificar)

---

### 🎯 TU TURNO:

**CONSIGNA:**

Implementar **Reproductor de Video** con state management:

**Estados posibles:**
- 'stopped' (detenido)
- 'playing' (reproduciendo)
- 'paused' (pausado)

**Métodos:**
- `play()` → Cambiar a 'playing' (solo si stopped o paused)
- `pause()` → Cambiar a 'paused' (solo si playing)
- `stop()` → Cambiar a 'stopped'
- `getState()` → Retornar estado actual
- `canPlay()` → true si puede reproducir

**PLANTILLA:**

```javascript
class VideoPlayer {
  // TODO: Campo privado #state (iniciar en 'stopped')
  
  play() {
    // TODO: Solo permitir si estado es 'stopped' o 'paused'
    // Si no, retornar false
  }
  
  pause() {
    // TODO: Solo permitir si estado es 'playing'
  }
  
  stop() {
    // TODO: Cambiar a 'stopped' siempre
  }
  
  getState() {
    // TODO: Retornar estado actual
  }
  
  canPlay() {
    // TODO: true si estado !== 'playing'
  }
}

// TESTING:
const player = new VideoPlayer();
console.log(player.getState());  // 'stopped'
player.play();
console.log(player.getState());  // 'playing'
player.play();  // No debería cambiar (ya está playing)
console.log(player.getState());  // 'playing'
player.pause();
console.log(player.getState());  // 'paused'
player.stop();
console.log(player.getState());  // 'stopped'
```

---

### 💡 HINTS

**Hint 1:** `play()` verifica: `if (this.#state !== 'playing') { this.#state = 'playing'; }`

**Hint 2:** `pause()` verifica: `if (this.#state === 'playing') { this.#state = 'paused'; }`

**Hint 3:** Estado inicial en constructor: `#state = 'stopped'`

---

## 📝 EJERCICIO 14: Encapsulación con Getters/Setters

⏱️ **TIEMPO LÍMITE:** 30 min

### 🎯 TU TURNO:

**CONSIGNA:**

Implementar **BankAccount** con getters/setters:

**Requisitos:**
- Balance privado (#balance)
- Solo puede leer balance con getter
- Solo puede depositar/retirar con métodos (no setter directo)
- Validaciones: no balance negativo, no depositar <= 0

**PLANTILLA:**

```javascript
class BankAccount {
  #balance = 0;
  
  constructor(initialBalance = 0) {
    // TODO: Validar initialBalance >= 0
    // TODO: Asignar a #balance
  }
  
  // Getter (solo lectura)
  get balance() {
    // TODO: Retornar #balance
  }
  
  deposit(amount) {
    // TODO: Validar amount > 0
    // TODO: Sumar a #balance
  }
  
  withdraw(amount) {
    // TODO: Validar amount > 0
    // TODO: Validar #balance >= amount
    // TODO: Restar de #balance
    // Retornar true si exitoso, false si no
  }
}

// TESTING:
const account = new BankAccount(100);
console.log(account.balance);  // 100 (getter)
account.deposit(50);
console.log(account.balance);  // 150
account.withdraw(200);  // false (insuficiente)
console.log(account.balance);  // 150 (no cambió)
account.withdraw(50);  // true
console.log(account.balance);  // 100

// Intentar modificar balance directamente (no funciona)
// account.balance = 999;  // ❌ No hay setter
```

---

### 💡 HINTS

**Hint 1:** Getter: `get balance() { return this.#balance; }`

**Hint 2:** `deposit()` valida: `if (amount <= 0) throw new Error(...)`

**Hint 3:** `withdraw()` valida: `if (amount > this.#balance) return false`

---

## 📝 EJERCICIO 15: Composición de Objetos

⏱️ **TIEMPO LÍMITE:** 30 min

### 🔍 CONCEPTO:

**Composición = Objetos que contienen otros objetos**

```javascript
class Address {
  constructor(street, city, country) {
    this.street = street;
    this.city = city;
    this.country = country;
  }
}

class User {
  constructor(name, address) {
    this.name = name;
    this.address = address;  // ← Composición
  }
}

const user = new User('Juan', new Address('Calle 123', 'Buenos Aires', 'Argentina'));
console.log(user.address.city);  // "Buenos Aires"
```

---

### 🎯 TU TURNO:

**CONSIGNA:**

Implementar sistema de **Pedidos (Order)** con composición:

**Clases:**
1. `OrderItem` → Un ítem del pedido (product, quantity, price)
2. `Order` → Pedido completo (contiene array de OrderItems)

**PLANTILLA:**

```javascript
class OrderItem {
  constructor(product, quantity, price) {
    // TODO: Asignar propiedades
  }
  
  getTotal() {
    // TODO: Retornar quantity * price
  }
}

class Order {
  #items = [];
  #orderNumber;
  
  constructor(orderNumber) {
    // TODO: Asignar orderNumber
  }
  
  addItem(product, quantity, price) {
    // TODO: Crear OrderItem y agregar a #items
  }
  
  getTotal() {
    // TODO: Sumar getTotal() de todos los items
    // Hint: this.#items.reduce((sum, item) => sum + item.getTotal(), 0)
  }
  
  getItems() {
    // TODO: Retornar copia de #items
  }
}

// TESTING:
const order = new Order('ORD-001');
order.addItem('Laptop', 1, 1000);
order.addItem('Mouse', 2, 25);
console.log(order.getTotal());  // 1050
console.log(order.getItems().length);  // 2
```

---

### 💡 HINTS

**Hint 1:** `addItem()` crea: `const item = new OrderItem(product, quantity, price)`

**Hint 2:** Después agrega: `this.#items.push(item)`

**Hint 3:** `getTotal()` usa reduce para sumar todos los items

---

## ✅ CHECKLIST BLOQUE 3

**Completaste el Bloque 3 cuando:**
- [ ] Ejercicio 11: Identificar Responsabilidades ✓
- [ ] Ejercicio 12: Agrupar Datos + Comportamiento ✓
- [ ] Ejercicio 13: State Management ✓
- [ ] Ejercicio 14: Getters/Setters ✓
- [ ] Ejercicio 15: Composición ✓

**¿Qué aprendiste?**
- [ ] Identifico entidades y sus responsabilidades
- [ ] Agrupo datos + comportamiento naturalmente
- [ ] Manejo estado de forma controlada
- [ ] Uso getters/setters para acceso controlado
- [ ] Compongo objetos (objetos dentro de objetos)

**Si respondiste SÍ → Continuar Bloque 4** 🚀

---

# BLOQUE 4: PATTERNS DE ORGANIZACIÓN

**Objetivo:** Aprender a ESTRUCTURAR clases y cómo organizarlas cuando trabajan juntas.

---

## 📝 EJERCICIO 16: Separación de Concerns

⏱️ **TIEMPO LÍMITE:** 30 min

### 🔍 CONCEPTO:

**Separación de Concerns = Cada clase tiene UNA responsabilidad clara**

Malo (todo en una clase):
```javascript
class User {
  // Datos de usuario
  // Validación
  // Persistencia en localStorage
  // Envío de emails
  // ❌ Demasiadas responsabilidades
}
```

Bueno (separado):
```javascript
class User {
  // Solo datos de usuario
}

class UserValidator {
  // Solo validación
}

class UserRepository {
  // Solo persistencia
}
```

---

### 🎯 TU TURNO:

**CONSIGNA:**

Separar el siguiente código "god class" en múltiples clases:

```javascript
// ============================================
// GOD CLASS (todo en una - malo)
// ============================================

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  // Validación
  validateEmail() {
    return this.email.includes('@');
  }
  
  // Persistencia
  save() {
    localStorage.setItem(`user_${this.email}`, JSON.stringify(this));
  }
  
  static load(email) {
    const data = localStorage.getItem(`user_${email}`);
    return data ? JSON.parse(data) : null;
  }
  
  // Notificación
  sendWelcomeEmail() {
    console.log(`Enviando email a ${this.email}`);
  }
}
```

**TU CÓDIGO (separar en 3 clases):**

```javascript
// ============================================
// SEPARADO (una responsabilidad por clase)
// ============================================

// Clase 1: Solo datos
class User {
  // TODO: Solo name y email
}

// Clase 2: Solo validación
class UserValidator {
  // TODO: validateEmail(email)
}

// Clase 3: Solo persistencia
class UserRepository {
  // TODO: save(user), load(email)
}

// Uso:
const user = new User('Juan', 'juan@example.com');
const validator = new UserValidator();
const repository = new UserRepository();

if (validator.validateEmail(user.email)) {
  repository.save(user);
}

const loaded = repository.load('juan@example.com');
console.log(loaded);
```

---

### 💡 HINTS

**Hint 1:** User solo tiene constructor con name y email

**Hint 2:** UserValidator tiene método estático o de instancia para validar

**Hint 3:** UserRepository maneja localStorage (save y load)

---

## 📝 EJERCICIO 17: Métodos Públicos vs Privados

⏱️ **TIEMPO LÍMITE:** 25 min

### 🔍 CONCEPTO:

**Público (#) vs Privado (#):**

```javascript
class Example {
  // Método PÚBLICO (puede llamarse desde afuera)
  publicMethod() {
    this.#privateMethod();  // Llamar método privado internamente
  }
  
  // Método PRIVADO (solo interno)
  #privateMethod() {
    // Lógica interna
  }
}

const ex = new Example();
ex.publicMethod();  // ✅ OK
ex.#privateMethod();  // ❌ Error
```

**Regla:** Si un método solo se usa INTERNAMENTE → hacerlo privado (#)

---

### 🎯 TU TURNO:

**CONSIGNA:**

Implementar **PasswordManager** con métodos públicos y privados:

**Métodos PÚBLICOS:**
- `setPassword(password)` → Guardar password (validar primero)
- `check(password)` → Verificar si coincide

**Métodos PRIVADOS:**
- `#validate(password)` → Validar longitud >= 6
- `#hash(password)` → Simular hash (invertir string)

**PLANTILLA:**

```javascript
class PasswordManager {
  #hashedPassword = null;
  
  // Método PRIVADO de validación
  #validate(password) {
    // TODO: Retornar true si password.length >= 6
  }
  
  // Método PRIVADO de hash
  #hash(password) {
    // TODO: Simular hash invirtiendo string
    // Hint: password.split('').reverse().join('')
  }
  
  // Método PÚBLICO
  setPassword(password) {
    // TODO: Validar con #validate()
    // TODO: Si válido, guardar #hash(password) en #hashedPassword
  }
  
  // Método PÚBLICO
  check(password) {
    // TODO: Comparar #hash(password) con #hashedPassword
  }
}

// TESTING:
const pm = new PasswordManager();
pm.setPassword('123456');
console.log(pm.check('123456'));  // true
console.log(pm.check('wrong'));  // false

// pm.#validate('test');  // ❌ Error (privado)
// pm.#hash('test');  // ❌ Error (privado)
```

---

### 💡 HINTS

**Hint 1:** Métodos privados empiezan con `#` en la declaración

**Hint 2:** Llamar método privado: `this.#validate(password)`

**Hint 3:** Hash simple: `password.split('').reverse().join('')`

---

## 📝 EJERCICIO 18: Clases Trabajando Juntas

⏱️ **TIEMPO LÍMITE:** 35 min

### 🎯 TU TURNO:

**CONSIGNA:**

Implementar sistema donde **múltiples clases coordinan:**

**Sistema:** Biblioteca Simple

**Clases:**
1. `Book` → Representa un libro (title, author, isAvailable)
2. `Library` → Gestiona colección de libros (add, borrow, return, search)

**PLANTILLA:**

```javascript
class Book {
  constructor(title, author) {
    // TODO: Asignar title, author
    // TODO: isAvailable = true (por defecto)
  }
  
  borrow() {
    // TODO: Marcar isAvailable = false
  }
  
  return() {
    // TODO: Marcar isAvailable = true
  }
}

class Library {
  #books = [];
  
  addBook(title, author) {
    // TODO: Crear Book y agregar a #books
  }
  
  borrowBook(title) {
    // TODO: Buscar libro por título
    // TODO: Si está disponible, llamar book.borrow()
    // TODO: Retornar true/false
  }
  
  returnBook(title) {
    // TODO: Buscar libro y llamar book.return()
  }
  
  searchByAuthor(author) {
    // TODO: Filtrar #books por author
    // Retornar array de libros
  }
  
  getAvailableBooks() {
    // TODO: Filtrar #books donde isAvailable === true
  }
}

// TESTING:
const library = new Library();
library.addBook('1984', 'Orwell');
library.addBook('Dune', 'Herbert');
library.addBook('Foundation', 'Asimov');

console.log(library.getAvailableBooks().length);  // 3

library.borrowBook('1984');
console.log(library.getAvailableBooks().length);  // 2

library.returnBook('1984');
console.log(library.getAvailableBooks().length);  // 3
```

---

### 💡 HINTS

**Hint 1:** `addBook()` crea: `const book = new Book(title, author); this.#books.push(book);`

**Hint 2:** `borrowBook()` busca: `const book = this.#books.find(b => b.title === title)`

**Hint 3:** `searchByAuthor()` filtra: `return this.#books.filter(b => b.author === author)`

---

## 📝 EJERCICIO 19: Dependencias entre Clases

⏱️ **TIEMPO LÍMITE:** 30 min

### 🔍 CONCEPTO:

**Inyección de dependencias = Pasar clases que necesita como parámetro**

```javascript
class Logger {
  log(message) {
    console.log(`[LOG] ${message}`);
  }
}

class UserService {
  constructor(logger) {  // ← Inyectar dependencia
    this.logger = logger;
  }
  
  createUser(name) {
    this.logger.log(`Usuario creado: ${name}`);
  }
}

const logger = new Logger();
const service = new UserService(logger);  // ← Pasar dependencia
service.createUser('Juan');
```

---

### 🎯 TU TURNO:

**CONSIGNA:**

Implementar sistema con dependencias:

**Clases:**
1. `EmailService` → Simula envío de emails
2. `UserService` → Crea usuarios y envía email de bienvenida (usa EmailService)

**PLANTILLA:**

```javascript
class EmailService {
  send(to, subject, body) {
    // TODO: Simular envío (console.log)
    console.log(`Enviando email a ${to}: ${subject}`);
  }
}

class UserService {
  #emailService;
  
  constructor(emailService) {
    // TODO: Guardar emailService
  }
  
  createUser(name, email) {
    // TODO: Crear usuario (objeto simple)
    const user = { name, email };
    
    // TODO: Enviar email de bienvenida usando #emailService
    this.#emailService.send(
      email,
      'Bienvenido',
      `Hola ${name}, bienvenido!`
    );
    
    return user;
  }
}

// TESTING:
const emailService = new EmailService();
const userService = new UserService(emailService);

const user = userService.createUser('Juan', 'juan@example.com');
// Debería mostrar: "Enviando email a juan@example.com: Bienvenido"
```

---

### 💡 HINTS

**Hint 1:** Constructor de UserService: `this.#emailService = emailService`

**Hint 2:** Llamar método: `this.#emailService.send(...)`

**Hint 3:** EmailService.send() solo hace console.log (simular)

---

## 📝 EJERCICIO 20: Arquitectura Simple (3 Clases)

⏱️ **TIEMPO LÍMITE:** 40 min

### 🎯 TU TURNO (Integrador del Bloque 4):

**CONSIGNA:**

Implementar **Sistema de Tareas** con 3 clases coordinadas:

**Arquitectura:**
1. `Task` → Representa una tarea (id, title, completed)
2. `TaskManager` → Gestiona colección de tareas (add, toggle, getAll)
3. `TaskRepository` → Persistencia en localStorage

**PLANTILLA:**

```javascript
// ============================================
// CLASE 1: Task (modelo de datos)
// ============================================
class Task {
  constructor(id, title) {
    // TODO: Asignar id, title, completed = false
  }
  
  toggle() {
    // TODO: Cambiar completed
  }
}

// ============================================
// CLASE 2: TaskRepository (persistencia)
// ============================================
class TaskRepository {
  #storageKey = 'tasks';
  
  save(tasks) {
    // TODO: Guardar en localStorage
    // Hint: JSON.stringify(tasks)
  }
  
  load() {
    // TODO: Cargar de localStorage
    // Retornar array vacío si no existe
  }
}

// ============================================
// CLASE 3: TaskManager (lógica de negocio)
// ============================================
class TaskManager {
  #tasks = [];
  #nextId = 1;
  #repository;
  
  constructor(repository) {
    // TODO: Guardar repository
    // TODO: Cargar tareas: this.#tasks = repository.load()
  }
  
  add(title) {
    // TODO: Crear Task, agregar a #tasks
    // TODO: Guardar con #repository.save(this.#tasks)
  }
  
  toggle(id) {
    // TODO: Buscar task y llamar task.toggle()
    // TODO: Guardar cambios
  }
  
  getAll() {
    // TODO: Retornar copia de #tasks
  }
}

// TESTING:
const repository = new TaskRepository();
const manager = new TaskManager(repository);

manager.add('Comprar leche');
manager.add('Estudiar JS');

console.log(manager.getAll().length);  // 2

// Recargar (simular)
const manager2 = new TaskManager(repository);
console.log(manager2.getAll().length);  // 2 (persistió)
```

---

### 💡 HINTS

**Hint 1:** Task es simple, solo datos + método toggle

**Hint 2:** TaskRepository usa `localStorage.setItem()` y `getItem()`

**Hint 3:** TaskManager coordina todo: crea Tasks, usa Repository

---

## ✅ CHECKLIST BLOQUE 4

**Completaste el Bloque 4 cuando:**
- [ ] Ejercicio 16: Separación de Concerns ✓
- [ ] Ejercicio 17: Públicos vs Privados ✓
- [ ] Ejercicio 18: Clases Trabajando Juntas ✓
- [ ] Ejercicio 19: Dependencias ✓
- [ ] Ejercicio 20: Arquitectura Simple ✓

**¿Qué aprendiste?**
- [ ] Separo responsabilidades en clases distintas
- [ ] Uso métodos privados (#) para lógica interna
- [ ] Coordino múltiples clases trabajando juntas
- [ ] Inyecto dependencias (pasar clases como parámetros)
- [ ] Diseño arquitecturas simples (3+ clases)

**Si respondiste SÍ → ¡WARMUP COMPLETADO!** 🎉

---

## 🎯 PRÓXIMO PASO

**Opciones:**

**A)** Descansar hoy, arrancar mini-proyectos mañana
**B)** Seguir con mini-proyectos ahora (si tenés energía)

**Los mini-proyectos consolidarán TODO lo aprendido en este warmup.**

---

## 📊 RESUMEN DEL WARMUP

**Completaste 20 ejercicios:**
- ✅ Bloque 1 (5): Refactoring lado a lado
- ✅ Bloque 2 (5): Cuándo usar función vs clase
- ✅ Bloque 3 (5): Pensar en objetos
- ✅ Bloque 4 (5): Patterns de organización

**Tiempo total invertido:** ____ horas

**Lo que dominás ahora:**
1. ✅ Ver diferencias funciones vs clases claramente
2. ✅ Decidir cuándo usar cada enfoque
3. ✅ Identificar responsabilidades y entidades
4. ✅ Agrupar datos + comportamiento
5. ✅ Manejar estado de forma controlada
6. ✅ Usar getters/setters apropiadamente
7. ✅ Componer objetos
8. ✅ Separar concerns (una responsabilidad por clase)
9. ✅ Usar métodos privados (#)
10. ✅ Coordinar múltiples clases

**¡FELICITACIONES! Completaste el Warmup Semana 3 V2.0** 🔥

---

**Avisame cuando termines para generar los mini-proyectos.** 💪

FIN DEL WARMUP
