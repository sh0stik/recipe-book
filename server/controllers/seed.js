require('dotenv').config()
const { CONNECTION_STRING } = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, { dialect: 'postgres' });

module.exports = {
    seed: (req, res) => {
        Promise.all([
            sequelize.query(sequelize.query('DROP TABLE IF EXISTS recipes'))
                .then(() => sequelize.query('DROP TABLE IF EXISTS ingredients'))
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
                        recipe_id INTEGER REFERENCES recipes(recipe_id),
                        ingredient_name VARCHAR(100),
                        quantity FLOAT,
                        units VARCHAR(100)
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
                    INSERT INTO ingredients (recipe_id, ingredient_name, quantity, units)
                    VALUES 
                    (1, 'pasta', 200, 'grams'),
                    (1, 'sauce', 100, 'milliliters'),
                    (2, 'chicken', 500, 'grams'),
                    (2, 'fettuccine', 200, 'grams'),
                    (2, 'heavy cream', 100, 'grams'),
                    (2, 'garlic', 2, 'cloves'),
                    (2, 'parmesan cheese', 50, 'grams'),
                    (3, 'butter', 100, 'grams'),
                    (3, 'sugar', 200, 'grams'),
                    (3, 'eggs', 2, 'units'),
                    (3, 'vanilla', 1, 'teaspoons'),
                    (3, 'baking soda', 1, 'grams'),
                    (3, 'hot water', 50, 'milliliters'),
                    (3, 'flour', 300, 'grams'),
                    (3, 'chocolate chips', 200, 'grams')
                `)
            ]);
        }).then(() => {
            res.status(200).send('Database seeded');
        }).catch(err => console.log('error seeding DB', err));
    }
}