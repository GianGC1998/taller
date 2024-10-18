const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const tasks = [];
let currentId = 0;

app.get("/tasks", (_, res) => {
  return res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const body = req.body;

  const task = {
    id: ++currentId,
    title: body.title,
    completed: body.completed,
  };

  tasks.push(task);

  res.status(201).json(task);
});

app.put("/tasks/:id", (req, res) => {
  const body = req.body;
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).send({
      message: "Invalid Params",
    });
    return;
  }

  const prevTask = tasks.find((t) => t.id === id);

  if (!prevTask) {
    res.status(404).send({
      message: "Task doesnt exists",
    });
    return;
  }

  prevTask.title = body.title;
  prevTask.completed = body.completed;

  return res.status(201).json(prevTask);
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send({
      message: "Invalid Params",
    });
  }

  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex < 0) {
    return res.status(404).send({
      message: "Task doesnt exists",
    });
  }

  tasks.splice(taskIndex, 1);

  return res.status(200).json({ message: `Task with ID = ${id} was deleted` });
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
