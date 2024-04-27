const jwt = require("jsonwebtoken");
const logger = require('../logger.util');


const validateAuthToken = (req, res, next) => {
	
	// if (!req.path.includes("signin") && !req.path.includes("signup")) {
		try {
			let token = req.headers.authorization;

			if (!token) {
				throw new Error("JWT Token not found!");
			}
			token = token.split(" ")[1];
			const user = jwt.verify(token, process.env.JWT_SECRET);
			//add the user's displyName and their userId to the req object
			req.username = user.username;
			req.userId = user.userId;
		} catch (error) {
			logger(error);
			return res
				.status(401)
				.json({ message: "unauthorized user" });
		}
	// }
	next();
};

module.exports = validateAuthToken;
