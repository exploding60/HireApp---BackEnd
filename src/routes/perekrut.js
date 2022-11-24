const express = require('express')
const router = express.Router()
const {PerekrutController} = require('../controller/perekrut')

router.post ('/',PerekrutController.insert)
router.get ('/',PerekrutController.getPerekrut)

module.exports = router