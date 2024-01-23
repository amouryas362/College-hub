const { Sequelize } = require("sequelize");

//import models
console.log(process.env.DB_NAME)
const db = {};
const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@127.0.0.1:5432/${process.env.DB_NAME}`, {
	logging: () => process.env.NODE_ENV === 'development'? true : false
});

console.log(sequelize);

try {
	//store sequelize stuff in the DB
	db.Sequelize = Sequelize;
	db.sequelize = sequelize;

	sequelize.authenticate();
	if(process.env.NODE_ENV === 'development') console.log("Connection has been established successfully.");

	// db.users = require("./UserModel")(sequelize);

} catch (error) {
	console.error("Unable to connect to the database:", error);
}

//exporting the module
module.exports = db;
