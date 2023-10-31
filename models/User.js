import { Schema, model } from "mongoose";
import Joi from "joi";
import {handleSaveError} from "../models/hooks.js";

const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema ({
  username:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    match: emailReg,
    unique: true,
    required: true,
  },
  password:{
    type: String,
    minlength: 8,
    required: true,
  },
  token:{
    type: String,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
      type: String,
      required: [true, "Verify token is required"],
  }
}, {versionKey: false, timestamps: true})

userSchema.post("save", handleSaveError);

export const userSignupSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().pattern(emailReg).required(),
    password: Joi.string().min(8).required(),
})

export const userSigninSchema = Joi.object({
    email: Joi.string().pattern(emailReg).required(),
    password: Joi.string().min(8).required(),
})

export const userEmailSchema = Joi.object({
  email: Joi.string().pattern(emailReg).required(),
})

const User = model("user", userSchema);

export default User;