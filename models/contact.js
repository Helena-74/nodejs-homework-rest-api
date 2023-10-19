import { Schema, model } from "mongoose";
import Joi from "joi";
import {handleSaveError} from "../models/hooks.js";

const formatPhone = ["mobile", "work", "home"];
const releaseYearReg = /^\d{4}$/;
const contactSchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
  phone:{
    type: String,
    required: true,
  },
  favorite:{
    type: Boolean,
    default: false,
  },
  format:{
    type: String,
    enum: formatPhone,
    required: true,
  },
  releaseYear:{
    type: String,
    match: releaseYearReg,
    required: true,
  },
}, {
  versionKey: false, timestamps: true
})

contactSchema.post("save", handleSaveError);

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
      "any.required": `"name" required field`
  }),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
  format: Joi.string().valid(...formatPhone).required(),
  releaseYear: Joi.string().pattern(releaseYearReg).required()
})

const Contact = model("contact", contactSchema);

export default Contact; 