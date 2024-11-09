const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const routes = require("./routes/routes");

// const routes = require("./routes/employee");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware
app.use(cors());
// app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//employee route
app.use("/api/posts", routes);

// //sign up route
// app.use("/auth", authRoutes);

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin@123",
  database: "my_database",
});

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});
