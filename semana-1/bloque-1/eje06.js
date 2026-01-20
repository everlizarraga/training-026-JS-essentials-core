/**
**CONSIGNA:**
Transformar arrays en objetos

**TAREAS:**
1. Contar cuántas veces aparece cada color
2. Agrupar usuarios por ciudad

**RESULTADO ESPERADO:**
Conteo colores: { rojo: 3, azul: 3, verde: 1, amarillo: 1 }

Usuarios por ciudad: {
  'Buenos Aires': [
    { nombre: 'Ana', ciudad: 'Buenos Aires' },
    { nombre: 'Lucía', ciudad: 'Buenos Aires' }
  ],
  'Córdoba': [
    { nombre: 'Carlos', ciudad: 'Córdoba' },
    { nombre: 'María', ciudad: 'Córdoba' }
  ],
  'Rosario': [
    { nombre: 'Pedro', ciudad: 'Rosario' }
  ]
}
 */

// ============================================
// EJERCICIO 6: reduce() a objeto
// ============================================

// TAREA 1: Contar colores
const colores = ['rojo', 'azul', 'rojo', 'verde', 'azul', 'rojo', 'amarillo', 'azul'];

const conteoColores = colores.reduce(function (acc, color) {
  // TU CÓDIGO AQUÍ
  // Si acc[color] existe → incrementar
  // Si no existe → inicializar en 1
  // Retornar acc
  if(acc[color]) {
    acc[color] += 1;
  } else {
    acc[color] = 1;
  }
  return acc;
}, {});

console.log('Conteo colores:', conteoColores);

// TAREA 2: Agrupar usuarios por ciudad
const usuarios = [
  { nombre: 'Ana', ciudad: 'Buenos Aires' },
  { nombre: 'Carlos', ciudad: 'Córdoba' },
  { nombre: 'Lucía', ciudad: 'Buenos Aires' },
  { nombre: 'Pedro', ciudad: 'Rosario' },
  { nombre: 'María', ciudad: 'Córdoba' }
];

const usuariosPorCiudad = usuarios.reduce(function (acc, usuario) {
  // TU CÓDIGO AQUÍ
  // 1. Obtener la ciudad del usuario
  // 2. Si acc[ciudad] no existe, crear array vacío
  // 3. Agregar usuario al array de esa ciudad
  // 4. Retornar acc
  const ciudad = usuario.ciudad;
  if(!acc[ciudad]) {
    acc[ciudad] = [];
  }
  acc[ciudad].push(usuario);
  return acc;
}, {});

console.log('Usuarios por ciudad:', usuariosPorCiudad)
