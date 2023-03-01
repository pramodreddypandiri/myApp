import mongoose from  'mongoose';
import colors from 'colors'

import configs from './index.js';
// connection to Data base
const connectDB = async () => {
    try {
        const conn  = await mongoose.connect(configs.MONGO_URL)
        console.log(`Connected to DB ${conn.connection.host}`.bgGreen.white);
    }
    catch (error) {
        console.log(`Error in DB connection ${error}`.bgRed.white
        );

    }
 }
 export default connectDB