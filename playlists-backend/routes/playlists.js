const express = require("express");
const router = express.Router();
const {Playlist} = require("../models");

router.get("/", async (req, res) => {
  try {
    const playlists = await Playlist.findAll();
    res.json(playlists);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id);
    if (!playlist) res.status(404).json({ message: "Playlist not found" });
    res.json(playlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
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
    
    const playlist = await Playlist.create({ name, creator, numOfSongs, likes });
    res.status(201).json(playlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Playlist.destroy({
      where: { id: req.params.id },
    });
    if (deleted === 0) {
      res.status(404).json({ error: "Playlist not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;