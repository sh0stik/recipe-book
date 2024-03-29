const { Recipe, Ingredient } = require('../models');

const addRecipe = async (recipe_name, recipe_description, recipe_instructions) => {
    const recipe = await Recipe.create({ recipe_name, recipe_description, recipe_instructions });
    return recipe;
}

const updateRecipe = async (recipe_id, recipe_name, recipe_description, recipe_instructions) => {
    const [_, [updatedRecipe]] = await Recipe.update(
        { recipe_name, recipe_description, recipe_instructions },
        { where: { recipe_id }, returning: true }
    );
    return updatedRecipe;
}

const deleteRecipe = async (recipe_id) => {
    await Recipe.destroy({ where: { recipe_id } });
}

const getRecipeById = async (recipe_id) => {
    const recipe = await Recipe.findByPk(recipe_id);
    return recipe;
}

const getRecipes = async () => {
    const recipes = await Recipe.findAll({
        include: [{
            model: Ingredient,
            as: 'ingredients',
            required: false,
        }]
    });
    return recipes;
}

module.exports = {
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipeById,
    getRecipes
};