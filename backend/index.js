const express = require("express");
require("dotenv").config();


//database connections
const db = require("./model/db");

try{
	db.sequelize.sync({ force: true });
}catch(e){
	console.log("DB error: ", e);
}


const userRouter = require('./routes/userRoutes');
const homeRouter = require('./routes/homePageRoutes');
const postRouter = require('./routes/postRouter');
const groupRouter = require('./routes/groupRouter');
const commentRouter = require('./routes/commentRouter');


const app = express();

//middleware calls
app.use(express.json());


//routes

//signin and signup routes
app.use('/api/v1', userRouter);

//home page routes
app.use("/api/v1", homeRouter);

//post routes
app.use("/api/v1/post", postRouter);

//group routes
app.use("/api/v1/group", groupRouter);

//comment routes
app.use("/api/v1/comment", commentRouter);


//wildcard to handle route mismatches
app.all("*", (req, res) => {
	return res.status(404).json({ message: "Not found!" });
})

app.use((err, res, res, next) => {

	return res.status(500).json({ message: "Internal server error!" });

});


app.listen(proces.env.PORT || 3000, () => {
	console.log("server running");
});
