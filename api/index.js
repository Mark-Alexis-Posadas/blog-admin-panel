require("dotenv").config();
const express = require("express");

const cors = require("cors");
const routes = require("./routes/routes");

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
app.use("/posts", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
