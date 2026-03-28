const bcrypt = require("bcrypt");
const router = require("express").Router();
const { User, Todo } = require("../models");

router.post("/", async (req, res) => {
  try {
    const { username, name, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, name, password: passwordHash });
    res.status(201).json({
      name: user.name,
      id: user.id,
      username: user.username,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      include: {
        model: Todo,
        attributes: ["task", "done"],
      },
    });

    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      include: {
        model: Todo,
        attributes: ["task", "done"],
      },
    });
    if (!user) res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;