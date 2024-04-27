const express = require("express");

const {
	signup,
	signin,
	isLoggedIn,
	updateUserEmail,
	updateUserPassword,
	deleteUser,
} = require("../controllers/authControllers");

const {
	validateSignInData,
	validateSignUpData,
	validateEmailData,
	validatePasswordData
} = require("../middlewares/joiValidationMiddleware");

const validateAuthToken = require("../middlewares/validateAuthToken");

const authRouter = express.Router();

//signUp route
authRouter.post("/signup", validateSignUpData, signup);

//signIn route
authRouter.post("/signin", validateSignInData, signin);

//check if user loggedin
authRouter.get('/me', validateAuthToken, isLoggedIn);

//update the user's email
authRouter.put(
	"/users/:id/update-email",
	validateAuthToken,
	validateEmailData,
	updateUserEmail,
);

//update the user's password

authRouter.put(
	"/users/:id/update-password",
	validateAuthToken,
	validatePasswordData,
	updateUserPassword,
);

//delete the user's account
authRouter.delete('/users/:id', validateAuthToken, deleteUser);

module.exports = authRouter;
