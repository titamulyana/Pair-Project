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
        
        Profile.findOne({
            where : {
                UserId: id
            },
            include: {
                model: User
            }
        })
            .then((data) => {
                res.render('profileDetail', {data})
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static edit(req, res) {
        const id = +req.params.id

        Profile
        .findOne({
            where: { id : id }
        })
        .then((data) => {
            res.render('editprofile', {data})
        }) 
    }

    static editpost(req, res) {
        const id = +req.params.id
        const {firstName, lastName, dateOfBirth, gender, address} = req.body
        const input = {firstName, lastName, dateOfBirth, gender, address}
        Profile
        .update(input, {
            where: { id : id }
        })
        .then(() => {
            res.redirect('/profile/detail')
        })
        .catch((err) => {
            res.send(err)
        })
    }
}

module.exports = ProfileController