const User = require("./user");
const Todo = require("./todo"); 

User.hasMany(Todo, {foreignKey: "userId"}); 
Todo.belongsTo(User, {foreignKey: "userId"}); 
module.exports = {User, Todo}; 