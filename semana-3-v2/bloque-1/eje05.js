/**
**CONSIGNA:**
Implementar **Cache** de DOS formas:

**Funcionalidad:**
- `set(key, value)` → Guardar en cache
- `get(key)` → Obtener valor (o undefined si no existe)
- `has(key)` → Verificar si existe
- `delete(key)` → Eliminar entrada
- `clear()` → Vaciar cache
- `size()` → Cantidad de entradas
 */

// CACHE CON CLASE
class Cache {
  #data = {};

  set(key, value) {
    // TU CÓDIGO
    this.#data[key] = value;
  }

  get(key) {
    // TU CÓDIGO
    return this.#data[key];
  }

  has(key) {
    // TU CÓDIGO
    return Object.hasOwn(this.#data, key);
  }

  delete(key) {
    // TU CÓDIGO
    delete this.#data[key];
  }

  clear() {
    // TU CÓDIGO
    this.#data = {};
  }

  size() {
    // TU CÓDIGO
    return Object.keys(this.#data).length;
  }
}

// TESTING:
const cache1 = new Cache();
cache1.set('user', { name: 'Juan' });

const cache2 = new Cache();
cache2.set('config', { theme: 'dark' });

console.log(cache1.size());  // 1
console.log(cache2.size());  // 1

