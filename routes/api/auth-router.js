import express from "express";
import validateBody from "../../utils/validation/validateBody.js";
import { userSignupSchema, userSigninSchema, userEmailSchema } from "../../models/User.js";
import {authenticate, upload} from "../../middlewares/index.js";
import authController from "../../controllers/auth-controller.js";

const userSignupValidate = validateBody(userSignupSchema);

const userSigninValidate = validateBody(userSigninSchema);

const userEmailValidate = validateBody(userEmailSchema);

const authRouter = express.Router();

authRouter.post("/signup", userSignupValidate, authController.signup);

authRouter.get("/verify/:verificationCode", authController.verify);

authRouter.post("/verify", userEmailValidate, authController.resendVerifyEmail);

authRouter.post("/signin", userSigninValidate, authController.signin);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/signout", authenticate, authController.signout);

authRouter.patch("/users/avatars", upload.single("avatar"), authenticate, authController.changeAvatar);

export default authRouter;