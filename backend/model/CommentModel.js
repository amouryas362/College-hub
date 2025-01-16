const { DataTypes } = require("sequelize");

const postModel = (sequelize) => {
	return sequelize.define("comment", {
		commentId: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		body: {
			type: DataTypes.TEXT,
			validate: {
				min: {
					args: [1],
					msg: "Comment Should not be empty",
				},
			},
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
