const express = require("express");
const router = express.Router();
const { Todo, User } = require("../models");
const { authenticateToken } = require("../util/middleware");

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.findAll({
      include: {
        model: User,
        attributes: ["name", "username"],
      },
    });
    res.json(todos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id, {
      include: {
        model: User,
        attributes: ["name", "username"],
      },
    });
    if (!todo) res.status(404).json({ message: "Task not found" });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

    router.post("/", authenticateToken, async (req, res) => {  
      try {
        const { task, done } = req.body;
        const userId = req.user.id;
        console.log(userId);
    // const { task, done } = req.body; // this requires express.json() middleware
    const todo = await Todo.create({ task, done, userId });
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
    try {
    // check if todo exist
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    // check if the owner correct
    if (todo.userId !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });
    await todo.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;