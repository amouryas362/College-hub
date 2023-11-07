const Joi = require("joi");

const signUpSchema = Joi.object({
	displayName: Joi.string().alphanum().min(3).max(20).required(),
	about: Joi.string().min(0).max(500).required(),
	email: Joi.string().email().required(),
	password: Joi.string().alphanum().min(8).max(64).required(),
});

const signInSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().alphanum().min(8).max(64).required(),
});

module.exports = { signInSchema, signUpSchema };
