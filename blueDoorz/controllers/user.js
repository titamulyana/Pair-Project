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
        const errors = req.query.errors
        res.render('login', {errors})
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
                    errors.push('password wrong')
                    res.redirect(`/login?errors=${errors}`)
                }
            } else {
                errors.push('user not found')
                res.redirect(`/login?errors=${errors}`)
            }
        })
        .catch((err) => {
            res.send(errors)
        })  
    }

    static logout(req, res) {
        req.session.destroy(err => {
            if(err) {
                return res.send(err)
            }
            res.redirect('/login')
        })    
    }
}

module.exports = UserController