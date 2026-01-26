/**
**CONSIGNA:**
Implementar sistema de productos con custom errors:

**Custom Errors:**
1. `InsufficientStockError` → Cuando no hay stock suficiente
2. `InvalidPriceError` → Cuando precio es <= 0
3. `DuplicateError` → Cuando producto ya existe

**ProductStore:**
- `addProduct(id, name, price, stock)` → Validar precio, verificar duplicados
- `buy(productId, quantity)` → Verificar stock, restar
- `getProduct(id)` → Retornar producto o lanzar NotFoundError
 */

class InsufficientStockError extends Error {
  constructor(productId, requested, available) {
    super(`Stock insuficiente para ${productId}`);
    this.name = 'InsufficientStockError';
    this.productId = productId;
    this.requested = requested;
    this.available = available;
  }
}

class InvalidPriceError extends Error {
  // TU CÓDIGO
  constructor(message, price) {
    super(message);
    this.name = 'InvalidPriceError';
    this.price = price;
  }
}

class DuplicateError extends Error {
  // TU CÓDIGO
  constructor(message, element) {
    super(message);
    this.name = 'DuplicateError'
    this.element = element;
  }
}

class ProductStore {
  constructor() {
    this.products = {};  // { id: { name, price, stock } }
  }

  addProduct(id, name, price, stock) {
    // TU CÓDIGO:
    // 1. Validar price > 0 (lanzar InvalidPriceError)
    // 2. Verificar que no exista (lanzar DuplicateError)
    // 3. Agregar producto
    if(price <= 0) {
      throw new InvalidPriceError("Precio > 0", price);
    }
    if(this.products[id]) {
      throw new DuplicateError("Porducto duplicado", id);
    }
    this.products[id] = {name, price, stock};
  }

  buy(productId, quantity) {
    // TU CÓDIGO:
    // 1. Verificar que existe producto
    // 2. Verificar stock >= quantity (lanzar InsufficientStockError)
    // 3. Restar stock
    // 4. Retornar total (price * quantity)
    if(!this.products[productId]) {
      throw new Error(`No existe el producto: ${productId}`);
    }
    const target = this.products[productId];
    if(target.price < quantity) {
      throw new InsufficientStockError(productId, quantity, target.stock);
    }
    target.stock -= quantity;
    return target.price * quantity;
  }

  getProduct(id) {
    // TU CÓDIGO: Retornar o lanzar error si no existe
    if(!this.products[id]) {
      throw new Error(`No existe el producto: ${id}`);
    }
    return this.products[id];
  }
}

// TESTING:
const store = new ProductStore();

try {
  store.addProduct('laptop', 'Laptop Pro', -100, 5);
} catch (error) {
  console.log(`❌ ${error.name}: ${error.message}`);
}

try {
  store.addProduct('laptop', 'Laptop Pro', 1000, 5);
  console.log('✓ Producto agregado');

  store.addProduct('laptop', 'Laptop Pro 2', 1200, 3);
} catch (error) {
  console.log(`❌ ${error.name}: ${error.message}`);
}

try {
  const total = store.buy('laptop', 10);
} catch (error) {
  if (error instanceof InsufficientStockError) {
    console.log(`❌ Stock: pediste ${error.requested}, hay ${error.available}`);
  }
}

try {
  const total = store.buy('laptop', 2);
  console.log(`✓ Compra exitosa: $${total}`);
} catch (error) {
  console.log(`❌ Error: ${error.message}`);
}



