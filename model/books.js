const mongoose =require('mongoose')
require('dotenv')
mongoose.connect(process.env.MONGOURL,{ useNewUrlParser: true },(err)=>{
    if (!err){
        console.log("DB books connect success")
    }
    else{
        console.log('Error in DB connection : ' + err)
    }
})
const Schema=mongoose.Schema;
//Tiêu đề, tác giả, thể loại, ngày phát hành, số trang và 1 cột để trống ở cuối.
const BookSchema=new Schema({
    title:String,
    author:String,
    type:String,
    date:String,
    numOfPage:String
},{
    collection:"books"
})
const BookModel=mongoose.model("books",BookSchema)
module.exports=BookModel
    // "title":"String",
    // "author":"String",
    // "type":"String",
    // "date":String,
    // "numOfPage":String