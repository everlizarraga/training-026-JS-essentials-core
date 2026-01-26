/**
**CONSIGNA:**
Crear:
1. Clase base `Vehicle` con:
  - Propiedades: `brand`, `year`, `km`
  - Método `drive(distance)` que sume km
  - Método `getInfo()` que retorne info básica

2. Clase `Car` que extienda `Vehicle` con:
  - Propiedad adicional: `doors` (número de puertas)
  - Método `honk()` que retorne "Beep beep!"
  - Sobreescribir `getInfo()` para incluir `doors`

3. Clase `Motorcycle` que extienda `Vehicle` con:
  - Propiedad adicional: `type` ('sport', 'cruiser', 'touring')
  - Método `wheelie()` que retorne "Haciendo caballito!"
  - Sobreescribir `getInfo()` para incluir `type`
 */

class Vehicle {
  constructor(brand, year) {
    // TU CÓDIGO
    this.brand = brand;
    this.year = year;
    this.km = 0;
  }

  drive(distance) {
    // TU CÓDIGO: Sumar km
    if(distance < 0) return;
    this.km += distance;
  }

  getInfo() {
    // TU CÓDIGO: Retornar objeto con brand, year, km
    return {
      brand: this.brand,
      year: this.year,
      km: this.km
    };
  }
}

class Car extends Vehicle {
  constructor(brand, year, doors) {
    // TU CÓDIGO: Llamar super() y asignar doors
    super(brand, year);
    this.doors = doors;
  }

  honk() {
    // TU CÓDIGO
    return `Beep beep!`;
  }

  getInfo() {
    // TU CÓDIGO: Llamar super.getInfo() y agregar doors
    return {
      ...super.getInfo(),
      doors: this.doors
    };
  }
}

class Motorcycle extends Vehicle {
  constructor(brand, year, type) {
    // TU CÓDIGO
    super(brand, year);
    this.type = type;
  }

  wheelie() {
    // TU CÓDIGO
    return "Haciendo caballito!";
  }

  getInfo() {
    // TU CÓDIGO
    return {
      ...super.getInfo(),
      type: this.type
    };
  }
}

// TESTING:
const car = new Car('Toyota', 2020, 4);
car.drive(100);
console.log(car.honk());      // "Beep beep!"
console.log(car.getInfo());   // { brand: 'Toyota', year: 2020, km: 100, doors: 4 }

const moto = new Motorcycle('Harley', 2019, 'cruiser');
moto.drive(50);
console.log(moto.wheelie());  // "Haciendo caballito!"
console.log(moto.getInfo());  // { brand: 'Harley', year: 2019, km: 50, type: 'cruiser' }


