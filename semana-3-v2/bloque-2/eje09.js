/**
**CONSIGNA:**
El siguiente código usa funciones pero DEBERÍA usar clase. **Refactorizá a clase:**
 */

// ============================================
// CÓDIGO ORIGINAL (funciones - no óptimo)
// ============================================

let playerName = '';
let playerScore = 0;
let playerLevel = 1;

function setName(name) {
  playerName = name;
}

function addScore(points) {
  playerScore += points;
  if (playerScore >= 100) {
    levelUp();
  }
}

function levelUp() {
  playerLevel++;
  playerScore = 0;
  console.log(`¡Nivel ${playerLevel}!`);
}

function getStats() {
  return {
    name: playerName,
    score: playerScore,
    level: playerLevel
  };
}

// Problema: Solo un jugador posible (estado global)
class Player {
  // TU CÓDIGO: Implementar con campos privados
  #playerName = '';
  #playerScore = 0;
  #playerLevel = 1;

  constructor(name) {
    this.setName(name);
  }

  setName(name) {
    this.#playerName = name;
  }

  addScore(points) {
    this.#playerScore += points;
    if(this.#playerScore >= 100) this.levelUp();
  }

  levelUp() {
    this.#playerLevel += 1;
    this.#playerScore = this.#playerScore -100;
    console.log(`¡Nivel ${this.#playerLevel}!`);
  }

  getStats() {
    return {
      name: this.#playerName,
      score: this.#playerScore,
      level: this.#playerLevel
    }
  }
}

// TESTING:
const player1 = new Player('Juan');
player1.addScore(50);
player1.addScore(60);  // Debería subir a nivel 2
console.log(player1.getStats());  // { name: 'Juan', score: 10, level: 2 }

const player2 = new Player('María');
player2.addScore(30);
console.log(player2.getStats());  // { name: 'María', score: 30, level: 1 }
