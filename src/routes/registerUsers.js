const express = require("express");
const router = express.Router();
const { usersController } = require("../controller/users");

router.post("/pekerja", usersController.createPekerja);
router.post("/perekrut", usersController.createPerekrut);
router.get("/", usersController.getusers);
router.get("/verif/:email/:otp", usersController.otp);
router.put("/updateusersperusahaan/:id", usersController.updateUsersPerusahaan);
router.put("/updateuserspekerja/:id", usersController.updateUsersPekerja);
router.get("/detailpekerja/:id", usersController.selectDataPekerja);
router.get("/detailperekrut/:id", usersController.selectDataPerekrut);
// router.put('/:id',UsersController.updatePerusahaan)

module.exports = router;
