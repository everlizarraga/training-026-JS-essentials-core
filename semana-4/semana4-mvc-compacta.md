# 🏗️ SEMANA 4: MVC (Model-View-Controller)

**Versión:** Compacta  
**Duración:** 3-4 días  
**Objetivo:** Formalizar el patrón MVC que ya aplicaste intuitivamente

---

## 📊 METADATA

**¿Por qué versión compacta?**
- ✅ Ya aplicaste MVC sin saberlo (Tu Todo List ES MVC)
- ✅ Entendés separación de concerns perfectamente
- ✅ Aprendés rápido (completaste mini-proyectos en 1 día)
- ✅ Mejor aprovechar tiempo en proyectos integradores

**Estructura:**
- **Día 1:** Concepto MVC claro (2-3 horas)
- **Día 2:** Warmup compacto (6 ejercicios, 3-4 horas)
- **Días 3-4:** 1 proyecto MVC aplicado (6-9 horas)

**Total:** 11-16 horas (3-4 días con 3-4 hrs/día)

---

## ⏰ GOVERNOR ACTIVO

- 📅 **Día 1:** Concepto (máximo 3 horas)
- 📅 **Día 2:** Warmup (máximo 4 horas, 6 ejercicios)
- 📅 **Días 3-4:** Proyecto (máximo 2 días)
- ✅ **80% funcional = Suficiente**
- 🚫 **Máximo 2 iteraciones**

---

# 📚 DÍA 1: CONCEPTO MVC

## 🎯 ¿QUÉ ES MVC?

**MVC = Model-View-Controller**

Es un **patrón de diseño** para organizar código en 3 responsabilidades separadas.

---

## 🔍 TU TODO LIST YA ES MVC (sin que lo supieras)

**Mirá tu código del Proyecto 2:**

```javascript
// ============================================
// MODEL (TodoManager + Todo)
// Responsabilidad: Datos y lógica de negocio
// ============================================

class Todo {
  // Representa UNA tarea (modelo de datos)
}

class TodoManager {
  // Gestiona COLECCIÓN de tareas (lógica de negocio)
  add(title) { ... }
  remove(id) { ... }
  toggle(id) { ... }
  getAll() { ... }
}

// ============================================
// VIEW (métodos render de App)
// Responsabilidad: Presentación (UI)
// ============================================

class App {
  render() {
    // Actualiza UI según datos del Model
  }
  
  renderTodo(todo) {
    // Genera HTML de una tarea
  }
  
  updateStats() {
    // Actualiza estadísticas en UI
  }
}

// ============================================
// CONTROLLER (resto de App.js)
// Responsabilidad: Coordinación
// ============================================

class App {
  setupListeners() {
    // Escucha eventos del usuario
  }
  
  addTodo() {
    // 1. Coordina: obtiene input del View
    // 2. Llama al Model: manager.add(title)
    // 3. Actualiza View: render()
  }
  
  toggleTodo(id) {
    // 1. Llama al Model: manager.toggle(id)
    // 2. Actualiza View: render()
  }
}
```

**¡ESO ES MVC!** Ya lo hiciste. Solo falta formalizarlo.

---

## 📊 DIAGRAMA MVC

```
┌─────────────────────────────────────────────────┐
│                    USER                         │
│  (Click botón, escribe input, etc.)             │
└────────────────┬────────────────────────────────┘
                 │
                 ↓ (Evento)
┌─────────────────────────────────────────────────┐
│               CONTROLLER                        │
│  - Escucha eventos del usuario                  │
│  - Decide qué hacer                             │
│  - Coordina Model y View                        │
│                                                 │
│  Métodos:                                       │
│  - setupListeners()                             │
│  - addTodo()                                    │
│  - toggleTodo()                                 │
│  - deleteTodo()                                 │
└───────────┬─────────────────┬───────────────────┘
            │                 │
            ↓                 ↓
┌───────────────────┐  ┌──────────────────────┐
│      MODEL        │  │       VIEW           │
│  - Datos          │  │  - Presentación      │
│  - Lógica         │  │  - UI/HTML           │
│  - Reglas         │  │  - Renderizado       │
│                   │  │                      │
│  Clases:          │  │  Métodos:            │
│  - Todo           │  │  - render()          │
│  - TodoManager    │  │  - renderTodo()      │
│  - Repository     │  │  - updateStats()     │
└───────────────────┘  └──────────────────────┘
            ↓                 ↑
            └─────────────────┘
          (Model notifica cambios,
           View se actualiza)
```

---

## 💡 ANALOGÍA: RESTAURANTE

**Para entenderlo mejor:**

```
RESTAURANTE = APP

┌─────────────────────────────────────┐
│ CLIENTE (Usuario)                   │
│ "Quiero pizza margarita"            │
└────────────┬────────────────────────┘
             ↓
┌─────────────────────────────────────┐
│ MESERO (Controller)                 │
│ - Escucha al cliente                │
│ - Toma el pedido                    │
│ - Lo pasa a cocina                  │
│ - Trae la comida al cliente         │
└──────┬──────────────────┬───────────┘
       ↓                  ↓
┌──────────────┐   ┌─────────────────┐
│ COCINA       │   │ PRESENTACIÓN    │
│ (Model)      │   │ (View)          │
│              │   │                 │
│ - Prepara    │   │ - Plato bonito  │
│ - Ingredientes│  │ - Decoración    │
│ - Recetas    │   │ - Mesa servida  │
└──────────────┘   └─────────────────┘
```

