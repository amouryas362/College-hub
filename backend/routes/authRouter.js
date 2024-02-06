const express = require("express");

const { signup, signin } = require("../controllers/userControllers");

const {
	validateSignInData,
	validateSignUpData,
} = require("../middlewares/joiValidationMiddleware");

const validateAuthToken = require("../middlewares/validateAuthToken");

const authRouter = express.Router();

//signUp route
authRouter.post("/signup", validateAuthToken, validateSignUpData, signup);

//signIn route
authRouter.post("/signin", validateAuthToken, validateSignInData, signin);

module.exports = authRouter;
