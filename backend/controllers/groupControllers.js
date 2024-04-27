const Joi = require('joi');

const db = require("../model/db");

//group model
const Group = db.groups;
const User = db.users;
const Post = db.posts;

const logger = require("../logger.util");
const { Op } = require('sequelize');

const createGroup = async (req, res) => {
	//extract group_name and the user's id from the req
	const { groupName, description, visibility } = req.body;
	const { userId } = req;
	//group creation should be a part of a transaction
	const transaction = await db.sequelize.transaction();

	try {
		//check if the group exists
		let group = await Group.findOne({
			where: {
				groupName,
			},
			transaction,
		});

		if (group) {
			await transaction.rollback();
			return res.status(409).json({ message: "Group already exists" });
		}

		//Create a group add the user as a creator to the group
		group = await Group.create(
			{
				groupName,
				description,
				visibility,
			},
			{ transaction },
		);

		//adding member to the group
		//find the user by pk
		const user = await User.findByPk(userId, { transaction });

		if (!user) {
			transaction.rollback();
			return res.status(404).json({ message: "User not found" });
		}

		await group.setUser(req.userId, { transaction });

		//add the same user as a member

		await group.addMember(req.userId, { transaction });

		//add user as a moderator
		await group.addModerator(req.userId, { transaction });

		transaction.commit();

		res.status(201).json({ message: "Group Created successfully" });
	} catch (error) {
		logger(error);
		transaction.rollback();
		return res.status(500).json({ message: "something went wrong" });
	}
};

const allGroups = async (req, res) => {
	try {
		//return the list of groups
		const allGroups = await Group.findAll();
		return res.status(200).json(allGroups);
	} catch (error) {
		logger(error);
		return res.status(500).json({ message: "something went wrong" });
	}
};

