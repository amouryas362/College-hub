const Joi = require("joi");

const signUpSchema = Joi.object({
	username: Joi.string().min(3).max(20).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).max(64).required(),
});

const signInSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).max(64).required(),
});

const emailSchema = Joi.object({
	email: Joi.string().email().required()
});

const passwordSchema = Joi.object({
	oldPassword: Joi.string().min(8).max(64).required(),
	newPassword: Joi.string().min(8).max(64).required(),
});

module.exports = { signInSchema, signUpSchema, emailSchema, passwordSchema };

// TODO: Use Zod instead of JOI