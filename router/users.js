const express = require('express')

const routerUser = express.Router();

const { register, login, logout,auth } = require('../controller/user.controller')

routerUser.post('/register', register)
routerUser.post('/login', login)
routerUser.post('/logout',auth, logout)
module.exports = routerUser;