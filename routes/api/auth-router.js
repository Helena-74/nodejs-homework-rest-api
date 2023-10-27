import express from "express";
import validateBody from "../../utils/validation/validateBody.js";
import { userSignupSchema, userSigninSchema } from "../../models/User.js";
import {authenticate, upload} from "../../middlewares/index.js";
import authController from "../../controllers/auth-controller.js";

const userSignupValidate = validateBody(userSignupSchema);

const userSigninValidate = validateBody(userSigninSchema);

const authRouter = express.Router();

authRouter.post("/signup", userSignupValidate, authController.signup);

authRouter.post("/signin", userSigninValidate, authController.signin);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/signout", authenticate, authController.signout);

authRouter.patch("/users/avatars", upload.single("avatar"), authenticate, authController.changeAvatar);

export default authRouter;