const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')

router.get('/', (req, res) => {
    res.send('masuk user')
})


module.exports = router