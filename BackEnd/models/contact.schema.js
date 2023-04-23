import mongoose from "mongoose";


const ContactSchema = new mongoose.Schema(
    {
    email : {
        type: String,
        required : true,
        trim : true,
        
    },
    name: {
        type: String,
        required : true,
    },
    message: {
        type: String,
      }

},
{
    timestamps: true
})
export default mongoose.model("Contact", ContactSchema)