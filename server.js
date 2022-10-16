const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routerUser = require("./router/users")
const routerBook = require('./router/books.js')
require('dotenv').config({ path: '.env' })
const cookieParser=require('cookie-parser')
const ImageModel = require('./model/image')
const multer  = require('multer')
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors())
app.use(express.static('public'))
app.use(cookieParser());

// const storage = multer.diskStorage({
//     destination: 'upload',
//     filename:  (req, file, cb)=> {
//       cb(null,file.originalname)
//     }
// })
  
// const upload = multer({ 
//     storage: storage 
// })
// .single('testImage')
// app.post('/upload',(req,res,next)=>{
//     upload(req,res,(err)=>{
//         if (err){
//             console.log(err)
//         }
//         else {
//             const newImage=new ImageModel(
//                 {
//                     name:req.body.name,
//                     image:{
//                         data:req.file.filename,
//                         contentType:'image/png'
//                     }
//                 }
//             )
//             newImage.save()
//             .then(()=>{
//                 res.json({success:true})
//             })
//             .catch(err=>{
//                 console.log(err)
//                 res.json({success:false})
//             })
//         }

//     })
// })
app.use('/api', routerUser)
app.use('/api', routerBook)
app.listen(process.env.PORT || 8080, () => {
    console.log('server listen on PORT 8080 ')
});
