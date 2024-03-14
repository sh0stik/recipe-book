require('dotenv').config()
const { CONNECTION_STRING } = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, { dialect: 'postgres' });

module.exports = {
    addIngredient: (req, res) => {
        const { ingredient_name, unit } = req.body;

        sequelize.query(`
                INSERT INTO ingredients (ingredient_name, unit)
                VALUES 
                    ('${ingredient_name}', '${unit}')
                RETURNING *
            `).then((ingredient) => {
            res.status(200).send(ingredient[0][0]);
        }).catch(err => console.log('error adding ingredient', err))
    },


    updateIngredient: (req, res) => {
        const { ingredient_id } = req.params
        const { ingredient_name, unit } = req.body
        sequelize.query(`
            UPDATE ingredients
            SET ingredient_name = '${ingredient_name}', unit = '${unit}'
            WHERE ingredient_id = ${ingredient_id}
        `).then((ingredient) => {
            res.status(200).send(ingredient[0][0])
        }).catch(err => console.log('error updating ingridient', err))
    },

    deleteIngredient: (req, res) => {
        const { ingredient_id } = req.params
        sequelize.query(`
            DELETE FROM ingredients
            WHERE ingredient_id = ${ingredient_id}
        `).then(() => {
            res.status(200).send('Ingridient deleted')
        }).catch(err => console.log('error deleting ingridient', err))
    },

    getIngredientById: (req, res) => {
        const { ingredient_id } = req.params
        sequelize.query(`
            SELECT * FROM ingredients
            WHERE ingredient_id = ${ingredient_id}
        `).then(ingredient => {
            res.status(200).send(ingredient)
        }).catch(err => console.log('error getting ingridient by id', err))
    },

    getIngredients: (req, res) => {
        sequelize.query('SELECT * FROM ingredients').then(response => {
            res.status(200).send(response[0])
        }).catch(err => console.log('error getting ingredients', err))
    },

    getIngredientByName: (req, res) => { 
        const { ingredient_name } = req.params
        sequelize.query(`
            SELECT ingredient_id FROM ingredients
            WHERE ingredient_name = '${ingredient_name}'
        `).then(response => {
            res.status(200).send(response[0][0])
        }).catch(err => console.log('error getting ingredient id by name', err))
    }

}