const getGroupPosts = async (req, res) => {
	//get group name
	const groupName = req.params.groupName;
	//get accountId
	const userId = req.userId;
	try {
		//check if the group exists or not
		const group = await Group.findByPk(groupName);

		if (!group) {
			return res.status(404).json({ message: "Cannot find group" });
		}

		//check if the user has access to the group or not
		//Hilight: getter mixin usage
		const membership = await group.getMember({
			where: { userId },
			attributes: ["userId"],
			joinTableAttributes: [],
		});

		if (membership.length === 0) {
			return res.status(403).json({ message: "Access Denied" });
		}

		//limit to 10 posts only
		const posts = await Post.findAll({
			where: {
				groupName,
			},
			limit: 10,
		});

		return res.status(200).json(posts);
	} catch (error) {
		logger(error);
		return res.status(500).json({ message: "something went wrong" });
	}
};
const joinGroup = async (req, res) => {
	//get group name and accountId
	const { groupName } = req.params;
	const userId = req.userId;

	try {
		//check if the group exists or not
		const group = await Group.findByPk(groupName);

		if (!group) {
			return res.status(404).json({ message: "Group not found" });
		}

		//check if user is already in this group or not
		const member = group.getMember({
			where: { userId },
			attributes: ["userId"],
			joinTableAttributes: [],
		});

		if (member.length > 0) {
			return res.status(409).json({ message: "group already joined" });
		}

		//join the group

		if (group.visibility === "private") {
			return res
				.status(200)
				.json({ message: "Join request sent successfully!" });
		}

		await group.addMember(userId);

		return res.status(200).json({ message: "Successfully joined group" });
	} catch (error) {
		logger(error);
		return res.status(500).json({ message: "something went wrong" });
	}
};
const leaveGroup = async (req, res) => {
	//get group name and accountId
	const { groupName } = req.params;
	const userId = req.userId;
	try {
		//check if the group exists or not
		const group = await Group.findByPk(groupName);

		if (!group) {
			return res.status(404).json({ message: "Group not found" });
		}

		//check if user is already in this group or not
		const member = await group.getMember({
			where: { userId },
			attributes: ["userId"],
			joinTableAttributes: [],
		});

		if (member.length === 0) {
			return res.status(409).json({ message: "user not part of group" });
		}

		//leave the group
		await group.removeMember(userId);

		return res.status(200).json({ message: "User left the group" });
	} catch (error) {
		logger(error);
		return res.status(500).json({ message: "something went wrong" });
	}
};
const fetchGroupMetaData = async (req, res) => {
	const { groupName } = req.params;
	const userId = req.userId;

	try {
		//check if group exists or not
		const group = await Group.findByPk(groupName);

		if (!group) {
			return res.status(404).json({ message: "Group not found" });
		}

		//check if the user is the moderator of the group or not
		const moderator = await group.getModerator({
			where: { userId },
			attributes: ["userId"],
			joinTableAttributes: [],
		});

		if (moderator.length === 0) {
			return res.status(403).json({ message: "access denied" });
		}

		return res.status(200).json(group);
	} catch (error) {
		logger(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const updateGroupMetaData = async (req, res) => {
	const { groupName } = req.params;
	const { description, visibility } = req.body;
	const userId = req.userId;

	try {
		//fetch the group
		const group = await Group.findByPk(groupName);

		if (!group) {
			return res.status(404).json({ message: "group not found" });
		}

		//check if the user is moderator or not
		const mod = await group.getModerator({
			where: { userId },
			attrributes: ["userId"],
			joinTableAttributes: [],
		});

		if (mod.length === 0) {
			return res.status(403).json({ message: "access denied" });
		}

		//check what are the things to be updated
		const updates = {};

		if (description) updates.description = description;
		if (visibility) updates.visibility = visibility;

		await Group.update(updates, {
			where: {
				groupName,
			},
		});

		return res.status(204).json({});
	} catch (error) {
		logger(error);
		return res.status(500).json({ message: "internal server error" });
	}
};

const deleteGroup = async (req, res) => {
	//get group name and accountId
	const { groupName } = req.params;
	const userId = req.userId;

	try {
		//check if the group exists or not
		const group = await Group.findByPk(groupName);

		if (!group) {
			return res.status(404).json({ message: "Group not found" });
		}

		//check if the user is the creator of the group
		if (group.userId !== userId) {
			return res.status(403).json({ message: "operation not allowed" });
		}

		await Group.destroy({
			where: { groupName },
		});

		return res.status(204).json({});

		//delete the group(think of the delete logic, do I really want to delete the posts that user have made)
		//for now let us delete everything
		/*
			tables affected by this action:
			groups
			membership
			moderates
			group_contains_post
			posts
			comments
			posts_contains_comments
		*/
	} catch (error) {
		logger(error);
		return res.status(500).json({ message: "something went wrong" });
	}
};

const createModerator = async (req, res) => {
	const { userId: newModerator } = req.body;
	const { groupName } = req.params;
	const userId = req.userId;

	try {
		const validateInput = Joi.string().guid({
			version: ['uuidv4']
		});

		const { error } = validateInput.validate(newModerator);
		if(error){
			return res.status(400).json({ message: error.details[0].message });
		}

		//check if group exists or not
		const group = await Group.findByPk(groupName);
		if(!group){
			return res.status(404).json({ message: "group not found" });
		}
		
		
		const mod = await group.getModerator({
			where: {
				[Op.or]: [
					{ userId },
					{ userId: newModerator }
				]
			},
			attrributes: ['userId'],
			joinTableAttributes: []
		});

		//check if the user is a moderator or not
		let result = mod.some(item => item.userId === userId);
		if(!result){
			return res.status(403).json({ message: "access denied" });
		}

		//check if the new user is already added as a moderator or not
		result = mod.some(item => item.userId === newModerator);
		if(result){
			return res.status(409).json({ message: "user already added as moderator" });
		}

		await group.addModerator(newModerator);

		return res.status(200).json({ message: "moderator added successfully" });

	} catch (error) {
		logger(error);
		return res.status(500).json({ message: "internal server error" });
	}

};

//TODO: new endpoint to get the current membership status of the group
const checkMembership = async (req, res) => {
	try {
		const userId = req.userId;
		const { groupName } = req.params;
		//check if the user is member or not
		const group = await Group.findByPk(groupName);

		if(!group){
			return res.status(404).json({ message: "group not found" });
		}
		const member = await group.getMember({
			where: { userId },
			attributes: ['userId'],
			joinTableAttributes: []
		});

		const isMember = member.length > 0;

		const data = {
			group,
			isMember
		}

		return res.status(200).json(data);

	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "internal server error" });
	}
}

module.exports = {
	createGroup,
	allGroups,
	getGroupPosts,
	joinGroup,
	leaveGroup,
	fetchGroupMetaData,
	updateGroupMetaData,
	deleteGroup,
	createModerator,
	checkMembership
};
