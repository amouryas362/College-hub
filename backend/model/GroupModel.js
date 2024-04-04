const { DataTypes } = require("sequelize");


const groupModel = (sequelize) => {
    return sequelize.define("group", {
        groupName: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            constraints: {
                unique: true
            }
        },
        description: {
            type: DataTypes.STRING
        },
        visibility: {
            type: DataTypes.ENUM('public', 'private'),
            defaultValue: 'public',
            allowNull: false
        },
    });
}

module.exports = groupModel;