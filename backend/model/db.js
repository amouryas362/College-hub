const { Sequelize, DataTypes } = require("sequelize");
const logger = require("../logger.util");
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
		as: "Member",
		foreignKey:{
			name: "groupName"
		}
	});

	db.users.belongsToMany(db.groups, {
		through: "membership",
		foreignKey:{
			name: "userId"
		}
	});

	//moderation table
	//many to many relationship in groups and users
	db.groups.belongsToMany(db.users, {
		through: "moderates",
		as: "Moderator",
		foreignKey: {
			name: "groupName"
		}
	});

	db.users.belongsToMany(db.groups, {
		through: "moderates",
		foreignKey: {
			name: "userId"
		}
	});

	//user creates groups
	//one to many relationship
	db.users.hasMany(db.groups, {
		foreignKey: {
			name: "userId"
		}
	});
	db.groups.belongsTo(db.users, {
		foreignKey:{
			name: "userId"
		}
	});

	//post has a creator
	//many to one relationship
	db.users.hasMany(db.posts, {
		onDelete: "CASCADE",
		foreignKey: {
			name: "userId"
		}
	});
	db.posts.belongsTo(db.users,{
		foreignKey: {
			name: "userId"
		}
	});

	//group has posts
	//one to many relationship
	db.groups.hasMany(db.posts, {
		onDelete: "CASCADE",
		foreignKey: {
			name: "groupName"
		}
	});
	db.posts.belongsTo(db.groups,{
		foreignKey: {
			name:"groupName"
		}
	});

	//post has comments
	//one to many relationship
	db.posts.hasMany(db.comments, {
		onDelete: "CASCADE",
		foreignKey: {
			name: "postId"
		}
	});
	db.comments.belongsTo(db.posts, {
		foreignKey: {
			name: "postId"
		}
	});

	//user has comments
	//one to many relationship
	db.users.hasMany(db.comments, {
		onDelete: "CASCADE",
		foreignKey: {
			name: "userId"
		}
	});
	db.comments.belongsTo(db.users, {
		foreignKey: {
			name: "userId"
		}
	});

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
			type: DataTypes.UUID,
		},
	});
	db.reports.belongsTo(db.users);

	//log if there is an error
	if (process.env.NODE_ENV === "dev")
		logger("Connection has been established successfully.");
} catch (error) {
	console.error("Unable to connect to the database:", error);
}

//exporting the module
module.exports = db;
