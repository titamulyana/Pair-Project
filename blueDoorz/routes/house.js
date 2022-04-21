const express = require('express')
const router = express.Router()
const houseController = require('../controllers/house')

router.get('/', houseController.showHouses)
router.get('/:formattedName', houseController.houseDetail)
router.post('/:formattedName', houseController.rentHouse)

module.exports = router