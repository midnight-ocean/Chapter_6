const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User, Playlist } = require("../models");

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Playlist,
        attributes: ["id", "name", "creator", "numOfSongs", "likes"],
      },
      attributes: { exclude: ["passwordHash"] },
    });
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST - create new user
router.post("/", async (req, res) => {
  try {
    const { username, password, name } = req.body;

    if (!username || username.length < 2) {
      return res.status(400).json({ error: "Username must be at least 2 characters long" });
    }

    if (!password || password.length < 4) {
      return res.status(400).json({ error: "The password is required and must be at least four characters long" });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "Username must be unique" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = await User.create({ username, name, passwordHash });

    res.status(201).json({
      id: user.id,
      username: user.username,
      name: user.name,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;