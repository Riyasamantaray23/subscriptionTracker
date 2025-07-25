const express =require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const connectDB =require('./db');
const errorMiddleware =require('./middleware/error.middleware.js');

const authRouter= require('./routes/auth.route.js')
const userRouter= require('./routes/user.route.js')
const subscriptionRouter= require('./routes/subscription.route.js')

const app= express();
const PORT= process.env.PORT || 3000
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:false})); //t is used to parse incoming request bodies that are sent with application/x-www-form-urlencoded format (which is the default format when you submit HTML forms).It extracts data from the body of the HTTP request (like form submissions) and adds it to req.body, so you can easily access it in your routes.
app.use(cookieParser());

app.use('/api/v1/auth', authRouter) //prepending api/v1/auth/signup
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)

app.use(errorMiddleware);


app.get('/', (req, res)=>{
    res.send("Hello I am starting a new project.")
})



app.listen(PORT, ()=>{
    console.log(`Server is running on PORT:${PORT}`)
})
