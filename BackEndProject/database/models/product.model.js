const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    title:{
        type:String,
        required: true,
        trim:true
    }, 
    desc:{
        type:String,
        required: true,
        trim:true
    },
    
    image:{
        type:String,
        trim:true,
       // required: true,
    },
    categoryName:{
       type:Array,
      trim:true,
    },
    quantity:{
        type:String,
        trim:true,
    },
    color:{
        type:String,
        trim:true,
    },
    price:{
        type:Number,
        trim:true,
        required: true
    },
    isAddedToCart: {
        type: Boolean,
        default: false
    },
    

    availability: {
        type: Boolean,
        default: true
    },
    
},
{
    timestamps:true
})



const Product = mongoose.model("Product",productSchema)
module.exports= Product