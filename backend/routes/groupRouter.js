const express = require("express");
const groupRouter = express.Router();

const validateAuthToken = require("../middlewares/validateAuthToken");
const {
	validateGroupData,
	validateGroupUpdateData,
} = require("../middlewares/joiValidationMiddleware");

const {
	createGroup,
	deleteGroup,
	allGroups,
	getGroupPosts,
	joinGroup,
	leaveGroup,
	fetchGroupMetaData,
	updateGroupMetaData,
	createModerator,
	checkMembership
} = require("../controllers/groupControllers");

groupRouter.post("/create", validateAuthToken, validateGroupData, createGroup);

groupRouter.get("/all", validateAuthToken, allGroups);

groupRouter.get("/:groupName/posts", validateAuthToken, getGroupPosts);

groupRouter.get("/:groupName/settings", validateAuthToken, fetchGroupMetaData);

groupRouter.post("/:groupName/join", validateAuthToken, joinGroup);

groupRouter.post("/:groupName/leave", validateAuthToken, leaveGroup);

groupRouter.get('/:groupName/membership', validateAuthToken, checkMembership);

groupRouter.put(
	"/:groupName/settings",
	validateAuthToken,
	validateGroupUpdateData,
	updateGroupMetaData,
);

groupRouter.delete("/:groupName", validateAuthToken, deleteGroup);

groupRouter.post('/:groupName/moderator/create', validateAuthToken, createModerator);



module.exports = groupRouter;
