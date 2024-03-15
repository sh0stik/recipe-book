const recipeDtoService = require('../services/recipeDtoService');
const RecipeDTO = require('../dto/recipeDTO');

module.exports = {
    addOrUpdateRecipe: async (req, res) => {
        const recipeDto = new RecipeDTO(
            req.body.recipe_id,
            req.body.recipe_name,
            req.body.recipe_description,
            req.body.recipe_instructions,
            req.body.ingredients
          );
        try{
            await recipeDtoService.addOrUpdateRecipe(recipeDto);
            res.status(200).send('Recipe added');
        } catch(err){
            console.log('error adding recipe', err);
            res.status(500).send('Error adding recipe');
        }
    },
    getRecipe: async (req, res) => {
        const {recipe_id} = req.params;
        try{
            const recipe = await recipeDtoService.getRecipe(recipe_id);
            res.status(200).send(recipe);
        } catch(err){
            console.log('error getting recipe', err);
            res.status(500).send('Error getting recipe');
        }
    },

    getRecipes: async (req, res) => {
        try{
            const recipes = await recipeDtoService.getRecipes();
            res.status(200).send(recipes);
        } catch(err){
            console.log('error getting recipes', err);
            res.status(500).send('Error getting recipes');
        }
    },

    deleteRecipe: async (req, res) => {
        const {recipe_id} = req.params;
        try{
            await recipeDtoService.deleteRecipe(recipe_id);
            res.status(200).send('Recipe deleted');
        } catch(err){
            console.log('error deleting recipe', err);
            res.status(500).send('Error deleting recipe');
        }
    }
}