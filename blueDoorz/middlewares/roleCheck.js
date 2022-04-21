const roleCheck = (function (req, res, next){
    let role = req.session.loginUser.role

    if(role === 'admin') {
        next()
    } else {
        res.send(`You don't have permission to access`)   
    }
})

module.exports = roleCheck
