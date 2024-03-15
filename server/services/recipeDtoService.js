const recipeService = require('./recipeService');
const ingredientService = require('./ingredientService');
const recipeIngredientService = require('./recipeIngredientsService');
const RecipeDto = require('../dto/recipeDTO');

const getRecipe = async (recipe_id) => {
    const recipe = await recipeService.getRecipeById(recipe_id);
    const recipeIngredients = await recipeIngredientService.getIngredientsAndQuantityByRecipeId(recipe_id);
    const ingredients = await Promise.all(recipeIngredients.map(recipeIngredient => ingredientService.getIngredientById(recipeIngredient.ingredient_id)));

    return RecipeDto.fromRecipe(recipe, ingredients, recipeIngredients);
}

const addOrUpdateRecipe = async (recipeDto) => {
    if (await checkIfRecipeExists(recipeDto.recipe_id) === true) {
        await recipeService.updateRecipe(recipeDto.recipe_id, recipeDto.name, recipeDto.description, recipeDto.instructions);
        await addOrUpdateIngrediensAndQuantity(recipeDto);
    } else {
        await recipeService.addRecipe(recipeDto.name, recipeDto.description, recipeDto.instructions);
        await addOrUpdateIngrediensAndQuantity(recipeDto);
    }
}

const getRecipes = async () => {
    let recipes = [];
    let recipesFromDb = await recipeService.getRecipes();
    let recipeIds = recipesFromDb.map(recipe => recipe.recipe_id);
    for (let recipe_id of recipeIds) {
        let recipe = await getRecipe(recipe_id);
        recipes.push(recipe);
    }
    return recipes;
}

const deleteRecipe = async (recipe_id) => {
    const recipeIngredientsIds = await recipeIngredientService.getIngredientsAndQuantityByRecipeId(recipe_id).map(recipeIngredient => recipeIngredient.recipe_ingredient_id);
    await recipeIngredientsIds.forEach(async recipeIngredientId => {
        await recipeIngredientService.deleteRecipeIngredient(recipeIngredientId);
    });
    await recipeService.deleteRecipe(recipe_id);
}
const checkIfRecipeExists = async (recipe_id) => {
    const recipe = await recipeService.getRecipeById(recipe_id);
    return recipe !== null;
}

const checkIfIngredientExists = async (ingredient_id) => {
    const ingredient = await ingredientService.getIngredientById(ingredient_id);
    return ingredient !== null;
}

const addOrUpdateIngrediensAndQuantity = async (recipeDto) => {
    recipeDto.ingredients.forEach(async ingredientDto => {
        if (await checkIfIngredientExists(ingredientDto.ingredientId) === false) {
            await ingredientService.addIngredient(ingredientDto.ingredientName, ingredientDto.quantity);
            const ingredient = await ingredientService.getIngredientByName(ingredientDto.ingredientName);
            await recipeIngredientService.addQuantity(recipeDto.recipeId, ingredient.ingredientId, ingredientDto.quantity);
        }
        else {
            await ingredientService.updateIngredient(ingredientDto.ingredientId, ingredientDto.ingredientName, ingredientDto.quantity);
            const recipeIngredients = await recipeIngredientService.getIngredientsAndQuantityByRecipeId(recipeDto.recipeId);
            recipeIngredients.forEach(async recipeIngredient => {
                if (recipeIngredient.ingredientId === ingredientDto.ingredientId) {
                    await recipeIngredientService.updateQuantity(recipeIngredient.recipeIngredientId, recipeDto.recipeId, ingredientDto.ingredientId, ingredientDto.quantity);
                }
            });
        }
    });
}

// const addOrUpdateIngrediensAndQuantity = async (recipeDto) => {
//     for (const ingredientDto of recipeDto.ingredients) {
//         if (await checkIfIngredientExists(ingredientDto.ingredient_id) === false) {
//             await ingredientService.addIngredient(ingredientDto.ingredient_name, ingredientDto.quantity);
//             const ingredient = await ingredientService.getIngredientByName(ingredientDto.ingredient_name);
//             await recipeIngredientService.addQuantity(recipeDto.recipe_id, ingredient.ingredient_id, ingredientDto.quantity);
//         }
//         else {
//             await ingredientService.updateIngredient(ingredientDto.ingredient_id, ingredientDto.ingredient_name, ingredientDto.quantity);
//             const recipeIngredients = await recipeIngredientService.getIngredientsAndQuantityByRecipeId(recipeDto.recipe_id);
//             console.log('recipeIngredients:', recipeIngredients);
//             let recipeIngredientId;
//             for (const recipeIngredient of recipeIngredients) {
//                 console.log('Checking recipeIngredient.ingredient_id:', recipeIngredient.ingredient_id);
//                 if (recipeIngredient.ingredient_id === ingredientDto.ingredient_id) {
//                     recipeIngredientId = recipeIngredient.recipeIngredientId;
//                     console.log('Match found, recipeIngredientId set to:', recipeIngredientId);
//                     break;
//                 }
//             }
//             if (recipeIngredientId) {
//                 console.log('Updating quantity for recipeIngredientId:', recipeIngredientId);
//                 await recipeIngredientService.updateQuantity(recipeIngredientId, recipeDto.recipe_id, ingredientDto.ingredient_id, ingredientDto.quantity);
//             } else {
//                 console.log('No match found for ingredient_id:', ingredientDto.ingredient_id);
//             }
//         }
//     }
// }

module.exports = {
    getRecipe,
    addOrUpdateRecipe,
    getRecipes,
    deleteRecipe
};