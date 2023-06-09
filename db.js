const mongoose = require('mongoose');
const mongoUri="mongodb+srv://irfan:irfan123@cluster0.zxbe7tn.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo = ()=>{
    mongoose.connect(mongoUri, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;