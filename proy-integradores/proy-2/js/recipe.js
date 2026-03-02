// ============================================
// RECIPE (modelo de datos)
// ============================================

export class Recipe {
  /**
   * @param {string} id - ID único (para API o custom)
   * @param {string} name - Nombre de la receta
   * @param {string} category - Categoría
   * @param {string} image - URL de la imagen
   * @param {string[]} ingredients - Array de ingredientes con medidas
   * @param {string} instructions - Instrucciones
   * @param {'api'|'custom'} source - 'api' o 'custom'
   */
  constructor(id, name, category, image, ingredients, instructions, source = 'api') {
    // TODO: Asignar propiedades
    this.id = id;
    this.name = name;
    this.category = category;
    this.image = image;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.source = source;
  }

  /**
   * Recipe → objeto plano (para localStorage)
   */
  toJSON() {
    // TODO: Retornar objeto con todas las propiedades
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      image: this.image,
      ingredients: this.ingredients,
      instructions: this.instructions,
      source: this.source
    };
  }

  /**
   * Objeto plano → Recipe (desde localStorage)
   */
  static fromJSON(json) {
    // TODO: Crear Recipe desde objeto
    return new Recipe(
      json.id,
      json.name,
      json.category,
      json.image,
      json.ingredients,
      json.instructions,
      json.source
    );
  }

  /**
   * Meal de la API → Recipe
   * IMPORTANTE: Combinar strIngredient1...20 y strMeasure1...20
   * @param {Object} meal - Objeto de la API TheMealDB
   * @returns {Recipe}
   */
  static fromAPI(meal) {
    // TODO: Crear Recipe desde estructura de TheMealDB
    // HINT: Iterar de 1 a 20 para combinar ingredientes
    //
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure} ${ingredient}`.trim());
      }
    }

    return new Recipe(
      meal.idMeal,
      meal.strMeal,
      meal.strCategory,
      meal.strMealThumb,
      ingredients,
      meal.strInstructions,
      'api'
    );
  }
}
