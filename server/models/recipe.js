require('dotenv').config();
const { CONNECTION_STRING } = process.env;
const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize(CONNECTION_STRING, { dialect: 'postgres' });

class Recipe extends Model { }

Recipe.init({
    recipe_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    recipe_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    recipe_description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    recipe_instructions: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Recipe',
    tableName: 'recipes',
    timestamps: false
});

module.exports = Recipe;