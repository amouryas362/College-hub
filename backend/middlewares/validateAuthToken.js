const jwt = require("jsonwebtoken");
const SECRET = "secret key hai bai";


const addDummyToken = (req, res, next) => {
	req.headers.authorization =
		"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEyMzQiLCJpYXQiOjE2OTg5MTYxMDQsImV4cCI6MTY5OTAwMjUwNH0.VzEkI2hZ4SHgs2HkdtzZlBnH6xScyOVEfc8y8ZmfBsM";
	next();
};

const validateAuthToken = (req, res, next) => {
	if (!req.path.includes("signin") && !req.path.includes("signup")) {
		try {
			let token = req.headers.authorization;
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
