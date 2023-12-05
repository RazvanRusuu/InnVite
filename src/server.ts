import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config({ path: './config.env' })

import app from './app'

const PASSWORD = process.env.DB_PASSWORD || ''
const DB = process.env.DB_URI?.replace('<PASSWORD>', PASSWORD)

mongoose
  .connect(DB!, {})
  .then(() => {
    console.log('successfully connected to database')
  })
  .catch((err) => console.log(err))

const port = process.env.PORT || 3000

const server = app.listen(port, () => {
  console.log(`app running ${port}`)
})
