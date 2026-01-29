/**
**CONSIGNA:**
Implementar una **Lista de Deseos** (wishlist) de DOS formas:

**Funcionalidad:**
- `add(productName)` → Agregar producto
- `remove(productName)` → Eliminar producto
- `has(productName)` → Verificar si está en la lista
- `getAll()` → Obtener todos los productos
- `getCount()` → Cantidad de productos
- `clear()` → Vaciar lista
 */

// WISHLIST CON FUNCIONES
const wishlist = [];

function add(productName) {
  // TU CÓDIGO: Agregar a wishlist (evitar duplicados)
  if (!wishlist.includes(productName)) {
    wishlist.push(productName);
  }
}

function remove(productName) {
  // TU CÓDIGO: Eliminar de wishlist
  const index = wishlist.findIndex(e => e === productName);
  if (index !== -1) {
    wishlist.splice(index, 1);
  }
}

function has(productName) {
  // TU CÓDIGO: Verificar si existe
  return wishlist.includes(productName);
}

function getAll() {
  // TU CÓDIGO: Retornar copia del array
  return [...wishlist];
}

function getCount() {
  // TU CÓDIGO: Retornar wishlist.length
  return wishlist.length;
}

function clear() {
  // TU CÓDIGO: Vaciar array
  wishlist.length = 0;
}

// TESTING:
add('iPhone');
add('iPad');
add('iPhone');  // No duplicar
console.log(getCount());  // 2
console.log(has('iPhone'));  // true
remove('iPad');
console.log(getCount());  // 1


// WISHLIST CON CLASE
class Wishlist {
  #products = [];

  add(productName) {
    // TU CÓDIGO
    if(!this.#products.includes(productName)) {
      this.#products.push(productName);
    }
  }

  remove(productName) {
    // TU CÓDIGO
    const index = this.#products.findIndex(e === productName);
    if(index !== -1) {
      this.#products.splice(index, 1);
    }
  }

  has(productName) {
    // TU CÓDIGO
    return this.#products.includes(productName);
  }

  getAll() {
    // TU CÓDIGO
    return [...this.#products];
  }

  getCount() {
    // TU CÓDIGO
    return this.#products.length;
  }

  clear() {
    // TU CÓDIGO
    this.#products = [];
  }
}

// TESTING:
const wishlist1 = new Wishlist();
wishlist1.add('iPhone');
wishlist1.add('iPad');

const wishlist2 = new Wishlist();
wishlist2.add('Laptop');

console.log(wishlist1.getCount());  // 2
console.log(wishlist2.getCount());  // 1
