const order = require("../controllers/order.controller")
const {auth, adminAuth} = require("../middleware/auth.middleware")
const router = require("express").Router()

router.post("/add",auth, order.add)
router.put("/updateOrder/id", auth, order.updateOrder)
router.get("/myOrder",auth, order.myOrder)
router.get("/allOrder",auth, order.allOrder)
router.get("/statusOrder",adminAuth, order.statusOrder)

router.delete("/deleteOrder/id", auth, order.deleteOrder)


module.exports = router