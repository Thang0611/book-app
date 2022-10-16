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
    username: {type:String, required:true,min:6},
    email:{type:String, required:true},
    password: {type:String, required:true,min:6},
    repassword: {type:String},
    name: {type:String, required:true}
}, {
    collection: "users"
})
const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel