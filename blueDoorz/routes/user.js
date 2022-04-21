const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.send('masuk user')
})


module.exports = router