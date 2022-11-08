const mongoose=require("mongoose")
const schema=mongoose.Schema({
    urlId:{
        type:String,
        required:true
    },
    urlAddress:{
        type:String,
        required: true
    },
    shortUrl:{
        type:String,
        required:true
    },
    totalRedirects:{
        type:Number,
        required:true,
        default: 0
    },
    date:{
        type:String,
        default: Date.now()
    }
})

module.exports = mongoose.model("url",schema);