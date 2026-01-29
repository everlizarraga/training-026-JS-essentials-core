/**
**CONSIGNA:**
Las siguientes funcionalidades SON MEJORES con **clase** (NO funciones).

**Cuándo usar CLASE:**
- ✅ Necesitás mantener estado
- ✅ Múltiples instancias independientes
- ✅ Agrupar datos + comportamiento
- ✅ Encapsulación (estado privado)

**Ejemplo:** 
Usuarios, productos, carritos, formularios, timers.
 */

// ============================================
// USER SESSION (usar clase)
// ============================================

class UserSession {
  // TODO: Campos privados para user, isLoggedIn, loginTime
  #user = null;
  #isLoggedIn = false;
  #loginTime = null;

  login(username) {
    // TODO: Marcar como logueado, guardar username y timestamp
    this.#user = username;
    this.#isLoggedIn = true;
    this.#loginTime = Date.now();
  }

  logout() {
    // TODO: Marcar como no logueado, limpiar datos
    this.#user = null;
    this.#isLoggedIn = false;
    this.#loginTime = null;
  }

  isAuthenticated() {
    // TODO: Retornar si está logueado
    return this.#isLoggedIn;
  }

  getUsername() {
    // TODO: Retornar username o null
    return this.#user;
  }

  getSessionDuration() {
    // TODO: Retornar minutos desde login
    // Hint: (Date.now() - loginTime) / 60000
    return (Date.now() - this.#loginTime) / (60 * 1000);
  }
}

// TESTING:
const session = new UserSession();
session.login('Juan');
console.log(session.isAuthenticated());  // true
console.log(session.getUsername());  // "Juan"

// Simular pasar tiempo
setTimeout(() => {
  console.log(session.getSessionDuration());  // > 0 minutos
}, 1000);



