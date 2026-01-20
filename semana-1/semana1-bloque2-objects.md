# 🔥 WARMUP SEMANA 1 - BLOQUE 2: Objects Manipulation

**Duración:** 3-4 horas  
**Ejercicios:** 9-14  
**Objetivo:** Dominar destructuring, spread/rest, Object methods, computed properties hasta que sean AUTOMÁTICOS

---

## 📋 ÍNDICE DE EJERCICIOS

9. Destructuring simple - Extraer propiedades de objeto
10. Destructuring anidado - Objetos dentro de objetos
11. Spread operator - Clonar y merge de objetos
12. Rest operator - Extraer "resto" de propiedades
13. Object.keys/values/entries - Iterar sobre objetos
14. Computed properties - Keys dinámicas, shorthand syntax

---

## 🎯 OBJETIVO DEL BLOQUE

Al completar estos ejercicios vas a:
- ✅ Destructurar objetos automáticamente
- ✅ Clonar y merge sin mutaciones
- ✅ Iterar sobre objetos eficientemente
- ✅ Usar sintaxis moderna de ES6+

**Esto es sintaxis que usás TODO EL TIEMPO en código moderno.**

---

## ⏱️ GOVERNOR ACTIVO

- Máximo 20-30 min por ejercicio
- Si funciona → NEXT
- No iterar buscando perfección
- Objetivo: MUSCLE MEMORY

---

# EJERCICIO 9: Destructuring simple

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

## 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Extraer propiedades de objetos
// ============================================

const usuario = {
    nombre: 'Ana',
    edad: 25,
    email: 'ana@email.com',
    ciudad: 'Buenos Aires'
};

// ============================================
// FORMA ANTIGUA (sin destructuring)
// ============================================

const nombre = usuario.nombre;
const edad = usuario.edad;
const email = usuario.email;

console.log(nombre, edad, email);  // Ana 25 ana@email.com

// ============================================
// FORMA MODERNA (con destructuring)
// ============================================

const { nombre: nombreModerno, edad: edadModerna, email: emailModerno } = usuario;

// Sintaxis: { propiedad: nuevaVariable } = objeto

console.log(nombreModerno, edadModerna, emailModerno);  // Ana 25 ana@email.com

// ============================================
// FORMA MÁS COMÚN (mismo nombre de variable)
// ============================================

const { nombre, edad, email } = usuario;
// Cuando la variable tiene el mismo nombre que la propiedad

console.log(nombre, edad, email);  // Ana 25 ana@email.com

// ============================================
// DESTRUCTURING PARCIAL (solo lo que necesitás)
// ============================================

const { nombre, ciudad } = usuario;
// Solo extraemos nombre y ciudad, ignoramos edad y email

console.log(nombre, ciudad);  // Ana Buenos Aires

// ============================================
// DEFAULT VALUES (valores por defecto)
// ============================================

const { nombre, pais = 'Argentina' } = usuario;
// Si 'pais' no existe en usuario, usa 'Argentina'

console.log(pais);  // Argentina (porque usuario no tiene propiedad 'pais')

// ============================================
// DESTRUCTURING EN PARÁMETROS DE FUNCIÓN
// ============================================

function mostrarUsuario({ nombre, edad }) {
    // Destructuring directamente en los parámetros
    console.log(`${nombre} tiene ${edad} años`);
}

mostrarUsuario(usuario);  // Ana tiene 25 años

// ============================================
// ¿POR QUÉ USAR DESTRUCTURING?
// ============================================
// - Código más limpio y legible
// - Menos repetición (no escribir usuario.X cada vez)
// - Sintaxis moderna (ES6+)
// - Muy común en React, Vue, Angular
```

**Diagrama:**

```
ANTES:
const nombre = usuario.nombre;
const edad = usuario.edad;
const email = usuario.email;

AHORA:
const { nombre, edad, email } = usuario;

Más corto, más claro, mismo resultado.
```

**Analogía:**
Es como abrir una caja (objeto) y sacar solo lo que necesitás (propiedades específicas), en vez de cargar con toda la caja.

---

## 🎯 TU TURNO:

**CONSIGNA:**
Extraer información de objetos usando destructuring

**Datos:**

```javascript
const producto = {
    id: 1,
    nombre: 'Laptop',
    precio: 1000,
    stock: 5,
    categoria: 'electrónica',
    marca: 'Dell',
    peso: 2.5
};

const config = {
    tema: 'oscuro',
    idioma: 'es',
    notificaciones: true
};
```

**TAREAS:**

1. Extraer `nombre`, `precio`, `stock` de producto
2. Extraer `tema` y `idioma` de config
3. Extraer `nombre` (renombrado a `nombreProducto`) y `categoria` de producto
4. Extraer `tema` con valor por defecto 'claro' si no existe (probar con objeto vacío)

**PLANTILLA:**

```javascript
// ============================================
// EJERCICIO 9: Destructuring simple
// ============================================

