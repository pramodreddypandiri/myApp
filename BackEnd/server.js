import express from "express"
import colors from "colors"
import morgan from "morgan"
import connectDB  from "./config/db.js"
import configs from "../BackEnd/config/index.js"
//configure env


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
const PORT = configs.PORT

app.get('/', (req, res) => {
    res.send({
        message: "Welcome to my app at PORT"
    })
})

// listening port

app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`.bgCyan.white);
})