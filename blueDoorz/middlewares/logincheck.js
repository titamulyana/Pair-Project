const loginCheck = (req, res, next) => {
    if (req.session.loginUser) {
        next()
    } else {
        res.redirect('/login')
    }
}

module.exports = loginCheck