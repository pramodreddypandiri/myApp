import express from "express";
import { createTransaction, deleteTransaction, getAllTransactionsOfUser, getAllTransactionsOfUserUnderCat, updateTransaction,getCategoriesAndAmountForMonthExpense, getCategoriesAndAmountExpense, } from "../controllers/transactionController.js";
import {isLoggedIn} from '../middlewares/auth.middleware.js'
import formidable from 'express-formidable'
const router = express.Router();
// create transaction route
router.post('/create-transaction', isLoggedIn,formidable(), createTransaction)
//delete transaction route
router.post('/delete-transaction/:id', isLoggedIn, deleteTransaction)
//update transaction route
router.post('/update-transaction/:id', isLoggedIn,formidable(), updateTransaction)
//get all trxns of user
router.get('/transactions', isLoggedIn, getAllTransactionsOfUser)
// get all transactions under a cat
router.get('/category-transactions', isLoggedIn, getAllTransactionsOfUserUnderCat)
// get categories sum for month
router.get('/category-sum', isLoggedIn, getCategoriesAndAmountForMonthExpense)
// get categories total sum
router.get('/category-totalsum', isLoggedIn, getCategoriesAndAmountExpense)
//get suggestions 
//router.get('/get-suggestion', isLoggedIn, getSuggestions )
export default router