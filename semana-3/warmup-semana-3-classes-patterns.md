# 🎓 WARMUP SEMANA 3: Classes & Patterns

**Objetivo:** Dominar sintaxis de Classes y decidir cuándo usar Class vs Factory Function.

**Duración:** 6-9 horas (2 días máximo)

**Formato:** 10 ejercicios progresivos

---

## ⏰ GOVERNOR ACTIVO

**Límites por ejercicio:**
- ⏱️ Máximo 30 min por ejercicio
- ✅ Si funciona y entendiste → NEXT
- ✅ No iterar perfeccionando
- ❌ Si te trabás >30 min → ver hints

**Límite total:**
- 📅 2 días máximo (con 3 hrs/día)
- 🎯 Completar los 10 ejercicios
- 🚀 Después → Proyecto Final

---

## 📚 ÍNDICE

**CLASSES (6 ejercicios):**
1. Class básica
2. Extends + super
3. Static methods
4. Private fields (#)
5. Getters/Setters
6. Class vs Factory (CRÍTICO)

**PATTERNS (4 ejercicios):**
7. Singleton Pattern
8. Factory Pattern avanzado
9. Observer Pattern
10. Error handling avanzado

---

# PARTE 1: CLASSES

---

## 📝 EJERCICIO 1: Class Básica

⏱️ **TIEMPO LÍMITE:** 20 min

### 🔍 EJEMPLO RESUELTO (estudiar primero):

```javascript
// ============================================
// EJEMPLO: Class User básica
// ============================================

class User {
  // Constructor: se ejecuta al hacer new User()
  constructor(name, email) {
    // Propiedades de instancia
    this.name = name;
    this.email = email;
    this.createdAt = new Date();
  }
  
  // Método de instancia
  greet() {
    return `Hola, soy ${this.name}`;
  }
  
  // Otro método
  getInfo() {
    return {
      name: this.name,
      email: this.email,
      createdAt: this.createdAt
    };
  }
}

// Uso:
const user1 = new User('Ana', 'ana@example.com');
const user2 = new User('Bob', 'bob@example.com');

console.log(user1.greet());  // "Hola, soy Ana"
console.log(user2.greet());  // "Hola, soy Bob"

console.log(user1.name);      // "Ana"
console.log(user1.getInfo()); // { name: 'Ana', email: '...', createdAt: ... }
```

**¿Qué pasa internamente?**
1. `new User('Ana', 'ana@...')` → Crea objeto vacío `{}`
2. Ejecuta `constructor()` → Asigna propiedades al objeto
3. Retorna el objeto creado
4. `user1` ahora es un objeto con propiedades y métodos

---

### 🎯 TU TURNO:

**CONSIGNA:**

Crear una clase `Product` para un e-commerce que:
- Tenga propiedades: `name`, `price`, `stock`
- Método `buy(quantity)` que:
  - Reste la cantidad del stock
  - Retorne el total (price * quantity)
  - Si no hay stock suficiente, retorne `null`
- Método `restock(quantity)` que agregue al stock
- Método `getInfo()` que retorne un objeto con toda la info

**PLANTILLA:**

```javascript
class Product {
  constructor(name, price, stock) {
    // TU CÓDIGO: Asignar propiedades
  }
  
  buy(quantity) {
    // TU CÓDIGO: Verificar stock, restar, retornar total
  }
  
  restock(quantity) {
    // TU CÓDIGO: Agregar al stock
  }
  
  getInfo() {
    // TU CÓDIGO: Retornar objeto con toda la info
  }
}

// TESTING:
const laptop = new Product('Laptop', 1000, 5);

console.log(laptop.buy(2));      // 2000
console.log(laptop.stock);       // 3
console.log(laptop.buy(10));     // null (no hay stock)
console.log(laptop.restock(5));  
console.log(laptop.stock);       // 8
```

**RESULTADO ESPERADO:**
```
2000
3
null
8
```

---

### 💡 HINTS (solo si te trabás >15 min):

**Hint 1:** En `buy()`, primero verificar `if (this.stock >= quantity)`

**Hint 2:** Si hay stock, hacer `this.stock -= quantity` y retornar `this.price * quantity`

**Hint 3:** `restock()` simplemente hace `this.stock += quantity`

---

## 📝 EJERCICIO 2: Extends + Super (Herencia)

⏱️ **TIEMPO LÍMITE:** 25 min

### 🔍 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Herencia con extends y super
// ============================================

// Clase base (padre)
class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  eat() {
    return `${this.name} está comiendo`;
  }
  
  sleep() {
    return `${this.name} está durmiendo`;
  }
}

// Clase derivada (hijo) que EXTIENDE Animal
class Dog extends Animal {
  constructor(name, age, breed) {
    // super() llama al constructor del padre
    super(name, age);  // ← IMPORTANTE: Debe ser la primera línea
    
    // Propiedades adicionales del hijo
    this.breed = breed;
  }
  
  // Método propio del hijo
  bark() {
    return `${this.name} dice: Guau!`;
  }
  
  // Sobreescribir método del padre
  eat() {
    // Llamar al método del padre
    const parentEat = super.eat();
    return `${parentEat} (croquetas)`;
  }
}

// Uso:
const animal = new Animal('Genérico', 5);
console.log(animal.eat());   // "Genérico está comiendo"

