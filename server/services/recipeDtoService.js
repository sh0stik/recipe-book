const recipeService = require('./recipeService');
const ingredientService = require('./ingredientService');
const RecipeDto = require('../dto/recipeDTO');

const getRecipe = async (recipe_id) => {
    const recipe = await recipeService.getRecipeById(recipe_id);
    const ingredients = await ingredientService.getIngredientsByRecipeId(recipe_id);
    return RecipeDto.fromRecipe(recipe, ingredients);
}

const addRecipe = async (recipeDto) => {
    const recipeFromDto = new RecipeDto(
        recipeDto.recipe_id,
        recipeDto.recipe_name,
        recipeDto.recipe_description,
        recipeDto.recipe_instructions,
        recipeDto.ingredients
    );
    console.log(recipeFromDto);
    const recipe = await recipeService.addRecipe(recipeFromDto.recipe_name, recipeFromDto.recipe_description, recipeFromDto.recipe_instructions);
    const recipeId = recipe.recipe_id;
    for (const ingredient of recipeFromDto.ingredients) {
        await ingredientService.addIngredient(recipeId, ingredient.ingredient_name, ingredient.quantity, ingredient.units);
    }
}

const updateRecipe = async (recipeDto) => {
    const recipeFromDto = new RecipeDto(
        recipeDto.recipe_id,
        recipeDto.recipe_name,
        recipeDto.recipe_description,
        recipeDto.recipe_instructions,
        recipeDto.ingredients
    );
    const recipe = await recipeService.updateRecipe(recipeFromDto.recipe_id, recipeFromDto.recipe_name, recipeFromDto.recipe_description, recipeFromDto.recipe_instructions);
    console.log(recipe);
    const ingredients = await Promise.all(recipeFromDto.ingredients.map(async (ingredient) => {
        await ingredientService.updateIngredient(ingredient.ingredient_id, recipeFromDto.recipe_id, ingredient.ingredient_name, ingredient.quantity, ingredient.units);
        return ingredient;
    }));
     return RecipeDto.fromRecipe(recipe, ingredients);
}

const getRecipes = async () => {
    return await recipeService.getRecipes();
}

const deleteRecipe = async (recipe_id) => {
    const ingredients = await ingredientService.getIngredientsByRecipeId(recipe_id);
    for (const ingredient of ingredients) {
        await ingredientService.deleteIngredient(ingredient.ingredient_id);
    }
    await recipeService.deleteRecipe(recipe_id);
}

module.exports = {
    getRecipe,
    addRecipe,
    updateRecipe,
    getRecipes,
    deleteRecipe
};