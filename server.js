const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config();

const connectDB = require("./db/dbConfig");

const appRoutes = require("./routes/appRoutes");

const app = express();
app.use(morgan("dev"));

appRoutes(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  connectDB();
  console.log("Server started at http://localhost:" + port);
});

module.exports = app;
