class RecipeDTO {
    recipe_id;
    recipe_name;
    recipe_description;
    recipe_instructions;
    ingredients;
    
    constructor(recipe_id, recipe_name, recipe_description, recipe_instructions, ingredients) {
        this.recipe_id = recipe_id;
        this.recipe_name = recipe_name;
        this.recipe_description = recipe_description;
        this.recipe_instructions = recipe_instructions;
        this.ingredients = ingredients;
    }

    static fromRecipe(recipe, ingredients, recipeIngredients) {
        return new RecipeDTO(
            recipe.recipe_id,
            recipe.recipe_name,
            recipe.recipe_description,
            recipe.recipe_instructions,
            ingredients.map((ingredient, index) => ({
                ingredient_id: ingredient.ingredient_id,
                quantity: recipeIngredients[index].quantity,
                units: ingredient.units,
                ingredient_name: ingredient.ingredient_name
            }))
        );
    }
}

module.exports = RecipeDTO;