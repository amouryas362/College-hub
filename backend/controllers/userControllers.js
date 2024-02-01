const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const logger = require('../logger.util');

//data models
const db = require("../model/db");
//User model
const User = db.users;

const signup = async (req, res) => {
	const { email, password, displayName } = req.body;

	try {
		//validate the username
		//validate the email usage
		//save the user to the db
		//return a token

		let user = await User.findOne({
			where: {
				email,
			},
		});

		if (user) {
			return res.status(409).json({
				message: "This email is already linked to a different account",
			});
		}

		//save user to db code
		//encrypt the password
		//store the username
		//store the email

		//generate a hash for the password using bcrypt
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		//save the user to the db
		let newUser = await User.create({
			email,
			password: hashedPassword,
			displayName,
		});

		const userId = newUser.id;

		const token = jwt.sign(
			{ displayName, userId },
			process.env.JWT_SECRET,
			{ expiresIn: "60d" },
		);

		return res
			.status(201)
			.json({ messaage: "Account successfully created", token });
	} catch (error) {
		logger(error);
		return res.status(500).json({ message: "something went wrong", error });
	}
};

const signin = async (req, res) => {
	const { email, password } = req.body;

	try {
		//fetch the user by email
		let result = await User.findOne({
			where: {
				email,
			},
		});

		if (!result) {
			return res.status(401).json({ message: "Invalid email" });
		}

		//check if the password is correct or not
		const hashedPassword = result.password;
		const isValid = await bcrypt.compare(password, hashedPassword);

		if (!isValid) {
			return res.status(401).json({ message: "Invalid password" });
		}

		//generate token
		const token = jwt.sign(
			{ displayName: result.displayName, userId: result.userId },
			process.env.JWT_SECRET,
			{ expiresIn: "60d" },
		);

		return res.status(200).json({
			message: "signin successful",
			token,
		});
	} catch (error) {
		logger(error);
		return res.status(500).json({ message: "someting went wrong" });
	}
};

module.exports = {
	signup,
	signin,
};
