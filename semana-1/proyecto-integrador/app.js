/**
 * @typedef {Object} Producto
 * @property {number} id - Identificador único del producto
 * @property {string} nombre - Nombre del producto
 * @property {string} descripcion - Descripción detallada del producto
 * @property {string} categoria - Categoría principal del producto
 * @property {string} subcategoria - Subcategoría del producto
 * @property {number} precio - Precio actual del producto
 * @property {number} precioOriginal - Precio original antes de descuento
 * @property {number} rating - Calificación del producto (0-5)
 * @property {number} stock - Cantidad disponible en inventario
 * @property {boolean} disponible - Indica si el producto está disponible para venta
 * @property {string} marca - Marca del producto
 * @property {string} url - Imagen del producto
 */

// ============================================
// DATA TRANSFORMER & ANALYZER
// ============================================

// ============================================
// ESTADO GLOBAL
// ============================================

/**@type {Producto[]} */
let productosOriginales = [];  // Dataset completo (nunca mutar)
/**@type {Producto[]} */
let productosFiltrados = [];   // Productos después de filtros

let categorias = [];
// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', inicializarApp);

async function inicializarApp() {
  try {
    // TODO: Cargar dataset desde data.json
    await cargarDatos(); // OK

    // TODO: Inicializar filtros
    inicializarFiltros(); // OK

    // TODO: Renderizar productos iniciales
    renderizarProductos(productosOriginales); // OK

    // TODO: Calcular y mostrar estadísticas iniciales
    actualizarEstadisticas(productosOriginales);

    // TODO: Configurar event listeners
    configurarEventListeners();

    console.log('App inicializada correctamente');
  } catch (error) {
    console.error('Error al inicializar app:', error);
  }
}

// ============================================
// CARGA DE DATOS
// ============================================

async function cargarDatos() {
  // TODO: Fetch de data.json
  // TODO: Guardar en productosOriginales
  // TODO: Inicializar productosFiltrados con copia
  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error(`[HTTP ${response.status}]`);
    }
    const data = await response.json();
    console.log("Data-fetch:", data);
    productosOriginales = data;
    productosFiltrados = [...data];
  } catch (error) {
    console.error(error.message);
    throw error;
  }

  // Pista:
  // const response = await fetch('data.json');
  // const datos = await response.json();
  // productosOriginales = datos;
  // productosFiltrados = [...datos];  // Copia
}

// ============================================
// FILTROS
// ============================================

function inicializarFiltros() {
  // TODO: Obtener categorías únicas del dataset
  // TODO: Poblar select de categorías
  // categorias = productosOriginales.reduce((acum, p) => {
  //   const categoria = p.categoria;
  //   if(!acum.includes(categoria)) acum.push(categoria);
  //   return acum;
  // }, []);
  // categorias = [...new Set(productosOriginales.map(p => p.categoria))];
  categorias = obtenerCategoriasUnicas([...productosOriginales]);
  console.log('categorias:', categorias);

  const selectElement = document.getElementById('categoriaFiltro');
  categorias.forEach(c => {
    const nuevaOpcion = `<option value="${c}">${c}</option>`
    const temp = document.createElement('div');
    temp.innerHTML = nuevaOpcion;
    selectElement.append(temp.children[0]);
  });

  // Pista: usar Set para categorías únicas
  // const categorias = obtenerCategoriasUnicas(productosOriginales);
}

function obtenerCategoriasUnicas(productos) {
  // TODO: Retornar array de categorías únicas
  // Pista: usar Set o reduce

  return [...new Set(productos.map(p => p.categoria))];
}

/**
 * Filtrar por categoria
 * @param {Producto[]} productos 
 * @param {string} categoria 
 * @returns {Producto[]}
 */
function filtrarPorCategoria(productos, categoria) {
  // TODO: Si categoria === 'todas', retornar todos
  // TODO: Si no, filtrar por categoría
  return (categoria === 'todas') ?
    [...productos] :
    productos.filter(p => p.categoria == categoria);

  // IMPORTANTE: NO MUTAR el array original
  // RETORNAR nuevo array filtrado
}

/**
 * Filtrar por precio
 * @param {Producto[]} productos 
 * @param {number} min 
 * @param {number} max 
 * @returns {Producto[]}
 */
function filtrarPorPrecio(productos, min = 0, max) {
  // TODO: Filtrar productos entre min y max
  // Si min o max están vacíos, no aplicar ese límite
  return (max) ?
    productos.filter(p => p.precio <= max && p.precio >= min) :
    productos.filter(p => p.precio >= min);

  // IMPORTANTE: NO MUTAR el array original
}

