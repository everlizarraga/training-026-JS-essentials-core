# ROADMAP: JavaScript Essentials - Dominio Completo del CORE

## 📊 METADATA

**Objetivo:** Completar el dominio de JavaScript CORE para que el código fluya natural y puedas enfocarte en arquitectura. Automatizar "lo particular" para pensar en "lo general".

**Tecnologías conocidas:** JavaScript Avanzado (Scope, Closures, This, Bind), Async JavaScript completo (Promises, Async/Await, Event Loop, Fetch), Patterns (Module, Higher-order functions, Event Delegation)

**Horas diarias disponibles:** 3 horas

**Duración estimada total:** 2-3 semanas

**Fecha de inicio:** A definir

**Enfoque determinado:** Profundidad sobre coverage + Automatización + Proyectos reales

**Justificación del enfoque:** 
- El objetivo NO es "conocer todo JavaScript" sino DOMINAR el 80% que usás el 95% del tiempo
- Enfoque en automatización: que Arrays, Objects, ES6+, DOM sean AUTOMÁTICOS
- Práctica intensiva para muscle memory (código sin pensar)
- Preparación para frameworks (React va a ser trivial después de esto)
- Consolidar antes de avanzar = estrategia inteligente

**Número de fases:** 3 semanas (1 fase = 1 semana)

**Justificación:** 
- **Semana 1:** Arrays & Objects (transformaciones de datos - base de TODO)
- **Semana 2:** ES6+ & DOM (sintaxis moderna + interacción con UI)
- **Semana 3:** Classes & Patterns (arquitectura y diseño)

Cada semana agrupa conceptos relacionados que usás JUNTOS en proyectos reales. No se pueden fusionar sin perder profundidad, ni dividir más sin romper la lógica de aprendizaje.

---

## 🗺️ ESTRUCTURA COMPLETA DEL ENTRENAMIENTO

### SEMANA 1: Arrays & Objects Mastery
**Duración estimada:** 7 días (21 horas)  
**Objetivo de la semana:** Dominar transformaciones de datos. Arrays methods y Objects manipulation deben ser AUTOMÁTICOS. Functional programming basics. Pensar en inmutabilidad.

#### Warmup Semana 1: Arrays & Objects Fundamentals
**Duración:** 9-12 horas (distribuido en 3 días)  
**Objetivo:** Practicar métodos esenciales de Arrays y Objects hasta que sean automáticos

**Ejercicios:**

**ARRAYS (8 ejercicios):**
1. **map() básico** - Transformar array simple (números → strings)
2. **map() complejo** - Transformar objetos en array (extraer propiedades)
3. **filter() básico** - Filtrar números pares/impares
4. **filter() complejo** - Filtrar objetos por múltiples condiciones
5. **reduce() suma/producto** - Acumular valores numéricos
6. **reduce() a objeto** - Transformar array a objeto (groupBy, conteo)
7. **Chaining methods** - map → filter → reduce en cadena
8. **find/findIndex/some/every** - Búsquedas y verificaciones

**OBJECTS (6 ejercicios):**
9. **Destructuring simple** - Extraer propiedades de objeto
10. **Destructuring anidado** - Objetos dentro de objetos
11. **Spread operator** - Clonar y merge de objetos
12. **Rest operator** - Extraer "resto" de propiedades
13. **Object.keys/values/entries** - Iterar sobre objetos
14. **Computed properties** - Keys dinámicas, shorthand syntax

**FUNCTIONAL (2 ejercicios):**
15. **Pure functions** - Funciones sin side effects
16. **Immutability** - Evitar mutaciones, crear nuevas referencias

**Justificación de cantidad:** 16 ejercicios porque Arrays y Objects son la BASE de TODA manipulación de datos. Ejercicios 1-8 son Arrays (los métodos más usados), 9-14 Objects (sintaxis moderna esencial), 15-16 Functional (mindset necesario). Necesitás práctica INTENSIVA para automatización.

