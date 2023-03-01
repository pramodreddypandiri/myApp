import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB  from "./config/db.js"
//configure env
dotenv.config()

// DB config
connectDB()
// Rest Object
const app = express()

//
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//app.use(cors())
//app.use(cookieParser())
app.use(morgan('dev'))
//PORT
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send({
        message: "Welcome to my app"
    })
})

// listening port

app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`.bgCyan.white);
})