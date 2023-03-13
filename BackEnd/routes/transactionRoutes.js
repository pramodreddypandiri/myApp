import express from "express";
import { createTransaction } from "../controllers/transactionController.js";
import {isLoggedIn} from '../middlewares/auth.middleware.js'

const router = express.Router();
// create transaction route
router.post('/create-transaction', isLoggedIn, createTransaction)

export default router