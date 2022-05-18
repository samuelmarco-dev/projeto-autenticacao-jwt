import { Router } from "express";

import { postSignInUser, postSignUpUser } from "../controllers/authController.js";
import { validSchemaSignIn, validSchemaSignUp } from "../middlewares/authSchemaMiddleware.js";

const authRouter = Router();

authRouter.post('/sign-in', validSchemaSignIn, postSignInUser);
authRouter.post('/sign-up', validSchemaSignUp, postSignUpUser);

export default authRouter;