const producto = {
    id: 1,
    nombre: 'Laptop',
    precio: 1000,
    stock: 5,
    categoria: 'electrónica',
    marca: 'Dell',
    peso: 2.5
};

const config = {
    tema: 'oscuro',
    idioma: 'es',
    notificaciones: true
};

// TAREA 1: Extraer nombre, precio, stock
const { /* TU CÓDIGO AQUÍ */ } = producto;

console.log('Tarea 1:', nombre, precio, stock);

// TAREA 2: Extraer tema e idioma
const { /* TU CÓDIGO AQUÍ */ } = config;

console.log('Tarea 2:', tema, idioma);

// TAREA 3: Renombrar nombre a nombreProducto
const { nombre: nombreProducto, /* TU CÓDIGO AQUÍ */ } = producto;

console.log('Tarea 3:', nombreProducto, categoria);

// TAREA 4: Default value
const configVacio = {};
const { tema: temaDefault = 'claro' } = configVacio;

console.log('Tarea 4:', temaDefault);
```

**RESULTADO ESPERADO:**

```
Tarea 1: Laptop 1000 5
Tarea 2: oscuro es
Tarea 3: Laptop electrónica
Tarea 4: claro
```

---

## 💡 HINTS:

**Hint 1:**
- Sintaxis básica: `const { prop1, prop2 } = objeto`
- Renombrar: `const { prop: nuevoNombre } = objeto`
- Default: `const { prop = valorDefault } = objeto`

**Hint 2:**
```javascript
// Tarea 1
const { nombre, precio, stock } = producto;

// Tarea 2
const { tema, idioma } = config;

// Tarea 3
const { nombre: nombreProducto, categoria } = producto;
```

---

## ✅ CHECKLIST:

- [ ] Las 4 tareas funcionan correctamente
- [ ] Entendés la sintaxis de destructuring
- [ ] Entendés cuándo renombrar vs usar mismo nombre

---

# EJERCICIO 10: Destructuring anidado

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

## 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Objetos dentro de objetos
// ============================================

const usuario = {
    nombre: 'Ana',
    edad: 25,
    direccion: {
        calle: 'Av. Corrientes',
        numero: 1234,
        ciudad: 'Buenos Aires',
        pais: 'Argentina'
    },
    contacto: {
        email: 'ana@email.com',
        telefono: '123456789'
    }
};

// ============================================
// FORMA ANTIGUA
// ============================================

const nombre = usuario.nombre;
const calle = usuario.direccion.calle;
const ciudad = usuario.direccion.ciudad;
const email = usuario.contacto.email;

console.log(nombre, calle, ciudad, email);

// ============================================
// DESTRUCTURING ANIDADO
// ============================================

const {
    nombre: nombreDestructurado,
    direccion: {
        calle: calleDestructurada,
        ciudad: ciudadDestructurada
    },
    contacto: {
        email: emailDestructurado
    }
} = usuario;

console.log(nombreDestructurado, calleDestructurada, ciudadDestructurada, emailDestructurado);

// ============================================
// VERSIÓN MÁS COMÚN (mismo nombre)
// ============================================

const {
    nombre,
    direccion: { calle, ciudad },
    contacto: { email }
} = usuario;

console.log(nombre, calle, ciudad, email);

// ============================================
// IMPORTANTE: ¿Qué pasa con 'direccion' y 'contacto'?
// ============================================

// En el destructuring anidado, si NO nombrás el objeto padre,
// NO se crea la variable

const { direccion: { calle } } = usuario;
console.log(calle);  // 'Av. Corrientes' ✓
console.log(direccion);  // ReferenceError: direccion is not defined ✗

// Si querés AMBOS (objeto padre Y propiedades):
const {
    direccion,  // Variable 'direccion' con el objeto completo
    direccion: { calle, ciudad }  // Variables 'calle' y 'ciudad'
} = usuario;

console.log(direccion);  // { calle: 'Av. Corrientes', ... } ✓
console.log(calle);      // 'Av. Corrientes' ✓
console.log(ciudad);     // 'Buenos Aires' ✓

// ============================================
// DEFAULT VALUES EN ANIDADOS
// ============================================

const persona = {
    nombre: 'Carlos',
    direccion: {
        ciudad: 'Córdoba'
        // No tiene 'calle'
    }
};

const {
    direccion: {
        ciudad,
        calle = 'Calle desconocida'  // Default si no existe
    }
} = persona;

console.log(ciudad);  // Córdoba
console.log(calle);   // Calle desconocida
```

**Diagrama:**

