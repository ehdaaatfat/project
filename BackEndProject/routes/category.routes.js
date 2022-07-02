const category = require("../controllers/category.controller")
const { auth, adminAuth } = require("../middleware/auth.middleware")
const router = require("express").Router()
const multer = require('multer')
const upload = multer({ dest: 'images/categories/' })

// add category
router.post("/add", adminAuth, category.addCategory)
// update category
router.patch("/update", adminAuth, category.updateCategory)
// show all category
router.get("/all", adminAuth, category.showAll)
// show all category products
router.get("/all-prods", adminAuth, category.showCatProduct)
// show my categories
router.get("/my-categories",category.myCategories)
//add category image
router.patch('/image/:id', adminAuth, upload.single('product'), category.uploadImage)

// router.patch("/change-status/:id", adminAuth, category.changeStatus)
module.exports = router