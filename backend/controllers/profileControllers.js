//utility function: logger
const logger = require("../logger.util");

//user model
const User = require("../model/db").users;

//controllers

const getUserProfile = async (req, res) => {
	//get the user's id
	const userId = req.params.id;
	if (userId !== req.userId) {
		return res.status(403).json({ message: "Unauthorized User" });
	}

	try {
		let user = User.findOne({
			where: {
				userId,
			},
			attributes: ["userId", "username", "about", "email"],
		});

		if (!user) {
			return res.status(404).json({ message: "Error user not found" });
		}

		return res.json({
			user,
		});
	} catch (error) {
		logger("Error in getUserProfile: ", error);
		res.status(500).json({ message: "something went wrong" });
	}
};

const updateUserProfile = async (req, res) => {
	//this controller will update the user's about content only
	const userId = req.params.id;

	if (userId !== req.userId) {
		return res.status(403).json({ message: "Unauthorized User" });
	}

	try {

		const user = User.findOne({
			where: {
				userId,
			},
		});

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		await User.update(
			{ about: req.body.about },
			{
				where: {
					userId,
				},
			},
		);

		return res.status(204).send();
	} catch (error) {
		logger("Error in getUserProfile: ", error);
		res.status(500).json({ message: "something went wrong" });
	}
};

module.exports = {
	getUserProfile,
	updateUserProfile,
};