```
usuario = {
    nombre: 'Ana',
    direccion: {
        calle: 'Av. Corrientes',
        ciudad: 'Buenos Aires'
    }
}

const {
    nombre,                    ← Nivel 1
    direccion: {               ← Entrar a 'direccion'
        calle,                 ← Nivel 2
        ciudad                 ← Nivel 2
    }
} = usuario;

Resultado:
- nombre = 'Ana'
- calle = 'Av. Corrientes'
- ciudad = 'Buenos Aires'
```

---

## 🎯 TU TURNO:

**CONSIGNA:**
Extraer información de objetos anidados

**Datos:**

```javascript
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
```

**TAREAS:**

1. Extraer `nombre`, `marca`, `modelo`
2. Extraer `ram`, `procesador` de especificaciones
3. Extraer `valor` (renombrado a `precioValor`) y `moneda`
4. Extraer `nombre` y el objeto `precio` completo

**PLANTILLA:**

```javascript
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
    }
} = producto;

console.log('Tarea 1:', nombre, marca, modelo);

// TAREA 2: ram, procesador
const {
    detalles: {
        especificaciones: {
            // TU CÓDIGO AQUÍ
        }
    }
} = producto;

console.log('Tarea 2:', ram, procesador);

// TAREA 3: precioValor (renombrado), moneda
const {
    precio: {
        // TU CÓDIGO AQUÍ
    }
} = producto;

console.log('Tarea 3:', precioValor, moneda);

// TAREA 4: nombre y objeto precio completo
const {
    // TU CÓDIGO AQUÍ
} = producto;

console.log('Tarea 4:', nombre, precio);
```

**RESULTADO ESPERADO:**

```
Tarea 1: Laptop Dell XPS 13
Tarea 2: 16GB Intel i7
Tarea 3: 1000 USD
Tarea 4: Laptop { valor: 1000, moneda: 'USD', descuento: 10 }
```

---

## 💡 HINTS:

**Hint 1 (estructura básica):**
```javascript
const {
    nombre,
    detalles: {
        marca,
        modelo
    }
} = producto;
```

**Hint 2 (anidado profundo):**
```javascript
const {
    detalles: {
        especificaciones: {
            ram,
            procesador
        }
    }
} = producto;
```

**Hint 3 (renombrar + objeto completo):**
```javascript
// Tarea 3
const {
    precio: {
        valor: precioValor,
        moneda
    }
} = producto;

// Tarea 4
const {
    nombre,
    precio  // Objeto completo
} = producto;
```

---

## ✅ CHECKLIST:

- [ ] Las 4 tareas funcionan
- [ ] Entendés cómo "entrar" en objetos anidados
- [ ] Entendés la diferencia entre extraer propiedad vs objeto completo

---

# EJERCICIO 11: Spread operator

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

## 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Clonar y merge de objetos con spread
// ============================================

const usuario = {
    nombre: 'Ana',
    edad: 25,
    email: 'ana@email.com'
};

// ============================================
// CASO 1: CLONAR objeto (crear copia)
// ============================================

// FORMA ANTIGUA (asignación directa - MAL)
const copiaMAL = usuario;
copiaMAL.nombre = 'Carlos';
console.log(usuario.nombre);  // 'Carlos' ✗ (modificó el original!)

// FORMA MODERNA (spread operator - BIEN)
const copiaBIEN = { ...usuario };
copiaBIEN.nombre = 'Carlos';
console.log(usuario.nombre);  // 'Ana' ✓ (original intacto)
console.log(copiaBIEN.nombre);  // 'Carlos' ✓

// El spread (...) "desparrama" todas las propiedades en un nuevo objeto

// ============================================
// CASO 2: MERGE de objetos (combinar)
// ============================================

const datosBasicos = {
    nombre: 'Ana',
    edad: 25
};

const datosContacto = {
    email: 'ana@email.com',
    telefono: '123456789'
};

// Combinar ambos objetos en uno nuevo
const usuarioCompleto = {
    ...datosBasicos,
    ...datosContacto
};

console.log(usuarioCompleto);
// {
//   nombre: 'Ana',
//   edad: 25,
//   email: 'ana@email.com',
//   telefono: '123456789'
// }

// ============================================
// CASO 3: OVERRIDE de propiedades
// ============================================

const usuarioOriginal = {
    nombre: 'Ana',
    edad: 25,
    ciudad: 'Buenos Aires'
};

// Crear nuevo objeto con edad actualizada
const usuarioActualizado = {
    ...usuarioOriginal,
    edad: 26  // Override: la última versión gana
};

console.log(usuarioOriginal.edad);  // 25 (original intacto)
console.log(usuarioActualizado.edad);  // 26 (nueva versión)

// ============================================
// CASO 4: AGREGAR propiedades nuevas
// ============================================

const producto = {
    id: 1,
    nombre: 'Laptop'
};

const productoConPrecio = {
    ...producto,
    precio: 1000,  // Nueva propiedad
    stock: 5       // Nueva propiedad
};