**Distribución conceptual:**
- Ejercicios 1-4: Arrays transformaciones básicas (map, filter)
- Ejercicios 5-7: Arrays reduce + chaining (el más complejo)
- Ejercicio 8: Arrays búsquedas (find, some, every)
- Ejercicios 9-12: Objects destructuring + spread/rest
- Ejercicios 13-14: Objects methods + computed
- Ejercicios 15-16: Functional mindset

---

#### Proyecto 1: Data Transformer & Analyzer
**Duración:** 4 días máximo  
**Objetivo:** Construir herramienta que procesa datasets complejos (como APIs reales). Aplicar TODOS los métodos de Arrays/Objects en contexto real. Visualizar resultados.

**Cronograma:**
- **Día 1:** Cargar dataset (JSON de productos/usuarios), filtros básicos
- **Día 2:** Transformaciones (map/filter/reduce), estadísticas
- **Día 3:** Agrupaciones (groupBy), búsquedas, ordenamiento
- **Día 4:** Visualización (tables, charts con datos procesados), pulido

**Features mínimas (MVP):**
- Cargar dataset JSON (productos de e-commerce o usuarios)
- Filtros: por categoría, precio, rating, etc.
- Transformaciones: extraer propiedades específicas, calcular totales
- Estadísticas: promedio, max, min, count, groupBy
- Búsquedas: find por ID, some/every verificaciones
- Ordenamiento: por precio, rating, nombre
- Visualización: tabla con resultados, cards de stats

**Patterns introducidos:**
- **Pure Functions:** Todas las transformaciones sin side effects
- **Immutability:** No mutar arrays/objects originales
- **Function Composition:** Combinar pequeñas funciones
- **Data Pipeline:** Input → Transform → Output

**Contexto de uso real:**
Este proyecto simula:
- **Dashboards:** Procesar datos de APIs para mostrar
- **E-commerce:** Filtros de productos, ordenamiento
- **Analytics:** Calcular estadísticas de datasets
- **Admin panels:** Transformar data de backend

Es lo que hacés TODO EL TIEMPO en desarrollo real.

---

### SEMANA 2: ES6+ & DOM Mastery
**Duración estimada:** 7 días (21 horas)  
**Objetivo de la semana:** Dominar sintaxis moderna de ES6+ y manipulación eficiente del DOM. Event handling avanzado, performance patterns, IntersectionObserver.

#### Warmup Semana 2: ES6+ & DOM Fundamentals
**Duración:** 9-12 horas (distribuido en 3 días)  
**Objetivo:** Practicar ES6+ syntax y DOM manipulation hasta que sean automáticos

**Ejercicios:**

**ES6+ (6 ejercicios):**
1. **Template literals** - String interpolation, multiline
2. **Default parameters** - Parámetros opcionales en funciones
3. **Arrow functions avanzado** - This binding, cuándo NO usar
4. **Destructuring en funciones** - Parámetros desestructurados
5. **Optional chaining + Nullish** - Acceso seguro, defaults
6. **Modules (import/export)** - Separar código en archivos

**DOM (8 ejercicios):**
7. **querySelector avanzado** - Selectores complejos, closest()
8. **createElement + append** - Crear elementos dinámicamente
9. **Event delegation** - Un listener en padre, detectar hijos
10. **Event propagation** - Bubbling, capture, stopPropagation
11. **classList API** - add/remove/toggle clases dinámicamente
12. **dataset + data attributes** - Guardar data en elementos
13. **IntersectionObserver** - Lazy loading de imágenes/contenido
14. **Custom events** - Comunicación entre componentes

**Justificación de cantidad:** 14 ejercicios porque ES6+ y DOM son lo que usás CONSTANTEMENTE. Ejercicios 1-6 modernizan tu sintaxis (escribís código más limpio), 7-14 optimizan tu DOM manipulation (performance, patterns modernos). Necesitás muscle memory en ambos.

**Distribución conceptual:**
- Ejercicios 1-3: ES6+ syntax básico (templates, defaults, arrows)
- Ejercicios 4-6: ES6+ avanzado (destructuring, optional, modules)
- Ejercicios 7-10: DOM manipulation core (query, create, events)
- Ejercicios 11-12: DOM data handling (classes, dataset)
- Ejercicios 13-14: DOM avanzado (Observer, custom events)

