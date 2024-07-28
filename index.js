const express = require('express');
const server = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    password: String
  });

const User = mongoose.model('User',userSchema);



main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/demo');
  console.log("DB connected");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}



server.use(cors());
server.use(bodyParser.json());

server.post('/',async (req,res)=>{
    let user = new User();
    user.username = req.body.username;    //to save in db
    user.password = req.body.password;
    const doc = await user.save()
    console.log(doc)   //it won't pass body so include bodyparser
    res.json(doc);
})
server.get('/',async (req,res)=>{
    const docs = await User.find()
    res.json(docs);
})




server.listen(8080,()=>{
    console.log("Server Started");
})