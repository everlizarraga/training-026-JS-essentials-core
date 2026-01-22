/**
**CONSIGNA:**
Usar optional chaining y nullish coalescing para acceso seguro a datos

**TAREAS:**
1. Acceder a datos anidados de forma segura
2. Llamar métodos opcionales
3. Usar ?? para valores por defecto (diferenciar de ||)
4. Procesar respuesta de API con datos opcionales
 */

// ============================================
// EJERCICIO 5: Optional Chaining + Nullish
// ============================================

// DATOS DE PRUEBA
const usuarios = [
  {
    id: 1,
    nombre: 'Ana',
    contacto: {
      email: 'ana@email.com',
      telefono: {
        codigo: '+54',
        numero: '11-1234-5678'
      }
    },
    config: {
      notificaciones: true,
      tema: 'oscuro'
    }
  },
  {
    id: 2,
    nombre: 'Carlos',
    contacto: {
      email: 'carlos@email.com'
      // NO tiene 'telefono'
    }
    // NO tiene 'config'
  },
  {
    id: 3,
    nombre: 'Lucía'
    // NO tiene 'contacto'
  }
];

// TAREA 1: Obtener número de teléfono completo
function obtenerTelefono(usuario) {
  // TU CÓDIGO AQUÍ
  // Retornar codigo + numero (ej: "+54 11-1234-5678")
  // Si no existe → 'Sin teléfono'
  const codigo = usuario.contacto?.telefono?.codigo;
  const numero = usuario.contacto?.telefono?.numero;
  return (codigo && numero)? `${codigo} ${numero}` : 'Sin teléfono';
}

console.log(obtenerTelefono(usuarios[0]));  // "+54 11-1234-5678"
console.log(obtenerTelefono(usuarios[1]));  // "Sin teléfono"
console.log(obtenerTelefono(usuarios[2]));  // "Sin teléfono"

// TAREA 2: Obtener configuración con defaults
function obtenerConfig(usuario) {
  // TU CÓDIGO AQUÍ
  // Retornar { notificaciones, tema }
  // Defaults: notificaciones = true, tema = 'claro'
  // IMPORTANTE: Usar ?? (no ||) porque false es válido
  const notificaciones = usuario.config?.notificaciones ?? true;
  const tema = usuario.config?.tema ?? 'claro';
  return {notificaciones, tema}
}

console.log(obtenerConfig(usuarios[0]));
// { notificaciones: true, tema: 'oscuro' }

console.log(obtenerConfig(usuarios[1]));
// { notificaciones: true, tema: 'claro' }

// TAREA 3: Llamar método opcional
const productos = [
  {
    id: 1,
    nombre: 'Laptop',
    calcularDescuento() {
      return this.precio * 0.1;
    },
    precio: 1000
  },
  {
    id: 2,
    nombre: 'Mouse',
    precio: 25
    // NO tiene 'calcularDescuento'
  }
];

function obtenerDescuento(producto) {
  // TU CÓDIGO AQUÍ
  // Llamar calcularDescuento si existe
  // Si no existe → retornar 0
  return producto.calcularDescuento?.() ?? 0;
}

console.log(obtenerDescuento(productos[0]));  // 100
console.log(obtenerDescuento(productos[1]));  // 0

// TAREA 4: Procesar respuesta de API
const apiResponses = [
  {
    status: 'success',
    data: {
      usuario: {
        nombre: 'Ana',
        posts: [
          { id: 1, titulo: 'Post 1', likes: 10 },
          { id: 2, titulo: 'Post 2', likes: 5 }
        ]
      }
    }
  },
  {
    status: 'success',
    data: {
      usuario: {
        nombre: 'Carlos'
        // NO tiene 'posts'
      }
    }
  },
  {
    status: 'error',
    data: null
  }
];

function procesarRespuesta(response) {
  // TU CÓDIGO AQUÍ
  // Retornar objeto con:
  // - nombre (default: 'Anónimo')
  // - cantidadPosts (default: 0)
  // - totalLikes (default: 0)
  return {
    nombre: response.data?.usuario?.nombre ?? 'Anónimo',
    cantidadPosts: response.data?.usuario?.posts?.length ?? 0,
    totalLikes: response.data?.usuario?.posts?.reduce((acc,p)=>acc+p.likes,0) ?? 0
  };
}

console.log(procesarRespuesta(apiResponses[0]));
// { nombre: 'Ana', cantidadPosts: 2, totalLikes: 15 }

console.log(procesarRespuesta(apiResponses[1]));
// { nombre: 'Carlos', cantidadPosts: 0, totalLikes: 0 }

console.log(procesarRespuesta(apiResponses[2]));
// { nombre: 'Anónimo', cantidadPosts: 0, totalLikes: 0 }

