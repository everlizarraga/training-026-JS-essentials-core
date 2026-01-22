/**
**CONSIGNA:**
Crear mensajes y HTML usando template literals

**TAREAS:**
1. Crear mensaje de bienvenida con nombre completo
2. Crear mensaje con condicional (mayor/menor de 18)
3. Crear tabla HTML con productos
4. Crear email automático con datos del usuario

**RESULTADO ESPERADO:**
Tarea 1: "Bienvenido Carlos González"

Tarea 2: "Carlos tiene 30 años, es mayor de edad"

Tarea 3:
<table>
  <thead>
    <tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Stock</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>Laptop</td><td>$1200</td><td>5</td></tr>
    <tr><td>2</td><td>Mouse</td><td>$25</td><td>15</td></tr>
    <tr><td>3</td><td>Teclado</td><td>$75</td><td>10</td></tr>
  </tbody>
</table>

Tarea 4:
Estimado/a Carlos González,

Tu correo registrado es: carlos@email.com
País: Argentina
Edad: 30 años

Gracias por registrarte.
 */

// ============================================
// EJERCICIO 1: Template Literals
// ============================================

const usuario = {
  nombre: 'Carlos',
  apellido: 'González',
  edad: 30,
  email: 'carlos@email.com',
  pais: 'Argentina'
};

const productos = [
  { id: 1, nombre: 'Laptop', precio: 1200, stock: 5 },
  { id: 2, nombre: 'Mouse', precio: 25, stock: 15 },
  { id: 3, nombre: 'Teclado', precio: 75, stock: 10 }
];

// TAREA 1: Mensaje de bienvenida
const bienvenida = /* TU CÓDIGO AQUÍ */
  `Bienvenido ${usuario.nombre} ${usuario.apellido}`;
// Resultado esperado: "Bienvenido Carlos González"

console.log(bienvenida);

// TAREA 2: Mensaje con condicional
const mensajeEdad = /* TU CÓDIGO AQUÍ */
  `${usuario.nombre} tiene ${usuario.edad} años, es ${usuario.edad >=18 ? 'mayor' : 'menor'} de edad`;
// Resultado esperado: "Carlos tiene 30 años, es mayor de edad"
// O: "Carlos tiene 15 años, es menor de edad"

console.log(mensajeEdad);

// TAREA 3: Tabla HTML con productos
const tablaHTML = /* TU CÓDIGO AQUÍ */
  `
  <table>
    <thead>
      <tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Stock</th></tr>
    </thead>
    <tbody>
      <tr><td>1</td><td>Laptop</td><td>$1200</td><td>5</td></tr>
      <tr><td>2</td><td>Mouse</td><td>$25</td><td>15</td></tr>
      <tr><td>3</td><td>Teclado</td><td>$75</td><td>10</td></tr>
      ${productos
        .map(p => `<tr><td>${p.id}</td><td>${p.nombre}</td><td>$${p.precio}</td><td>${p.stock}</td></tr>`)
        .join('')}
    </tbody>
  </table>
  `;
// Debe generar tabla HTML con todos los productos

console.log(tablaHTML);
// document.body.innerHTML = tablaHTML;  // Para verlo en el navegador

// TAREA 4: Email automático
const emailHTML = /* TU CÓDIGO AQUÍ */
  `Estimado/a ${usuario.nombre} ${usuario.apellido},
  Tu correo registrado es: ${usuario.email}
  País: ${usuario.pais}
  Edad: ${usuario.edad} años
  
  Gracias por registrarte.`;
// Debe ser un email formateado con todos los datos del usuario

console.log(emailHTML);
