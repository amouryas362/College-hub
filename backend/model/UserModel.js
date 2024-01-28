const { DataTypes } = require("sequelize");



const userModel = (sequelize) => {
    return sequelize.define("user", {
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        about: {
            type: DataTypes.TEXT
        }
    });
};


module.exports = userModel;