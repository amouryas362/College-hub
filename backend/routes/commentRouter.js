const express = require('express');
const commentRouter = express.Router();

const validateAuthToken = require('../middlewares/validateAuthToken');

//import all the functions from commentControllers.js
const {
    getAllComments,
    getSingleComment,
    createComment,
    likeComment,
    dislikeComment,
    editComment,
    deleteComment
} = require('../controllers/commentControllers');


//get all comments under a post with a postId
commentRouter.get('/:postId', validateAuthToken, getAllComments);

//get a single comment data with a commentId
commentRouter.get('/:commentId', validateAuthToken, getSingleComment);

//create a comment under a post with a postId
commentRouter.post('/:postId/create', validateAuthToken, createComment);

//like a comment with a commentId
commentRouter.post('/like/:commentId', validateAuthToken, likeComment);

//dislike a comment with a commentId
commentRouter.post('/dislike/:commentId', validateAuthToken, dislikeComment);

//edit a comment with a commentId
commentRouter.put('/edit/:commentId', validateAuthToken, editComment);

//delete a comment with a commentId
commentRouter.delete('/delete/:commentId', validateAuthToken, deleteComment);

module.exports = commentRouter;


//TODO: Go through the postControllers.js file and decide on the edit route thingy
