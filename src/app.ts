import express, { Application } from 'express'
import morgan from 'morgan'
import userRouter from './routes/userRoute'
import cabinRouter from './routes/propertyRoutes'
import AppError from './utilis/appError'
import globalError from './controllers/globalError'

const app: Application = express()
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/v1/user', userRouter)
app.use('/api/v1/cabin', cabinRouter)

app.all('*', async (req, res, next) => {
  const err = new AppError(
    `This route ${req.originalUrl}  does not exists`,
    404
  )
  next(err)
})

app.use(globalError)

export default app
