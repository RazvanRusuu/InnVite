import mongoose, { Schema, model, connect } from "mongoose";
import validator from "validator";

interface IUser {
  name: string;
  email: string;
  photo?: string;
  role: "super-admin" | "admin" | "user";
  password: string;
  passwordConfirm: string;
  passwordChangedAt: Date;
  passwordResetToken: string;
  passwordResetExpires: string;
  active: boolean;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: String,
  role: {
    type: String,
    enum: ["super-admin", "admin", "user"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (this: IUser, val: string): boolean {
        return val === this.password;
      },
      message: "Passwords are not the same",
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
});

const userModel = model<IUser>("User", userSchema);

export default userModel;
