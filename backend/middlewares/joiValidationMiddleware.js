const Joi = require("joi");
const { signInSchema, signUpSchema } = require("../config/joiSchema");

const validateSignUpData = (req, res, next) => {
	const { error } = signUpSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};

const validateSignInData = (req, res, next) => {
	const { error } = signInSchema.validate(req.body);

	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};

module.exports = {
	validateSignInData,
	validateSignUpData,
};
