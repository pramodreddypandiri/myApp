import express from 'express'
import asyncHandler from '../services/asyncHandler.js'
import CustomError from '../utils/customError.js'
import slugify from 'slugify'
import Category from '../models/category.schema.js'


/*
* @Create category
* @route : /api/auth/v1/create-category
* @description :  controller for creating
 new cat in DB
 * @Parametes name
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