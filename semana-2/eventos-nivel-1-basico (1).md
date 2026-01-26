# 🎓 EVENTOS CUSTOM - NIVEL 1: BÁSICO

**Objetivo:** Entender EventEmitter desde cero.

**Enfoque:** Qué es, cómo funciona `.emit()` y `.on()`, y quién hace qué.

---

## 📚 ¿Qué vas a aprender?

En este **Nivel 1** vas a entender:
- ✅ Qué es EventEmitter
- ✅ Cómo funciona `.emit()` (disparar evento)
- ✅ Cómo funciona `.on()` (escuchar evento)
- ✅ Una Card que emite eventos cuando la clickean
- ✅ Múltiples listeners escuchando el mismo evento

---

## 🧠 CONCEPTO FUNDAMENTAL

### **¿Qué es EventEmitter?**

Es un **sistema de notificaciones** que permite que un objeto le avise a otros cuando algo pasa.

**Analogía:** Es como un **timbre de casa**:
- Casa: `this.emit('timbre-sonando')` ← Avisa que sonó
- Tú adentro: `casa.on('timbre-sonando', () => abrir())` ← Reaccionas cuando suena

---

## 📊 DIAGRAMA SIMPLE

```
COMPONENTE (Card):
  ├─ Tiene EventEmitter
  │
  ├─ Cuando pasa algo importante:
  │    this.emit('evento', datos)  ← NOTIFICA
  │
  └─ Otros escuchan:
       card.on('evento', (datos) => { ... })  ← REACCIONAN
```

**Regla de oro:**
- **El que HACE algo** → `.emit()` (notifica)
- **El que REACCIONA** → `.on()` (escucha)

---

## 💻 CÓDIGO: EventEmitter Base

```javascript
// ============================================
// EVENT EMITTER - La base de todo
// ============================================

class EventEmitter {
  constructor() {
    // Objeto que guarda eventos y sus callbacks
    // Estructura: { 'nombre-evento': [callback1, callback2, ...] }
    this.events = {};
  }
  
  /**
   * on() - ESCUCHAR un evento
   * @param {string} event - Nombre del evento
   * @param {Function} callback - Función a ejecutar
   */
  on(event, callback) {
    // Si el evento no existe, crear array vacío
    if (!this.events[event]) {
      this.events[event] = [];
    }
    
    // Agregar el callback al array
    this.events[event].push(callback);
    
    console.log(`✅ Listener agregado para: "${event}"`);
  }
  
  /**
   * emit() - DISPARAR un evento
   * @param {string} event - Nombre del evento
   * @param {*} data - Datos a pasar a los callbacks
   */
  emit(event, data) {
    // Si nadie escucha este evento, no hacer nada
    if (!this.events[event]) {
      console.log(`⚠️  Evento "${event}" disparado pero nadie escucha`);
      return;
    }
    
    console.log(`🔔 Disparando evento: "${event}"`, data);
    
    // Ejecutar TODOS los callbacks registrados
    this.events[event].forEach((callback, index) => {
      console.log(`  └─ Ejecutando callback #${index + 1}`);
      callback(data);
    });
  }
  
  /**
   * off() - DEJAR de escuchar un evento
   * @param {string} event - Nombre del evento
   * @param {Function} callback - Callback a remover
   */
  off(event, callback) {
    if (!this.events[event]) return;
    
    // Filtrar el callback que queremos remover
    this.events[event] = this.events[event].filter(cb => cb !== callback);
    
    console.log(`❌ Listener removido del evento: "${event}"`);
  }
}
```

**Explicación:**
- `this.events = {}` → Guarda todos los eventos y sus listeners
- `.on(evento, callback)` → Agrega un listener a la lista
- `.emit(evento, data)` → Ejecuta TODOS los listeners de ese evento
- `.off(evento, callback)` → Remueve un listener

---

## 📦 CÓDIGO: Card Simple (Primer Ejemplo)

```javascript
// ============================================
// CARD - Componente que USA EventEmitter
// ============================================

