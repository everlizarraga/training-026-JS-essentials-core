/**
**CONSIGNA:**
Crear una clase `Product` para un e-commerce que:
- Tenga propiedades: `name`, `price`, `stock`
- Método `buy(quantity)` que:
  - Reste la cantidad del stock
  - Retorne el total (price * quantity)
  - Si no hay stock suficiente, retorne `null`
- Método `restock(quantity)` que agregue al stock
- Método `getInfo()` que retorne un objeto con toda la info
 */

class Product {
  constructor(name, price, stock) {
    // TU CÓDIGO: Asignar propiedades
    this.name = name;
    this.price = price;
    this.stock = stock;
  }

  buy(quantity) {
    // TU CÓDIGO: Verificar stock, restar, retornar total
    if(quantity >= this.stock) return null;
    this.stock -= quantity;
    return this.price * quantity;
  }

  restock(quantity) {
    // TU CÓDIGO: Agregar al stock
    this.stock += quantity;
  }

  getInfo() {
    // TU CÓDIGO: Retornar objeto con toda la info
    return {
      name: this.name,
      price: this.price,
      stock: this.stock
    }
  }
}

// TESTING:
const laptop = new Product('Laptop', 1000, 5);

console.log(laptop.buy(2));      // 2000
console.log(laptop.stock);       // 3
console.log(laptop.buy(10));     // null (no hay stock)
console.log(laptop.restock(5));
console.log(laptop.stock);       // 8



