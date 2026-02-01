/**

 */

// ============================================
// MODEL
// ============================================

class CalculatorModel {
  // TODO: Implementar
  // Solo lógica de cálculo
  #result = 0;

  add(num) {
    this.#result += num;
  }

  substract(num) {
    this.#result -= num;
  }

  clear() {
    this.#result = 0;
  }

  getValue() {
    return this.#result;
  }
}

// ============================================
// VIEW
// ============================================

class CalculatorView {
  // TODO: Implementar
  // Solo actualización de UI
  update(value) {
    // document.getElementById('display').value = value;
    console.log("Value:", value);
  }
}

// ============================================
// CONTROLLER
// ============================================

class CalculatorController {
  // TODO: Implementar
  // Coordina Model y View
  #model;
  #view;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;
  }

  add(value) {
    this.#model.add(value);
    this.#view.update(this.#model.getValue());
  }
  
  clear() {
    this.#model.clear();
    this.#view.update(this.#model.getValue());
  }
}

// TESTING:
const model = new CalculatorModel();
const view = new CalculatorView();
const controller = new CalculatorController(model, view);

controller.add(5);   // Display muestra 5
controller.add(3);   // Display muestra 8
controller.clear();  // Display muestra 0

