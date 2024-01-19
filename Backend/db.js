const mongoose = require('mongoose');
const { MongoClient } = require("mongodb");


const mongoURI = 'mongo-url';
const mongodb = async()=>{

    await mongoose.connect(mongoURI,{
    })
    .then(async()=>{
    const fetched_data = await mongoose.connection.db.collection("Box_items");
    const data = await fetched_data.find({}).toArray();

    const category = await mongoose.connection.db.collection("Category");
    const catData = await category.find({}).toArray();

    global.Box_items = data;
    global.Category = catData;
    // console.log(global.Box_items);
        
    
    console.log("mongoDb connected");
        
}).catch((error)=>console.log(error));





}
module.exports=mongodb;