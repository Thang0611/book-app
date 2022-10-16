const BookModel = require("../model/books")
const routerBook = require("../router/books")
// const multer=require('multer')
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '/tmp/my-uploads')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.originalname)
//     }
//   })
  
//   const upload =multer({ storage: storage })
  
//   upload.single('file')
// const upload = multer({dest:"uploads/"})
const getBooks = (req, res, next) => {
    BookModel.find()
        .then((data) => {
            if (data) {
                res.status(200).json(data)
            }
            else {
                res.json('No post yet')
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json('Loi server');
        })
}
// routerBook.post
const imgUpload= (req,res,next)=>{
    console.log(req.file)
    res.send('upload FIle')
}
const detailBook=(req,res,next)=>{
    var id=req.body._id
    // var id=req.params._id
    BookModel.findById(id)
    .then((data)=>{
        if (data){
            res.status(200).json(data)
        }
        else {
            res.json('NOT FOUND')
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json('Loi server');
    })
}

const deleteBook=(req,res,next)=>{
    var id=req.body._id
    BookModel.findByIdAndDelete(id,(err,docs)=>{
        if (err){
            console.log(err)
        }
        else {
            console.log(docs)
            res.json({
                success:true
            })
        }
    })
}

const updateBook=(req,res,next)=>{
    var id=req.body._id
    console.log("update")
    const book_update={
        title:req.body.title,
        author:req.body.author,
        type:req.body.type,
        date:req.body.date,
        numOfPage:req.body.numOfPage,
        detail:req.body.detail
    }
    BookModel.findOneAndUpdate(id,book_update,(err,data)=>{
        if(err){
            console.log(err)
            res.json({success:false})
        }
        else {
            console.log(data)
            res.json({success:true})
        }
    })
}

const addBook=(req,res,next)=>{
    var book=new BookModel(req.body)
    book.save((err)=>{
        if(err){
            res.json({
                success:false
            })
        }
        else {
            // console.log(data);
            res.json({
                success:true
            })
        }
    })
}

module.exports = {getBooks,detailBook,deleteBook,updateBook,addBook}