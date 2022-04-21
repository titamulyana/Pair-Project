'use strict'
const { House, Profile, User } = require('../models/index')
const { Op } = require('sequelize')

class HouseController {
    
    static showHouses(req, res){
        const { searchByName, searchByAddress} = req.query

        House.searchHouse(searchByName, searchByAddress)
            .then((data) => {
                res.render('house', {data})
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
                res.render('houseDetail', {data})
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static rentHouse(req,res) {
        const idHouse = +req.params.id
        const userId = +req.session.loginUser.id
        let nameFormatted 
        let dataHouse 
        
        House.findOne({
            where: {id: idHouse}
        })
            .then((data) =>{
                nameFormatted = data.formattedName
                dataHouse = data
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
                res.render('notif', {dataHouse})
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static addHouse(req, res) {
        let errors = req.query.errors

        res.render('formAdd', {errors})
    }

    static saveHouse(req, res) {
        const userId = +req.session.loginUser.id
        const {name, address, imageURL, rooms, price, gender, description, status} = req.body
        const input = {name, address, imageURL, rooms, price, gender, description, status}
        let idHouse

        House.create(input)
            .then((data) => {
                idHouse = data.id
                return User.update({
                    HouseId: idHouse,
                }, {where: {id: userId}})
            })
            .then(() => {
                res.redirect('/house')
            })
            .catch((err) => {
                if(err.name === "SequelizeValidationError") {
                    let errMessage = err.errors.map((ele) => {
                        return ele.message
                    })
                    res.redirect(`/house/add?errors=${errMessage}`)
                }
            })
    }
}

module.exports = HouseController