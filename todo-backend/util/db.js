require("dotenv").config(); 

const {Sequelize} = require("sequelize"); 

const todoSequelize = new Sequelize(process.env.DB_URL, {
    dialect: "postgres", 
}); 

module.exports = todoSequelize; 