const dog = new Dog('Rex', 3, 'Labrador');
console.log(dog.name);       // "Rex" (heredado)
console.log(dog.age);        // 3 (heredado)
console.log(dog.breed);      // "Labrador" (propio)
console.log(dog.eat());      // "Rex está comiendo (croquetas)"
console.log(dog.bark());     // "Rex dice: Guau!"
console.log(dog.sleep());    // "Rex está durmiendo" (heredado)
```

**Conceptos clave:**
- `extends` → Heredar de otra clase
- `super()` → Llamar constructor del padre (OBLIGATORIO si hay constructor en el hijo)
- `super.metodo()` → Llamar método del padre

---

### 🎯 TU TURNO:

**CONSIGNA:**

Crear:
1. Clase base `Vehicle` con:
   - Propiedades: `brand`, `year`, `km`
   - Método `drive(distance)` que sume km
   - Método `getInfo()` que retorne info básica

2. Clase `Car` que extienda `Vehicle` con:
   - Propiedad adicional: `doors` (número de puertas)
   - Método `honk()` que retorne "Beep beep!"
   - Sobreescribir `getInfo()` para incluir `doors`

3. Clase `Motorcycle` que extienda `Vehicle` con:
   - Propiedad adicional: `type` ('sport', 'cruiser', 'touring')
   - Método `wheelie()` que retorne "Haciendo caballito!"
   - Sobreescribir `getInfo()` para incluir `type`

**PLANTILLA:**

```javascript
class Vehicle {
  constructor(brand, year) {
    // TU CÓDIGO
  }
  
  drive(distance) {
    // TU CÓDIGO: Sumar km
  }
  
  getInfo() {
    // TU CÓDIGO: Retornar objeto con brand, year, km
  }
}

class Car extends Vehicle {
  constructor(brand, year, doors) {
    // TU CÓDIGO: Llamar super() y asignar doors
  }
  
  honk() {
    // TU CÓDIGO
  }
  
  getInfo() {
    // TU CÓDIGO: Llamar super.getInfo() y agregar doors
  }
}

class Motorcycle extends Vehicle {
  constructor(brand, year, type) {
    // TU CÓDIGO
  }
  
  wheelie() {
    // TU CÓDIGO
  }
  
  getInfo() {
    // TU CÓDIGO
  }
}

// TESTING:
const car = new Car('Toyota', 2020, 4);
car.drive(100);
console.log(car.honk());      // "Beep beep!"
console.log(car.getInfo());   // { brand: 'Toyota', year: 2020, km: 100, doors: 4 }

const moto = new Motorcycle('Harley', 2019, 'cruiser');
moto.drive(50);
console.log(moto.wheelie());  // "Haciendo caballito!"
console.log(moto.getInfo());  // { brand: 'Harley', year: 2019, km: 50, type: 'cruiser' }
```

---

### 💡 HINTS:

**Hint 1:** En el hijo, SIEMPRE llamar `super(...)` primero

**Hint 2:** Para sobreescribir `getInfo()`: `return { ...super.getInfo(), doors: this.doors }`

**Hint 3:** `drive(distance)` simplemente hace `this.km += distance`

---

## 📝 EJERCICIO 3: Static Methods

⏱️ **TIEMPO LÍMITE:** 20 min

### 🔍 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Métodos estáticos (static)
// ============================================

class MathUtils {
  // Método estático: se llama en la CLASE, no en instancias
  static add(a, b) {
    return a + b;
  }
  
  static multiply(a, b) {
    return a * b;
  }
  
  // Propiedad estática
  static PI = 3.14159;
  
  // Método estático que usa otra propiedad estática
  static circleArea(radius) {
    return this.PI * radius * radius;  // this = la clase
  }
}

// Uso de métodos estáticos:
console.log(MathUtils.add(5, 3));        // 8
console.log(MathUtils.multiply(4, 2));   // 8
console.log(MathUtils.PI);               // 3.14159
console.log(MathUtils.circleArea(5));    // 78.53975

// ❌ NO se puede usar en instancias:
const utils = new MathUtils();
// utils.add(5, 3);  // ← ERROR: add no existe en la instancia
```

**¿Cuándo usar static?**
- Métodos de utilidad (no necesitan instancia)
- Factory methods (crear instancias de formas específicas)
- Constantes de la clase

---

### 🎯 TU TURNO:

**CONSIGNA:**

Crear clase `User` con:

**Métodos de instancia:**
- Constructor: `username`, `email`, `role` ('user' por defecto)
- `isAdmin()` → retorna true si role es 'admin'

**Métodos estáticos:**
- `createAdmin(username, email)` → Retorna instancia con role 'admin'
- `createGuest()` → Retorna instancia con username 'Guest', email '', role 'guest'
- `validateEmail(email)` → Retorna true si email contiene '@'
- Propiedad estática `ROLES` → Array con roles válidos: ['admin', 'user', 'guest']

**PLANTILLA:**

