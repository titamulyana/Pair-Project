const express = require('express')
const router = express.Router()
const houseController = require('../controllers/house')

router.get('/', houseController.showHouses)
router.get('/:formattedName', houseController.houseDetail)
router.get('/:id/rent', houseController.rentHouse) 
router.get('house/add/', houseController.addHouse)
router.post('house/add/', houseController.saveHouse)

module.exports = router