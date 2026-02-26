const {Model, DataTypes} = require("sequelize"); 
const todoSequelize = require("../util/db"); 

class User extends Model {}

User.init(
    {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
    },
    username: {
        type: DataTypes.TEXT, 
        unique: true, 
        allowNull: false,
    },
    name: {
        type: DataTypes.TEXT, 
        allowNull: false,
    }, 
    password: {
        type: DataTypes.TEXT, 
        allowNull: false,
    }
}, 
{
    sequelize: todoSequelize, 
    timestamps: false,
    underscored: true,
    modelName:"user", 
},
); 
module.exports = User; 