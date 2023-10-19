import { HttpError } from "../helpers/index.js";
import {contactAddSchema} from "../models/contact.js";
import Contact from "../models/contact.js";


const getAll = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.status(200).json(result);
}
catch (error) {
    next(error);
}
}

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
        throw HttpError(404, `Contact with ${contactId} not found`);
    }
    res.status(200).json(result);
}
catch (error) {
    next(error);
}
}

const add = async (req, res, next) => {
  try {
    const { error } = Contact.create(req.body);
    if (error) {
        throw HttpError(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
}
catch (error) {
    next(error);
}
}

const updateById = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true, runValidators: true});
    if (!result) {
        throw HttpError(404, 'Not found' );
    }
    res.status(200).json(result);
}
catch (error) {
    next(error);
}
}

const deleteById = async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.status(204).json({
        message: "Contact deleted"
    })
}
catch(error) {
    next(error);
}
}

export default {
    getAll,
    getById,
    add,
    updateById,
    deleteById,
}