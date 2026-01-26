/**
**CONSIGNA:**
Implementar un **todo list manager** de DOS formas:

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
 */

// ============================================
// IMPLEMENTACIÓN 1: CLASS
// ============================================
class TodoManager {
  // TU CÓDIGO
  #id = 1;

  constructor() {
    this.todos = [];
  }

  add(texto) {
    if(!texto || texto === '') {
      throw new Error("Es necesario un texto");
    }
    this.todos.push({
      id: `${Date.now()}-${this.#id}`,
      text: texto,
      completed: false
    });
    this.#id += 1;
  }

  remove(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  toggle(id) {
    this.todos.forEach(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed;
      }
    });
  }

  getAll() {
    // return this.todos.map(todo => todo.text);
    return [...this.todos];
  }

  getCompleted() {
    return this.todos.filter(todo => todo.completed);
  }

}

// ============================================
// IMPLEMENTACIÓN 2: FACTORY
// ============================================
function createTodoManager() {
  // TU CÓDIGO
  let idCount = 1;
  let todos = [];
  return {
    add(texto) {
      if(!texto || texto === '') throw new Error("Es necesario un texto");
      todos.push({
        id: idCount,
        text: texto,
        completed: false
      });
      idCount += 1;
    },

    remove(id) {
      todos = todos.filter(todo => todo.id !== id);
    },

    toggle(id) {
      const target = todos.find(todo => todo.id === id);
      if(target) {
        target.completed = !target.completed;
      }
    },

    getAll() {
      return [...todos];
    },

    getCompleted() {
      return todos.filter(todo => todo.completed);
    }
  };
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
    RESPUESTA: En Class

2. ¿Cuál soporta herencia?
    RESPUESTA: Class

3. ¿Cuál usarías para este caso?
    RESPUESTA: Class
*/

