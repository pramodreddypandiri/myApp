import { config } from "dotenv";
import dotenv from "dotenv"
dotenv.config()
const configs = {
   PORT : process.env.PORT,
   MONGO_URL : process.env.MONGO_URL

 }

 export default configs
