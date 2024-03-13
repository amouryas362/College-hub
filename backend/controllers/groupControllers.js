const db = require("../model/db");

//group model
const Group = db.groups;


const createGroup = async (req, res) => {
	//extract group_name and the user's id from the req
	const { groupName, description, visibility } = req.body;
	
	//group creation should be a part of a transaction

	try {

		const transaction = await db.sequelize.transaction();

		//check if the group exists
		let group = await Group.findOne({
			where: {
				groupName
			},
			transaction
		})
	
		if (group) {
			await transaction.rollback();
			return res.status(409).json({ message: "Group already exists" });
		}

		//Create a group add the user as a member to the group 

		//extract access logic
		const isPublic = groupAccess === "public" ? true : false;
		
		//add group details to the groups table
		result = await db.query(
			"INSERT INTO groups (group_name, creator_id, description, is_public, is_members_only) VALUES ($1, $2, $3, $4, $5)",
			[groupName, accountId, description, isPublic, !isPublic]
		);

		//insert the user in the membership table
		await db.query(
			"INSERT INTO membership (account_id, group_name) VALUES ($1, $2)",
			[accountId, groupName]
		);

		//insert the user in the moderators table
		await db.query(
			"INSERT INTO moderates (account_id, group_name) VALUES ($1, $2)",
			[accountId, groupName]
		);


		res.status(201).json({message: "Group Created successfully", })

	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "something went wrong" });
	}
};

const allGroups = async (req, res) => {
	try{
		//return the list of groups
		let result = await db.query("SELECT *, (SELECT COUNT(*) AS member_count FROM membership WHERE membership.group_name = groups.group_name) FROM groups");
		return res.status(200).json({ groups: result.rows });
	}catch(error){
		console.log(error);
		return res.status(500).json({message: "something went wrong"});
	}
};
const getGroupPosts = async (req, res) => {
	//get group name
	const groupName = req.params.groupName;
	//get accountId
	const accountId = req.accountId;
	try{
		//check if the group exists or not
		let result = await db.query(
			"SELECT group_name FROM groups where group_name = $1",
			[groupName]
		);

		if (result.rows.length === 0) {
			return res.status(404).json({ message: "Cannot find group" });
		}

		//check if the user has access to the group or not
		result = await db.query('SELECT account_id from membership WHERE account_id = $1 and group_name = $2', [accountId, groupName]);
		if(result.rows.length === 0){
			return res.send(403).json({message: "User cannot view the posts"});
		}
		
		//return 10 posts only
		result = await db.query('SELECT * FROM posts where group_name = $1 ORDER BY createdat LIMIT 10', 
		[groupName]);

		return res.status(200).json({posts: result.rows});

	}catch(error){
		console.log(error);
		return res.status(500).json({message: "something went wrong"});
	}
};
const joinGroup = async (req, res) => {
	//get group name and accountId
	const groupName = req.params.groupName;
	const accountId = req.accountId;

	try{

		//check if the group exists or not
		let result = await db.query(
			"SELECT (is_public) FROM groups where group_name = $1",
			[groupName],
		);
		
		if (result.rows.length === 0) {
			return res.status(404).json({ message: "Group not found" });
		}
		
		const access = result.rows[0].is_public ? "public": "members only";
		
		//check if user is already in this group or not
		result = await db.query('SELECT account_id FROM membership where group_name = $1 and account_id = $2', [groupName, accountId]);

		if(result.rows.length > 0){
			return res.status(409).json({message: "group already joined"});
		}

		//join the group

		await db.query('INSERT INTO membership (account_id, group_name) VALUES ($1, $2)',
		[
			accountId,
			groupName
		]);

		if(access === 'members only'){
			return res.status(200).json({message: "Successfully Joined, members only not implemented yet par ho jayga future me"});
		}
		return res.status(200).json({message: "Successfully joined group"});

	}catch(error){
		console.log(error);
		return res.status(500).json({message: "something went wrong"});
	}
};
const leaveGroup = async (req, res) => {
	//get group name and accountId
	const groupName = req.params.groupName;
	const accountId = req.accountId;
	try {
		//check if the group exists or not
		let result = await db.query(
			"SELECT (is_public) FROM groups where group_name = $1",
			[groupName],
		);

		if (result.rows.length === 0) {
			return res.status(404).json({ message: "Group not found" });
		}

		const access = result.rows[0].isPublic ? "public" : "members only";

		//check if user is already in this group or not
		result = await db.query(
			"SELECT account_id FROM membership where group_name = $1",
			[groupName],
		);

		if (result.rows.length === 0) {
			return res.status(409).json({ message: "user not part of group" });
		}

		//leave the group

		await db.query(
			"DELETE FROM membership WHERE group_name = $1 and account_id = $2",
			[groupName, accountId]
		);

	
		return res.status(200).json({ message: "User left the group" });
		
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "something went wrong" });
	}
};
const fetchGroupMetaData = async (req, res) => {
	return res.send("working");
};
const updateGroupMetaData = async (req, res) => {
	return res.send("working");
};
const deleteGroup = async (req, res) => {
	//get group name and accountId
	const groupName = req.params.groupName;
	const accountId = req.accountId;
	try {
		//check if the group exists or not
		let result = await db.query(
			"SELECT group_name FROM groups where group_name = $1",
			[groupName]
		);

		if (result.rows.length === 0) {
			return res.status(404).json({ message: "Group not found" });
		}

		//check if the user is the creator of the group
		result = await db.query('SELECT creator_id from groups where creator_id = $1', [accountId]);

		
		//delete the group(think of the delete logic, do I really want to delete the posts that user have made)
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
		

		return res.status(200).json({ message: "Successfully joined group" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "something went wrong" });
	}
};

module.exports = {
	createGroup,
	allGroups,
	getGroupPosts,
	joinGroup,
	leaveGroup,
	fetchGroupMetaData,
	updateGroupMetaData,
	deleteGroup,
};
