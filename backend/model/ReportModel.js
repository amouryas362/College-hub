const { DataTypes } = require("sequelize");

const postModel = (sequelize) => {
	return sequelize.define("report", {
		reportId: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		type: {
			type: DataTypes.ENUM(
				"post",
				"comment",
				"group",
				"general"
			),
			defaultValue: "general",
			allowNull: false,
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
	});
};

module.exports = postModel;
