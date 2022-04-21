const express = require('express')
const router = express.Router()
const houseRoute = require('./house')
const profileRoute = require('./profile')
const userRoute = require('./user')
const UserController = require('../controllers/user')
const ProfileController = require('../controllers/profile')
const HouseController = require('../controllers/house')
const loginCheck = require('../middlewares/logincheck')

router.get('/register', UserController.register)
router.post('/register', UserController.saveRegister)
router.post('/saveprofile', ProfileController.saveProfile)
router.get('/login', UserController.login)
router.post('/login', UserController.loginpost)
router.get('/logout', UserController.logout)
router.get('/', (req, res) => {
    res.render('home', {login: req.session.loginUser})
})


router.use(loginCheck)

router.use('/house', houseRoute)
router.use('/profile', profileRoute)
router.use('/user', userRoute)
router.get('/komplain', HouseController.komplain)
router.post('/komplain', HouseController.saveKomplain)

module.exports = router