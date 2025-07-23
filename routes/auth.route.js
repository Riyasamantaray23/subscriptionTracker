const express = require('express')
const authRouter =express.Router();



authRouter.post('/signup', (req, res)=>{
    res.send('Sign Up')
})
authRouter.post('/signin', (req, res)=>{
    res.send('Sign In')
})
authRouter.post('/signout', (req, res)=>{
    res.send('Sign Out')
})

module.exports =authRouter