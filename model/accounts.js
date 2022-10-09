const mongoose = require('mongoose')
require('dotenv').config({ path: '.env' })

mongoose.connect(process.env.MONGOURL, { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log("DB account connect success")
    }
    else {
        console.log('Error in DB connection : ' + err)
    }
})

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    username: {type:String, required:true},
    email:{type:String, required:true},
    password: {type:String, required:true},
    name: {type:String, required:true}
}, {
    // _id:false,
    collection: "accounts"
})
const AccountModel = mongoose.model("accounts", AccountSchema)
module.exports = AccountModel