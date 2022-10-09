const express = require('express')

const routerUser = express.Router();

const { register, login, logout } = require('../controller/user.controller')

routerUser.post('/register', register)
routerUser.post('/login', login)
routerUser.post('/logout', logout)
module.exports = routerUser;