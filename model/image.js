const mongoose = require('mongoose')
require('dotenv').config({ path: '.env' })

mongoose.connect(process.env.MONGOURL, { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log("DB Image connect success")
    }
    else {
        console.log('Error in ImageDB connection : ' + err)
    }
})

var imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});
const ImageModel =mongoose.model('Image', imageSchema);
//Image is a model which has a schema imageSchema
 
module.exports = ImageModel
