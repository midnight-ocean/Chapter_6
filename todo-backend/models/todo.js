const {Model, DataTypes} = require("sequelize");
const todoSequelize = require("../util/db");

class Todo extends Model {}

Todo.init({
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
    }, 
    task: {
        type: DataTypes.TEXT,
        allowNull: false,
    }, 
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: {model: "users", key: "id"},
    },
}, 
{
    sequelize: todoSequelize,
    timestamps: false,
    underscored: true,
    modelName: "todo",
},
); 

module.exports = Todo;