const express = require('express');
const router = express.Router();
const productTemplateCopy = require('../models/SignupModels');
const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const RegisterModel = require('../models/RegisterModel');
require('dotenv').config();
const users =[]
router.post('/addProduct',(req,res)=>{
   const product = new productTemplateCopy({
    productName:req.body.productName,
    productDescription:req.body.productDescription,
    price:req.body.price,
    seoTitle:req.body.seoTitle,
    seoDescription:req.body.seoDescription,
    productImage:req.body.productImage,
    tags:req.body.tags,
    variants:req.body.variants,
   })
   product.save().then((data)=>{
       res.json(data)
   }).catch(error=>{
      res.json(error) ;
   })
});
router.get('/products',async(req,res)=>{
 await productTemplateCopy.find({},(err,result)=>{
      if(err){
         res.send(err)
      }
      res.send(result);
   })

});
// router.post("/signup",  (req,res)=>{
//    const newUser=  new UserModel({
//       Email:req.body.Email,
//       Password:req.body.Password
//    });
//    newUser.save();
//    console.log(newUser) ;
//    return res.json({
//       message:"User Created",newUser
//    });
// });
router.post('/login',async(req,res)=>{
   try {
   const hashedPassword = await bcrypt.hash(req.body.password,10);
   console.log(hashedPassword);
  const user= {
     username:req.body.username,
     password:hashedPassword
  }
  users.push(user)
  res.status(201).send(users)
   } catch (error) {
      res.status(500).send()
   }
 
});
// router.post('/users/login',async (req,res)=>{
//    const user = users.find(user=>user.username=req.body.username);
//    if(user==null){
//       return res.status(400).send("can't find user")
//    }
//    try {
//       bcrypt.compare(req.body.password,user.password)
//    } catch (error) {
//       res.status(500).send()
//    }
// })
router.post('/user/signup',async(req,res)=>{
   if(!req.body.username || !req.body.password) {
      return res.json({message:'"Invalid credentials'})
   }
   const userExists = await RegisterModel.findOne({username:req.body.username});
   if(userExists) {
      return res.json({message:'"User already exists'})
   }
  else {
   const hashedPassword = await bcrypt.hash(req.body.password,10);
   console.log(hashedPassword);
   const user = new RegisterModel({
    username:req.body.username,
    password:hashedPassword
   })
   user.save().then((data)=>{
       res.json(data)
   }).catch(error=>{
      res.json(error) ;
   })
  }
});
router.post('/user/login',async(req,res)=>{
   if(!req.body.username || !req.body.password) {
      return res.json({message:'"Invalid credentials'})
   }
   const user = await RegisterModel.findOne({username:req.body.username})
   if(user) {
     try {
     if( await bcrypt.compare(req.body.password,user.password)) {
        res.send('Success')
     }
     else{
        res.send('Not allowed')
     }
     } catch (error) {
        res.json({message:"Incorrect Password"})
     }
   }
});
router.get('/products/:id',async(req,res)=>{
   var id = req.params.id
   await productTemplateCopy.findById(id).lean().exec((err,res)=>{
      if(err){
         console.log(err)
         console.log(id)    
      }
      try {
         console.log(res);
         console.log(id)            
     } catch (err) {
         console.log("errror getting results")
         console.log(err)
         console.log(id)    
     } 
   })
  
  });
module.exports=router