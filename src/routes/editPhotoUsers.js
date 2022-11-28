const express = require("express");
const router = express.Router();
const { photoController } = require("../controller/editPhotoUser");
const upload = require("../middlewares/upload");

router.put("/:id", upload.single("photo"), photoController.update);

module.exports = router;