class Card extends EventEmitter {
  constructor(data) {
    super();  // ← MUY IMPORTANTE: Llama constructor de EventEmitter
    
    this.data = data;  // { title, description, etc. }
    this.element = null;
  }
  
  /**
   * Renderiza la card (simplificado)
   */
  render() {
    // Crear elemento DOM (simplificado, sin HTML)
    this.element = document.createElement('div');
    this.element.className = 'card';
    this.element.textContent = this.data.title;
    
    // Event listener del botón (click del usuario)
    this.element.addEventListener('click', () => {
      this.handleClick();  // Llamar método
    });
    
    return this.element;
  }
  
  /**
   * Método que se ejecuta cuando hacen click
   * AQUÍ EMITIMOS EL EVENTO
   */
  handleClick() {
    console.log('🖱️  Click en la card:', this.data.title);
    
    // ⭐ EMITIR evento personalizado
    this.emit('card-clicked', this.data);
    //   ↑         ↑              ↑
    //   |         |              └─ Datos que enviamos
    //   |         └─ Nombre del evento (lo decides tú)
    //   └─ Método heredado de EventEmitter
  }
}
```

**¿Qué hace Card?**
1. Hereda de EventEmitter (`extends EventEmitter`)
2. Cuando la clickean → ejecuta `handleClick()`
3. `handleClick()` → emite evento `'card-clicked'` con sus datos
4. Card NO sabe quién escucha (desacoplado)

---

## 📝 EJEMPLO 1: Lo Más Básico (1 Card, 1 Listener)

```javascript
// ============================================
// EJEMPLO 1: UNA CARD, UN LISTENER
// ============================================

console.log('━━━ EJEMPLO 1: Básico ━━━\n');

// PASO 1: Crear la card
const card1 = new Card({
  title: 'Card 1',
  description: 'Primera card de prueba'
});

// PASO 2: ESCUCHAR el evento (ANTES de hacer click)
card1.on('card-clicked', (data) => {
  //  ↑         ↑            ↑
  //  |         |            └─ Datos recibidos (los que envió emit)
  //  |         └─ Nombre del evento (igual que en emit)
  //  └─ Método .on() heredado de EventEmitter
  
  console.log('📬 Recibí el evento! Datos:', data);
  alert(`Card clickeada: ${data.title}`);
});

// PASO 3: Renderizar en el DOM (simplificado)
document.body.append(card1.render());
```

**Flujo completo:**
```
1. Usuario hace click en card
   ↓
2. Se ejecuta handleClick()
   ↓
3. handleClick() hace: this.emit('card-clicked', data)
   ↓
4. EventEmitter busca quién escucha 'card-clicked'
   ↓
5. Ejecuta el callback que registramos con .on()
   ↓
6. Vemos el alert!
```

---

## 📝 EJEMPLO 2: Una Card, Múltiples Listeners

```javascript
// ============================================
// EJEMPLO 2: UNA CARD, VARIOS ESCUCHANDO
// ============================================

console.log('\n━━━ EJEMPLO 2: Múltiples Listeners ━━━\n');

// Crear card
const card2 = new Card({
  title: 'Card 2',
  description: 'Card con múltiples listeners'
});

// LISTENER 1: Mostrar en consola
card2.on('card-clicked', (data) => {
  console.log('📋 Listener 1: Log en consola', data);
});

// LISTENER 2: Actualizar contador
let clickCount = 0;
card2.on('card-clicked', (data) => {
  clickCount++;
  console.log(`🔢 Listener 2: Contador = ${clickCount}`);
});

// LISTENER 3: Cambiar color (ejemplo conceptual)
card2.on('card-clicked', (data) => {
  console.log('🎨 Listener 3: Color cambiado');
});