console.log(productoConPrecio);
// { id: 1, nombre: 'Laptop', precio: 1000, stock: 5 }

// ============================================
// IMPORTANTE: Spread es SHALLOW COPY (copia superficial)
// ============================================

const usuarioConDireccion = {
    nombre: 'Ana',
    direccion: {
        ciudad: 'Buenos Aires'
    }
};

const copia = { ...usuarioConDireccion };
copia.direccion.ciudad = 'Córdoba';  // Modifica el objeto anidado

console.log(usuarioConDireccion.direccion.ciudad);  // 'Córdoba' ✗
// El objeto anidado NO se clonó, se copió la referencia

// Para copia profunda (deep copy):
const copiaDeep = JSON.parse(JSON.stringify(usuarioConDireccion));
// O usar librerías como lodash
```

**Diagrama:**

```
CLONAR:
original = { a: 1, b: 2 }
           ↓
   { ...original }
           ↓
   { a: 1, b: 2 }  (nuevo objeto)

MERGE:
obj1 = { a: 1 }
obj2 = { b: 2 }
           ↓
   { ...obj1, ...obj2 }
           ↓
   { a: 1, b: 2 }

OVERRIDE:
original = { a: 1, b: 2 }
           ↓
   { ...original, b: 99 }
           ↓
   { a: 1, b: 99 }
```

---

## 🎯 TU TURNO:

**CONSIGNA:**
Clonar, merge y actualizar objetos con spread

**Datos:**

```javascript
const producto = {
    id: 1,
    nombre: 'Laptop',
    precio: 1000
};

const detalles = {
    marca: 'Dell',
    modelo: 'XPS 13'
};

const actualizacion = {
    precio: 900,  // Precio reducido
    stock: 5
};
```

**TAREAS:**

1. Clonar `producto` (crear copia independiente)
2. Merge de `producto` + `detalles`
3. Actualizar `producto` con `actualizacion` (override precio, agregar stock)
4. Crear nuevo objeto con todas las propiedades + descuento: 10

**PLANTILLA:**

```javascript
// ============================================
// EJERCICIO 11: Spread operator
// ============================================

const producto = {
    id: 1,
    nombre: 'Laptop',
    precio: 1000
};

const detalles = {
    marca: 'Dell',
    modelo: 'XPS 13'
};

const actualizacion = {
    precio: 900,
    stock: 5
};

// TAREA 1: Clonar producto
const productoClonado = { /* TU CÓDIGO AQUÍ */ };

console.log('Tarea 1:', productoClonado);

// TAREA 2: Merge producto + detalles
const productoConDetalles = {
    // TU CÓDIGO AQUÍ
};

console.log('Tarea 2:', productoConDetalles);

// TAREA 3: Actualizar con override
const productoActualizado = {
    // TU CÓDIGO AQUÍ
};

console.log('Tarea 3:', productoActualizado);

// TAREA 4: Todo + descuento
const productoCompleto = {
    // TU CÓDIGO AQUÍ
    descuento: 10
};

console.log('Tarea 4:', productoCompleto);
```

**RESULTADO ESPERADO:**

```
Tarea 1: { id: 1, nombre: 'Laptop', precio: 1000 }
Tarea 2: { id: 1, nombre: 'Laptop', precio: 1000, marca: 'Dell', modelo: 'XPS 13' }
Tarea 3: { id: 1, nombre: 'Laptop', precio: 900, stock: 5 }
Tarea 4: { id: 1, nombre: 'Laptop', precio: 900, marca: 'Dell', modelo: 'XPS 13', stock: 5, descuento: 10 }
```

---

## 💡 HINTS:

**Hint 1:**
- Clonar: `{ ...objeto }`
- Merge: `{ ...obj1, ...obj2 }`
- Override: `{ ...original, propiedad: nuevoValor }`

**Hint 2:**
```javascript
// Tarea 1
const productoClonado = { ...producto };

// Tarea 2
const productoConDetalles = { ...producto, ...detalles };

// Tarea 3
const productoActualizado = { ...producto, ...actualizacion };

