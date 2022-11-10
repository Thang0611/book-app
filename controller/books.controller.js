const BookModel = require("../model/books")

const getBooks = async (req, res, next) => {
    await BookModel.find()
        .then((data) => {
            if (data) {
                res.status(200).json(data)
            }
            else {
                res.status(200).json('No post yet')
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json('No data');
        })
}
//

const detailBook=async (req,res,next)=>{
    // var id=req.body._id
    // var id=req.params._id
    console.log(req.params)
    await BookModel.findById(req.params._id)
    .then((data)=>{ 
        if (data){
            res.status(200).json(data)
        }
        else {
            res.status(400).json('NOT FOUND')
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json('NOT FOUND ID');
    })
}

const deleteBook= (req,res,next)=>{
    var id=req.params._id
    BookModel.findById(id)
    .then(data=>{
        if(data){
            console.log(data)
            BookModel.deleteOne({_id:id},(err)=>{
                if (err){
                    res.status(400).json({
                        success:false,
                        message:'delete failse'
                    })
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
            res.status(400).json({
                success:false
            })
        }
    })

    .catch(err=>{
        console.log('delete err:'+err)
        res.status(500).json("NOT FOUND ID")
    })
}

const updateBook=(req,res,next)=>{
    var id=req.params._id;
    console.log(req.params)
    // const book_update=new BookModel(req.body)
    const book_update={
            title:req.body.title,
            author:req.body.author,
            type:req.body.type,
            date:req.body.date,
            numOfPage:req.body.numOfPage,
            detail:req.body.detail,
            urlImage:req.body.urlImage

    }
    BookModel.findOne({_id:id})
    .then(data=>{
        console.log(data)
        if(data){
            BookModel.updateOne({_id:data._id},book_update,(err,data)=>{
                if (err){
                    console.log(err);
                    res.json({success:false})
                }
                else {
                    // console.log(data)
                    res.json({success:true})
                }
            })
        }
        else {
            res.status(400).json({
                success:false,
                message:"book khong ton tai"
            })
        }
    }
    )
    .catch(err=>{
        res.status(500).json({
            success:false,
            message:"book khong ton tai"
        })
    })
}

const addBook=async (req,res,next)=>{
    console.log(req.body)
    var book=new BookModel(req.body)
    await book.save((err,data)=>{
        if(err){
            res.status(400).json({
                success:false
            })
        }
        else {
            console.log(data);
            res.json({
                success:true
            })
        }
    })
}

module.exports = {getBooks,detailBook,deleteBook,updateBook,addBook}
