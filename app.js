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

app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});
