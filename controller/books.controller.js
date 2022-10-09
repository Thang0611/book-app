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
    var id=req.body.id
    BookModel.find({_id:id})
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
    var id=req.body.id
    console.log(id)
    BookModel.find({_id:id})
    .then(data=>{
        if(data){
            return BookModel.deleteOne({_id:id},(err)=>{
                if (err){
                    res.status(400).json("delete fail")
                }
                else {
                    res.status(200).json(
                        {
                            success:true,
                            message:"delete success"
                        }
                    )
                }
            })
        }
        else {
            res.json("NOT EXITS")
        }
    })
    .catch(err=>{
        console.log('delete err:'+err)
    })
}

const updateBook=(req,res,next)=>{
    var id=req.body.id;
    // const book_update=new BookModel(req.body)
    const book_update={
        title:req.body.title,
        author:req.body.author,
        type:req.body.type,
        date:req.body.date,
        numOfPage:req.body.numOfPage
    }
    BookModel.findOneAndUpdate({_id:id},book_update,(err)=>{
        if(err){
            console.log(err)
            res.json({success:false})
        }
        else {
            res.json({success:true})
        }
    })
}

const addBook=(req,res,next)=>{
    var id=req.body.id;
    var book=new BookModel({
        title:req.body.title,
        author:req.body.author,
        type:req.body.type,
        date:req.body.date,
        numOfPage:req.body.numOfPage
    })
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
    // BookModel.insert(book,(err)=>{
    //     if (err){
    //         res.json({
    //             success:false
    //         })
    //     }
    //     else {
    //         res.json({
    //             success:true
    //         })
    //     }
    // })
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