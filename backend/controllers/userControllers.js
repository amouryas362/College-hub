const jwt = require("jsonwebtoken");
const SECRET = "secret key hai bai";

const signup = async (req, res) => {
	const { username, email, password } = req.body;

	try {
		//validate the username
		//validate the email usage
		//save the user to the db
		//return a token

		let num = Math.floor(Math.random() * 10) + 1;
		if (num % 2) {
			//username already in use
			return res.status(409).json({ message: "Username already taken" });
		}

		num = Math.floor(Math.random() * 10) + 1;
		if (num % 2) {
			return res.status(409).json({
				message: "This email is already linked to a different account",
			});
		}

		//save user to db code
		//encrypt the password
		//store the username
		//store the email

		//return a token
		const token = jwt.sign({ username }, SECRET, { expiresIn: "1d" });
		const data = { username, email };
		return res
			.status(201)
			.json({ messaage: "Account successfully created", data, token });
	} catch (error) {
		return res.status(500).json({ message: "something went wrong" });
	}
};

const signin = async (req, res) => {
	const { username, password } = req.body;
	try {
		//check if the password is correct or not

		//generate token
		const token = jwt.sign({ username }, SECRET, { expiresIn: "1d" });

		return res.status(200).json({
			message: "signin successful",
			token,
		});
	} catch (error) {
		return res.status(500).json({ message: "someting went wrong" });
	}
};

module.exports = {
	signup,
	signin,
};
