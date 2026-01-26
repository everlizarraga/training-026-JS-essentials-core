/**
**CONSIGNA:**
Crear clase `PasswordManager` con:

**Campos privados:**
- `#masterPassword` (se setea en constructor)
- `#passwords` (objeto vacío inicialmente)

**Métodos públicos:**
- `addPassword(service, password, masterPassword)` → 
  - Verificar masterPassword
  - Si es correcto, guardar en `#passwords[service] = password`
  - Retornar success/error
  
- `getPassword(service, masterPassword)` →
  - Verificar masterPassword
  - Retornar password o error
  
- `listServices(masterPassword)` →
  - Verificar masterPassword
  - Retornar array de servicios (Object.keys)
  
- `changeMasterPassword(oldPassword, newPassword)` →
  - Verificar oldPassword
  - Cambiar a newPassword
 */

class PasswordManager {
  #masterPassword;
  #passwords = {};

  constructor(masterPassword) {
    // TU CÓDIGO
    this.#masterPassword = masterPassword;
  }

  addPassword(service, password, masterPassword) {
    // TU CÓDIGO: Verificar master, guardar, retornar mensaje
    if(masterPassword !== this.#masterPassword) return "Error en masterPassword"
    this.#passwords[service] = password;
    return "Success";
  }
  
  getPassword(service, masterPassword) {
    // TU CÓDIGO
    if(masterPassword !== this.#masterPassword) return "Error en masterPassword";
    if(!this.#passwords[service]) return "Error. Serivicio no encontrado";
    return this.#passwords[service];
  }
  
  listServices(masterPassword) {
    // TU CÓDIGO
    if(masterPassword !== this.#masterPassword) return null;
    return Object.keys(this.#passwords);
  }
  
  changeMasterPassword(oldPassword, newPassword) {
    // TU CÓDIGO
    if(oldPassword !== this.#masterPassword) return;
    this.#masterPassword = newPassword;
  }
}

// TESTING:
const pm = new PasswordManager('master123');

console.log(pm.addPassword('gmail', 'pass123', 'master123'));    // "Password guardado"
console.log(pm.addPassword('github', 'gitpass', 'wrong'));       // "Master password incorrecto"

console.log(pm.getPassword('gmail', 'master123'));               // "pass123"
console.log(pm.getPassword('gmail', 'wrong'));                   // "Master password incorrecto"

console.log(pm.listServices('master123'));                       // ['gmail']

pm.changeMasterPassword('master123', 'newmaster');
console.log(pm.getPassword('gmail', 'newmaster'));               // "pass123"
