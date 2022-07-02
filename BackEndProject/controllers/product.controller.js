const productModel = require("../database/models/product.model")
class Product{
    static add= async(req,res)=>{
        //detail => req.body, userId=> req.user
        try{
            const productData = new productModel({
                ...req.body,
                userId: req.user._id
            })
            await productData.save()
            res.status(200).send({
                apiStatus:true,
                data:productData,
                message:"added"
            })
        }
        catch(e){
            res.status(500).send({apiStatus:false, message:e.message})
        }
    }
    static myProducts = async(req,res)=>{
        // await productModel.find({userId:req.user._id})
        try{
            await req.user.populate("myProducts")
            res.status(200).send({data:req.user.myProducts})
        }
        catch(e){
            res.status(500).send({err:e.message})
        }
    }

    static ProductId = async(req,res)=>{
        // await productModel.find({userId:req.user._id})
        try{
            const ProductId=await productModel.find({categoryId:req.params.id})
            
            res.status(200).send({
                apiStatus:true,
                data:ProductId,
                message:"data Fetched"
            })
        }
        catch(e){
            res.status(500).send({err:e.message})
        }
    }
//Update
        static updateProduct = async(req,res) =>{
            try{
                const updateProduct = await productModel.findByIdAndUpdate(req.params.id,
                    req.body,
                    { runValidators: true })
                await updateProduct.save()
                res.status(200).send({
                    apiStatus:true,
                    data : categoryData,
                    message:"Update Product"
                })
            }
            catch(e){
                res.status(500).send({apiStatus:false, error: e, message:e.message})
            }
        }

        //delete
        static deleteProduct= async(req,res)=>{
            try{
                const productData = await productModel.findByIdAndDelete(req.params.id)
                res.status(200).send({
                    apiStatus:true,
                    data:productData,
                    message:"Delete Product"
                })
            }
            catch(e){
                res.status(500).send({apiStatus:false, error: e, message:e.message})
            }
        }
       
        //showAllProduct
        static allProduct= async(req,res)=>{
            const qNew= req.query.new;
            const qCategory= req.query.category;
            try{
                let products;
                 if(qNew){
                    products= await productModel.find().sort({createdAt:-1}).limit(5)
                } else if (qCategory){
                    products= await productModel.find({
                        categories:{
                            $in:[qCategory],
                        },
                    });
                } else {
                    products= await productModel.find();
                }
                res.status(200).send({
                    apiStatus:true,
                    data:products,
                })
            }
            catch(e){
                res.status(500).send({apiStatus:false, error: e, message:e.message})
            }
        }
       
        
       /* static uploadImage=  async(req, res)=>{
            try{
                const productData = await productModel.findById(req.params.id)
                const ext = path.extname(req.file.originalname)
                const newName = "images/"+req.file.fieldname + Date.now()+ext
                fs.rename(req.file.path, newName, ()=>{})
                req.product.image = newName
                await req.product.save()
                res.send({data:req.productData})
            }
            catch(e){
                res.send(e.message)
            }
          }*/
            
          static uploadImage = async (req, res) => {
            try {
                const productData = await productModel.findById(req.params.id)
                const ext = path.extname(req.file.originalname)
                const newName = "images/products/" + req.file.fieldname+ Date.now()+ ext
                fs.rename(req.file.path, newName, () => { })
                productData.image = newName
                await productData.save()
                res.send({ data: productData })
            }
            catch (e) {
                res.send(e.message)
            }
        }
        static quantityCheck = async (req, res) => {
            try {
                const productData = await productModel.find(req.params.name)
                await productData.save()
                res.status(200).send({
                    apiStatus: true,
                    data: productData,
                    message: "added"
                })
            }
            catch (e) {
                res.status(500).send({ error: e.message })
            }
        }
          //show quantity
          static checkAvailability = async (req, res) => {
            try {
                const selProduct = await productModel.findById(req.params.id)
                const availability = selProduct.quantity >0 ? true : false
                res.status(200).send({
                    apiStatus: true,
                    data: availability,
                    message: "availability status returned"
                })
            }
            catch (e) {
                res.status(500).send({ apiStatus: false, error: e, message: e.message })
            }
        }
            //categoryProducts
        static categoryProducts = async (req, res) => {
            try {
                await req.user.populate("categoryProducts")
                res.status(200).send({ data: req.category.categoryProducts })
            }
            catch (e) {
                res.status(500).send({ err: e.message })
            }
        }
}
module.exports = Product