const express = require("express");
const router = express.Router();
const {Playlist, User} = require("../models");
const { authenticateToken } = require("../util/middleware");

router.get("/", async (req, res) => {
  try {
    const playlists = await Playlist.findAll({
      include: {
        model: User,
        attributes: ["id", "username", "name"],
      },
    });
    res.json(playlists);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id);
    if (!playlist) return res.status(404).json({ message: "Playlist not found" });
    res.json(playlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { name, creator, numOfSongs, likes } = req.body; // this requires express.json() middleware
    
    if (!req.body.name) {
    return res.status(400).json("Name cannot be less than one character!");
    }

    if (!req.body.creator) {
    return res.status(400).json("Creator cannot be less than one character!");
    }

    if (req.body.numOfSongs < 0) {
      return res.status(400).json("numOfSongs cannot be less than 0!");
    }
    
    const playlist = await Playlist.create({
      name, creator, numOfSongs, likes,
      userId: req.user.id,
    });
    res.status(201).json(playlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id);
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }
    if (playlist.userId !== req.user.id) {
      return res.status(403).json({ error: "You are not authorized to delete this playlist" });
    }

     await playlist.destroy();
    res.json({ message: `The playlist [${playlist.name}] removed successfully` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;