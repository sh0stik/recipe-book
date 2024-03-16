const { Ingredient } = require('../models');

const addIngredient = async (recipe_id, ingredient_name, quantity, units) => {
    const ingredient = await Ingredient.create({ recipe_id, ingredient_name, quantity, units });
    return ingredient;
}

const updateIngredient = async (ingredient_id, recipe_id, ingredient_name, quantity, units) => {
    await Ingredient.update({ recipe_id, ingredient_name, quantity, units }, { where: { ingredient_id } });
}

const deleteIngredient = async (ingredient_id) => {
    await Ingredient.destroy({ where: { ingredient_id } });
}

const getIngredientById = async (ingredient_id) => {
    const ingredient = await Ingredient.findByPk(ingredient_id);
    return ingredient;
}

const getIngredients = async () => {
    const ingredients = await Ingredient.findAll();
    return ingredients;
}

const getIngredientsByRecipeId = async (recipe_id) => {
    const ingredients = await Ingredient.findAll({ where: { recipe_id } });
    return ingredients;
}

module.exports = {
    addIngredient,
    updateIngredient,
    deleteIngredient,
    getIngredientById,
    getIngredients,
    getIngredientsByRecipeId
};