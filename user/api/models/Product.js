const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id:{
        type: Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{ 
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    Rstart_date:{
        type:Date,
        required:true,
    },
    Rend_date:{
        type:Date,
        required:true,
    },
    start_date:{
        type:Date,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    duration:{
        type:String,
        required:true,
    },
    avilable:{
        type:Boolean,
        default:true,
    },
    enrolled: [
        {
            type: Object,
        }
    ]
})

module.exports = mongoose.model("Product", productSchema);