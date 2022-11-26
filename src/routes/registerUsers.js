const express = require('express')
const router = express.Router()
const {usersController} = require('../controller/users')

router.post ('/pekerja',usersController.createPekerja)
router.post ('/perekrut',usersController.createPerekrut)
router.get ('/',usersController.getusers)
router.post('/verif',usersController.otp)
router.put('/updateperusahaan/:id',usersController.updatePerusahaan)
// router.put('/:id',UsersController.updatePerusahaan)

module.exports = router