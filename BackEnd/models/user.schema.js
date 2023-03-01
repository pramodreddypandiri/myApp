import mongoose from "mongoose";
import AuthRoles from '../utils/authRoles'

const userSchema = mongoose.Schema(
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