```javascript
class User {
  // Propiedad estática
  static ROLES = // TU CÓDIGO
  
  constructor(username, email, role = 'user') {
    // TU CÓDIGO
  }
  
  isAdmin() {
    // TU CÓDIGO
  }
  
  // Factory method estático
  static createAdmin(username, email) {
    // TU CÓDIGO: Retornar new User(username, email, 'admin')
  }
  
  static createGuest() {
    // TU CÓDIGO
  }
  
  static validateEmail(email) {
    // TU CÓDIGO: Retornar email.includes('@')
  }
}

// TESTING:
const admin = User.createAdmin('John', 'john@example.com');
console.log(admin.isAdmin());           // true
console.log(admin.role);                // 'admin'

const guest = User.createGuest();
console.log(guest.username);            // 'Guest'
console.log(guest.role);                // 'guest'

console.log(User.validateEmail('test@example.com'));  // true
console.log(User.validateEmail('invalid'));           // false
console.log(User.ROLES);                // ['admin', 'user', 'guest']
```

---

### 💡 HINTS:

**Hint 1:** Métodos estáticos NO usan `this` para referirse a instancia

**Hint 2:** `createAdmin()` retorna `new User(username, email, 'admin')`

**Hint 3:** `createGuest()` retorna `new User('Guest', '', 'guest')`

---

## 📝 EJERCICIO 4: Private Fields (#)

⏱️ **TIEMPO LÍMITE:** 25 min

### 🔍 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Campos privados con #
// ============================================

class BankAccount {
  // Campo privado (solo accesible dentro de la clase)
  #balance = 0;
  #pin;
  
  constructor(accountNumber, pin) {
    this.accountNumber = accountNumber;  // Público
    this.#pin = pin;                     // Privado
  }
  
  // Método para depositar (modifica campo privado)
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      return `Depositado: $${amount}. Balance: $${this.#balance}`;
    }
    return 'Monto inválido';
  }
  
  // Método para retirar (requiere PIN)
  withdraw(amount, pin) {
    // Validar PIN (privado)
    if (pin !== this.#pin) {
      return 'PIN incorrecto';
    }
    
    if (amount > this.#balance) {
      return 'Fondos insuficientes';
    }
    
    this.#balance -= amount;
    return `Retirado: $${amount}. Balance: $${this.#balance}`;
  }
  
  // Getter para leer balance (privado)
  getBalance(pin) {
    if (pin !== this.#pin) {
      return 'PIN incorrecto';
    }
    return this.#balance;
  }
}

// Uso:
const account = new BankAccount('123456', 1234);

console.log(account.deposit(100));         // "Depositado: $100. Balance: $100"
console.log(account.withdraw(50, 1234));   // "Retirado: $50. Balance: $50"
console.log(account.withdraw(50, 9999));   // "PIN incorrecto"
console.log(account.getBalance(1234));     // 50

// ❌ NO se puede acceder directamente:
// console.log(account.#balance);  // ERROR: Private field
// console.log(account.#pin);      // ERROR: Private field
```

**¿Por qué usar campos privados?**
- Encapsulación: Proteger datos sensibles
- Control: Validar antes de modificar
- Seguridad: No se pueden modificar desde afuera

---

### 🎯 TU TURNO:

**CONSIGNA:**

Crear clase `PasswordManager` con:

**Campos privados:**
- `#masterPassword` (se setea en constructor)
- `#passwords` (objeto vacío inicialmente)

**Métodos públicos:**
- `addPassword(service, password, masterPassword)` → 
  - Verificar masterPassword
  - Si es correcto, guardar en `#passwords[service] = password`
  - Retornar success/error
  
- `getPassword(service, masterPassword)` →
  - Verificar masterPassword
  - Retornar password o error
  
- `listServices(masterPassword)` →
  - Verificar masterPassword
  - Retornar array de servicios (Object.keys)
  
- `changeMasterPassword(oldPassword, newPassword)` →
  - Verificar oldPassword
  - Cambiar a newPassword

**PLANTILLA:**

```javascript
class PasswordManager {
  #masterPassword;
  #passwords = {};
  
  constructor(masterPassword) {
    // TU CÓDIGO
  }
  
  addPassword(service, password, masterPassword) {
    // TU CÓDIGO: Verificar master, guardar, retornar mensaje
  }
  
  getPassword(service, masterPassword) {
    // TU CÓDIGO
  }
  
  listServices(masterPassword) {
    // TU CÓDIGO
  }
  
  changeMasterPassword(oldPassword, newPassword) {
    // TU CÓDIGO
  }
}

// TESTING:
const pm = new PasswordManager('master123');

console.log(pm.addPassword('gmail', 'pass123', 'master123'));    // "Password guardado"
console.log(pm.addPassword('github', 'gitpass', 'wrong'));       // "Master password incorrecto"

console.log(pm.getPassword('gmail', 'master123'));               // "pass123"
console.log(pm.getPassword('gmail', 'wrong'));                   // "Master password incorrecto"

console.log(pm.listServices('master123'));                       // ['gmail']

pm.changeMasterPassword('master123', 'newmaster');
console.log(pm.getPassword('gmail', 'newmaster'));               // "pass123"
```

---

### 💡 HINTS:

**Hint 1:** Siempre verificar `if (masterPassword !== this.#masterPassword) return 'Error'`

**Hint 2:** Para guardar: `this.#passwords[service] = password`

**Hint 3:** Para listar: `Object.keys(this.#passwords)`

---

## 📝 EJERCICIO 5: Getters/Setters

⏱️ **TIEMPO LÍMITE:** 25 min

### 🔍 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Getters y Setters
// ============================================

