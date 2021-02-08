import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
import cors from 'cors'

import connectDB from './db/config.js'
import { notFoundHandler, errorHandler } from './middleware/errorMiddleware.js'
import authRoutes from './routes/authRoutes.js'
import postRoutes from './routes/postRoutes.js'

//configuring the environmental variables,app and DB
dotenv.config()
const app = express()
connectDB()

//handling cross-origin requests
app.use(cors())

//logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//default json body parser
app.use(express.json())

//request handlers
app.get('/', (req, res) => {
  res.send('Working')
})

app.use('/api/users', authRoutes)
app.use('/api/posts', postRoutes)

//error handlers
app.use(notFoundHandler)
app.use(errorHandler)

//port config
const PORT = process.env.PORT || 5000

//running the server
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
})
