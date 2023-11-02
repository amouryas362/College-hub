const express = require('express');
const postRouter = express.Router();

const validateAuthToken = require('../middlewares/validateAuthToken');
const {
	fetchPost,
	likePost,
	dislikePost,
	editPost,
	deletePost,
    createPost
} = require('../controllers/postControllers');



//TODO: create a middleware to check if the user is allowed to CRUD a post
// create
postRouter.post('/new', validateAuthToken, createPost); //TODO: add a joi post validation middleware

// fetch
postRouter.get('/:id', validateAuthToken, fetchPost); 



// like/dislike
postRouter.post('/:id/like', validateAuthToken, likePost);
postRouter.post('/:id/dislike', validateAuthToken, dislikePost);


// edit
postRouter.get('/:id/edit', validateAuthToken, fetchPost);

postRouter.put('/:id/edit', validateAuthToken, editPost);

// delete
postRouter.delete('/:id', validateAuthToken, deletePost);


module.exports = postRouter;

