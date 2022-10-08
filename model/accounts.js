const mongoose =require('mongoose')
mongoose.connect(process.env.MONGOURL,{ useNewUrlParser: true },(err)=>{
    if (!err){
        console.log("DB account connect success")
    }
    else{
        console.log('Error in DB connection : ' + err)
    }
})

const Schema=mongoose.Schema;

const AccountSchema=new Schema({
    username:String,
    email:String,
    password:String,
    name:String
},{
    collection:"accounts"
})
const AccountModel=mongoose.model("accounts",AccountSchema)
module.exports=AccountModel