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
    const {name, email, password,question} = req.body
    if(!name || !email || !password || !question){
        throw new CustomError("All mandatory fields are required")
    }
    // check if user already existed
    const existingUser = await User.findOne({email})

    if (existingUser){
        throw new CustomError('User already exists please log in')
    }
    // create a user
    const user = await User.create({
        name, email, password, question
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

 /*
@ login
@ route : /api/v1/auth/login
@desciption : User login controller
@parameters : email, password
@retruns User Object
 */
export const login = asyncHandler( async (req, res) => {
    const {email, password} = req.body
    
    if (!email || !password) {
        throw new CustomError("Email and Password are required")
    }
    const user = await User.findOne({email}).select("+password")
    //console.log(user);
    if (!user){
        throw new CustomError("Invalid Credintials", 400)
    }
    const passwordMatch = await user.comparePassword(password)
    console.log(passwordMatch);
    if(!passwordMatch){
        throw new CustomError("Invalid Credentials")
    }
    
        const token = await user.getJwtToken()
        user.password = undefined
        res.cookie("token",token,cookieOptions)
        res.status(200).json({
            success: true,
            token,
            user
        })
        
})

/*
@ Log out
@ route /api/v1/auth/logout
@description : set cookie token to null and expire cookie
@ parameters : none
@ return : success message

*/
 export const logout = asyncHandler(async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logged out Successfully"
    })
 })

 /*
@ FORGOT PASSWORD
@ description :  controller for forgot password
@ route : /forgotpassword
@ returns success message 
*/
export const forgotPassword = asyncHandler(async (req, res) => {
    try{
       const {email,question, newPassword} = req.body
       
       if(!email || !newPassword || !question){
        throw new CustomError("All Fields are required")
       }
       const user = await User.findOne({email, question})
       if(!user){
        res.status(404).json({
            success: false,
            message : "Incorrect email or answer"
        })
        
       }
       else{
       user.password = newPassword
       user.save()
       res.status(200).json({
        success: true,
        message: "Password changed Successfully"
       })
    }
       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error
        })
    }
})
 /*
@ Update User Profile
@ description :  controller for forgot password
@ route : /update-user
@ returns a token  
*/
export const updateUserProfile = asyncHandler(async (req, res) => {
    try{
        const {id} = req.params
        const {name, email, profession, income} = req.body
        console.log(id,name, email, profession, income);
        const user = await User.findByIdAndUpdate(id, {name: name, email : email, profession: profession, income: income})
        console.log(user);
        if(user){
            res.status(200).json({
                success: true,
                message: "Updated Sccessfully",
                user
            })
        }
        else{
            res.status(500).json({
                success : false,
                message: "Error in Update Profile"
            })
        }
    } catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Update Profile"
        })
    }
})