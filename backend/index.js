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
app.use('/', userRouter);

//home page routes
app.use('/home', homeRouter);

//post routes
app.use('/posts', postRouter)

//group routes
app.use('/groups', groupRouter);

//comment routes
app.use('/comments', commentRouter);

app.get('/', (req, res) => res.status(200).send("home page"));

app.listen(3000, () => {
	console.log("server running");
});
