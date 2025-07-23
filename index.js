const express =require('express')
require('dotenv').config();
const connectDB =require('./db');

const authRouter= require('./routes/auth.route')
const userRouter= require('./routes/user.route')
const subscriptionRouter= require('./routes/subscription.route')

const app= express();
const PORT= process.env.PORT || 3000
connectDB();

app.use('/api/v1/auth', authRouter) //prepending api/v1/auth/signup
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)

// mongoose.connect(process.env.MONGO_URI)
// .then(()=>{console.log('Connected to database')})
// .catch((err)=>{
//     console.log("Connection error:",err)
// })

app.get('/', (req, res)=>{
    res.send("Hello I am starting a new project.")
})

app.listen(PORT,'0.0.0.0', ()=>{
    console.log(`Server is running on PORT:${PORT}`)
})
