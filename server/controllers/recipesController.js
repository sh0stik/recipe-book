require('dotenv').config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require('sequelize');

const sequelize = new Sequelize(CONNECTION_STRING, { dialect: 'postgres' });

module.exports = {
    addRecipe: (req, res) => {
        const { recipe_name, recipe_description, recipe_instructions } = req.body;
        sequelize.query(`
                INSERT INTO recipes (recipe_name, recipe_description, recipe_instructions)
                VALUES 
                    ('${recipe_name}', '${recipe_description}', '${recipe_instructions}')
                RETURNING recipe_id
            `).then((recipe) => {
            res.status(200).send(recipe[0][0]);
        }).catch(err => console.log('error adding recipe', err));
    },

    updateRecipe: (req, res) => {
        const { recipe_id } = req.params;
        const { recipe_name, recipe_description, recipe_instructions } = req.body;
        sequelize.query(`
            UPDATE recipes
            SET recipe_name = '${recipe_name}', recipe_description = '${recipe_description}', recipe_instructions = '${recipe_instructions}'
            WHERE recipe_id = ${recipe_id}
        `).then((recipe) => {
            res.status(200).send(recipe[0][0]);
        }).catch(err => console.log('error updating recipe', err));
    },

    deleteRecipe: (req, res) => {
        const { recipe_id } = req.params;
        console.log('recipe_id', req.params);
        sequelize.query(`
            DELETE FROM recipe_ingredients WHERE recipe_id = ${recipe_id}
        `).then(() => {
            sequelize.query(`
            DELETE FROM recipes WHERE recipe_id = ${recipe_id}
        `).then(() => {
                res.status(200).send('Recipe deleted');
            })
        }).catch(err => console.log('error deleting recipe', err));
    },

    getRecipeById: (req, res) => {
        const { recipe_id } = req.params
        sequelize.query(`
            SELECT * FROM recipes WHERE recipe_id = ${recipe_id}
        `).then(recipe => {
            res.status(200).send(recipe);
        }).catch(err => console.log('error getting recipe by id', err));
    },

    getRecipes: (req, res) => {
        sequelize.query('select * from recipes').then(response => {
            res.status(200).send(response[0]);
        }).catch(err => console.log('error getting recipes', err));
    },

    addQuantity: (req, res) => {
        const { recipe_id, ingredient_id, quantity } = req.body;
        sequelize.query(`
            INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity)
            VALUES (${recipe_id}, ${ingredient_id}, ${quantity})
            RETURNING *
        `).then((recipeIngredient) => {
            res.status(200).send(recipeIngredient[0][0]);
        }).catch(err => console.log('error adding quantity', err));
    }
}