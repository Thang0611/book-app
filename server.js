const express=require('express')
const path=require('path')
const bodyParser=require('body-parser')
const cors=require('cors')
const routerUser=require("./router/users")
const routerBook=require('./router/books.js')
require('dotenv').config({ path: '.env' })
const app=express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors())
app.use(express.static('public'))
app.use('/api',routerUser)
app.use('/api',routerBook)

// app.get('/',(req,res)=>{
//     res.redirect(path.join(__dirname,'public/index.html'))
// })
app.listen(process.env.PORT||8080,()=>{
    console.log('server listen on PORT 8080 ')
});
