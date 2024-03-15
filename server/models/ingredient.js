require('dotenv').config();
const { CONNECTION_STRING } = process.env;
const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize(CONNECTION_STRING, { dialect: 'postgres' });

class Ingredient extends Model { }

Ingredient.init({
    ingredient_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ingredient_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    units: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Ingredient',
    tableName: 'ingredients',
    timestamps: false
});

module.exports = Ingredient;