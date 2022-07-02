const mongoose = require("mongoose")
const categorySchema = mongoose.Schema({
    userId: {      
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    
    categoryName: {
        type: String,
        trim: true,
        required: true
    },
    categoryImage: {
        type: String,
        trim: true,
    },
},
{ timeStamps: true })


categorySchema.virtual("categoryProducts", {
    ref: "Product",
    localField: "_id",
    foreignField: "categoryId"
})

const Category = mongoose.model("Category", categorySchema)

module.exports = Category