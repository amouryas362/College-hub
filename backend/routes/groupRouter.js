const express = require('express');
const groupRouter = express.Router();

const validateAuthToken = require('../middlewares/validateAuthToken');

const {allGroups} = require('../controllers/groupControllers');

groupRouter.get('/all', validateAuthToken, allGroups);

groupRouter.get('/:groupId/posts', validateAuthToken, getGroupPosts);

groupRouter.post('/:groupId/join', validateAuthToken, joinGroup);

groupRouter.post('/:groupId/leave', validateAuthToken, leaveGroup);

groupRouter.get('/:groupId/settings', validateAuthToken, fetchGroupMetaData);

groupRouter.patch('/:groupId/settings', validateAuthToken, updateGroupMetaData);

//TODO: add logic to delete group
//TODO: add middlweare to check if the user is admin or not



module.exports = groupRouter;