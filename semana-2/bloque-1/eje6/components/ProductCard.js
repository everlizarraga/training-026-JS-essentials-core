// ============================================
// components/ProductCard.js
// ============================================

// TU CÓDIGO AQUÍ
// Export default de función que crea card HTML

export default function crearProductCard(producto) {
  // Retornar HTML string de una card de producto
  // Debe mostrar: nombre, precio, stock
  return `<div>${producto.nombre}, ${producto.precio}, ${producto.stock}</div>`
}