**Separación clara:**
- **Cliente** no entra a cocina (Usuario no toca Model directamente)
- **Mesero** coordina (Controller)
- **Cocina** hace la comida (Model procesa datos)
- **Presentación** hace ver bien (View renderiza)

---

## 🎯 RESPONSABILIDADES (MVC)

### **MODEL (Modelo)**

**Responsabilidad:** Datos + Lógica de negocio

**QUÉ hace:**
- ✅ Mantener estado de la app
- ✅ Validar datos
- ✅ Realizar operaciones (CRUD)
- ✅ Aplicar reglas de negocio

**QUÉ NO hace:**
- ❌ Saber de HTML/CSS
- ❌ Escuchar eventos del DOM
- ❌ Renderizar UI

**Ejemplo:**
```javascript
class TodoManager {
  #todos = [];
  
  add(title) {
    // ✅ Validar
    if (!title) throw new Error('Título requerido');
    
    // ✅ Crear todo
    const todo = new Todo(this.#nextId++, title);
    
    // ✅ Agregar a colección
    this.#todos.push(todo);
    
    // ✅ Retornar
    return todo;
    
    // ❌ NO renderizar HTML
    // ❌ NO actualizar DOM
  }
}
```

---

### **VIEW (Vista)**

**Responsabilidad:** Presentación (UI)

**QUÉ hace:**
- ✅ Renderizar datos como HTML
- ✅ Mostrar información al usuario
- ✅ Actualizar interfaz
- ✅ Formatear datos para presentación

**QUÉ NO hace:**
- ❌ Procesar lógica de negocio
- ❌ Validar datos
- ❌ Decidir qué hacer

**Ejemplo:**
```javascript
class TodoView {
  render(todos) {
    // ✅ Generar HTML
    return todos.map(todo => `
      <div class="todo-item ${todo.completed ? 'completed' : ''}">
        <span>${todo.title}</span>
      </div>
    `).join('');
    
    // ❌ NO decidir si agregar/eliminar
    // ❌ NO validar datos
  }
}
```

---

### **CONTROLLER (Controlador)**

**Responsabilidad:** Coordinación

**QUÉ hace:**
- ✅ Escuchar eventos del usuario
- ✅ Decidir qué hacer
- ✅ Llamar al Model (lógica)
- ✅ Actualizar View (UI)
- ✅ Coordinar flujo de la app

**QUÉ NO hace:**
- ❌ Procesar datos complejos (eso es Model)
- ❌ Generar HTML directamente (eso es View)

**Ejemplo:**
```javascript
class TodoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
  
  addTodo(title) {
    // ✅ Llamar Model (lógica)
    this.model.add(title);
    
    // ✅ Actualizar View (UI)
    this.updateView();
    
    // ❌ NO validar aquí (Model lo hace)
    // ❌ NO generar HTML aquí (View lo hace)
  }
  
  updateView() {
    // ✅ Obtener datos del Model
    const todos = this.model.getAll();
    
    // ✅ Pedir a View que renderice
    const html = this.view.render(todos);
    
    // ✅ Actualizar DOM
    document.getElementById('todo-list').innerHTML = html;
  }
}
```

---

## 🔄 FLUJO COMPLETO (ejemplo)

**Usuario agrega tarea "Comprar leche":**

```
1. USER (Usuario)
   └─> Escribe "Comprar leche" en input
   └─> Click en botón "Agregar"
   
2. CONTROLLER (escucha evento)
   └─> addTodo('Comprar leche')
   
3. MODEL (procesa)
   └─> Valida título
   └─> Crea nuevo Todo
   └─> Agrega a colección
   └─> Retorna todo creado
   
4. CONTROLLER (coordina)
   └─> Recibe todo del Model
   └─> Llama a updateView()
   
5. VIEW (renderiza)
   └─> model.getAll() → Obtiene todas las tareas
   └─> Genera HTML de cada tarea
   └─> Retorna HTML completo
   
6. CONTROLLER (actualiza DOM)
   └─> Inserta HTML en el DOM
   
7. USER (ve resultado)
   └─> "Comprar leche" aparece en la lista ✅
```

---

## ✅ VENTAJAS DE MVC

**1. Separación de Concerns**
- ✅ Cada parte tiene una responsabilidad clara
- ✅ Fácil de entender qué hace cada clase
- ✅ Código organizado

**2. Facilita Testing**
- ✅ Puedo testear Model sin UI
- ✅ Puedo testear View sin lógica
- ✅ Puedo testear Controller independiente

**3. Reutilización**
- ✅ Mismo Model con diferentes Views
- ✅ Ejemplo: App web + App móvil = mismo Model, diferente View

