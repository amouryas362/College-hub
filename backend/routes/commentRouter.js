const express = require('express');
const commentRouter = express.Router();

const validateAuthToken = require('../middlewares/validateAuthToken');

//import all the functions from commentControllers.js
const {
    getPostComments,
    getUserComments,
    getSingleComment,
    createComment,
    likeComment,
    dislikeComment,
    editComment,
    deleteComment
} = require('../controllers/commentControllers');


//get all comments under a post with a postId
commentRouter.get('/post/:postId', validateAuthToken, getPostComments);

//get all user's comments
commentRouter.get('/user/:username', validateAuthToken, getUserComments);

//get a single comment data with a commentId
commentRouter.get('/:commentId', validateAuthToken, getSingleComment);

//create a comment under a post with a postId
commentRouter.post('/:postId/create', validateAuthToken, createComment);

//like a comment with a commentId
commentRouter.post('/:commentId/like', validateAuthToken, likeComment);

//dislike a comment with a commentId
commentRouter.post('/:commentId/dislike', validateAuthToken, dislikeComment);

//edit a comment with a commentId
commentRouter.put('/:commentId/edit', validateAuthToken, editComment);

//delete a comment with a commentId
commentRouter.delete('/:commentId/delete', validateAuthToken, deleteComment);

module.exports = commentRouter;


//TODO: Go through the postControllers.js file and decide on the edit route thingy
