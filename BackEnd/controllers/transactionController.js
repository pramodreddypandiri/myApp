import Transaction from '../models/transaction.schema.js'
import asyncHandler from '../services/asyncHandler.js'
import CustomError from '../utils/customError.js'
import fs from 'fs'
import { threadId } from 'worker_threads'
/*
* @Create Transaction
* @route : /api/transaction/v1/create-transaction
* @description :  controller for creating
 new trans in DB
 * @Parametes {amount, user, cat, type, date, description}
 @ returns trans Object
 */

 export const createTransaction = asyncHandler(async (req, res) => {
    console.log("inside trans cntroller");
    try{
       const {amount,type, description,date,userId, categoryId} = req.fields
      if (!amount || !type || !date || !userId || !categoryId){
        throw new CustomError("Required all mandatory fields")
      }
      const newTransaction = await Transaction.create({amount, type,description, date, userId, categoryId })
      res.status(200).json({
        success: true,
        message: "Transaction saved successfully",
        newTransaction
      })
    } catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in create transaction"
        })
    }
 })
 /*
* @delete Transaction
* @route : /api/transaction/v1/delete-transaction/:id
* @description :  controller for deleting
  existed trans in DB
 * @Parametes {id}
 @ returns success message
 */
export const deleteTransaction = asyncHandler(async (req, res) => {
    try{
        const {id} = req.params
        if(!id){
            throw new CustomError("Id is required")
        }
        const transaction = await Transaction.findByIdAndDelete(id)
        if(!transaction){
            throw new CustomError("Not able to delete trnxn")
        }
        res.status(200).json({
            success : true,
            message : "Deleted Transaction successfully"
        })

    } catch (error){
        res.status(500).json({
            success : false,
            message : "Error in Delete trasaction"
        })

    }
})

/*
* @update Transaction
* @route : /api/transaction/v1/update-transaction/:id
* @description :  controller for updating
  existed trans in DB
 * @Parametes {id}
 @ returns success message
 */
export const updateTransaction = asyncHandler(async (req, res) => {
    try{
        const {id} = req.params
        const fieldsToUpdate = { ...req.fields };
        //console.log(fieldsToUpdate);
        if(!id){
            throw new CustomError("Id is required")
        }
        const updatedTransaction = await Transaction.findByIdAndUpdate(id,fieldsToUpdate)
        if(!updateTransaction){
            throw new CustomError("updated transaction not there")
        }
        res.status(200).json({
            success: true,
            message: "Updated Trnxn successfully",
            updatedTransaction
        })
    } catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in update transaction"
        })
    }
})
/*
* @getAll transactions
* @route : /api/v1/transaction/transactions/userId:
* @description :  controller for fetching all transactions of a user
 * @Parametes {userId}
 @ returns success message all trxnxs
 */
export const getAllTransactionsOfUser = asyncHandler(async (req, res) => {
    try{
        const {userId} = req.query
        if(!userId){
            throw new CustomError("User Id is required")
        }
        const allTransactionsOfUser = await Transaction.find({ userId}).populate('categoryId')
        if(!allTransactionsOfUser){
            throw new CustomError("Unable to get all transaction")
        }
        res.status(200).json({
            success: true,
            message : "Fetched all trnxns successfully",
            allTransactionsOfUser,
            totalCount : allTransactionsOfUser.length 
        })

    } catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in get all transactionns"
        })
    }
})
/*
* @getAll transactions under particular category
 * @route : /api/v1/transaction/category-transactions
* @description :  controller for fetching all transactions of a user under a given category
 * @Parametes {userId, categoryId}
 @ returns success message all trxnxs under given category
 */
export const getAllTransactionsOfUserUnderCat = asyncHandler(async(req, res) => {
    try{
        const {userId, categoryId} = req.body
        if(!userId || !categoryId){
            throw new CustomError("user id and category id both are required")
        }
        const allCatTransactions = await Transaction.find({userId, categoryId}).populate('categoryId')
        res.status(200).json({
            success: true,
            message: "Fetched all trnxnx under cat",
            allCatTransactions,
            count: allCatTransactions.length
        })
    } catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in get trnxnx under cat"
        })
    }
})
/*
* @get transactions sum  category wise for selected month
* @route : /api/v1/transaction/category-sum/
* @description :  controller for updating
  
 * @Parametes {month}
 @ returns returns [{name: 'category', value: sum of amounts of category}]
 */
export const getCategoriesAndAmountForMonthExpense = asyncHandler(async (req, res) => {
    console.log(req.query);
    try{
        const {userId,month} = req.query
        if(!userId){
            throw new CustomError("User Id is required")
        }
        //if(!month){
        //const allTransactionsOfUser = await Transaction.find({userId}).populate('categoryId')
        //}
        //else{}
            const formattedMonth = parseInt(month);
            const allTransactionsOfUser = await Transaction.find({userId,date: { 
                $gte: new Date(`${formattedMonth}/01/2023`), // First day of the selected month
                $lt: new Date(`${formattedMonth+1}/01/2023`) // First day of the next month
              },type: 'EXPENSE',}).populate('categoryId') 
        
        if(!allTransactionsOfUser){
            throw new CustomError("Unable to get all transaction")
        }
        // creating data points
        const datapoints = [];
        const temp = {};

        allTransactionsOfUser.forEach(transaction => {
        const { amount, categoryId: { title } } = transaction;
        if (!temp[title]) {
            temp[title] = {
            name: title,
            value: Number(amount),
            };
        } else {
            temp[title].value += Number(amount);
        }
        });

        for (const title in temp) {
        datapoints.push(temp[title]);
        }


        //
        res.status(200).json({
            success : true,
            message: "sending month datapoints",
            datapoints

        })
    } catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message : "Error in getCategoriesAndAmountForMonth"
        })

    }
})
/*
* @get total transactions sum  category wise income/expense
* @route : /api/v1/transaction/category-totalsum
* @description :  
    gives an array that contains categories and total amount under category 
 * @Parametes 
 @ returns returns [{name: 'category', value: sum of amounts of category}]
 */
 export const getCategoriesAndAmountExpense = asyncHandler(async (req, res) => {
    
    try{
        const {userId, type} = req.query
        if(!userId){
            throw new CustomError("User Id is required")
        }
        const allTransactionsOfUser = await Transaction.find({userId,type: type,}).populate('categoryId') 
        
        if(!allTransactionsOfUser){
            throw new CustomError("Unable to get all transaction")
        }
        // creating data points
        const datapoints = [];
        const temp = {};

        allTransactionsOfUser.forEach(transaction => {
        const { amount, categoryId: { title } } = transaction;
        if (!temp[title]) {
            temp[title] = {
            name: title,
            value: Number(amount),
            };
        } else {
            temp[title].value += Number(amount);
        }
        });

        for (const title in temp) {
        datapoints.push(temp[title]);
        }
        //
        res.status(200).json({
            success : true,
            message: "sending total datapoints",
            datapoints

        })
    } catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message : "Error in getCategoriesAndAmountForExpense"
        })

    }
})