**4. Mantenimiento**
- ✅ Cambiar UI → Solo modifico View
- ✅ Cambiar lógica → Solo modifico Model
- ✅ No se rompe todo al cambiar una parte

**5. Escalabilidad**
- ✅ Agregar features es más fácil
- ✅ Múltiples desarrolladores pueden trabajar en paralelo
- ✅ Model, View, Controller por separado

---

## ❌ ANTI-PATTERN: TODO EN UNA CLASE

**MAL (sin MVC):**

```javascript
class TodoApp {
  #todos = [];
  
  addTodo() {
    // ❌ Obtener input (View)
    const title = document.getElementById('input').value;
    
    // ❌ Validar (Model)
    if (!title) {
      alert('Error');
      return;
    }
    
    // ❌ Crear todo (Model)
    const todo = { id: Date.now(), title };
    this.#todos.push(todo);
    
    // ❌ Renderizar (View)
    const html = `<div>${title}</div>`;
    document.getElementById('list').innerHTML += html;
    
    // TODO MEZCLADO → Difícil de mantener
  }
}
```

**BIEN (con MVC):**

```javascript
// MODEL (lógica pura)
class TodoModel {
  add(title) {
    if (!title) throw new Error('Título requerido');
    const todo = { id: Date.now(), title };
    this.#todos.push(todo);
    return todo;
  }
}

// VIEW (presentación pura)
class TodoView {
  renderTodo(todo) {
    return `<div>${todo.title}</div>`;
  }
}

// CONTROLLER (coordinación)
class TodoController {
  addTodo() {
    const title = this.getInputValue();  // View
    this.model.add(title);                // Model
    this.updateView();                    // View
  }
}
```

---

## 🧠 TU TODO LIST REFACTORIZADO A MVC PURO

**Así quedaría tu Proyecto 2 con MVC formal:**

```javascript
// ============================================
// MODEL
// ============================================

class TodoModel {
  #todos = [];
  #nextId = 1;
  
  add(title) { /* lógica pura */ }
  remove(id) { /* lógica pura */ }
  toggle(id) { /* lógica pura */ }
  getAll() { /* retornar datos */ }
}

// ============================================
// VIEW
// ============================================

class TodoView {
  constructor(rootElement) {
    this.root = rootElement;
  }
  
  render(todos) {
    // Generar HTML puro
    const html = todos.map(t => this.renderTodo(t)).join('');
    this.root.innerHTML = html;
  }
  
  renderTodo(todo) {
    // HTML de una tarea
    return `<div class="todo-item">...</div>`;
  }
  
  getInputValue() {
    // Obtener valor del input
    return document.getElementById('todo-input').value;
  }
  
  clearInput() {
    document.getElementById('todo-input').value = '';
  }
}

// ============================================
// CONTROLLER
// ============================================

class TodoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
  
  init() {
    this.setupListeners();
    this.updateView();
  }
  
  setupListeners() {
    // Escuchar eventos
    document.getElementById('btn-add').addEventListener('click', () => {
      this.addTodo();
    });
  }
  
  addTodo() {
    const title = this.view.getInputValue();
    this.model.add(title);
    this.view.clearInput();
    this.updateView();
  }
  
  updateView() {
    const todos = this.model.getAll();
    this.view.render(todos);
  }
}

// ============================================
// INICIALIZACIÓN
// ============================================

const model = new TodoModel();
const view = new TodoView(document.getElementById('todo-list'));
const controller = new TodoController(model, view);

controller.init();
```

**Diferencia con tu versión:**
- Tu versión: App.js hace de Controller + View mezclado
- MVC puro: Separado en 3 clases distintas

**Ambas funcionan igual.** MVC puro es más formal, tu versión es pragmática.

---

## 📝 RESUMEN DÍA 1

**Lo que aprendiste:**

1. ✅ **MVC = 3 responsabilidades separadas**
   - Model: Datos + Lógica
   - View: Presentación + UI
   - Controller: Coordinación

2. ✅ **Ya aplicaste MVC sin saberlo**
   - Tu Todo List ES MVC
   - Solo falta formalizarlo

3. ✅ **Ventajas de MVC**
   - Separación de concerns
   - Facilita testing
   - Reutilización
   - Mantenimiento
   - Escalabilidad

4. ✅ **Flujo MVC**
   - User → Controller → Model → Controller → View → User

---

## ✅ CHECKLIST DÍA 1

- [ ] Entendí qué es MVC ✓
- [ ] Vi que mi Todo List ya ES MVC ✓
- [ ] Entendí responsabilidades (M, V, C) ✓
- [ ] Entendí flujo completo ✓
- [ ] Vi ventajas de MVC ✓

**Si respondiste SÍ a todo → Continuar Día 2 (Warmup)** 🚀

---

# 🏋️ DÍA 2: WARMUP MVC (6 ejercicios)

**Objetivo:** Practicar separación Model-View-Controller

**Duración:** 3-4 horas

---

## 📝 EJERCICIO 1: Identificar M-V-C

⏱️ **TIEMPO LÍMITE:** 20 min

### 🔍 EJEMPLO RESUELTO:

**Código mezclado (sin MVC):**

