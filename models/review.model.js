const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book",
        required:true
    },
    rating:{
        type:Number,
        default:1,
        min:1,
        max:5,
        required:true

    },
    comment:{
        type:String,
        trim:true
    }
},{timestamps:true});

module.exports = mongoose.model("Review",reviewSchema);
