const express = require("express");
const session = require("express-session");
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "secretpassword",
    resave: false,
    saveUninitialized: true,
  })
);
const users = [];

app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(422)
      .json({ message: "Username and password are required" });
  }
  try {
    users.push({ username, password });
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  try {
    const user = users.find((user) => {
      return user.username == username && user.password == password;
    });
    if (user) {
      req.session.user = username;
      res.status(201).json({ message: user });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

const tasks = [];

// Middleware to check authentication
const verifyUser = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized:You have to login" });
  }
  next();
};

app.post("/api/tasks", verifyUser, (req, res) => {
  const { id, title, description, dueDate } = req.body;
  if (!id || !title || !description || !dueDate) {
    return res.status(422).json({ message: "All fields are required" });
  }
  try {
    const newTask = { id, title, description, dueDate, status: "pending" };
    tasks.push({ username: req.session.user, newTask });
    res.status(201).json({ message: "Task created" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

app.get("/api/tasks", verifyUser, (req, res) => {
  if (tasks.length === 0) {
    return res.json({ message: "No tasks yet" });
  }

  const userTasks = tasks.filter((task) => task.username === req.session.user);

  if (userTasks.length === 0) {
    return res.json({ message: "No tasks for the current user" });
  } else {
    const newTasks = userTasks.map(({ newTask }) => newTask);
    res.status(200).json(newTasks);
  }
});

app.put("/api/tasks/:id", verifyUser, (req, res) => {
  const taskId = req.params.id;
  const { title, description, dueDate, status } = req.body;
  const taskIndex = tasks.findIndex(
    (task) => task.newTask.id === Number(taskId)
  );
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }
  try {
    tasks[taskIndex] = {
      id: taskId,
      username: req.session.user,
      newTask: {
        title,
        description,
        dueDate,
        status,
      },
    };
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

app.delete("/api/tasks/:id", verifyUser, (req, res) => {
  const taskId = req.params.id;

  const taskIndex = tasks.findIndex(
    (task) => task.newTask.id === Number(taskId)
  );

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }
  try {
    tasks.splice(taskIndex, 1);

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

app.put("/api/tasks/:id/status", verifyUser, (req, res) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex(
    (task) => task.newTask.id === Number(taskId)
  );
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }
  try {
    const taskStatus = tasks[taskIndex].newTask.status;
    if (taskStatus === "pending") {
      tasks[taskIndex].newTask.status = "completed";
      res.status(200).json({ message: "Task completed" });
    } else {
      tasks[taskIndex].newTask.status = "pending";
      res.status(200).json({ message: "Task pending" });
    }
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});
