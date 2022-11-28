const express = require("express");
const router = express.Router();
const { experiencesControl } = require("./../controller/experiences");

// router.post("/", PekerjaController.insert);
router.post("/:id", experiencesControl.insert);
router.put("/:id", experiencesControl.update);
router.get("/detail/:id", experiencesControl.detailWork);
router.get("/:id", experiencesControl.getAllWork);
module.exports = router;