```javascript
class Counter {
  #count = 0;
  
  increment() {
    // Lógica (Model)
    this.#count++;
    
    // UI (View)
    document.getElementById('display').textContent = this.#count;
  }
}
```

**Identificar:**
- ❌ Model y View mezclados
- Línea 5: Model (lógica)
- Línea 8: View (UI)

---

### 🎯 TU TURNO:

**CONSIGNA:**

Dado el siguiente código, **identificar** qué líneas son Model, View o Controller:

```javascript
class UserForm {
  submit() {
    // Línea A
    const name = document.getElementById('name').value;
    
    // Línea B
    if (name.length < 3) {
      alert('Nombre muy corto');
      return;
    }
    
    // Línea C
    const user = { id: Date.now(), name };
    this.users.push(user);
    
    // Línea D
    const html = `<div>${user.name}</div>`;
    document.getElementById('list').innerHTML += html;
  }
}
```

**IDENTIFICAR:**

- Línea A: ¿Model, View o Controller?
- Línea B: ¿Model, View o Controller?
- Línea C: ¿Model, View o Controller?
- Línea D: ¿Model, View o Controller?

**RESPUESTA:**
```
Línea A: _______________
Línea B: _______________
Línea C: _______________
Línea D: _______________
```

---

### 💡 HINTS

**Hint 1:** Obtener valor del DOM = View

**Hint 2:** Validar datos = Model

**Hint 3:** Crear/guardar datos = Model

**Hint 4:** Generar/insertar HTML = View

---

## 📝 EJERCICIO 2: Separar M-V-C (Counter)

⏱️ **TIEMPO LÍMITE:** 30 min

### 🔍 EJEMPLO RESUELTO:

**ANTES (mezclado):**
```javascript
class Counter {
  #count = 0;
  
  increment() {
    this.#count++;
    document.getElementById('display').textContent = this.#count;
  }
}
```

**DESPUÉS (separado en MVC):**

```javascript
// MODEL
class CounterModel {
  #count = 0;
  
  increment() {
    this.#count++;
  }
  
  getValue() {
    return this.#count;
  }
}

// VIEW
class CounterView {
  update(value) {
    document.getElementById('display').textContent = value;
  }
}

// CONTROLLER
class CounterController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
  
  increment() {
    this.model.increment();
    this.view.update(this.model.getValue());
  }
}
```

---

### 🎯 TU TURNO:

**CONSIGNA:**

Separar el siguiente código en MVC:

**CÓDIGO ORIGINAL (mezclado):**

```javascript
class Calculator {
  #result = 0;
  
  add(num) {
    this.#result += num;
    document.getElementById('display').value = this.#result;
  }
  
  subtract(num) {
    this.#result -= num;
    document.getElementById('display').value = this.#result;
  }
  
  clear() {
    this.#result = 0;
    document.getElementById('display').value = this.#result;
  }
}
```

**TU CÓDIGO (separar en 3 clases):**

```javascript
// ============================================
// MODEL
// ============================================

class CalculatorModel {
  // TODO: Implementar
  // Solo lógica de cálculo
}

// ============================================
// VIEW
// ============================================

class CalculatorView {
  // TODO: Implementar
  // Solo actualización de UI
}

// ============================================
// CONTROLLER
// ============================================

class CalculatorController {
  // TODO: Implementar
  // Coordina Model y View
}

// TESTING:
const model = new CalculatorModel();
const view = new CalculatorView();
const controller = new CalculatorController(model, view);

controller.add(5);   // Display muestra 5
controller.add(3);   // Display muestra 8
controller.clear();  // Display muestra 0
```

---

### 💡 HINTS

**Hint 1:** Model tiene #result y métodos add/subtract/clear/getValue

**Hint 2:** View tiene método update(value) que actualiza DOM

**Hint 3:** Controller llama model.add() luego view.update()

---

## 📝 EJERCICIO 3: Separar M-V-C (User List)

⏱️ **TIEMPO LÍMITE:** 35 min

### 🎯 TU TURNO:

**CONSIGNA:**

Refactorizar código mezclado a MVC:

**CÓDIGO ORIGINAL:**

```javascript
class UserList {
  #users = [];
  
  addUser(name) {
    // Validar
    if (name.length < 3) {
      alert('Nombre muy corto');
      return;
    }
    
    // Crear user
    const user = { id: Date.now(), name };
    this.#users.push(user);
    
    // Renderizar
    this.render();
  }
  
  render() {
    const html = this.#users
      .map(u => `<div>${u.name}</div>`)
      .join('');
    document.getElementById('user-list').innerHTML = html;
  }
}
```

**TU CÓDIGO (MVC):**

```javascript
// MODEL
class UserModel {
  // TODO: #users, add(name), getAll(), validar
}

// VIEW
class UserView {
  // TODO: render(users), showError(message)
}

// CONTROLLER
class UserController {
  // TODO: addUser(name), updateView()
}

// TESTING:
const model = new UserModel();
const view = new UserView(document.getElementById('user-list'));
const controller = new UserController(model, view);

controller.addUser('Juan');      // Agrega y renderiza
controller.addUser('AB');         // Muestra error
```

---

### 💡 HINTS

