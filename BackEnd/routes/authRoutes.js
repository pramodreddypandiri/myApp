import express  from "express";
import  {register} from '../controllers/authController.js'
import {login} from '../controllers/authController.js'
import { logout } from "../controllers/authController.js";
import { isAdmin, isLoggedIn } from "../middlewares/auth.middleware.js";
// create a router object
const router = express.Router();

// register route
router.post('/register', register)
// login route
router.post('/login',login)

//logout route
router.post('/logout',isLoggedIn,logout)

export default router