class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  
  // Getter: propiedad computada (se accede como propiedad, no método)
  get area() {
    return this.width * this.height;
  }
  
  get perimeter() {
    return 2 * (this.width + this.height);
  }
  
  // Setter: validar antes de asignar
  set width(value) {
    if (value <= 0) {
      throw new Error('Width debe ser positivo');
    }
    this._width = value;  // Guardar en propiedad interna
  }
  
  get width() {
    return this._width;
  }
  
  set height(value) {
    if (value <= 0) {
      throw new Error('Height debe ser positivo');
    }
    this._height = value;
  }
  
  get height() {
    return this._height;
  }
}

// Uso:
const rect = new Rectangle(10, 5);

// Getters se usan como propiedades (sin paréntesis)
console.log(rect.area);       // 50 (no rect.area())
console.log(rect.perimeter);  // 30

// Setters se usan como asignaciones
rect.width = 20;              // Llama al setter
console.log(rect.area);       // 100 (se recalcula)

// rect.width = -5;  // ERROR: "Width debe ser positivo"
```

**¿Cuándo usar getters/setters?**
- **Getter:** Propiedades computadas (area, fullName, age desde birthdate)
- **Setter:** Validar antes de asignar (no permitir valores negativos, formats, etc.)

---

### 🎯 TU TURNO:

**CONSIGNA:**

Crear clase `Temperature` con:

**Constructor:** Recibe temperatura en Celsius

**Getters:**
- `celsius` → Retorna temperatura en °C
- `fahrenheit` → Retorna temperatura en °F (formula: C * 9/5 + 32)
- `kelvin` → Retorna temperatura en K (formula: C + 273.15)
- `description` → Retorna:
  - "Congelante" si < 0°C
  - "Frío" si 0-15°C
  - "Templado" si 15-25°C
  - "Caliente" si > 25°C

**Setters:**
- `celsius` → Setear temperatura en °C (validar >= -273.15, cero absoluto)
- `fahrenheit` → Setear temperatura en °F (convertir a °C y guardar)
- `kelvin` → Setear temperatura en K (convertir a °C y guardar)

**PLANTILLA:**

```javascript
class Temperature {
  constructor(celsius) {
    // TU CÓDIGO: Guardar en propiedad privada o _celsius
  }
  
  get celsius() {
    // TU CÓDIGO
  }
  
  set celsius(value) {
    // TU CÓDIGO: Validar >= -273.15, asignar
  }
  
  get fahrenheit() {
    // TU CÓDIGO: Retornar celsius * 9/5 + 32
  }
  
  set fahrenheit(value) {
    // TU CÓDIGO: Convertir a celsius y asignar
    // Formula: (F - 32) * 5/9
  }
  
  get kelvin() {
    // TU CÓDIGO
  }
  
  set kelvin(value) {
    // TU CÓDIGO: Convertir a celsius (K - 273.15)
  }
  
  get description() {
    // TU CÓDIGO: Retornar string según temperatura
  }
}

// TESTING:
const temp = new Temperature(20);

console.log(temp.celsius);      // 20
console.log(temp.fahrenheit);   // 68
console.log(temp.kelvin);       // 293.15
console.log(temp.description);  // "Templado"

temp.fahrenheit = 32;           // Setear en °F
console.log(temp.celsius);      // 0
console.log(temp.description);  // "Frío"

temp.kelvin = 300;
console.log(temp.celsius);      // 26.85
console.log(temp.description);  // "Caliente"
```

---

### 💡 HINTS:

**Hint 1:** Guardar temperatura internamente en `_celsius` (con underscore)

**Hint 2:** `set fahrenheit(value)` hace `this.celsius = (value - 32) * 5/9`

**Hint 3:** Usar if/else para `description` según rangos de `this.celsius`

---

## 📝 EJERCICIO 6: Class vs Factory (CRÍTICO)

⏱️ **TIEMPO LÍMITE:** 30 min

### 🔍 EJEMPLO RESUELTO:

```javascript
// ============================================
// COMPARACIÓN: Class vs Factory Function
// ============================================

// ─────────────────────────────────────────
// OPCIÓN 1: CLASS
// ─────────────────────────────────────────
class CounterClass {
  constructor(initialValue = 0) {
    this.count = initialValue;
  }
  
  increment() {
    this.count++;
  }
  
  decrement() {
    this.count--;
  }
  
  getValue() {
    return this.count;
  }
}

// Uso:
const counter1 = new CounterClass(10);
counter1.increment();
console.log(counter1.getValue());  // 11
console.log(counter1.count);       // 11 (accesible directamente)

// ─────────────────────────────────────────
// OPCIÓN 2: FACTORY FUNCTION
// ─────────────────────────────────────────
function createCounter(initialValue = 0) {
  // Variable privada (closure)
  let count = initialValue;
  
  // Retornar objeto con métodos
  return {
    increment() {
      count++;
    },
    
    decrement() {
      count--;
    },
    
    getValue() {
      return count;
    }
  };
}

// Uso:
const counter2 = createCounter(10);
counter2.increment();
console.log(counter2.getValue());  // 11
console.log(counter2.count);       // undefined (privado real)

// ─────────────────────────────────────────
// COMPARACIÓN
// ─────────────────────────────────────────

console.log('=== DIFERENCIAS ===');

// 1. Privacidad
console.log(counter1.count);  // 11 (público, modificable)
console.log(counter2.count);  // undefined (privado real)

