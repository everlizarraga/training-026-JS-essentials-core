/**
**CONSIGNA:**
Implementar **Gestor de Tareas** de DOS formas:

**Funcionalidad:**
- `add(title)` → Agregar tarea con {id, title, completed: false}
- `toggle(id)` → Cambiar completed de true/false
- `remove(id)` → Eliminar tarea
- `getAll()` → Retornar todas las tareas
- `getCompleted()` → Solo completadas
- `getActive()` → Solo pendientes
 */

/**
 * @typedef {Object} Tarea
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */

// TODO MANAGER CON CLASE
class TodoManager {
  /**@type {Tarea[]} */
  #tasks = [];
  #nextId = 1;

  add(title) {
    // TU CÓDIGO
    if(!title || title === "") {
      throw new Error("Se requiere un titulo para la tarea");
    }
    this.#tasks.push({
      id: this.#nextId,
      title: title,
      completed: false
    });
    this.#nextId += 1;
  }

  toggle(id) {
    // TU CÓDIGO
    const target = this.#tasks.find(t => t.id === Number(id));
    if(!target) {
      throw new Error(`Tarea id: ${id} no encontrada`);
    }
    target.completed = !target.completed;
  }

  remove(id) {
    // TU CÓDIGO
    this.#tasks = this.#tasks.filter(t => t.id !== Number(id));
  }

  getAll() {
    // TU CÓDIGO
    return [...this.#tasks];
  }

  getCompleted() {
    // TU CÓDIGO
    return this.#tasks.filter(t => t.completed);
  }

  getActive() {
    // TU CÓDIGO
    return this.#tasks.filter(t => !t.completed);
  }
}

// TESTING:
const manager1 = new TodoManager();
manager1.add('Comprar leche');

const manager2 = new TodoManager();
manager2.add('Estudiar JS');

console.log(manager1.getAll().length);  // 1
console.log(manager2.getAll().length);  // 1
