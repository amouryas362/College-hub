const { Sequelize } = require("sequelize");

const db = {};

const sequelize = new Sequelize(
	`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@127.0.0.1:5432/${process.env.DB_NAME}`,
	{
		logging: false,
	},
);

try {
	//store sequelize stuff in the db object
	db.Sequelize = Sequelize;
	db.sequelize = sequelize;

	//authenticate the connection
	sequelize.authenticate();

	//import models
	db.accounts = require("./AccountModel")(sequelize);
	db.users = require("./UserModel")(sequelize);
	db.groups = require("./GroupModel")(sequelize);
	db.posts = require("./PostModel")(sequelize);
	db.comments = require("./CommentModel")(sequelize);
	db.admins = require("./AdminModel")(sequelize);
	db.report = require("./ReportModel")(sequelize);

	//create associations



	//log if there is an error
	if (process.env.NODE_ENV === "development")
		console.log("Connection has been established successfully.");
} catch (error) {
	console.error("Unable to connect to the database:", error);
}

//exporting the module
module.exports = db;

//TODO: Create Data models and get them working
//TODO:
