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
        console.log(req.body)
    }

}

module.exports = HouseController