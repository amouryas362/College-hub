const DUMMY_POST = [
	{
		id: 1,
		title: "This is a post",
		body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae quam molestiae adipisci, dolore tempora impedit? Vel, culpa ea reprehenderit magnam nobis quam quisquam dolor voluptatibus alias, qui laudantium animi molestias!",
		likes: 13,
		dislikes: 0,
	},
];

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
	const { title, body, author, type, group } = req.body;

	const data = {
		title,
		body,
		author,
		type,
		likes: 0,
		dislikes: 0,
		group,
	};

	try {
		//store post in the database
		return res
			.status(201)
			.json({ message: "post created successfully", data });
	} catch (error) {
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
