import express  from "express";
import  {register} from '../controllers/authController.js'
// create a router object
const router = express.Router();

// register route
router.post('/register', register)
export default router