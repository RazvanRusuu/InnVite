import { NextFunction, Request, Response } from 'express'
import { signToken } from '../lib/signInToken'

import User, { IUser } from '../models/User'
import { ObjectId } from 'mongodb'
import catchAsync from '../utilis/catchAsync'
import AppError from '../utilis/appError'

type IUserSignup = Pick<
  IUser,
  'name' | 'email' | 'photo' | 'password' | 'passwordConfirm' | 'role'
> & {
  _id: ObjectId
}

const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
)

const signIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({
        status: 'failed',
        message: 'Please provide email ond password',
      })
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user || !(await user?.correctPassword(password, user.password))) {
      return next(new AppError('Incorect password or email', 401))
    }

    const token = signToken(user?._id)

    res.status(200).json({
      status: 'succes',
      token,
    })
  }
)

// const protect = async (req: Request, res: Response, next: NextFunction) => {
//   //   const token = req.jwt.verify
//   next()
// }

export { signup, signIn }