// Tarea 4
const productoCompleto = { ...producto, ...detalles, ...actualizacion, descuento: 10 };
```

---

## ✅ CHECKLIST:

- [ ] Clonado funciona (modificar copia no afecta original)
- [ ] Merge combina propiedades correctamente
- [ ] Override reemplaza valores existentes
- [ ] Entendés inmutabilidad (no mutar originales)

---

# EJERCICIO 12: Rest operator

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

## 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Extraer "resto" de propiedades
// ============================================

const usuario = {
    id: 1,
    nombre: 'Ana',
    edad: 25,
    email: 'ana@email.com',
    telefono: '123456789',
    ciudad: 'Buenos Aires'
};

// ============================================
// REST en destructuring: capturar el "resto"
// ============================================

// Extraer 'id' y 'nombre', el resto en 'otrosDatos'
const { id, nombre, ...otrosDatos } = usuario;

console.log(id);          // 1
console.log(nombre);      // 'Ana'
console.log(otrosDatos);  // { edad: 25, email: '...', telefono: '...', ciudad: '...' }

// ============================================
// USO PRÁCTICO: Excluir propiedades
// ============================================

// Queremos usuario SIN la propiedad 'telefono'
const { telefono, ...usuarioSinTelefono } = usuario;

console.log(usuarioSinTelefono);
// {
//   id: 1,
//   nombre: 'Ana',
//   edad: 25,
//   email: 'ana@email.com',
//   ciudad: 'Buenos Aires'
// }
// (telefono no está)

// ============================================
// DIFERENCIA: Spread vs Rest
// ============================================

// SPREAD (...): "Desparramar" propiedades (crear/combinar)
const copia = { ...usuario };  // Desparrama usuario en nuevo objeto

// REST (...): "Capturar" el resto (destructuring)
const { id, ...resto } = usuario;  // Captura el resto después de id

// Ambos usan ..., pero en contextos diferentes:
// - Spread: lado DERECHO de =
// - Rest: lado IZQUIERDO de =

// ============================================
// USO EN FUNCIONES: Parámetros variables
// ============================================

function crearUsuario(nombre, edad, ...otrasProps) {
    // otrasProps captura TODOS los argumentos restantes en un array
    return {
        nombre,
        edad,
        ...otrasProps  // Spread del array (si son objetos)
    };
}

// Nota: En funciones, rest captura en ARRAY
// En destructuring de objetos, rest captura en OBJETO

// ============================================
// CASO PRÁCTICO: Actualizar objeto sin mutar
// ============================================

const productoOriginal = {
    id: 1,
    nombre: 'Laptop',
    precio: 1000,
    stock: 5,
    descuento: 10
};

// Quiero actualizar precio, mantener todo lo demás
function actualizarPrecio(producto, nuevoPrecio) {
    const { precio, ...resto } = producto;  // Excluir precio viejo
    return {
        ...resto,           // Desparramar resto
        precio: nuevoPrecio  // Agregar nuevo precio
    };
}

const productoActualizado = actualizarPrecio(productoOriginal, 900);
console.log(productoOriginal.precio);    // 1000 (original intacto)
console.log(productoActualizado.precio); // 900 (nueva versión)
```

**Diagrama:**

```
REST (capturar resto):

const { a, b, ...rest } = { a: 1, b: 2, c: 3, d: 4 }
                                ↓
a = 1
b = 2
rest = { c: 3, d: 4 }  ← Captura el resto


SPREAD (desparramar):

const obj = { a: 1, b: 2 }
const nuevo = { ...obj, c: 3 }
                ↓
nuevo = { a: 1, b: 2, c: 3 }  ← Desparrama obj
```

---

## 🎯 TU TURNO:

**CONSIGNA:**
Extraer y excluir propiedades con rest

**Datos:**

```javascript
const producto = {
    id: 1,
    nombre: 'Laptop',
    precio: 1000,
    stock: 5,
    marca: 'Dell',
    categoria: 'electrónica',
    descuento: 10
};
```

**TAREAS:**

1. Extraer `id` y `nombre`, el resto en `detalles`
2. Excluir `descuento` del producto (crear nuevo objeto sin descuento)
3. Extraer `precio` y crear nuevo objeto con precio actualizado (+ resto)
4. Crear función que reciba producto y excluya propiedades específicas

**PLANTILLA:**

```javascript
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
const { /* TU CÓDIGO AQUÍ */ } = producto;

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
```

**RESULTADO ESPERADO:**

```
Tarea 1 - id: 1
Tarea 1 - nombre: Laptop
Tarea 1 - detalles: { precio: 1000, stock: 5, marca: 'Dell', categoria: 'electrónica', descuento: 10 }

Tarea 2: { id: 1, nombre: 'Laptop', precio: 1000, stock: 5, marca: 'Dell', categoria: 'electrónica' }

Tarea 3: { id: 1, nombre: 'Laptop', precio: 900, stock: 5, marca: 'Dell', categoria: 'electrónica', descuento: 10 }

Tarea 4: { id: 1, nombre: 'Laptop', precio: 1000, stock: 5, marca: 'Dell' }
```

---

## 💡 HINTS:

**Hint 1 (Tarea 1):**
```javascript
const { id, nombre, ...detalles } = producto;
```

**Hint 2 (Tarea 3):**
```javascript
const productoConNuevoPrecio = {
    ...restoProducto,
    precio: 900
};
```

**Hint 3 (Tarea 4):**
La función ya está implementada con reduce. Solo necesitás entenderla:
- Recibe objeto y lista de propiedades a excluir
- Por cada propiedad, crea nuevo objeto sin ella
- Usa computed property [prop] para excluir dinámicamente

