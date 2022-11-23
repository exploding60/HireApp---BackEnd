const express = require('express')
const router = express.Router()
const {PekerjaController} = require('../controller/pekerja')

router.post ('/',PekerjaController.insert)

module.exports = router