// 2. Prototype
console.log(counter1 instanceof CounterClass);  // true
console.log(counter2 instanceof Object);        // true (genérico)

// 3. Extensibilidad
class AdvancedCounter extends CounterClass {
  reset() {
    this.count = 0;
  }
}
// Con factory, no podés hacer extends

// 4. Performance
// Class: Métodos compartidos en prototype (más eficiente)
// Factory: Métodos se crean en cada instancia (menos eficiente)
```

**¿Cuándo usar cada uno?**

| Aspecto | Class | Factory |
|---------|-------|---------|
| **Privacidad real** | ❌ (solo con #) | ✅ (con closure) |
| **Herencia** | ✅ extends | ❌ No soporta |
| **Performance** | ✅ Mejor | ⚠️ Peor |
| **Sintaxis** | ⚠️ Más verbosa | ✅ Más simple |
| **instanceof** | ✅ Funciona | ❌ No funciona |

**Recomendación:**
- **Usar Class:** Si necesitás herencia, instanceof, o muchas instancias (performance)
- **Usar Factory:** Si necesitás privacidad total y no necesitás herencia

---

### 🎯 TU TURNO:

**CONSIGNA:**

Implementar un **todo list manager** de DOS formas:

**1. Con Class:**
```javascript
class TodoManager {
  // Implementar con class
  // - Array de todos (público)
  // - Métodos: add, remove, getAll, getCompleted
}
```

**2. Con Factory:**
```javascript
function createTodoManager() {
  // Implementar con factory
  // - Array de todos (privado con closure)
  // - Retornar objeto con métodos
}
```

**Ambas implementaciones deben:**
- Inicializar array de todos vacío
- `add(text)` → Agregar { id: Date.now(), text, completed: false }
- `remove(id)` → Eliminar todo por id
- `toggle(id)` → Cambiar completed de true/false
- `getAll()` → Retornar array de todos
- `getCompleted()` → Retornar solo los completados

**Después, responder:**
1. ¿En cuál podés acceder directamente al array de todos desde afuera?
2. ¿Cuál soporta herencia?
3. ¿Cuál usarías para este caso y por qué?

**PLANTILLA:**

```javascript
// ============================================
// IMPLEMENTACIÓN 1: CLASS
// ============================================
class TodoManager {
  // TU CÓDIGO
}

// ============================================
// IMPLEMENTACIÓN 2: FACTORY
// ============================================
function createTodoManager() {
  // TU CÓDIGO
}

// ============================================
// TESTING AMBAS
// ============================================
console.log('=== CLASS ===');
const manager1 = new TodoManager();
manager1.add('Comprar leche');
manager1.add('Estudiar JS');
manager1.toggle(manager1.getAll()[0].id);
console.log(manager1.getAll());
console.log(manager1.getCompleted());
console.log('Acceso directo:', manager1.todos);  // ¿Funciona?

console.log('\n=== FACTORY ===');
const manager2 = createTodoManager();
manager2.add('Comprar leche');
manager2.add('Estudiar JS');
manager2.toggle(manager2.getAll()[0].id);
console.log(manager2.getAll());
console.log(manager2.getCompleted());
console.log('Acceso directo:', manager2.todos);  // ¿Funciona?

// ============================================
// TUS RESPUESTAS:
// ============================================
/*
1. ¿En cuál podés acceder directamente al array?
   RESPUESTA: 

2. ¿Cuál soporta herencia?
   RESPUESTA: 

3. ¿Cuál usarías para este caso?
   RESPUESTA: 
*/
```

---

### 💡 HINTS:

**Hint 1 (Class):** 
```javascript
class TodoManager {
  constructor() {
    this.todos = [];  // Público
  }
  add(text) {
    this.todos.push({ id: Date.now(), text, completed: false });
  }
  // ...
}
```

**Hint 2 (Factory):**
```javascript
function createTodoManager() {
  const todos = [];  // Privado (closure)
  
  return {
    add(text) {
      todos.push({ id: Date.now(), text, completed: false });
    },
    // ...
  };
}
```

**Hint 3:** Para getCompleted: `return todos.filter(t => t.completed)`

---

# PARTE 2: PATTERNS

---

## 📝 EJERCICIO 7: Singleton Pattern

⏱️ **TIEMPO LÍMITE:** 25 min

### 🔍 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Singleton Pattern
// ============================================

// Singleton: Solo UNA instancia de la clase existe
class Database {
  // Variable estática para guardar la instancia única
  static #instance = null;
  
  constructor() {
    // Si ya existe una instancia, retornar esa
    if (Database.#instance) {
      return Database.#instance;
    }
    
    // Si no existe, crear la primera instancia
    this.connected = false;
    this.data = [];
    
    // Guardar referencia
    Database.#instance = this;
  }
  
  connect() {
    this.connected = true;
    console.log('Conectado a la DB');
  }
  
  query(sql) {
    if (!this.connected) {
      throw new Error('No conectado');
    }
    console.log(`Ejecutando: ${sql}`);
  }
}

// Uso:
const db1 = new Database();
db1.connect();

const db2 = new Database();  // ← Retorna la MISMA instancia

console.log(db1 === db2);  // true (son el mismo objeto)

db2.query('SELECT * FROM users');  // Funciona porque db1 ya conectó
```

