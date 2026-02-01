/**
**CONSIGNA:**
Implementar MVC con **Observer Pattern**:
 */

// MODEL con Observer
class TaskModel {
  #tasks = [];
  #observers = [];

  subscribe(callback) {
    // TODO: Agregar callback a observers
    if(!callback) {
      throw new Error("Es necesario una callback");
    }
    this.#observers.push(callback);
  }

  notify() {
    // TODO: Ejecutar todos los callbacks
    this.#observers.forEach(cb => cb());
  }

  add(title) {
    // TODO: Agregar task
    // TODO: Llamar notify()
    if(!title || title === '') {
      throw new Error("Es necesario el titulo");
    }
    this.#tasks.push(title);
    this.notify();
  }

  getAll() {
    // TODO: Retornar tasks
    return [...this.#tasks];
  }
}

// VIEW
class TaskView {
  constructor(container) {
    this.container = container;
  }

  render(tasks) {
    // TODO: Renderizar tasks
    console.log("Tasks:", tasks);
  }
}

// CONTROLLER
class TaskController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // TODO: Suscribirse a cambios del model
    // this.model.subscribe(() => { ... })
    this.model.subscribe(() => {
      this.view.render(this.model.getAll());
    });
  }

  add(title) {
    // TODO: Solo llamar model.add()
    // (view se actualiza automáticamente por observer)
    this.model.add(title);
  }
}

// TESTING:
const model = new TaskModel();
// const view = new TaskView(document.getElementById('tasks'));
const view = new TaskView();
const controller = new TaskController(model, view);

controller.add('Task 1');  // Se renderiza automáticamente
controller.add('Task 2');  // Se renderiza automáticamente

