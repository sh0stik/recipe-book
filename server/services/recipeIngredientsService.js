const { Recipe, RecipeIngredients } = require('../models');
const Ingredient = require('../models/ingredient');

const addQuantity = async (recipe_id, ingredient_id, quantity) => { 
    const recipeIngredient = await RecipeIngredients.create({ recipe_id, ingredient_id, quantity });
    return recipeIngredient;
}

const updateQuantity = async (recipe_ingredient_id, recipe_id, ingredient_id, quantity) => {
    await RecipeIngredients.update({ recipe_id, ingredient_id, quantity }, { where: { recipe_ingredient_id } });
}

const deleteRecipeIngredient = async (recipe_ingredient_id) => {
    await RecipeIngredients.destroy({ where: { recipe_ingredient_id } });
}

const getRecipeIngredientById = async (recipe_ingredient_id) => {
    const recipeIngredient = await RecipeIngredients.findByPk(recipe_ingredient_id);
    return recipeIngredient;
}

const getRecipeIngredients = async () => {
    const recipeIngredients = await RecipeIngredients.findAll();
    return recipeIngredients;
}

const getIngredientsAndQuantityByRecipeId = async (recipe_id) => {
    const recipeIngredients = await RecipeIngredients.findAll({
        where: { recipe_id },
        attributes: ['ingredient_id', 'quantity']
    });
    return recipeIngredients;
}

module.exports = {
    addQuantity,
    updateQuantity,
    deleteRecipeIngredient,
    getRecipeIngredientById,
    getRecipeIngredients,
    getIngredientsAndQuantityByRecipeId
};


