/**
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

**RESULTADO ESPERADO:**
- Ambas versiones funcionan igual
- Versión clase permite múltiples timers independientes
- Versión funciones solo permite un timer global
 */

// ============================================
// TEMPORIZADOR CON FUNCIONES
// ============================================

// TU CÓDIGO: Declarar variable global para tiempo
let time = 0;

function start(seconds) {
  // TU CÓDIGO: Inicializar tiempo
  time = seconds;
}

function tick() {
  // TU CÓDIGO: Reducir 1 segundo (mínimo 0)
  time = Math.max(0, time - 1);
}

function getTime() {
  // TU CÓDIGO: Retornar tiempo actual
  return time;
}

function isFinished() {
  // TU CÓDIGO: Retornar true si tiempo === 0
  return time === 0;
}

function reset(seconds) {
  // TU CÓDIGO: Reiniciar con nuevo valor
  time = Math.max(0, seconds);
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


// ============================================
// TEMPORIZADOR CON CLASE
// ============================================

class Timer {
  // TU CÓDIGO: Declarar campo privado #time
  #time;

  constructor(seconds) {
    // TU CÓDIGO: Inicializar tiempo
    this.#time = Math.max(0, seconds);
  }

  tick() {
    // TU CÓDIGO: Reducir 1 segundo (mínimo 0)
    this.#time = Math.max(0, this.#time -1);
  }

  getTime() {
    // TU CÓDIGO: Retornar tiempo
    return this.#time;
  }

  isFinished() {
    // TU CÓDIGO: Retornar true si tiempo === 0
    return this.#time === 0;
  }

  reset(seconds) {
    // TU CÓDIGO: Reiniciar con nuevo valor
    this.#time = Math.max(0, seconds);
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
