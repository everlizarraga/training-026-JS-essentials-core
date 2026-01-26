/**
**CONSIGNA:**
Implementar `Logger` como Singleton que:
- Solo permita UNA instancia
- Tenga array de logs privado
- Métodos:
  - `log(message)` → Agregar log con timestamp
  - `error(message)` → Agregar error con timestamp
  - `getLogs()` → Retornar todos los logs
  - `clear()` → Limpiar logs
 */

class Logger {
  static #instance = null;
  #logs = [];
  
  constructor() {
    // TU CÓDIGO: Implementar singleton
    if(Logger.#instance) {
      return Logger.#instance;
    }
    Logger.#instance = this;
  }
  
  log(message) {
    // TU CÓDIGO: Agregar { type: 'log', message, timestamp: new Date() }
    this.#logs.push({ type: 'log', message, timestamp: new Date() });
  }
  
  error(message) {
    // TU CÓDIGO: Agregar { type: 'error', message, timestamp: new Date() }
    this.#logs.push({ type: 'error', message, timestamp: new Date() });
  }
  
  getLogs() {
    // TU CÓDIGO
    return [...this.#logs];
  }
  
  clear() {
    // TU CÓDIGO
    this.#logs = [];
  }
}

// TESTING:
const logger1 = new Logger();
logger1.log('App iniciada');

const logger2 = new Logger();
logger2.error('Error de conexión');

console.log(logger1 === logger2);      // true
console.log(logger1.getLogs().length); // 2 (ambos loggers comparten logs)

