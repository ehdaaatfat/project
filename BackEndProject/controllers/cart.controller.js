const cartModel = require("../database/models/cart.model")
const productModel = require("../database/models/product.model")

class Cart {
    static add = async (req, res) => {
        const {userId ,productId, quantity, name, price } = req.body;
      
        userId; //TODO: the logged in user id
      
        try {
          let cart = await cartModel.findOne({ userId });
      
          if (cart) {
            //cart exists for user
            let itemIndex = cartModel.products.findIndex(p => p.productId == productId);
      
            if (itemIndex > -1) {
              //product exists in the cart, update the quantity
              let productItem = cartModel.products[itemIndex];
              productItem.quantity = quantity;
              cartModel.products[itemIndex] = productItem;
            } else {
              //product does not exists in cart, add new item
              cartModel.products.push({ productId, quantity, name, price });
            }
            cart = await cart.save();
            return res.status(200).send(cart);
          } else {
            //no cart for user, create new cart
            const newCart = await Cart.create({
              userId,
              products: [{ productId, quantity, name, price }]
            });
      
            return res.status(200).send(newCart);
          }
        } catch (err) {
          console.log(err);
          res.status(500).send("Something went wrong");
        }
      }

    
    
    
    static updateCart = async (req, res) => {
        try {
            const updateCart = await cartModel.findByIdAndUpdate(req.params.id)
            updateCart.data = req.body.data
            await updateCart.save()
            res.status(200).send({
                apiStatus: true,
                data: updateCart,
                message: "Update Product cart"
            })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, error: e, message: e.message })
        }
    }

    //delete
    static deleteCart = async (req, res) => {
        try {
            const cartData = await cartModel.findByIdAndDelete(req.params.id)
            res.status(200).send({
                apiStatus: true,
                data: cartData,
                message: "Delete Product Cart"
            })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, error: e, message: e.message })
        }
    }

    //showcart
    static myCart = async (req, res) => {
        try {
            const cartData = await cartModel.findOne({ userId: req.user._id })
            res.status(200).send({
                apiStatus: true,
                data: cartData,
            })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, error: e, message: e.message })
        }
    }

    /* 
    static myCart = async(req,res)=>{
        // await productModel.find({userId:req.user._id})
        try{
            await req.user.populate("myCart")
            res.status(200).send({data:req.user.myCart})
        }
        catch(e){
            res.status(500).send({err:e.message})
        }
    }
*/

    //showAll
    static allCart = async (req, res) => {

        try {
            allCart = await cartModel.find();
            res.status(200).send({
                apiStatus: true,
                data: allCart,
            })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, error: e, message: e.message })
        }
    }

}
module.exports = Cart