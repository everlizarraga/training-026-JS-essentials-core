/**
**CONSIGNA:**
Extraer y excluir propiedades con rest

**TAREAS:**
1. Extraer `id` y `nombre`, el resto en `detalles`
2. Excluir `descuento` del producto (crear nuevo objeto sin descuento)
3. Extraer `precio` y crear nuevo objeto con precio actualizado (+ resto)
4. Crear función que reciba producto y excluya propiedades específicas

**RESULTADO ESPERADO:**
Tarea 1 - id: 1
Tarea 1 - nombre: Laptop
Tarea 1 - detalles: { precio: 1000, stock: 5, marca: 'Dell', categoria: 'electrónica', descuento: 10 }

Tarea 2: { id: 1, nombre: 'Laptop', precio: 1000, stock: 5, marca: 'Dell', categoria: 'electrónica' }

Tarea 3: { id: 1, nombre: 'Laptop', precio: 900, stock: 5, marca: 'Dell', categoria: 'electrónica', descuento: 10 }

Tarea 4: { id: 1, nombre: 'Laptop', precio: 1000, stock: 5, marca: 'Dell' }
 */

// ============================================
// EJERCICIO 12: Rest operator
// ============================================

const producto = {
  id: 1,
  nombre: 'Laptop',
  precio: 1000,
  stock: 5,
  marca: 'Dell',
  categoria: 'electrónica',
  descuento: 10
};

// TAREA 1: id, nombre, resto en detalles
const { /* TU CÓDIGO AQUÍ */
  id,
  nombre,
  ...detalles
} = producto;

console.log('Tarea 1 - id:', id);
console.log('Tarea 1 - nombre:', nombre);
console.log('Tarea 1 - detalles:', detalles);

// TAREA 2: Excluir descuento
const { descuento, ...productoSinDescuento } = producto;

console.log('Tarea 2:', productoSinDescuento);

// TAREA 3: Actualizar precio
const { precio, ...restoProducto } = producto;
const productoConNuevoPrecio = {
  // TU CÓDIGO AQUÍ
  ...restoProducto,
  precio: 900
};

console.log('Tarea 3:', productoConNuevoPrecio);

// TAREA 4: Función para excluir propiedades
function excluirPropiedades(objeto, ...propsAExcluir) {
  // TU CÓDIGO AQUÍ
  // Crear nuevo objeto sin las propiedades en propsAExcluir
  // Pista: usar reduce para construir el nuevo objeto

  return propsAExcluir.reduce((resultado, prop) => {
    const { [prop]: excluded, ...resto } = resultado;
    return resto;
  }, objeto);
}

const productoFiltrado = excluirPropiedades(producto, 'descuento', 'categoria');
console.log('Tarea 4:', productoFiltrado);


