const mongoose = require('mongoose');
const productTemplate= mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productDescription:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    tags: {
        type:[String]
    },
    productImage:{
        type:String,
        required:true
    },
    seoTitle:{
        type:String,
        required:true
    },
    seoDescription:{
        type:String,
        required:true
    },
    variants:{
        type:[{Object}],
        required:true
    },
    id:{
        type:String
    }
});
module.exports= mongoose.model('productData',productTemplate);