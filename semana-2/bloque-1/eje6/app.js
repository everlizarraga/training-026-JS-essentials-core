// ============================================
// app.js
// ============================================

// TU CÓDIGO AQUÍ
// Importar todo lo necesario

import { suma, PI } from './utils/math.js';
import { esEmail, esPrecioValido } from './utils/validaciones.js';
import crearProductCard from './components/ProductCard.js';

// Probar imports
console.log('Suma:', suma(5, 3));
console.log('PI:', PI);

console.log('Es email:', esEmail('test@email.com'));
console.log('Es precio válido:', esPrecioValido(100));

const producto = {
  nombre: 'Laptop',
  precio: 1200,
  stock: 5
};

const card = crearProductCard(producto);
console.log(card);

