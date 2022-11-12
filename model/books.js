const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
require('dotenv')
mongoose.connect(process.env.MONGOURL, { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log("DB books connect success")
    }
    else {
        console.log('Error in DB connection : ' + err)
    }
})
const Schema = mongoose.Schema;
const BookSchema = new Schema({ 
    // bookId: {type:Number},
    title: {type:String, required:true},
    author: {type:String, required:true},
    type: {type:String, required:true},
    date: {type:String, required:true},
    numOfPage: {type:Number, required:true},
    detail: {type:String, required:true},
    urlImage:{type:String}
}, {
    collection: "books"
})

BookSchema.plugin(AutoIncrement,{inc_field: 'bookId',start_seq:1000})
const BookModel = mongoose.model("books", BookSchema)

module.exports = BookModel
    // "title":"String",
    // "author":"String",
    // "type":"String",
    // "date":String,
    // "numOfPage":String
