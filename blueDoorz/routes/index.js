const express = require('express')
const router = express.Router()
const houseRoute = require('./house')
const profileRoute = require('./profile')
const userRoute = require('./user')


router.use('/house', houseRoute)
router.use('/profile', profileRoute)
router.use('/user', userRoute)


module.exports = router