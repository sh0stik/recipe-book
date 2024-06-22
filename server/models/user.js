require('dotenv').config();
const { CONNECTION_STRING } = process.env;
const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize(CONNECTION_STRING, { dialect: 'postgres' });

class User extends Model { }

User.init({
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
},
{
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
});

module.exports = User;