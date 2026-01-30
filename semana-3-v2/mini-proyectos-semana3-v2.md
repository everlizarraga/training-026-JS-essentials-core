# 🚀 MINI-PROYECTOS SEMANA 3 V2.0

**Objetivo:** Consolidar el cambio de mentalidad (funciones → clases) con proyectos reales

**Duración total:** 2-4 días

**Estructura:** 2 proyectos progresivos

---

## ⏰ GOVERNOR ACTIVO

**Límites por proyecto:**
- 📅 Proyecto 1: Máximo 2 días
- 📅 Proyecto 2: Máximo 2 días
- ✅ 80% funcional = Suficiente para avanzar
- 🚫 Máximo 2 iteraciones por proyecto
- ⏱️ Si llegás al límite → Subir lo que tengas y NEXT

---

## 📋 ÍNDICE DE PROYECTOS

**PROYECTO 1: Refactoring Calculator** (1-2 días)
- Código funcional que funciona
- Refactorizar a clases paso a paso
- Comparar antes/después
- Ver mejoras de organización

**PROYECTO 2: Todo List con Clases** (1-2 días)
- Diseñar con clases desde inicio
- 3 clases coordinadas
- CRUD + localStorage
- Arquitectura profesional simple

---

# 📁 PROYECTO 1: REFACTORING CALCULATOR

**Duración:** 1-2 días máximo  
**Objetivo:** Refactorizar código funcional a clases y ver mejoras

---

## 🎯 ¿QUÉ VAS A CONSTRUIR?

Una **calculadora científica** que tiene versión funcional (funciona bien) y la vas a refactorizar a clases para ver:
- ✅ Mejor organización del código
- ✅ Estado encapsulado
- ✅ Métodos agrupados lógicamente
- ✅ Facilidad para extender funcionalidad

---

## 📅 CRONOGRAMA

### **DÍA 1: Refactoring Core**
1. Analizar código funcional
2. Identificar estado y comportamientos
3. Crear clase Calculator con métodos básicos
4. Testing que funciona igual

### **DÍA 2: Refactoring Avanzado (si necesario)**
1. Separar CalculatorHistory (historial)
2. Agregar validaciones
3. Comparar ambas versiones
4. Documentar mejoras

---

## 💻 CÓDIGO BASE FUNCIONAL

### **Versión con Funciones (COMPLETA - funciona bien):**

```javascript
// ============================================
// CALCULATOR - VERSIÓN FUNCIONAL
// Este código FUNCIONA BIEN, pero...
// - Estado global
// - Funciones sueltas
// - Difícil de extender
// ============================================

// Estado global
let currentValue = 0;
let previousValue = 0;
let operation = null;
let history = [];

// Operaciones básicas
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('No se puede dividir por 0');
  }
  return a / b;
}

// Operaciones avanzadas
function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(value) {
  if (value < 0) {
    throw new Error('No se puede calcular raíz de número negativo');
  }
  return Math.sqrt(value);
}

function percentage(value, percent) {
  return (value * percent) / 100;
}

// Gestión de estado
function inputNumber(num) {
  currentValue = num;
  console.log(`Valor actual: ${currentValue}`);
}

function setOperation(op) {
  if (currentValue !== 0) {
    previousValue = currentValue;
    currentValue = 0;
    operation = op;
    console.log(`Operación: ${previousValue} ${op} ...`);
  }
}

function calculate() {
  if (operation === null || previousValue === 0) {
    return currentValue;
  }

  let result;
  switch (operation) {
    case '+':
      result = add(previousValue, currentValue);
      break;
    case '-':
      result = subtract(previousValue, currentValue);
      break;
    case '*':
      result = multiply(previousValue, currentValue);
      break;
    case '/':
      result = divide(previousValue, currentValue);
      break;
    case '^':
      result = power(previousValue, currentValue);
      break;
    default:
      result = currentValue;
  }

  // Guardar en historial
  const entry = `${previousValue} ${operation} ${currentValue} = ${result}`;
  history.push(entry);

  // Reset
  currentValue = result;
  previousValue = 0;
  operation = null;

  console.log(`Resultado: ${result}`);
  return result;
}

function clear() {
  currentValue = 0;
  previousValue = 0;
  operation = null;
  console.log('Calculadora limpiada');
}

function getHistory() {
  return [...history];
}

function clearHistory() {
  history = [];
  console.log('Historial limpiado');
}

// ============================================
// TESTING
// ============================================

// Test 1: Suma
inputNumber(5);
setOperation('+');
inputNumber(3);
console.log(calculate());  // 8

// Test 2: División
inputNumber(10);
setOperation('/');
inputNumber(2);
console.log(calculate());  // 5

// Test 3: Potencia
inputNumber(2);
setOperation('^');
inputNumber(3);
console.log(calculate());  // 8

// Test 4: Historial
console.log(getHistory());  // ['5 + 3 = 8', '10 / 2 = 5', '2 ^ 3 = 8']

clear();
```