---

## ✅ CHECKLIST:

- [ ] Extraes propiedades y capturás resto correctamente
- [ ] Excluyes propiedades sin mutar original
- [ ] Entendés diferencia entre spread (derecha) y rest (izquierda)

---

# EJERCICIO 13: Object.keys/values/entries

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

## 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Iterar sobre objetos
// ============================================

const usuario = {
    nombre: 'Ana',
    edad: 25,
    email: 'ana@email.com',
    activo: true
};

// ============================================
// Object.keys(): Obtener array de KEYS (nombres de propiedades)
// ============================================

const keys = Object.keys(usuario);
console.log(keys);  // ['nombre', 'edad', 'email', 'activo']

// Usar con forEach
keys.forEach(key => {
    console.log(key);  // 'nombre', 'edad', 'email', 'activo'
});

// ============================================
// Object.values(): Obtener array de VALUES (valores)
// ============================================

const values = Object.values(usuario);
console.log(values);  // ['Ana', 25, 'ana@email.com', true]

// Usar con map
const valuesEnMayusculas = values.map(value => {
    return typeof value === 'string' ? value.toUpperCase() : value;
});
console.log(valuesEnMayusculas);  // ['ANA', 25, 'ANA@EMAIL.COM', true]

// ============================================
// Object.entries(): Obtener array de [key, value] pairs
// ============================================

const entries = Object.entries(usuario);
console.log(entries);
// [
//   ['nombre', 'Ana'],
//   ['edad', 25],
//   ['email', 'ana@email.com'],
//   ['activo', true]
// ]

// Usar con forEach
entries.forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});
// nombre: Ana
// edad: 25
// email: ana@email.com
// activo: true

// ============================================
// CASO PRÁCTICO: Filtrar propiedades de objeto
// ============================================

const producto = {
    id: 1,
    nombre: 'Laptop',
    precio: 1000,
    stock: 0,
    activo: false
};

// Filtrar solo propiedades con valores truthy
const productoFiltrado = Object.entries(producto)
    .filter(([key, value]) => value)  // Solo truthy
    .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
    }, {});

console.log(productoFiltrado);
// { id: 1, nombre: 'Laptop', precio: 1000 }
// (stock: 0 y activo: false fueron filtrados)

// ============================================
// CASO PRÁCTICO: Transformar objeto
// ============================================

const precios = {
    laptop: 1000,
    mouse: 25,
    teclado: 75
};

// Convertir todos los precios a ARS
const tipoDeCambio = 350;

const preciosARS = Object.entries(precios)
    .map(([producto, precioUSD]) => {
        return [producto, precioUSD * tipoDeCambio];
    })
    .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
    }, {});

console.log(preciosARS);
// { laptop: 350000, mouse: 8750, teclado: 26250 }

// ============================================
// CASO PRÁCTICO: Contar propiedades por tipo
// ============================================

const datos = {
    nombre: 'Ana',
    edad: 25,
    activo: true,
    ciudad: 'Buenos Aires',
    pais: 'Argentina'
};

const conteoTipos = Object.values(datos).reduce((acc, value) => {
    const tipo = typeof value;
    acc[tipo] = (acc[tipo] || 0) + 1;
    return acc;
}, {});

console.log(conteoTipos);
// { string: 3, number: 1, boolean: 1 }
```

**Diagrama:**

```
objeto = { a: 1, b: 2, c: 3 }

Object.keys(objeto)
    ↓
['a', 'b', 'c']

Object.values(objeto)
    ↓
[1, 2, 3]

Object.entries(objeto)
    ↓
[['a', 1], ['b', 2], ['c', 3]]
```

---

## 🎯 TU TURNO:

**CONSIGNA:**
Trabajar con keys, values y entries

**Datos:**

```javascript
const productos = {
    laptop: 1000,
    mouse: 25,
    teclado: 75,
    monitor: 300,
    webcam: 50
};

const stats = {
    visitas: 1500,
    usuarios: 250,
    ventas: 89,
    conversiones: 45
};
```

**TAREAS:**

1. Obtener todos los nombres de productos (keys)
2. Calcular el precio promedio de productos (values)
3. Crear array de strings formato "producto: $precio"
4. Filtrar productos con precio > 50

**PLANTILLA:**

```javascript
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
const nombresProductos = /* TU CÓDIGO AQUÍ */;

console.log('Tarea 1:', nombresProductos);

// TAREA 2: Precio promedio
const precios = /* TU CÓDIGO AQUÍ - obtener values */;
const suma = /* TU CÓDIGO AQUÍ - reduce para sumar */;
const promedio = suma / precios.length;

console.log('Tarea 2:', promedio);

