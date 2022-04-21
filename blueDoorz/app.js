const express = require('express')
const app = express()
const port = 3000
const router = require('./routes') 
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: "rahasia",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        sameSite: false
    }
}))

app.use('/', router)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})