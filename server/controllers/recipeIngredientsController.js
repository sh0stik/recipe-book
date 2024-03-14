require('dotenv').config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require('sequelize');

const sequelize = new Sequelize(CONNECTION_STRING, { dialect: 'postgres' });

module.exports = {
    addQuantity: (req, res) => {
        const { recipe_id, ingredient_id, quantity } = req.body;
        sequelize.query(`
            INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity)
            VALUES (${recipe_id}, ${ingredient_id}, ${quantity})
            RETURNING *
        `).then((recipeIngredient) => {
            res.status(200).send(recipeIngredient[0][0]);
        }).catch(err => console.log('error adding quantity', err));
    },

    getIngredientsAndQuantityByRecipeId: (req, res) => {
        const { recipe_id } = req.params
        sequelize.query(`
            SELECT i.ingredient_name, i.unit, ri.quantity
            FROM ingredients i
            JOIN recipe_ingredients ri
            ON i.ingredient_id = ri.ingredient_id
            WHERE ri.recipe_id = ${recipe_id}
        `).then(response => {
            res.status(200).send(response[0])
        }).catch(err => console.log('error getting ingredients and quantity by recipe id', err))
    },

    updateQuantity: (req, res) => {
        const { recipe_id, ingredient_id, quantity } = req.body;
        sequelize.query(`
            UPDATE recipe_ingredients
            SET quantity = ${quantity}
            WHERE recipe_id = ${recipe_id} AND ingredient_id = ${ingredient_id}
            RETURNING *
        `).then((recipeIngredient) => {
            res.status(200).send(recipeIngredient[0][0]);
        }).catch(err => console.log('error updating quantity', err));
    },
}