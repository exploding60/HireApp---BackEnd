const express = require("express");
const router = express.Router();
const { portoController } = require("./../controller/addPortofolio");

// router.post("/", PekerjaController.insert);
router.post("/", portoController.insert);
router.put("/:id", portoController.update);
router.get("/", portoController.getAllPorto);
router.delete("/:id", portoController.delete);
// router.put("/:id", experiencesControl.update);
// router.get("/detail/:id", experiencesControl.detailWork);
// router.get("/", experiencesControl.getAllWork);
module.exports = router;