/**
 * Filtrar por rating
 * @param {Producto[]} productos 
 * @param {Number} ratingMin 
 * @returns {Producto[]}
 */
function filtrarPorRating(productos, ratingMin) {
  // TODO: Filtrar productos con rating >= ratingMin
  return productos.filter(p => p.rating >= ratingMin);

  // IMPORTANTE: NO MUTAR el array original
}

/**
 * Filtrar por stock
 * @param {Producto[]} productos 
 * @param {boolean} soloConStock 
 * @returns {Producto[]}
 */
function filtrarPorStock(productos, soloConStock = true) {
  // TODO: Si soloConStock es true, filtrar solo disponibles
  // Si no, retornar todos
  return (soloConStock) ?
    productos.filter(p => p.stock > 0) :
    [...productos];

  // IMPORTANTE: NO MUTAR el array original
}

function aplicarTodosFiltros() {
  // TODO: Obtener valores de todos los filtros
  // TODO: Aplicar filtros en cascada (uno después de otro)
  // TODO: Actualizar productosFiltrados
  // TODO: Renderizar productos filtrados
  // TODO: Actualizar estadísticas
  const categoriaSeleccionada = document.getElementById('categoriaFiltro');
  const min = document.getElementById('precioMin').value;
  const max = document.getElementById('precioMax').value;
  const rating = document.getElementById('ratingMin').value;
  const soloStock = document.getElementById('stockDisponible').checked;
  // Pipeline:
  let resultado = productosOriginales;
  resultado = filtrarPorCategoria(resultado, categoriaSeleccionada.value);
  // console.log('F-categoria:', resultado);
  resultado = filtrarPorPrecio(resultado, Number(min), Number(max));
  // console.log('F-precio:', resultado);
  resultado = filtrarPorRating(resultado, Number(rating));
  // console.log('F-rating:', resultado);
  resultado = filtrarPorStock(resultado, soloStock);
  productosFiltrados = resultado;
  // console.log('Filtrados:', resultado);
  renderizarProductos(productosFiltrados);
  actualizarEstadisticas(productosFiltrados);
}

// ============================================
// TRANSFORMACIONES
// ============================================

function obtenerNombres(productos) {
  // TODO: Extraer solo nombres de productos
  // Retornar array de strings

  return productos.map(p => p.nombre);
}

/**
 * Calcular total en inventario
 * @param {Producto[]} productos 
 * @returns {number}
 */
function calcularTotalInventario(productos) {
  // TODO: Calcular suma de (precio * stock) de todos los productos
  return productos.reduce((acum, p) => {
    return acum + p.precio * p.stock;
  }, 0);
  // Pista: usar reduce
}

// ============================================
// ESTADÍSTICAS
// ============================================

function calcularPromedio(productos) {
  // TODO: Calcular promedio de precios
  // Si no hay productos, retornar 0

  if (productos.length === 0) return 0;
  const suma = productos.reduce((acc, p) => acc + p.precio, 0);
  return suma / productos.length;
}

function obtenerMaxMin(productos) {
  // TODO: Retornar { max, min } de precios
  // Si no hay productos, retornar { max: 0, min: 0 }

  // Pista: usar Math.max() y Math.min() con spread
  if (productos.length === 0) {
    return { max: 0, min: 0 };
  }
  const precios = productos.map(p => p.precio);
  return { max: Math.max(...precios), min: Math.min(...precios) };
}

function contarPorCategoria(productos) {
  // TODO: Retornar objeto con conteo por categoría
  // Ejemplo: { Electrónica: 25, Ropa: 15, ... }

  // Pista: usar reduce
  return productos.reduce((acc, p) => {
    acc[p.categoria] = (acc[p.categoria] || 0) + 1;
    return acc;
  }, {});
}

function actualizarEstadisticas(productos) {
  // TODO: Calcular todas las estadísticas
  // TODO: Actualizar elementos del DOM

  const total = productos.length;
  const promedio = calcularPromedio(productos);
  const { max, min } = obtenerMaxMin(productos);
  const porCategoria = contarPorCategoria(productos);

  document.getElementById('statTotal').textContent = total;
  document.getElementById('statPromedio').textContent = `$${promedio.toFixed(2)}`;
  document.getElementById('statMax').textContent = `${max}`;
  document.getElementById('statMin').textContent = `${min}`;
}

// ============================================
// BÚSQUEDAS
// ============================================

function buscarPorId(productos, id) {
  // TODO: Usar find() para buscar producto por id

  return productos.find(p => p.id === Number(id));
}

