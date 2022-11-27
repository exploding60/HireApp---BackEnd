const express = require("express");
const router = express.Router();
const UsersRouter = require("./../routes/users");
const PekerjaRouter = require("../routes/pekerja");
const PerekrutRouter = require("../routes/perekrut");
const ExperiencesRouter = require("../routes/experiences");
const Users2Router = require("../routes/registerUsers");
const SkillRouter = require("../routes/addSkill");
const portoRouter = require("../routes/addPortofolio");
router
  .use("/register", Users2Router)
  .use("/users", UsersRouter)
  .use("/pekerja", PekerjaRouter)
  .use("/perekrut", PerekrutRouter)
  .use("/experiences", ExperiencesRouter)
  .use("/skill", SkillRouter)
  .use("/portofolio", portoRouter);

module.exports = router;
