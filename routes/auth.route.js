const express = require('express')
const authRouter =express.Router();
const {signIn, signOut, signUp} = require('../controllers/auth.controller.js');
const { verifyAccessToken } = require('../middleware/auth.middleware.js');

//Path:/api/v1/auth/
authRouter.post('/signup', signUp)
authRouter.post('/signin', signIn)
authRouter.post('/signout',verifyAccessToken, signOut)

module.exports =authRouter 