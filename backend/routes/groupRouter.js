const express = require('express');
const groupRouter = express.Router();

const validateAuthToken = require('../middlewares/validateAuthToken');

const {createGroup, deleteGroup, allGroups, getGroupPosts, joinGroup, leaveGroup, fetchGroupMetaData, updateGroupMetaData} = require('../controllers/groupControllers');

groupRouter.post('/create', validateAuthToken, createGroup);

groupRouter.get('/all', validateAuthToken, allGroups);

groupRouter.get('/:groupName/posts', validateAuthToken, getGroupPosts);

groupRouter.get('/:groupName/settings', validateAuthToken, fetchGroupMetaData);

groupRouter.post('/:groupName/join', validateAuthToken, joinGroup);

groupRouter.post('/:groupName/leave', validateAuthToken, leaveGroup);

groupRouter.patch('/:groupName/settings', validateAuthToken, updateGroupMetaData);

groupRouter.delete('/:groupName/delete', validateAuthToken, deleteGroup);

//TODO: add logic to delete group
//TODO: add middlweare to check if the user is admin or not



module.exports = groupRouter;