//Import Library
const express = require("express");
var bodyParser = require('body-parser')
const cors = require("cors")
const morgan = require("morgan")
require("dotenv").config();



//Import File Local
const mainRouter = require('./src/routes/index')
const {response} = require('./src/middlewares/common')






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

app.use(bodyParser.json())


app.use(morgan("dev"));
app.use('/', mainRouter)
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));



app.all("*",(req,res,next)=>{
  response(res,404,false,null,"404 Not Found");
})


/* app.get("/", (req, res) => {
  res.send("Hello World!");
}); */

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
