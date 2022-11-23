const express = require("express");
const router = express.Router();
const { PekerjaController } = require("../controller/pekerja");

router.post("/", PekerjaController.insert);
// router.get ('/',PekerjaController.getPekerja)

module.exports = router;
