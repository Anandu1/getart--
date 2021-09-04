const mongoose = require('mongoose');
const userTemplate= mongoose.Schema({
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
});
module.exports= mongoose.model('userData',userTemplate);