**Hint 1:** Model valida y lanza Error si inválido

**Hint 2:** Controller captura Error y llama view.showError()

**Hint 3:** View tiene métodos render() y showError()

---

## 📝 EJERCICIO 4: MVC con Eventos (Observer)

⏱️ **TIEMPO LÍMITE:** 40 min

### 🔍 CONCEPTO:

**Model notifica cambios automáticamente:**

```javascript
// Model emite eventos cuando cambia
class Model {
  #observers = [];
  
  subscribe(callback) {
    this.#observers.push(callback);
  }
  
  notify() {
    this.#observers.forEach(cb => cb());
  }
  
  changeData() {
    // ... cambiar datos
    this.notify();  // ← Avisar a observers
  }
}

// Controller se suscribe
model.subscribe(() => {
  view.render(model.getData());
});
```

---

### 🎯 TU TURNO:

**CONSIGNA:**

Implementar MVC con **Observer Pattern**:

```javascript
// MODEL con Observer
class TaskModel {
  #tasks = [];
  #observers = [];
  
  subscribe(callback) {
    // TODO: Agregar callback a observers
  }
  
  notify() {
    // TODO: Ejecutar todos los callbacks
  }
  
  add(title) {
    // TODO: Agregar task
    // TODO: Llamar notify()
  }
  
  getAll() {
    // TODO: Retornar tasks
  }
}

// VIEW
class TaskView {
  constructor(container) {
    this.container = container;
  }
  
  render(tasks) {
    // TODO: Renderizar tasks
  }
}

// CONTROLLER
class TaskController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    
    // TODO: Suscribirse a cambios del model
    // this.model.subscribe(() => { ... })
  }
  
  add(title) {
    // TODO: Solo llamar model.add()
    // (view se actualiza automáticamente por observer)
  }
}

// TESTING:
const model = new TaskModel();
const view = new TaskView(document.getElementById('tasks'));
const controller = new TaskController(model, view);

controller.add('Task 1');  // Se renderiza automáticamente
controller.add('Task 2');  // Se renderiza automáticamente
```

---

### 💡 HINTS

**Hint 1:** `subscribe()` hace `this.#observers.push(callback)`

**Hint 2:** `notify()` hace `this.#observers.forEach(cb => cb())`

**Hint 3:** Controller se suscribe en constructor: `model.subscribe(() => this.updateView())`

---

## 📝 EJERCICIO 5: MVC Completo (Form + List)

⏱️ **TIEMPO LÍMITE:** 45 min

### 🎯 TU TURNO:

**CONSIGNA:**

Implementar sistema completo con **formulario + lista**:

**Funcionalidad:**
- Input para agregar productos
- Lista que muestra productos
- Botón delete por producto
- Todo con MVC

**PLANTILLA:**

```javascript
// MODEL
class ProductModel {
  #products = [];
  #nextId = 1;
  #observers = [];
  
  // TODO: subscribe, notify
  // TODO: add(name, price)
  // TODO: remove(id)
  // TODO: getAll()
}

// VIEW
class ProductView {
  constructor(formId, listId) {
    // TODO: Guardar referencias DOM
  }
  
  // TODO: getFormData() → {name, price}
  // TODO: clearForm()
  // TODO: render(products)
  // TODO: setupFormListener(callback)
  // TODO: setupListListener(callback)
}

// CONTROLLER
class ProductController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    
    // TODO: Suscribirse a model
    // TODO: Setup listeners de view
  }
  
  // TODO: addProduct()
  // TODO: deleteProduct(id)
  // TODO: updateView()
}

// TESTING:
const model = new ProductModel();
const view = new ProductView('product-form', 'product-list');
const controller = new ProductController(model, view);
```

---

### 💡 HINTS

**Hint 1:** View NO llama a Model directamente, llama a Controller

**Hint 2:** View expone métodos: setupFormListener, setupListListener

**Hint 3:** Controller se suscribe a View Y a Model

---

## 📝 EJERCICIO 6: Decisión Arquitectónica

⏱️ **TIEMPO LÍMITE:** 30 min

### 🎯 TU TURNO:

**CONSIGNA:**

Para cada escenario, decidir: **¿Dónde va esta lógica? (Model, View o Controller)**

**1. Validar que email tenga @ **
- [ ] Model
- [ ] View  
- [ ] Controller
- ¿Por qué? ______________________

**2. Generar HTML de un usuario**
- [ ] Model
- [ ] View
- [ ] Controller
- ¿Por qué? ______________________

**3. Escuchar click en botón "Agregar"**
- [ ] Model
- [ ] View
- [ ] Controller
- ¿Por qué? ______________________

**4. Guardar en localStorage**
- [ ] Model
- [ ] View
- [ ] Controller
- ¿Por qué? ______________________

**5. Calcular total de un carrito**
- [ ] Model
- [ ] View
- [ ] Controller
- ¿Por qué? ______________________

**6. Mostrar mensaje de error en pantalla**
- [ ] Model
- [ ] View
- [ ] Controller
- ¿Por qué? ______________________

