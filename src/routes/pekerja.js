const express = require("express");
const router = express.Router();
const { PekerjaController } = require("../controller/pekerja");

// router.post("/", PekerjaController.insert);
router.post("/", PekerjaController.create);
router.get ('/',PekerjaController.getPekerja);
router.post("/verif",PekerjaController.otp)

module.exports = router;
