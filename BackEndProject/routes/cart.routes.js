const cart = require("../controllers/cart.controller")
const {auth, adminAuth} = require("../middleware/auth.middleware")
const router = require("express").Router()

router.post("/add",auth, cart.add)
router.get("/myCart/id", auth, cart.myCart)

router.put("/updateCart", auth, cart.updateCart)

router.get("/allCart",auth, cart.allCart)
router.delete("/deleteCart", auth, cart.deleteCart)


module.exports = router