import { Schema, model } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'

export interface IUser {
  name: string
  email: string
  photo?: string
  role: 'super-admin' | 'admin' | 'user'
  password: string
  passwordConfirm: string | undefined
  passwordChangedAt: Date
  passwordResetToken: string
  passwordResetExpires: string
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  role: {
    type: String,
    enum: ['super-admin', 'admin', 'user'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (this: IUser, val: string): boolean {
        return val === this.password
      },
      message: 'Passwords are not the same',
    },
    passwordChangedAt: {
      type: Date,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirm = undefined

  next()
})

const userModel = model<IUser>('User', userSchema)

export default userModel
