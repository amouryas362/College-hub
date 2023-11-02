const jwt = require("jsonwebtoken");
const SECRET = "secret key hai bai";

const validateAuthToken = (req, res, next) => {
	if (!req.path.includes("signin") && !req.path.includes("signup")) {
		try {
			const token = req.headers.authorization;
			if (!token) {
				throw new Error();
			}

			token = token.split(" ")[1];
			const user = jwt.verify(token, SECRET);

			req.username = user.username;
		} catch (error) {
			return res
				.status(401)
				.json({ message: "unauthorized user line 24" });
		}
	}
	next();
};

module.exports = validateAuthToken;
