import { NextFunction, Request, Response } from 'express'
import User, { IUser } from '../models/User'
import { ObjectId } from 'mongodb'

type IUserSignup = Pick<
  IUser,
  'name' | 'email' | 'photo' | 'password' | 'passwordConfirm' | 'role'
> & {
  _id: ObjectId
}

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, photo, password, passwordConfirm } = req.body
    const newUser: IUserSignup = await User.create({
      name,
      email,
      photo,
      password,
      passwordConfirm,
    })

    res.status(200).json({
      status: 'succes',
      data: {
        user: newUser,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error,
    })
  }
}

export { signup }
