const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routerUser = require("./router/users")
const routerBook = require('./router/books.js')
require('dotenv').config({ path: '.env' })
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors())
app.use(express.static('public'))

app.use('/api', routerUser)
app.use('/api', routerBook)
app.listen(process.env.PORT || 8080, () => {
    console.log('server listen on PORT 8080 ')
});
