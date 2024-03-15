require('dotenv').config();
const { CONNECTION_STRING } = process.env;
const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize(CONNECTION_STRING, { dialect: 'postgres' });

class RecipeIngredients extends Model { }

RecipeIngredients.init({
    recipe_ingredient_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    recipe_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ingredient_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'RecipeIngredients',
    tableName: 'recipe_ingredients',
    timestamps: false
});

module.exports = RecipeIngredients;