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
	email: Joi.string().email().required(),
});

const passwordSchema = Joi.object({
	oldPassword: Joi.string().min(8).max(64).required(),
	newPassword: Joi.string().min(8).max(64).required(),
});

const aboutSchema = Joi.object({
	about: Joi.string().required(),
});

const groupSchema = Joi.object({
	groupName: Joi.string().min(3).required(),
	description: Joi.string().min(3).required(),
	visibility: Joi.valid("public", "private").required()
});

const groupUpdateSchema = Joi.object({
	description: Joi.string().min(3),
	visibility: Joi.valid("public", "private")
})

module.exports = {
	signInSchema,
	signUpSchema,
	emailSchema,
	passwordSchema,
	aboutSchema,
	groupSchema,
	groupUpdateSchema
};

// TODO: Use Zod instead of JOI
