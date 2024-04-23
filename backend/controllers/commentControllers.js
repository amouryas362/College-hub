const db = require('../model/db');

const User = db.users;
const Post = db.posts;
const Comment = db.comments;

//getPostComments
const getPostComments = async (req, res) => {
    try {
        const { postId } = req.params;
        
        
        // fetch all comments from postgress database
        const comments = await Comment.findAll({
            where: { postId },
            attributes: ['commentId', 'body', 'userId', 'postId'],
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });
        
        return res.json(comments);
        

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "internal server error" });
    }
};

//getUserComments

const getUserComments = async (req, res) => {
    try {
        const { username } = req.params;      
        const user = await User.findOne({
            where: { username }
        });
        
        if(!user){
            return res.status(404).json({ message: "user not found" });
        }
        // fetch all comments from postgress database
        const comments = await user.getComments({
            attributes: ['commentId', 'body', 'userId', 'postId'],
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });
        
        return res.json(comments);
        

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "internal server error" });
    }
}



//getSingleComment
const getSingleComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        
        const comment = await Comment.findByPk(commentId)
        
        if(!comment){
            return res.status(404).json({ message: "comment not found" });
        }

        return res.json(comment);

    } catch (err) {
        return res.status(500).json({ message: "internal server error" });
    }
};


//createComment
const createComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.userId;

       //find the post 
        const post = await Post.findByPk(postId);

        if(!post){
            return res.status(404).json({ message: "post not found" });
        }

        //create comment
        const comment = await Comment.create({
            userId,
            postId,
            body: req.body.body
        });

        return res.status(201).json(comment);
    } catch (err) {
        return res.status(500).json({ message: "internal server error" });
    }
};

//likeComment
const likeComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        
        //fetch comment from db
        const comment = await Comment.findByPk(commentId);

        if(!comment){
            return res.status(404).json({ message: "comment not found" });
        }

        //like comment
        await comment.increment('likes');
        
        return res.json({ message: "comment liked successfully" });


    } catch (err) {
        return  res.status(500).json({ message: "internal server error" });
    }
};

//dislikeComment
const dislikeComment = async (req, res) => {
    try {
        const { commentId } = req.params;
       
        //fetch comment from db
        const comment = await Comment.findByPk(commentId);

        if(!comment){
            return res.status(404).json({ message: "comment not found" });
        }

        //like comment
        await comment.increment('dislikes');
        
        return res.json({ message: "comment disliked successfully" });

    } catch (err) {
        return res.status(500).json({ message: "internal server error" });
    }
};

//editComment
const editComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { body } = req.body;
       
        //fetch comment from db
        const comment = await Comment.findByPk(commentId);
        if(!comment){
            return res.status(404).json({ message: "comment not found" });
        }

        //edit comment
        await comment.update({ body });

        return res.status(204).json();

    } catch (err) {
       return res.status(500).json({ message: "Internal server error" });
    }
};

//deleteComment
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        await Comment.destroy({
            where: { commentId }
        });

        return res.status(204).json();

    } catch (err) {
       return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getPostComments,
    getUserComments,
    getSingleComment,
    createComment,
    likeComment,
    dislikeComment,
    editComment,
    deleteComment
};