**¿Cuándo usar Singleton?**
- ✅ Conexiones a DB (solo una conexión)
- ✅ Logger global (un solo archivo de logs)
- ✅ Configuración de app (un solo config object)
- ❌ **NO usar** si necesitás múltiples instancias

---

### 🎯 TU TURNO:

**CONSIGNA:**

Implementar `Logger` como Singleton que:
- Solo permita UNA instancia
- Tenga array de logs privado
- Métodos:
  - `log(message)` → Agregar log con timestamp
  - `error(message)` → Agregar error con timestamp
  - `getLogs()` → Retornar todos los logs
  - `clear()` → Limpiar logs

**PLANTILLA:**

```javascript
class Logger {
  static #instance = null;
  #logs = [];
  
  constructor() {
    // TU CÓDIGO: Implementar singleton
  }
  
  log(message) {
    // TU CÓDIGO: Agregar { type: 'log', message, timestamp: new Date() }
  }
  
  error(message) {
    // TU CÓDIGO: Agregar { type: 'error', message, timestamp: new Date() }
  }
  
  getLogs() {
    // TU CÓDIGO
  }
  
  clear() {
    // TU CÓDIGO
  }
}

// TESTING:
const logger1 = new Logger();
logger1.log('App iniciada');

const logger2 = new Logger();
logger2.error('Error de conexión');

console.log(logger1 === logger2);      // true
console.log(logger1.getLogs().length); // 2 (ambos loggers comparten logs)
```

---

### 💡 HINTS:

**Hint 1:** En constructor: `if (Logger.#instance) return Logger.#instance`

**Hint 2:** Al final de constructor: `Logger.#instance = this`

**Hint 3:** `log()` hace `this.#logs.push({ type: 'log', message, timestamp: new Date() })`

---

## 📝 EJERCICIO 8: Factory Pattern Avanzado

⏱️ **TIEMPO LÍMITE:** 30 min

### 🔍 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Factory Pattern Avanzado
// ============================================

// Factory para crear diferentes tipos de usuarios
class UserFactory {
  // Crear usuario según tipo
  static createUser(type, data) {
    switch (type) {
      case 'admin':
        return new AdminUser(data);
      
      case 'moderator':
        return new ModeratorUser(data);
      
      case 'regular':
        return new RegularUser(data);
      
      default:
        throw new Error(`Tipo desconocido: ${type}`);
    }
  }
}

// Clases específicas
class AdminUser {
  constructor({ name, email }) {
    this.name = name;
    this.email = email;
    this.role = 'admin';
    this.permissions = ['read', 'write', 'delete', 'manage'];
  }
  
  can(action) {
    return this.permissions.includes(action);
  }
}

class ModeratorUser {
  constructor({ name, email }) {
    this.name = name;
    this.email = email;
    this.role = 'moderator';
    this.permissions = ['read', 'write', 'delete'];
  }
  
  can(action) {
    return this.permissions.includes(action);
  }
}

class RegularUser {
  constructor({ name, email }) {
    this.name = name;
    this.email = email;
    this.role = 'regular';
    this.permissions = ['read'];
  }
  
  can(action) {
    return this.permissions.includes(action);
  }
}

// Uso:
const admin = UserFactory.createUser('admin', {
  name: 'John',
  email: 'john@example.com'
});

const regular = UserFactory.createUser('regular', {
  name: 'Jane',
  email: 'jane@example.com'
});

console.log(admin.can('delete'));    // true
console.log(regular.can('delete'));  // false
```

**¿Cuándo usar Factory?**
- ✅ Crear objetos complejos según configuración
- ✅ Lógica de creación compleja
- ✅ Múltiples variantes de un tipo

---

### 🎯 TU TURNO:

**CONSIGNA:**

Implementar `VehicleFactory` que cree vehículos según tipo:

**Tipos:**
- `'car'` → 4 ruedas, capacidad 5 personas
- `'motorcycle'` → 2 ruedas, capacidad 2 personas
- `'truck'` → 6 ruedas, capacidad 3 personas, carga 1000kg

Cada vehículo debe tener:
- Propiedades: brand, model, wheels, capacity, (cargo solo trucks)
- Método `getInfo()` que retorne objeto con toda la info
- Método `canCarry(people)` que retorne true/false según capacidad

**PLANTILLA:**

```javascript
class VehicleFactory {
  static createVehicle(type, brand, model) {
    // TU CÓDIGO: Switch según type, retornar instancia apropiada
  }
}

class Car {
  constructor(brand, model) {
    // TU CÓDIGO
  }
  
  getInfo() {
    // TU CÓDIGO
  }
  
  canCarry(people) {
    // TU CÓDIGO
  }
}

class Motorcycle {
  // TU CÓDIGO: Similar a Car
}

class Truck {
  // TU CÓDIGO: Similar pero con cargo
}

// TESTING:
const car = VehicleFactory.createVehicle('car', 'Toyota', 'Corolla');
const moto = VehicleFactory.createVehicle('motorcycle', 'Yamaha', 'R1');
const truck = VehicleFactory.createVehicle('truck', 'Volvo', 'FH16');

