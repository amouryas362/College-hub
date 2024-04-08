const { DataTypes } = require('sequelize');

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
				is: {
					args: ["^S+$"],
					msg: "Title should have at least one non whitespace characters",
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
				is: {
					args: ["^S+$"],
					msg: "Body should have at least one non whitespace characters",
				},
			},
		},
		"type": {
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
	});
};


module.exports = postModel;