**Contextos de uso introducidos:**
- **Ejercicio 9:** Event delegation (performance en listas largas)
- **Ejercicio 13:** Lazy loading (optimización de carga)
- **Ejercicio 14:** Component communication (arquitectura escalable)

---

#### Proyecto 2: Component Library (Mini-Framework)
**Duración:** 4 días máximo  
**Objetivo:** Construir librería de componentes reutilizables (Cards, Modals, Tabs, Accordion) con DOM manipulation eficiente. Event delegation, lazy loading, custom events. Preparación para React.

**Cronograma:**
- **Día 1:** Card component + Grid container, API básica
- **Día 2:** Modal component (open/close, overlay), Tabs component
- **Día 3:** Accordion component, Lazy loading de imágenes
- **Día 4:** Custom events entre componentes, documentación, demo page

**Features mínimas (MVP):**
- **Card Component:** Crear cards dinámicamente desde data
- **Modal Component:** Open/close, overlay, custom content
- **Tabs Component:** Switch entre tabs, contenido dinámico
- **Accordion Component:** Expand/collapse, múltiples items
- **LazyImage Component:** Carga imágenes con IntersectionObserver
- **Event System:** Custom events para comunicación
- **API limpia:** Fácil de usar `new Card({...})`

**Patterns introducidos:**
- **Component Pattern:** Encapsular UI + behavior
- **Factory Pattern:** Crear instancias de componentes
- **Event Emitter Pattern:** Custom events para comunicación
- **Lazy Loading Pattern:** Cargar recursos cuando se necesitan
- **API Design:** Crear interfaces limpias y usables

**Contexto de uso real:**
Este proyecto te prepara para:
- **React:** Componentes = lo mismo que construís aquí
- **Vue:** Componentes = misma lógica
- **Web Components:** Standard nativo de navegadores
- **UI Libraries:** Entender cómo funcionan por dentro (Bootstrap, Material)

Es el paso previo PERFECTO antes de aprender React.

---

### SEMANA 3: Classes & Advanced Patterns
**Duración estimada:** 7 días (21 horas)  
**Objetivo de la semana:** Dominar OOP con Classes (cuándo usarlas, cuándo NO), design patterns relevantes, error handling avanzado. Consolidar todo en proyecto integrador.

#### Warmup Semana 3: Classes & Patterns Fundamentals
**Duración:** 6-9 horas (distribuido en 2 días)  
**Objetivo:** Practicar sintaxis de Classes y comparar con Factory functions

**Ejercicios:**

