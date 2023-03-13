import Transaction from '../models/transaction.schema.js'
import asyncHandler from '../services/asyncHandler.js'
import CustomError from '../utils/customError.js'


/*
* @Create Transaction
* @route : /api/transaction/v1/create-transaction
* @description :  controller for creating
 new trans in DB
 * @Parametes {amount, user, cat, type, date, description}
 @ returns trans Object
 */

 export const createTransaction = asyncHandler(async (req, res) => {
    
 })