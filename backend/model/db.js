const { Sequelize, DataTypes } = require("sequelize");

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
	db.users = require("./UserModel")(sequelize);
	db.groups = require("./GroupModel")(sequelize);
	db.posts = require("./PostModel")(sequelize);
	db.comments = require("./CommentModel")(sequelize);
	db.admins = require("./AdminModel")(sequelize);
	db.reports = require("./ReportModel")(sequelize);

	// many to many relation in groups and users
	db.groups.belongsToMany(db.users, {
		through: "membership",
	});

	db.users.belongsToMany(db.groups, {
		through: "membership",
	});

	//moderation table
	//many to many relationship in groups and users
	db.groups.belongsToMany(db.users, {
		through: "moderates",
	});

	db.users.belongsToMany(db.groups, {
		through: "moderates",
	});

	//user creates groups
	//one to many relationship
	db.users.hasMany(db.groups);
	db.groups.belongsTo(db.users);

	//post has a creator
	//many to one relationship
	db.users.hasMany(db.posts, {
		onDelete: "CASCADE",
	});
	db.posts.belongsTo(db.users);

	//group has posts
	//one to many relationship
	db.groups.hasMany(db.posts, {
		onDelete: "CASCADE",
	});
	db.posts.belongsTo(db.groups);
	

	//post has comments
	//one to many relationship
	db.posts.hasMany(db.comments, {
		onDelete: "CASCADE",
	});
	db.comments.belongsTo(db.posts);

	//user has comments
	//one to many relationship
	db.users.hasMany(db.comments, {
		onDelete: "CASCADE",
	});
	db.comments.belongsTo(db.users);

	//user creates reports
	//one to many realtionship
	db.users.hasMany(db.reports, {
		foreignKey: {
			name: "reporter",
			type: DataTypes.UUID,
		},
	});
	db.reports.belongsTo(db.users);
	
	//TODO: Think more about the report system, should I create extra tables for
	//reportee type(user, group, post, comment). Currently doing user to user reports only

	//user gets reported
	//one to many relationship: one user can get reported multiple times, but one report can only be generated for a single user
	db.users.hasMany(db.reports, {
		foreignKey: {
			name: "reportee",
			type: DataTypes.UUID
		}
	});
	db.reports.belongsTo(db.users);


	

	//log if there is an error
	if (process.env.NODE_ENV === "development")
		console.log("Connection has been established successfully.");
} catch (error) {
	console.error("Unable to connect to the database:", error);
}

//exporting the module
module.exports = db;
