import { HttpError } from "../helpers/index.js";
import Contact, { contactAddSchema } from "../models/contact.js";


const getAll = async (req, res) => {
    const {_id: owner} = req.user;
    const {page = 1, limit = 10} = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "username email");
    res.json(result);
}

const getById = async (req, res, next) => {
  try {
    const {_id: owner} = req.user;
    const { contactId } = req.params;
    const result = await Contact.findById({_id: contactId, owner});
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
    const {_id: owner} = req.user;
    const result = await Contact.create({...req.body, owner});
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
    const {_id: owner} = req.user;
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate({_id: contactId, owner}, req.body, {new: true, runValidators: true});
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
    const {_id: owner} = req.user;
    const result = await Contact.findByIdAndDelete({_id: contactId});
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