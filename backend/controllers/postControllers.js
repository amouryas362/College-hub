const db = require('../model/db');


const fetchPost = async (req, res) => {
	//get the id from the params
	const { id } = req.params;
	try {
		//fetch the post details from the db
		return res.status(200).json({ message: "success", post: DUMMY_POST });
	} catch (error) {
		return res.status(404).json({ message: "post not found" });
	}
};

const createPost = async (req, res) => {
	const { title, body, type, groupName } = req.body;
	const accountId = req.accountId;
	/*
		tables affected by this action:
		posts
		group contains posts
	*/

	try {
		//store post in the database
		let result = await db.query('INSERT INTO posts (created_by, group_name, title, body, type) VALUES ($1, $2, $3, $4, $5)',
		[
			accountId, groupName, title, body, type
		]);

		const postId = result.rows[0].post_id;

		await db.query('INSERT INTO group_contains_post (group_name, post_id) VALUES ($1, $2)', [
			groupName, postId
		]);

		return res
			.status(201)
			.json({ message: "post created successfully", result });
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: "An unexpected error occoured" });
	}
};

const likePost = async (req, res) => {
	const { id } = req.params;
	try {
		//update the like count by one
		return res.status(200).json({ message: "successfully liked the post" });
	} catch (error) {
		return res.status(500).json({ message: "something went wrong" });
	}
};

const dislikePost = async (req, res) => {
	const { id } = req.params;
	try {
		//update the like count by one
		return res
			.status(200)
			.json({ message: "successfully disliked the post" });
	} catch (error) {
		return res.status(500).json({ message: "something went wrong" });
	}
};

const editPost = async (req, res) => {
    //the post is already fetched you will get the data that is to be updated so do that
    const { id } = req.params;
    try{
        return res.status(200).json({message: "post edit successfull"});
    }catch(error){
        return res.status(500).json({message: "something went wrong"});
    }
};


const deletePost = async (req, res) => {
    //delete the post from the database
    const { id } = req.params;
    try {
        return res.status(200).json({message: "Post Deleted successfully"});
    } catch (error) {
        return res.status(500).json({message: "something went wrong"});
    }
};

module.exports = {
	fetchPost,
	likePost,
	dislikePost,
	editPost,
	deletePost,
    createPost
};
