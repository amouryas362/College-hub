const profileRouter = require("express").Router();

const validateAuthToken = require("../middlewares/validateAuthToken");

const {
	getUserProfile,
	updateUserProfile,
	getUserGroups,
	getUserPosts
} = require("../controllers/profileControllers");
const { validateAboutData } = require("../middlewares/joiValidationMiddleware");


profileRouter.get('/users/groups', validateAuthToken, getUserGroups);

profileRouter.get('/users/posts', validateAuthToken, getUserPosts);

/*
1. Get Profile info
2. Put profile info (update the user's profile)
    
Creation and deletion of profile has been handled by authRouter routes 

 */
//get user's profile by ID
profileRouter.get("/users/:id", validateAuthToken, getUserProfile);

//update user about section get userId by ID
profileRouter.put(
	"/users/:id",
	validateAuthToken,
	validateAboutData,
	updateUserProfile,
);



//TODO: Add the functionality to upload the profile photos

module.exports = profileRouter;
