const express = require('express')
const router = express.Router()
const {PerekrutController} = require('../controller/perekrut')

router.post ('/',PerekrutController.create)
router.get ('/',PerekrutController.getPerekrut)
router.post('/verif',PerekrutController.otp)
router.put('/updateperusahaan/:id',PerekrutController.updatePerusahaan)


module.exports = router