**Problemas de esta versión:**
- ❌ Estado global (solo una calculadora posible)
- ❌ Funciones sueltas sin organización
- ❌ Historial mezclado con lógica de cálculo
- ❌ Difícil de testear
- ❌ No se puede crear múltiples calculadoras

---

## 🔨 TU TURNO: REFACTORING A CLASES

### **PLANTILLA VERSIÓN CLASES:**

```javascript
// ============================================
// CALCULATOR - VERSIÓN CON CLASES
// ============================================

/**
 * Clase Calculator
 * 
 * TODO: Implementar esta clase
 * 
 * DEBE TENER:
 * - Campos privados: #currentValue, #previousValue, #operation
 * - Métodos de operaciones: add, subtract, multiply, divide, power, squareRoot, percentage
 * - Métodos de estado: inputNumber, setOperation, calculate, clear
 * - Método getResult para obtener valor actual
 * 
 * BENEFICIOS vs funciones:
 * - Estado encapsulado (privado)
 * - Múltiples instancias posibles
 * - Mejor organización
 */
class Calculator {
  // TODO: Declarar campos privados
  // #currentValue = 0
  // #previousValue = 0
  // #operation = null

  constructor() {
    // TODO: Inicializar valores (ya están en declaración)
  }

  // ==========================================
  // OPERACIONES BÁSICAS
  // ==========================================

  /**
   * TODO: Implementar suma
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  #add(a, b) {
    // TU CÓDIGO AQUÍ
  }

  /**
   * TODO: Implementar resta
   */
  #subtract(a, b) {
    // TU CÓDIGO AQUÍ
  }

  /**
   * TODO: Implementar multiplicación
   */
  #multiply(a, b) {
    // TU CÓDIGO AQUÍ
  }

  /**
   * TODO: Implementar división
   * DEBE: Validar división por 0
   */
  #divide(a, b) {
    // TU CÓDIGO AQUÍ
  }

  // ==========================================
  // OPERACIONES AVANZADAS
  // ==========================================

  /**
   * TODO: Implementar potencia
   */
  #power(base, exponent) {
    // TU CÓDIGO AQUÍ
    // Hint: Math.pow(base, exponent)
  }

  /**
   * TODO: Implementar raíz cuadrada
   * DEBE: Validar números negativos
   */
  squareRoot() {
    // TU CÓDIGO AQUÍ
    // Aplicar a this.#currentValue
  }

  /**
   * TODO: Implementar porcentaje
   */
  percentage(percent) {
    // TU CÓDIGO AQUÍ
    // Calcular percent% de this.#currentValue
  }

  // ==========================================
  // GESTIÓN DE ESTADO
  // ==========================================

  /**
   * TODO: Establecer valor actual
   */
  inputNumber(num) {
    // TU CÓDIGO AQUÍ
    // this.#currentValue = num
  }

  /**
   * TODO: Establecer operación
   * DEBE: Guardar currentValue en previousValue
   */
  setOperation(op) {
    // TU CÓDIGO AQUÍ
  }

  /**
   * TODO: Calcular resultado
   * DEBE: 
   * - Usar switch para determinar operación
   * - Llamar al método privado apropiado (#add, #subtract, etc.)
   * - Actualizar #currentValue con resultado
   * - Reset previousValue y operation
   * - Retornar resultado
   */
  calculate() {
    // TU CÓDIGO AQUÍ
  }

  /**
   * TODO: Limpiar calculadora
   */
  clear() {
    // TU CÓDIGO AQUÍ
  }

  /**
   * TODO: Obtener resultado actual
   */
  getResult() {
    // TU CÓDIGO AQUÍ
    // return this.#currentValue
  }
}

// ============================================
// CLASE CALCULATOR HISTORY
// Separar responsabilidad de historial
// ============================================

/**
 * TODO: Implementar clase separada para historial
 * 
 * BENEFICIO: Separación de concerns
 * Calculator maneja cálculos
 * CalculatorHistory maneja registro
 */
class CalculatorHistory {
  // TODO: Campo privado #history = []

  /**
   * TODO: Agregar entrada al historial
   */
  add(entry) {
    // TU CÓDIGO AQUÍ
  }

  /**
   * TODO: Obtener historial completo
   */
  getAll() {
    // TU CÓDIGO AQUÍ
    // Retornar copia
  }

  /**
   * TODO: Limpiar historial
   */
  clear() {
    // TU CÓDIGO AQUÍ
  }

  /**
   * TODO: Obtener última entrada
   */
  getLast() {
    // TU CÓDIGO AQUÍ
  }
}

// ============================================
// TESTING
// ============================================

// Test 1: Crear múltiples calculadoras (¡ahora es posible!)
const calc1 = new Calculator();
const calc2 = new Calculator();

// Calc 1: 5 + 3
calc1.inputNumber(5);
calc1.setOperation('+');
calc1.inputNumber(3);
console.log(calc1.calculate());  // 8

// Calc 2: 10 / 2 (independiente de calc1)
calc2.inputNumber(10);
calc2.setOperation('/');
calc2.inputNumber(2);
console.log(calc2.calculate());  // 5

console.log(calc1.getResult());  // 8 (no afectado)

// Test 2: Historial separado
const history = new CalculatorHistory();
history.add('5 + 3 = 8');
history.add('10 / 2 = 5');
console.log(history.getAll());  // ['5 + 3 = 8', '10 / 2 = 5']
```

