// ============================================
// LAZY IMAGE COMPONENT
// ============================================

/**
 * LazyImage Component
 * Imagen con lazy loading usando IntersectionObserver
 * 
 * @example
 * const lazyImg = new LazyImage({
 *   src: 'imagen-real.jpg',
 *   placeholder: 'placeholder.jpg',
 *   alt: 'Descripción'
 * });
 * 
 * container.append(lazyImg.render());
 */
export class LazyImage {
  constructor(options) {
    this.options = {
      src: '',
      // placeholder: 'https://via.placeholder.com/400x300',
      placeholder: 'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg',
      alt: '',
      className: '',
      ...options
    };
    
    this.element = null;
    this.observer = null;
    this.isLoaded = false;
  }
  
  /**
   * Renderiza el componente y retorna el elemento
   * @returns {HTMLImageElement}
   */
  render() {
    // Crear elemento img
    this.element = document.createElement('img');
    
    // Configurar atributos
    this.element.src = this.options.placeholder;  // Placeholder inicial
    this.element.dataset.src = this.options.src;  // Imagen real guardada
    this.element.alt = this.options.alt;
    this.element.className = `lazy-image lazy ${this.options.className}`.trim();
    
    // Configurar IntersectionObserver
    this.setupObserver();
    
    return this.element;
  }
  
  /**
   * Configura el IntersectionObserver
   */
  setupObserver() {
    // Opciones del observer
    const options = {
      root: null,           // viewport
      rootMargin: '50px',   // Cargar 50px antes de ser visible
      threshold: 0.1        // 10% visible = trigger
    };
    
    // Crear observer
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // TODO: Si la imagen es visible, cargar
        // Hint: if (entry.isIntersecting && !this.isLoaded) { this.load(); }
        if(entry.isIntersecting && !this.isLoaded) {
          this.load();
        }
      });
    }, options);
    
    // Observar el elemento
    this.observer.observe(this.element);
  }
  
  /**
   * Carga la imagen real
   */
  load() {
    // TODO: Cambiar src al src real
    // Hint: this.element.src = this.element.dataset.src;
    this.element.src = this.element.dataset.src;
    
    // TODO: Remover clase 'lazy'
    // Hint: this.element.classList.remove('lazy');
    this.element.classList.remove('lazy');
    
    // TODO: Agregar clase 'loaded'
    // Hint: this.element.classList.add('loaded');
    this.element.classList.add('loaded');
    
    // TODO: Marcar como cargada
    // Hint: this.isLoaded = true;
    this.isLoaded = true;
    
    // TODO: Dejar de observar (ya se cargó)
    // Hint: this.observer.disconnect();
    this.observer.disconnect();
    
    // Limpiar dataset
    delete this.element.dataset.src;
  }
  
  /**
   * Destruye el componente
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}

