/**
**CONSIGNA:**
Procesar datos de ventas con chaining

**TAREAS:**
1. Calcular total de ventas pagadas (filtrar pagado === true, calcular cantidad * precio, sumar todo)
2. Obtener nombres de productos NO pagados
3. Calcular promedio de precio de productos pagados

**RESULTADO ESPERADO:**
Total ventas pagadas: 2525
Productos no pagados: ['Mouse', 'Webcam']
Promedio precio pagados: 458.33
 */

// ============================================
// EJERCICIO 7: Chaining methods
// ============================================

const ventas = [
  { producto: 'Laptop', cantidad: 2, precio: 1000, pagado: true },
  { producto: 'Mouse', cantidad: 5, precio: 25, pagado: false },
  { producto: 'Teclado', cantidad: 3, precio: 75, pagado: true },
  { producto: 'Monitor', cantidad: 1, precio: 300, pagado: true },
  { producto: 'Webcam', cantidad: 2, precio: 50, pagado: false }
];

// TAREA 1: Total de ventas pagadas
const totalVentasPagadas = ventas
// TU CÓDIGO AQUÍ
.filter(venta => venta.pagado)
.map(venta => venta.cantidad * venta.precio)
.reduce((acc, total) => acc + total, 0);

console.log('Total ventas pagadas:', totalVentasPagadas);

// TAREA 2: Nombres de productos NO pagados
const productosNoPagados = ventas
// TU CÓDIGO AQUÍ
.filter(venta => !venta.pagado)
.map(venta => venta.producto);

console.log('Productos no pagados:', productosNoPagados);

// TAREA 3: Promedio de precio de productos pagados
const preciosPagados = ventas
  .filter(venta => venta.pagado === true)
  .map(venta => venta.precio);

const promedioPrecio = preciosPagados.reduce((acc, precio) => acc + precio, 0) / preciosPagados.length;

console.log('Promedio precio pagados:', promedioPrecio);