---

## 📊 COMPARACIÓN: ANTES vs DESPUÉS

**Crear tabla comparativa:**

| Aspecto | Versión Funciones | Versión Clases |
|---------|------------------|----------------|
| **Múltiples calculadoras** | ❌ Solo 1 (estado global) | ✅ Ilimitadas |
| **Encapsulación** | ❌ Todo público | ✅ Privado (#) |
| **Organización** | ⚠️ Funciones sueltas | ✅ Métodos agrupados |
| **Extensibilidad** | ⚠️ Difícil agregar features | ✅ Fácil extender |
| **Testing** | ⚠️ Complicado (estado global) | ✅ Fácil (instancias) |
| **Historial** | ❌ Mezclado con lógica | ✅ Clase separada |

---

## ✅ CHECKLIST PROYECTO 1

**Día 1:**
- [ ] Analicé código funcional ✓
- [ ] Identifiqué estado (currentValue, previousValue, operation) ✓
- [ ] Implementé clase Calculator básica ✓
- [ ] Métodos de operaciones funcionan ✓
- [ ] Testing básico funciona ✓

**Día 2:**
- [ ] Implementé CalculatorHistory separada ✓
- [ ] Validaciones agregadas ✓
- [ ] Comparé ambas versiones ✓
- [ ] Documenté mejoras ✓

**¿Qué aprendiste?**
- [ ] Vi mejoras claras de clases vs funciones
- [ ] Entendí separación de concerns (Calculator vs History)
- [ ] Practiqué encapsulación con métodos privados (#)
- [ ] Vi ventaja de múltiples instancias

---

# 📁 PROYECTO 2: TODO LIST CON CLASES

**Duración:** 1-2 días máximo  
**Objetivo:** Diseñar con clases desde el inicio (no refactoring)

---

## 🎯 ¿QUÉ VAS A CONSTRUIR?

Una **aplicación de tareas** con arquitectura de clases profesional:
- 3 clases coordinadas (Todo, TodoManager, TodoRepository)
- CRUD completo
- Filtros (all, active, completed)
- Persistencia con localStorage
- UI simple pero funcional

---

## 📅 CRONOGRAMA

### **DÍA 1: Clases + CRUD**
1. Implementar clase Todo
2. Implementar clase TodoManager
3. Implementar clase TodoRepository
4. CRUD básico funcionando en consola
5. Testing manual

### **DÍA 2: UI + Features**
1. Conectar con HTML
2. Renderizar lista
3. Agregar/eliminar desde UI
4. Filtros (all/active/completed)
5. Persistencia automática

---

## 💻 HTML/CSS BASE

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todo List - Classes</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      overflow: hidden;
    }

    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }

    .header h1 {
      font-size: 2rem;
    }

    /* Formulario */
    .todo-form {
      padding: 20px;
      border-bottom: 1px solid #ddd;
    }

    .form-group {
      display: flex;
      gap: 10px;
    }

    .todo-input {
      flex: 1;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 6px;
      font-size: 1rem;
    }

    .todo-input:focus {
      outline: none;
      border-color: #667eea;
    }

    .btn-add {
      padding: 12px 24px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      cursor: pointer;
      font-weight: 600;
    }

    .btn-add:hover {
      background: #5568d3;
    }

    /* Filtros */
    .filters {
      padding: 15px 20px;
      background: #f8f9fa;
      border-bottom: 1px solid #ddd;
      display: flex;
      gap: 10px;
      justify-content: center;
    }

    .filter-btn {
      padding: 8px 16px;
      border: 2px solid #667eea;
      background: white;
      color: #667eea;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
    }

    .filter-btn:hover {
      background: #f0f0f0;
    }

    .filter-btn.active {
      background: #667eea;
      color: white;
    }

    /* Lista de tareas */
    .todo-list {
      padding: 20px;
      min-height: 200px;
    }

    .todo-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 15px;
      border: 2px solid #ddd;
      border-radius: 8px;
      margin-bottom: 10px;
      transition: all 0.3s ease;
    }

    .todo-item:hover {
      border-color: #667eea;
      box-shadow: 0 4px 8px rgba(102, 126, 234, 0.2);
    }

    .todo-item.completed {
      opacity: 0.6;
    }

    .todo-item.completed .todo-text {
      text-decoration: line-through;
      color: #999;
    }

    .todo-checkbox {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .todo-text {
      flex: 1;
      font-size: 1rem;
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

    /* Estado vacío */
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #999;
    }

    .empty-state h3 {
      font-size: 1.5rem;
      margin-bottom: 10px;
    }

    /* Stats */
    .stats {
      padding: 15px 20px;
      background: #f8f9fa;
      border-top: 1px solid #ddd;
      text-align: center;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>📝 Todo List</h1>
    </div>

    <!-- Formulario -->
    <div class="todo-form">
      <div class="form-group">
        <input 
          type="text" 
          id="todo-input" 
          class="todo-input" 
          placeholder="Nueva tarea..."
          autocomplete="off"
        >
        <button id="btn-add" class="btn-add">➕ Agregar</button>
      </div>
    </div>

    <!-- Filtros -->
    <div class="filters">
      <button class="filter-btn active" data-filter="all">Todas</button>
      <button class="filter-btn" data-filter="active">Activas</button>
      <button class="filter-btn" data-filter="completed">Completadas</button>
    </div>

    <!-- Lista (se renderiza dinámicamente) -->
    <div id="todo-list" class="todo-list">
      <!-- EJEMPLO de estructura (no funcional, solo referencia visual) -->
      
      <!-- Todo Item 1 -->
      <div class="todo-item">
        <input type="checkbox" class="todo-checkbox">
        <span class="todo-text">Comprar leche</span>
        <button class="btn-delete">🗑️</button>
      </div>

      <!-- Todo Item 2 - Completada -->
      <div class="todo-item completed">
        <input type="checkbox" class="todo-checkbox" checked>
        <span class="todo-text">Estudiar JavaScript</span>
        <button class="btn-delete">🗑️</button>
      </div>

      <!-- Todo Item 3 -->
      <div class="todo-item">
        <input type="checkbox" class="todo-checkbox">
        <span class="todo-text">Hacer ejercicio</span>
        <button class="btn-delete">🗑️</button>
      </div>
    </div>

    <!-- Stats -->
    <div class="stats">
      <span id="stats-text">3 tareas - 1 completada</span>
    </div>
  </div>

  <!-- JavaScript (type="module" para usar import/export) -->
  <script src="app.js"></script>
</body>
</html>
```

**Nota:** El HTML tiene 3 tareas de EJEMPLO (no funcionales). Tu código las reemplazará dinámicamente.

---

## 🔨 PLANTILLAS DE CLASES

### **ARCHIVO: todo.js**

```javascript
// ============================================
// TODO CLASS
// Representa una tarea individual
// ============================================

/**
 * Clase Todo
 * 
 * TODO: Implementar esta clase
 * 
 * RESPONSABILIDAD: Representar una tarea con sus datos
 * 
 * DATOS:
 * - id (único)
 * - title (título de la tarea)
 * - completed (true/false)
 * - createdAt (fecha de creación)
 * 
 * COMPORTAMIENTO:
 * - toggle() → Cambiar estado completed
 * - toJSON() → Convertir a objeto plano
 * - static fromJSON() → Crear Todo desde objeto
 */
export class Todo {
  // TODO: Declarar campos privados o públicos
  // Opción 1: Públicos (simple)
  // Opción 2: Privados con getters (más robusto)
  
  constructor(id, title) {
    // TODO: Inicializar propiedades
    // this.id = id
    // this.title = title
    // this.completed = false
    // this.createdAt = new Date().toISOString()
  }

  /**
   * TODO: Cambiar estado de completado
   */
  toggle() {
    // TU CÓDIGO AQUÍ
  }

  /**
   * TODO: Convertir a objeto plano (para localStorage)
   */
  toJSON() {
    // TU CÓDIGO AQUÍ
    // return { id, title, completed, createdAt }
  }

  /**
   * TODO: Crear Todo desde objeto plano
   * @static
   */
  static fromJSON(json) {
    // TU CÓDIGO AQUÍ
    // const todo = new Todo(json.id, json.title)
    // todo.completed = json.completed
    // todo.createdAt = json.createdAt
    // return todo
  }
}
```

---

### **ARCHIVO: todo-manager.js**

```javascript
// ============================================
// TODO MANAGER CLASS
// Gestiona colección de tareas (lógica de negocio)
// ============================================

import { Todo } from './todo.js';

/**
 * Clase TodoManager
 * 
 * TODO: Implementar esta clase
 * 
 * RESPONSABILIDAD: Gestionar colección de tareas
 * 
 * DATOS:
 * - #todos (array privado de tareas)
 * - #nextId (próximo ID disponible)
 * 
 * COMPORTAMIENTO:
 * - add(title) → Agregar tarea
 * - remove(id) → Eliminar tarea
 * - toggle(id) → Cambiar completado
 * - getAll() → Todas las tareas
 * - getActive() → Solo pendientes
 * - getCompleted() → Solo completadas
 * - toJSON() → Para persistencia
 * - loadFromJSON(data) → Cargar desde persistencia
 */
export class TodoManager {
  // TODO: Campos privados
  // #todos = []
  // #nextId = 1

  constructor() {
    // TODO: Inicializar (ya está en declaración)
  }

  // ==========================================
  // CRUD OPERATIONS
  // ==========================================

  /**
   * TODO: Agregar tarea
   * @param {string} title
   * @returns {Todo}
   */
  add(title) {
    // TU CÓDIGO AQUÍ
    // 1. Validar title no vacío
    // 2. Crear nuevo Todo con this.#nextId++
    // 3. Agregar a this.#todos
    // 4. Retornar todo creado
  }

  /**
   * TODO: Eliminar tarea
   * @param {number} id
   * @returns {boolean}
   */
  remove(id) {
    // TU CÓDIGO AQUÍ
    // 1. Buscar índice con findIndex
    // 2. Si existe, splice
    // 3. Retornar true/false
  }

  /**
   * TODO: Toggle completado
   * @param {number} id
   * @returns {boolean}
   */
  toggle(id) {
    // TU CÓDIGO AQUÍ
    // 1. Buscar todo con find
    // 2. Si existe, llamar todo.toggle()
    // 3. Retornar true/false
  }

  // ==========================================
  // QUERIES
  // ==========================================

  /**
   * TODO: Obtener todas las tareas
   * @returns {Todo[]}
   */
  getAll() {
    // TU CÓDIGO AQUÍ
    // return [...this.#todos]  (copia)
  }

  /**
   * TODO: Obtener solo activas
   * @returns {Todo[]}
   */
  getActive() {
    // TU CÓDIGO AQUÍ
    // return this.#todos.filter(t => !t.completed)
  }

  /**
   * TODO: Obtener solo completadas
   * @returns {Todo[]}
   */
  getCompleted() {
    // TU CÓDIGO AQUÍ
    // return this.#todos.filter(t => t.completed)
  }

  // ==========================================
  // PERSISTENCIA
  // ==========================================

  /**
   * TODO: Convertir a JSON para guardar
   * @returns {Object[]}
   */
  toJSON() {
    // TU CÓDIGO AQUÍ
    // return this.#todos.map(t => t.toJSON())
  }

  /**
   * TODO: Cargar desde JSON
   * @param {Object[]} data
   */
  loadFromJSON(data) {
    // TU CÓDIGO AQUÍ
    // this.#todos = data.map(json => Todo.fromJSON(json))
    // Actualizar #nextId basado en IDs existentes
  }

  /**
   * TODO: Obtener estadísticas
   * @returns {Object}
   */
  getStats() {
    // TU CÓDIGO AQUÍ
    // return {
    //   total: this.#todos.length,
    //   completed: this.getCompleted().length,
    //   active: this.getActive().length
    // }
  }
}
```

---

### **ARCHIVO: todo-repository.js**

```javascript
// ============================================
// TODO REPOSITORY CLASS
// Maneja persistencia con localStorage
// ============================================

/**
 * Clase TodoRepository (Singleton)
 * 
 * TODO: Implementar esta clase
 * 
 * RESPONSABILIDAD: Persistencia de datos
 * 
 * PATRÓN: Singleton (una sola instancia)
 * 
 * COMPORTAMIENTO:
 * - save(data) → Guardar en localStorage
 * - load() → Cargar de localStorage
 * - clear() → Limpiar localStorage
 */
export class TodoRepository {
  // Singleton instance
  static #instance = null;
  #storageKey = 'todos_app';

  constructor() {
    // TODO: Implementar Singleton
    // if (TodoRepository.#instance) {
    //   return TodoRepository.#instance;
    // }
    // TodoRepository.#instance = this;
  }

  /**
   * TODO: Guardar datos
   * @param {Object[]} data
   * @returns {boolean}
   */
  save(data) {
    // TU CÓDIGO AQUÍ
    // try {
    //   localStorage.setItem(this.#storageKey, JSON.stringify(data))
    //   return true
    // } catch (error) {
    //   console.error('Error al guardar:', error)
    //   return false
    // }
  }

  /**
   * TODO: Cargar datos
   * @returns {Object[]}
   */
  load() {
    // TU CÓDIGO AQUÍ
    // try {
    //   const data = localStorage.getItem(this.#storageKey)
    //   return data ? JSON.parse(data) : []
    // } catch (error) {
    //   console.error('Error al cargar:', error)
    //   return []
    // }
  }

  /**
   * TODO: Limpiar storage
   * @returns {boolean}
   */
  clear() {
    // TU CÓDIGO AQUÍ
    // localStorage.removeItem(this.#storageKey)
  }
}
```

---

### **ARCHIVO: app.js**

```javascript
// ============================================
// APP - ENTRY POINT
// Coordina todas las clases
// ============================================

import { TodoManager } from './todo-manager.js';
import { TodoRepository } from './todo-repository.js';

/**
 * Clase App
 * 
 * TODO: Implementar esta clase
 * 
 * RESPONSABILIDAD: Coordinar UI y lógica
 * 
 * FUNCIONES:
 * - Inicializar TodoManager y Repository
 * - Cargar datos de localStorage
 * - Setup event listeners
 * - Renderizar lista
 * - Actualizar stats
 * - Guardar automáticamente
 */
class App {
  constructor() {
    // TODO: Inicializar dependencias
    // this.manager = new TodoManager()
    // this.repository = new TodoRepository()
    
    // TODO: Referencias a elementos DOM
    // this.todoInput = document.getElementById('todo-input')
    // this.btnAdd = document.getElementById('btn-add')
    // this.todoList = document.getElementById('todo-list')
    // this.filterBtns = document.querySelectorAll('.filter-btn')
    // this.statsText = document.getElementById('stats-text')
    
    // Estado de filtro actual
    // this.currentFilter = 'all'
  }

  /**
   * TODO: Inicializar app
   */
  init() {
    // TU CÓDIGO AQUÍ
    // 1. Cargar datos: this.loadData()
    // 2. Setup listeners: this.setupListeners()
    // 3. Renderizar: this.render()
  }

  /**
   * TODO: Cargar datos de localStorage
   */
  loadData() {
    // TU CÓDIGO AQUÍ
    // const data = this.repository.load()
    // this.manager.loadFromJSON(data)
  }

  /**
   * TODO: Guardar datos en localStorage
   */
  saveData() {
    // TU CÓDIGO AQUÍ
    // const data = this.manager.toJSON()
    // this.repository.save(data)
  }

  /**
   * TODO: Setup event listeners
   */
  setupListeners() {
    // TU CÓDIGO AQUÍ
    
    // Agregar tarea
    // this.btnAdd.addEventListener('click', () => { ... })
    // this.todoInput.addEventListener('keypress', (e) => {
    //   if (e.key === 'Enter') { ... }
    // })
    
    // Filtros
    // this.filterBtns.forEach(btn => {
    //   btn.addEventListener('click', () => { ... })
    // })
    
    // Event delegation para checkbox y delete
    // this.todoList.addEventListener('click', (e) => { ... })
  }

  /**
   * TODO: Agregar tarea desde input
   */
  addTodo() {
    // TU CÓDIGO AQUÍ
    // 1. Obtener valor de input
    // 2. Validar no vacío
    // 3. manager.add(title)
    // 4. Limpiar input
    // 5. saveData()
    // 6. render()
  }

  /**
   * TODO: Toggle tarea
   */
  toggleTodo(id) {
    // TU CÓDIGO AQUÍ
    // 1. manager.toggle(id)
    // 2. saveData()
    // 3. render()
  }

  /**
   * TODO: Eliminar tarea
   */
  deleteTodo(id) {
    // TU CÓDIGO AQUÍ
    // 1. Confirmar: if (confirm('¿Eliminar?'))
    // 2. manager.remove(id)
    // 3. saveData()
    // 4. render()
  }

  /**
   * TODO: Cambiar filtro
   */
  setFilter(filter) {
    // TU CÓDIGO AQUÍ
    // 1. this.currentFilter = filter
    // 2. Actualizar clase 'active' en botones
    // 3. render()
  }

  /**
   * TODO: Renderizar lista según filtro
   */
  render() {
    // TU CÓDIGO AQUÍ
    // 1. Obtener todos según filtro:
    //    let todos = this.manager.getAll()
    //    if (this.currentFilter === 'active') todos = this.manager.getActive()
    //    if (this.currentFilter === 'completed') todos = this.manager.getCompleted()
    
    // 2. Si vacío, mostrar empty state
    // 3. Si hay todos, renderizar cada uno
    // 4. Actualizar stats
  }

  /**
   * TODO: Renderizar una tarea
   */
  renderTodo(todo) {
    // TU CÓDIGO AQUÍ
    // Retornar HTML string:
    // return `
    //   <div class="todo-item ${todo.completed ? 'completed' : ''}">
    //     <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} data-id="${todo.id}">
    //     <span class="todo-text">${todo.title}</span>
    //     <button class="btn-delete" data-id="${todo.id}">🗑️</button>
    //   </div>
    // `
  }

  /**
   * TODO: Actualizar estadísticas
   */
  updateStats() {
    // TU CÓDIGO AQUÍ
    // const stats = this.manager.getStats()
    // this.statsText.textContent = `${stats.total} tareas - ${stats.completed} completadas`
  }
}

// Inicializar app cuando DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
```

---

## ✅ CHECKLIST PROYECTO 2

**Día 1:**
- [ ] Implementé clase Todo ✓
- [ ] Implementé clase TodoManager ✓
- [ ] Implementé clase TodoRepository ✓
- [ ] CRUD básico funciona en consola ✓
- [ ] Testing manual OK ✓

**Día 2:**
- [ ] Implementé clase App ✓
- [ ] Setup event listeners funciona ✓
- [ ] Renderizado dinámico funciona ✓
- [ ] Filtros (all/active/completed) funcionan ✓
- [ ] Persistencia con localStorage funciona ✓
- [ ] Stats se actualizan ✓

**¿Qué aprendiste?**
- [ ] Separé responsabilidades en 3 clases claras
- [ ] Coordiné clases trabajando juntas
- [ ] Implementé Singleton (TodoRepository)
- [ ] Practiqué event delegation
- [ ] Conecté lógica con UI

---

## 🎯 ARQUITECTURA FINAL

```
┌─────────────────────────────────────┐
│          APP (Coordinador)          │
│  - Setup listeners                  │
│  - Renderizar UI                    │
│  - Actualizar stats                 │
└─────────────┬───────────────────────┘
              │
              ├──────────────┬──────────────┐
              ↓              ↓              ↓
    ┌─────────────┐  ┌──────────────┐  ┌──────────────┐
    │    TODO     │  │ TODO MANAGER │  │ TODO REPO    │
    │  (Modelo)   │  │  (Lógica)    │  │ (Persistencia)│
    └─────────────┘  └──────────────┘  └──────────────┘
```

**Separación clara:**
- Todo → Modelo de datos
- TodoManager → Lógica de negocio
- TodoRepository → Persistencia
- App → Coordinación y UI

---

## 🚀 FIN DE MINI-PROYECTOS

**Al completar ambos proyectos dominás:**
1. ✅ Refactoring funciones → clases
2. ✅ Diseñar con clases desde inicio
3. ✅ Separar responsabilidades (3+ clases)
4. ✅ Coordinar clases trabajando juntas
5. ✅ Arquitectura profesional simple
6. ✅ **Pensamiento en objetos natural**

---

**¿PRÓXIMO PASO?**

Después de completar estos proyectos:
- Avisame para feedback
- Decidimos si continuar con Semana 4 (MVC) o hacer proyecto opcional

**¡ÉXITOS CON LOS PROYECTOS!** 💪🔥

---

FIN DEL DOCUMENTO

**Versión:** 1.0  
**Fecha:** Enero 2026  
**Duración:** 2-4 días  
**Proyectos:** 2 (Refactoring Calculator + Todo List Classes)