// Renderizar
document.body.append(card2.render());
```

**IMPORTANTE:**
- Cuando hacés click → se ejecutan LOS 3 callbacks en orden
- Cada callback recibe los MISMOS datos
- Todos escuchan el MISMO evento: `'card-clicked'`

---

## 📝 EJEMPLO 3: Múltiples Cards, Un Manejador

```javascript
// ============================================
// EJEMPLO 3: VARIAS CARDS, UN MANEJADOR CENTRAL
// ============================================

console.log('\n━━━ EJEMPLO 3: Manejador Central ━━━\n');

// Datos de las cards
const cardsData = [
  { title: 'Card A', description: 'Primera card' },
  { title: 'Card B', description: 'Segunda card' },
  { title: 'Card C', description: 'Tercera card' }
];

// FUNCIÓN MANEJADORA (se reutiliza para todas las cards)
function handleCardClick(cardData) {
  console.log(`✓ ${cardData.title} clickeada`);
}

// Crear las 3 cards
cardsData.forEach((data) => {
  const card = new Card(data);
  
  // TODAS las cards usan el MISMO manejador
  card.on('card-clicked', handleCardClick);
  //                       ↑
  //                       └─ Misma función para todas
  
  document.body.append(card.render());
});
```

**Patrón:**
- Útil cuando querés que TODAS las cards hagan lo mismo al ser clickeadas
- No duplicás código
- Fácil de mantener

---

## 🔄 FLUJO PASO A PASO DETALLADO

### **PASO 1: Crear Card**
```javascript
const card = new Card({ title: 'Mi Card' });
```

### **PASO 2: Registrar listener**
```javascript
card.on('card-clicked', (data) => {
  console.log('Clickeada!', data);
});
```

**Lo que pasa internamente:**
```javascript
// Dentro de EventEmitter.on():
if (!this.events['card-clicked']) {
  this.events['card-clicked'] = [];  // Crear array vacío
}
this.events['card-clicked'].push(callback);  // Agregar callback

// Ahora this.events = {
//   'card-clicked': [callback]
// }
```

### **PASO 3: Usuario hace click**
```javascript
// Usuario: 🖱️ click en <div class="card">
```

### **PASO 4: Card emite evento**
```javascript
// En Card.handleClick():
this.emit('card-clicked', this.data);
```

**Lo que pasa internamente:**
```javascript
// Dentro de EventEmitter.emit():

// 1. Verificar si hay listeners
if (!this.events['card-clicked']) return;

// 2. Ejecutar TODOS los callbacks
this.events['card-clicked'].forEach(callback => {
  callback(this.data);  // Ejecutar con los datos
});
```

### **PASO 5: Se ejecuta el callback**
```javascript
// El callback que registramos se ejecuta:
(data) => {
  console.log('Clickeada!', data);  // ← SE EJECUTA ESTO
}
```

---

## 🎓 RESUMEN

### **1. EventEmitter tiene 3 métodos:**

```javascript
// ESCUCHAR un evento
objeto.on('nombre-evento', (datos) => {
  // Código que se ejecuta cuando ocurre el evento
});

// DISPARAR un evento
objeto.emit('nombre-evento', datos);

// DEJAR de escuchar
objeto.off('nombre-evento', callback);
```

---

### **2. Patrón básico:**

```javascript
// COMPONENTE (Card):
class Card extends EventEmitter {
  handleClick() {
    this.emit('card-clicked', this.data);  // ← EMITE
  }
}

// USO (App/Otro componente):
const card = new Card(data);

