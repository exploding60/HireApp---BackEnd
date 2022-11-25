const express = require("express");
const router = express.Router();
const { experiencesControl } = require("./../controller/experiences");

// router.post("/", PekerjaController.insert);
router.post("/", experiencesControl.insert);
router.put("/:id", experiencesControl.update);
router.get("/detail/:id", experiencesControl.detailWork);
router.get("/", experiencesControl.getAllWork);
module.exports = router;
