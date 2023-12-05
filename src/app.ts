import express, { Application } from 'express'
import morgan from 'morgan'
import userRouter from './routes/userRoute'

const app: Application = express()
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/v1/user', userRouter)

export default app
