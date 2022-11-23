const express = require("express");
const app = express();
const cors = require("cors")
require("dotenv").config();
const port = 3002;
var bodyParser = require('body-parser')
const morgan = require("morgan")

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
