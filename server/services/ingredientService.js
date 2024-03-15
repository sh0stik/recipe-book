const Ingredient = require('../models/ingredient');

const addIngredient = async (ingredient_name, units) => {
    const ingredient = await Ingredient.create({ ingredient_name, units });
    return ingredient;
}

const updateIngredient = async (ingredient_id, ingredient_name, units) => {
    await Ingredient.update({ ingredient_name, units }, { where: { ingredient_id } });
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

const getIngredientByName = async (ingredient_name) => {
    const ingredient = await Ingredient.findOne({ where: { ingredient_name } });
    return ingredient;
}

module.exports = {
    addIngredient,
    updateIngredient,
    deleteIngredient,
    getIngredientById,
    getIngredients,
    getIngredientByName
};