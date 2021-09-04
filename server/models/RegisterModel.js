const mongoose = require('mongoose');
const RegisterModel= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
});
module.exports= mongoose.model('UserDetails',RegisterModel);