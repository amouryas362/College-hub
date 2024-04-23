//utility function: logger
const logger = require("../logger.util");

//user model
const User = require("../model/db").users;
const Post = require("../model/db").posts;
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

const getUserGroups = async (req, res) => {
	const userId = req.userId;
	try {
		const user = await User.findOne({
			where: {
				userId,
			},
		});

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const groups = await user.getGroups();
		const groupArr = groups.map(group => {
			return group.groupName;
		});
		return res.json(groupArr);
	} catch (error) {
		logger("Error in getUserGroups: ", error);
		res.status(500).json({ message: "something went wrong" });
	}
};


const getUserPosts = async (req, res) => {
		try {
			const userId = req.userId;
			const user = await User.findOne({
				where: {
					userId,
				},
			});
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}
			//get all posts of the group in which the user is a member
			const groups = await user.getGroups();

			const groupNames = groups.map(group => group.groupName);

			let posts = [];

			for (let i = 0; i < groupNames.length; i++) {
				const post = await Post.findAll({
					where: {
						groupName: groupNames[i],
					},
					include: [
						{
							model: User,
							attributes: ["username"],
						},
					],
				});
				posts = posts.concat(post);
			}

			return res.json(posts);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "internal server error" });
		}
}


module.exports = {
	getUserProfile,
	updateUserProfile,
	getUserGroups,
	getUserPosts
};
