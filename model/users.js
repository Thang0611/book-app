const mongoose = require('mongoose')
require('dotenv').config({ path: '.env' })

mongoose.connect(process.env.MONGOURL, { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log("DB accounts connect success")
    }
    else {
        console.log('Error in DB connection : ' + err)
    }
})

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type:String, required:true},
    email:{type:String, required:true},
    password: {type:String, required:true},
    name: {type:String, required:true}
}, {
    // _id:false,
    collection: "users"
})
const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel