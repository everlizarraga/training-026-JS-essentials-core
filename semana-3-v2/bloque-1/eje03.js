/**
**CONSIGNA:**
Implementar **Validador de Producto** de DOS formas:

**Validaciones:**
- `validateName(name)` → Mínimo 3 caracteres
- `validatePrice(price)` → Mayor a 0
- `validateStock(stock)` → Mayor o igual a 0
- `getErrors()` → Retornar objeto de errores
- `isValid()` → true si no hay errores
- `clearErrors()` → Limpiar errores
 */

// VALIDADOR CON FUNCIONES
const errors = {};

function validateName(name) {
  // TU CÓDIGO: Validar mínimo 3 caracteres
  // Si inválido: errors.name = 'Mensaje'
  // Si válido: delete errors.name
  // Retornar true/false
  if (name.length < 3) {
    errors['name'] = "Nombre debe tener minimo 3 letras";
    console.log("Validar name:", false);
    return false;
  }
  delete errors.name;
  console.log("Validar name:", true);
  return true;
}

function validatePrice(price) {
  // TU CÓDIGO: Validar > 0
  if (price <= 0) {
    errors.price = "Precio debe ser mayor a cero";
    console.log("Validar precio:", false);
    return false;
  }
  delete errors.price;
  console.log("Validar precio:", true);
  return true;
}

function validateStock(stock) {
  // TU CÓDIGO: Validar >= 0
  if (stock < 0) {
    errors.stock = "Stock debe ser >= 0";
    console.log("Validar stock:", false);
    return false;
  }
  delete errors.stock;
  console.log("Validar stock:", true);
  return true;
}

function getErrors() {
  // TU CÓDIGO: Retornar copia de errors
  return { ...errors };
}

function isValid() {
  // TU CÓDIGO: Retornar true si Object.keys(errors).length === 0
  return Object.keys(errors).length === 0;
}

function clearErrors() {
  // TU CÓDIGO: Limpiar objeto errors
  const keys = Object.keys(errors);
  keys.forEach(key => {
    delete errors[key];
  });
}

// TESTING:
validateName('AB');  // false
validatePrice(-10);  // false
console.log(getErrors());  // { name: '...', price: '...' }
validateName('Laptop');  // true
validatePrice(1000);  // true
console.log(isValid());  // true


// VALIDADOR CON CLASE
class ProductValidator {
  #errors = {};

  validateName(name) {
    // TU CÓDIGO
    if(name.length < 3) {
      this.#errors.name = "nombre debe tener minimo 3 letras";
      console.log("Validar name:", false);
      return false;
    }
    delete this.#errors.name;
    console.log("Validar name:", true);
    return true;
  }

  validatePrice(price) {
    // TU CÓDIGO
    if(price <= 0) {
      this.#errors.price = "Precio debe ser mayor a cero";
      console.log("Validar precio:", false);
      return false;
    }
    delete this.#errors.price;
    console.log("Validar precio:", true);
    return true;
  }

  validateStock(stock) {
    // TU CÓDIGO
    if(stock <= 0) {
      this.#errors.stock = "Stock debe ser mayor a cero";
      console.log("Validar stock:", false);
      return false;
    }
    delete this.#errors.stock;
    console.log("Validar stock:", true);
    return true;
  }

  getErrors() {
    // TU CÓDIGO
    return {...this.#errors};
  }

  isValid() {
    // TU CÓDIGO
    return Object.keys(this.#errors).length === 0;
  }

  clearErrors() {
    // TU CÓDIGO
    const keys = Object.keys(this.#errors);
    keys.forEach(key => {
      delete this.#errors[key];
    });
  }
}

// TESTING:
const validator1 = new ProductValidator();
validator1.validateName('Laptop');
validator1.validatePrice(1000);

const validator2 = new ProductValidator();
validator2.validateName('AB');  // Inválido

console.log(validator1.isValid());  // true
console.log(validator2.isValid());  // false

