const {
	signInSchema,
	signUpSchema,
	emailSchema,
	passwordSchema,
	aboutSchema,
	groupSchema,
	groupUpdateSchema,
} = require("../config/joiSchema");

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

const validateEmailData = (req, res, next) => {
	const { error } = emailSchema.validate(req.body);

	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}

	next();
};

const validatePasswordData = (req, res, next) => {
	const { error } = passwordSchema.validate(req.body);

	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}

	next();
};

const validateAboutData = (req, res, next) => {
	const { error } = aboutSchema.validate(req.body);

	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}

	next();
};

const validateGroupData = (req, res, next) => {
	const { error } = groupSchema.validate(req.body);

	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};

const validateGroupUpdateData = (req, res, next) => {
	const { error } = groupUpdateSchema.validate(req.body);

	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};

module.exports = {
	validateSignInData,
	validateSignUpData,
	validateEmailData,
	validatePasswordData,
	validateAboutData,
	validateGroupData,
	validateGroupUpdateData
};
