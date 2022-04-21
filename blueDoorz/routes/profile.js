const express = require('express')
const router = express.Router()
const ProfileController = require('../controllers/profile')

router.get('/detail',ProfileController.profileDetail)
router.get('/:id/edit', ProfileController.edit)
router.post('/:id/edit', ProfileController.editpost)


module.exports = router