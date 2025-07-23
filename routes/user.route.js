const express =require('express')
const userRouter =express.Router()

userRouter.get('/users', (req, res)=>{
    res.send("Get all users")
})
userRouter.get('/:id', (req, res)=>{
    res.send("Get user detail")
})
userRouter.post('/', (req, res)=>{
    res.send("Create new user")
})
userRouter.put('/:id', (req, res)=>{
    res.send("Update user")
})
userRouter.delete('/:id', (req, res)=>{
    res.send("Delete user")
})

module.exports =userRouter;