console.log(car.getInfo());        // { brand: 'Toyota', model: 'Corolla', wheels: 4, capacity: 5 }
console.log(moto.canCarry(3));     // false
console.log(truck.canCarry(2));    // true
console.log(truck.cargo);          // 1000
```

---

### 💡 HINTS:

**Hint 1:** Factory usa switch/case para decidir qué clase instanciar

**Hint 2:** Cada clase tiene propiedades hardcoded según su tipo

**Hint 3:** `canCarry(people)` retorna `people <= this.capacity`

---

## 📝 EJERCICIO 9: Observer Pattern

⏱️ **TIEMPO LÍMITE:** 30 min

### 🔍 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Observer Pattern (Pub/Sub)
// ============================================

// Subject (el que notifica)
class NewsletterManager {
  constructor() {
    this.subscribers = [];  // Lista de observers
  }
  
  // Agregar observer
  subscribe(observer) {
    this.subscribers.push(observer);
    console.log(`${observer.name} suscrito`);
  }
  
  // Remover observer
  unsubscribe(observer) {
    this.subscribers = this.subscribers.filter(sub => sub !== observer);
    console.log(`${observer.name} desuscrito`);
  }
  
  // Notificar a TODOS los observers
  notify(message) {
    console.log(`\nNotificando a ${this.subscribers.length} suscriptores...`);
    this.subscribers.forEach(subscriber => {
      subscriber.update(message);
    });
  }
}

// Observer (el que escucha)
class EmailSubscriber {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  update(message) {
    console.log(`📧 ${this.name} recibió: "${message}" en ${this.email}`);
  }
}

// Uso:
const newsletter = new NewsletterManager();

const sub1 = new EmailSubscriber('Ana', 'ana@example.com');
const sub2 = new EmailSubscriber('Bob', 'bob@example.com');

newsletter.subscribe(sub1);
newsletter.subscribe(sub2);

newsletter.notify('¡Nueva oferta disponible!');
// Ana y Bob reciben la notificación

newsletter.unsubscribe(sub1);

newsletter.notify('Recordatorio de evento');
// Solo Bob recibe
```

**¿Cuándo usar Observer?**
- ✅ Sistema de notificaciones
- ✅ Event system (como EventEmitter)
- ✅ Actualizar múltiples componentes cuando cambia un estado

---

### 🎯 TU TURNO:

**CONSIGNA:**

Implementar sistema de notificaciones de stock:

**StockManager (Subject):**
- Mantener stock de productos
- Notificar cuando stock cambia
- Métodos: subscribe, unsubscribe, setStock, getStock, notify

**Observer (Subscriber):**
- Recibir notificaciones de cambio de stock
- Diferentes tipos:
  - EmailNotifier → Envía email (simular con console.log)
  - SMSNotifier → Envía SMS (simular con console.log)
  - LogNotifier → Registra en log

**PLANTILLA:**

```javascript
class StockManager {
  constructor() {
    this.stock = {};       // { productId: quantity }
    this.subscribers = []; // Observers
  }
  
  subscribe(observer) {
    // TU CÓDIGO
  }
  
  unsubscribe(observer) {
    // TU CÓDIGO
  }
  
  setStock(productId, quantity) {
    this.stock[productId] = quantity;
    // TU CÓDIGO: Notificar cambio
    this.notify({ productId, quantity });
  }
  
  getStock(productId) {
    return this.stock[productId] || 0;
  }
  
  notify(data) {
    // TU CÓDIGO: Llamar update() en cada subscriber
  }
}

class EmailNotifier {
  constructor(email) {
    this.email = email;
  }
  
  update(data) {
    console.log(`📧 Email a ${this.email}: Stock de ${data.productId} = ${data.quantity}`);
  }
}

class SMSNotifier {
  constructor(phone) {
    this.phone = phone;
  }
  
  update(data) {
    console.log(`📱 SMS a ${this.phone}: Stock de ${data.productId} = ${data.quantity}`);
  }
}

class LogNotifier {
  update(data) {
    console.log(`📝 LOG: [${new Date().toISOString()}] Stock de ${data.productId} = ${data.quantity}`);
  }
}

// TESTING:
const stockManager = new StockManager();

const emailNotifier = new EmailNotifier('admin@store.com');
const smsNotifier = new SMSNotifier('+123456789');
const logNotifier = new LogNotifier();

stockManager.subscribe(emailNotifier);
stockManager.subscribe(smsNotifier);
stockManager.subscribe(logNotifier);

stockManager.setStock('laptop', 10);
// Todos reciben notificación

stockManager.unsubscribe(smsNotifier);

stockManager.setStock('laptop', 5);
// Solo email y log reciben
```

---

### 💡 HINTS:

**Hint 1:** `notify(data)` hace `this.subscribers.forEach(sub => sub.update(data))`

**Hint 2:** `subscribe` simplemente hace `this.subscribers.push(observer)`

**Hint 3:** Cada notifier tiene método `update(data)` que maneja la notificación

---

## 📝 EJERCICIO 10: Error Handling Avanzado

⏱️ **TIEMPO LÍMITE:** 25 min

### 🔍 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Custom Errors
// ============================================

// Error personalizado
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

class NotFoundError extends Error {
  constructor(message, resource) {
    super(message);
    this.name = 'NotFoundError';
    this.resource = resource;
  }
}

// Clase que usa custom errors
class UserService {
  constructor() {
    this.users = [];
  }
  
  createUser(data) {
    // Validación
    if (!data.email) {
      throw new ValidationError('Email requerido', 'email');
    }
    
    if (!data.email.includes('@')) {
      throw new ValidationError('Email inválido', 'email');
    }
    
    const user = { id: Date.now(), ...data };
    this.users.push(user);
    return user;
  }
  
