const multer  = require('multer')
const upload = multer({ dest: 'images/' })
const uploadFile = require("../middleware/uploadFile")
const product = require("../controllers/product.controller")
const {auth, adminAuth} = require("../middleware/auth.middleware")
const router = require("express").Router()

router.post("/add",adminAuth, product.add)
router.get("/myProducts", auth, product.myProducts)
router.get("/ProductId/:id",auth,product.ProductId)
router.put("/updateProduct", adminAuth, product.updateProduct)
router.get("/allProduct", product.allProduct)
router.delete("/deleteProduct/:id", adminAuth, product.deleteProduct)
router.patch('/p-image/:id',adminAuth, upload.single('product'),product.uploadImage)
router.get("/check-availability/:id", product.checkAvailability)


module.exports = router
