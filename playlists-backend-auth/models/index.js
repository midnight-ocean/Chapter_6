const Playlist = require("./playlistModel");
const User = require("./userModel");
module.exports = {Playlist}; 

Playlist.belongsTo(User);
User.hasMany(Playlist);

module.exports = { Playlist, User };