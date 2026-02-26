const express = require("express");
const router = express.Router();
const {Todo} = require("../models");

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) res.status(404).json({ message: "Task not found" });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { task, done } = req.body; // this requires express.json() middleware
    const todo = await Todo.create({ task, done });
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Todo.destroy({
      where: { id: req.params.id },
    });
    if (deleted === 0) {
      res.status(404).json({ error: "Task not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;