const express = require("express");

const userRouter = require('./routes/userRoutes');
const homeRouter = require('./routes/homePageRoutes');
const postRouter = require('./routes/postRouter');


const app = express();

//middleware calls
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes

//signin and signup routes
app.use('/', userRouter);

//home page routes
app.use('/home', homeRouter);

//post routes
app.use('/posts', postRouter)


app.listen(3000, () => {
	console.log("server running");
});
