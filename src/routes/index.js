const express = require('express')
const router = express.Router()
const PekerjaRouter = require('../routes/pekerja')
const PerekrutRouter = require('../routes/perekrut')

router 
.use('/pekerja', PekerjaRouter)
.use('/perekrut',PerekrutRouter)

module.exports = router