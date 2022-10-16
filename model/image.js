const mongoose=require('mongoose')

const Schema=mongoose.Schema;
const imageChema=new Schema({
    name:{
        type:String,
        require:true
    },
    image:{
        data:Buffer,
        contentType:String
    }
})

const ImageModel=mongoose.model('imageModel',imageChema)


module.exports=ImageModel