const express = require("express");

const { signup, signin } = require("../controllers/userControllers");

const {
	validateSignInData,
	validateSignUpData,
} = require("../middlewares/joiValidationMiddleware");
const validateAuthToken = require("../middlewares/validateAuthToken");

const userRouter = express.Router();

//signUp route
userRouter.post("/signup", validateAuthToken, validateSignUpData, signup);

//signIn route
userRouter.post("/signin", validateAuthToken, validateSignInData, signin);

module.exports = userRouter;
