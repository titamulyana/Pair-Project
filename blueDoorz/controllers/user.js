'use strict'
const { House, Profile, User } = require('../models/index')
const { Op } = require('sequelize')
const { compare } = require('../helpers/bcryptjs')

class UserController {

    static register(req, res) {
        res.render('registerform')
    }

    static saveRegister(req, res) {
        const {username, password, email, role} = req.body
        const inputUser = {username, password, email, role}

        User
        .create(inputUser)
        .then(() => res.render('addprofile'))
        .catch((err) => res.send(err))
    }

    static login(req, res) {
        res.render('login')
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
                        role: data.role
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
            res.send(errors)
        })
    }

    static logout(res, req) {
        req.session.destroy()
        res.redirect('/login')
    }
}

module.exports = UserController