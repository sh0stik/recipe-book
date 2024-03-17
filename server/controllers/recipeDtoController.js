const recipeDtoService = require('../services/recipeDtoService');

module.exports = {
    addRecipe: async (req, res) => {
        const recipeDto = req.body;
        console.log(recipeDto);
        try {
            await recipeDtoService.addRecipe(recipeDto);
            res.status(200).send('Recipe added');
        } catch (err) {
            console.log('error adding recipe', err);
            res.status(500).send('Error adding recipe');
        }
    },

    updateRecipe: async (req, res) => {
        const recipeDto = req.body;
        try {
            const recipe = await recipeDtoService.updateRecipe(recipeDto);
            console.log(recipe);
            res.status(200).send(recipe);
        } catch (err) {
            console.log('error updating recipe', err);
            res.status(500).send('Error updating recipe');
        }
    },

    getRecipe: async (req, res) => {
        const { recipe_id } = req.params;
        try {
            const recipe = await recipeDtoService.getRecipe(recipe_id);
            res.status(200).send(recipe);
        } catch (err) {
            console.log('error getting recipe', err);
            res.status(500).send('Error getting recipe');
        }
    },

    getRecipes: async (req, res) => {
        try {
            const recipes = await recipeDtoService.getRecipes();
            res.status(200).send(recipes);
        } catch (err) {
            console.log('error getting recipes', err);
            res.status(500).send('Error getting recipes');
        }
    },

    deleteRecipe: async (req, res) => {
        const { recipe_id } = req.params;
        try {
            await recipeDtoService.deleteRecipe(recipe_id);
            res.status(200).send('Recipe deleted');
        } catch (err) {
            console.log('error deleting recipe', err);
            res.status(500).send('Error deleting recipe');
        }
    }
}