const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const routeUrl = require('./routes/routes');
const PORT = process.env.PORT || 5000;
mongoose.connect('mongodb+srv://anandu:10231616@cluster0.nhhsj.mongodb.net/mydb?retryWrites=true&w=majority',{
    useNewUrlParser:true,useUnifiedTopology:true
}).then(()=>console.log('Mongo db connected'));
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use('/app',routeUrl);
app.listen(PORT,console.log(`Server started running on port ${PORT}`));
app.get('/',(req,res)=>{
    res.send("Hello World !");
})