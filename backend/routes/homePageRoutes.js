const express = require("express");
const homeRouter = express.Router();

const validateAuthToken = require("../middlewares/validateAuthToken");
const { generateFeed } = require("../controllers/homeControllers");



//fetch user's feed
homeRouter.get("/feed", validateAuthToken, generateFeed);



module.exports = homeRouter;
