const { DataTypes } = require("sequelize");

const postModel = (sequelize) => {
	return sequelize.define("admin", {
		adminId: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			validate: {
				min: {
					args: [3],
					msg: "Name Should not be empty",
				},
				is: {
					args: ["^S+$"],
					msg: "Name should have a body",
				},
			},
		},
		email: {
			type: DataTypes.STRING,
			validate: {
				min: {
					args: [3],
					msg: "Email Should not be empty",
				},
				is: {
					args: ["^S+$"],
					msg: "Email should have a body",
				},
			},
		}
	});
};

module.exports = postModel;
