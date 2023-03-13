import express from "express"
import colors from "colors"
import morgan from "morgan"
import connectDB  from "./config/db.js"
import configs from "../BackEnd/config/index.js"
import authRoutes from './routes/authRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js'
import cookieParser from "cookie-parser"
import cors from 'cors'

//configure env


// DB config
connectDB()
// Rest Object
const app = express()

//
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('api/v1/transaction', transactionRoutes)
//PORT
const PORT = configs.PORT

app.get('/', (req, res) => {
    res.send({
        message: "Welcome to my app at PORT 8080"
    })
})

// listening port

app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`.bgCyan.white);
})