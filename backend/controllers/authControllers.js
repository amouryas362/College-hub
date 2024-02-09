const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const logger = require('../logger.util');

//data models
const db = require("../model/db");
//User model
const User = db.users;

const signup = async (req, res) => {
	const { email, password, username } = req.body;

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
			username,
		});

		const userId = newUser.userId;

		const token = jwt.sign(
			{ username, userId },
			process.env.JWT_SECRET,
			{ expiresIn: "60d" },
		);

		return res
			.status(201)
			.json({ message: "Account successfully created", token });
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
			{ username: result.username, userId: result.userId },
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

const isLoggedIn = async (req, res) => {
	const userId = req.userId;
	
	try {
		if(!userId){
			return res.status(403).json({ message: "not logged in" });
		}

		const foundUser = await User.findOne({
			where: {
				userId,
			},
			attributes: ["userId", "username"],
		});
		
		if(!foundUser){
			return res.status(404).json({ message: "User not found" });
		}

		return res.json(foundUser);

	} catch (error) {
		logger("Error in isLoggedIn: ", error);
		res.status(500).json({ message: "something went wrong" });
	}

}

const updateUserEmail = async (req, res) => {

	if(req.userId !== req.params.id){
		return res.status(403).json({ message: "unauthorized user" });
	}

	try{
		
		let user = await User.findOne({
			where:{
				userId: req.params.id
			}
		});

		if(!user){
			return res.status(404).json({ message: "User not found" });
		}

		//update command
		await User.update({ email: req.body.email }, {
			where: {
				userId: req.params.id
			}
		});

		return res.status(204).send();
	
	
	}catch(error){
		logger("error in updateUser: ", error);
		return res.status(500).json({ message: "something went wrong" });
	}

}

const updateUserPassword = async (req, res) => {
	if (req.userId !== req.params.id) {
		return res.status(403).json({ message: "unauthorized user" });
	}

	const passwords = {
		oldPassword: req.body.oldPassword,
		newPassword: req.body.newPassword
	};

	try {
		let user = await User.findOne({
			where: {
				userId: req.params.id,
			},
		});

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		//check if the oldPassword is equal to the new password
		const hashedPassword = user.password;
		const isValid = await bcrypt.compare(passwords.oldPassword, hashedPassword);

		if(!isValid){
			return res.status(401).json({ message: "Incorrect password entered" });
		}
		
		//generate the hash of new password
		const newHashedPassword = await bcrypt.hash(passwords.newPassword, 10);

		//update the password
		await User.update({ password: newHashedPassword },{
			where: {
				userId: req.params.id
			}
		});

		return res.status(204).send();

	} catch (error) {
		logger("error in updateUser: ", error);
		return res.status(500).json({ message: "something went wrong" });
	}
};


const deleteUser = async (req, res) => {
	if(req.userId !== req.params.id){
		return res.status(403).json({ message: "unauthorized user" });
	}

	try{	
		await User.destroy({
			where:{
				userId: req.params.id
			}
		});

		return res.status(204).send();

	}catch(error){
		logger("error in deleteUser: ", error);
		return res.status(500).json({ message: "something went wrong" });
	}
}


module.exports = {
	signup,
	signin,
	isLoggedIn,
	updateUserEmail,
	updateUserPassword,
	deleteUser,
};
