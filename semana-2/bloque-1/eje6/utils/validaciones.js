// ============================================
// utils/validaciones.js
// ============================================

// TU CÓDIGO AQUÍ
// Exportar funciones de validación

export function esEmail(texto) {
  // Validar formato email simple
  // Debe contener @ y .
  return texto.includes('@') && texto.includes('.');
}

export function esPrecioValido(precio) {
  // Precio debe ser > 0
  return precio > 0;
}

export function esStockSuficiente(stock) {
  // Stock debe ser >= 0
  return stock >= 0;
}

