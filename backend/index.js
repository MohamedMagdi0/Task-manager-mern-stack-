const cors = require("cors");
const todos = require("./routes/todos");
const express = require("express");

const Todo = require("./models/todo");
const jsonUtls = require("./data/indexData");
const { saveJSON } = require("./data/indexData");

process.on("unhandledRejection", (error) => {
  throw error;
});

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

// Get all Tasks
app.get("/tasks/", async (req, res) => {
  try {
    // console.log(data);
    jsonUtls.loadJSON().then((data) => {
      res.send(data);
    });
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

// post Task
app.post("/tasks/", async (req, res) => {
  if (!req.body.title || !req.body.description) {
    return res.status(500).send("data can not be empty");
  }
  jsonUtls.loadJSON().then((data) => {
    req.body.id = data[data.length - 1].id + 1;
    data.push(req.body);
    jsonUtls.saveJSON(data);
    res.send(data);
  });
});
// Delete Task
app.delete("/tasks/:id", async (req, res) => {
  jsonUtls.loadJSON().then((data) => {
    let todosAfterDeletion = data.filter((todo) => todo.id != req.params.id);
    jsonUtls.saveJSON(todosAfterDeletion);
    res.send(todosAfterDeletion);
  });
});

// Update Task
app.put("/tasks/:id", async (req, res) => {
  if (!req.body.title || !req.body.description) {
    return res.status(500).send("data can not be empty");
  }
  jsonUtls.loadJSON().then((data) => {
    let todoIndex = data.findIndex((todo) => todo.id == req.params.id);
    data[todoIndex] = req.body;
    jsonUtls.saveJSON(data);
    res.send(data);
  });
});

// Search for Task by title
app.get("/tasks/", async (req, res) => {
  let todoPattern = new RegExp("^" + req.body.query);
  if (req.body.title !== todoPattern || req.body.description !== todoPattern) {
    return res.status(500).send("Task Can not be found");
  }

  try {
    jsonUtls.loadJSON().then((data) => {
      console.log(req.query.id);
      data.find({ title: { $regex: todoPattern } }).select("");
      // req.query.searchKeyword
      if (req.query.searchKeyword) {
        // search
        // filter data
        res.send(data.includes(searchKeyword));
        data = [{}];
      }
    });

    res.send(data);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }

  // console.log(req.params);
  // todo
  //   .find({ title: { $regex: todoPattern } })
  //   .select("")
  //   .then((todo) => {
  //     jsonUtls.loadJSON().then((data) => {
  //       res.send(data);
  //     });
  //     console.log(todo);
  //     res.json({ todo });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});