// TAREA 3: Array de strings "producto: $precio"
const productosFormateados = Object.entries(productos).map(([nombre, precio]) => {
    // TU CÓDIGO AQUÍ
    // Retornar string formato: "laptop: $1000"
});

console.log('Tarea 3:', productosFormateados);

// TAREA 4: Filtrar productos caros (>50)
const productosCaros = Object.entries(productos)
    .filter(/* TU CÓDIGO AQUÍ */)
    .reduce(/* TU CÓDIGO AQUÍ */);

console.log('Tarea 4:', productosCaros);
```

**RESULTADO ESPERADO:**

```
Tarea 1: ['laptop', 'mouse', 'teclado', 'monitor', 'webcam']
Tarea 2: 290
Tarea 3: ['laptop: $1000', 'mouse: $25', 'teclado: $75', 'monitor: $300', 'webcam: $50']
Tarea 4: { laptop: 1000, teclado: 75, monitor: 300 }
```

---

## 💡 HINTS:

**Hint 1:**
```javascript
// Tarea 1
const nombresProductos = Object.keys(productos);

// Tarea 2
const precios = Object.values(productos);
const suma = precios.reduce((acc, precio) => acc + precio, 0);
```

**Hint 2 (Tarea 3):**
```javascript
return `${nombre}: $${precio}`;
```

**Hint 3 (Tarea 4):**
```javascript
const productosCaros = Object.entries(productos)
    .filter(([nombre, precio]) => precio > 50)
    .reduce((obj, [nombre, precio]) => {
        obj[nombre] = precio;
        return obj;
    }, {});
```

---

## ✅ CHECKLIST:

- [ ] Keys retorna array de nombres de propiedades
- [ ] Values retorna array de valores
- [ ] Entries retorna array de pares [key, value]
- [ ] Entendés cómo reconstruir objeto después de transformar

---

# EJERCICIO 14: Computed properties

⏱️ **TIEMPO LÍMITE:** 20-30 min

---

## 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Keys dinámicas y shorthand syntax
// ============================================

// ============================================
// SHORTHAND PROPERTY (cuando variable = nombre de propiedad)
// ============================================

const nombre = 'Ana';
const edad = 25;
const email = 'ana@email.com';

// FORMA ANTIGUA
const usuario1 = {
    nombre: nombre,
    edad: edad,
    email: email
};

// FORMA MODERNA (shorthand)
const usuario2 = {
    nombre,  // Equivale a nombre: nombre
    edad,    // Equivale a edad: edad
    email    // Equivale a email: email
};

console.log(usuario2);  // { nombre: 'Ana', edad: 25, email: 'ana@email.com' }

// ============================================
// COMPUTED PROPERTY NAMES (keys dinámicas)
// ============================================

// Crear objeto con key dinámica (variable)
const propiedad = 'nombre';
const valor = 'Ana';

const obj = {
    [propiedad]: valor  // [propiedad] se evalúa a 'nombre'
};

console.log(obj);  // { nombre: 'Ana' }

// ============================================
// CASO PRÁCTICO: Crear objeto dinámicamente
// ============================================

function crearUsuario(campo, valor) {
    return {
        [campo]: valor  // Key dinámica
    };
}

console.log(crearUsuario('nombre', 'Ana'));  // { nombre: 'Ana' }
console.log(crearUsuario('edad', 25));       // { edad: 25 }

// ============================================
// CASO PRÁCTICO: Transformar array a objeto
// ============================================

const productos = [
    { id: 1, nombre: 'Laptop' },
    { id: 2, nombre: 'Mouse' },
    { id: 3, nombre: 'Teclado' }
];

// Queremos: { 1: { nombre: 'Laptop' }, 2: { nombre: 'Mouse' }, ... }

const productosPorId = productos.reduce((acc, producto) => {
    return {
        ...acc,
        [producto.id]: producto  // Key dinámica (id del producto)
    };
}, {});

console.log(productosPorId);
// {
//   1: { id: 1, nombre: 'Laptop' },
//   2: { id: 2, nombre: 'Mouse' },
//   3: { id: 3, nombre: 'Teclado' }
// }

// ============================================
// COMPUTED + TEMPLATE LITERALS
// ============================================

const categoria = 'electrónica';
const subcategoria = 'laptops';

const inventario = {
    [`${categoria}_${subcategoria}`]: 50  // Key: 'electrónica_laptops'
};

console.log(inventario);  // { electrónica_laptops: 50 }

// ============================================
// SHORTHAND + COMPUTED + DEFAULT
// ============================================

function crearProducto(nombre, precio, extra = {}) {
    return {
        nombre,           // Shorthand
        precio,           // Shorthand
        ...extra,         // Spread
        [`precio_${nombre.toLowerCase()}`]: precio  // Computed
    };
}

const laptop = crearProducto('Laptop', 1000, { marca: 'Dell' });
console.log(laptop);
// {
//   nombre: 'Laptop',
//   precio: 1000,
//   marca: 'Dell',
//   precio_laptop: 1000
// }
```

