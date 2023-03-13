import mongoose from "mongoose";


const CategorySchema = new mongoose.Schema(
    {
    title : {
        type: String,
        required : true,
        trim : true,
        maxLength: [120, "Category Name should be under 120 chars"]
    },
    slug: {
        type: String,
        lowercase: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User Id is required"]
      }

},
{
    timestamps: true
})
export default mongoose.model("Category", CategorySchema)