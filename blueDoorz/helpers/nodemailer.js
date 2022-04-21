"use strict"
const nodemailer = require("nodemailer")

function sendEmail(sendTo, name){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'joindonghacktiv8@gmail.com',
            pass: 'Pohodeu1'
        }
    });
    
    var mailOptions = {
        from: 'joindonghacktiv8@gmail.com',
        to: `${sendTo}`,
        subject: 'Pembayaran Rent House',
        text: `halo ${name}, kamu bisa melakukan pembayaran dengan transfer ke nomor rekening 010101010 Bank BCO atas nama BADMAN`
    };
    
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err;
        console.log('Email sent: ' + info.response);
    });
}

function komplain(message){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'joindonghacktiv8@gmail.com',
            pass: 'Pohodeu1'
        }
    });
    
    var mailOptions = {
        from: 'joindonghacktiv8@gmail.com',
        to: "",
        subject: 'Komplain',
        text: `Kamu mendapatkan komplain dari salah satu user, yaitu : ${message}`
    };
    
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err;
        console.log('Email sent: ' + info.response);
    });
}

module.exports = {sendEmail, komplain};