function verificarStock(productos, minStock) {
  // TODO: Verificar si HAY AL MENOS UN producto con stock >= minStock
  // Pista: usar some()

  return productos.some(p => p.stock >= minStock);
}

function todosConRating(productos) {
  // TODO: Verificar si TODOS los productos tienen rating
  // Pista: usar every()

  return productos.every(p => p.rating > 0);
}

function renderizarResultadoBusqueda(producto) {
  const container = document.getElementById('resultadoBusqueda');

  // Limpiar resultado anterior
  container.innerHTML = '';

  // CASO 1: No se encontró el producto
  if (!producto) {
    container.innerHTML = `
            <div style="color: #dc3545; padding: 10px;">
                ❌ No se encontró ningún producto con ese ID
            </div>
        `;
    return;
  }

  // CASO 2: Se encontró el producto
  // Calcular si tiene descuento
  const tieneDescuento = producto.precioOriginal > producto.precio;
  const porcentajeDescuento = tieneDescuento
    ? Math.round(((producto.precioOriginal - producto.precio) / producto.precioOriginal) * 100)
    : 0;

  container.innerHTML = `
        <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #28a745;">
            <h4 style="margin-top: 0; color: #333;">✅ Producto encontrado:</h4>
            
            <div style="display: grid; grid-template-columns: auto 1fr; gap: 10px; font-size: 14px;">
                <strong>ID:</strong>
                <span>${producto.id}</span>
                
                <strong>Nombre:</strong>
                <span>${producto.nombre}</span>
                
                <strong>Descripción:</strong>
                <span>${producto.descripcion}</span>
                
                <strong>Categoría:</strong>
                <span>${producto.categoria} > ${producto.subcategoria}</span>
                
                <strong>Precio:</strong>
                <span style="color: #28a745; font-weight: 600;">
                    $${producto.precio}
                    ${tieneDescuento ? `
                        <span style="text-decoration: line-through; color: #999; font-weight: 400;">
                            $${producto.precioOriginal}
                        </span>
                        <span class="descuento">-${porcentajeDescuento}%</span>
                    ` : ''}
                </span>
                
                <strong>Rating:</strong>
                <span>${renderizarRating(producto.rating)}</span>
                
                <strong>Stock:</strong>
                <span>${renderizarStock(producto)}</span>
                
                <strong>Marca:</strong>
                <span>${producto.marca}</span>
            </div>
        </div>
    `;
}

// ============================================
// ORDENAMIENTO
// ============================================

function ordenarPorPrecio(productos, orden = 'asc') {
  // TODO: Ordenar por precio
  // orden: 'asc' (ascendente) o 'desc' (descendente)

  // IMPORTANTE: NO MUTAR el array original
  // Clonar primero, luego ordenar

  const copia = [...productos];
  return copia.sort((a, b) => {
    return orden === 'asc' ? a.precio - b.precio : b.precio - a.precio;
  });
}

function ordenarPorRating(productos, orden = 'desc') {
  // TODO: Ordenar por rating
  return [...productos].sort((a, b) => {
    return orden === 'desc' ? b.rating - a.rating : a.rating - b.rating;
  });

  // IMPORTANTE: NO MUTAR el array original
}

/**
 * Ordenar por nombre
 * @param {Producto[]} productos 
 * @param {string} orden 
 * @returns {Producto[]}
 */
function ordenarPorNombre(productos, orden = 'asc') {
  // TODO: Ordenar alfabéticamente por nombre

  // IMPORTANTE: NO MUTAR el array original

  const copia = [...productos];
  // return copia.sort((a, b) => a.nombre.localeCompare(b.nombre));
  return copia.sort((a, b) => {
    return orden === 'asc' ?
      a.nombre.localeCompare(b.nombre) :
      b.nombre.localeCompare(a.nombre)
  });
}

function aplicarOrdenamiento() {
  // TODO: Obtener criterio y dirección de ordenamiento
  // TODO: Aplicar ordenamiento a productosFiltrados
  // TODO: Renderizar productos ordenados

  const criterio = document.getElementById('ordenarPor').value;
  const direccion = document.getElementById('ordenDireccion').value;

  let ordenados = productosFiltrados;
  if (criterio === 'precio') {
    ordenados = ordenarPorPrecio(productosFiltrados, direccion);
  } else if (criterio === 'rating') {
    ordenados = ordenarPorRating(productosFiltrados, direccion);
  } else if (criterio === 'nombre') {
    ordenados = ordenarPorNombre(productosFiltrados, direccion);
  } else {
    ordenados = [...productosFiltrados];
  }
  renderizarProductos(ordenados);
}

