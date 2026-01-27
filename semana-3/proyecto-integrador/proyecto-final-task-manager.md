# 🎯 PROYECTO FINAL: Task Management System

**Duración:** 5 días máximo  
**Nivel:** Integrador completo (Semana 1 + 2 + 3)  
**Objetivo:** Construir app profesional de gestión de tareas con arquitectura escalable

---

## ⏰ GOVERNOR ACTIVO

**Límites estrictos:**
- 📅 **Duración total:** 5 días máximo
- ✅ **MVP (must-have):** Completar obligatoriamente
- 🎁 **Nice-to-have:** Solo si sobra tiempo
- 🚫 **Máximo 2 iteraciones:** Funcional → Pulir → STOP
- ⏱️ **Si llegás al día 5:** Subir lo que tengas y AVANZAR

**Regla del 80/20:**
- Primera versión: 80% funcional = Suficiente
- Segunda iteración: Pulir a 90% = Excelente
- NO buscar 100% perfecto → Usar en práctica real es mejor

**Frases del Governor:**
```
"Funciona? → NEXT feature."
"MVP completo al día 4? → Día 5 es pulido, NO features nuevas"
"80% funcional + deployed > 100% perfecto sin usar"
```

---

## 📋 ÍNDICE

1. [Overview del Proyecto](#overview)
2. [Arquitectura](#arquitectura)
3. [Cronograma Día por Día](#cronograma)
4. [Estructura de Archivos](#estructura)
5. [Código Base](#codigo-base)
6. [Features MVP](#features-mvp)
7. [Features Nice-to-Have](#nice-to-have)
8. [Patterns Aplicados](#patterns)
9. [Testing & Debugging](#testing)
10. [Deployment](#deployment)

---

## 🎯 OVERVIEW DEL PROYECTO {#overview}

### ¿Qué vas a construir?

Una **aplicación completa de gestión de tareas** (estilo Todoist/Things) con:
- ✅ CRUD completo de tareas
- ✅ Filtros y búsqueda
- ✅ Categorías y prioridades
- ✅ Persistencia con localStorage
- ✅ Estadísticas en tiempo real
- ✅ UI responsiva y moderna
- ✅ Arquitectura profesional escalable

### ¿Qué vas a aprender?

**Semana 1 aplicada (Arrays/Objects):**
- Filtrar tareas (completed, active, by category)
- Buscar en arrays de objetos
- Transformar datos (map, reduce)
- Agrupar por categoría (reduce)
- Calcular estadísticas (count, percentage)

**Semana 2 aplicada (ES6+/DOM):**
- Components pattern (TaskCard, TaskList, TaskForm)
- Event delegation en listas dinámicas
- Template literals para HTML
- Módulos (import/export)
- Lazy rendering de tareas

**Semana 3 aplicada (Classes/Patterns):**
- Class TaskManager (gestión de estado)
- Class Task (modelo de datos)
- Repository Pattern (TaskRepository)
- Observer Pattern (notificar cambios)
- Singleton (config, storage)

### Diagrama de la App

```
┌─────────────────────────────────────────────────┐
│  TASK MANAGER APP                               │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────────────────┐  ┌────────────────────┐   │
│  │ ESTADÍSTICAS    │  │  FILTROS & SEARCH  │   │
│  │ Total: 15       │  │  [All][Active][✓]  │   │
│  │ Completadas: 8  │  │  🔍 Search...      │   │
│  │ Pendientes: 7   │  │  Sort: [Priority▼] │   │
│  └─────────────────┘  └────────────────────┘   │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │ ➕ Nueva Tarea                          │   │
│  │ [Título] [Descripción] [Categoría] [+]  │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │ LISTA DE TAREAS                         │   │
│  │                                         │   │
│  │ ☐ Comprar leche          [Work] [High] │   │
│  │ ☑ Estudiar JavaScript    [Study][Mid]  │   │
│  │ ☐ Llamar al doctor       [Personal]    │   │
│  │ ...                                     │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🏗️ ARQUITECTURA {#arquitectura}

### Patrón Arquitectónico: MVC Simplificado

```
┌─────────────────────────────────────────────────┐
│                    MODEL                        │
│  ┌──────────────┐  ┌────────────────────────┐  │
│  │ Task         │  │ TaskManager            │  │
│  │ - id         │  │ - tasks[]              │  │
│  │ - title      │  │ - add()                │  │
│  │ - completed  │  │ - remove()             │  │
│  │ - priority   │  │ - toggle()             │  │
│  │ - category   │  │ - filter()             │  │
│  └──────────────┘  │ - search()             │  │
│                    │ - getStats()           │  │
│                    └────────────────────────┘  │
└─────────────────────────────────────────────────┘
                      ↕ (Observer Pattern)
┌─────────────────────────────────────────────────┐
│                    VIEW                         │
│  ┌──────────────┐  ┌────────────────────────┐  │
│  │ TaskCard     │  │ TaskList               │  │
│  │ - render()   │  │ - renderAll()          │  │
│  │ - update()   │  │ - clear()              │  │
│  └──────────────┘  │ - filter()             │  │
│                    └────────────────────────┘  │
│  ┌──────────────┐  ┌────────────────────────┐  │
│  │ TaskForm     │  │ StatsPanel             │  │
│  │ - submit()   │  │ - update()             │  │
│  └──────────────┘  └────────────────────────┘  │
└─────────────────────────────────────────────────┘
                      ↕ (Events)
┌─────────────────────────────────────────────────┐
│                 CONTROLLER                      │
│  ┌─────────────────────────────────────────┐   │
│  │ App                                     │   │
│  │ - init()                                │   │
│  │ - setupEventListeners()                 │   │
│  │ - handleTaskCreate()                    │   │
│  │ - handleTaskToggle()                    │   │
│  │ - handleTaskDelete()                    │   │
│  │ - handleFilterChange()                  │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
                      ↕
┌─────────────────────────────────────────────────┐
│              STORAGE (localStorage)             │
│  ┌─────────────────────────────────────────┐   │
│  │ TaskRepository                          │   │
│  │ - save(tasks)                           │   │
│  │ - load()                                │   │
│  │ - clear()                               │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

### Flujo de Datos

```
Usuario crea tarea
       ↓
TaskForm captura datos
       ↓
Controller (App) recibe evento
       ↓
TaskManager.add(task) → Actualiza modelo
       ↓
Observer notifica cambios
       ↓
TaskList.renderAll() → Actualiza vista
       ↓
TaskRepository.save() → Persiste en localStorage
       ↓
StatsPanel.update() → Actualiza estadísticas
```

---

## 📅 CRONOGRAMA DÍA POR DÍA {#cronograma}

### **DÍA 1: Arquitectura + CRUD Básico** (3 horas)

**Objetivo:** Estructura del proyecto + crear/listar tareas

**Tareas:**
1. ✅ Crear estructura de archivos
2. ✅ Implementar Task class
3. ✅ Implementar TaskManager class (add, remove, getAll)
4. ✅ Implementar TaskRepository (save, load)
5. ✅ HTML/CSS base
6. ✅ Crear tarea y listar en consola (sin UI todavía)

**Checkpoint día 1:**
```javascript
// Debe funcionar esto en consola:
const manager = new TaskManager();
manager.add('Comprar leche', 'Descripción', 'Work', 'high');
manager.add('Estudiar JS', 'Capítulo 5', 'Study', 'medium');
console.log(manager.getAll()); // Ver 2 tareas
manager.remove(taskId);
console.log(manager.getAll()); // Ver 1 tarea
```

---

### **DÍA 2: UI Components + Renderizado** (3 horas)

**Objetivo:** Tareas visibles en pantalla, agregar desde formulario

**Tareas:**
1. ✅ Implementar TaskCard component (render individual)
2. ✅ Implementar TaskList component (render all)
3. ✅ Implementar TaskForm component
4. ✅ Conectar UI con TaskManager
5. ✅ Event listeners (agregar, eliminar)
6. ✅ Toggle completado

**Checkpoint día 2:**
```
- Formulario funcional (agregar tarea)
- Tareas se muestran en lista
- Click en checkbox → marca/desmarca
- Click en delete → elimina tarea
- Tareas persisten en localStorage (recargar página y siguen ahí)
```

---

### **DÍA 3: Filtros + Búsqueda + Ordenamiento** (3 horas)

**Objetivo:** Filtrar, buscar y ordenar tareas

**Tareas:**
1. ✅ Implementar filtros (All, Active, Completed)
2. ✅ Implementar búsqueda por texto
3. ✅ Implementar ordenamiento (fecha, prioridad, alfabético)
4. ✅ Filtros por categoría
5. ✅ UI de filtros y search bar

**Checkpoint día 3:**
```
- Click en "Active" → Solo muestra pendientes
- Click en "Completed" → Solo muestra completadas
- Escribir en search → Filtra por título/descripción
- Cambiar sort → Reordena lista
- Filtrar por categoría → Muestra solo esa categoría
```

---

### **DÍA 4: Estadísticas + Categorías + Edición** (3 horas)

**Objetivo:** Stats panel, gestión de categorías, editar tareas

**Tareas:**
1. ✅ Implementar StatsPanel component
2. ✅ Calcular estadísticas (total, completed, %, por categoría)
3. ✅ Inline editing de tareas (doble click en título)
4. ✅ Selector de categorías dinámico
5. ✅ Validaciones (no título vacío, etc.)

**Checkpoint día 4:**
```
- Panel muestra: Total, Completadas, Pendientes, %
- Stats se actualizan en tiempo real
- Doble click en tarea → Modo edición
- Cambiar título/descripción → Se guarda
- Categorías se agregan dinámicamente
```

---

### **DÍA 5: Pulido + Nice-to-Have (opcionales)** (3 horas)

**Objetivo:** Mejorar UX, agregar features extras SI SOBRA TIEMPO

**Tareas obligatorias:**
1. ✅ Confirmar antes de eliminar (modal simple)
2. ✅ Animaciones CSS básicas (fade in/out)
3. ✅ Mensajes de feedback (toast/alerts)
4. ✅ Responsive design (mobile-friendly)
5. ✅ Testing manual completo

**Tareas opcionales (solo si sobra tiempo):**
- [ ] Drag & drop para reordenar
- [ ] Fechas límite + indicador de vencimiento
- [ ] Dark mode toggle
- [ ] Export/Import JSON
- [ ] Filtros avanzados (AND/OR)

**Checkpoint día 5:**
```
- App funcional completa (MVP)
- Sin bugs evidentes
- Responsive en mobile
- localStorage funcionando perfecto
- Animaciones suaves
- Listo para mostrar/usar
```

---

## 📁 ESTRUCTURA DE ARCHIVOS {#estructura}

```
task-manager/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── models/
│   │   ├── Task.js
│   │   └── TaskManager.js
│   ├── components/
│   │   ├── TaskCard.js
│   │   ├── TaskList.js
│   │   ├── TaskForm.js
│   │   └── StatsPanel.js
│   ├── services/
│   │   └── TaskRepository.js
│   ├── utils/
│   │   └── helpers.js
│   └── app.js
└── README.md
```

**Descripción:**
- `models/` → Classes que representan datos (Task, TaskManager)
- `components/` → UI components reutilizables
- `services/` → Lógica de persistencia (localStorage)
- `utils/` → Funciones helper (formateo, validación)
- `app.js` → Entry point, inicialización, coordinación

---

## 💻 CÓDIGO BASE {#codigo-base}

### 1. HTML Base (`index.html`)

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Task Manager</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <div class="container">
    <!-- Header -->
    <header class="app-header">
      <h1>📝 Task Manager</h1>
    </header>

    <!-- Stats Panel -->
    <div id="stats-panel" class="stats-panel">
      <!-- Se renderiza dinámicamente -->
    </div>

    <!-- Filters & Search -->
    <div class="controls">
      <div class="filters">
        <button class="filter-btn active" data-filter="all">Todas</button>
        <button class="filter-btn" data-filter="active">Activas</button>
        <button class="filter-btn" data-filter="completed">Completadas</button>
      </div>

      <div class="search-box">
        <input 
          type="text" 
          id="search-input" 
          placeholder="🔍 Buscar tareas..."
        >
      </div>

      <div class="sort-box">
        <label for="sort-select">Ordenar:</label>
        <select id="sort-select">
          <option value="date">Fecha</option>
          <option value="priority">Prioridad</option>
          <option value="alphabetical">Alfabético</option>
        </select>
      </div>
    </div>

    <!-- Task Form -->
    <div id="task-form" class="task-form">
      <!-- Se renderiza dinámicamente -->
    </div>

    <!-- Task List -->
    <div id="task-list" class="task-list">
      <!-- Se renderiza dinámicamente -->
    </div>
  </div>

  <!-- Scripts (type="module" para ES6 modules) -->
  <script type="module" src="js/app.js"></script>
</body>
</html>
```

---

### 2. CSS Base (`css/styles.css`)

```css
/* ============================================
   TASK MANAGER - ESTILOS BASE
   ============================================ */

/* Reset básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

/* Header */
.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  text-align: center;
}

.app-header h1 {
  font-size: 2rem;
  font-weight: 600;
}

/* Stats Panel */
.stats-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  padding: 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.stat-card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-card .stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
}

.stat-card .stat-label {
  font-size: 0.875rem;
  color: #6c757d;
  margin-top: 5px;
}

/* Controls (Filters, Search, Sort) */
.controls {
  padding: 20px;
  background: white;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
}

.filters {
  display: flex;
  gap: 10px;
}

.filter-btn {
  padding: 8px 16px;
  border: 2px solid #667eea;
  background: white;
  color: #667eea;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  background: #f0f0f0;
}

.filter-btn.active {
  background: #667eea;
  color: white;
}

.search-box input {
  padding: 8px 16px;
  border: 2px solid #dee2e6;
  border-radius: 6px;
  width: 250px;
  font-size: 0.95rem;
}

.search-box input:focus {
  outline: none;
  border-color: #667eea;
}

.sort-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sort-box select {
  padding: 8px 12px;
  border: 2px solid #dee2e6;
  border-radius: 6px;
  cursor: pointer;
}

/* Task Form */
.task-form {
  padding: 20px;
  background: white;
  border-bottom: 1px solid #dee2e6;
}

.form-row {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.form-row input,
.form-row select,
.form-row textarea {
  flex: 1;
  padding: 10px;
  border: 2px solid #dee2e6;
  border-radius: 6px;
  font-family: inherit;
}

.form-row input:focus,
.form-row select:focus,
.form-row textarea:focus {
  outline: none;
  border-color: #667eea;
}

.form-row button {
  padding: 10px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;
}

.form-row button:hover {
  background: #5568d3;
}

/* Task List */
.task-list {
  padding: 20px;
  min-height: 300px;
}

.task-card {
  background: white;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.task-card:hover {
  border-color: #667eea;
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.2);
}

.task-card.completed {
  opacity: 0.6;
}

.task-card.completed .task-title {
  text-decoration: line-through;
  color: #6c757d;
}

.task-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.task-content {
  flex: 1;
}

.task-title {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 5px;
}

.task-description {
  font-size: 0.9rem;
  color: #6c757d;
}

.task-meta {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.task-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge-category {
  background: #e7f3ff;
  color: #0066cc;
}

.badge-priority {
  background: #fff3cd;
  color: #856404;
}

.badge-priority.high {
  background: #f8d7da;
  color: #721c24;
}

.badge-priority.medium {
  background: #fff3cd;
  color: #856404;
}

.badge-priority.low {
  background: #d1ecf1;
  color: #0c5460;
}

.task-actions {
  display: flex;
  gap: 8px;
}

.task-actions button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.btn-edit {
  background: #ffc107;
  color: white;
}

.btn-edit:hover {
  background: #e0a800;
}

.btn-delete {
  background: #dc3545;
  color: white;
}

.btn-delete:hover {
  background: #c82333;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

/* Responsive */
@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: stretch;
  }

  .filters {
    width: 100%;
    justify-content: center;
  }

  .search-box input {
    width: 100%;
  }

  .sort-box {
    width: 100%;
    justify-content: center;
  }

  .form-row {
    flex-direction: column;
  }

  .task-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .task-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
```

---

### 3. Task Model (`js/models/Task.js`)

```javascript
// ============================================
// TASK MODEL
// Representa una tarea individual
// ============================================

export class Task {
  constructor(data) {
    // ID único (timestamp + random para evitar colisiones)
    this.id = data.id || Date.now() + Math.random().toString(36).substr(2, 9);
    
    // Propiedades de la tarea
    this.title = data.title;
    this.description = data.description || '';
    this.completed = data.completed || false;
    this.priority = data.priority || 'medium'; // 'high', 'medium', 'low'
    this.category = data.category || 'General';
    this.createdAt = data.createdAt || new Date().toISOString();
    this.completedAt = data.completedAt || null;
  }

  // Marcar como completada
  toggle() {
    this.completed = !this.completed;
    this.completedAt = this.completed ? new Date().toISOString() : null;
  }

  // Actualizar propiedades
  update(data) {
    if (data.title !== undefined) this.title = data.title;
    if (data.description !== undefined) this.description = data.description;
    if (data.priority !== undefined) this.priority = data.priority;
    if (data.category !== undefined) this.category = data.category;
  }

  // Validar tarea
  isValid() {
    return this.title && this.title.trim().length > 0;
  }

  // Convertir a objeto plano (para localStorage)
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      completed: this.completed,
      priority: this.priority,
      category: this.category,
      createdAt: this.createdAt,
      completedAt: this.completedAt
    };
  }

  // Crear Task desde objeto plano
  static fromJSON(json) {
    return new Task(json);
  }
}
```

---

### 4. TaskManager (`js/models/TaskManager.js`)

```javascript
// ============================================
// TASK MANAGER
// Gestiona colección de tareas (CRUD + lógica de negocio)
// ============================================

import { Task } from './Task.js';

export class TaskManager {
  constructor() {
    // Array de tareas
    this.tasks = [];
    
    // Observers (Observer Pattern)
    this.observers = [];
  }

  // ==========================================
  // OBSERVER PATTERN
  // ==========================================

  subscribe(observer) {
    this.observers.push(observer);
  }

  notify() {
    this.observers.forEach(observer => observer.update(this.tasks));
  }

  // ==========================================
  // CRUD OPERATIONS
  // ==========================================

  // Agregar tarea
  add(title, description, category, priority) {
    const task = new Task({
      title,
      description,
      category,
      priority
    });

    if (!task.isValid()) {
      throw new Error('Tarea inválida: el título es requerido');
    }

    this.tasks.push(task);
    this.notify(); // Notificar cambios
    return task;
  }

  // Eliminar tarea
  remove(id) {
    const index = this.tasks.findIndex(task => task.id === id);
    
    if (index === -1) {
      throw new Error(`Tarea no encontrada: ${id}`);
    }

    this.tasks.splice(index, 1);
    this.notify();
  }

  // Obtener tarea por ID
  getById(id) {
    const task = this.tasks.find(task => task.id === id);
    
    if (!task) {
      throw new Error(`Tarea no encontrada: ${id}`);
    }

    return task;
  }

  // Actualizar tarea
  update(id, data) {
    const task = this.getById(id);
    task.update(data);
    this.notify();
    return task;
  }

  // Toggle completado
  toggle(id) {
    const task = this.getById(id);
    task.toggle();
    this.notify();
    return task;
  }

  // Obtener todas las tareas
  getAll() {
    return [...this.tasks]; // Retornar copia
  }

  // ==========================================
  // FILTROS Y BÚSQUEDA
  // ==========================================

  // Filtrar por estado
  getByStatus(status) {
    if (status === 'all') return this.getAll();
    if (status === 'active') return this.tasks.filter(t => !t.completed);
    if (status === 'completed') return this.tasks.filter(t => t.completed);
    return this.getAll();
  }

  // Filtrar por categoría
  getByCategory(category) {
    if (!category || category === 'all') return this.getAll();
    return this.tasks.filter(t => t.category === category);
  }

  // Buscar por texto (título o descripción)
  search(query) {
    if (!query || query.trim() === '') return this.getAll();
    
    const lowercaseQuery = query.toLowerCase();
    
    return this.tasks.filter(task => {
      return (
        task.title.toLowerCase().includes(lowercaseQuery) ||
        task.description.toLowerCase().includes(lowercaseQuery)
      );
    });
  }

  // Filtro combinado (estado + categoría + búsqueda)
  filter({ status = 'all', category = 'all', search = '' }) {
    let filtered = this.tasks;

    // Filtrar por estado
    if (status !== 'all') {
      filtered = filtered.filter(t => 
        status === 'completed' ? t.completed : !t.completed
      );
    }

    // Filtrar por categoría
    if (category !== 'all') {
      filtered = filtered.filter(t => t.category === category);
    }

    // Filtrar por búsqueda
    if (search.trim()) {
      const lowercaseSearch = search.toLowerCase();
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(lowercaseSearch) ||
        t.description.toLowerCase().includes(lowercaseSearch)
      );
    }

    return filtered;
  }

  // ==========================================
  // ORDENAMIENTO
  // ==========================================

  sort(tasks, criteria) {
    const sorted = [...tasks];

    switch (criteria) {
      case 'date':
        return sorted.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
      
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return sorted.sort((a, b) => 
          priorityOrder[b.priority] - priorityOrder[a.priority]
        );
      
      case 'alphabetical':
        return sorted.sort((a, b) => 
          a.title.localeCompare(b.title)
        );
      
      default:
        return sorted;
    }
  }

  // ==========================================
  // ESTADÍSTICAS
  // ==========================================

  getStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const active = total - completed;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Estadísticas por categoría
    const byCategory = this.tasks.reduce((acc, task) => {
      if (!acc[task.category]) {
        acc[task.category] = { total: 0, completed: 0 };
      }
      acc[task.category].total++;
      if (task.completed) {
        acc[task.category].completed++;
      }
      return acc;
    }, {});

    return {
      total,
      completed,
      active,
      percentage,
      byCategory
    };
  }

  // Obtener categorías únicas
  getCategories() {
    const categories = new Set(this.tasks.map(t => t.category));
    return Array.from(categories);
  }

  // ==========================================
  // GESTIÓN DE DATOS
  // ==========================================

  // Cargar tareas desde array
  loadTasks(tasksData) {
    this.tasks = tasksData.map(data => Task.fromJSON(data));
    this.notify();
  }

  // Limpiar todas las tareas
  clear() {
    this.tasks = [];
    this.notify();
  }

  // Exportar a JSON
  toJSON() {
    return this.tasks.map(task => task.toJSON());
  }
}
```

---

### 5. TaskRepository (`js/services/TaskRepository.js`)

```javascript
// ============================================
// TASK REPOSITORY
// Maneja persistencia con localStorage (Singleton)
// ============================================

export class TaskRepository {
  // Singleton instance
  static #instance = null;
  
  constructor() {
    // Implementar Singleton
    if (TaskRepository.#instance) {
      return TaskRepository.#instance;
    }
    
    this.STORAGE_KEY = 'task_manager_tasks';
    TaskRepository.#instance = this;
  }

  // Guardar tareas
  save(tasks) {
    try {
      const json = JSON.stringify(tasks);
      localStorage.setItem(this.STORAGE_KEY, json);
      return true;
    } catch (error) {
      console.error('Error al guardar tareas:', error);
      return false;
    }
  }

  // Cargar tareas
  load() {
    try {
      const json = localStorage.getItem(this.STORAGE_KEY);
      
      if (!json) {
        return [];
      }

      return JSON.parse(json);
    } catch (error) {
      console.error('Error al cargar tareas:', error);
      return [];
    }
  }

  // Limpiar storage
  clear() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error al limpiar storage:', error);
      return false;
    }
  }

  // Verificar si hay datos guardados
  hasData() {
    return localStorage.getItem(this.STORAGE_KEY) !== null;
  }
}
```

---

## ✅ FEATURES MVP {#features-mvp}

### Must-Have (obligatorio para día 4)

- [x] **Crear tareas** con título, descripción, categoría, prioridad
- [x] **Listar tareas** en UI
- [x] **Marcar completado** (toggle checkbox)
- [x] **Eliminar tareas** (con confirmación)
- [x] **Filtros:** All / Active / Completed
- [x] **Búsqueda** por texto en título/descripción
- [x] **Ordenamiento:** Fecha / Prioridad / Alfabético
- [x] **Persistencia:** localStorage (automático)
- [x] **Estadísticas:** Total, Completadas, Activas, %
- [x] **Categorías:** Crear y filtrar por categoría
- [x] **Responsive:** Mobile-friendly

---

## 🎁 FEATURES NICE-TO-HAVE {#nice-to-have}

### Opcionales (solo si sobra tiempo en día 5)

- [ ] **Editar inline:** Doble click en tarea → modo edición
- [ ] **Drag & drop:** Reordenar tareas arrastrando
- [ ] **Fechas límite:** Agregar due date + indicador de vencido
- [ ] **Dark mode:** Toggle tema oscuro/claro
- [ ] **Export/Import:** Descargar/cargar JSON de tareas
- [ ] **Filtros avanzados:** Combinar múltiples filtros (AND/OR)
- [ ] **Notificaciones:** Avisar cuando tarea vence
- [ ] **Subtareas:** Tareas pueden tener subtareas
- [ ] **Tags múltiples:** Más de una categoría por tarea

**IMPORTANTE:** Solo implementar nice-to-have si MVP está 100% completo y probado.

---

## 🎨 PATTERNS APLICADOS {#patterns}

### 1. **MVC (Model-View-Controller)**

```
Model (TaskManager) 
  ↕ 
Controller (App) 
  ↕ 
View (Components)
```

- **Model:** TaskManager gestiona datos y lógica de negocio
- **View:** Components renderizan UI
- **Controller:** App coordina entre model y view

---

### 2. **Observer Pattern**

```javascript
// TaskManager notifica cambios
class TaskManager {
  subscribe(observer) {
    this.observers.push(observer);
  }
  
  notify() {
    this.observers.forEach(obs => obs.update(this.tasks));
  }
  
  add(task) {
    this.tasks.push(task);
    this.notify(); // ← Notifica a todos los observers
  }
}

// App se suscribe
taskManager.subscribe({
  update: (tasks) => {
    taskList.renderAll(tasks);
    statsPanel.update(tasks);
    repository.save(tasks);
  }
});
```

---

### 3. **Repository Pattern**

```javascript
// Abstrae persistencia de datos
class TaskRepository {
  save(tasks) { /* localStorage */ }
  load() { /* localStorage */ }
}

// Uso
repository.save(taskManager.toJSON());
const tasks = repository.load();
```

---

### 4. **Singleton Pattern**

```javascript
// TaskRepository es singleton
class TaskRepository {
  static #instance = null;
  
  constructor() {
    if (TaskRepository.#instance) {
      return TaskRepository.#instance;
    }
    TaskRepository.#instance = this;
  }
}

// Siempre retorna la misma instancia
const repo1 = new TaskRepository();
const repo2 = new TaskRepository();
console.log(repo1 === repo2); // true
```

---

### 5. **Component Pattern**

```javascript
// Cada componente encapsula UI + behavior
class TaskCard {
  render(task) {
    // Genera HTML de la tarea
  }
  
  setupEvents(element, task) {
    // Agrega event listeners
  }
}
```

---

## 🧪 TESTING & DEBUGGING {#testing}

### Testing Manual (checklist)

**Día 1:**
- [ ] Crear tarea en consola → funciona
- [ ] Eliminar tarea en consola → funciona
- [ ] Recargar página → tareas persisten

**Día 2:**
- [ ] Formulario agrega tarea → aparece en lista
- [ ] Click checkbox → marca/desmarca
- [ ] Click delete → elimina de lista
- [ ] Recargar → tareas siguen ahí

**Día 3:**
- [ ] Filtro "Active" → solo muestra pendientes
- [ ] Filtro "Completed" → solo muestra completadas
- [ ] Search → filtra correctamente
- [ ] Sort → ordena correctamente
- [ ] Combinar filtros → funciona

**Día 4:**
- [ ] Stats se actualizan en tiempo real
- [ ] Categorías se muestran correctamente
- [ ] Editar tarea → guarda cambios
- [ ] Validaciones funcionan

**Día 5:**
- [ ] Responsive en mobile
- [ ] Animaciones suaves
- [ ] Sin bugs evidentes
- [ ] Performance aceptable (>100 tareas)

---

### Debugging Tips

**Si no persiste en localStorage:**
```javascript
// Verificar en consola
console.log(localStorage.getItem('task_manager_tasks'));

// Limpiar y probar de nuevo
localStorage.clear();
```

**Si no se actualiza la UI:**
```javascript
// Verificar que notify() se llame
taskManager.notify(); // ← Después de cada cambio

// Verificar que observer esté suscrito
console.log(taskManager.observers.length); // > 0
```

**Si filtros no funcionan:**
```javascript
// Log de tareas filtradas
const filtered = taskManager.filter({ status: 'active' });
console.log('Filtered:', filtered);
```

---

## 🚀 DEPLOYMENT {#deployment}

### Opciones de deployment gratuito

**1. GitHub Pages** (recomendado)
```bash
# Crear repo en GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/task-manager.git
git push -u origin main

# Activar GitHub Pages en Settings → Pages
# URL: https://tu-usuario.github.io/task-manager
```

**2. Netlify**
- Drag & drop carpeta del proyecto
- URL automática

**3. Vercel**
- Similar a Netlify

---

## 🎯 PRÓXIMOS PASOS

### Al completar el proyecto:

1. ✅ **Testing completo** (checklist arriba)
2. ✅ **Deploy** en GitHub Pages
3. ✅ **Actualizar backup del tutor** con este proyecto
4. ✅ **Portfolio:** Agregar a tu portfolio con:
   - Screenshot de la app
   - Link al demo
   - Link al código
   - Tecnologías usadas
   - Features implementadas

---

## 📝 NOTAS FINALES

### Lo que vas a lograr:

- ✅ App profesional COMPLETA en portfolio
- ✅ Dominio de arquitectura MVC
- ✅ Experiencia con patterns reales
- ✅ Código limpio y mantenible
- ✅ Proyecto desplegado y usable
- ✅ **Preparado para React** (esto ES React sin JSX)

### Después de este proyecto:

**React va a ser TRIVIAL:**
- TaskManager → useState/useContext
- Observer → useEffect
- Components → React components
- Repository → Custom hooks

**Vas a ver React y decir:** "Ah, es lo mismo que hice pero con JSX"

---

## ⏰ RECORDATORIO DEL GOVERNOR

- 📅 **5 días MÁXIMO**
- ✅ **MVP al día 4** (obligatorio)
- 🎁 **Nice-to-have en día 5** (opcional)
- 🚫 **Máximo 2 iteraciones** por feature
- ⏱️ **Si llegás al límite:** Subir lo que tengas

**Funcional al 80% deployed > Perfecto al 100% sin usar**

---

## 🚀 ¿LISTO PARA ARRANCAR?

**Día 1 empieza con:**
1. Crear carpeta `task-manager`
2. Crear estructura de archivos
3. Copiar HTML/CSS base
4. Implementar Task class
5. Implementar TaskManager class
6. Testing en consola

**¡ÉXITOS CON EL PROYECTO FINAL!** 🔥💪

---

FIN DEL DOCUMENTO

**Versión:** 1.0  
**Fecha:** Enero 2026  
**Duración:** 5 días  
**Nivel:** Integrador completo (Semana 1 + 2 + 3)
