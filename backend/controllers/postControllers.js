const db = require("../model/db");

const logger = require("../logger.util");

const Post = db.posts;
const Group = db.groups;

const fetchPost = async (req, res) => {
	//get the postId from the params
	const { id } = req.params;

	try {
		//fetch the post details from the db
		const post = await Post.findByPk(id);
		if (!post) {
			return res.status(404).json({ message: "post not found" });
		}
		return res.status(200).json(post);
	} catch (error) {
		logger(error);
		return res.status(500).json({ message: "internal server error" });
	}
};

const fetchPostByGroup = async (req, res) => {
	try {
		const { groupName } = req.params;
		const group = await Group.findByPk(groupName);

		if (!group) {
			return res.status(404).json({ message: "group not found" });
		}

		const posts = await group.getPosts();
		return res.json(posts);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "internal server error" });
	}
};

const createPost = async (req, res) => {
	
	const { title, body, type, groupName } = req.body;
	const userId = req.userId;

	try {
		
		const group = await Group.findByPk(groupName);
		if (!group) {
			return res.status(404).json({ message: "group not found" });
		}

		const post = await Post.create({
			title,
			body,
			type,
			userId,
			groupName,
		});

		await group.addPost(post);
		return res.status(201).json(post);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "internal server error" });
	}
};

const likePost = async (req, res) => {
	const { id } = req.params;
	try {
		//update the like count by one
		const post = await Post.findByPk(id);
		if (!post) {
			return res.status(404).json({ message: "post not found" });
		}

		//increment the like count of the post
		await post.increment("likes");

		return res.status(200).json({ message: "successfully liked the post" });
	} catch (error) {
		return res.status(500).json({ message: "something went wrong" });
	}
};

const dislikePost = async (req, res) => {
	const { id } = req.params;
	try {
		const post = await Post.findByPk(id);
		if (!post) {
			return res.status(404).json({ message: "post not found" });
		}

		//decrement the like count of the post
		await post.increment("dislikes");

		return res
			.status(200)
			.json({ message: "successfully disliked the post" });
	} catch (error) {
		return res.status(500).json({ message: "something went wrong" });
	}
};

const editPost = async (req, res) => {
	const { id } = req.params;
	const { title, body, type } = req.body;

	try {
		//update the post in the database
		const post = await Post.findByPk(id);
		if (!post) {
			return res.status(404).json({ message: "post not found" });
		}

		await post.update({ title, body, type });

		return res.status(204).json();
	} catch (error) {
		return res.status(500).json({ message: "something went wrong" });
	}
};

const deletePost = async (req, res) => {
	//delete the post from the database
	const { id } = req.params;
	try {
		await Post.destroy({
			where: {
				id,
			},
		});
		return res.status(204).json();
	} catch (error) {
		return res.status(500).json({ message: "something went wrong" });
	}
};

module.exports = {
	fetchPost,
	likePost,
	dislikePost,
	editPost,
	deletePost,
	createPost,
	fetchPostByGroup,
};
