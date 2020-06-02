require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')
const authCtrl = require('./controllers/authController')
const treasureCtrl = require('./controllers/treasureController')
const auth = require('./middleware/authMiddleware')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env


app.use(express.json())

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('DB Connected')

})

app.use(
    session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
}))

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout' , authCtrl.logout)

app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)
app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure)

app.listen(SERVER_PORT, () => console.log(`Running on ${SERVER_PORT}`))