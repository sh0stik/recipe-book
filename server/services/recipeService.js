const { Recipe } = require('../models');

const addRecipe = async (recipe_name, recipe_description, recipe_instructions) => {
    const recipe = await Recipe.create({ recipe_name, recipe_description, recipe_instructions });
    return recipe;
}

const updateRecipe = async (recipe_id, recipe_name, recipe_description, recipe_instructions) => {
    const recipe = await Recipe.update({ recipe_name, recipe_description, recipe_instructions }, { where: { recipe_id } });
    return recipe;
}

const deleteRecipe = async (recipe_id) => {
    await Recipe.destroy({ where: { recipe_id } });
}

const getRecipeById = async (recipe_id) => {
    const recipe = await Recipe.findByPk(recipe_id);
    return recipe;
}

const getRecipes = async () => {
    const recipes = await Recipe.findAll();
    return recipes;
}

module.exports = {
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipeById,
    getRecipes
};