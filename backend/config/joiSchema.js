const Joi = require("joi");

const signUpSchema = Joi.object({
	displayName: Joi.string().min(3).max(20).required(),
	email: Joi.string().email().required(),
	password: Joi.string().alphanum().min(8).max(64).required(),
});

const signInSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().alphanum().min(8).max(64).required(),
});

module.exports = { signInSchema, signUpSchema };

// TODO: Use Zod instead of JOI