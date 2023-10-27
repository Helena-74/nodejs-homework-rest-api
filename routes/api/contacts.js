import express from "express";
import {contactAddSchema} from "../../models/contact.js";
import contactsController from "../../controllers/contactControllers.js";
import validateBody from "../../utils/validation/validateBody.js";
import {isValidId, authenticate, upload} from "../../middlewares/index.js";

const contactAddValidate = validateBody(contactAddSchema);

const contactsRouter = express.Router();

contactsRouter.get('/', authenticate, contactsController.getAll);

contactsRouter.get('/:contactId', authenticate, isValidId, contactsController.getById)

contactsRouter.post('/', upload.single("avatar"), authenticate, contactAddValidate, contactsController.add)

contactsRouter.put('/:contactId', authenticate, isValidId, contactsController.updateById)

contactsRouter.delete('/:contactId', authenticate, isValidId,  contactsController.deleteById)

export default contactsRouter;

