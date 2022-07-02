const multer  = require('multer')
const upload = multer({ dest: 'images/' })
const uploadFile = require("../middleware/uploadFile")
const user = require("../controllers/user.controller")
const router = require("express").Router()
const { auth, adminAuth } = require("../middleware/auth.middleware")
//add user
router.post("/register", user.register)
router.post("/addAdmin",adminAuth, user.addAdmin)
//login user
router.post("/login", user.login)
//get all users
router.get("/all",adminAuth, user.getAllUsers)
//get single user
router.get("/all/:id", auth, user.getSingleUser)

//update user
router.patch("/update", auth, user.updateUser)
//update password
router.patch("/updatePassword", auth, user.changePassword)
//remove account
router.delete("/delete", user.deleteUser)
//add Address to user
router.post("/addAddr", auth, user.addAddr)
router.patch('/profile',auth, upload.single('profile'),user.uploadImage)
router.patch('/profile1',auth, uploadFile.single('profile'),user.uploadImageFile)

module.exports=router