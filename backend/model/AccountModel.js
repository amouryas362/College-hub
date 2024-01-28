const { DataTypes } = require("sequelize");

const accountModel = (sequelize) => {
	return sequelize.define("account", {
		accountId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
	});
};

module.exports = accountModel;