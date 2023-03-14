import express from "express";
import { createTransaction, deleteTransaction, getAllTransactionsOfUser, updateTransaction } from "../controllers/transactionController.js";
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
export default router