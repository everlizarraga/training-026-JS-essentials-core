/**
**CONSIGNA:**
Implementar sistema completo con **formulario + lista**:
 */

// MODEL
class ProductModel {
  #products = [];
  #nextId = 1;
  #observers = [];

  // TODO: subscribe, notify
  // TODO: add(name, price)
  // TODO: remove(id)
  // TODO: getAll()
  subscribe(callback) {
    if(!callback) {
      throw new Error("Es necesario una callback");
    }
    this.#observers.push(callback);
  }

  notify() {
    this.#observers.forEach(cb => cb());
  }

  add(name, price) {
    if(!name || name === '') {
      throw new Error("Es necesario  el nombre");
    }
    if(name.length < 3) {
      throw new Error("Minimo 3 letras para el nombre");
    }
    if(!price || price < 0) {
      throw new Error("Es necesario un precio valido");
    }
    this.#products.push({
      id: this.#nextId,
      name,
      price
    });
    this.#nextId += 1;
    this.notify();
  }

  remove(id) {
    const target = this.#products.find(p => p.id === Number(id));
    if(!target) {
      throw new Error(`REMOVE: Producto [id:${id}] no encontrado`);
    }
    this.#products = this.#products.filter(p => p.id !== Number(id));
    this.notify();
  }

  getAll() {
    return [...this.#products];
  }
}

// VIEW
class ProductView {
  constructor(formId, listId) {
    // TODO: Guardar referencias DOM
    this.elementForm = document.getElementById(formId);
    this.elementList = document.getElementById(listId);
  }

  // TODO: getFormData() → {name, price}
  // TODO: clearForm()
  // TODO: render(products)
  // TODO: setupFormListener(callback)
  // TODO: setupListListener(callback)
  getFormData() {
    const name = this.elementForm.querySelector('[name="name"]');
    const price = this.elementForm.querySelector('[name="price"]');
    return {
      name: name.value,
      price: Number(price.value)
    }
  }
  
  clearForm() {
    const name = this.elementForm.querySelector('[name="name"]');
    const price = this.elementForm.querySelector('[name="price"]');
    name.value = '';
    price.value = '';
  }

  render(products) {
    this.elementList.innerHTML = 
      products
      .map(p => `<div data-id="${p.id}">Prod: ${p.name} ($${p.price})</div>`)
      .join('');
  }

  setupFormListener(callback) {
    this.elementForm.addEventListener('submit', (e) => {
      e.preventDefault();
      callback();
    })
  }

  setupListListener(callback) {
    this.elementList.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-delete')) {
        const id = Number(e.target.dataset.id);
        callback(id);  // Ejecuta callback del Controller
      }
    });
  }
}

// CONTROLLER
class ProductController {
  constructor(model, view) {
    /**@type {ProductModel} */
    this.model = model;
    /**@type {ProductView} */
    this.view = view;

    // TODO: Suscribirse a model
    // TODO: Setup listeners de view
    // Suscribirse a cambios del model
    this.model.subscribe(() => {
      this.updateView();
    });

    // Setup listeners del view
    this.view.setupFormListener(() => {
      this.addProduct();
    });

    this.view.setupListListener((id) => {
      this.deleteProduct(id);
    });

    // Render inicial
    this.updateView();
  }

  // TODO: addProduct()
  // TODO: deleteProduct(id)
  // TODO: updateView()

  addProduct() {
    try {
      const data = this.view.getFormData();
      this.model.add(data.name, data.price);
      this.view.clearForm();
    } catch (error) {
      alert(`ERROR: ${error.message}`);
    }
  }

  deleteProduct(id) {
    try {
      if (confirm(`¿Eliminar producto ID: ${id}?`)) {
        this.model.remove(id);
        // updateView() se llama automáticamente por Observer
      }
    } catch (error) {
      alert(`ERROR: ${error.message}`);
    }
  }

  updateView() {
    const products = this.model.getAll();
    this.view.render(products);
  }
}

// TESTING:
const model = new ProductModel();
const view = new ProductView('product-form', 'product-list');
const controller = new ProductController(model, view);


