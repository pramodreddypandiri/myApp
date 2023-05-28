import User from '../models/user.schema.js'
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../utils/customError.js";
import  JWT  from "jsonwebtoken";
import configs from "../config/index.js";
// cheking logged in or not 
export const isLoggedIn = asyncHandler(async (req, res, next) => {
    let token;
    //console.log("bearer");
    //console.log(req.headers.authorization.split(" ")[1]);
    if(req.cookies.token || req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.cookies.token || req.headers.authorization.split(" ")[1]
    }
    //console.log("token");
    //console.log(token);
    if(!token){
        throw new CustomError("Not Logged in", 400)
    }
    try{
        
        //console.log(JWT.verify(token, configs.JWT_SECRET));
        const decodeJwtPayLoad = JWT.verify(token, configs.JWT_SECRET)
        //console.log(decodeJwtPayLoad);
        // now find user with decoded values
        //req.user = User.findById(decodeJwtPayLoad._id,"name email role")
        req.user = decodeJwtPayLoad
        //console.log("req_user");
        //console.log(req.user);
        next()

    } catch(error){
        throw new CustomError("Not athorized to access this route", 401)
    }

})
// check role of user
export const isAdmin = asyncHandler(async (req, res, next) => {
    try {
        //console.log("inside try");
        //console.log(req.user._id);
        const user = await User.findById(req.user._id)
        //console.log(user);
        if(user.role !== "ADMIN"){
            //console.log("inside if");
            res.status(401).json({
                success: false,
                message : "Your role is not admin"

            })}
            else{
                next()
            }

        
    } catch (error) {
        throw new CustomError("Unable to find is admin")
    }
})