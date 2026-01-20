# 🚀 PROYECTO 1: Data Transformer & Analyzer

**Duración:** 4 días máximo  
**Objetivo:** Construir herramienta que procesa datasets complejos (como APIs reales). Aplicar TODOS los métodos de Arrays/Objects en contexto real. Visualizar resultados.

---

## 📋 ÍNDICE

1. [¿Qué vas a construir?](#qué-vas-a-construir)
2. [Features mínimas (MVP)](#features-mínimas-mvp)
3. [Patterns que vas a aplicar](#patterns-que-vas-a-aplicar)
4. [Estructura del proyecto](#estructura-del-proyecto)
5. [Dataset de ejemplo](#dataset-de-ejemplo)
6. [Cronograma día por día](#cronograma-día-por-día)
7. [HTML/CSS base](#htmlcss-base)
8. [Estructura JavaScript](#estructura-javascript)
9. [Hints generales](#hints-generales)
10. [Checklist final](#checklist-final)

---

## 🎯 ¿QUÉ VAS A CONSTRUIR?

Una **herramienta de análisis de datos** que procesa un dataset de productos de e-commerce (similar a lo que harías con datos de una API real).

**Funcionalidades principales:**
- Cargar dataset JSON de productos
- Filtros interactivos (categoría, precio, rating, stock)
- Transformaciones de datos (extraer info, calcular totales)
- Estadísticas (promedio, max, min, count, groupBy)
- Búsquedas (find por ID, verificaciones)
- Ordenamiento (precio, rating, nombre)
- Visualización (tabla de resultados + cards de estadísticas)

**Visualización ASCII del resultado:**

```
┌─────────────────────────────────────────────────────────────┐
│              DATA TRANSFORMER & ANALYZER                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  FILTROS:                                                   │
│  [Categoría ▼] [Precio mín] [Precio máx] [Rating ▼] [Stock]│
│                                                             │
│  ESTADÍSTICAS:                                              │
│  ┌────────────┬────────────┬────────────┬────────────┐     │
│  │   Total    │  Promedio  │    Max     │    Min     │     │
│  │    150     │   $245.50  │  $1200.00  │   $15.00   │     │
│  └────────────┴────────────┴────────────┴────────────┘     │
│                                                             │
│  PRODUCTOS POR CATEGORÍA:                                   │
│  - Electrónica: 45                                          │
│  - Ropa: 35                                                 │
│  - Hogar: 30                                                │
│  - Libros: 40                                               │
│                                                             │
│  ORDENAR POR: [Precio ▼]                                    │
│                                                             │
│  RESULTADOS (25 productos):                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ID │ Nombre        │ Categoría    │ Precio │ Rating  │  │
│  ├────┼───────────────┼──────────────┼────────┼─────────┤  │
│  │ 1  │ Laptop Dell   │ Electrónica  │ $1200  │ ⭐⭐⭐⭐⭐│  │
│  │ 2  │ Mouse Logitech│ Electrónica  │ $25    │ ⭐⭐⭐⭐ │  │
│  │ 3  │ Camiseta Nike │ Ropa         │ $45    │ ⭐⭐⭐⭐ │  │
│  └────┴───────────────┴──────────────┴────────┴─────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ FEATURES MÍNIMAS (MVP)

**MUST HAVE (hacer primero):**

1. **Cargar dataset**
   - [x] Cargar productos desde JSON
   - [x] Mostrar total de productos cargados

2. **Filtros básicos**
   - [x] Filtrar por categoría
   - [x] Filtrar por rango de precio (min-max)
   - [x] Filtrar por rating mínimo
   - [x] Filtrar por disponibilidad en stock

3. **Transformaciones**
   - [x] Extraer solo nombres de productos
   - [x] Calcular precio total de inventario
   - [x] Obtener lista de categorías únicas

4. **Estadísticas**
   - [x] Promedio de precios
   - [x] Precio máximo y mínimo
   - [x] Conteo total de productos
   - [x] Productos por categoría (groupBy)

5. **Búsquedas**
   - [x] Buscar producto por ID
   - [x] Verificar si existe producto con stock > X
   - [x] Verificar si todos los productos tienen rating

6. **Ordenamiento**
   - [x] Ordenar por precio (asc/desc)
   - [x] Ordenar por rating (asc/desc)
   - [x] Ordenar por nombre (alfabético)

7. **Visualización**
   - [x] Tabla con productos filtrados
   - [x] Cards de estadísticas
   - [x] Contador de resultados

**NICE TO HAVE (si sobra tiempo):**

- [ ] Búsqueda por texto (nombre del producto)
- [ ] Filtros múltiples combinados (AND)
- [ ] Exportar resultados a JSON
- [ ] Gráfico de productos por categoría
- [ ] Destacar productos con descuento
- [ ] Comparar 2 productos

**IMPORTANTE:** Completá SOLO el MVP primero. No agregues nice-to-have hasta terminar el MVP.

---

## 🎯 PATTERNS QUE VAS A APLICAR

### PATTERN 1: Pure Functions

**Qué es:**
Funciones que:
- Mismo input → siempre mismo output
- No modifican estado externo
- No dependen de variables externas

**Por qué:**
- Fácil de testear
- Predecible
- Reutilizable

**Dónde lo ves en el proyecto:**
```javascript
// Todas las funciones de transformación son puras
function calcularPromedio(productos) {
    // Solo usa el parámetro, retorna valor
    // No modifica 'productos'
    const suma = productos.reduce((acc, p) => acc + p.precio, 0);
    return suma / productos.length;
}
```

**Analogía:**
Como una calculadora: 2+2 siempre es 4, no importa cuándo la uses.

---

### PATTERN 2: Immutability

**Qué es:**
- No modificar datos existentes
- Crear nuevas copias con cambios

**Por qué:**
- Evita bugs de mutaciones accidentales
- Historial de estados
- React lo requiere

**Dónde lo ves en el proyecto:**
```javascript
// Filtrar sin mutar original
function filtrarPorCategoria(productos, categoria) {
    return productos.filter(p => p.categoria === categoria);
    // productos original queda intacto
}
```

---

### PATTERN 3: Function Composition

**Qué es:**
Combinar funciones pequeñas para crear funcionalidad compleja

**Por qué:**
- Código modular
- Reutilizable
- Fácil de entender

**Dónde lo ves en el proyecto:**
```javascript
// Componer: filtrar → transformar → reducir
const resultado = productos
    .filter(filtrarPorCategoria)
    .map(extraerPropiedades)
    .reduce(calcularTotal, 0);
```

---

### PATTERN 4: Data Pipeline

**Qué es:**
Flujo de transformaciones de datos: Input → Transform → Output

**Por qué:**
- Flujo claro de datos
- Fácil de seguir
- Cada paso hace una cosa

**Dónde lo ves en el proyecto:**
```
Dataset original
    ↓
Filtrar por categoría
    ↓
Filtrar por precio
    ↓
Ordenar por rating
    ↓
Calcular estadísticas
    ↓
Renderizar UI
```

---

## 📁 ESTRUCTURA DEL PROYECTO

```
proyecto1-data-transformer/
│
├── index.html              # Estructura HTML
├── styles.css              # Estilos (provisto)
├── data.json               # Dataset de productos
├── app.js                  # Lógica principal (TU CÓDIGO)
└── README.md               # Documentación del proyecto
```

---

## 📊 DATASET DE EJEMPLO

**Archivo: `data.json`**

Este dataset simula productos de una API de e-commerce. Tiene 50 productos con:
- id, nombre, descripción
- categoría, subcategoría
- precio, precioOriginal (para descuentos)
- rating (1-5 estrellas)
- stock, disponible
- marca, imagen

```json
[
  {
    "id": 1,
    "nombre": "Laptop Dell Inspiron 15",
    "descripcion": "Laptop potente para trabajo y gaming",
    "categoria": "Electrónica",
    "subcategoria": "Computadoras",
    "precio": 1200,
    "precioOriginal": 1500,
    "rating": 4.5,
    "stock": 15,
    "disponible": true,
    "marca": "Dell",
    "imagen": "laptop-dell.jpg"
  },
  {
    "id": 2,
    "nombre": "Mouse Logitech MX Master 3",
    "descripcion": "Mouse ergonómico inalámbrico",
    "categoria": "Electrónica",
    "subcategoria": "Accesorios",
    "precio": 85,
    "precioOriginal": 100,
    "rating": 5,
    "stock": 50,
    "disponible": true,
    "marca": "Logitech",
    "imagen": "mouse-logitech.jpg"
  },
  {
    "id": 3,
    "nombre": "Teclado Mecánico Corsair K95",
    "descripcion": "Teclado RGB para gaming",
    "categoria": "Electrónica",
    "subcategoria": "Accesorios",
    "precio": 180,
    "precioOriginal": 220,
    "rating": 4.8,
    "stock": 25,
    "disponible": true,
    "marca": "Corsair",
    "imagen": "teclado-corsair.jpg"
  },
  {
    "id": 4,
    "nombre": "Monitor Samsung 27\" 4K",
    "descripcion": "Monitor ultra HD para profesionales",
    "categoria": "Electrónica",
    "subcategoria": "Monitores",
    "precio": 450,
    "precioOriginal": 550,
    "rating": 4.6,
    "stock": 10,
    "disponible": true,
    "marca": "Samsung",
    "imagen": "monitor-samsung.jpg"
  },
  {
    "id": 5,
    "nombre": "Auriculares Sony WH-1000XM4",
    "descripcion": "Auriculares con cancelación de ruido",
    "categoria": "Electrónica",
    "subcategoria": "Audio",
    "precio": 350,
    "precioOriginal": 400,
    "rating": 4.9,
    "stock": 0,
    "disponible": false,
    "marca": "Sony",
    "imagen": "auriculares-sony.jpg"
  },
  {
    "id": 6,
    "nombre": "Camiseta Nike Dri-FIT",
    "descripcion": "Camiseta deportiva transpirable",
    "categoria": "Ropa",
    "subcategoria": "Deportiva",
    "precio": 35,
    "precioOriginal": 45,
    "rating": 4.3,
    "stock": 100,
    "disponible": true,
    "marca": "Nike",
    "imagen": "camiseta-nike.jpg"
  },
  {
    "id": 7,
    "nombre": "Zapatillas Adidas Ultraboost",
    "descripcion": "Zapatillas de running premium",
    "categoria": "Ropa",
    "subcategoria": "Calzado",
    "precio": 180,
    "precioOriginal": 220,
    "rating": 4.7,
    "stock": 30,
    "disponible": true,
    "marca": "Adidas",
    "imagen": "zapatillas-adidas.jpg"
  },
  {
    "id": 8,
    "nombre": "Pantalón Levi's 501",
    "descripcion": "Jeans clásicos de mezclilla",
    "categoria": "Ropa",
    "subcategoria": "Pantalones",
    "precio": 75,
    "precioOriginal": 90,
    "rating": 4.5,
    "stock": 60,
    "disponible": true,
    "marca": "Levi's",
    "imagen": "pantalon-levis.jpg"
  },
  {
    "id": 9,
    "nombre": "Cafetera Nespresso Vertuo",
    "descripcion": "Cafetera de cápsulas automática",
    "categoria": "Hogar",
    "subcategoria": "Cocina",
    "precio": 200,
    "precioOriginal": 250,
    "rating": 4.4,
    "stock": 20,
    "disponible": true,
    "marca": "Nespresso",
    "imagen": "cafetera-nespresso.jpg"
  },
  {
    "id": 10,
    "nombre": "Aspiradora Dyson V11",
    "descripcion": "Aspiradora inalámbrica potente",
    "categoria": "Hogar",
    "subcategoria": "Limpieza",
    "precio": 600,
    "precioOriginal": 700,
    "rating": 4.8,
    "stock": 8,
    "disponible": true,
    "marca": "Dyson",
    "imagen": "aspiradora-dyson.jpg"
  }
]
```

**Nota:** Este es un subset de 10 productos. El dataset completo tiene 50 productos variados.

**Te voy a proveer el dataset completo en un archivo separado.**

---

## 📅 CRONOGRAMA DÍA POR DÍA

### DÍA 1: Setup + Filtros Básicos

**Objetivo:** Cargar dataset, implementar filtros básicos

**Tareas:**

1. **Setup del proyecto**
   - [ ] Crear estructura de archivos
   - [ ] Copiar HTML/CSS base
   - [ ] Crear data.json con dataset
   - [ ] Verificar que todo carga correctamente

2. **Cargar dataset**
   - [ ] Fetch de data.json
   - [ ] Guardar productos en variable global
   - [ ] Mostrar total de productos cargados
   - [ ] Renderizar productos en tabla (todos)

3. **Filtro por categoría**
   - [ ] Crear función `filtrarPorCategoria(productos, categoria)`
   - [ ] Obtener categorías únicas del dataset
   - [ ] Crear select con opciones dinámicas
   - [ ] Al cambiar select → filtrar y renderizar

4. **Filtro por rango de precio**
   - [ ] Crear función `filtrarPorPrecio(productos, min, max)`
   - [ ] Inputs para precio mínimo y máximo
   - [ ] Al cambiar inputs → filtrar y renderizar

**Checkpoint día 1:**
- [ ] Dataset carga correctamente
- [ ] Tabla muestra productos
- [ ] Filtro por categoría funciona
- [ ] Filtro por precio funciona
- [ ] Pueden combinarse ambos filtros

---

### DÍA 2: Transformaciones + Estadísticas

**Objetivo:** Implementar transformaciones de datos y cálculo de estadísticas

**Tareas:**

1. **Transformaciones básicas**
   - [ ] Función para extraer solo nombres: `obtenerNombres(productos)`
   - [ ] Función para calcular total inventario: `calcularTotalInventario(productos)`
   - [ ] Función para obtener categorías únicas: `obtenerCategoriasUnicas(productos)`

2. **Estadísticas**
   - [ ] Función `calcularPromedio(productos)`
   - [ ] Función `obtenerMaxMin(productos)` → retorna { max, min }
   - [ ] Función `contarPorCategoria(productos)` → groupBy

3. **Renderizar estadísticas**
   - [ ] Cards con: Total, Promedio, Max, Min
   - [ ] Lista de productos por categoría
   - [ ] Actualizar stats cuando se filtran productos

**Checkpoint día 2:**
- [ ] Estadísticas se calculan correctamente
- [ ] Stats se muestran en la UI
- [ ] Stats se actualizan al filtrar
- [ ] Todo usa pure functions (no mutaciones)

---

### DÍA 3: Búsquedas + Ordenamiento

**Objetivo:** Implementar búsquedas y ordenamiento

**Tareas:**

1. **Búsquedas**
   - [ ] Función `buscarPorId(productos, id)` → find
   - [ ] Input para buscar por ID
   - [ ] Mostrar producto encontrado
   - [ ] Función `verificarStock(productos, minStock)` → some
   - [ ] Función `todosConRating(productos)` → every

2. **Ordenamiento**
   - [ ] Función `ordenarPorPrecio(productos, orden)` → asc/desc
   - [ ] Función `ordenarPorRating(productos, orden)`
   - [ ] Función `ordenarPorNombre(productos)`
   - [ ] Select para elegir criterio de ordenamiento
   - [ ] Toggle para ascendente/descendente

3. **Integración**
   - [ ] Aplicar ordenamiento a productos filtrados
   - [ ] Mantener ordenamiento al cambiar filtros

**Checkpoint día 3:**
- [ ] Búsqueda por ID funciona
- [ ] Verificaciones (some/every) funcionan
- [ ] Ordenamiento funciona correctamente
- [ ] Ordenamiento + filtros funcionan juntos

---

### DÍA 4: Visualización + Pulido

**Objetivo:** Mejorar UI, pulir código, testing

**Tareas:**

1. **Mejorar visualización**
   - [ ] Mejorar diseño de la tabla
   - [ ] Agregar rating visual (estrellas)
   - [ ] Indicador de stock (disponible/agotado)
   - [ ] Indicador de descuento (si precioOriginal > precio)

2. **Contador de resultados**
   - [ ] Mostrar "Mostrando X de Y productos"
   - [ ] Actualizar al filtrar/ordenar

3. **Pulido de código**
   - [ ] Revisar que todas las funciones son puras
   - [ ] Verificar inmutabilidad (no mutaciones)
   - [ ] Agregar comentarios donde sea necesario
   - [ ] Refactorizar código repetitivo

4. **Testing manual**
   - [ ] Probar todas las combinaciones de filtros
   - [ ] Verificar que stats son correctas
   - [ ] Probar ordenamiento
   - [ ] Verificar que no hay mutaciones (original intacto)

**Checkpoint día 4:**
- [ ] UI se ve profesional
- [ ] Todo funciona sin errores
- [ ] Código limpio y comentado
- [ ] Proyecto listo para mostrar

---

## 🎨 HTML/CSS BASE

**Archivo: `index.html`**

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Transformer & Analyzer</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <!-- HEADER -->
        <header>
            <h1>📊 Data Transformer & Analyzer</h1>
            <p>Herramienta de análisis de productos</p>
        </header>

        <!-- FILTROS -->
        <section class="filtros">
            <h2>Filtros</h2>
            <div class="filtros-grid">
                <div class="filtro">
                    <label for="categoriaFiltro">Categoría:</label>
                    <select id="categoriaFiltro">
                        <option value="todas">Todas</option>
                        <!-- Opciones dinámicas -->
                    </select>
                </div>

                <div class="filtro">
                    <label for="precioMin">Precio mín:</label>
                    <input type="number" id="precioMin" placeholder="$0" min="0">
                </div>

                <div class="filtro">
                    <label for="precioMax">Precio máx:</label>
                    <input type="number" id="precioMax" placeholder="$9999" min="0">
                </div>

                <div class="filtro">
                    <label for="ratingMin">Rating mínimo:</label>
                    <select id="ratingMin">
                        <option value="0">Todos</option>
                        <option value="3">3+ ⭐</option>
                        <option value="4">4+ ⭐</option>
                        <option value="4.5">4.5+ ⭐</option>
                    </select>
                </div>

                <div class="filtro">
                    <label for="stockDisponible">Solo con stock:</label>
                    <input type="checkbox" id="stockDisponible">
                </div>

                <div class="filtro">
                    <button id="limpiarFiltros">Limpiar Filtros</button>
                </div>
            </div>
        </section>

        <!-- ESTADÍSTICAS -->
        <section class="estadisticas">
            <h2>Estadísticas</h2>
            <div class="stats-grid">
                <div class="stat-card">
                    <h3>Total Productos</h3>
                    <p id="statTotal">0</p>
                </div>
                <div class="stat-card">
                    <h3>Precio Promedio</h3>
                    <p id="statPromedio">$0</p>
                </div>
                <div class="stat-card">
                    <h3>Precio Máximo</h3>
                    <p id="statMax">$0</p>
                </div>
                <div class="stat-card">
                    <h3>Precio Mínimo</h3>
                    <p id="statMin">$0</p>
                </div>
            </div>

            <div class="categorias-stats">
                <h3>Productos por Categoría</h3>
                <div id="categoriasList"></div>
            </div>
        </section>

        <!-- BÚSQUEDA -->
        <section class="busqueda">
            <h2>Búsqueda</h2>
            <div class="busqueda-grid">
                <div>
                    <label for="buscarId">Buscar por ID:</label>
                    <input type="number" id="buscarId" placeholder="Ej: 5">
                    <button id="btnBuscar">Buscar</button>
                </div>
                <div id="resultadoBusqueda"></div>
            </div>
        </section>

        <!-- ORDENAMIENTO -->
        <section class="ordenamiento">
            <h2>Ordenamiento</h2>
            <div class="orden-grid">
                <div>
                    <label for="ordenarPor">Ordenar por:</label>
                    <select id="ordenarPor">
                        <option value="ninguno">Sin ordenar</option>
                        <option value="precio">Precio</option>
                        <option value="rating">Rating</option>
                        <option value="nombre">Nombre</option>
                    </select>
                </div>

                <div>
                    <label for="ordenDireccion">Dirección:</label>
                    <select id="ordenDireccion">
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
                </div>
            </div>
        </section>

        <!-- RESULTADOS -->
        <section class="resultados">
            <h2>Resultados</h2>
            <p id="contadorResultados">Mostrando 0 de 0 productos</p>

            <div class="tabla-container">
                <table id="tablaProductos">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Rating</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody id="tbody">
                        <!-- Productos dinámicos -->
                    </tbody>
                </table>
            </div>
        </section>
    </div>

    <script src="app.js"></script>
</body>
</html>
```

---

**Archivo: `styles.css`**

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    background: white;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

header {
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #667eea;
}

header h1 {
    color: #667eea;
    margin-bottom: 10px;
}

header p {
    color: #666;
}

section {
    margin-bottom: 30px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
}

h2 {
    color: #333;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 2px solid #667eea;
}

/* FILTROS */
.filtros-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
}

.filtro {
    display: flex;
    flex-direction: column;
}

.filtro label {
    margin-bottom: 5px;
    font-weight: 600;
    color: #555;
}

.filtro input,
.filtro select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

.filtro button {
    padding: 10px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    margin-top: auto;
}

.filtro button:hover {
    background: #5568d3;
}

/* ESTADÍSTICAS */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
}

.stat-card {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.stat-card h3 {
    color: #666;
    font-size: 14px;
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.stat-card p {
    color: #667eea;
    font-size: 24px;
    font-weight: 700;
}

.categorias-stats {
    background: white;
    padding: 15px;
    border-radius: 8px;
}

.categorias-stats h3 {
    margin-bottom: 10px;
    color: #333;
    font-size: 16px;
}

#categoriasList {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.categoria-badge {
    padding: 8px 15px;
    background: #667eea;
    color: white;
    border-radius: 20px;
    font-size: 14px;
}

/* BÚSQUEDA */
.busqueda-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 20px;
}

.busqueda-grid input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 10px;
}

.busqueda-grid button {
    padding: 8px 20px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
}

.busqueda-grid button:hover {
    background: #5568d3;
}

#resultadoBusqueda {
    background: white;
    padding: 15px;
    border-radius: 8px;
    min-height: 60px;
}

/* ORDENAMIENTO */
.orden-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
}

.orden-grid label {
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
    color: #555;
}

.orden-grid select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

/* RESULTADOS */
#contadorResultados {
    margin-bottom: 15px;
    font-weight: 600;
    color: #666;
}

.tabla-container {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 8px;
    overflow: hidden;
}

thead {
    background: #667eea;
    color: white;
}

th, td {
    padding: 12px;
    text-align: left;
}

tbody tr:nth-child(even) {
    background: #f8f9fa;
}

tbody tr:hover {
    background: #e9ecef;
}

.rating {
    color: #ffc107;
}

.stock-disponible {
    color: #28a745;
    font-weight: 600;
}

.stock-agotado {
    color: #dc3545;
    font-weight: 600;
}

.descuento {
    background: #28a745;
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    margin-left: 5px;
}
```

---

## 💻 ESTRUCTURA JAVASCRIPT

**Archivo: `app.js`**

```javascript
// ============================================
// DATA TRANSFORMER & ANALYZER
// ============================================

// ============================================
// ESTADO GLOBAL
// ============================================

let productosOriginales = [];  // Dataset completo (nunca mutar)
let productosFiltrados = [];   // Productos después de filtros

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', inicializarApp);

async function inicializarApp() {
    try {
        // TODO: Cargar dataset desde data.json
        await cargarDatos();
        
        // TODO: Inicializar filtros
        inicializarFiltros();
        
        // TODO: Renderizar productos iniciales
        renderizarProductos(productosOriginales);
        
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
    
    // Pista: usar Set para categorías únicas
    // const categorias = obtenerCategoriasUnicas(productosOriginales);
}

function obtenerCategoriasUnicas(productos) {
    // TODO: Retornar array de categorías únicas
    // Pista: usar Set o reduce
    
    // return [...new Set(productos.map(p => p.categoria))];
}

function filtrarPorCategoria(productos, categoria) {
    // TODO: Si categoria === 'todas', retornar todos
    // TODO: Si no, filtrar por categoría
    
    // IMPORTANTE: NO MUTAR el array original
    // RETORNAR nuevo array filtrado
}

function filtrarPorPrecio(productos, min, max) {
    // TODO: Filtrar productos entre min y max
    // Si min o max están vacíos, no aplicar ese límite
    
    // IMPORTANTE: NO MUTAR el array original
}

function filtrarPorRating(productos, ratingMin) {
    // TODO: Filtrar productos con rating >= ratingMin
    
    // IMPORTANTE: NO MUTAR el array original
}

function filtrarPorStock(productos, soloConStock) {
    // TODO: Si soloConStock es true, filtrar solo disponibles
    // Si no, retornar todos
    
    // IMPORTANTE: NO MUTAR el array original
}

function aplicarTodosFiltros() {
    // TODO: Obtener valores de todos los filtros
    // TODO: Aplicar filtros en cascada (uno después de otro)
    // TODO: Actualizar productosFiltrados
    // TODO: Renderizar productos filtrados
    // TODO: Actualizar estadísticas
    
    // Pipeline:
    // let resultado = productosOriginales;
    // resultado = filtrarPorCategoria(resultado, categoria);
    // resultado = filtrarPorPrecio(resultado, min, max);
    // resultado = filtrarPorRating(resultado, rating);
    // resultado = filtrarPorStock(resultado, soloStock);
    // productosFiltrados = resultado;
}

// ============================================
// TRANSFORMACIONES
// ============================================

function obtenerNombres(productos) {
    // TODO: Extraer solo nombres de productos
    // Retornar array de strings
    
    // return productos.map(p => p.nombre);
}

function calcularTotalInventario(productos) {
    // TODO: Calcular suma de (precio * stock) de todos los productos
    
    // Pista: usar reduce
}

// ============================================
// ESTADÍSTICAS
// ============================================

function calcularPromedio(productos) {
    // TODO: Calcular promedio de precios
    // Si no hay productos, retornar 0
    
    // if (productos.length === 0) return 0;
    // const suma = productos.reduce((acc, p) => acc + p.precio, 0);
    // return suma / productos.length;
}

function obtenerMaxMin(productos) {
    // TODO: Retornar { max, min } de precios
    // Si no hay productos, retornar { max: 0, min: 0 }
    
    // Pista: usar Math.max() y Math.min() con spread
    // const precios = productos.map(p => p.precio);
    // return { max: Math.max(...precios), min: Math.min(...precios) };
}

function contarPorCategoria(productos) {
    // TODO: Retornar objeto con conteo por categoría
    // Ejemplo: { Electrónica: 25, Ropa: 15, ... }
    
    // Pista: usar reduce
    // return productos.reduce((acc, p) => {
    //     acc[p.categoria] = (acc[p.categoria] || 0) + 1;
    //     return acc;
    // }, {});
}

function actualizarEstadisticas(productos) {
    // TODO: Calcular todas las estadísticas
    // TODO: Actualizar elementos del DOM
    
    // const total = productos.length;
    // const promedio = calcularPromedio(productos);
    // const { max, min } = obtenerMaxMin(productos);
    // const porCategoria = contarPorCategoria(productos);
    
    // document.getElementById('statTotal').textContent = total;
    // document.getElementById('statPromedio').textContent = `$${promedio.toFixed(2)}`;
    // ...
}

// ============================================
// BÚSQUEDAS
// ============================================

function buscarPorId(productos, id) {
    // TODO: Usar find() para buscar producto por id
    
    // return productos.find(p => p.id === id);
}

function verificarStock(productos, minStock) {
    // TODO: Verificar si HAY AL MENOS UN producto con stock >= minStock
    // Pista: usar some()
    
    // return productos.some(p => p.stock >= minStock);
}

function todosConRating(productos) {
    // TODO: Verificar si TODOS los productos tienen rating
    // Pista: usar every()
    
    // return productos.every(p => p.rating > 0);
}

// ============================================
// ORDENAMIENTO
// ============================================

function ordenarPorPrecio(productos, orden = 'asc') {
    // TODO: Ordenar por precio
    // orden: 'asc' (ascendente) o 'desc' (descendente)
    
    // IMPORTANTE: NO MUTAR el array original
    // Clonar primero, luego ordenar
    
    // const copia = [...productos];
    // return copia.sort((a, b) => {
    //     return orden === 'asc' ? a.precio - b.precio : b.precio - a.precio;
    // });
}

function ordenarPorRating(productos, orden = 'desc') {
    // TODO: Ordenar por rating
    
    // IMPORTANTE: NO MUTAR el array original
}

function ordenarPorNombre(productos) {
    // TODO: Ordenar alfabéticamente por nombre
    
    // IMPORTANTE: NO MUTAR el array original
    
    // const copia = [...productos];
    // return copia.sort((a, b) => a.nombre.localeCompare(b.nombre));
}

function aplicarOrdenamiento() {
    // TODO: Obtener criterio y dirección de ordenamiento
    // TODO: Aplicar ordenamiento a productosFiltrados
    // TODO: Renderizar productos ordenados
    
    // const criterio = document.getElementById('ordenarPor').value;
    // const direccion = document.getElementById('ordenDireccion').value;
    
    // let ordenados = productosFiltrados;
    // if (criterio === 'precio') {
    //     ordenados = ordenarPorPrecio(productosFiltrados, direccion);
    // } else if ...
}

// ============================================
// RENDERIZADO
// ============================================

function renderizarProductos(productos) {
    // TODO: Limpiar tbody
    // TODO: Por cada producto, crear fila <tr> con datos
    // TODO: Insertar en tbody
    
    // const tbody = document.getElementById('tbody');
    // tbody.innerHTML = '';
    
    // productos.forEach(producto => {
    //     const tr = document.createElement('tr');
    //     tr.innerHTML = `
    //         <td>${producto.id}</td>
    //         <td>${producto.nombre}</td>
    //         <td>${producto.categoria}</td>
    //         <td>$${producto.precio}</td>
    //         <td>${renderizarRating(producto.rating)}</td>
    //         <td>${renderizarStock(producto)}</td>
    //     `;
    //     tbody.appendChild(tr);
    // });
    
    // actualizarContadorResultados(productos.length);
}

function renderizarRating(rating) {
    // TODO: Convertir rating numérico a estrellas
    // Ejemplo: 4.5 → ⭐⭐⭐⭐½
    
    // const estrellas = '⭐'.repeat(Math.floor(rating));
    // return `<span class="rating">${estrellas}</span>`;
}

function renderizarStock(producto) {
    // TODO: Mostrar "Disponible" o "Agotado" según stock
    
    // if (producto.disponible && producto.stock > 0) {
    //     return `<span class="stock-disponible">Disponible (${producto.stock})</span>`;
    // } else {
    //     return `<span class="stock-agotado">Agotado</span>`;
    // }
}

function actualizarContadorResultados(cantidad) {
    // TODO: Actualizar texto "Mostrando X de Y productos"
    
    // const contador = document.getElementById('contadorResultados');
    // contador.textContent = `Mostrando ${cantidad} de ${productosOriginales.length} productos`;
}

function renderizarCategoriasStats(conteo) {
    // TODO: Renderizar badges de categorías con conteo
    
    // const container = document.getElementById('categoriasList');
    // container.innerHTML = '';
    
    // Object.entries(conteo).forEach(([categoria, cantidad]) => {
    //     const badge = document.createElement('span');
    //     badge.className = 'categoria-badge';
    //     badge.textContent = `${categoria}: ${cantidad}`;
    //     container.appendChild(badge);
    // });
}

// ============================================
// EVENT LISTENERS
// ============================================

function configurarEventListeners() {
    // TODO: Configurar listeners para todos los filtros
    // TODO: Configurar listener para búsqueda
    // TODO: Configurar listeners para ordenamiento
    
    // document.getElementById('categoriaFiltro').addEventListener('change', aplicarTodosFiltros);
    // document.getElementById('precioMin').addEventListener('input', aplicarTodosFiltros);
    // ...
}

// ============================================
// UTILIDADES
// ============================================

function limpiarFiltros() {
    // TODO: Resetear todos los inputs y selects
    // TODO: Aplicar filtros (mostrar todos)
    
    // document.getElementById('categoriaFiltro').value = 'todas';
    // document.getElementById('precioMin').value = '';
    // ...
    // aplicarTodosFiltros();
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
```

---

## 💡 HINTS GENERALES

### Hint 1: Carga de datos

```javascript
async function cargarDatos() {
    const response = await fetch('data.json');
    const datos = await response.json();
    productosOriginales = datos;
    productosFiltrados = [...datos];  // Copia para trabajar
}
```

---

### Hint 2: Filtros en cascada

```javascript
function aplicarTodosFiltros() {
    let resultado = productosOriginales;
    
    // Aplicar cada filtro en secuencia
    resultado = filtrarPorCategoria(resultado, categoria);
    resultado = filtrarPorPrecio(resultado, min, max);
    resultado = filtrarPorRating(resultado, rating);
    resultado = filtrarPorStock(resultado, soloStock);
    
    // Actualizar estado y UI
    productosFiltrados = resultado;
    renderizarProductos(productosFiltrados);
    actualizarEstadisticas(productosFiltrados);
}
```

---

### Hint 3: Inmutabilidad en ordenamiento

```javascript
function ordenarPorPrecio(productos, orden) {
    // PASO 1: Clonar array (NO mutar original)
    const copia = [...productos];
    
    // PASO 2: Ordenar la copia
    copia.sort((a, b) => {
        return orden === 'asc' ? a.precio - b.precio : b.precio - a.precio;
    });
    
    // PASO 3: Retornar la copia ordenada
    return copia;
}
```

---

### Hint 4: GroupBy con reduce

```javascript
function contarPorCategoria(productos) {
    return productos.reduce((acc, producto) => {
        const cat = producto.categoria;
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
    }, {});
}
```

---

## ✅ CHECKLIST FINAL

### Funcionalidades:

- [ ] **Dataset carga correctamente**
- [ ] **Filtro por categoría funciona**
- [ ] **Filtro por precio (min-max) funciona**
- [ ] **Filtro por rating funciona**
- [ ] **Filtro por stock funciona**
- [ ] **Filtros se pueden combinar**
- [ ] **Estadísticas se calculan correctamente**
- [ ] **Stats se actualizan al filtrar**
- [ ] **Búsqueda por ID funciona**
- [ ] **Ordenamiento por precio funciona**
- [ ] **Ordenamiento por rating funciona**
- [ ] **Ordenamiento por nombre funciona**
- [ ] **Tabla renderiza productos correctamente**
- [ ] **Contador de resultados se actualiza**
- [ ] **Rating se muestra visualmente (estrellas)**
- [ ] **Stock disponible/agotado se distingue**

### Calidad de código:

- [ ] **Todas las funciones son puras** (no side effects)
- [ ] **No hay mutaciones** (original siempre intacto)
- [ ] **Código comentado** donde sea necesario
- [ ] **No hay código repetitivo** (DRY)
- [ ] **Nombres de variables descriptivos**
- [ ] **Funciones pequeñas** (una responsabilidad)

### Testing:

- [ ] **Probé todas las combinaciones de filtros**
- [ ] **Verifiqué que stats son correctas**
- [ ] **Probé ordenamiento en ambas direcciones**
- [ ] **Verifiqué que no hay errores en consola**
- [ ] **Testeé que original NO se muta**

---

## 🎓 LO QUE VAS A APRENDER

Al completar este proyecto vas a haber aplicado:

- ✅ map, filter, reduce en contexto real
- ✅ Chaining de métodos
- ✅ find, some, every para búsquedas
- ✅ Destructuring de objetos
- ✅ Spread operator para inmutabilidad
- ✅ Object.keys/values/entries
- ✅ Pure functions en proyecto completo
- ✅ Inmutabilidad rigurosa
- ✅ Data pipelines (filtros → transformaciones → visualización)
- ✅ Arquitectura modular
- ✅ Manipulación del DOM
- ✅ Event handling

**Nivel alcanzado:** Aplicación profesional de transformaciones de datos

---

## 🚀 DESPUÉS DEL PROYECTO

Una vez que completes el proyecto:

1. **Avisame para revisión**
2. **Te daré feedback específico**
3. **Pasamos a Semana 2** (ES6+ & DOM Mastery)

---

## 📝 NOTAS FINALES

### Governor activo:

- ⏱️ Máximo 4 días (idealmente 3)
- ✅ MVP primero, nice-to-have después
- 🚫 No iterar indefinidamente
- 💪 80% funcional > 100% perfecto sin terminar

### Si te trabás:

1. Revisá los hints en este archivo
2. Ejecutá el código y mirá errores en consola
3. console.log() estratégicos
4. Revisá ejercicios del warmup (mismos conceptos)
5. Preguntame (específico, no "no me funciona nada")

### Celebrá logros:

- ✅ Cada feature que funciona
- ✅ Cada día completado
- ✅ Proyecto terminado (nivel mid-senior!)

---

**¡Éxito con el proyecto! Es hora de aplicar todo lo que aprendiste.** 🚀

**Siguiente archivo:** Dataset completo (data.json) - te lo genero aparte.
