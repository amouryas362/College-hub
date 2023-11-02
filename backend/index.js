const express = require("express");

const userRouter = require('./routes/userRoutes');



const app = express();

//middleware calls
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes

//signin and signup routes
app.use('/', userRouter);


app.listen(3000, () => {
	console.log("server running");
});
