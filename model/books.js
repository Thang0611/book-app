const mongoose = require('mongoose')
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
    // bookId: Number,
    title: String,
    author: String,
    type: String,
    date: String,
    numOfPage: Number
}, {
    collection: "books"
})

const BookModel = mongoose.model("books", BookSchema)

module.exports = BookModel
    // "title":"String",
    // "author":"String",
    // "type":"String",
    // "date":String,
    // "numOfPage":String