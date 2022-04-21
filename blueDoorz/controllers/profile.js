'use strict'
const { House, Profile, User } = require('../models/index')
const { Op } = require('sequelize')

class ProfileController{

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

}

module.exports = ProfileController