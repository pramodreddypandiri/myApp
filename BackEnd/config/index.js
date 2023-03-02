import { config } from "dotenv";
import dotenv from "dotenv"
dotenv.config()
const configs = {
   PORT : process.env.PORT,
   MONGO_URL : process.env.MONGO_URL,
   JWT_SECRET: process.env.JWT_SECRET,
   JWT_EXPIRY: process.env.JWT_EXPIRY

 }

 export default configs
