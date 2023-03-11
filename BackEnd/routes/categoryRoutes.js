import express from 'express'
import { createCategory } from '../controllers/categoryController.js'
import {isLoggedIn} from '../middlewares/auth.middleware.js'


const router = express.Router()

// create category
router.post('/create-category', isLoggedIn, createCategory)
// delete category


// update category


export default router