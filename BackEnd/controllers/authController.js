import User from '../models/user.schema.js'
import asyncHandler from '../services/asyncHandler.js'
import CustomError from '../utils/customError.js'
import { cookieOptions } from '../utils/cookieOptions.js'

/*
* @REGISTER
* @route : /api/auth/v1/register
* @description : User registration controller fr creatig
 new user in DB
 * @Parametes name, email, password, profession, income
 @ returns User Object
 */

 export const register = asyncHandler( async (req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password){
        throw new CustomError("All mandatory fields are required")
    }
    // check if user already existed
    const existingUser = await User.findOne({email})

    if (existingUser){
        throw new CustomError('User already exists please log in')
    }
    // create a user
    const user = await User.create({
        name, email, password
    })
    // create a token for user
    const token = await user.getJwtToken()
     user.password = undefined

     res.cookie("token",token, cookieOptions)
     res.status(200).json({
        success: true,
        token,
        user
     })
 })