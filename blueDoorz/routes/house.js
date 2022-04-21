const express = require('express')
const router = express.Router()
const houseController = require('../controllers/house')
const roleCheck = require('../middlewares/roleCheck')

router.get('/', houseController.showHouses)
router.get('/add/', roleCheck, houseController.addHouse)
router.post('/add/', roleCheck, houseController.saveHouse)
router.get('/:formattedName', houseController.houseDetail)
router.get('/:id/rent', houseController.rentHouse)
router.get('/:id/delete', roleCheck, houseController.delete)

module.exports = router