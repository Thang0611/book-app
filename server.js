const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routerUser = require("./router/users")
const routerBook = require('./router/books.js')
const path=require('path')
require('dotenv').config({ path: '.env' })
const cookieParser=require('cookie-parser')
const ImageModel = require('./model/image')
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors())
app.use(express.static('public'))
app.use('api',express.static('images'))
app.use(cookieParser());
app.set("view engine","ejs");

const multer  = require('multer')
const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'images', 
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now()+".png"
)
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});
const imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) { 
         // upload only png and jpg format
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
}) 
app.get('/users/:id', (req, res) => {
  res.send(req.params.id)
})
app.post('/api/uploadImage', imageUpload.single('image'), (req, res) => {
    res.sendFile(path.join(__dirname,'./images/image_1666783912155.png'))
    res.send(req.file)
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})
app.get('/api/image', (req, res) => {
  res.sendFile(path.join(__dirname,'./images/image_1666783912155.png'))
}, (error, req, res, next) => {
  console.log(error)
  res.status(400).send({ error: error.message })
})

app.use('/api', routerUser)
app.use('/api', routerBook)
app.listen(process.env.PORT || 8080, () => {
    console.log('server listen on PORT 8080 ')
});
