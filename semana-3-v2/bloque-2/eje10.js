/**
**CONSIGNA:**
Implementar **Sistema de Puntos** de DOS formas y comparar:

**Funcionalidad:**
- Iniciar con 0 puntos
- `earn(points)` → Ganar puntos
- `spend(points)` → Gastar puntos (si hay suficientes)
- `getBalance()` → Obtener balance actual
- `canSpend(points)` → Verificar si puede gastar
 */

class PuntosManager {
  #points = 0;
  
  earn(points) {
    this.#points += points;
  }

  spend(points) {
    if(points > this.#points) {
      throw new Error("Puntos insuficientees");
    }
    this.#points -= points;
  }

  getBalance() {
    return this.#points;
  }

  canSpend(points) {
    return this.#points >= points;
  }

}
