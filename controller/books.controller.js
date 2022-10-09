const BookModel = require("../model/books")
const routerBook = require("../router/books")
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

const detailBook=(req,res,next)=>{
    var bookId=req.body.bookId
    BookModel.findOne({bookId:bookId})
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
    var bookId=Number(req.body.bookId);
    BookModel.findOneAndDelete({bookId:bookId},(err,docs)=>{
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
    var bookId=Number(req.body.bookId);;
    console.log("update")
    const book_update={
        title:req.body.title,
        author:req.body.author,
        type:req.body.type,
        date:req.body.date,
        numOfPage:req.body.numOfPage
    }
    BookModel.findOneAndUpdate({bookId:bookId},book_update,(err,data)=>{
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
module.exports = {getBooks,detailBook,deleteBook,updateBook,addBook}