'use strict'
const { House, Profile, User } = require('../models/index')
const { Op } = require('sequelize')
const { compare } = require('../helpers/bcryptjs')

class UserController {

    static register(req, res) {
        let errors = req.query.errors
        res.render('registerform', {errors})
    }

    static saveRegister(req, res) {
        const {username, password, email, role} = req.body
        const inputUser = {username, password, email, role}

        User
        .create(inputUser)
        .then(() => res.render('addprofile'))
        .catch((err) => {
            if(err.name === "SequelizeValidationError") {
                let errMessage = err.errors.map((ele) => {
                    return ele.message
                })
                res.redirect(`/register?errors=${errMessage}`)
            }
        })
    }

    static login(req, res) {
        res.render('login', {})
    }

    static loginpost(req, res) {
        const { username, password } = req.body
        const errors = []
        User
        .findOne({
            where: {
                username : username
            }
        })
        .then((data) => {
            if(data){
                if(compare(password, data.password) === true) {
                    req.session.loginUser = {
                        username, 
                        id: data.id,
                        role: data.role,
                        email: data.email
                    }
                    
                    res.redirect('/house')
                } else {
                    throw errors.push('password worng')
                }
            } else {
                throw errors.push('user not found')
            }
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static logout(res, req) {
        console.log(req.session)
        // res.redirect('/login'    
    }
}

module.exports = UserController