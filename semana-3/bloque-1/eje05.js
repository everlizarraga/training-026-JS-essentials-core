/**
**CONSIGNA:**

Crear clase `Temperature` con:

**Constructor:** Recibe temperatura en Celsius

**Getters:**
- `celsius` → Retorna temperatura en °C
- `fahrenheit` → Retorna temperatura en °F (formula: C * 9/5 + 32)
- `kelvin` → Retorna temperatura en K (formula: C + 273.15)
- `description` → Retorna:
  - "Congelante" si < 0°C
  - "Frío" si 0-15°C
  - "Templado" si 15-25°C
  - "Caliente" si > 25°C

**Setters:**
- `celsius` → Setear temperatura en °C (validar >= -273.15, cero absoluto)
- `fahrenheit` → Setear temperatura en °F (convertir a °C y guardar)
- `kelvin` → Setear temperatura en K (convertir a °C y guardar)
 */

class Temperature {
  #celsius;
  constructor(celsius) {
    // TU CÓDIGO: Guardar en propiedad privada o _celsius
    this.celsius = celsius;
  }

  get celsius() {
    // TU CÓDIGO
    return Number(this.#celsius.toFixed(2));
  }

  set celsius(value) {
    // TU CÓDIGO: Validar >= -273.15, asignar
    if(value < -273.15) {
      throw new Error("T debe ser mayor a -273.15");
    };
    this.#celsius = value;
  }

  get fahrenheit() {
    // TU CÓDIGO: Retornar celsius * 9/5 + 32
    return this.celsius * 9/5 + 32;
  }

  set fahrenheit(value) {
    // TU CÓDIGO: Convertir a celsius y asignar
    // Formula: (F - 32) * 5/9
    const conversionACelsius = (value - 32) * 5/9;
    this.celsius = conversionACelsius;
  }

  get kelvin() {
    // TU CÓDIGO
    return this.celsius + 273.15;
  }

  set kelvin(value) {
    // TU CÓDIGO: Convertir a celsius (K - 273.15)
    const conversionACelsius = value - 273.15;
    this.celsius = conversionACelsius;
  }

  get description() {
    // TU CÓDIGO: Retornar string según temperatura
    let rpta;
    if(this.celsius <= 0) {
      return "Congelante";
    }
    else if(this.celsius > 0 && this.celsius <= 15) {
      return "Frío";
    }
    else if(this.celsius > 15 && this.celsius <= 25) {
      return "Templado";
    }
    else {
      return "Caliente"
    }
  }
}

// TESTING:
const temp = new Temperature(20);

console.log(temp.celsius);      // 20
console.log(temp.fahrenheit);   // 68
console.log(temp.kelvin);       // 293.15
console.log(temp.description);  // "Templado"

temp.fahrenheit = 32;           // Setear en °F
console.log(temp.celsius);      // 0
console.log(temp.description);  // "Frío"

temp.kelvin = 300;
console.log(temp.celsius);      // 26.85
console.log(temp.description);  // "Caliente"

