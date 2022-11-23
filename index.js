const express = require("express");
const app = express();
const cors = require("cors")
require("dotenv").config();
const port = 3002;
var bodyParser = require('body-parser')
const morgan = require("morgan")
const mainRouter = require("./src/routes/index")
const { response } = require("./src/middlewares/common");

app.use(morgan("dev"))

app.use(bodyParser.json())

app.use(cors())

app.use("/", mainRouter)
app.all("*",(req,res,next) => {
  response(res,404,false,null,"404 Not Found")
})
app.get("/", (req, res, next) => {
  res.status(200).json({ status: "success", statusCode: 200 });
});

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
