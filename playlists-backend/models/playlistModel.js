const {Model, DataTypes} = require("sequelize");
const todoSequelize = require("../util/db");

class Playlist extends Model {}

Playlist.init({
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
    }, 
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    }, 
    creator: {
        type: DataTypes.TEXT,
        allowNull: false,
    }, 
    numOfSongs: {
        type: DataTypes.INTEGER, 
        allowNull: false,    
    },
    likes: {
        type: DataTypes.INTEGER, 
        allowNull: false,   
        defaultValue: 0,
    },
},
{
    sequelize: todoSequelize,
    timestamps: false,
    underscored: true,
    modelName: "playlist",
}, 
); 

module.exports = Playlist;