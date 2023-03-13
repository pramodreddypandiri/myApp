import mongoose from "mongoose";
import transactionTypes from '../utils/transactionTypes.js'
const transactionSchema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User id is required"]
        },
        amount:{
            type: Number,
            required: [true, "Amount is required"]
        },
        type:{
            type: String,
            enum: Object.values(transactionTypes),
            required: [true,"Transactiion type is required"]
        },
        categoryId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Category is required"]
        },
        description:{
            type: String,

        },
        date:{
            type: Date,
            required: [true, "Date is required"]
        }

    },{
        timestamps: true
    }
)

export default mongoose.model("Transaction", transactionSchema)