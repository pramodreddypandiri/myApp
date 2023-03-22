import express  from "express";
import  {register, updateUserProfile} from '../controllers/authController.js'
import {login} from '../controllers/authController.js'
import { logout } from "../controllers/authController.js";
import { forgotPassword } from "../controllers/authController.js";
import { isAdmin, isLoggedIn } from "../middlewares/auth.middleware.js";
// create a router object
const router = express.Router();

// register route
router.post('/register', register)
// login route
router.post('/login',login)

//logout route
router.post('/logout',isLoggedIn,logout)
// forgot password route
router.post('/forgot-password', forgotPassword)
// update user profile
router.post('/update-profile/:id',isLoggedIn, updateUserProfile)
//protected routes for user
router.get("/user-auth", isLoggedIn, (req, res) => {
    res.status(200).send({ok: true})
})
//protected routes for admin
router.get("/admin-auth", isLoggedIn,isAdmin, (req, res) => {
    res.status(200).send({ok: true})
})

export default router