const express = require('express');
const groupRouter = express.Router();

const validateAuthToken = require('../middlewares/validateAuthToken');

const {createGroup, deleteGroup, allGroups, getGroupPosts, joinGroup, leaveGroup, fetchGroupMetaData, updateGroupMetaData} = require('../controllers/groupControllers');

groupRouter.post('/create', validateAuthToken, createGroup);

groupRouter.get('/all', validateAuthToken, allGroups);

groupRouter.get('/:groupId/posts', validateAuthToken, getGroupPosts);

groupRouter.get('/:groupId/settings', validateAuthToken, fetchGroupMetaData);

groupRouter.post('/:groupId/join', validateAuthToken, joinGroup);

groupRouter.post('/:groupId/leave', validateAuthToken, leaveGroup);

groupRouter.patch('/:groupId/settings', validateAuthToken, updateGroupMetaData);

groupRouter.delete('/:groupId/delete', validateAuthToken, deleteGroup);

//TODO: add logic to delete group
//TODO: add middlweare to check if the user is admin or not



module.exports = groupRouter;