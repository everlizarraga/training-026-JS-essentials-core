// MODEL
class UserModel {
  // TODO: #users, add(name), getAll(), validar
  #users = [];

  add(name) {
    if(!name || name === '') {
      throw new Error("Es neceario un nombre");
    }
    if(name.length < 3) {
      throw new Error("Minimo 3 cracteres para el nombre");
    }
    this.#users.push(name);
  }
}

// VIEW
class UserView {
  // TODO: render(users), showError(message)
  render(user) {
    console.log("USER:", user);
  }

  showError(message) {
    console.error("ERROR:", message);
  }
}

// CONTROLLER
class UserController {
  // TODO: addUser(name), updateView()
  #mdoel;
  #view;
  constructor(model, view) {
    this.#mdoel = model;
    this.#view = view;
  }

  addUser(name) {
    try {
      this.#mdoel.add(name);
      this.#view.render(name);
    } catch (error) {
      this.#view.showError(error.message);
    }
  }
}

// TESTING:
const model = new UserModel();
// const view = new UserView(document.getElementById('user-list'));
const view = new UserView();
const controller = new UserController(model, view);

controller.addUser('Juan');      // Agrega y renderiza
controller.addUser('AB');         // Muestra error


