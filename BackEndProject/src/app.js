require('../database/connect')
const express= require("express")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())
const path = require("path")
const staticDir = path.join(__dirname, "../images")
app.use(express.static(staticDir))
app.use(express.urlencoded({extended:true}))
//user and admin
const userRoutes=require("../routes/user.routes")
app.use("/user",userRoutes)
//product
const productRoutes=require("../routes/product.routes")
app.use("/product",productRoutes)
//category
const categoryRoutes = require("../routes/category.routes")
app.use("/category", categoryRoutes)
//cart
const cartRoutes=require("../routes/cart.routes")
app.use("/cart",cartRoutes)
//order
const orderRoutes=require("../routes/order.routes")
app.use("/order",orderRoutes)
//stripe
const stripeRoutes=require("../routes/stripe.routes")
app.use("/stripe",stripeRoutes)
module.exports = app