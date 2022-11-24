const express = require("express");
const router = express.Router();
const UsersRouter = require("./../routes/users");
const PekerjaRouter = require("../routes/pekerja");
const PerekrutRouter = require("../routes/perekrut");

router
  .use("/users", UsersRouter)
  .use("/pekerja", PekerjaRouter)
  .use("/perekrut", PerekrutRouter);

module.exports = router;
