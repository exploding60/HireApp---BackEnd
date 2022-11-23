const express = require('express')
const router = express.Router()
const PekerjaRouter = require('../routes/pekerja')

router 
.use('/pekerja', PekerjaRouter)

module.exports = router