**Diagrama:**

```
SHORTHAND:
const nombre = 'Ana';
const obj = { nombre };  ← Equivale a { nombre: nombre }

COMPUTED:
const key = 'nombre';
const obj = { [key]: 'Ana' };  ← Key dinámica
           ↓
{ nombre: 'Ana' }

COMPUTED + TEMPLATE:
const tipo = 'precio';
const id = 1;
const obj = { [`${tipo}_${id}`]: 100 };
           ↓
{ precio_1: 100 }
```

---

## 🎯 TU TURNO:

**CONSIGNA:**
Usar shorthand y computed properties

**TAREAS:**

1. Crear usuario con shorthand (variables nombre, edad, email)
2. Función que crea objeto con key dinámica
3. Transformar array de productos a objeto indexado por ID
4. Crear objeto con keys computadas (template literals)

**PLANTILLA:**

```javascript
// ============================================
// EJERCICIO 14: Computed properties
// ============================================

// TAREA 1: Shorthand
const nombre = 'Carlos';
const edad = 30;
const email = 'carlos@email.com';

const usuario = {
    // TU CÓDIGO AQUÍ (usar shorthand)
};

console.log('Tarea 1:', usuario);

// TAREA 2: Función con computed property
function crearConfiguracion(clave, valor) {
    return {
        // TU CÓDIGO AQUÍ
        // Retornar objeto con [clave]: valor
    };
}

console.log('Tarea 2:', crearConfiguracion('tema', 'oscuro'));
console.log('Tarea 2:', crearConfiguracion('idioma', 'es'));

// TAREA 3: Array a objeto indexado por ID
const productos = [
    { id: 101, nombre: 'Laptop', precio: 1000 },
    { id: 102, nombre: 'Mouse', precio: 25 },
    { id: 103, nombre: 'Teclado', precio: 75 }
];

const productosPorId = productos.reduce((acc, producto) => {
    return {
        ...acc,
        // TU CÓDIGO AQUÍ
        // [producto.id]: producto
    };
}, {});

console.log('Tarea 3:', productosPorId);

// TAREA 4: Computed con template literals
const categoria = 'electrónica';
const año = 2024;
const mes = 'enero';

const reporte = {
    // TU CÓDIGO AQUÍ
    // Crear keys: 'categoria_electrónica', 'periodo_2024_enero'
    // Valores pueden ser cualquier cosa
};

console.log('Tarea 4:', reporte);
```

**RESULTADO ESPERADO:**

```
Tarea 1: { nombre: 'Carlos', edad: 30, email: 'carlos@email.com' }
Tarea 2: { tema: 'oscuro' }
Tarea 2: { idioma: 'es' }
Tarea 3: {
  101: { id: 101, nombre: 'Laptop', precio: 1000 },
  102: { id: 102, nombre: 'Mouse', precio: 25 },
  103: { id: 103, nombre: 'Teclado', precio: 75 }
}
Tarea 4: { categoria_electrónica: ..., periodo_2024_enero: ... }
```

---

## 💡 HINTS:

**Hint 1:**
```javascript
// Tarea 1
const usuario = { nombre, edad, email };

// Tarea 2
return { [clave]: valor };
```

**Hint 2:**
```javascript
// Tarea 3
const productosPorId = productos.reduce((acc, producto) => {
    return {
        ...acc,
        [producto.id]: producto
    };
}, {});
```

**Hint 3:**
```javascript
// Tarea 4
const reporte = {
    [`categoria_${categoria}`]: categoria,
    [`periodo_${año}_${mes}`]: `${mes} ${año}`
};
```

---

## ✅ CHECKLIST:

- [ ] Shorthand funciona correctamente
- [ ] Computed properties con variables
- [ ] Computed con template literals
- [ ] Entendés cuándo usar cada uno

---

## 🎓 RESUMEN DEL BLOQUE 2

**Conceptos dominados:**
- ✅ Destructuring simple y anidado
- ✅ Spread operator (clonar, merge, update)
- ✅ Rest operator (capturar resto)
- ✅ Object.keys/values/entries (iterar)
- ✅ Computed properties + shorthand

**Nivel alcanzado:** Objects manipulation AUTOMÁTICO

**Tiempo invertido:** ~3-4 horas

**Siguiente paso:** Bloque 3 - Functional Programming

---

## 📊 PROGRESO TOTAL

**Bloque 1:** ✅ Completado (8 ejercicios)  
**Bloque 2:** ✅ Completado (6 ejercicios)  
**Bloque 3:** ⏳ Pendiente (2 ejercicios)

**Total:** 14/16 ejercicios completados (87.5%)

---

**¡Excelente! Cuando termines este bloque, avisame para continuar con el Bloque 3 (Functional).** 🚀
