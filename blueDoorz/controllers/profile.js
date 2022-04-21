'use strict'
const { House, Profile, User } = require('../models/index')
const { Op } = require('sequelize')

class ProfileController {

    static saveProfile(req, res) {
        const {firstName, lastName, dateOfBirth, gender, address} = req.body
        let dataId = {}
        User
        .findAll({
            limit : 1,
            order : [['id', 'DESC']],
        })
        .then((data) => {
            dataId.id = data[0].id
            let UserId = dataId.id
            return Profile.create({firstName, lastName, dateOfBirth, gender, address, UserId})
        })
        .then(() => {
            res.redirect('/login')
        })
        .catch((err) => {
            res.send(err)
        })

    }

    static profileDetail(req, res) {
        const id = req.session.loginUser.id
        console.log(id)
        
        Profile.findOne({
            where : {
                UserId: id
            },
            include: {
                model: User
            }
        })
            .then((data) => {
                console.log(data, "<<<<<<DATA")
                res.render('profileDetail', {data})
            })
    }
}

module.exports = ProfileController