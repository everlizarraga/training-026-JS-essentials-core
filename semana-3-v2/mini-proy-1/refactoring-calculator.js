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
  #currentValue = 0;
  #previousValue = 0;
  #operation = null;

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
    return a + b;
  }

  /**
   * TODO: Implementar resta
   */
  #subtract(a, b) {
    // TU CÓDIGO AQUÍ
    return a - b;
  }

  /**
   * TODO: Implementar multiplicación
   */
  #multiply(a, b) {
    // TU CÓDIGO AQUÍ
    return a * b;
  }

  /**
   * TODO: Implementar división
   * DEBE: Validar división por 0
   */
  #divide(a, b) {
    // TU CÓDIGO AQUÍ
    if(b === 0) {
      throw new Error("No se puede dividir por cero");
    }
    return a / b;
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
    return Math.pow(base, exponent);
  }

  /**
   * TODO: Implementar raíz cuadrada
   * DEBE: Validar números negativos
   */
  squareRoot() {
    // TU CÓDIGO AQUÍ
    // Aplicar a this.#currentValue
    if(this.#currentValue < 0) {
      throw new Error("No se puede calcular raiz de numeros negativos");
    }
    return Math.sqrt(this.#currentValue);
  }

  /**
   * TODO: Implementar porcentaje
   */
  percentage(percent) {
    // TU CÓDIGO AQUÍ
    // Calcular percent% de this.#currentValue
    return (this.#currentValue * percent) / 100;
  }

  // ==========================================
  // GESTIÓN DE ESTADO
  // ==========================================

  /**
   * TODO: Establecer valor actual
   */
  inputNumber(num) {
    // TU CÓDIGO AQUÍ
    if(!this.#operation) {
      this.#currentValue = num;
    } else {
      this.#previousValue = this.#currentValue;
      this.#currentValue = num;
    }
  }

  /**
   * TODO: Establecer operación
   * DEBE: Guardar currentValue en previousValue
   */
  setOperation(op) {
    // TU CÓDIGO AQUÍ
    this.#operation = op;
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
    let result;
    switch (this.#operation) {
      case '+':
        result = this.#add(this.#currentValue, this.#previousValue);
        break;
      case '-':
        result = this.#subtract(this.#previousValue, this.#currentValue);
        break;
      case '*':
        result = this.#multiply(this.#previousValue, this.#currentValue);
        break;
      case '/':
        result = this.#divide(this.#previousValue, this.#currentValue);
        break;
      case '^':
        result = this.#power(this.#previousValue, this.#currentValue);
        break;
      default:
        break;
    }
    this.clear();
    this.#currentValue = result;
    return result;
  }

  /**
   * TODO: Limpiar calculadora
   */
  clear() {
    // TU CÓDIGO AQUÍ
    this.#currentValue = 0;
    this.#previousValue = 0;
    this.#operation = null;
  }

  /**
   * TODO: Obtener resultado actual
   */
  getResult() {
    // TU CÓDIGO AQUÍ
    return this.#currentValue
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
  #history = [];

  /**
   * TODO: Agregar entrada al historial
   */
  add(entry) {
    // TU CÓDIGO AQUÍ
    this.#history.push(entry);
  }

  /**
   * TODO: Obtener historial completo
   */
  getAll() {
    // TU CÓDIGO AQUÍ
    // Retornar copia
    return [...this.#history];
  }

  /**
   * TODO: Limpiar historial
   */
  clear() {
    // TU CÓDIGO AQUÍ
    this.#history = [];
  }

  /**
   * TODO: Obtener última entrada
   */
  getLast() {
    // TU CÓDIGO AQUÍ
    return this.getAll().reverse()[0];
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

