const { DataTypes } = require("sequelize");

const userModel = (sequelize) => {
    return sequelize.define("user", {
		userId: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		about: {
			type: DataTypes.TEXT,
			defaultValue: "Hello There!"
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
};


module.exports = userModel;