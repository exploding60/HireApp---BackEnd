const express = require("express");
const router = express.Router();
const { skillController } = require("./../controller/addSkill");

// router.post("/", PekerjaController.insert);
router.post("/", skillController.insert);
router.put("/:id", skillController.update);
router.get("/", skillController.getAllSkill);
router.delete("/:id", skillController.delete);
// router.put("/:id", experiencesControl.update);
// router.get("/detail/:id", experiencesControl.detailWork);
// router.get("/", experiencesControl.getAllWork);
module.exports = router;
