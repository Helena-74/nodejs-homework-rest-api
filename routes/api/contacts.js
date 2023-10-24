import express from "express";
import {contactAddSchema} from "../../models/contact.js";
import contactsController from "../../controllers/contactControllers.js";
import validateBody from "../../utils/validation/validateBody.js";
import {isValidId, authenticate} from "../../middlewares/index.js";

const contactAddValidate = validateBody(contactAddSchema);

const contactsRouter = express.Router();
contactsRouter.use(authenticate);

contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:contactId', isValidId, contactsController.getById)

contactsRouter.post('/', contactAddValidate, contactsController.add)

contactsRouter.delete('/:contactId', isValidId,  contactsController.deleteById)

contactsRouter.put('/:contactId', isValidId, contactsController.updateById)

export default contactsRouter;