// ============================================
// RENDERIZADO
// ============================================

/**
 * Renderizar Productos
 * @param {Producto[]} productos 
 */
function renderizarProductos(productos) {
  // TODO: Limpiar tbody
  // TODO: Por cada producto, crear fila <tr> con datos
  // TODO: Insertar en tbody

  const tbody = document.getElementById('tbody');
  tbody.innerHTML = '';

  productos.forEach(producto => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${producto.id}</td>
      <td>${producto.nombre}</td>
      <td>${producto.categoria}</td>
      <td>$${producto.precio}</td>
      <td>${renderizarRating(producto.rating)}</td>
      <td>${renderizarStock(producto)}</td>
    `;
    tbody.appendChild(tr);
  });

  actualizarContadorResultados(productos.length);
  const porCategoria = contarPorCategoria(productos);
  renderizarCategoriasStats(porCategoria);
}

function renderizarRating(rating) {
  // TODO: Convertir rating numérico a estrellas
  // Ejemplo: 4.5 → ⭐⭐⭐⭐½

  const estrellas = '⭐'.repeat(Math.floor(rating));
  return `<span class="rating">${estrellas}</span>`;
}

function renderizarStock(producto) {
  // TODO: Mostrar "Disponible" o "Agotado" según stock

  if (producto.disponible && producto.stock > 0) {
    return `<span class="stock-disponible">Disponible (${producto.stock})</span>`;
  } else {
    return `<span class="stock-agotado">Agotado</span>`;
  }
}

function actualizarContadorResultados(cantidad) {
  // TODO: Actualizar texto "Mostrando X de Y productos"

  const contador = document.getElementById('contadorResultados');
  contador.textContent = `Mostrando ${cantidad} de ${productosOriginales.length} productos`;
}

function renderizarCategoriasStats(conteo) { // [FALTA] implementar
  // TODO: Renderizar badges de categorías con conteo

  const container = document.getElementById('categoriasList');
  container.innerHTML = '';

  Object.entries(conteo).forEach(([categoria, cantidad]) => {
    const badge = document.createElement('span');
    badge.className = 'categoria-badge';
    badge.textContent = `${categoria}: ${cantidad}`;
    container.appendChild(badge);
  });
}

// ============================================
// EVENT LISTENERS
// ============================================

function configurarEventListeners() {
  // TODO: Configurar listeners para todos los filtros
  // TODO: Configurar listener para búsqueda
  // TODO: Configurar listeners para ordenamiento

  document.getElementById('categoriaFiltro').addEventListener('change', aplicarTodosFiltros);
  document.getElementById('precioMin').addEventListener('input', aplicarTodosFiltros);
  document.getElementById('precioMax').addEventListener('input', aplicarTodosFiltros);
  document.getElementById('ratingMin').addEventListener('change', aplicarTodosFiltros);
  document.getElementById('stockDisponible').addEventListener('change', aplicarTodosFiltros);
  document.getElementById('limpiarFiltros').addEventListener('click', limpiarFiltros);

  document.getElementById('ordenarPor').addEventListener('change', aplicarOrdenamiento);
  document.getElementById('ordenDireccion').addEventListener('change', aplicarOrdenamiento);

  document.getElementById('btnBuscar').addEventListener('click', (event) => {
    const input = document.getElementById('buscarId');
    if(input.value !== '') {
      const producto = buscarPorId(productosOriginales, input.value);
      // console.log('producto-buscar:', producto);
      renderizarResultadoBusqueda(producto);
    }
  });
}

// ============================================
// UTILIDADES
// ============================================

function limpiarFiltros() {
  // TODO: Resetear todos los inputs y selects
  // TODO: Aplicar filtros (mostrar todos)

  document.getElementById('categoriaFiltro').value = 'todas';
  document.getElementById('precioMin').value = '';
  document.getElementById('precioMax').value = '';
  document.getElementById('ratingMin').value = '0';
  document.getElementById('stockDisponible').checked = false;
  aplicarTodosFiltros();
}

// ============================================
// TESTING (solo para desarrollo)
// ============================================

function testPureFunctions() {
  // TODO: Verificar que las funciones son puras

  // const productos = [{ id: 1, precio: 100 }, { id: 2, precio: 200 }];
  // const filtrados = filtrarPorPrecio(productos, 50, 150);

  // console.log('Original:', productos);  // Debe estar intacto
  // console.log('Filtrados:', filtrados);

  // if (productos.length === 2) {
  //     console.log('✓ Pure function: no mutó el original');
  // } else {
  //     console.error('✗ Impure function: mutó el original');
  // }
}