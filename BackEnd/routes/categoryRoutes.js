import express from 'express'
import { createCategory, deleteCategory, getAllCategories, updateCategory } from '../controllers/categoryController.js'
import {isLoggedIn} from '../middlewares/auth.middleware.js'


const router = express.Router()

// create category
router.post('/create-category', isLoggedIn, createCategory)
// delete category
router.post('/delete-category/:id', isLoggedIn, deleteCategory)

// update category
router.post('/update-category/:id', isLoggedIn, updateCategory)
// get all cat
router.get('/categories', isLoggedIn, getAllCategories)
export default router