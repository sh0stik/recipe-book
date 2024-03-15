const ingredientService = require('../services/ingredientService');

module.exports = {
    addIngredient: async (req, res) => {
        const { ingredient_name, unit } = req.body;
        try {
            const ingredient = await ingredientService.addIngredient(ingredient_name, unit);
            res.status(200).send(ingredient);
        } catch (err) {
            console.log('error adding ingredient', err);
            res.status(500).send('Error adding ingredient');
        }
    },


    updateIngredient: async (req, res) => {
        const { ingredient_id } = req.params
        const { ingredient_name, unit } = req.body
        try {
            const ingredient = await ingredientService.updateIngredient(ingredient_id, ingredient_name, unit)
            res.status(200).send(ingredient)
        } catch (err) {
            console.log('error updating ingredient', err)
            res.status(500).send('Error updating ingredient')
        }
    },

    deleteIngredient: async (req, res) => {
        const { ingredient_id } = req.params
        try {
            await ingredientService.deleteIngredient(ingredient_id)
            res.status(200).send('Ingredient deleted')
        } catch (err) {
            console.log('error deleting ingredient', err)
            res.status(500).send('Error deleting ingredient')
        }
    },

    getIngredientById: async (req, res) => {
        const { ingredient_id } = req.params
        try {
            const ingredient = await ingredientService.getIngredientById(ingredient_id)
            res.status(200).send(ingredient)
        } catch (err) {
            console.log('error getting ingredient by id', err)
            res.status(500).send('Error getting ingredient by id')
        }
    },

    getIngredients: async (req, res) => {
        try {
            const ingredients = await ingredientService.getIngredients()
            res.status(200).send(ingredients)
        } catch (err) {
            console.log('error getting ingredients', err)
            res.status(500).send('Error getting ingredients')
        }
    },

    getIngredientByName: async (req, res) => {
        const { ingredient_name } = req.params
        try {
            const ingredients = await ingredientService.getIngredientByName(ingredient_name)
            res.status(200).send(ingredient)
        } catch (err) {
            console.log('error getting ingredient by name', err)
            res.status(500).send('Error getting ingredient by name')
        }
    }
}