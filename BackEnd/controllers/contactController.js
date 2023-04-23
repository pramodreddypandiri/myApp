import asyncHandler from '../services/asyncHandler.js'
import CustomError from '../utils/customError.js'
import Contact from '../models/contact.schema.js'
export const storeContactDetails = asyncHandler(async (req, res) => {
    try {
        const{email, name, message} = req.body
        console.log(email, name, message);
        if(!email || !name){
            throw new CustomError("email and password both are required")
        }
        const contact = await Contact.create({email, name, message})
        res.status(200).json({
            success : true,
            message : "Contact details stored",
            contact
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in contact details storing"
        })
    }
})