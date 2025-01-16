const { DataTypes } = require("sequelize");

const postModel = (sequelize) => {
	return sequelize.define("post", {
		postId: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				min: {
					args: [3],
					msg: "Min 3 chars allowed",
				},
			},
		},
		body: {
			type: DataTypes.TEXT,
			validate: {
				min: {
					args: [20],
					msg: "Min 20 chars allowed",
				},
			},
			allowNull: true
		},
		type: {
			type: DataTypes.ENUM(
				"news",
				"event",
				"meme",
				"discussion",
				"general",
			),
			defaultValue: "general",
			allowNull: false,
		},
		likes: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		dislikes: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		postImage: {
			type: DataTypes.STRING,
		},
	});
};

module.exports = postModel;
