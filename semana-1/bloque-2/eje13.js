/**
**CONSIGNA:**
Trabajar con keys, values y entries

**TAREAS:**
1. Obtener todos los nombres de productos (keys)
2. Calcular el precio promedio de productos (values)
3. Crear array de strings formato "producto: $precio"
4. Filtrar productos con precio > 50

**RESULTADO ESPERADO:**
Tarea 1: ['laptop', 'mouse', 'teclado', 'monitor', 'webcam']
Tarea 2: 290
Tarea 3: ['laptop: $1000', 'mouse: $25', 'teclado: $75', 'monitor: $300', 'webcam: $50']
Tarea 4: { laptop: 1000, teclado: 75, monitor: 300 }
 */

// ============================================
// EJERCICIO 13: Object.keys/values/entries
// ============================================

const productos = {
  laptop: 1000,
  mouse: 25,
  teclado: 75,
  monitor: 300,
  webcam: 50
};

// TAREA 1: Nombres de productos
const nombresProductos = /* TU CÓDIGO AQUÍ */
  Object.keys(productos);

console.log('Tarea 1:', nombresProductos);

// TAREA 2: Precio promedio
const precios = /* TU CÓDIGO AQUÍ - obtener values */
  Object.values(productos);
const suma = /* TU CÓDIGO AQUÍ - reduce para sumar */
  precios.reduce((acum, value) => acum + value, 0);
const promedio = suma / precios.length;

console.log('Tarea 2:', promedio);

// TAREA 3: Array de strings "producto: $precio"
const productosFormateados = Object.entries(productos).map(([nombre, precio]) => {
  // TU CÓDIGO AQUÍ
  // Retornar string formato: "laptop: $1000"
  return `${nombre}: $${precio}`;
});

console.log('Tarea 3:', productosFormateados);

// TAREA 4: Filtrar productos caros (>50)
const productosCaros = Object.entries(productos)
  .filter(/* TU CÓDIGO AQUÍ */ ([_, value]) => value > 50)
  .reduce(/* TU CÓDIGO AQUÍ */
    (acum, [key, value]) => {
      acum[key] = value;
      return acum;
    },
    {}
  );

console.log('Tarea 4:', productosCaros);

