const express = require('express')
const router = express.Router()
const ProfileController = require('../controllers/profile')

router.get('/detail',ProfileController.profileDetail)


module.exports = router