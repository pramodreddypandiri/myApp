import mongoose from "mongoose";
import AuthRoles from '../utils/authRoles.js'
import JWT from "jsonwebtoken";
import bcrypt from 'bcryptjs'
import configs from "../config/index.js";
import crypto from "crypto"
const userSchema = new mongoose.Schema(
    {
        name: {
            type : String,
            required : [true, "Name is required"],
            trim: true,
            maxLength: [50, "Name must be less than 50 chars"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is requried"],
            minLength: [8, "Password must be atleast 8 chars"],
            select: false
        },
        role: {
            type: String,
            enum: Object.values(AuthRoles),
            default: AuthRoles.USER
        },
        profession:{
            type : String,
            maxLength: [20, "Profession must be under 20 cahrs"]
        },
        imcome: {
            type: Number,
        },
        forgotPasswordToken: String,
        forgotPasswordExpiry: Date,

    },
    {
        timestamps: true
    }

) 

//pre-save hook for password
userSchema.pre('save', async function(next){
    // set encrypted pwd with bcrypt
    //if pwd already existed
    if(!this.isModified("password")){
        return next()
    }
    console.log(this
        .password);
    // when giving pwd for first time
    this.password = await bcrypt.hash(this.password,10)
    next()
    
})
// adding methods on user schema
userSchema.methods = {
    // compare password
    comparePassword: async function(enteredPaswword){
        //console.log(enteredPaswword);
        //console.log(this.password);
        return await bcrypt.compare(enteredPaswword, this.password)
    },

    //generate jwt token 
    getJwtToken: function (){
        return JWT.sign(
            {
                _id: this._id,
                role: this.role
            },
            configs.JWT_SECRET,
            {
                expiresIn: configs.JWT_EXPIRY
            }
            
        )
    } ,
    // generate token for forgot password
    generateForgotPasswordToken : function (){
        const forgotToken = crypto.randomBytes(20).toString('hex');

        //save to DB
        this.forgotPasswordToken = crypto.createHash("sha256")
        .update(forgotToken).digest("hex")
        // ser expiry
        this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000

        // return token to user
        return forgotToken
    }
}

export default mongoose.model("User", userSchema)