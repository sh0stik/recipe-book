const recipeService = require('../services/recipeService');

module.exports = {
    addRecipe: async (req, res) => {
        const { recipe_name, recipe_description, recipe_instructions } = req.body;
        try {
            const recipe = await recipeService.addRecipe(recipe_name, recipe_description, recipe_instructions);
            res.status(200).send(recipe);
        } catch (err) {
            console.log('error adding recipe', err);
            res.status(500).send('Error adding recipe');
        }
    },

    updateRecipe: async (req, res) => {
        const { recipe_id } = req.params;
        const { recipe_name, recipe_description, recipe_instructions } = req.body;
        try {
            const recipe = await recipeService.updateRecipe(recipe_id, recipe_name, recipe_description, recipe_instructions);
            res.status(200).send(recipe);
        } catch (err) {
            console.log('error updating recipe', err);
            res.status(500).send('Error updating recipe');
        }
    },

    deleteRecipe: async (req, res) => {
        const { recipe_id } = req.params;
        try {
            await recipeService.deleteRecipe(recipe_id);
            res.status(200).send('Recipe deleted');
        } catch (err) {
            console.log('error deleting recipe', err);
            res.status(500).send('Error deleting recipe');
        }
    },

    getRecipeById: async (req, res) => {
        const { recipe_id } = req.params;
        try {
            const recipe = await recipeService.getRecipeById(recipe_id);
            res.status(200).send(recipe);
        } catch (err) {
            console.log('error getting recipe by id', err);
            res.status(500).send('Error getting recipe by id');
        }
    },

    getRecipes: async (req, res) => {
        try {
            const recipes = await recipeService.getRecipes();
            res.status(200).send(recipes);
        } catch (err) {
            console.log('error getting recipes', err);
            res.status(500).send('Error getting recipes');
        }
    }
};