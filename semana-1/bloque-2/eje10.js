/**
**CONSIGNA:**
Extraer información de objetos anidados

**TAREAS:**
1. Extraer `nombre`, `marca`, `modelo`
2. Extraer `ram`, `procesador` de especificaciones
3. Extraer `valor` (renombrado a `precioValor`) y `moneda`
4. Extraer `nombre` y el objeto `precio` completo

**RESULTADO ESPERADO:**
Tarea 1: Laptop Dell XPS 13
Tarea 2: 16GB Intel i7
Tarea 3: 1000 USD
Tarea 4: Laptop { valor: 1000, moneda: 'USD', descuento: 10 }
 */

// ============================================
// EJERCICIO 10: Destructuring anidado
// ============================================

const producto = {
  id: 1,
  nombre: 'Laptop',
  detalles: {
    marca: 'Dell',
    modelo: 'XPS 13',
    especificaciones: {
      ram: '16GB',
      procesador: 'Intel i7',
      almacenamiento: '512GB SSD'
    }
  },
  precio: {
    valor: 1000,
    moneda: 'USD',
    descuento: 10
  }
};

// TAREA 1: nombre, marca, modelo
const {
  nombre,
  detalles: {
    // TU CÓDIGO AQUÍ
    marca,
    modelo
  }
} = producto;

console.log('Tarea 1:', nombre, marca, modelo);

// TAREA 2: ram, procesador
const {
  detalles: {
    especificaciones: {
      // TU CÓDIGO AQUÍ
      ram,
      procesador
    }
  }
} = producto;

console.log('Tarea 2:', ram, procesador);

// TAREA 3: precioValor (renombrado), moneda
const {
  precio: {
    // TU CÓDIGO AQUÍ
    valor: precioValor,
    moneda
  }
} = producto;

console.log('Tarea 3:', precioValor, moneda);

// TAREA 4: nombre y objeto precio completo
const {
  // TU CÓDIGO AQUÍ
  nombre2,
  precio
} = producto;

console.log('Tarea 4:', nombre2, precio);

