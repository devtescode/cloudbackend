const mongoose = require("mongoose")

let scheme = mongoose.Schema({
    uname:{type:String, unique: true, require: true},
    fname:{type:String, require: true},
    lname:{type:String, require: true},
    pass:{type:String, require: true},
})
let schemeImage = mongoose.Schema({
    userId:{type:String, require: true},
    img:{type:String, require: true},
})


let userCloud = mongoose.model("cloud", scheme)
let userCloudImages = mongoose.model("cloudimages", schemeImage)
module.exports = {User:userCloud,Images:userCloudImages}