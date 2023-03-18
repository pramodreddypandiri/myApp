import express from 'express'
import asyncHandler from '../services/asyncHandler.js'
import CustomError from '../utils/customError.js'
import slugify from 'slugify'
import Category from '../models/category.schema.js'

import mongoose from 'mongoose'
/*
* @Create category
* @route : /api/auth/v1/category/create-category
* @description :  controller for creating
 new cat in DB
 * @Parametes title, userId
 @ returns User Object
 */
export const createCategory = asyncHandler(async (req, res) => {
    const {title, userId} = req.body
    console.log(title
        ,userId);
    try {
        if(!title){
            throw new CustomError("Category name is required")
        }
        //console.log("insdie try");
        const existingCat = await Category.findOne({title, userId})
        console.log(existingCat?.title);
        console.log("cexisting cat chekd");
        if(!existingCat){
            console.log("No exiting cat");
            const cat = await  Category.create({title, userId})
           res.status(200).json({
                success : true,
                message: "Created Caterogry",
                cat
            })
        }
        else{
        
        res.status(401).json({
            success: false,
            message: "Category was alredy there",
            existingCat
        })
      } 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            error,
            message: "Error in category creation"
        })
    }
    
    
})
/*
* @Delete category
* @route : /api/auth/v1/category/delete-category
* @description :  controller for deleting a cat in DB
 * @Parametes title, userId
 @ returns success,message 
 */
export const deleteCategory  = asyncHandler(async (req, res) => {
   try{
    const {id} = req.params
    const {userId} = req.body
    const deleteCat = await Category.findOneAndDelete({_id:id, userId :userId})
    console.log(deleteCat);
    res.status(200).json({
        success: true,
        message : "Delete cat successfully",

    })
   } catch(error){
       console.log(error);
       res.status(500).json({
        success: false,
        message : "Error in delete cat"
       })

   }
})
/*
* @Update category
* @route : /api/auth/v1/category/update-category
* @description :  controller for deleting a cat in DB
 * @Parametes title, userId
 @ returns success,message 
 */
export const updateCategory = asyncHandler(async (req, res) => {
    try {
        const {title, userId} = req.body
        const {id} = req.params
        console.log(title, id);
        const updatedCat = await Category.findOneAndUpdate({_id:id, userId :userId}, {title: title}, {new: true})
        console.log("after update");
        res.status(200).json({
            success : true,
            message: "Category updated successfully",
            updatedCat
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error,
            message: "Error while updating category"
        })
    }
    
})
/*
* @Get all categories
* @route : /api/auth/v1/category/categories
* @description :  controller for getting all cat in DB
 * @Parametes title, userId
 @ returns success,message 
 */
export const getAllCategories = asyncHandler(async (req, res) => {
    try {
        //console.log(req.body);
        //console.log(req.query);
        const userId = req.query.userId
        //console.log(userId);
        //const userid = new mongoose.Types.ObjectId(userId);
        //console.log(typeof(userid));
        const allCatOfUser = await Category.find({userId : userId})
        //console.log("after allCat");
        res.status(200).json({
            success: true,
            message: "Fetched all cats",
            allCatOfUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message: "Error in getAllCatofUser"

        })
    }
})