**7. Decidir qué hacer cuando user clickea delete**
- [ ] Model
- [ ] View
- [ ] Controller
- ¿Por qué? ______________________

**8. Ordenar array de productos por precio**
- [ ] Model
- [ ] View
- [ ] Controller
- ¿Por qué? ______________________

---

### 💡 CRITERIOS

**Model:**
- ✅ Lógica de negocio
- ✅ Validaciones
- ✅ Cálculos
- ✅ Operaciones con datos

**View:**
- ✅ Generar HTML
- ✅ Mostrar información
- ✅ Formatear datos para presentación

**Controller:**
- ✅ Escuchar eventos
- ✅ Decidir qué hacer
- ✅ Coordinar Model y View

---

## ✅ CHECKLIST DÍA 2

- [ ] Ejercicio 1: Identificar M-V-C ✓
- [ ] Ejercicio 2: Separar Counter ✓
- [ ] Ejercicio 3: Separar UserList ✓
- [ ] Ejercicio 4: MVC con Observer ✓
- [ ] Ejercicio 5: MVC completo (Form+List) ✓
- [ ] Ejercicio 6: Decisiones arquitectónicas ✓

**¿Qué aprendiste?**
- [ ] Identifico qué va en Model, View, Controller
- [ ] Separo código mezclado en MVC
- [ ] Implemento Observer Pattern
- [ ] Tengo criterio para decisiones arquitectónicas

**Si respondiste SÍ → Continuar Días 3-4 (Proyecto)** 🚀

---

# 🚀 DÍAS 3-4: PROYECTO MVC (Notes App)

**Duración:** 1-2 días  
**Objetivo:** Aplicar MVC formal en proyecto completo

---

## 🎯 ¿QUÉ VAS A CONSTRUIR?

Una **aplicación de notas** con arquitectura MVC formal:
- 3 clases MVC (NoteModel, NoteView, NoteController)
- CRUD completo
- Categorías
- Búsqueda
- Persistencia localStorage
- Observer Pattern

---

## 📅 CRONOGRAMA

### **DÍA 3: MVC Core**
1. Implementar NoteModel (lógica pura)
2. Implementar NoteView (UI pura)
3. Implementar NoteController (coordinación)
4. CRUD básico funcionando

### **DÍA 4: Features + Pulido**
1. Categorías
2. Búsqueda
3. Persistencia
4. Observer Pattern
5. Testing completo

---

