const express =require('express')
const mongoose= require('mongoose')
require('dotenv').config()

const app= express();


mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log('Connected to database')})
.catch((err)=>{
    console.log("Connection error:",err)
})

app.get('/', (req, res)=>{
    req.send("Hello I am starting a new project.")
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on PORT:${process.env.PORT}`)
})