card.on('card-clicked', (data) => {  // ← ESCUCHA
  // Hacer algo con los datos
});
```

---

### **3. Reglas claras:**

| Método | Quién lo usa | Cuándo | Qué hace |
|--------|--------------|--------|----------|
| `.emit()` | El componente que HACE algo | Cuando pasa algo importante | Notifica a TODOS los que escuchan |
| `.on()` | El componente que REACCIONA | Al inicializar | Se registra para recibir notificaciones |
| `.off()` | El componente que REACCIONA | Al destruir | Deja de recibir notificaciones |

---

### **4. Analogías:**

**EventEmitter = Lista de correo**
- `.on()` = Suscribirse a la lista
- `.emit()` = Enviar email a TODOS los suscriptores
- `.off()` = Desuscribirse

**EventEmitter = Alarma de casa**
- `.on()` = Configurar qué hacer cuando suene
- `.emit()` = Activar la alarma
- `.off()` = Desactivar la alarma

---

## ✅ BUENAS PRÁCTICAS

### **1. Nombres de eventos descriptivos:**

```javascript
// ✅ BIEN: Nombres claros
this.emit('card-clicked', data);
this.emit('user-logged-in', user);
this.emit('modal-opened', content);

// ❌ MAL: Nombres confusos
this.emit('click', data);
this.emit('event', user);
this.emit('x', content);
```

---

### **2. Siempre emitir con datos:**

```javascript
// ✅ BIEN: Siempre enviar datos
this.emit('card-clicked', this.data);
this.emit('button-clicked', { timestamp: Date.now() });

// ❌ MAL: Emit sin datos
this.emit('card-clicked');  // ¿Qué card fue clickeada?
```

---

### **3. Registrar listeners ANTES de que puedan dispararse:**

```javascript
// ✅ BIEN: Registrar ANTES de renderizar
const card = new Card(data);
card.on('card-clicked', handleClick);  // ← Primero registrar
card.render();                          // ← Después renderizar

// ❌ MAL: Renderizar antes de registrar
const card = new Card(data);
card.render();                          // ← Primero renderizar
card.on('card-clicked', handleClick);  // ← Después registrar (puede perder eventos)
```

---

### **4. Limpiar listeners al destruir:**

```javascript
class Card extends EventEmitter {
  destroy() {
    // Limpiar del DOM
    this.element?.remove();
    
    // Limpiar TODOS los listeners
    this.events = {};
    
    console.log('Card destruida y limpiada');
  }
}
```

---

## 🎯 EJERCICIO PARA PRACTICAR

**Desafío:** Crear una card que:
1. Tenga un botón "Like"
2. Emita evento `'card-liked'` cuando se hace click
3. Un listener actualice un contador global
4. Otro listener muestre en consola

```javascript
// TU TURNO: Completa este código

class LikeCard extends EventEmitter {
  constructor(data) {
    super();
    this.data = data;
  }
  
  render() {
    this.element = document.createElement('div');
    this.element.innerHTML = `
      <h3>${this.data.title}</h3>
      <button>❤️ Like</button>
    `;
    
    // TODO: Agregar event listener al botón
    // TODO: Cuando se hace click, this.emit('card-liked', this.data)
    
    return this.element;
  }
}

// Crear la card
const likeCard = new LikeCard({ title: 'Mi Post' });

// TODO: Escuchar el evento 'card-liked'
// TODO: Actualizar contador de likes
// TODO: Mostrar mensaje en consola

// Renderizar
document.body.append(likeCard.render());
```

---

## 📝 RESUMEN FINAL

**Lo que dominaste:**
- ✅ Qué es EventEmitter
- ✅ `.emit()` para NOTIFICAR
- ✅ `.on()` para ESCUCHAR
- ✅ Un componente puede tener múltiples listeners
- ✅ Múltiples componentes pueden usar el mismo manejador
- ✅ Buenas prácticas básicas

**Patrón básico:**
```
El que HACE algo → .emit()
El que REACCIONA → .on()
```

---

## 🚀 PRÓXIMO NIVEL

**En el Nivel 2 (INTERMEDIO) vas a aprender:**
- Comunicación entre Card y Modal (padre-hijo)
- Quién emite y quién escucha (más claro)
- Sistema de 2 componentes comunicándose
- App como coordinador

**¿Listo para el Nivel 2? Estudiá este nivel primero y cuando estés seguro, pedime el Nivel 2.** 💪

---

**FIN NIVEL 1**
