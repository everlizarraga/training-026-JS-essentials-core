/**
**CONSIGNA:**
Implementar `VehicleFactory` que cree vehículos según tipo:

**Tipos:**
- `'car'` → 4 ruedas, capacidad 5 personas
- `'motorcycle'` → 2 ruedas, capacidad 2 personas
- `'truck'` → 6 ruedas, capacidad 3 personas, carga 1000kg

Cada vehículo debe tener:
- Propiedades: brand, model, wheels, capacity, (cargo solo trucks)
- Método `getInfo()` que retorne objeto con toda la info
- Método `canCarry(people)` que retorne true/false según capacidad
 */

class VehicleFactory {
  static createVehicle(type, brand, model) {
    // TU CÓDIGO: Switch según type, retornar instancia apropiada
    switch (type) {
      case 'car':
        return new Car(brand, model);
        break;
      case 'motorcycle':
        return new Motorcycle(brand, model);
        break;
      case 'truck':
        return new Truck(brand, model);
        break;
    
      default:
        throw new Error(`Tipo desconocido: ${type}`);
        break;
    }
  }
}

class Car {
  constructor(brand, model) {
    // TU CÓDIGO
    this.brand = brand;
    this.model = model;
    this.wheels = 4;
    this.capacity = 5;
  }

  getInfo() {
    // TU CÓDIGO
    return {
      brand: this.brand,
      model: this.model,
      wheels: this.wheels,
      capacity: this.capacity
    };
  }

  canCarry(people) {
    // TU CÓDIGO
    return people <= this.capacity;
  }
}

class Motorcycle {
  // TU CÓDIGO: Similar a Car
  constructor(brand, model) {
    // TU CÓDIGO
    this.brand = brand;
    this.model = model;
    this.wheels = 2;
    this.capacity = 2;
  }

  getInfo() {
    // TU CÓDIGO
    return {
      brand: this.brand,
      model: this.model,
      wheels: this.wheels,
      capacity: this.capacity
    };
  }

  canCarry(people) {
    // TU CÓDIGO
    return people <= this.capacity;
  }
}

class Truck {
  // TU CÓDIGO: Similar pero con cargo
  constructor(brand, model) {
    // TU CÓDIGO
    this.brand = brand;
    this.model = model;
    this.wheels = 6;
    this.capacity = 3;
    this.cargo = 1000;
  }

  getInfo() {
    // TU CÓDIGO
    return {
      brand: this.brand,
      model: this.model,
      wheels: this.wheels,
      capacity: this.capacity,
      carga: this.cargo
    };
  }

  canCarry(people) {
    // TU CÓDIGO
    return people <= this.capacity;
  }
}

// TESTING:
const car = VehicleFactory.createVehicle('car', 'Toyota', 'Corolla');
const moto = VehicleFactory.createVehicle('motorcycle', 'Yamaha', 'R1');
const truck = VehicleFactory.createVehicle('truck', 'Volvo', 'FH16');

console.log(car.getInfo());        // { brand: 'Toyota', model: 'Corolla', wheels: 4, capacity: 5 }
console.log(moto.canCarry(3));     // false
console.log(truck.canCarry(2));    // true
console.log(truck.cargo);          // 1000



