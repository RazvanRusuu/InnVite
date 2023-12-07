import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'

export const signToken = (id: ObjectId | undefined) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}