## 💻 HTML/CSS BASE

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Notes App - MVC</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      min-height: 100vh;
      padding: 20px;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      overflow: hidden;
    }

    .header {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }

    .header h1 {
      font-size: 2rem;
    }

    /* Form */
    .note-form {
      padding: 20px;
      border-bottom: 1px solid #ddd;
    }

    .form-group {
      margin-bottom: 15px;
    }

    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: 600;
      color: #333;
    }

    .form-group input,
    .form-group textarea,
    .form-group select {
      width: 100%;
      padding: 10px;
      border: 2px solid #ddd;
      border-radius: 6px;
      font-family: inherit;
      font-size: 1rem;
    }

    .form-group input:focus,
    .form-group textarea:focus,
    .form-group select:focus {
      outline: none;
      border-color: #f5576c;
    }

    .form-group textarea {
      resize: vertical;
      min-height: 100px;
    }

    .btn-add {
      width: 100%;
      padding: 12px;
      background: #f5576c;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      cursor: pointer;
      font-weight: 600;
    }

    .btn-add:hover {
      background: #e04656;
    }

    /* Search */
    .search-box {
      padding: 15px 20px;
      background: #f8f9fa;
      border-bottom: 1px solid #ddd;
    }

    .search-input {
      width: 100%;
      padding: 10px;
      border: 2px solid #ddd;
      border-radius: 6px;
      font-size: 1rem;
    }

    /* Notes List */
    .notes-list {
      padding: 20px;
      min-height: 300px;
    }

    .note-card {
      background: #fff;
      border: 2px solid #ddd;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 15px;
      transition: all 0.3s ease;
    }

    .note-card:hover {
      border-color: #f5576c;
      box-shadow: 0 4px 8px rgba(245, 87, 108, 0.2);
    }

    .note-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .note-title {
      font-size: 1.2rem;
      font-weight: 600;
      color: #333;
    }

    .note-category {
      padding: 4px 8px;
      background: #f093fb;
      color: white;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .note-content {
      color: #666;
      margin-bottom: 10px;
      line-height: 1.5;
    }

    .note-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .note-date {
      font-size: 0.875rem;
      color: #999;
    }

    .btn-delete {
      padding: 6px 12px;
      background: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875rem;
    }

    .btn-delete:hover {
      background: #c82333;
    }

    /* Empty State */
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #999;
    }

    .empty-state h3 {
      font-size: 1.5rem;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>📝 Notes App (MVC)</h1>
    </div>

    <!-- Form -->
    <div class="note-form">
      <form id="note-form">
        <div class="form-group">
          <label for="note-title">Título</label>
          <input 
            type="text" 
            id="note-title" 
            placeholder="Título de la nota..."
            required
          >
        </div>

        <div class="form-group">
          <label for="note-content">Contenido</label>
          <textarea 
            id="note-content" 
            placeholder="Escribe tu nota aquí..."
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="note-category">Categoría</label>
          <select id="note-category">
            <option value="Personal">Personal</option>
            <option value="Work">Trabajo</option>
            <option value="Ideas">Ideas</option>
            <option value="Study">Estudio</option>
          </select>
        </div>

        <button type="submit" class="btn-add">➕ Agregar Nota</button>
      </form>
    </div>

    <!-- Search -->
    <div class="search-box">
      <input 
        type="text" 
        id="search-input" 
        class="search-input" 
        placeholder="🔍 Buscar notas..."
      >
    </div>

    <!-- Notes List (se renderiza dinámicamente) -->
    <div id="notes-list" class="notes-list">
      <!-- EJEMPLO de estructura (no funcional) -->
      
      <!-- Note 1 -->
      <div class="note-card">
        <div class="note-header">
          <div class="note-title">Mi primera nota</div>
          <span class="note-category">Personal</span>
        </div>
        <div class="note-content">
          Este es el contenido de mi primera nota. Puede ser largo y tener múltiples líneas.
        </div>
        <div class="note-footer">
          <span class="note-date">28/01/2026</span>
          <button class="btn-delete">🗑️ Eliminar</button>
        </div>
      </div>

      <!-- Note 2 -->
      <div class="note-card">
        <div class="note-header">
          <div class="note-title">Idea genial</div>
          <span class="note-category">Ideas</span>
        </div>
        <div class="note-content">
          Desarrollar una app de notas con MVC perfecto.
        </div>
        <div class="note-footer">
          <span class="note-date">28/01/2026</span>
          <button class="btn-delete">🗑️ Eliminar</button>
        </div>
      </div>
    </div>
  </div>

  <script type="module" src="app.js"></script>
</body>
</html>
```

---

## 🔨 PLANTILLAS MVC

### **note.js (Model de datos)**

```javascript
// ============================================
// NOTE MODEL (datos)
// ============================================

export class Note {
  constructor(id, title, content, category) {
    // TODO: Asignar propiedades
    // this.id = id
    // this.title = title
    // this.content = content
    // this.category = category
    // this.createdAt = new Date().toISOString()
  }

  toJSON() {
    // TODO: Retornar objeto plano
  }

  static fromJSON(json) {
    // TODO: Crear Note desde JSON
  }
}
```

---

### **note-model.js (Model con lógica)**

```javascript
// ============================================
// NOTE MODEL (lógica de negocio)
// ============================================

import { Note } from './note.js';

export class NoteModel {
  #notes = [];
  #nextId = 1;
  #observers = [];

  // ==========================================
  // OBSERVER PATTERN
  // ==========================================

  subscribe(callback) {
    // TODO: Implementar
  }

  notify() {
    // TODO: Implementar
  }

  // ==========================================
  // CRUD
  // ==========================================

  add(title, content, category) {
    // TODO: Validar (título y contenido requeridos)
    // TODO: Crear Note
    // TODO: Agregar a #notes
    // TODO: notify()
    // TODO: Retornar note
  }

  remove(id) {
    // TODO: Buscar y eliminar
    // TODO: notify()
  }

  getAll() {
    // TODO: Retornar copia
  }

  // ==========================================
  // QUERIES
  // ==========================================

  search(query) {
    // TODO: Filtrar por título o contenido
    // return this.#notes.filter(...)
  }

  getByCategory(category) {
    // TODO: Filtrar por categoría
  }

  // ==========================================
  // PERSISTENCE
  // ==========================================

  toJSON() {
    // TODO: Convertir a JSON
  }

  loadFromJSON(data) {
    // TODO: Cargar desde JSON
    // TODO: Actualizar #nextId
  }
}
```

---

### **note-view.js (View)**

```javascript
// ============================================
// NOTE VIEW (presentación)
// ============================================

export class NoteView {
  constructor(listId, formId, searchId) {
    // TODO: Guardar referencias DOM
    // this.listElement = document.getElementById(listId)
    // this.formElement = document.getElementById(formId)
    // this.searchElement = document.getElementById(searchId)
  }

  // ==========================================
  // RENDERING
  // ==========================================

  render(notes) {
    // TODO: Si vacío, renderEmpty()
    // TODO: Generar HTML de cada nota
    // TODO: Actualizar this.listElement.innerHTML
  }

  renderNote(note) {
    // TODO: Retornar HTML de una nota
    // Ver estructura en HTML arriba
  }

  renderEmpty() {
    // TODO: Mostrar empty state
  }

  // ==========================================
  // FORM
  // ==========================================

  getFormData() {
    // TODO: Obtener valores del form
    // return { title, content, category }
  }

  clearForm() {
    // TODO: Limpiar form
  }

  // ==========================================
  // SEARCH
  // ==========================================

  getSearchValue() {
    // TODO: Retornar valor del search input
  }

  // ==========================================
  // EVENT SETUP
  // ==========================================

  onSubmit(callback) {
    // TODO: Escuchar submit del form
    // preventDefault, llamar callback
  }

  onDelete(callback) {
    // TODO: Event delegation en lista
    // Escuchar clicks en .btn-delete
  }

  onSearch(callback) {
    // TODO: Escuchar input en search
  }
}
```

---

### **note-controller.js (Controller)**

```javascript
// ============================================
// NOTE CONTROLLER (coordinación)
// ============================================

import { NoteModel } from './note-model.js';
import { NoteView } from './note-view.js';

export class NoteController {
  constructor(model, view) {
    // TODO: Guardar model y view
    
    // TODO: Suscribirse a cambios del model
    // this.model.subscribe(() => this.updateView())
    
    // TODO: Setup listeners del view
    // this.view.onSubmit(() => this.addNote())
    // this.view.onDelete(id => this.deleteNote(id))
    // this.view.onSearch(query => this.search(query))
  }

  // ==========================================
  // ACTIONS
  // ==========================================

  addNote() {
    // TODO: Obtener datos del view
    // TODO: Llamar model.add()
    // TODO: Limpiar form
    // (view se actualiza automáticamente por observer)
  }

  deleteNote(id) {
    // TODO: Confirmar
    // TODO: Llamar model.remove(id)
  }

  search(query) {
    // TODO: Obtener notas filtradas del model
    // TODO: Renderizar con view
  }

  // ==========================================
  // VIEW UPDATE
  // ==========================================

  updateView() {
    // TODO: Obtener todas las notas
    // TODO: Renderizar con view
  }

  // ==========================================
  // PERSISTENCE
  // ==========================================

  save() {
    // TODO: model.toJSON() → localStorage
  }

  load() {
    // TODO: localStorage → model.loadFromJSON()
  }
}
```

---

### **app.js (Entry point)**

```javascript
// ============================================
// APP - ENTRY POINT
// ============================================

import { NoteModel } from './note-model.js';
import { NoteView } from './note-view.js';
import { NoteController } from './note-controller.js';

// Inicializar MVC
const model = new NoteModel();
const view = new NoteView('notes-list', 'note-form', 'search-input');
const controller = new NoteController(model, view);

// Cargar datos
controller.load();

// Guardar automáticamente en cada cambio
model.subscribe(() => {
  controller.save();
});
```

---

## ✅ CHECKLIST PROYECTO

**Día 3:**
- [ ] Implementé Note (modelo de datos) ✓
- [ ] Implementé NoteModel (lógica) ✓
- [ ] Implementé NoteView (UI) ✓
- [ ] Implementé NoteController (coordinación) ✓
- [ ] CRUD básico funciona ✓
- [ ] Observer Pattern funciona ✓

**Día 4:**
- [ ] Categorías funcionan ✓
- [ ] Búsqueda funciona ✓
- [ ] Persistencia con localStorage ✓
- [ ] Testing completo ✓
- [ ] Sin bugs evidentes ✓

**¿Qué aprendiste?**
- [ ] Apliqué MVC formal en proyecto completo
- [ ] Separé Model, View, Controller claramente
- [ ] Implementé Observer Pattern
- [ ] Coordiné 3 clases trabajando juntas
- [ ] Entendí ventajas de MVC (mantenimiento, testing, escalabilidad)

---

## 🎯 ARQUITECTURA FINAL

```
┌──────────────────────────────────────┐
│         NOTE CONTROLLER              │
│  - addNote()                         │
│  - deleteNote()                      │
│  - search()                          │
│  - updateView()                      │
└──────┬─────────────────┬─────────────┘
       │                 │
       ↓                 ↓
┌──────────────┐  ┌─────────────────────┐
│ NOTE MODEL   │  │    NOTE VIEW        │
│ (Lógica)     │  │   (Presentación)    │
│              │  │                     │
│ - #notes     │  │ - render()          │
│ - add()      │  │ - renderNote()      │
│ - remove()   │  │ - getFormData()     │
│ - search()   │  │ - clearForm()       │
│ - subscribe()│  │ - onSubmit()        │
│ - notify()   │  │ - onDelete()        │
└──────────────┘  └─────────────────────┘
```

**Separación clara:**
- Model: Lógica pura (no sabe de DOM)
- View: UI pura (no sabe de lógica)
- Controller: Coordinación (conecta ambos)

---

## 🚀 FIN DE SEMANA 4 MVC

**Al completar dominás:**
1. ✅ Concepto MVC (M-V-C separados)
2. ✅ Identificar responsabilidades
3. ✅ Separar código mezclado en MVC
4. ✅ Implementar Observer Pattern
5. ✅ Aplicar MVC en proyecto completo
6. ✅ **Pensar en arquitectura naturalmente**

---

## 🎓 PRÓXIMO PASO

**Después de completar Semana 4:**
- Avisame para feedback
- Continuamos con **5 Proyectos Integradores** (nivel 3 → 6)
- Complejidad incremental hasta profesional

**¡ÉXITOS CON EL PROYECTO MVC!** 💪🔥

---

FIN DEL DOCUMENTO

**Versión:** Compacta  
**Fecha:** Enero 2026  
**Duración:** 3-4 días  
**Estructura:** Concepto + Warmup (6 ejercicios) + Proyecto MVC
