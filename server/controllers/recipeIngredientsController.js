const recipeIngredientsService = require('../services/recipeIngredientsService');

module.exports = {
    addQuantity: async (req, res) => {
        const { recipe_id, ingredient_id, quantity } = req.body;
        try {
            const recipeIngredient = await recipeIngredientsService.addQuantity(recipe_id, ingredient_id, quantity);
            res.status(200).send(recipeIngredient);
        } catch (err) {
            console.log('error adding quantity', err);
            res.status(500).send('Error adding quantity');
        }
    },

    getIngredientsAndQuantityByRecipeId: async (req, res) => {
        const { recipe_id } = req.params
        try {
            const ingredients = await recipeIngredientsService.getIngredientsAndQuantityByRecipeId(recipe_id)
            res.status(200).send(ingredients)
        } catch (err) {
            console.log('error getting ingredients and quantity by recipe id', err)
            res.status(500).send('Error getting ingredients and quantity by recipe id')
        }
    },

    updateQuantity: async (req, res) => {
        const { recipe_id, ingredient_id, quantity } = req.body;
        try {
            const recipeIngredient = await recipeIngredientsService.updateQuantity(recipe_id, ingredient_id, quantity);
            res.status(200).send(recipeIngredient);
        } catch (err) {
            console.log('error updating quantity', err);
            res.status(500).send('Error updating quantity');
        }
    },
}