**CLASSES (6 ejercicios):**
1. **Class básica** - Constructor, métodos, instancias
2. **Extends + super** - Herencia, llamar constructor padre
3. **Static methods** - Métodos de clase (no instancia)
4. **Private fields (#)** - Encapsulación, campos privados
5. **Getters/Setters** - Computed properties, validación
6. **Class vs Factory** - Cuándo usar cada uno (CRÍTICO)

**PATTERNS (4 ejercicios):**
7. **Singleton Pattern** - Una sola instancia (cuándo usar/no usar)
8. **Factory Pattern avanzado** - Crear objetos según config
9. **Observer Pattern** - Pub/Sub, notificaciones
10. **Error handling avanzado** - Custom errors, error boundaries

**Justificación de cantidad:** 10 ejercicios porque Classes NO son lo más importante de JavaScript (functional es más común), pero necesitás saber cuándo usarlas. Ejercicios 1-5 son sintaxis, 6 es CRÍTICO (decisión arquitectónica), 7-10 son patterns que usás en proyectos complejos.

**Distribución conceptual:**
- Ejercicios 1-3: Classes básico (syntax, herencia)
- Ejercicios 4-5: Classes avanzado (private, getters/setters)
- Ejercicio 6: Decisión arquitectónica (class vs factory)
- Ejercicios 7-9: Design patterns (singleton, factory, observer)
- Ejercicio 10: Error handling profesional

---

#### Proyecto Final: Task Management System (Full App)
**Duración:** 5 días máximo  
**Objetivo:** Construir app completa de gestión de tareas con TODO lo aprendido: Arrays/Objects para data, ES6+ syntax, DOM manipulation, Components, Classes (TaskManager), Patterns (Observer para updates), localStorage. Arquitectura profesional.

**Cronograma:**
- **Día 1:** Arquitectura (TaskManager class, Task class), CRUD básico
- **Día 2:** UI Components (TaskCard, TaskList, TaskForm), renderizado
- **Día 3:** Filtros (all/active/completed), búsqueda, ordenamiento
- **Día 4:** localStorage persistence, estadísticas, categories/tags
- **Día 5:** Drag & drop (opcional), animations, pulido final

**Features mínimas (MVP):**
- Crear tareas (título, descripción, prioridad, categoría)
- Editar tareas (inline editing)
- Eliminar tareas (con confirmación)
- Marcar como completado (toggle)
- Filtros: All / Active / Completed
- Búsqueda por texto
- Ordenamiento: por fecha, prioridad, alfabético
- Persistencia: localStorage (guardar/cargar automático)
- Estadísticas: Total, completadas, pendientes, % completado
- Categorías/Tags: Agrupar tareas

**Features Nice-to-Have (si sobra tiempo):**
- [ ] Drag & drop para reordenar
- [ ] Fechas límite + notificaciones
- [ ] Dark mode
- [ ] Export/Import JSON

**Patterns introducidos:**
- **MVC/MVVM Pattern:** Separar Model (data), View (UI), Controller (logic)
- **Repository Pattern:** TaskRepository para acceso a datos
- **Observer Pattern:** Notificar cambios de estado
- **Command Pattern:** Undo/Redo de acciones
- **Validation Pattern:** Validar inputs antes de guardar

**Stack Técnico:**
- Classes: TaskManager, Task, TaskRepository
- Arrays methods: filter/map/reduce para filtros y stats
- Objects: destructuring, spread para updates
- ES6+: modules, template literals, optional chaining
- DOM: components pattern, event delegation
- localStorage: persistence

**Contexto de uso real:**
Este proyecto integra TODO:
- **Arrays/Objects:** Filtrar, buscar, agrupar tareas
- **ES6+:** Código limpio y moderno
- **DOM:** UI reactiva a cambios
- **Classes:** Arquitectura orientada a objetos (cuando tiene sentido)
- **Patterns:** Código mantenible y escalable

Es un proyecto de **nivel mid-senior completo**.

**Después de esto, React va a ser TRIVIAL:**
- TaskManager class → Context/Custom hook
- Task class → State object
- Components → React components
- Observer → useEffect
- localStorage → Mismo

**Vas a ver React y decir: "Ah, es lo mismo que hice pero con sintaxis de React".**

---

## 🎯 RESUMEN DE CONCEPTOS POR SEMANA

### Semana 1: Arrays & Objects Mastery
**Conceptos cubiertos (16 temas):**
1. map() - Transformaciones básicas
2. map() - Transformaciones complejas
3. filter() - Filtros simples
4. filter() - Filtros múltiples condiciones
5. reduce() - Acumulaciones (sum, product)
6. reduce() - Transformaciones (array → object)
7. Chaining methods - map → filter → reduce
8. find/findIndex/some/every - Búsquedas y verificaciones
9. Destructuring simple
10. Destructuring anidado
11. Spread operator (clone, merge)
12. Rest operator (extract remaining)
13. Object.keys/values/entries
14. Computed properties + shorthand
15. Pure functions
16. Immutability

### Semana 2: ES6+ & DOM Mastery
**Conceptos cubiertos (14 temas):**
17. Template literals
18. Default parameters
19. Arrow functions (this binding)
20. Destructuring en funciones
21. Optional chaining + Nullish coalescing
22. Modules (import/export)
23. querySelector avanzado
24. createElement + append
25. Event delegation
26. Event propagation (bubbling, capture)
27. classList API
28. dataset + data attributes
29. IntersectionObserver (lazy loading)
30. Custom events

### Semana 3: Classes & Patterns
**Conceptos cubiertos (10 temas):**
31. Class syntax (constructor, methods)
32. Extends + super (herencia)
33. Static methods/properties
34. Private fields (#)
35. Getters/Setters
36. Class vs Factory (decisión arquitectónica)
37. Singleton Pattern
38. Factory Pattern avanzado
39. Observer Pattern
40. Error handling avanzado

**Total: 40 conceptos cubiertos** ✅

---

## 🎨 PATTERNS Y BUENAS PRÁCTICAS

### Semana 1:
- **Pure Functions:** Sin side effects
- **Immutability:** No mutar originales
- **Function Composition:** Combinar funciones pequeñas
- **Data Pipeline:** Input → Transform → Output

### Semana 2:
- **Component Pattern:** Encapsular UI + behavior
- **Factory Pattern:** Crear instancias
- **Event Emitter:** Custom events
- **Lazy Loading:** Cargar cuando se necesita
- **API Design:** Interfaces limpias

### Semana 3:
- **MVC/MVVM:** Separar concerns
- **Repository Pattern:** Acceso a datos
- **Observer Pattern:** Notificar cambios
- **Command Pattern:** Undo/Redo
- **Validation Pattern:** Inputs seguros

---

## ⏱️ TIMELINE GLOBAL

**Semana 1:** Arrays & Objects Mastery  
- Días 1-3: Warmup (16 ejercicios)
- Días 4-7: Proyecto 1 (Data Transformer)

**Semana 2:** ES6+ & DOM Mastery  
- Días 1-3: Warmup (14 ejercicios)
- Días 4-7: Proyecto 2 (Component Library)

**Semana 3:** Classes & Patterns  
- Días 1-2: Warmup (10 ejercicios)
- Días 3-7: Proyecto Final (Task Management System)

**Total estimado:** 21 días (3 semanas completas)

**Breakdown detallado:**

| Semana | Warmup | Proyecto | Total | Días |
|--------|--------|----------|-------|------|
| 1 | 9-12 hrs | 12 hrs | 21-24 hrs | 7 |
| 2 | 9-12 hrs | 12 hrs | 21-24 hrs | 7 |
| 3 | 6-9 hrs | 15 hrs | 21-24 hrs | 7 |

**Total: 63-72 horas → 21 días con 3 hrs/día**

---

## 📈 PROGRESIÓN DE DIFICULTAD

```
Complejidad
    ↑
    │                                          ┌────── Proyecto Final
    │                                     ┌────┤    (Task Manager)
    │                               ┌─────┤    │
    │                         ┌─────┤     │    │
    │                   ┌─────┤     │     │    │
    │             ┌─────┤     │     │     │    │
    │       ┌─────┤     │     │     │     │    │
    │ ┌─────┤     │     │     │     │     │    │
    └─┴─────┴─────┴─────┴─────┴─────┴─────┴────┴────→ Tiempo
      S1    S1    S2    S2    S3    S3    S3   S3
      Ej   Proy   Ej   Proy   Ej   Día1  Día3  Día5
```

**Leyenda:**
- **S1:** Semana 1 (Arrays/Objects) - Fundamentos de datos
- **S2:** Semana 2 (ES6+/DOM) - Sintaxis moderna + UI
- **S3:** Semana 3 (Classes/Patterns) - Arquitectura completa

**Cada semana incrementa:**
- Cantidad de conceptos que se integran
- Complejidad arquitectónica
- Similitud con apps profesionales
- Autonomía requerida

---

## 🎓 APRENDIZAJES CLAVE POR SEMANA

### Al completar Semana 1 sabrás:
- ✅ Transformar arrays con map/filter/reduce AUTOMÁTICAMENTE
- ✅ Usar reduce para cualquier transformación (no solo sum)
- ✅ Encadenar métodos eficientemente
- ✅ Destructurar objects profundamente
- ✅ Usar spread/rest sin pensar
- ✅ Pensar en inmutabilidad (no mutar)
- ✅ Escribir pure functions naturalmente
- ✅ Procesar datasets complejos con confianza

### Al completar Semana 2 sabrás:
- ✅ Escribir código con sintaxis ES6+ moderna
- ✅ Usar template literals, optional chaining, nullish naturalmente
- ✅ Manipular DOM eficientemente (no jQuery)
- ✅ Aplicar event delegation automáticamente
- ✅ Implementar lazy loading con IntersectionObserver
- ✅ Crear componentes reutilizables
- ✅ Usar custom events para comunicación
- ✅ Diseñar APIs limpias para tus componentes

### Al completar Semana 3 sabrás:
- ✅ Usar Classes cuando tiene sentido (y cuándo NO)
- ✅ Aplicar herencia correctamente
- ✅ Encapsular con private fields
- ✅ Decidir: Class vs Factory function
- ✅ Implementar Singleton/Observer/Factory patterns
- ✅ Manejar errores profesionalmente
- ✅ Arquitecturar apps completas (MVC/MVVM)
- ✅ **DOMINIO TOTAL de JavaScript CORE**

---

## 💡 CONSEJOS PARA EL ENTRENAMIENTO

### Governor aplicado:
- **Ejercicios:** Máximo 20-30 min cada uno. Si te trabás >20 min → hints
- **Proyectos Semana 1-2:** Máximo 4 días. Funcional > perfecto
- **Proyecto Final:** Máximo 5 días. MVP obligatorio, nice-to-have opcional
- **Iteraciones:** Máximo 2 por ejercicio/proyecto → después NEXT
- **80/20:** Primera versión 80% → suficiente para avanzar

### Cómo estudiar efectivamente:
1. **Leer ejemplo resuelto** antes de intentar ejercicio
2. **Ejecutar código** en navegador/Node (no solo leer)
3. **Experimentar:** Cambiar valores, agregar console.log(), ver qué pasa
4. **Speed drills:** Implementar rápido para muscle memory
5. **Refactoring:** Mejorar código existente sin romperlo

### Enfoque en AUTOMATIZACIÓN:
- **Objetivo:** Que map/filter/reduce, destructuring, template literals, etc. sean AUTOMÁTICOS
- **Cómo:** Repetición espaciada, speed challenges, proyectos reales
- **Meta:** Pensar en arquitectura, código fluye sin esfuerzo consciente

### Si te trabás:
1. console.log() estratégicos (ver qué está pasando)
2. Revisar ejemplo resuelto con más atención
3. Dibujar flujo de datos
4. Ver Hint 1 (si >15 min)
5. Ver Hint 2 (si >25 min)
6. Preguntar (si >30 min)

### Reconocimiento de logros:
Al completar cada semana, celebrá:
- ✅ Semana completada = nivel desbloqueado
- ✅ Cada ejercicio = concepto automatizado
- ✅ Cada proyecto = aplicación profesional

**No minimices logros.** Este entrenamiento completa tu dominio de JavaScript CORE a nivel senior.

---

## 📋 NOTAS IMPORTANTES

### Sobre los ejercicios:
- Enfoque en MUSCLE MEMORY (automatización)
- Speed drills opcionales (implementar en X minutos)
- Todos tienen ejemplo resuelto comentado
- Hints conceptuales, NO código completo

### Sobre los proyectos:
- HTML/CSS base se provee cuando necesario
- Te enfocás en el JavaScript
- MVP definido claramente
- Patterns señalados explícitamente
- Conexión con mundo real explicada

### Sobre la automatización:
- Objetivo: Código particular sin esfuerzo consciente
- Método: Práctica intensiva + proyectos reales
- Resultado: Pensar en arquitectura, manos codean automático
- Nivel: Competencia inconsciente (senior)

### Sobre el Knowledge Base:
- Este roadmap es la estructura COMPLETA del entrenamiento
- En nuevos chats, referenciar: "Semana X - Ejercicio Y" o "Semana X - Proyecto"
- El roadmap NO se modifica, es referencia estática
- Para tracking de progreso personal, usar checklist externa

---

## 🎯 OBJETIVO FINAL

Al completar este entrenamiento vas a:

✅ **Dominar JavaScript CORE a nivel senior** (Arrays, Objects, ES6+, DOM, Classes)  
✅ **Código que fluye automático** (lo particular sin pensar)  
✅ **Foco en arquitectura** (lo general en consciencia)  
✅ **Preparación perfecta para React** (va a ser trivial)  
✅ **Confianza total** en JavaScript  
✅ **3 proyectos profesionales** más en portfolio  
✅ **Muscle memory** en transformaciones de datos  
✅ **Decisiones arquitectónicas** correctas  

**Nivel esperado al final:** Senior en JavaScript CORE.

**Este es el ÚLTIMO entrenamiento de JavaScript puro que necesitás antes de frameworks.**

---

## 🚀 PRÓXIMOS PASOS

1. **Revisá este roadmap completo**
2. **Guardalo en el Knowledge Base del proyecto**
3. **Avisame cuando estés listo para empezar**
4. **Comenzaremos con Semana 1 - Warmup (Ejercicio 1)**

---

## 📊 COMPARACIÓN CON ENTRENAMIENTOS ANTERIORES

| Métrica | JS Avanzado | Async JS | JS Essentials (este) |
|---------|-------------|----------|----------------------|
| Duración | 4 semanas | 3 semanas | 2-3 semanas |
| Ejercicios | ~30 | 38 | 40 |
| Proyectos | 4 | 3 | 3 |
| Conceptos | Fundamentals | Async/Event Loop | Arrays/Objects/ES6+/DOM/Classes |
| Aplicación | Base esencial | Todo el tiempo | **TODO EL TIEMPO** |
| Objetivo | Entender fundamentos | Dominar async | **Automatizar código** |

**Este entrenamiento COMPLETA tu arsenal de JavaScript.**

---

## 🌟 SKILLS DESBLOQUEADOS

**Después de este entrenamiento podrás:**
- 🚀 Transformar datos complejos sin pensar (map/filter/reduce automático)
- 🚀 Escribir código moderno ES6+ naturalmente
- 🚀 Manipular DOM eficientemente (performance optimized)
- 🚀 Crear componentes reutilizables (preparación React)
- 🚀 Arquitecturar apps completas (MVC/MVVM)
- 🚀 Decidir cuándo usar Classes vs Factory functions
- 🚀 Aplicar design patterns apropiadamente
- 🚀 Pensar en arquitectura mientras manos codean automático
- 🚀 **Estar LISTO para React** (va a ser fácil)

---

## 💪 GOVERNOR ACTIVO

**Límites estrictos para cada semana:**
- ⏱️ **Warmup:** Máximo 3 días
- ⏱️ **Proyecto:** Máximo 4-5 días
- ✅ **80% funcional = Suficiente para avanzar**
- 📌 **Si llegás al límite → SUBIR lo que tengas y NEXT**

**Frases del Governor:**
```
"Arrays methods fluyen automático? → NEXT semana."
"Entendés los conceptos? → NEXT ejercicio."
"Proyecto al 80%? → SUBIR y avanzar."
"Completaste semana? → CELEBRAR y continuar."
```

---

## 🎯 DESPUÉS DE ESTE ENTRENAMIENTO

**Tendrás dominio completo de:**
- ✅ JavaScript Fundamentals (Scope, Closures, This, Bind)
- ✅ Async JavaScript (Promises, Async/Await, Event Loop, Fetch)
- ✅ **JavaScript CORE** (Arrays, Objects, ES6+, DOM, Classes)

**Total:** ~90% de JavaScript que usás en desarrollo profesional.

**El 10% restante:**
- Features muy avanzadas (Generators, Proxy, etc.)
- APIs específicas del navegador (Web APIs)
- Se aprenden cuando se necesitan (1 vez cada 6 meses)

**Siguiente paso natural:** React → va a ser ridículamente fácil.

---

FIN DEL ROADMAP

**Versión:** 1.0  
**Fecha de creación:** Enero 2026  
**Optimizado para:** Estudiante con dominio de JS Fundamentals + Async JS  
**Formato:** 3 semanas progresivas, 40 ejercicios, 3 proyectos (1 final integrador completo)  
**Duración:** 21 días con 3 horas/día (~63-72 horas totales)  
**Nivel de salida:** Senior en JavaScript CORE  
**Preparación para:** React, Vue, Angular (frameworks van a ser triviales)
