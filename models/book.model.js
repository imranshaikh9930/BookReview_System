const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true

    },
    image:{
        type:String,
    },
    reviews:[{
       type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    genre:{
        type:String,
    },
    rating:{
        type:Number,
        default:1,
        min:1,
        max:5
    }


},{timestamps:true});

module.exports = mongoose.model("Book",bookSchema);
