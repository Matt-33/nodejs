import express from 'express'
import 'dotenv/config'
import userRouter from './routes/userRouter.js'
import postRouter from './routes/postRouter.js'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use('/users', userRouter);
app.use('/posts', postRouter);




const MONGO_URI = process.env.MONGO_URI


const firstMiddleware =  (request, response, next) => {
    console.log(`Welcome to my API`)
    next()
}

const secondMiddleware = (request, response, next) => {
    response.send('Hello world')
}


app.get('/', firstMiddleware, secondMiddleware)




mongoose.connect(MONGO_URI)
const db = mongoose.connection
db.on('connected', () => {
    console.log('Connected to the database 🟢')
})
db.on("error", console.error.bind(console, "MongoDB connection error:"));




app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))