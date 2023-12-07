import { NextFunction, Request, Response } from 'express'
import User, { IUser } from '../models/User'
import { ObjectId } from 'mongodb'
import jwt from 'jsonwebtoken'
import { signToken } from '../lib/signInToken'

type IUserSignup = Pick<
  IUser,
  'name' | 'email' | 'photo' | 'password' | 'passwordConfirm' | 'role'
> & {
  _id: ObjectId
}

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, passwordConfirm } = req.body
    const newUser: IUserSignup = await User.create({
      name,
      email,
      password,
      passwordConfirm,
    })

    const token = signToken(newUser._id)

    res.status(200).json({
      status: 'succes',
      token,
    })
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error,
    })
  }
}

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400).json({
      status: 'failed',
      message: 'Please provide email ond password',
    })
  }

  try {
    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user?.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: 'failed',
        message: 'Incorect password or email1',
      })
    }
    const token = signToken(user?._id)

    res.status(200).json({
      status: 'succes',
      token,
    })
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error,
    })
  }
}

export { signup, signIn }
