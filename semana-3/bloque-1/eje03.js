/**
**CONSIGNA:**
Crear clase `User` con:

**Métodos de instancia:**
- Constructor: `username`, `email`, `role` ('user' por defecto)
- `isAdmin()` → retorna true si role es 'admin'

**Métodos estáticos:**
- `createAdmin(username, email)` → Retorna instancia con role 'admin'
- `createGuest()` → Retorna instancia con username 'Guest', email '', role 'guest'
- `validateEmail(email)` → Retorna true si email contiene '@'
- Propiedad estática `ROLES` → Array con roles válidos: ['admin', 'user', 'guest']
 */

class User {
  // Propiedad estática
  static ROLES = ['admin', 'user', 'guest'];// TU CÓDIGO

  constructor(username, email, role = 'user') {
    // TU CÓDIGO
    this.username = username;
    this.email = email;
    this.role = User.ROLES.includes(role)? role : 'user';
  }

  isAdmin() {
    // TU CÓDIGO
    return this.role === 'admin';
  }

  // Factory method estático
  static createAdmin(username, email) {
    // TU CÓDIGO: Retornar new User(username, email, 'admin')
    return new User(username, email, 'admin');
  }

  static createGuest() {
    // TU CÓDIGO
    return new User('Guest', '', 'guest');
  }

  static validateEmail(email) {
    // TU CÓDIGO: Retornar email.includes('@')
    return email.includes('@');
  }
}

// TESTING:
const admin = User.createAdmin('John', 'john@example.com');
console.log(admin.isAdmin());           // true
console.log(admin.role);                // 'admin'

const guest = User.createGuest();
console.log(guest.username);            // 'Guest'
console.log(guest.role);                // 'guest'

console.log(User.validateEmail('test@example.com'));  // true
console.log(User.validateEmail('invalid'));           // false
console.log(User.ROLES);                // ['admin', 'user', 'guest']