  findUser(id) {
    const user = this.users.find(u => u.id === id);
    
    if (!user) {
      throw new NotFoundError(`Usuario no encontrado`, 'user');
    }
    
    return user;
  }
}

// Uso con try/catch
const service = new UserService();

try {
  service.createUser({ name: 'Ana' });  // Falta email
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(`❌ Validación: ${error.message} (campo: ${error.field})`);
  }
}

try {
  const user = service.createUser({ email: 'ana@example.com', name: 'Ana' });
  console.log('✓ Usuario creado:', user);
  
  service.findUser(999);  // No existe
} catch (error) {
  if (error instanceof NotFoundError) {
    console.log(`❌ No encontrado: ${error.message} (recurso: ${error.resource})`);
  }
}
```

---

### 🎯 TU TURNO:

**CONSIGNA:**

Implementar sistema de productos con custom errors:

**Custom Errors:**
1. `InsufficientStockError` → Cuando no hay stock suficiente
2. `InvalidPriceError` → Cuando precio es <= 0
3. `DuplicateError` → Cuando producto ya existe

**ProductStore:**
- `addProduct(id, name, price, stock)` → Validar precio, verificar duplicados
- `buy(productId, quantity)` → Verificar stock, restar
- `getProduct(id)` → Retornar producto o lanzar NotFoundError

**PLANTILLA:**

```javascript
// Custom Errors
class InsufficientStockError extends Error {
  constructor(productId, requested, available) {
    super(`Stock insuficiente para ${productId}`);
    this.name = 'InsufficientStockError';
    this.productId = productId;
    this.requested = requested;
    this.available = available;
  }
}

class InvalidPriceError extends Error {
  // TU CÓDIGO
}

class DuplicateError extends Error {
  // TU CÓDIGO
}

class ProductStore {
  constructor() {
    this.products = {};  // { id: { name, price, stock } }
  }
  
  addProduct(id, name, price, stock) {
    // TU CÓDIGO:
    // 1. Validar price > 0 (lanzar InvalidPriceError)
    // 2. Verificar que no exista (lanzar DuplicateError)
    // 3. Agregar producto
  }
  
  buy(productId, quantity) {
    // TU CÓDIGO:
    // 1. Verificar que existe producto
    // 2. Verificar stock >= quantity (lanzar InsufficientStockError)
    // 3. Restar stock
    // 4. Retornar total (price * quantity)
  }
  
  getProduct(id) {
    // TU CÓDIGO: Retornar o lanzar error si no existe
  }
}

// TESTING:
const store = new ProductStore();

try {
  store.addProduct('laptop', 'Laptop Pro', -100, 5);
} catch (error) {
  console.log(`❌ ${error.name}: ${error.message}`);
}

try {
  store.addProduct('laptop', 'Laptop Pro', 1000, 5);
  console.log('✓ Producto agregado');
  
  store.addProduct('laptop', 'Laptop Pro 2', 1200, 3);
} catch (error) {
  console.log(`❌ ${error.name}: ${error.message}`);
}

try {
  const total = store.buy('laptop', 10);
} catch (error) {
  if (error instanceof InsufficientStockError) {
    console.log(`❌ Stock: pediste ${error.requested}, hay ${error.available}`);
  }
}

try {
  const total = store.buy('laptop', 2);
  console.log(`✓ Compra exitosa: $${total}`);
} catch (error) {
  console.log(`❌ Error: ${error.message}`);
}
```

---

### 💡 HINTS:

**Hint 1:** En `addProduct`, verificar `if (price <= 0) throw new InvalidPriceError(...)`

**Hint 2:** Verificar duplicado con `if (this.products[id]) throw new DuplicateError(...)`

**Hint 3:** En `buy`, verificar `if (quantity > stock) throw new InsufficientStockError(...)`

---

## ✅ CHECKLIST FINAL

**Completaste el Warmup cuando:**
- [ ] Ejercicio 1: Class básica ✓
- [ ] Ejercicio 2: Extends + super ✓
- [ ] Ejercicio 3: Static methods ✓
- [ ] Ejercicio 4: Private fields ✓
- [ ] Ejercicio 5: Getters/Setters ✓
- [ ] Ejercicio 6: Class vs Factory ✓
- [ ] Ejercicio 7: Singleton ✓
- [ ] Ejercicio 8: Factory avanzado ✓
- [ ] Ejercicio 9: Observer ✓
- [ ] Ejercicio 10: Error handling ✓

**Tiempo total invertido:** ____ horas

**Auto-evaluación:**
- ¿Entendés cuándo usar Class vs Factory?
- ¿Sabés cuándo usar Singleton?
- ¿Dominás Observer Pattern?
- ¿Te sentís cómodo con custom errors?

**Si respondiste SÍ a todas → Estás listo para el Proyecto Final.** 🚀

---

## 🎯 PRÓXIMO PASO

**Una vez completado el Warmup:**
1. Avisar que terminaste
2. Feedback de lo que más costó
3. Arrancar Proyecto Final: **Task Management System**

**Duracion Proyecto Final:** 5 días

**Nivel:** Integra TODO lo aprendido (Semana 1 + 2 + 3)

---

**¡Éxitos con el Warmup!** 💪
