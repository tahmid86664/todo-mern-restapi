const router = require("express").Router();
const Todo = require("../models/Todo");

// get all todo
router.get("/:userId", async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.params.userId });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).send(err);
  }
});

// add todo
router.post("/create", async (req, res) => {
  try {
    const newTodo = new Todo({
      userId: req.body.userId,
      title: req.body.title,
      desc: req.body.desc,
      reminder: req.body.reminder,
      isDone: false,
    });

    const todo = await newTodo.save();
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).send(err);
  }
});

// update todo
router.put("/update/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });

    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).send(err);
  }
});

// delete todo
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    // const deletedTodo = await todo.deleteOne();
    res.status(200).json(deletedTodo);
  } catch (err) {
    res.status(500).send(err);
  }
});

// delete all completed
router.delete("/delete/alldone/:username", async (req, res) => {
  try {
    const deletedTodos = await Todo.deleteMany({
      username: req.params.username,
      isDone: true,
    });
    res.status(200).json(deletedTodos);
  } catch (err) {
    res.status(500).send(err);
  }
});

// done todo
router.put("/done/:id", async (req, res) => {
  try {
    const completedTodo = await Todo.findByIdAndUpdate(req.params.id, {
      $set: {
        isDone: true,
      },
    });
    res.status(200).json(completedTodo);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
