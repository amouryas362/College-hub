//implement all the functions mentioned in the commentRouter.js file

//getAllComments
const getAllComments = async (req, res) => {
    try {
        const { postId } = req.params;
        //fetch comments from postgress database

    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

//getSingleComment
const getSingleComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        //fetch comments from postgress database

    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};


//createComment
const createComment = async (req, res) => {
    try {
        const { postId } = req.body;
        //fetch comments from postgress database

    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

//likeComment
const likeComment = async (req, res) => {
    try {
        const { commentId } = req.body;
        //fetch comments from postgress database

    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

//dislikeComment
const dislikeComment = async (req, res) => {
    try {
        const { commentId } = req.body;
        //fetch comments from postgress database

    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

//editComment
const editComment = async (req, res) => {
    try {
        const { commentId } = req.body;
        //fetch comments from postgress database

    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

//deleteComment
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.body;
        //fetch comments from postgress database

    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

module.exports = {
    getAllComments,
    getSingleComment,
    createComment,
    likeComment,
    dislikeComment,
    editComment,
    deleteComment
};