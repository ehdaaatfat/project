const path = require("path")
const fs = require("fs")
const categoryModel = require("../database/models/product.model")

class Category {
    static addCategory = async (req, res) => {
        try {
            const categoryData = await new categoryModel({ ...req.body, userId: req.user._id })
            categoryData.save()
            res.status(200).send({
                apiStatus: true,
                data: categoryData,
                message: "category added successfuly"
            })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, message: e.message })
        }
    }
    static showAll = async(req,res)=>{
        try{
            const catData = await categoryModel.find()
            res.status(200).send({
                data:catData,
                apiStatus:true,
                message:"all categories fetched successfully"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                error:e,
                message:e.message
            })
        }
    }

    // update category
    static updateCategory = async (req, res) => {
        try {
            const categoryData = await categoryModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { runValidators: true }
            )
            res.status(200).send({
                apiStatus: true,
                data: categoryData,
                message: "Category Data Updated...."
            })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, error: e, message: e.message })
        }
    }

    static showCatProduct = async (req, res) => {
        try {
            
            const categoryProduct = await productModel.find({categoryId:req.params.id}) 
            res.status(200).send({
                apiStatus: true,
                data: categoryProduct,
                message: "Category products fetched successfully..."
            })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, error: e, message: e.message })
        }
    }
    
    

    //upload image
    static uploadImage = async (req, res) => {
        try {
            const categoryData = await categoryModel.findById(req.params.id)
            const ext = path.extname(req.file.originalname)
            const newName = "images/categories/" + req.file.fieldname + ext
            fs.rename(req.file.path, newName, () => { })
            categoryData.productImage = newName
            await categoryData.save()
            res.send({ data: categoryData })
        }
        catch (e) {
            res.send(e.message)
        }
    }

    static myCategories = async (req, res) => {
        try {
            await req.user.populate("myCategories")
            res.status(200).send({ data: req.user.myCategories })
        }
        catch (e) {
            res.status(500).send({ err: e.message })
        }
    }

}
module.exports = Category