const express=require('express')
const path = require('path')
const bodyParser=require('body-parser')
const routerBook=express.Router();
const BookModel=require("../model/books")
routerBook.use(bodyParser.urlencoded({ extended: false }))
routerBook.use(bodyParser.json());
routerBook.get('/home',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/home.html'))

})
routerBook.get('/api/getBooks',(req,res,next)=>{
    BookModel.find()
    .then((data)=>{
        if (data){
            res.status(200).json(data)
        }
        else {
            res.json('No post yet')
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json('Loi server');
    })
})
// routerBook.get('/api/addBooks',(req,res,next)=>{
//     for (let i = 0; i < 100; i++) {
//         let data={
//             title:"book "+i,
//             author:"author "+i,
//             type:"SGK",
//             date:'12/12/2019',
//             numOfPage:"321"
//         }
//         BookModel.create(data,(err)=>{
//             if (err){
//                 console.log(err)
//             }
//         })
        
//     }
// })
module.exports=routerBook;
