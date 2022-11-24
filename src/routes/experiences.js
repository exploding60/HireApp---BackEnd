const express = require("express");
const router = express.Router();
const { experiencesControl } = require("./../controller/experiences");

// router.post("/", PekerjaController.insert);
router.post("/", experiencesControl.insert);

module.exports = router;
