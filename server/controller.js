require('dotenv').config()
const { CONNECTION_STRING } = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, { dialect: 'postgres' });

module.exports = {
    seed: (req, res) => {
        Promise.all([
            sequelize.query('DROP TABLE IF EXISTS "recipe-ingredients"'),
            sequelize.query('DROP TABLE IF EXISTS recipes'),
            sequelize.query('DROP TABLE IF EXISTS ingredients')
        ]).then(() => {
            return Promise.all([
                sequelize.query(`
                    CREATE TABLE recipes (
                        recipe_id SERIAL PRIMARY KEY,
                        recipe_name VARCHAR(100),
                        recipe_description TEXT,
                        recipe_instructions TEXT
                    )
                `),
                sequelize.query(`
                    CREATE TABLE ingredients (
                        ingredient_id SERIAL PRIMARY KEY,
                        ingredient_name VARCHAR(100),
                        unit VARCHAR(100)
                    )
                `),
                sequelize.query(`
                    CREATE TABLE "recipe-ingredients" (
                        recipe_id INT REFERENCES recipes(recipe_id),
                        ingredient_id INT REFERENCES ingredients(ingredient_id),
                        quantity INT,
                        PRIMARY KEY (recipe_id, ingredient_id)
                    )
                `)
            ]);
        }).then(() => {
            return Promise.all([
                sequelize.query(`
                    INSERT INTO recipes (recipe_name, recipe_description, recipe_instructions)
                    VALUES 
                        ('Spaghetti', 'A classic Italian dish', 'Boil water, add pasta, cook for 10 minutes, drain, add sauce'),
                        ('Chicken Alfredo', 'A creamy pasta dish', 'Boil a large pot of salted water and cook fettuccine according to package instructions. While pasta is cooking, season chicken with salt and pepper. In a separate pan, cook chicken over medium heat until fully cooked and no longer pink in the center. In a saucepan, heat heavy cream and garlic over medium heat until simmering. Stir in parmesan cheese until melted and smooth. Drain pasta and add it to the saucepan with the cheese sauce. Stir until pasta is coated in sauce. Slice cooked chicken and add it to the pasta mixture. Serve hot and enjoy!'),
                        ('Chocolate Chip Cookies', 'A classic dessert', 'Beat the butter and sugars, then beat in the eggs and vanilla. Dissolve the baking soda in hot water and add to the mixture. Stir in the flour, chocolate chips, and walnuts. Drop dough onto a prepared baking sheet. Bake until the edges are golden brown.')
                `),
                sequelize.query(`
                    INSERT INTO ingredients (ingredient_name, unit)
                    VALUES 
                        ('pasta', 'grams'),
                        ('sauce', 'milliliters'),
                        ('chicken', 'grams'),
                        ('fettuccine', 'grams'),
                        ('heavy cream', 'grams'),
                        ('garlic', 'cloves'),
                        ('parmesan cheese', 'grams'),
                        ('butter', 'grams'),
                        ('sugar', 'grams'),
                        ('eggs', 'units'),
                        ('vanilla', 'teaspoons'),
                        ('baking soda', 'grams'),
                        ('hot water', 'milliliters'),
                        ('flour', 'grams'),
                        ('chocolate chips', 'grams')
                `)
            ]);
        }).then(() => {
            res.status(200).send('Database seeded');
        }).catch(err => console.log('error seeding DB', err));
    },

    getRecipes: (req, res) => {
        sequelize.query('select * from recipes').then(response => {
            res.status(200).send(response[0])
        }).catch(err => console.log('error getting recipes', err))
    },

    getIngredients: (req, res) => {
        sequelize.query('select * from ingredients').then(response => {
            res.status(200).send(response[0])
        }).catch(err => console.log('error getting ingredients', err))
    }
}