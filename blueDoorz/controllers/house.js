'use strict'
const { House, Profile, User } = require('../models/index')
const { Op } = require('sequelize')
const formatCurrency = require('../helpers/formatCurrency')

class HouseController{

    static showHouses(req, res){
        House.findAll()
            .then((data) => {
                res.render('house', {data, formatCurrency})
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static houseDetail(req, res){
        const {formattedName} = req.params
        let normalizedName = formattedName.split("-").join(" ")

        House.findOne({
            where: {name: normalizedName}
        })
            .then((data) => {
                res.render('houseDetail', {data, formatCurrency})
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static rentHouse(req,res) {
        const idHouse = +req.params.id
        const userId = +req.session.loginUser.id
        let nameFormatted 
        
        House.findOne({
            where: {id: idHouse}
        })
            .then((data) =>{
                nameFormatted = data.formattedName
                return House.decrement('rooms', {
                    where: {id: idHouse}
                })
            })
            .then((data) => {
                return User.update({
                    HouseId: idHouse,
                }, {where: {id: userId}})
            })
            .then((data) => {
                res.redirect(`/house/${nameFormatted}`)
            })
            .catch((err) => {
                res.send(err)
            })
    }


    static addHouse(req, res) {
        res.render('formAdd')
    }

    static saveHouse(req, res) {
        
    }

}

module.exports = HouseController